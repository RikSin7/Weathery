import { Menu, MapPin, User } from "lucide-react";
import { useLocation } from "../features/weather/hooks/useLocation";

export default function Header({ toggleMenu }) {
  const { data: location } = useLocation();

  return (
    <header className="h-16 bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="p-2 -ml-2 text-slate-500 rounded-md md:hidden hover:bg-slate-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Page Title / Location Context */}
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-neutral-300">
          <MapPin className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          {location ? `Lat: ${location.lat.toFixed(2)}, Lon: ${location.lon.toFixed(2)}` : "Locating..."}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm">
            <User />
        </div>
      </div>
    </header>
  );
}