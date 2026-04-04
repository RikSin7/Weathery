import { useQuery } from "@tanstack/react-query";
import { useLocation } from "./useLocation";
import { fetchAirQuality } from "../api/airQualityApi";

export const useAirQuality = () => {
  // 1. Get the location from our centralized hook
  const { data: location, isSuccess } = useLocation();

  // 2. Fetch Air Quality only when location is successfully loaded
  return useQuery({
    queryKey: ["airQuality", location?.lat, location?.lon],
    queryFn: () => fetchAirQuality(location?.lat, location?.lon),
    enabled: isSuccess, // 🌟 CRITICAL: Tells React Query not to run until 'location' exists
    staleTime: 1000 * 60 * 5,
  });
};