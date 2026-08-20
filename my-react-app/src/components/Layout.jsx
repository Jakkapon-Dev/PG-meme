import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import BottomNav from "./BottomNav.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  const activeTab = pathname === "/favorites" ? "favorites" : "feed";

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-slate-800 flex flex-col font-sans pb-20 md:pb-8">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 md:py-6">
        <Outlet />
      </main>
      <BottomNav activeTab={activeTab} />
    </div>
  );
}
