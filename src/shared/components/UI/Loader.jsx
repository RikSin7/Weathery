import { Loader2 } from "lucide-react";

export function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[40vh] w-full text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
      <p className="font-medium animate-pulse">{text}</p>
    </div>
  );
}
