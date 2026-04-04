import { useMemo } from "react";
import { BaseChart } from "../../charts/components/BaseChart";
import { useUnit } from "../../../providers/UnitProvider";
import { formatTemp } from "../utils/unitConversion";

export function HourlyTemperatureChart({ hourlyData }) {
  const { isCelsius } = useUnit();

  const chartOption = useMemo(() => {
    if (!hourlyData) return {};

    // Format the X-Axis (Time)
    const times = hourlyData.time.map((isoString) => {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    // Format the Y-Axis (Temperature Data) based on the global toggle
    const temperatures = hourlyData.temperature_2m.map((temp) => 
      formatTemp(temp, isCelsius)
    );

    return {
      title: {
        text: `Hourly Temperature (${isCelsius ? "°C" : "°F"})`,
        textStyle: { fontSize: 16, fontWeight: "normal", color: "#64748b" },
      },
      xAxis: {
        type: "category",
        data: times,
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        axisLabel: { formatter: `{value} ${isCelsius ? "°C" : "°F"}` },
      },
      series: [
        {
          name: "Temperature",
          type: "line",
          data: temperatures,
          smooth: true, // Makes the line curved instead of jagged
          lineStyle: { width: 3, color: "#3b82f6" }, // Tailwind blue-500
          areaStyle: {
            color: {
              type: "linear",
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(59, 130, 246, 0.4)" }, // Top gradient
                { offset: 1, color: "rgba(59, 130, 246, 0.0)" }  // Bottom gradient
              ],
            },
          },
          symbol: "circle",
          symbolSize: 6,
        },
      ],
    };
  }, [hourlyData, isCelsius]); // Re-run if data OR temperature unit changes

  return <BaseChart option={chartOption} />;
}