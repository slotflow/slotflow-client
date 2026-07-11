import WorldMap from "@/components/ui/world-map";
import { mapDotLitLocationsCoordinates } from "@/shared/utils/constants";

const WorldMapWrapper: React.FC = () => {
  return (
    <div className="py-40 w-full h-full">
      <WorldMap
        dots={mapDotLitLocationsCoordinates}
      />
    </div>
  );
};

export default WorldMapWrapper;
