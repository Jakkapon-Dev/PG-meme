export default function SearchBar({ value, onChange, onClear, placeholder = "ค้นหาชื่อมีม..." }) {
  return (
    <div className="relative max-w-2xl mx-auto mt-2">
      <div className="relative flex items-center">
        <span className="absolute left-5 text-[#8B3A1C]/60 text-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-13 pr-10 py-3.5 bg-white rounded-full border border-orange-200/90 text-stone-800 placeholder-stone-400 text-base shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 text-stone-400 hover:text-stone-600 p-1 text-sm font-bold cursor-pointer"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
