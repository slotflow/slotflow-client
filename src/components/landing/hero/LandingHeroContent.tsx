import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const LandingHeroContent = () => {
    return (
        <div className="flex flex-col justify-center">
            <Badge
                variant="secondary"
                className="
          w-fit
          rounded-full
          border
          px-4
          py-1.5
          text-sm
          font-medium
        "
            >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                Trusted Booking Platform
            </Badge>
            <div className="mt-8 space-y-6">

                <h1
                    className="
            max-w-2xl
            text-5xl
            font-black
            tracking-tight
            leading-[1.05]
            sm:text-6xl
            xl:text-7xl
          "
                >
                    Book trusted
                    <span className="block text-primary">
                        local services
                    </span>
                    with confidence.
                </h1>
                <p
                    className="
            max-w-xl
            text-lg
            leading-8
            text-muted-foreground
            lg:text-xl
          "
                >
                    Discover verified professionals, compare availability,
                    schedule appointments instantly, and manage every booking
                    from one beautifully simple platform.
                </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                    size="lg"
                    className="
            h-14
            rounded-xl
            px-8
            text-base
            shadow-lg
            shadow-primary/20
          "
                >
                    Book a Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="
            h-14
            rounded-xl
            px-8
            text-base
          "
                >
                    Become a Provider
                </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border-2
                border-background
                bg-primary/10
                font-semibold
                text-primary
              "
                        >
                            {String.fromCharCode(64 + item)}
                        </div>
                    ))}
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
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
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
            <div
                className="
          mt-14
          grid
          grid-cols-2
          gap-8
          border-t
          pt-10
          md:grid-cols-4
        "
            >
                <Stat
                    value="10K+"
                    label="Bookings"
                />
                <Stat
                    value="5K+"
                    label="Providers"
                />
                <Stat
                    value="250+"
                    label="Cities"
                />
                <Stat
                    value="4.9★"
                    label="Rating"
                />
            </div>
        </div>
    );
}

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

            <div
                className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
        "
            >
                {icon}
            </div>

            <div>

                <p className="font-semibold">
                    {title}
                </p>

                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>

            </div>

        </div>
    );
}

interface StatProps {
    value: string;
    label: string;
}

function Stat({
    value,
    label,
}: StatProps) {
    return (
        <div>
            <h3 className="text-3xl font-bold">
                {value}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    );
}

export default LandingHeroContent;