import { motion } from "motion/react";
import { Droplets, Wind, Sun, Navigation, Thermometer } from "lucide-react";
import { useWeather } from "../features/weather/hooks/useWeather";
import { useAirQuality } from "../features/weather/hooks/useAirQuality";
import { WeatherCard } from "../features/weather/components/WeatherCard";
import { AirQualityCard } from "../features/weather/components/AirQualityCard";
import { useUnit } from "../providers/UnitProvider";
import { Card } from "../shared/components/UI/Card";
import { formatTemp } from "../features/weather/utils/unitConversion";
import { HourlyTemperatureChart } from "../features/weather/components/HourlyCharts";

// Framer Motion variants for a clean staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const { data: weather, isLoading: weatherLoading } = useWeather();
  const { data: aqi, isLoading: aqiLoading } = useAirQuality();

  const { isCelsius } = useUnit();

  if (weatherLoading || aqiLoading) {
    return <div className="p-8 text-center text-slate-500 dark:text-neutral-400 animate-pulse">Loading weather data...</div>;
  }

  // Safe destructuring of your Open-Meteo data payload
  const current = weather?.current;
  const currentAqi = aqi?.current;
  const daily = weather?.daily; // array of daily data

  const unitSymbol = isCelsius ? "°C" : "°F";
  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-neutral-100">Today's Overview</h1>
        <p className="text-slate-500 dark:text-neutral-400">Live weather conditions and air quality metrics.</p>
      </div>

      {/* Temperature Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="flex flex-col md:flex-row items-center justify-between p-6 bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-900 border-none text-white">
          <div className="flex items-center gap-4">
            <Thermometer className="w-12 h-12 text-blue-200" />
            <div>
              <p className="text-blue-100 font-medium">Current Temperature</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">
                  {formatTemp(current?.temperature_2m, isCelsius)}
                </span>
                <span className="text-2xl">{unitSymbol}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0 bg-blue-600/30 dark:bg-blue-900/40 p-4 rounded-xl">
            <div>
              <p className="text-blue-200 text-sm">High</p>
              <p className="text-xl font-semibold">
                {formatTemp(daily?.temperature_2m_max?.[0], isCelsius)}{unitSymbol}
              </p>
            </div>
            <div className="w-px bg-blue-400/30"></div>
            <div>
              <p className="text-blue-200 text-sm">Low</p>
              <p className="text-xl font-semibold">
                {formatTemp(daily?.temperature_2m_min?.[0], isCelsius)}{unitSymbol}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Core Metric Cards */}
        <motion.div variants={itemVariants}>
          <WeatherCard 
            title="Relative Humidity" 
            value={current?.relative_humidity_2m} 
            unit="%" 
            icon={Droplets}
            description="The current amount of moisture in the air."
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <WeatherCard 
            title="Wind Speed" 
            value={current?.wind_speed_10m} 
            unit="km/h" 
            icon={Wind}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <WeatherCard 
            title="Precipitation" 
            value={current?.precipitation} 
            unit="mm" 
            icon={Navigation}
            description="Expected rainfall for the current hour."
          />
        </motion.div>

        {/* Dedicated AQI Card spanning 2 columns on tablet, 1 on desktop */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
          <AirQualityCard 
            aqi={currentAqi?.us_aqi}
            pm25={currentAqi?.pm2_5}
            pm10={currentAqi?.pm10}
          />
        </motion.div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <h2 className="text-xl font-bold text-slate-800 dark:text-neutral-100 mb-4">Hourly Forecast</h2>
        <HourlyTemperatureChart hourlyData={weather?.hourly} />
      </motion.div>
    </div>
  );
}