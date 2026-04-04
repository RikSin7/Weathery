import { NavLink } from "react-router-dom";
import { LayoutDashboard, History, X, CloudSun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../shared/utils/cn";
import { useUnit } from "../providers/UnitProvider";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Historical", path: "/history", icon: History },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const closeSidebar = () => setIsOpen(false);
  const { isCelsius, toggleUnit } = useUnit();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-900/50 dark:bg-black/80 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <CloudSun className="w-8 h-8" />
            <span className="text-xl font-bold text-slate-800 dark:text-neutral-100">Weathery</span>
          </div>
          {/* Mobile Close Button */}
          <button onClick={closeSidebar} className="md:hidden text-slate-500 hover:text-slate-700 dark:text-neutral-400 dark:hover:text-neutral-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-neutral-800">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
            <span className="text-sm font-medium text-slate-600 dark:text-neutral-300">Temperature Unit</span>
            <button
              onClick={toggleUnit}
              className="relative inline-flex items-center h-8 rounded-full w-14 bg-slate-200 dark:bg-neutral-700 transition-colors focus:outline-none cursor-pointer"
            >
              <span
                className={`inline-block w-6 h-6 transform rounded-full bg-white dark:bg-neutral-300 shadow-sm transition-transform ${isCelsius ? "translate-x-1" : "translate-x-7"
                  } flex items-center justify-center text-xs font-bold text-slate-700 dark:text-neutral-800`}
              >
                {isCelsius ? "°C" : "°F"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}