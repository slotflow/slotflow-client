import L from "leaflet";
import { useEffect, useRef } from "react";
import { locationIqConfig } from "@/shared/config/env";
import { Location } from "@/shared/interface/entityInterface/addressInterface";

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer(locationIqConfig.locationIqMapApiStart + locationIqConfig.locationIqMapApi,
      {
        attribution: locationIqConfig.locationIqAttribution,
      }
    ).addTo(mapInstance.current);

    mapInstance.current.on("click", async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (!markerRef.current) {
        markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current!);
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }

      const url = locationIqConfig.locationIqUrlStart + locationIqConfig.locationIqMapApi + locationIqConfig.locationIqUrlLat + lat + locationIqConfig.locationIqUrlLon + lng + locationIqConfig.locationIqUrlEnd;

      const res = await fetch(url);
      const data = await res.json();

      onLocationSelect({
        lat,
        lon: lng,
        address: data.address || data.display_name,
      });
    });

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  return (
    <div>
      <p className="mb-2 text-sm text-gray-600">Click on the map to select a location</p>
      <div
        ref={mapRef}
        style={{ height: "400px", width: "100%", borderRadius: "10px", overflow: "hidden" }}
      />
    </div>
  );
}
