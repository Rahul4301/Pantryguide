'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const GroceryMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError("Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.");
      setLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'maps'],
    });

    const initializeMap = async (position: GeolocationPosition) => {
      try {
        const { Map } = await loader.importLibrary('maps');
        const { PlacesService } = await loader.importLibrary('places');

        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: location,
            zoom: 14,
            mapId: 'PANTRYPAL_MAP'
          });

          const service = new PlacesService(map);
          const request: google.maps.places.PlaceSearchRequest = {
            location,
            radius: 5000,
            keyword: 'grocery or supermarket',
          };

          service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              for (const place of results) {
                if (place.geometry?.location) {
                  new google.maps.Marker({
                    map,
                    position: place.geometry.location,
                    title: place.name,
                  });
                }
              }
            }
          });
        }
      } catch (e) {
        console.error("Failed to load Google Maps", e);
        setError("Failed to load Google Maps. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        initializeMap,
        (err) => {
          setError(`Error getting location: ${err.message}. Please enable location services in your browser.`);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex items-start justify-center">
        <Card className="shadow-lg w-full">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Nearby Grocery Stores</CardTitle>
                <CardDescription>Find grocery stores near your current location.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading && (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Loading map and finding your location...</p>
                        <Skeleton className="h-[500px] w-full rounded-md" />
                    </div>
                )}
                {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                )}
                <div ref={mapRef} style={{ height: '500px', display: loading || error ? 'none' : 'block' }} className="w-full rounded-md bg-muted" />
            </CardContent>
        </Card>
    </div>
  );
};

export default GroceryMap;
