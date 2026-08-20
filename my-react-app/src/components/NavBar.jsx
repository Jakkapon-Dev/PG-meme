import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[#fbf9f6] border-b border-orange-100/70 px-4 py-3.5 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* เมนูด้านซ้าย (Hamburger Menu Button) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          onClick={closeMenu}
          className="text-2xl md:text-3xl font-extrabold text-[#702a11] hover:text-[#943818] transition-colors flex items-center gap-2 font-serif tracking-tight"
        >
          <span>PG-Meme</span>
        </NavLink>

        {/* ไอคอนรายการโปรดด้านขวา */}
        <NavLink
          to="/favorites"
          onClick={closeMenu}
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

      {/* เมนูดร็อปดาวน์เมื่อกดแฮมเบอร์เกอร์ */}
      {isMenuOpen && (
        <div className="max-w-5xl mx-auto mt-3 pt-3 border-t border-orange-200/60 flex flex-col gap-2 animate-fadeIn">
          <NavLink
            to="/"
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
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
        </div>
      )}
    </header>
  );
}
