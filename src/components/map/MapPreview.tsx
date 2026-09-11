import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPreviewProps } from '@/shared/types/component';
import googleMap from '../../assets/logos/external/googleMap.png';

const MapPreview = ({ lat, lon }: MapPreviewProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([lat, lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance.current);

    L.marker([lat, lon]).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
    };
  }, [lat, lon]);

  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

  return (
    <div className="z-40">
      <div
        ref={mapRef}
        className="rounded-xl overflow-hidden shadow-sm"
        style={{
          height: '280px',
          width: '100%',
        }}
      />

      <div className="flex justify-start mt-4">
        <Button
          title="Open in Google Maps"
          variant="default"
          asChild
          className="cursor-pinter"
        >
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <img src={googleMap} className="h-4 w-4 object-contain" />
            Open in Google Maps
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MapPreview;
