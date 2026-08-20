import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSound } from "../contexts/SoundContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMuted, toggleMute, playSound, openSoundboard } = useSound();

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = () => {
    playSound("pop");
    closeMenu();
  };

  return (
    <header className="bg-[#fbf9f6] border-b border-orange-100/70 px-4 py-3.5 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* เมนูด้านซ้าย (Hamburger Menu Button) */}
        <button
          type="button"
          onClick={() => {
            playSound("pop");
            setIsMenuOpen(!isMenuOpen);
          }}
          className="text-[#8B3A1C] hover:text-[#b44820] p-2 rounded-xl hover:bg-orange-100/50 transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.8}
              d="M4 7h16M4 12h16M4 17h16"
            />
          </svg>
        </button>

        {/* หัวข้อตรงกลาง (ค้นหามีม / PG-Meme) */}
        <NavLink
          to="/"
          onClick={handleNavClick}
          className="text-2xl md:text-3xl font-extrabold text-[#702a11] hover:text-[#943818] transition-colors flex items-center gap-2 font-serif tracking-tight"
        >
          <span>PG-Meme</span>
        </NavLink>

        {/* Action icons ด้านขวา */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* ปุ่มเปิด Meme Soundboard */}
          <button
            onClick={() => {
              playSound("pop");
              openSoundboard();
            }}
            className="text-[#8B3A1C] hover:text-[#b44820] p-1.5 rounded-full hover:bg-orange-100/50 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
            title="เปิด Meme Soundboard 📢"
            aria-label="Meme Soundboard"
          >
            <span className="text-xl">📢</span>
          </button>

          {/* ปุ่มเปิด-ปิดเสียง (Mute Toggle) */}
          <button
            onClick={toggleMute}
            className={`p-1.5 rounded-full transition-all focus:outline-none flex items-center justify-center cursor-pointer ${
              isMuted
                ? "text-stone-400 hover:bg-stone-200/60"
                : "text-[#8B3A1C] hover:text-[#b44820] hover:bg-orange-100/50"
            }`}
            title={isMuted ? "เปิดเสียง (Unmute)" : "ปิดเสียง (Mute)"}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            <span className="text-xl">{isMuted ? "🔇" : "🔊"}</span>
          </button>

          {/* ไอคอนรายการโปรด */}
          <NavLink
            to="/favorites"
            onClick={handleNavClick}
            className="text-[#8B3A1C] hover:text-[#b44820] p-1.5 rounded-full hover:bg-orange-100/50 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Favorites"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </NavLink>
        </div>
      </div>

      {/* เมนูดร็อปดาวน์เมื่อกดแฮมเบอร์เกอร์ */}
      {isMenuOpen && (
        <div className="max-w-5xl mx-auto mt-3 pt-3 border-t border-orange-200/60 flex flex-col gap-2 animate-fadeIn">
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-orange-500/15 text-orange-800"
                  : "text-stone-700 hover:bg-stone-100"
              }`
            }
          >
            🎲 สุ่มมีม
          </NavLink>
          <NavLink
            to="/memecategory"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-orange-500/15 text-orange-800"
                  : "text-stone-700 hover:bg-stone-100"
              }`
            }
          >
            🔥 มีมยอดฮิต
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-orange-500/15 text-orange-800"
                  : "text-stone-700 hover:bg-stone-100"
              }`
            }
          >
            ⭐ รายการโปรด
          </NavLink>
          <button
            onClick={() => {
              playSound("pop");
              closeMenu();
              openSoundboard();
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-left text-orange-700 bg-orange-50 hover:bg-orange-100 flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">📢 Meme Soundboard</span>
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-bold">10 เสียง</span>
          </button>
        </div>
      )}
    </header>
  );
}

