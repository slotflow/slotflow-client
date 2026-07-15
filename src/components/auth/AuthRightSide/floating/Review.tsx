import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareHeart, Star, CheckCircle2 } from "lucide-react";

const ReviewCard = () => {
  return (
    <Card className="w-72 rounded-3xl border-border/60 bg-background/80 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <MessageSquareHeart className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Feedback
            </h3>

            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5"
            >
              Pending
            </Badge>
          </div>

          <div>
            <p className="font-medium">
              Share your experience
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your feedback helps providers improve their services and assists
              others in making informed decisions.
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <Star className="h-5 w-5 fill-primary text-primary" />
            <Star className="h-5 w-5 fill-primary text-primary" />
            <Star className="h-5 w-5 fill-primary text-primary" />
            <Star className="h-5 w-5 text-muted-foreground" />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-xl"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Leave a Review
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;