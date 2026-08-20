import { useEffect } from "react";

export default function MemeModal({ meme, isLiked, onLike, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!meme) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* รูปมีมขนาดเต็ม */}
        <div className="relative max-h-[60vh] bg-stone-950 flex items-center justify-center p-2">
          <img
            src={meme.image}
            alt={meme.title}
            className="max-h-[58vh] w-auto object-contain rounded-xl"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop&q=80";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* รายละเอียดมีม */}
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-bold text-stone-900">{meme.title}</h3>
              <p className="text-xs text-stone-500 mt-1">
                {meme.width &&
                  meme.height &&
                  `ขนาด: ${meme.width} x ${meme.height} px • `}
                ช่องข้อความ: {meme.boxCount || 2} ช่อง
              </p>
            </div>
            <button
              onClick={(e) => onLike(e, meme.id)}
              className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 font-bold text-sm flex items-center gap-1.5 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              {isLiked ? "❤️" : "🤍"} {meme.likes + (isLiked ? 1 : 0)}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <a
              href={meme.image}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 text-center rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/25"
            >
              📥 ดูรูปต้นฉบับ
            </a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(meme.image);
                alert("คัดลอกลิงก์รูปมีมเรียบร้อยแล้ว! 🔗");
              }}
              className="px-5 py-3 rounded-full border border-stone-200 text-stone-700 font-semibold text-sm hover:bg-stone-50 transition-colors cursor-pointer"
            >
              คัดลอกลิงก์
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
