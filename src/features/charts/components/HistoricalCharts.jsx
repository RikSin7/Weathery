import { useMemo } from "react";
import { BaseChart } from "./BaseChart";
import { useUnit } from "../../../providers/UnitProvider";
import { formatTemp } from "../../weather/utils/unitConversion";

export function HistoricalCharts({ weatherData, aqiData, activeTab }) {
  const { isCelsius } = useUnit();

  const chartOption = useMemo(() => {
    if (!weatherData?.daily) return {};

    const dates = weatherData.daily.time; // Array of "YYYY-MM-DD"

    // 1. Temperature: Multi-Line (Max, Mean, Min)
    if (activeTab === "temp") {
      return {
        legend: { data: ["Max Temp", "Mean Temp", "Min Temp"], bottom: 0 },
        xAxis: { type: "category", data: dates },
        yAxis: { type: "value", axisLabel: { formatter: `{value}${isCelsius ? "°C" : "°F"}` } },
        series: [
          { name: "Max Temp", type: "line", data: weatherData.daily.temperature_2m_max.map(t => formatTemp(t, isCelsius)), color: "#ef4444", smooth: true },
          { name: "Mean Temp", type: "line", data: weatherData.daily.temperature_2m_mean.map(t => formatTemp(t, isCelsius)), color: "#94a3b8", type: "line", lineStyle: { type: "dashed" } },
          { name: "Min Temp", type: "line", data: weatherData.daily.temperature_2m_min.map(t => formatTemp(t, isCelsius)), color: "#3b82f6", smooth: true }
        ]
      };
    }

    // 2. Precipitation: Bar Chart (Total values)
    if (activeTab === "precip") {
      return {
        xAxis: { type: "category", data: dates },
        yAxis: { type: "value", name: "mm" },
        series: [{ name: "Total Precipitation", type: "bar", data: weatherData.daily.precipitation_sum, color: "#8b5cf6" }]
      };
    }

    // 3. Wind: Combo Chart (Speed Line + Direction Scatter)
    if (activeTab === "wind") {
      return {
        legend: { data: ["Max Speed", "Dominant Direction"], bottom: 0 },
        xAxis: { type: "category", data: dates },
        yAxis: [
          { type: "value", name: "Speed (km/h)", position: "left" },
          { type: "value", name: "Direction (°)", position: "right", min: 0, max: 360 } // 360 degrees
        ],
        series: [
          { name: "Max Speed", type: "line", data: weatherData.daily.wind_speed_10m_max, color: "#6366f1", smooth: true },
          { name: "Dominant Direction", type: "scatter", yAxisIndex: 1, data: weatherData.daily.wind_direction_10m_dominant, color: "#cbd5e1", symbolSize: 4 }
        ]
      };
    }

    // 4. Sun Cycle: Area Curve
    if (activeTab === "sun") {
      // Convert ISO strings to decimal hours (e.g., 06:30 -> 6.5) for charting
      const timeToDecimal = (iso) => {
        if (!iso) return null;
        const d = new Date(iso);
        return Number((d.getHours() + (d.getMinutes() / 60)).toFixed(2));
      };
      
      return {
        legend: { data: ["Sunrise", "Sunset"], bottom: 0 },
        xAxis: { type: "category", data: dates },
        yAxis: { 
          type: "value", 
          min: 4, max: 20, // Lock axis from 4am to 8pm
          axisLabel: { formatter: (val) => `${Math.floor(val)}:00` } 
        },
        series: [
          { name: "Sunrise", type: "line", data: weatherData.daily.sunrise.map(timeToDecimal), color: "#f59e0b", smooth: true },
          { name: "Sunset", type: "line", data: weatherData.daily.sunset.map(timeToDecimal), color: "#f97316", smooth: true }
        ]
      };
    }

    // 5. Air Quality: Stacked/Multi-Line Trends
    if (activeTab === "aqi" && aqiData?.hourly) {
      // Historical AQI usually comes hourly; we map it directly against the hourly times
      const hourlyTimes = aqiData.hourly.time.map(t => t.split("T")[0]); // Simplify to just dates
      
      return {
        legend: { data: ["PM2.5", "PM10"], bottom: 0 },
        xAxis: { type: "category", data: hourlyTimes },
        yAxis: { type: "value", name: "µg/m³" },
        series: [
          { name: "PM2.5", type: "line", data: aqiData.hourly.pm2_5, color: "#f43f5e", smooth: true },
          { name: "PM10", type: "line", data: aqiData.hourly.pm10, color: "#fb923c", smooth: true }
        ]
      };
    }

    return {};
  }, [weatherData, aqiData, activeTab, isCelsius]);

  return <BaseChart option={chartOption} height="450px" />;
}