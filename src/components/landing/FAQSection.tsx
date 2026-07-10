import FAQHeader from "./faq/FAQHeader";
import FAQAccordion from "./faq/FAQAccordin";
import FAQBackground from "./faq/FaqBackground";

const FAQSection = () => {
    return (
        <section className="max-w-7xl mx-auto relative overflow-hidden py-32">
            <FAQBackground />
            <div className="container relative z-10">
                <FAQHeader />
                <FAQAccordion />
            </div>
        </section>
    );
};

export default FAQSection;