import { apiClient } from "../../../services/apiClient";
import { API_ENDPOINTS } from "../../../config/constants";

export const fetchAirQuality = async (lat, lon, date) => {
  const params = {
    latitude: lat,
    longitude: lon,
    // Using US AQI as standard, pulling all requested pollutants
    current: "us_aqi,pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide",
    hourly: "pm10,pm2_5", 
    timezone: "auto",
    start_date: date,
    end_date: date
  };

  const response = await apiClient.get(API_ENDPOINTS.AIR_QUALITY_BASE, { params });
  return response.data;
};