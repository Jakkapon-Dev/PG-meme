import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 text-xs font-medium cursor-pointer transition-colors ${
    isActive ? "text-orange-600" : "text-stone-400 hover:text-stone-600"
  }`;

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-orange-100/80 px-6 py-2 shadow-lg md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Feed Tab → หน้า memecategory */}
        <NavLink to="/memecategory" className={linkClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Feed
        </NavLink>

        {/* Search Button (ปุ่มส้มตรงกลาง) → หน้า landing-page */}
        <NavLink to="/" className="flex flex-col items-center -mt-5 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-linear-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-orange-600 mt-1">Search</span>
        </NavLink>

        {/* Playlists Tab → หน้า memecategory */}
        <NavLink to="/memecategory" className={linkClass}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          Playlists
        </NavLink>
      </div>
    </div>
  );
}