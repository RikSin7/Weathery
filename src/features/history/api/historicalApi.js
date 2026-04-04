import { API_ENDPOINTS } from "../../../config/constants";
import { apiClient } from "../../../services/apiClient";

export const fetchHistoricalData = async (lat, lon, startDate, endDate) => {
  const params = {
    latitude: lat,
    longitude: lon,
    start_date: startDate,
    end_date: endDate,
    // specific daily aggregate variables, not hourly!
    daily: "temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset",
    timezone: "auto",
  };

  const response = await apiClient.get(API_ENDPOINTS.HISTORICAL_BASE, { params });
  return response.data;
};

export const fetchHistoricalAQI = async (lat, lon, startDate, endDate) => {
  const params = {
    latitude: lat,
    longitude: lon,
    start_date: startDate,
    end_date: endDate,
    // Using hourly here because AQI rarely has a clean 'daily mean' on this specific API
    hourly: "pm10,pm2_5", 
    timezone: "auto",
  };

  const response = await apiClient.get("https://air-quality-api.open-meteo.com/v1/history", { params });
  return response.data;
};