import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader } from "lucide-react";

const faqs = [
    {
        value: "item-1",
        question: "How do I book a service through SlotFlow?",
        answer:
            "Search for a provider, compare availability, choose a suitable time slot, and confirm your booking in just a few clicks.",
    },
    {
        value: "item-2",
        question: "Are all providers verified?",
        answer:
            "Yes. Every provider goes through a verification process before being listed, helping maintain quality and trust across the platform.",
    },
    {
        value: "item-3",
        question: "Can I reschedule or cancel my booking?",
        answer:
            "Absolutely. Depending on the provider's cancellation policy, you can reschedule or cancel appointments directly from your booking dashboard.",
    },
    {
        value: "item-4",
        question: "Which payment methods are supported?",
        answer:
            "SlotFlow supports secure online payments through popular payment gateways, making transactions quick and protected.",
    },
    {
        value: "item-5",
        question: "How can I become a service provider?",
        answer:
            "Create a provider account, complete the verification process, add your services, and start accepting bookings from customers.",
    },
    {
        value: "item-6",
        question: "Will I receive booking reminders?",
        answer:
            "Yes. Customers receive booking confirmations and timely reminders to ensure appointments are never missed.",
    },
];

const FAQAccordion = () => {
    return (
        <Accordion
            type="multiple"
            className="mx-auto mt-20 flex max-w-5xl flex-col gap-6"
        >
            {faqs.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default FAQAccordion;