import { useMemo } from "react";
import { useUnit } from "../../../providers/UnitProvider";
import { BaseChart } from "./BaseChart";
import { formatTemp } from "../../weather/utils/unitConversion";

export function HourlyForecastChart({ weatherData, aqiData, activeTab }) {
  const { isCelsius } = useUnit();

  const chartOption = useMemo(() => {
    if (!weatherData || !aqiData) return {};

    const times = weatherData.hourly.time.map(t => 
      new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    const configs = {
      temp: {
        title: "Temperature",
        unit: isCelsius ? "°C" : "°F",
        data: weatherData.hourly.temperature_2m.map(t => formatTemp(t, isCelsius)),
        color: "#3b82f6"
      },
      humidity: {
        title: "Relative Humidity",
        unit: "%",
        data: weatherData.hourly.relative_humidity_2m,
        color: "#06b6d4"
      },
      wind: {
        title: "Wind Speed",
        unit: "km/h",
        data: weatherData.hourly.wind_speed_10m,
        color: "#6366f1"
      },
      precipitation: {
        title: "Precipitation Probability",
        unit: "%",
        data: weatherData.hourly.precipitation_probability,
        color: "#8b5cf6",
        type: 'bar'
      },
      visibility: {
        title: "Visibility",
        unit: "m",
        data: weatherData.hourly.visibility,
        color: "#10b981"
      }
    };

    // Special case for combined Air Quality
    if (activeTab === 'aqi') {
      return {
        xAxis: { type: 'category', data: times },
        yAxis: { type: 'value', name: 'µg/m³' },
        legend: { data: ['PM2.5', 'PM10'], bottom: 35 },
        series: [
          { name: 'PM2.5', type: 'line', data: aqiData.hourly.pm2_5, color: '#f43f5e', smooth: true },
          { name: 'PM10', type: 'line', data: aqiData.hourly.pm10, color: '#fb923c', smooth: true }
        ]
      };
    }

    const current = configs[activeTab];
    return {
      xAxis: { type: 'category', data: times, boundaryGap: current.type === 'bar' },
      yAxis: { type: 'value', axisLabel: { formatter: `{value}${current.unit}` } },
      series: [{
        name: current.title,
        type: current.type || 'line',
        data: current.data,
        smooth: true,
        color: current.color,
        areaStyle: current.type !== 'bar' ? {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: current.color + '66' }, { offset: 1, color: current.color + '00' }]
          }
        } : null
      }]
    };
  }, [weatherData, aqiData, activeTab, isCelsius]);

  return <BaseChart option={chartOption} />;
}