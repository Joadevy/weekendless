"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { createReservation } from "../lib/api/utils";
import { type ClientReservation } from "../types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Seat } from "./SeatsDetails";
import { PreferenceState } from "./MakeReservation";

const getMercadoPagoPreference = async (
  seat: Seat,
  reservation: Reservation,
) => {
  try {
    const response = await fetch("/api/mercadopago/createPreference", {
      method: "POST",
      body: JSON.stringify({
        id: reservation.id,
        title: seat.type.description,
        quantity: 1,
        unit_price: seat.type.price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    const { id: preferenceId } = response;

    return preferenceId;
  } catch (error) {
    console.error(error);

    return;
  }
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  nationalID: z.string().min(8, {
    message: "National ID must be at least 8 characters.",
  }),
});

type Props = {
  seat: Seat;
  children: ReactNode;
  setOpen: Dispatch<SetStateAction<PreferenceState>>;
};

type Reservation = {
  id: number;
  attendeeNationalID: string;
  userId: string;
  seatId: number;
  createdAt: Date;
  updatedAt: Date;
};

function AttendeeForm({ seat, children }: Props) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
      locale: "en-US",
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nationalID: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user) return;
    setIsLoading(true);

    const newReservation: ClientReservation = {
      seatId: seat.id,
      userEmail: session?.user?.email!,
      attendeeNationalId: values.nationalID,
      attendeeName: values.name,
      attendeeEmail: values.email,
      attendeePhone: values.phone,
    };

    try {
      const reservation: Reservation = await createReservation(newReservation);

      if (reservation) {
        const preferenceId = await getMercadoPagoPreference(seat, reservation);

        setPreferenceId(preferenceId);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your reservation, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type the attendee's name"
                  {...field}
                  disabled={isLoading || !!preferenceId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationalID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type the attendee's national ID number"
                  {...field}
                  disabled={isLoading || !!preferenceId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type the attendee's email"
                  {...field}
                  disabled={isLoading || !!preferenceId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type the attendee's phone number"
                  {...field}
                  disabled={isLoading || !!preferenceId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex items-center justify-between">
          {!preferenceId && children}

          {!preferenceId && isLoading ? (
            <Button disabled={isLoading}>
              <p className="animate-spin">↻</p>
            </Button>
          ) : !preferenceId && !isLoading ? (
            <Button disabled={isLoading} type="submit">
              Continue to pay{" "}
              {seat.type.price.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </Button>
          ) : null}
        </div>
      </form>

      {!isLoading && preferenceId && (
        <footer className="flex items-center justify-between -mt-5">
          {children}
          <Wallet initialization={{ preferenceId }} />
        </footer>
      )}
    </Form>
  );
}

export default AttendeeForm;
