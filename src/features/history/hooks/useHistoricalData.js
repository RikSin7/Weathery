import { useQuery } from "@tanstack/react-query";
import { useLocation } from "../../weather/hooks/useLocation";
import { fetchHistoricalData, fetchHistoricalAQI } from "../api/historicalApi";

export const useHistoricalData = (startDate, endDate) => {
  // Grab the cached GPS coordinates that is established on Dashboard
  const { data: location, isSuccess: isLocationReady } = useLocation();

  // only run the query if coordinates & dates are valid
  const isReadyToFetch = isLocationReady && !!startDate && !!endDate;

  return useQuery({
    queryKey: ["historicalData", location?.lat, location?.lon, startDate, endDate],
    queryFn: async () => {
      // Run both fetchers in parallel to reduce load time
      const [weather, aqi] = await Promise.all([
        fetchHistoricalData(location.lat, location.lon, startDate, endDate),
        fetchHistoricalAQI(location.lat, location.lon, startDate, endDate)
      ]);
      
      return { weather, aqi };
    },
    enabled: isReadyToFetch,
    // Historical data never changes once it's recorded, so cache it for a long time
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};