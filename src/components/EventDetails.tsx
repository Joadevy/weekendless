import { AtSign, CalendarDays, Phone } from "lucide-react";

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
import Seat from "./Seat";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import EventParagraph from "./EventParagraph";

type Props = {
  event: EventWithVenue;
};

const EventDetails = ({ event }: Props) => {
  return (
    <Tabs className="w-[350px] lg:w-[850px] mt-5 border" defaultValue="event">
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
              <CardTitle className="text-xl lg:text-3xl font-bold">
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
                <CalendarDays size={20} />
              </EventParagraph>

              <EventParagraph description={event.email}>
                <AtSign size={20} />
              </EventParagraph>

              <EventParagraph description={event.phone}>
                <Phone size={20} />
              </EventParagraph>

              <VenueDetails venue={event.venue} />
            </CardContent>
            <CardFooter>
              <TabsList>
                <TabsTrigger
                  className={buttonVariants({ variant: "default" })}
                  value="reserve"
                >
                  Book your ticket
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
              <Seat eventId={event.id} />
            </section>
          </CardContent>
          <CardFooter className="italic text-slate-500 font-thin">
            We work with mercadopago to manage the payments
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default EventDetails;
