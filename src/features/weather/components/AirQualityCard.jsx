import { Card } from "../../../shared/components/UI/Card";
import { Wind } from "lucide-react";

import { cn } from "../../../shared/utils/cn";

// Helper function to color-code the AQI
const getAQIStatus = (aqi) => {
  if (aqi <= 50) return { label: "Good", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" };
  if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400" };
  return { label: "Unhealthy", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" };
};

export function AirQualityCard({ aqi, pm25, pm10 }) {
  const status = getAQIStatus(aqi);

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-1 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-neutral-400">Air Quality Index</h3>
        <Wind className="w-5 h-5 text-blue-500" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl font-bold text-slate-800 dark:text-neutral-100">{aqi}</span>
        <span className={cn("px-3 py-1 text-xs font-bold rounded-full", status.color)}>
          {status.label}
        </span>
      </div>

      {/* Mini Grid for specific pollutants */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-neutral-800">
        <div>
          <p className="text-xs text-slate-400 dark:text-neutral-500">PM2.5</p>
          <p className="font-semibold text-slate-700 dark:text-neutral-300">{pm25} <span className="text-xs font-normal">µg/m³</span></p>
        </div>
        <div>
          <p className="text-xs text-slate-400 dark:text-neutral-500">PM10</p>
          <p className="font-semibold text-slate-700 dark:text-neutral-300">{pm10} <span className="text-xs font-normal">µg/m³</span></p>
        </div>
      </div>
    </Card>
  );
}