import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FAQPageSearchProps } from "@/shared/interface/componentInterface";

const FAQPageSearch = ({
    onChange,
    value
}: FAQPageSearchProps) => {
    return (
        <section className="max-w-7xl mx-auto flex flex-col justify-center items-center">
            <div className="mt-14 w-full max-w-2xl">
                <div className="group relative">
                    <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        type="text"
                        placeholder="Search for questions..."
                        className="h-14 rounded-2xl border bg-background/70 pl-14 pr-5 text-base backdrop-blur-xl transition-all focus-visible:ring-2 focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary" />
                    50+ Questions Answered
                </div>

                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500" />
                    Updated Regularly
                </div>

                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    Search Instantly
                </div>
            </div>
        </section>
    )
}

export default FAQPageSearch;