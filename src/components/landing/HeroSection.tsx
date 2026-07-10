import React from "react";
import LandingHeroContent from "./hero/LandingHeroContent";
import LandingHeroBookingDashboard from "./hero/LandingHeroBookingDashboard";

const HeroSection: React.FC = () => {

  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 items-center gap-20">
        <LandingHeroContent />
        <LandingHeroBookingDashboard />
      </div>
    </section>
  );
}

export default HeroSection;