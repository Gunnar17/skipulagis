import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const MapViewer: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-21.95, 64.14],
      zoom: 12,
    });

    map.on('load', () => {
      map.addSource('skipulag', {
        type: 'geojson',
        data: '/data/skipulag.geojson',
      });
      map.addLayer({
        id: 'skipulag-fill',
        type: 'fill',
        source: 'skipulag',
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.4,
        },
      });
      map.addLayer({
        id: 'skipulag-border',
        type: 'line',
        source: 'skipulag',
        paint: {
          'line-color': '#0000ff',
          'line-width': 2,
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-[600px]" />;
};

export default MapViewer;