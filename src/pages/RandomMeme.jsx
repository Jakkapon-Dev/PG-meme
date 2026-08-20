import { useState, useEffect, useCallback } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useSound } from "../contexts/SoundContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=80";

export default function RandomMeme() {
  const { memes, loading, toggleLike, isLiked } = useFavorites();
  const { playSound } = useSound();
  const [currentMeme, setCurrentMeme] = useState(null);

  // สุ่มมีมหนึ่งตัว โดยพยายามไม่ซ้ำกับตัวปัจจุบัน
  const pickRandomMeme = useCallback((list, current) => {
    if (!list || list.length === 0) return null;
    const pool = list.filter((m) => m.id !== current?.id);
    const candidates = pool.length > 0 ? pool : list;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, []);

  useEffect(() => {
    if (memes.length > 0 && !currentMeme) {
      setCurrentMeme(pickRandomMeme(memes, null));
    }
  }, [memes, currentMeme, pickRandomMeme]);

  const handleNext = () => {
    playSound("dice");
    setCurrentMeme(pickRandomMeme(memes, currentMeme));
  };

  const liked = currentMeme ? isLiked(currentMeme.id) : false;

  const handleLike = () => {
    if (currentMeme) {
      if (liked) {
        playSound("unlike");
      } else {
        playSound("heart");
      }
      toggleLike(currentMeme.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* หัวข้อหน้า */}
      <div className="text-center pt-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#702a11] font-serif tracking-tight">
          🎲 สุ่มมีมจาก Imgflip
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          กดปุ่ม "ถัดไป" เพื่อสุ่มมีมใหม่ หรือกด "ชอบ" เพื่อเก็บมีมที่ถูกใจ
        </p>
      </div>

      {/* กำลังโหลดข้อมูล */}
      {loading && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-4 border border-orange-100 animate-pulse flex flex-col gap-4">
          <div className="aspect-4/3 bg-stone-200 rounded-2xl w-full" />
          <div className="h-5 bg-stone-200 rounded-md w-2/3 mx-auto" />
          <div className="h-11 bg-stone-100 rounded-full w-full" />
        </div>
      )}

      {/* การ์ดสุ่มมีม */}
      {!loading && currentMeme && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-orange-100/90 shadow-md hover:shadow-lg transition-all">
          {/* รูปมีมขนาดใหญ่ */}
          <div className="relative bg-stone-950 flex items-center justify-center p-3 max-h-[60vh]">
            <img
              src={currentMeme.image}
              alt={currentMeme.title}
              className="max-h-[56vh] w-auto object-contain rounded-2xl"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
          </div>

          {/* รายละเอียดมีม */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-stone-900">{currentMeme.title}</h3>
                <p className="text-xs text-stone-500 mt-1 truncate">
                  {currentMeme.boxCount} ช่อง • {currentMeme.author}
                </p>
              </div>
              <span className="text-2xl shrink-0">{currentMeme.authorAvatar}</span>
            </div>

            {/* ปุ่มชอบ / ถัดไป */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleLike}
                className={`flex-1 py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  liked
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                    : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                }`}
              >
                {liked ? "❤️ ถูกใจแล้ว" : "🤍 ชอบ"}
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3.5 rounded-full bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
              >
                🎲 ถัดไป
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

