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

        {/* หัวข้อตรงกลาง (ค้นหามีม) */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-2xl md:text-3xl font-extrabold text-[#702a11] hover:text-[#943818] transition-colors flex items-center gap-2 font-serif tracking-tight"
        >
          <span>ค้นหามีม</span>
        </NavLink>

        {/* ไอคอนโปรไฟล์ด้านขวา (User Profile Icon) */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-[#8B3A1C] hover:text-[#b44820] p-1.5 rounded-full hover:bg-orange-100/50 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
          aria-label="User Profile"
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
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
            className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-orange-500/10 text-orange-800 hover:bg-orange-500/20 transition-colors"
          >
            🎲 สุ่มมีม
          </NavLink>
          <NavLink
            to="/memecategory"
            onClick={closeMenu}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            🔥 มีมยอดฮิต
          </NavLink>
          <button
            onClick={() => {
              alert("คลังมีมที่คุณบันทึกไว้");
              closeMenu();
            }}
            className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            ⭐ รายการโปรด
          </button>
        </div>
      )}
    </header>
  );
}