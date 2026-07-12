import { useMemo, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useFaqs from "@/hooks/systemHooks/useFaqs";
import MoveUpward from "@/components/animation/MoveUpward";
import FAQHero from "@/components/landing/faq/FAQPageHeader";
import FAQAccordion from "@/components/landing/faq/FAQAccordin";
import FAQPageSearch from "@/components/landing/faq/FAQPageSearch";

const FAQPage = () => {

    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const LIMIT = 20;

    const { faqs, faqLoading, faqTotal } = useFaqs({
        limit: LIMIT,
        skip: (page - 1) * LIMIT,
    });


    const filteredFaqs = useMemo(() => {
        const query = searchText.trim().toLowerCase();

        if (!query) {
            return faqs;
        }

        return faqs.filter((faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.value.toLowerCase().includes(query)
        );
    }, [faqs, searchText]);

    return (
        <main className="min-h-screen">
            <MoveUpward>
                <FAQHero />
            </MoveUpward>
            <MoveUpward>
                <FAQPageSearch
                    value={searchText}
                    onChange={setSearchText}
                />
            </MoveUpward>
            <FAQAccordion
                faqs={filteredFaqs}
                loading={faqLoading}
            />

            {faqs.length < faqTotal && (
                <div className="mt-16 flex flex-col items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        disabled={faqLoading}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="group h-12 rounded-full border-primary/20 bg-background/70 px-8 backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-xl disabled:pointer-events-none disabled:opacity-70"
                    >
                        {faqLoading ? (
                            <>
                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                Load More FAQs
                                <span className="ml-2 transition-transform duration-300 group-hover:translate-y-[2px]">
                                    ↓
                                </span>
                            </>
                        )}
                    </Button>

                    {faqLoading && (
                        <p className="animate-pulse text-sm text-muted-foreground">
                            Loading more frequently asked questions...
                        </p>
                    )}
                </div>
            )}
        </main>
    )
}

export default FAQPage;