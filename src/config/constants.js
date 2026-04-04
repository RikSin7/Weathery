export const API_ENDPOINTS = {
  WEATHER_BASE: "https://api.open-meteo.com/v1/forecast",
  AIR_QUALITY_BASE: "https://air-quality-api.open-meteo.com/v1/air-quality",
  HISTORICAL_BASE: "https://archive-api.open-meteo.com/v1/archive",
};

// Default fallback location (New Delhi) 
export const DEFAULT_LOCATION = {
  lat: 28.6139,
  lon: 77.2090, 
};

export const CHART_TABS = [
  { id: "temp", label: "Temperature" },
  { id: "humidity", label: "Humidity" },
  { id: "wind", label: "Wind" },
  { id: "precipitation", label: "Rain" },
  { id: "visibility", label: "Visibility" },
  { id: "aqi", label: "Air Quality (PM)" },
];

export const HISTORY_TABS = [
  { id: "temp", label: "Temperature Stats" },
  { id: "precip", label: "Precipitation" },
  { id: "wind", label: "Wind Patterns" },
  { id: "sun", label: "Sun Cycle (IST)" },
  { id: "aqi", label: "Air Quality Trends" },
];