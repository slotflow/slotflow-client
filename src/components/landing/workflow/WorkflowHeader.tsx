import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SplitTextReveal from "@/components/animation/SplitTextReveal";

const WorkflowHeader = () => {
    return (
        <div className="mx-auto my-20 max-w-3xl text-center">
            <Badge
                variant="secondary"
                className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                How SlotFlow Works
            </Badge>
            <SplitTextReveal
                as="h2"
                once={false}
                split="lines"
                className="mt-8 text-4xl font-black tracking-tight leading-tight sm:text-5xl lg:text-6xl"
            >
                Book any service
                <br />
                in just four simple <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent underline">steps.</span>
            </SplitTextReveal>
            <SplitTextReveal
                as="p"
                once={false}
                split="words"
                className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground"
            >
                From discovering trusted professionals to confirming your appointment,
                SlotFlow makes every booking simple, fast, and secure.
            </SplitTextReveal>
        </div>
    );
};

export default WorkflowHeader;