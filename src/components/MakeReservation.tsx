import { useState } from "react";
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
import { useSession, signIn } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {
  seatId: number;
  handleReservation: (seatId: number) => void;
};

const MakeReservation = ({ seatId, handleReservation }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <AlertDialog>
        {session?.user ? (
          <AlertDialogTrigger
            onClick={() => setIsOpen(true)}
            className="absolute right-32 top-0 border p-2 shadow-md"
          >
            Reserve
          </AlertDialogTrigger>
        ) : (
          <Button
            onClick={() => signIn()}
            className="absolute right-32 top-0 border p-2 shadow-md"
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
              seatId={seatId}
              setOpen={setIsOpen}
              handleReservation={handleReservation}
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
