import { useQuery } from "@tanstack/react-query";
import { useLocation } from "./useLocation";
import { fetchDashboardWeather } from "../api/weatherApi";

export const useWeather = (date) => {
  const { data: location, isSuccess } = useLocation();

  return useQuery({
    queryKey: ["dashboardWeather", location?.lat, location?.lon, date],
    queryFn: () => fetchDashboardWeather(location?.lat, location?.lon, date),
    enabled: isSuccess && !!date, // Wait for GPS and date
    staleTime: 1000 * 60 * 5,
  });
};