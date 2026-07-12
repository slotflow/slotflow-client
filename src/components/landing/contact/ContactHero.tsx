import { MessageSquareMore } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SplitTextReveal from "@/components/animation/SplitTextReveal";
import MoveUpward from "@/components/animation/MoveUpward";

const ContactHero = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-50 bg-background" />
            <div className="absolute left-1/2 top-20 -z-40 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />
            <div className="absolute right-0 top-1/3 -z-40 h-80 w-80 rounded-full bg-primary/5 blur-[150px]" />
            <div className="absolute left-0 bottom-20 -z-40 h-80 w-80 rounded-full bg-primary/5 blur-[150px]" />
            <div className="absolute inset-0 -z-30 opacity-[0.04]">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
                        backgroundSize: "56px 56px",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 lg:px-0 lg:py-20">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <MoveUpward>

                        <Badge
                            variant="secondary"
                            className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]"
                        >
                            <MessageSquareMore className="mr-2 h-4 w-4 text-primary" />
                            Contact Us
                        </Badge>

                        <SplitTextReveal
                            as="h1"
                            split="lines"
                            once={false}
                            className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                        >
                            Let's build something
                            <br />
                            <span className="text-[#635bff]">great</span> together.
                        </SplitTextReveal>

                        <SplitTextReveal
                            as="p"
                            split="words"
                            once={false}
                            className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl"
                        >
                            Whether you have a question, need support, want to discuss a
                            partnership, or simply want to learn more about Slotflow, our team
                            is here to help. We'd love to hear from you.
                        </SplitTextReveal>
                    </MoveUpward>

                    <MoveUpward>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-green-500" />
                                Usually replies within 24 hours
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-primary" />
                                Available Monday – Friday
                            </div>
                        </div>
                    </MoveUpward>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;