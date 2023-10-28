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
import { Seat } from "./SeatsDetails";

type Props = {
  seat: Seat;
};

export type PreferenceState = {
  isOpen: boolean;
  preferenceId: string | null;
};

const MakeReservation = ({ seat }: Props) => {
  const [open, setOpen] = useState<PreferenceState>({
    isOpen: false,
    preferenceId: null,
  });

  const { data: session } = useSession();

  const handleStartReservation = () => {
    setOpen({
      isOpen: true,
      preferenceId: null,
    });
  };

  return (
    <>
      <AlertDialog>
        {session?.user ? (
          <AlertDialogTrigger
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 border p-2 inline-flex items-center hover:opacity-80 transition-opacity justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => handleStartReservation()}
          >
            Reserve
          </AlertDialogTrigger>
        ) : (
          <Button className="border p-2 shadow-md" onClick={() => signIn()}>
            Reserve
          </Button>
        )}
        {open.isOpen ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Let&apos;s reserve a seat!</AlertDialogTitle>
              <AlertDialogDescription>
                Enter the attendee information below
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AttendeeForm seat={seat} setOpen={setOpen}>
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
