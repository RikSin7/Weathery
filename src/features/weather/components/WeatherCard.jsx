import { Card } from "../../../shared/components/UI/Card";

export function WeatherCard({ title, value, unit, icon: Icon, description }) {
  return (
    <Card className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        {Icon && <Icon className="w-5 h-5 text-blue-500" />}
      </div>
      
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {value}
          </span>
          <span className="text-lg font-medium text-slate-500 dark:text-slate-400">
            {unit}
          </span>
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}   