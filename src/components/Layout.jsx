import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import BottomNav from "./BottomNav.jsx";
import SoundboardModal from "./SoundboardModal.jsx";
import { useSound } from "../contexts/SoundContext.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  const { openSoundboard } = useSound();
  const activeTab =
    pathname === "/favorites"
      ? "favorites"
      : pathname === "/memecategory"
      ? "category"
      : "random";

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-slate-800 flex flex-col font-sans pb-20 md:pb-8 relative">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 md:py-6">
        <Outlet />
      </main>
      <BottomNav activeTab={activeTab} />

      {/* Floating Soundboard Button (Desktop/Tablet) */}
      <button
        onClick={openSoundboard}
        title="เปิด Meme Soundboard"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all cursor-pointer font-bold text-sm"
      >
        <span className="text-lg">📢</span>
        <span>Soundboard</span>
      </button>

      {/* Soundboard Modal */}
      <SoundboardModal />
    </div>
  );
}

