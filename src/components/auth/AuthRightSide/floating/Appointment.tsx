import {
    Clock3,
    MapPin,
    CheckCircle2,
    CalendarDays,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AppointmentCard = () => {
  return (
    <Card className="w-80 rounded-3xl border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">
              Upcoming Appointment
            </h3>

            <p className="text-sm text-muted-foreground">
              Tomorrow
            </p>
          </div>
        </div>

        <Badge className="rounded-full">
          Confirmed
        </Badge>
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-4">
        <h4 className="font-semibold">
          Hair Consultation
        </h4>

        <p className="mt-1 text-sm text-muted-foreground">
          Professional Service Provider
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />

          <span>10:30 AM - 11:15 AM</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />

          <span>Online Consultation</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-green-600">
        <CheckCircle2 className="h-4 w-4" />

        <span>You're all set for your appointment.</span>
      </div>
    </Card>
  );
};

export default AppointmentCard;