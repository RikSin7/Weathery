import { useQuery } from "@tanstack/react-query";
import { useLocation } from "./useLocation";
import { fetchAirQuality } from "../api/airQualityApi";

export const useAirQuality = (date) => {
  // Get the location from our centralized hook
  const { data: location, isSuccess } = useLocation();

  // Fetch Air Quality only when location is successfully loaded
  return useQuery({
    queryKey: ["airQuality", location?.lat, location?.lon, date],
    queryFn: () => fetchAirQuality(location?.lat, location?.lon, date),
    enabled: isSuccess && !!date, // wait for location and date
    staleTime: 1000 * 60 * 5,
  });
};