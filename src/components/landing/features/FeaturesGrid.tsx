import FeatureCard from "./FeatureCard";
import SearchPreview from "./previews/SearchPreview";
import BookingPreview from "./previews/BookingPreview";
import PaymentPreview from "./previews/PaymentPreview";
import HistoryPreview from "./previews/HistoryPreview";
import ProviderPreview from "./previews/ProviderPreview";
import AvailabilityPreview from "./previews/AvailabilityPreview";

const FeaturesGrid = () => {
  
  return (
    <div className="mt-20 grid auto-rows-[320px] gap-6 lg:grid-cols-3">
      <FeatureCard
        title="Smart Search"
        description="Find trusted providers using category, location, ratings and availability."
        className="lg:col-span-2"
      >
        <SearchPreview />
      </FeatureCard>

      <FeatureCard
        title="Verified Providers"
        description="Every provider goes through a verification process before joining SlotFlow."
      >
        <ProviderPreview />
      </FeatureCard>

      <FeatureCard
        title="Secure Payments"
        description="Pay confidently using trusted payment methods with transparent pricing."
        className="lg:row-span-2  "
      >
        <PaymentPreview />
      </FeatureCard>

      <FeatureCard
        title="Instant Booking"
        description="Book appointments in seconds with real-time availability."
      className="lg:col-span-2"
      >
        <BookingPreview />
      </FeatureCard>

      <FeatureCard
        title="Live Availability"
        description="Only available time slots are shown, avoiding unnecessary back-and-forth."
        className="lg:col-span-2"
      >
        <AvailabilityPreview />
      </FeatureCard>

      <FeatureCard
        title="Booking History"
        description="Access your previous and upcoming bookings from a single dashboard."
        className="lg:col-span-3"
      >
        <HistoryPreview />
      </FeatureCard>
    </div>
  );
};

export default FeaturesGrid;