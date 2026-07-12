import FAQHeader from "./faq/FAQHeader";
import FAQAccordion from "./faq/FAQAccordin";
import FAQBackground from "./faq/FAQBackground";
import MoveUpward from "../animation/MoveUpward";
import useFaqs from "@/hooks/systemHooks/useFaqs";

const FAQSection = () => {

    const { faqs, faqLoading } = useFaqs({
        limit: 5,
        skip: 0,
    });

    return (
        <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-32 md:px-0">
            <FAQBackground />

            <div className="container relative z-10">
                <MoveUpward>
                    <FAQHeader />
                </MoveUpward>

                <FAQAccordion
                    loading={faqLoading}
                    faqs={faqs.slice(0, 5)}
                />
            </div>
        </section>
    );
};

export default FAQSection;