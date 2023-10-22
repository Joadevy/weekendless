"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, ReactNode } from "react";

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
  seatId: number;
  children: ReactNode;
  setOpen: (_: boolean) => void;
  handleReservation: (_: number) => void;
};

function AttendeeForm({ seatId, children, setOpen, handleReservation }: Props) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      seatId,
      userEmail: session?.user?.email!,
      attendeeNationalId: values.nationalID,
      attendeeName: values.name,
      attendeeEmail: values.email,
      attendeePhone: values.phone,
    };

    try {
      const reservation = await createReservation(newReservation);

      setIsLoading(false);

      if (reservation) {
        handleReservation(seatId);
        toast({
          title: "Reservation created.",
          description: "We've created a reservation for you!",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your reservation, please try again.",
      });
    } finally {
      setOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex items-center justify-between">
          {children}
          {isLoading ? (
            <Button disabled={isLoading}>
              <p className="animate-spin">↻</p>
            </Button>
          ) : (
            <Button type="submit">Confirm</Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default AttendeeForm;
