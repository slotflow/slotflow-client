import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCheck } from "lucide-react";

const ChatCard = () => {
  return (
    <Card className="w-72 rounded-3xl border-border/60 bg-background/80 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <MessageCircle className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Messages
            </h3>

            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5"
            >
              New
            </Badge>
          </div>

          <div className="space-y-1">
            <p className="font-medium">
              Dr. Meera
            </p>

            <p className="text-sm leading-6 text-muted-foreground">
              Looking forward to meeting you tomorrow at 10:30 AM.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-primary">
            <CheckCheck className="h-4 w-4" />

            <span>Read • Just now</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCard;