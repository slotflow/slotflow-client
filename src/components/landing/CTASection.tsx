import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { redirectPaths } from "@/shared/utils/constants";
import SplitTextReveal from "../animation/SplitTextReveal";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const CTASection = () => {

    const navigate = useNavigate();

    return (
        <section id="cta" className="rpy-32 px-4 md:px-0">
            <div className="elative overflow-hidden max-w-7xl mx-auto ">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-8 py-20 text-center backdrop-blur-xl md:px-16">

                        <Badge
                            variant="secondary"
                            className="rounded-full px-4 py-1.5 hover:border-[#635bff]"
                        >
                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                            Ready to Get Started?
                        </Badge>

                        <SplitTextReveal
                            as="h2"
                            once={false}
                            split="lines"
                            className="mx-auto mt-8 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl"
                        >
                            Book your next
                            <span className="block text-primary">
                                trusted <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent underline">service</span> today.
                            </span>
                        </SplitTextReveal>

                        <SplitTextReveal
                            as="p"
                            once={false}
                            split="words"
                            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
                        >
                            Discover verified professionals, compare availability,
                            schedule appointments instantly, and manage every booking
                            from one beautifully simple platform.
                        </SplitTextReveal>

                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="sm"
                                className="h-10 md:h-14 rounded-xl px-8 text-base shadow-lg shadow-primary/20"
                                onClick={() => navigate(redirectPaths.LOGIN)}
                            >
                                Book a Service
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                className="h-10 md:h-14 rounded-xl px-8 text-base"
                                onClick={() => navigate(redirectPaths.LOGIN)}
                            >
                                Become a Provider
                            </Button>
                        </div>

                        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Verified Providers
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Instant Booking
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Secure Payments
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                AI Powered Search
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;