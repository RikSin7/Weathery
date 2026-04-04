import { getTwoYearsOffset } from "../utils/formatters";
import { DatePicker } from "./DatePicker";

export function DateRangePicker({ startDate, endDate, onStartChange, onEndChange, maxLimit }) {
  // Calculate dynamic limits based on what the user has already selected
  const maxAllowedEndDate = startDate ? getTwoYearsOffset(startDate, true) : maxLimit;
  const minAllowedStartDate = endDate ? getTwoYearsOffset(endDate, false) : undefined;

  // Ensure the end date never exceeds "today" (Archive API constraint)
  const actualMaxEndDate = maxAllowedEndDate > maxLimit ? maxLimit : maxAllowedEndDate;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-12 sm:w-auto text-right">From:</span>
        <DatePicker 
          value={startDate} 
          onChange={onStartChange}
          max={endDate || maxLimit} // Start date can never be AFTER End date
          min={minAllowedStartDate} // Lock Start date to 2 years behind End date
          className="w-40"
        />
      </div>
      
      <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-12 sm:w-auto text-right">To:</span>
        <DatePicker 
          value={endDate} 
          onChange={onEndChange}
          min={startDate} // End date can never be BEFORE Start date
          max={actualMaxEndDate} // Lock End date to 2 years ahead of Start date
          className="w-40"
        />
      </div>
    </div>
  );
}