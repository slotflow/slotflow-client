import L from "leaflet";
import { useEffect, useRef } from "react";
import { Location } from "@/utils/interface/entityInterface/addressInterface";

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_MAP_API_KEY;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer(
      `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?key=${LOCATIONIQ_KEY}`,
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    ).addTo(mapInstance.current);

    mapInstance.current.on("click", async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (!markerRef.current) {
        markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current!);
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }

      const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`;

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
