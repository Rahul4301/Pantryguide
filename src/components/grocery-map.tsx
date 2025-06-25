'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, MapPin, TriangleAlert } from 'lucide-react';

export default function GroceryMap() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (isMounted) {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          }
        },
        (err) => {
          if (isMounted) {
            setError(`Error: ${err.message}`);
          }
        }
      );
    } else {
      if (isMounted) {
        setError('Geolocation is not supported by your browser.');
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <TriangleAlert className="text-destructive" />
            Configuration Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Google Maps API key is missing. Please create a <code className="bg-muted px-1 py-0.5 rounded-sm">.env.local</code> file and add your key as{' '}
            <code className="bg-muted px-1 py-0.5 rounded-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-lg max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Nearby Grocery Stores</CardTitle>
        <CardDescription>
          Explore grocery stores in your area. Your location is used to center the map.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full rounded-md overflow-hidden relative border">
          <APIProvider apiKey={apiKey}>
            {!position && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="font-semibold">Getting your location...</p>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10 text-center p-4">
                <TriangleAlert className="h-8 w-8 text-destructive mb-2" />
                <p className="font-semibold">Could not get your location</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            )}
            <Map
              mapId="pantrypal-map"
              center={position || { lat: 40.7128, lng: -74.0060 }} // Default to NYC if no position
              zoom={position ? 14 : 10}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              className="h-full w-full"
            >
              {position && (
                <AdvancedMarker position={position} title={'Your Location'}>
                  <div className="relative">
                    <MapPin className="h-10 w-10 text-primary drop-shadow-md" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth={1} />
                  </div>
                </AdvancedMarker>
              )}
            </Map>
          </APIProvider>
        </div>
      </CardContent>
    </Card>
  );
}
