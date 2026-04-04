import { useQuery } from "@tanstack/react-query";
import { useLocation } from "./useLocation";
import { fetchDashboardWeather } from "../api/weatherApi";

export const useWeather = () => {
  const { data: location, isSuccess } = useLocation();

  return useQuery({
    queryKey: ["dashboardWeather", location?.lat, location?.lon],
    queryFn: () => fetchDashboardWeather(location?.lat, location?.lon),
    enabled: isSuccess, // Wait for GPS
    staleTime: 1000 * 60 * 5,
  });
};