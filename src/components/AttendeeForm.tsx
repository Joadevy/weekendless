"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createReservation } from "~/lib/api/utils";
import { type ClientReservation } from "~/types";
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
  children: React.ReactNode;
  setOpen: (isOpen: boolean) => void;
};

function AttendeeForm({ seatId, children, setOpen }: Props) {
  const { data: session } = useSession();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nationalID: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user) return;

    const attendee = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      nationalID: values.nationalID,
    };

    const newReservation: ClientReservation = {
      seatId,
      userEmail: session?.user?.email!,
      attendeeNationalId: attendee.nationalID,
      attendeeName: attendee.name,
      attendeeEmail: attendee.email,
      attendeePhone: attendee.phone,
    };

    await createReservation(newReservation);

    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type the attendee's name" {...field} />
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
                <Input placeholder="Type the attendee's email" {...field} />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex items-center justify-between">
          {children}
          <Button type="submit">Reserve</Button>
        </div>
      </form>
    </Form>
  );
}

export default AttendeeForm;
