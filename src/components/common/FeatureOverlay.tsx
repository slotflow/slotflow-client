import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

interface FeatureOverlayProps {
    title?: string;
    description?: string;
    isDevMode?: boolean;
}

const FeatureOverlay = ({
    title = 'Coming Soon',
    description = 'This feature is currently under active development.',
    isDevMode = true,
}: FeatureOverlayProps) => {
    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center rounded-b-xl backdrop-blur-[2px] bg-background/30 dark:bg-background/40 border-t border-border/30">
            <div className="flex flex-col items-center max-w-xs space-y-2">
                <div className="p-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary shadow-sm">
                    <Sparkles className="size-5 animate-pulse" />
                </div>
                {isDevMode && (
                    <Badge variant="outline" className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full border-primary/20 bg-primary/5 text-primary">
                        In Development
                    </Badge>
                )}
                <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

export default FeatureOverlay;