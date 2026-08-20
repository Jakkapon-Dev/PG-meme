import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import BottomNav from "./BottomNav.jsx";

export default function Layout() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-slate-800 flex flex-col font-sans pb-20 md:pb-8">
      {/* Navbar Component */}
      <Navbar />

      {/* Dynamic Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 md:py-6">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
