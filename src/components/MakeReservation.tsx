import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { EventWithVenue } from "../server/models/Events";

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
import Information from "./Information";
import { Separator } from "./ui/separator";

type Props = {
  seat: Seat;
  event: EventWithVenue;
};

export type PreferenceState = {
  isOpen: boolean;
  preferenceId: string | null;
};

const MakeReservation = ({ seat, event }: Props) => {
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
              <AlertDialogTitle className="mb-0">
                Let&apos;s reserve your ticket for &quot;{event.name}&quot;
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-0">
                Enter the attendee information below
              </AlertDialogDescription>
              {/* <Separator /> */}
            </AlertDialogHeader>

            <div className="flex flex-col gap-1">
              <Separator />

              <Information
                details={new Date(event.date).toLocaleString("en", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
                name="Date"
              >
                <svg
                  height="1.1em"
                  viewBox="0 0 20 20"
                  width="1.1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699ZM1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756L1.4 7.742Zm5.267 6.877v1.666H5v-1.666h1.667Zm4.166 0v1.666H9.167v-1.666h1.666Zm4.167 0v1.666h-1.667v-1.666H15Zm-8.333-3.977v1.666H5v-1.666h1.667Zm4.166 0v1.666H9.167v-1.666h1.666Zm4.167 0v1.666h-1.667v-1.666H15ZM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0v-.92Z"
                    fill="currentColor"
                  />
                </svg>
              </Information>

              <Separator />

              <Information details={event.venue.name} name="Venue">
                <svg
                  height="1.25em"
                  viewBox="0 0 512 512"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M440 464V16H72v448H16v32h480v-32Zm-32 0H272v-64h-32v64H104V48h304Z"
                    fill="currentColor"
                  />
                  <path
                    d="M160 304h32v32h-32zm80 0h32v32h-32zm80 0h32v32h-32zm-160-96h32v32h-32zm80 0h32v32h-32zm80 0h32v32h-32zm-160-96h32v32h-32zm80 0h32v32h-32zm80 0h32v32h-32z"
                    fill="currentColor"
                  />
                </svg>
              </Information>

              <Separator />

              <Information
                details={`${event.venue.address}, ${event.venue.city.name}`}
                name="Address"
              >
                <svg
                  height="1.45em"
                  viewBox="0 0 24 24"
                  width="1.45em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19.677q2.82-2.454 4.458-4.991q1.638-2.538 1.638-4.39q0-2.744-1.737-4.53T12 3.981q-2.621 0-4.359 1.785t-1.737 4.53q0 1.852 1.638 4.39q1.639 2.537 4.458 4.99Zm0 .879q-.235 0-.47-.077q-.234-.077-.432-.25q-1.067-.98-2.163-2.185q-1.097-1.204-1.992-2.493q-.895-1.29-1.467-2.633q-.572-1.343-.572-2.622q0-3.173 2.066-5.234Q9.037 3 12 3t5.03 2.062q2.066 2.061 2.066 5.234q0 1.279-.572 2.613q-.572 1.333-1.458 2.632q-.885 1.3-1.981 2.494q-1.097 1.194-2.164 2.175q-.191.173-.434.26q-.244.086-.487.086Zm0-10.44Zm.003 1.615q.668 0 1.14-.476q.472-.475.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.476q-.472.475-.472 1.143t.475 1.14q.476.472 1.143.472Z"
                    fill="currentColor"
                  />
                </svg>
              </Information>

              <Separator />

              <Information
                details={seat.number.toString()}
                name="Ticket number"
              >
                <svg
                  height="1em"
                  viewBox="0 0 14 14"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m4.656 2.255l-.39.09a1.19 1.19 0 0 1-.91 1.43a1.22 1.22 0 0 1-1.44-.92l-.78.16a.81.81 0 0 0-.61 1s.36 1.67.78 3.55m10.85-5.32a1.32 1.32 0 1 1-2.44-1l-.81-.38a.89.89 0 0 0-1.16.47l-3.36 7.91l-.44 1a.89.89 0 0 0 .47 1.16l4.06 1.73a.89.89 0 0 0 1.16-.47l3.8-8.94a.89.89 0 0 0-.43-1.13l-.85-.35Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Information>

              <Separator />
            </div>

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
