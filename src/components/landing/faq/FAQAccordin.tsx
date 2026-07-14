import { SearchX } from "lucide-react";
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

    if (faqs.length === 0) {
        return (
            <section id="no-faqs" className="w-full">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-24 text-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                        <SearchX className="h-12 w-12 text-primary" />
                    </div>

                    <h2 className="mt-8 text-3xl font-bold tracking-tight">
                        No FAQs Found
                    </h2>

                    <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                        We couldn't find any FAQs matching your search. Try another keyword or
                        browse our Help Center for more answers.
                    </p>
                </div>
            </section>
        )
    }


    return (
        <section id="according">
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
        </section>
    );
};

export default FAQAccordion;