import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { companyValues } from "@/shared/utils/constants";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import SplitTextReveal from "@/components/animation/SplitTextReveal";
import AnimatedCounter from "@/components/animation/AnimatedCounter";

const AboutPage = () => {
    return (
        <section id="about" className="w-full">
            <CardSpotlight
                className="border-0 mx-auto transition-colors duration-300 ease-in-out"
                color="var(--spotlight-color)"
            >
                <div className="mx-auto max-w-7xl px-4 py-10 lg:py-20 lg:px-0">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge
                            variant="secondary"
                            className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff] relative"
                        >
                            <Building2 className="mr-2 h-4 w-4 text-primary" />
                            About
                        </Badge>

                        <SplitTextReveal
                            as="h1"
                            split="lines"
                            className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                        >
                            Making scheduling <span className="text-[#635bff]">effortless</span> for every business.
                        </SplitTextReveal>

                        <SplitTextReveal
                            as="p"
                            split="words"
                            className="mx-auto mt-8 max-w-3xl text-lg text-muted-foreground md:text-xl"
                        >
                            Slotflow helps businesses simplify appointment booking, automate
                            scheduling, and deliver exceptional customer experiences through an
                            intuitive and reliable platform.
                        </SplitTextReveal>
                    </div>
                    <div className="mx-auto mt-28 grid max-w-6xl items-center gap-16 lg:grid-cols-2">
                        <div
                            className="dark:text-white"
                        >
                            <h2 className="text-3xl font-bold relative">
                                Our Mission
                            </h2>

                            <p className="mt-6 leading-8 relative">
                                We believe scheduling should never become a barrier between
                                businesses and their customers. Our mission is to remove
                                complexity, reduce manual work, and create booking experiences
                                that feel fast, intuitive, and dependable.
                            </p>

                            <p className="mt-6 leading-8 relative">
                                Whether you're an independent consultant, a healthcare provider,
                                or a growing organization, Slotflow gives you the tools to manage
                                appointments with confidence.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {companyValues.map((value) => (
                                <div
                                    key={value.title}
                                    className="rounded-3xl border bg-background/70 p-6 backdrop-blur-xl relative text-center dark:text-white"
                                >
                                    <div className="flex justify-center">
                                        <value.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <p className="text-xl font-bold relative z-20 mt-2">
                                        {value.title}
                                    </p>

                                    <p className="mt-4 relative z-20 text-sm">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-10 text-center md:grid-cols-3 mt-20 p-10 border relative bg-background">
                        <AnimatedCounter
                            text="Platform Reliability"
                            to={99.9}
                            className="text-5xl font-bold text-primary"
                            suffix="%"
                        />
                        <AnimatedCounter
                            text="Booking Availability"
                            to={24}
                            className="text-5xl font-bold text-primary"
                            suffix="/7"
                        />
                        <div>
                            <h3 className="text-5xl font-bold text-primary">∞</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Possibilities to Grow
                            </p>
                        </div>
                    </div>
                </div>
            </CardSpotlight>

        </section>
    );
};

export default AboutPage;