import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { createReservation } from "~/lib/api/utils";
import { type ClientReservation } from "~/types";
import { useState } from "react";

type Props = {
  seatId: number;
};

const MakeReservation = ({ seatId }: Props) => {
  const { data: session } = useSession();
  const [attendee, setAttendee] = useState(null);

  const handleNewReservation = async (seatId: number) => {
    if (!session?.user) return;

    const newReservation: ClientReservation = {
      seatId,
      userEmail: session?.user?.email!,
      attendeeNationalId: "1234567890",
      attendeeName: "Test Testsson",
      attendeeEmail: "",
      attendeePhone: "",
    };

    await createReservation(newReservation);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Reserve</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reserve your seat!</DialogTitle>
            <DialogDescription>
              Enter the attendee information:
            </DialogDescription>
          </DialogHeader>

          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
            <button type="submit">Submit</button>
          </form>
          <Button onClick={() => handleNewReservation(seatId)}>Reserve</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MakeReservation;
