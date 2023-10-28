import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const AccordionQA = () => {
  return (
    <Accordion collapsible className="w-full" type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Weekendless?</AccordionTrigger>
        <AccordionContent>
          ⁖ It&apos;s an app where you can reserve seats in many awesome events.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Why do I need to sign in?</AccordionTrigger>
        <AccordionContent>
          ⁖ In order to reserve seats, you need to sign in first to know who you
          are.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Are the events real?</AccordionTrigger>
        <AccordionContent>
          ⁖ No, they are just for demo purposes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionQA;
