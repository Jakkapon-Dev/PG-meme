export default function MemeCard({ meme, isLiked, onLike, onClick, selectionMode = false, isSelected = false, onSelect }) {
  const currentLikes = meme.likes + (isLiked ? 1 : 0);

  const handleClick = selectionMode ? (e) => onSelect?.(e, meme.id) : onClick;

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-3xl overflow-hidden border shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col cursor-pointer group ${
        isSelected ? "border-orange-400 ring-2 ring-orange-300" : "border-orange-100/90"
      }`}
    >
      {/* ภาพมีมพร้อม Badge */}
      <div className="relative aspect-4/3 w-full bg-stone-900 overflow-hidden flex items-center justify-center">
        {selectionMode && (
          <div
            onClick={(e) => { e.stopPropagation(); onSelect?.(e, meme.id); }}
            className={`absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
              isSelected
                ? "bg-orange-500 border-orange-500"
                : "bg-white/80 border-stone-300 hover:border-orange-400"
            }`}
          >
            {isSelected && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        )}
        <img
          src={meme.image}
          alt={meme.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop&q=80";
          }}
        />

        {/* Badge บนรูป */}
        <div className="absolute top-2.5 right-2.5">
          {meme.badgeType === "top" && (
            <span className="bg-amber-400 text-stone-900 text-[10px] md:text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              ⭐ {meme.badge}
            </span>
          )}
          {meme.badgeType === "hot" && (
            <span className="bg-rose-500 text-white text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              🔥 Hot
            </span>
          )}
          {meme.badgeType === "trending" && (
            <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              📈 {meme.badge}
            </span>
          )}
        </div>

        {/* Box Count Indicator */}
        {meme.boxCount && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-black/60 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded-md font-mono">
              {meme.boxCount} ช่อง
            </span>
          </div>
        )}
      </div>

      {/* รายละเอียดด้านล่างของการ์ด */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <h3 className="font-bold text-stone-800 text-sm md:text-base leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
          {meme.title}
        </h3>

        {/* ผู้แต่ง & ยอด Like */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium truncate">
            <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-xs">
              {meme.authorAvatar || "😎"}
            </span>
            <span className="truncate">{meme.author}</span>
          </div>

          {!selectionMode && (
            <button
              onClick={(e) => onLike(e, meme.id)}
              className={`text-xs flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                isLiked ? "text-rose-500" : "text-stone-400 hover:text-rose-500"
              }`}
              title="กดถูกใจ"
            >
              <span>{isLiked ? "❤️" : "🤍"}</span>
              <span>
                {currentLikes >= 1000
                  ? `${(currentLikes / 1000).toFixed(1)}k`
                  : currentLikes}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
