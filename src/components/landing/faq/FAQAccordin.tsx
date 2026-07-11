import { appConfig } from "@/shared/config/env";
import { useEffect, useRef, useState } from "react";
import { contentfulAxiosInstance } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { setFaqs } from "@/shared/redux/slices/appSlice";
import FAQShimmer from "@/components/shimmers/FAQShimmer";
import MoveUpward from "@/components/animation/MoveUpward";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { ContentfulResponse, FaqFields } from "@/shared/interface/commonInterface";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQAccordion = () => {

    const dispatch = useDispatch<AppDispatch>();
    const faqs = useSelector((state: RootState) => state.app.faqs);
    const [faqsLoading, setFaqsLoading] = useState<boolean>(false);
    const hasFetchedFaqs = useRef(false);

    const getFaqs = async (): Promise<FaqFields[]> => {
        const { data } = await contentfulAxiosInstance.get<ContentfulResponse<FaqFields>>("/entries", {
            params: {
                content_type: "faq",
            },
        });

        return data.items.map((faq) => faq.fields);
    };

    useEffect(() => {
        if (faqs.length >= 5 || hasFetchedFaqs.current) {
            return;
        }

        hasFetchedFaqs.current = true;
        let isMounted = true;

        const fetchReviews = async () => {
            try {
                setFaqsLoading(true);
                const fetchedFaqs = await getFaqs();
                if (isMounted) {
                    dispatch(setFaqs(fetchedFaqs));
                }
            } catch (error) {
                if (appConfig.isDevelopment) {
                    console.error("Failed to fetch faqs:", error);
                }
            } finally {
                if (isMounted) {
                    setFaqsLoading(false);
                }
            }
        };

        void fetchReviews();

        return () => {
            isMounted = false;
        };
    }, [dispatch, faqs.length]);

    return faqsLoading ? (
        <FAQShimmer rows={6} />
    ) : (
        <Accordion
            type="multiple"
            className="mx-auto mt-20 flex max-w-5xl flex-col gap-6"
        >
            {
                faqs.map((item) => (
                    <MoveUpward key={item.value}>
                        <AccordionItem value={item.value}>
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