import WorldMap from "@/components/ui/world-map";
import AnimatedHeadingSection from "./AnimatedHeadingSection";

const WorldMapWrapper = () => {
  return (
    <div className="py-40 w-full h-full">
      <AnimatedHeadingSection
        title="Slotflow"
        animatedWord="Connectivity"
        description="Slotflow simplifies scheduling with real time availability, reminders, and smooth team coordination."
      />
      <WorldMap
        dots={[
          { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
          { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
          { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
          { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
          { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 28.6139, lng: 77.209 } },
          { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
          { start: { lat: 22.5726, lng: 88.3639 }, end: { lat: 28.6139, lng: 77.209 } }
        ]}
      />
    </div>
  );
};

export default WorldMapWrapper;
