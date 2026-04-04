import { apiClient } from "../../../services/apiClient";
import { API_ENDPOINTS } from "../../../config/constants";

export const fetchDashboardWeather = async (lat, lon) => {
  const params = {
    latitude: lat,
    longitude: lon,
    current: "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
    hourly: "temperature_2m,relative_humidity_2m,precipitation_probability,visibility,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max",
    timezone: "auto",
    forecast_days: 1, 
  };

  const response = await apiClient.get(API_ENDPOINTS.WEATHER_BASE, { params });
  return response.data;
};