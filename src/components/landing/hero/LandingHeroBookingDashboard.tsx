import {
  Search,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import HeroProviderCard from "./HeroProviderCard";
import Floating from "@/components/animation/Floating";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import MoveUpward from "@/components/animation/MoveUpward";

const LandingHeroBookingDashboard = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[40px] bg-primary/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-32px border bg-background/80 backdrop-blur-xl shadow-2xl">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Welcome back
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Find Your Service
              </h3>
            </div>
            <Badge className="rounded-full">
              Live
            </Badge>
          </div>
        </div>
        <MoveUpward>
          <div className="p-6">
            <div className="flex items-center gap-3 rounded-2xl border bg-muted/40 px-4 py-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Search services
                </p>
                <p className="font-medium">
                  Hair Salon, Dentist...
                </p>
              </div>
            </div>
          </div>
        </MoveUpward>
        <MoveUpward>
          <div className="px-6">
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {[
                "Salon",
                "Clinic",
                "Spa",
                "Consultant",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border bg-background p-2 md:p-4 text-center font-medium transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </MoveUpward>
        <div className="mt-8 px-6">
          <MoveUpward>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold">
                Top Providers
              </h4>
              <span className="text-sm text-primary">
                View all
              </span>
            </div>
          </MoveUpward>
          <div className="space-y-4">
            <MoveUpward>
              <HeroProviderCard
                name="Elite Hair Studio"
                category="Hair Styling"
                rating="4.9"
                location="Thrissur"
                time="10:30 AM"
              />
            </MoveUpward>
            <MoveUpward>
              <HeroProviderCard
                name="Dr. Anjali Clinic"
                category="Dental Care"
                rating="4.8"
                location="Kochi"
                time="2:00 PM"
              />
            </MoveUpward>
            <MoveUpward>
              <HeroProviderCard
                name="Relax Spa"
                category="Wellness"
                rating="4.9"
                location="Calicut"
                time="5:00 PM"
              />
            </MoveUpward>
          </div>
        </div>
        <MoveUpward>
          <div className="border-t p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-muted/30 p-5">
                <AnimatedCounter
                  text="Todays Bookings"
                  to={124}
                  className="text-2xl font-bold"
                />
              </div>
              <div className="rounded-2xl border bg-muted/30 p-5">
                <AnimatedCounter
                  text="Success Rate"
                  to={90}
                  suffix="%"
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </div>
        </MoveUpward>
      </div>
      <Floating className="absolute -right-8 top-12 hidden xl:block">
        <div className="rounded-3xl border bg-background/90 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-500/10 p-3">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">
                Booking Confirmed
              </p>
              <p className="text-sm text-muted-foreground">
                Appointment secured.
              </p>
            </div>
          </div>
        </div>
      </Floating>
    </div>
  );
}

export default LandingHeroBookingDashboard;



