import { Link } from "react-router-dom";
import { CloudOff, MoveLeft, History } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-2xl mx-auto p-4 text-center">
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl mb-8">
        <CloudOff className="w-20 h-20 text-slate-300 dark:text-slate-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-neutral-100 mb-4 tracking-tight">
        Lost in the Clouds
      </h1>
      <p className="text-lg text-slate-500 dark:text-neutral-400 mb-10 max-w-md mx-auto">
        The page you are looking for has drifted away. Let's redirect you back to safe forecasts.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <MoveLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <Link 
          to="/history"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
        >
          <History className="w-5 h-5" />
          View History
        </Link>
      </div>
    </div>
  )
}

export default NotFound;