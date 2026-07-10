import {
  Search,
  ShieldCheck,
} from "lucide-react";
import HeroStatCard from "./HeroStatCard";
import { Badge } from "@/components/ui/badge";
import HeroProviderCard from "./HeroProviderCard";

const LandingHeroBookingDashboard = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[40px] bg-primary/10 blur-3xl" />
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          bg-background/80
          backdrop-blur-xl
          shadow-2xl
        "
      >
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
        <div className="p-6">
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              bg-muted/40
              px-4
              py-4
            "
          >
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
        <div className="px-6">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Categories
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Salon",
              "Clinic",
              "Spa",
              "Consultant",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-2xl
                  border
                  bg-background
                  py-4
                  text-center
                  font-medium
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary
                  hover:shadow-lg
                  cursor-pointer
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 px-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold">
              Top Providers
            </h4>
            <span className="text-sm text-primary">
              View all
            </span>
          </div>
          <div className="space-y-4">
            <HeroProviderCard
              name="Elite Hair Studio"
              category="Hair Styling"
              rating="4.9"
              location="Thrissur"
              time="10:30 AM"
            />
            <HeroProviderCard
              name="Dr. Anjali Clinic"
              category="Dental Care"
              rating="4.8"
              location="Kochi"
              time="2:00 PM"
            />
            <HeroProviderCard
              name="Relax Spa"
              category="Wellness"
              rating="4.9"
              location="Calicut"
              time="5:00 PM"
            />
          </div>
        </div>
        <div className="border-t p-6">
          <div className="grid grid-cols-2 gap-4">
            <HeroStatCard
              value="124"
              label="Today's Bookings"
            />
            <HeroStatCard
              value="98%"
              label="Success Rate"
            />
          </div>
        </div>
      </div>
      <div
        className="
          absolute
          -right-8
          top-12
          hidden
          rounded-3xl
          border
          bg-background/90
          p-5
          shadow-xl
          backdrop-blur-xl
          xl:block
        "
      >
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
    </div>
  );
}

export default LandingHeroBookingDashboard;



