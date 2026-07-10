import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WorkflowHeader = () => {
    return (
        <div className="mx-auto my-20 max-w-3xl text-center">
            <Badge
                variant="secondary"
                className="rounded-full border px-4 py-1.5 text-sm font-medium">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                How SlotFlow Works
            </Badge>
            <h2
                className="mt-8 text-4xl font-black tracking-tight leading-tight sm:text-5xl lg:text-6xl">
                Book any service
                <span className="block text-primary">
                    in just four simple <span className="text-[#635bff] underline">steps</span>.
                </span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                From discovering trusted professionals to confirming your appointment,
                SlotFlow makes every booking simple, fast, and secure.
            </p>
        </div>
    );
};

export default WorkflowHeader;