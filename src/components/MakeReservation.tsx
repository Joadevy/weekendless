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
import { Button } from "./ui/button";

type Props = {
  seatId: number;
  handleReservation: (seatId: number) => void;
};

const MakeReservation = ({ seatId, handleReservation }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            className="absolute right-32 top-0"
            onClick={() => setIsOpen(true)}
          >
            Reserve
          </Button>
        </AlertDialogTrigger>
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
