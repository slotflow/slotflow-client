import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MoveUpward from "@/components/animation/MoveUpward";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import SplitTextReveal from "@/components/animation/SplitTextReveal";
import { heroPeople, redirectPaths } from "@/shared/utils/constants";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const LandingHeroContent = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center px-4 md:px-0">
            <Badge
                variant="secondary"
                className="w-fit rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]"
            >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                Trusted Booking Platform
            </Badge>
            
            <div className="mt-8 space-y-6">
                <SplitTextReveal
                    as="h1"
                    once={false}
                    className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-3xl md:text-6xl xl:text-7xl "
                    split="lines"
                    delay={1}
                >
                    Book trusted
                    <br />
                     <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">local services</span>
                    <br />
                    with confidence.
                </SplitTextReveal>

                <SplitTextReveal
                    as="p"
                    once={false}
                    className="text-justify max-w-xl text-lg leading-8 text-muted-foreground lg:text-xl"
                    split="words"
                >
                    Discover verified professionals, compare availability,
                    schedule appointments instantly, and manage every booking
                    from one beautifully simple platform.
                </SplitTextReveal>
            </div>
            <MoveUpward>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Button
                        className="h-10 lg:h-14 rounded-xl px-8 text-base shadow-lg shadow-primary/20"
                        onClick={() => navigate(redirectPaths.LOGIN)}
                    >
                        Book a Service
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-10 lg:h-14 rounded-xl px-8 text-base"
                        onClick={() => navigate(redirectPaths.LOGIN)}
                    >
                        Become a Provider
                    </Button>
                </div>
            </MoveUpward>
            <MoveUpward>
                <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-6">
                    <div className="flex -space-x-3">
                        <AnimatedTooltip items={heroPeople} />
                    </div>
                    <div>
                        <p className="font-semibold">
                            10,000+ happy customers
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Trusted across multiple service categories
                        </p>
                    </div>
                </div>
            </MoveUpward>
            <MoveUpward>
                <div className="mt-12 grid gap-6 grid-cols-2 md:grid-col-3">
                    <Feature
                        icon={<ShieldCheck className="h-5 w-5" />}
                        title="Verified"
                        subtitle="Professionals"
                    />
                    <Feature
                        icon={<CheckCircle2 className="h-5 w-5" />}
                        title="Instant"
                        subtitle="Confirmation"
                    />
                    <Feature
                        icon={<Sparkles className="h-5 w-5" />}
                        title="Secure"
                        subtitle="Payments"
                    />
                </div>
            </MoveUpward>
            <MoveUpward>
                <div className="mt-14 grid grid-cols-4 gap-8 border-t pt-10 md:grid-cols-4">
                    <AnimatedCounter
                        from={0}
                        to={10}
                        suffix="k+"
                        text="Bookings"
                        className="text-2xl md:text-3xl font-bold"
                    />
                    <AnimatedCounter
                        from={0}
                        to={5}
                        suffix="k+"
                        text="Providers"
                        className="text-2xl md:text-3xl font-bold"
                    />
                    <AnimatedCounter
                        from={0}
                        to={250}
                        suffix="+"
                        text="Cities"
                        className="text-2xl md:text-3xl font-bold"
                    />
                    <AnimatedCounter
                        from={0}
                        to={4.9}
                        suffix="★"
                        decimals={1}
                        text="Rating"
                        className="text-2xl md:text-3xl font-bold"
                    />
                </div>
            </MoveUpward>
        </div>
    );
};

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

function Feature({
    icon,
    title,
    subtitle,
}: FeatureProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
            </div>

            <div>
                <p className="font-semibold">{title}</p>

                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default LandingHeroContent;