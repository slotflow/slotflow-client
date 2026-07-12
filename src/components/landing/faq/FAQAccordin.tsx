import FAQShimmer from "@/components/shimmers/FAQShimmer";
import MoveUpward from "@/components/animation/MoveUpward";
import { FAQAccordionProps } from "@/shared/interface/componentInterface";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQAccordion = ({
    faqs,
    loading = false,
}: FAQAccordionProps) => {

     if (loading) {
        return <FAQShimmer rows={5} />;
    }


    return (
        <Accordion
            type="multiple"
            className="mx-auto mt-20 flex max-w-5xl flex-col gap-6"
        >
            {
                faqs.map((item) => (
                    <MoveUpward key={item.id}>
                        <AccordionItem value={item.id.toString()}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    </MoveUpward>
                ))
            }
        </Accordion>
    );
};

export default FAQAccordion;