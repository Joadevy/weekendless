import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { type EventWithVenue } from "../server/models/Events";

import VenueDetails from "./VenueDetails";
import Seats from "./Seat";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import EventParagraph from "./EventParagraph";

type Props = {
  event: EventWithVenue;
};

const EventDetails = ({ event }: Props) => {
  return (
    <Tabs
      className="max-w-[400px] lg:max-w-none lg:w-[900px] mt-5"
      defaultValue="event"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="event">Event</TabsTrigger>
        <TabsTrigger value="reserve">Reserve</TabsTrigger>
      </TabsList>
      <TabsContent value="event">
        <Card className="flex flex-col lg:flex-row lg:gap-2 lg:items-center p-2 lg:h-[525px]">
          <header className="relative h-48 lg:h-[450px] w-full overflow-hidden rounded-lg object-cover">
            <img
              alt=""
              className="aspect-auto h-full w-full"
              src={event.imageUrl}
            />
          </header>

          <section>
            <CardHeader>
              <CardTitle className="text-xl lg:text-4xl font-bold">
                {event.name}
              </CardTitle>
              <CardDescription className="italic">
                {event.description}
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-2 ">
              <EventParagraph
                description={new Date(event.date).toLocaleString("en", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
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
              </EventParagraph>

              <EventParagraph description={event.email}>
                <svg
                  height="1.3em"
                  viewBox="0 0 24 24"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6H5m6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72l-8.37 5.43Z"
                    fill="currentColor"
                  />
                </svg>
              </EventParagraph>

              <EventParagraph description={event.phone}>
                <svg
                  height="1.3em"
                  viewBox="0 0 24 24"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6 14c-.2-.1-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1c-.2.2-.6.8-.8 1c-.1.2-.3.2-.5.1c-.7-.3-1.4-.7-2-1.2c-.5-.5-1-1.1-1.4-1.7c-.1-.2 0-.4.1-.5c.1-.1.2-.3.4-.4c.1-.1.2-.3.2-.4c.1-.1.1-.3 0-.4c-.1-.1-.6-1.3-.8-1.8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3c-.6.6-.9 1.3-.9 2.1c.1.9.4 1.8 1 2.6c1.1 1.6 2.5 2.9 4.2 3.7c.5.2.9.4 1.4.5c.5.2 1 .2 1.6.1c.7-.1 1.3-.6 1.7-1.2c.2-.4.2-.8.1-1.2l-.4-.2m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2c5.5 0 9.9-4.4 9.9-9.9c.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3c-1.5 0-2.9-.4-4.2-1.1l-.3-.2l-3.1.8l.8-3l-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4"
                    fill="currentColor"
                  />
                </svg>
              </EventParagraph>

              <VenueDetails venue={event.venue} />
            </CardContent>
            <CardFooter className="w-full">
              <TabsList className="w-full">
                <TabsTrigger
                  className={
                    buttonVariants({ variant: "default" }) + " font-bold w-full"
                  }
                  value="reserve"
                >
                  I want to be there!
                </TabsTrigger>
              </TabsList>
            </CardFooter>
          </section>
        </Card>
      </TabsContent>

      <TabsContent value="reserve">
        <Card className="h-[525px]">
          <CardHeader>
            <CardTitle>Reserve your ticket</CardTitle>
            <CardDescription className="italic">
              Choose your favorite, and we&apos;ll reserve it for you!
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-2">
            <section>
              <Seats event={event} />
            </section>
          </CardContent>
          <CardFooter className="italic text-slate-500 font-thin">
            We collaborate with MercadoPago to handle payments, and the
            displayed price is in Argentine Pesos (ARS).
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default EventDetails;
