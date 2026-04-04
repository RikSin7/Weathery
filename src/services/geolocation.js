import { DEFAULT_LOCATION } from "../config/constants";

export const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser. Using default.");
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Geolocation denied or failed. Using default.", error.message);
        resolve(DEFAULT_LOCATION);
      },
      { timeout: 3000 } 
    );
  });
};