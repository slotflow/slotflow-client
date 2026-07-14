import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SplitTextReveal from "../animation/SplitTextReveal";

interface PageHeroProps {
    badge: string;
    badgeIcon: LucideIcon;
    title: ReactNode;
    description: string;
}

const PageHeading = ({
    badge,
    badgeIcon: BadgeIcon,
    title,
    description,
}: PageHeroProps) => {
    return (
        <section className="relative overflow-hidden w-full">
            <div className="py-10 lg:py-20 max-w-7xl mx-auto px-4 lg:px-0">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <Badge
                        variant="secondary"
                        className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]"
                    >
                        <BadgeIcon className="mr-2 h-4 w-4 text-primary" />
                        {badge}
                    </Badge>

                    <SplitTextReveal
                        as="h1"
                        split="lines"
                        className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                    >
                        {title}
                    </SplitTextReveal>

                    <SplitTextReveal
                        as="p"
                        split="words"
                        className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl"
                    >
                        {description}
                    </SplitTextReveal>
                </div>
            </div>
        </section>
    );
};

export default PageHeading;