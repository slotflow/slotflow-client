// import L from 'leaflet';
// import { useEffect, useRef } from 'react';
// import { locationIqConfig } from '@/shared/config/env';
// import { LocationPickerProps } from '@/shared/interface/componentInterface';

// const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {

//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const mapInstance = useRef<L.Map | null>(null);
//   const markerRef = useRef<L.Marker | null>(null);

//   useEffect(() => {

//      console.log('LocationPicker useEffect');

//   if (!mapRef.current) {
//     console.log('mapRef is null');
//     return;
//   }

//   if (mapInstance.current) {
//     console.log('map already exists');
//     return;
//   }

//   console.log('one');

//     if (!mapRef.current || mapInstance.current) return;

//     mapInstance.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

//     L.tileLayer(locationIqConfig.locationIqMapApiStart + locationIqConfig.locationIqMapApi, {
//       attribution: locationIqConfig.locationIqAttribution,
//     }).addTo(mapInstance.current);

//     mapInstance.current.on('click', async (e: L.LeafletMouseEvent) => {
//       const { lat, lng } = e.latlng;

//       if (!markerRef.current) {
//         markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current!);
//       } else {
//         markerRef.current.setLatLng([lat, lng]);
//       }

//       const url =
//         locationIqConfig.locationIqUrlStart +
//         locationIqConfig.locationIqMapApi +
//         locationIqConfig.locationIqUrlLat +
//         lat +
//         locationIqConfig.locationIqUrlLon +
//         lng +
//         locationIqConfig.locationIqUrlEnd;


//       const res = await fetch(url);
//       const data = await res.json();

//       onLocationSelect({
//         lat,
//         lon: lng,
//         address: data.address || data.display_name,
//       });
//     });

//     return () => {
//       mapInstance.current?.remove();
//     };
//   }, [onLocationSelect]);

// //   useEffect(() => {
// //   console.log('LocationPicker useEffect');

// //   if (!mapRef.current || mapInstance.current) {
// //     console.log('map already exists');
// //     return;
// //   }

// //   console.log('one');

// //   mapInstance.current = L.map(mapRef.current).setView(
// //     [20.5937, 78.9629],
// //     5
// //   );

// //   L.tileLayer(
// //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
// //     {
// //       attribution: '&copy; OpenStreetMap contributors',
// //     }
// //   ).addTo(mapInstance.current);

// //   return () => {
// //     mapInstance.current?.remove();
// //     mapInstance.current = null;
// //     markerRef.current = null;
// //   };
// // }, []);

//   return (
//     <div>
//       <p className="mb-2 text-sm text-gray-600">Click on the map to select a location</p>
//       <div
//         ref={mapRef}
//         style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}
//       />
//     </div>
//   );
// };

// export default LocationPicker;

import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { locationIqConfig } from '@/shared/config/env';
import { LocationPickerProps } from '@/shared/interface/componentInterface';

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

    const map = L.map(mapRef.current).setView(
      [20.5937, 78.9629],
      5
    );

    mapInstance.current = map;

    const tileUrl =
      locationIqConfig.locationIqMapApiStart +
      locationIqConfig.locationIqMapApi;

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
        "&accept-language=en";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `LocationIQ request failed: ${response.status}`
          );
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
      <p className="mb-2 text-sm text-gray-600">
        Click on the map to select a location
      </p>

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
