import { Building2 } from "lucide-react";
import { companyValues } from "@/shared/utils/constants";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedCounter from "@/components/animation/AnimatedCounter";

const AboutPage = () => {
    return (
        <main className="w-full">
            <CardSpotlight
                className="border-0 mx-auto transition-colors duration-300 ease-in-out"
                color="var(--spotlight-color)"
            >
                <SectionHeading
                    badge="About"
                    badgeIcon={Building2}
                    title={
                        <>
                            Making scheduling <span className="text-[#635bff]">effortless</span> for every business.
                        </>
                    }
                    description="Slotflow helps businesses simplify appointment booking, automate
                            scheduling, and deliver exceptional customer experiences through an
                            intuitive and reliable platform."
                />
                <section id="mission" className="w-full">
                    <div className="mx-auto mt-28 grid max-w-7xl items-center gap-16 lg:grid-cols-2">
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
                </section>
                <section id="stats" className="w-full">
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
                </section>
            </CardSpotlight>
        </main>
    );
};

export default AboutPage;