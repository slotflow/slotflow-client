import FAQHeader from "./faq/FAQHeader";
import FAQAccordion from "./faq/FAQAccordin";
import FAQBackground from "./faq/FAQBackground";
import MoveUpward from "../animation/MoveUpward";

const FAQSection = () => {

    return (
        <section className="max-w-7xl mx-auto relative overflow-hidden py-32 px-4 md:px-0">
            <FAQBackground />
            <div className="container relative z-10">
                <MoveUpward>
                    <FAQHeader />
                </MoveUpward>
                <FAQAccordion />
            </div>
        </section>
    );
};

export default FAQSection;