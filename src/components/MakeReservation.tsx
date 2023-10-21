import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import AttendeeForm from "./AttendeeForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type Props = {
  seatId: number;
  handleReservation: (_: number) => void;
};

const MakeReservation = ({ seatId, handleReservation }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <AlertDialog>
        {session?.user ? (
          <AlertDialogTrigger
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 border p-2 inline-flex items-center hover:opacity-80 transition-opacity justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setIsOpen(true)}
          >
            Reserve
          </AlertDialogTrigger>
        ) : (
          <Button className="border p-2 shadow-md" onClick={() => signIn()}>
            Reserve
          </Button>
        )}
        {isOpen ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Let&apos;s reserve a seat!</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the attendee information below
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AttendeeForm
              handleReservation={handleReservation}
              seatId={seatId}
              setOpen={setIsOpen}
            >
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AttendeeForm>
          </AlertDialogContent>
        ) : null}
      </AlertDialog>
    </>
  );
};

export default MakeReservation;
