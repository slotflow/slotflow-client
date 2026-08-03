import { useEffect } from "react";
import { appConfig } from "@/shared/config/env";
import { getFaqs } from "@/shared/apis/contentful";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { appendFaqs, setFaqTotal, setFaqLoading } from "@/shared/redux/slices/appSlice";

interface UseFaqsProps {
    limit: number;
    skip: number;
}

const useFaqs = ({
    limit,
    skip,
}: UseFaqsProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const faqs = useSelector((state: RootState) => state.app.faqs);
    const faqLoading = useSelector((state: RootState) => state.app.faqLoading);
    const faqTotal = useSelector((state: RootState) => state.app.faqTotal);

    useEffect(() => {

        if (faqs.length >= skip + limit) {
            return;
        }

        const fetchFaqs = async () => {
            try {
                dispatch(setFaqLoading(true));
                const response = await getFaqs({
                    limit,
                    skip,
                });

                dispatch(appendFaqs(response.faqs));
                dispatch(setFaqTotal(response.total));

            } catch (error) {
                if (appConfig.isDevelopment) {
                    console.error("Faqs fetching error : ", error);
                }

            } finally {
                dispatch(setFaqLoading(false));
            }
        };

        void fetchFaqs();

    }, [limit, skip, dispatch, faqs.length]);

    return {
        faqs,
        faqLoading,
        faqTotal,
    };

};

export default useFaqs;