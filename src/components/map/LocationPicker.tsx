import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { locationIqConfig } from '@/config/env';
import { LocationPickerProps } from '@/shared/types/component';

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    console.log('LocationPicker useEffect');

    if (!mapRef.current) {
      console.log('mapRef is null');
      return;
    }

    if (mapInstance.current) {
      console.log('map already exists');
      return;
    }

    console.log('Initializing map');

    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    mapInstance.current = map;

    const tileUrl = locationIqConfig.locationIqMapApiStart + locationIqConfig.locationIqMapApi;

    console.log('LocationIQ tile URL:', tileUrl);

    L.tileLayer(tileUrl, {
      attribution: locationIqConfig.locationIqAttribution,
    }).addTo(map);

    const handleMapClick = async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (!markerRef.current) {
        markerRef.current = L.marker([lat, lng]).addTo(map);
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }

      const url =
        locationIqConfig.locationIqUrlStart +
        locationIqConfig.locationIqMapApi +
        locationIqConfig.locationIqUrlLat +
        lat +
        locationIqConfig.locationIqUrlLon +
        lng +
        locationIqConfig.locationIqUrlEnd +
        '&accept-language=en';

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`LocationIQ request failed: ${response.status}`);
        }

        const data = await response.json();

        onLocationSelect({
          lat,
          lon: lng,
          address: data.address || data.display_name,
        });
      } catch (error) {
        console.error('Failed to reverse geocode location:', error);
      }
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
      map.remove();

      mapInstance.current = null;
      markerRef.current = null;
    };
  }, [onLocationSelect]);

  return (
    <div>
      <p className="mb-2 text-sm text-gray-600">Click on the map to select a location</p>

      <div
        ref={mapRef}
        style={{
          height: '400px',
          width: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default LocationPicker;
