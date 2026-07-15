import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MoveUpward from "../animation/MoveUpward";
import SplitTextReveal from "../animation/SplitTextReveal";
import IntegrationCard from "./integration/IntegrationCard";
import { landingPageIntegrations } from "@/shared/utils/constants";

const IntegrationsSection = () => {
    return (
        <section id="integrations" className="w-full">
            <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-32 md:px-0">
                <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
                <div className="container relative">
                    <MoveUpward>
                        <div className="mx-auto max-w-3xl text-center">
                            <Badge
                                variant="secondary"
                                className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]"
                            >
                                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                                Seamless Integrations
                            </Badge>
                            <SplitTextReveal
                                as="h2"
                                once={false}
                                split="lines"
                                className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                            >
                                <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent underline">
                                    Connect
                                </span>
                                {" "}with the
                                <br />
                                tools you already use.
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="p"
                                once={false}
                                split="words"
                                className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground"
                            >
                                Integrate calendars, payments, maps, and communication tools to
                                automate bookings and provide a seamless experience for both
                                customers and providers.
                            </SplitTextReveal>
                        </div>
                    </MoveUpward>
                    <MoveUpward>
                        <div className="relative mt-20 rounded-[2rem] border bg-background p-8 backdrop-blur-xl md:p-12">
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {landingPageIntegrations
                                    .filter((integration) => integration.isActive)
                                    .map((integration) => (
                                        <IntegrationCard
                                            key={integration.title}
                                            {...integration}
                                        />
                                    ))}
                            </div>
                        </div>
                    </MoveUpward>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                        <span>✓ OAuth 2.0</span>
                        <span>✓ Secure Payments</span>
                        <span>✓ Real-time Sync</span>
                        <span>✓ Developer Friendly</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegrationsSection;