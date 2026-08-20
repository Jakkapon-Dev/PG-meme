import { useState, useEffect, useCallback } from "react";
import { getMemes } from "../services/memeService";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=80";

export default function LandingPage() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // สุ่มมีมหนึ่งตัว โดยพยายามไม่ซ้ำกับตัวปัจจุบัน
  const pickRandomMeme = useCallback((list, current) => {
    if (!list || list.length === 0) return null;
    const pool = list.filter((m) => m.id !== current?.id);
    const candidates = pool.length > 0 ? pool : list;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, []);

  const loadMemes = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getMemes();
      setMemes(data);
      setMeme(pickRandomMeme(data, null));
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Imgflip API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemes();
  }, []);

  const handleNext = () => {
    setIsLiked(false);
    setMeme(pickRandomMeme(memes, meme));
  };

  const handleLike = () => setIsLiked((prev) => !prev);

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

      {/* สถานะผิดพลาด */}
      {error && !loading && (
        <div className="max-w-2xl mx-auto text-center py-12 bg-rose-50 rounded-3xl border border-rose-200 p-8">
          <span className="text-5xl">⚠️</span>
          <h3 className="text-lg font-bold text-rose-800 mt-3">{error}</h3>
          <button
            onClick={loadMemes}
            className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-full font-bold text-sm hover:bg-rose-700 transition-colors cursor-pointer shadow-md"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* การ์ดสุ่มมีม */}
      {!loading && !error && meme && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-orange-100/90 shadow-md hover:shadow-lg transition-all">
          {/* รูปมีมขนาดใหญ่ */}
          <div className="relative bg-stone-950 flex items-center justify-center p-3 max-h-[60vh]">
            <img
              src={meme.image}
              alt={meme.title}
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
                <h3 className="text-xl font-bold text-stone-900">{meme.title}</h3>
                <p className="text-xs text-stone-500 mt-1 truncate">
                  {meme.boxCount} ช่อง • {meme.author}
                </p>
              </div>
              <span className="text-2xl shrink-0">{meme.authorAvatar}</span>
            </div>

            {/* ปุ่มชอบ / ถัดไป */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleLike}
                className={`flex-1 py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  isLiked
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                    : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                }`}
              >
                {isLiked ? "❤️ ถูกใจแล้ว" : "🤍 ชอบ"}
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3.5 rounded-full bg-orange-500 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all cursor-pointer"
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