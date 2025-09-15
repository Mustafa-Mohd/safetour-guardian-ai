import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface MapComponentProps {
  onLocationUpdate?: (lat: number, lng: number) => void;
  emergencyAlerts?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    alert_type: string;
    status: string;
  }>;
  touristLocations?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    user_id: string;
  }>;
  showControls?: boolean;
}

const MapComponent = ({ 
  onLocationUpdate, 
  emergencyAlerts = [], 
  touristLocations = [],
  showControls = true 
}: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenInputVisible, setTokenInputVisible] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [91.8933, 25.5788], // Shillong, Meghalaya
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });

    map.current.addControl(geolocate, 'top-right');

    // Get user location on load
    geolocate.on('geolocate', (e: any) => {
      const { longitude, latitude } = e.coords;
      setUserLocation([longitude, latitude]);
      onLocationUpdate?.(latitude, longitude);
    });

    // Handle map clicks for location selection
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      onLocationUpdate?.(lat, lng);
      
      // Add a marker at clicked location
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([lng, lat])
        .addTo(map.current!);
    });

    map.current.on('load', () => {
      // Trigger initial geolocation
      geolocate.trigger();
    });
  };

  // Update markers when alerts or locations change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers (in a real app, you'd manage these more efficiently)
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => {
      if (!marker.classList.contains('user-location-marker')) {
        marker.remove();
      }
    });

    // Add emergency alert markers
    emergencyAlerts.forEach(alert => {
      const el = document.createElement('div');
      el.className = 'emergency-marker';
      el.style.backgroundColor = alert.status === 'active' ? '#ef4444' : '#f97316';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div>
            <h3 style="margin: 0; color: #ef4444;">Emergency Alert</h3>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${alert.alert_type}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> ${alert.status}</p>
          </div>
        `);

      new mapboxgl.Marker(el)
        .setLngLat([alert.longitude, alert.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Add tourist location markers
    touristLocations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'tourist-marker';
      el.style.backgroundColor = '#10b981';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';

      new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current!);
    });
  }, [emergencyAlerts, touristLocations]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenInputVisible(false);
      initializeMap(mapboxToken);
    }
  };

  if (tokenInputVisible) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-primary/20">
        <div className="text-center p-8 max-w-md">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-4">Interactive Map Setup</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To enable the interactive map, please enter your Mapbox public token.
            Get yours from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.eyJ1..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleTokenSubmit}
              className="w-full bg-gradient-primary hover:bg-primary/90"
              disabled={!mapboxToken.trim()}
            >
              Initialize Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
      
      {showControls && (
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-soft">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-emergency rounded-full"></div>
            <span>Emergency Alerts</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <div className="w-3 h-3 bg-safety rounded-full"></div>
            <span>Tourist Locations</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Selected Location</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;