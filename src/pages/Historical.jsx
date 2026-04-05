import { useState } from "react";
import { motion } from "motion/react";
import { useHistoricalData } from "../features/history/hooks/useHistoricalData";
import { DateRangePicker } from "../shared/components/DateRangePicker";
import { Tabs } from "../shared/components/UI/Tabs";
import { HistoricalCharts } from "../features/charts/components/HistoricalCharts";
import { HISTORY_TABS } from "../config/constants";
import { getFutureDate } from "../shared/utils/formatters";

const MAX_ARCHIVE_DATE = getFutureDate(-1);

export default function Historical() {
  const [activeTab, setActiveTab] = useState("temp");
  const [startDate, setStartDate] = useState(getFutureDate(-31));
  const [endDate, setEndDate] = useState(MAX_ARCHIVE_DATE);

  const { data, isLoading, isError } = useHistoricalData(startDate, endDate);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-neutral-100">Historical Trends</h1>
          <p className="text-slate-500 dark:text-neutral-400">
            Analyze up to 2 years of past weather data.
          </p>
        </div>

        <DateRangePicker 
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          maxLimit={MAX_ARCHIVE_DATE}
        />
      </div>

      {/* States */}
      {isLoading && (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mx-auto"></div>
            <p className="text-slate-500 dark:text-slate-400">Fetching historical data...</p>
          </div>
        </div>
      )}

      {isError && (
        <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-800">
          Failed to fetch historical data. Please try a different date range.
        </div>
      )}

      {/* The Main Visualization Area */}
      {!isLoading && !isError && data && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-neutral-100">Data Visualizations</h2>
            <Tabs 
              tabs={HISTORY_TABS} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <HistoricalCharts 
              weatherData={data.weather} 
              aqiData={data.aqi} 
              activeTab={activeTab} 
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}