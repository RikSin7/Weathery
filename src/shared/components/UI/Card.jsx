import { cn } from "../../utils/cn";

export function Card({ className, children }) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}