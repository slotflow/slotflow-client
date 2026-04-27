import WorldMap from "@/components/ui/world-map";
import AnimatedHeadingSection from "../animation/AnimatedHeadingSection";
import { mapDotLitLocationsCoordinates } from "@/shared/utils/constants";

const WorldMapWrapper = () => {
  return (
    <div className="py-40 w-full h-full">
      <AnimatedHeadingSection
        title="Slotflow"
        animatedWord="Connectivity"
        description="Slotflow simplifies scheduling with real time availability, reminders, and smooth team coordination."
      />
      <WorldMap
        dots={mapDotLitLocationsCoordinates}
      />
    </div>
  );
};

export default WorldMapWrapper;
