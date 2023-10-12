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
            className="absolute right-32 top-0 border p-2 shadow-md"
            onClick={() => setIsOpen(true)}
          >
            Reserve
          </AlertDialogTrigger>
        ) : (
          <Button
            className="absolute right-32 top-0 border p-2 shadow-md"
            onClick={() => signIn()}
          >
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
