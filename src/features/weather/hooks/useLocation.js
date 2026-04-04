import { useQuery } from "@tanstack/react-query";
import { getUserLocation } from "../../../services/geolocation";

export const useLocation = () => {
  return useQuery({
    queryKey: ["userLocation"],
    queryFn: getUserLocation,
    staleTime: Infinity, // Coordinates don't change often, keep them cached
    refetchOnWindowFocus: false,
  });
};