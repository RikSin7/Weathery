import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        {/* The main scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;