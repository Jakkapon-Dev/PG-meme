import { Link } from "react-router-dom";
import { useState } from "react";
import MemeCard from "../components/MemeCard";
import MemeModal from "../components/MemeModal";
import { useFavorites } from "../contexts/FavoritesContext";
import { useSound } from "../contexts/SoundContext";

export default function Favorites() {
  const { likedMemes, isLiked, toggleLike, bulkRemoveFavorites, loading } = useFavorites();
  const { playSound } = useSound();
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleLike = (e, id) => {
    e.stopPropagation();
    toggleLike(id);
  };

  const handleSelect = (e, id) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectionMode = () => {
    playSound("pop");
    setSelectionMode((prev) => !prev);
    setSelectedIds([]);
  };

  const handleBulkRemove = () => {
    playSound("trash");
    bulkRemoveFavorites(selectedIds);
    setSelectedIds([]);
    setSelectionMode(false);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#702a11] font-serif tracking-tight">
            รายการโปรด
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {loading ? "กำลังโหลดข้อมูลมีม..." : `มีมที่คุณกดถูกใจ ${likedMemes.length} รายการ`}
          </p>
        </div>
        {likedMemes.length > 0 && !loading && (
          <button
            onClick={toggleSelectionMode}
            className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              selectionMode
                ? "bg-orange-500 text-white"
                : "text-[#8B3A1C] hover:text-[#b44820] hover:bg-orange-50"
            }`}
          >
            <span>✓</span> เลือก
          </button>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 py-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-3 border border-orange-100 animate-pulse flex flex-col gap-3"
            >
              <div className="aspect-4/3 bg-stone-200 rounded-2xl w-full" />
              <div className="h-4 bg-stone-200 rounded-md w-3/4" />
              <div className="h-3 bg-stone-100 rounded-md w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && likedMemes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-orange-100 p-8 shadow-xs">
          <span className="text-5xl">💝</span>
          <h3 className="text-lg font-bold text-stone-700 mt-3">ยังไม่มีรายการโปรด</h3>
          <p className="text-sm text-stone-400 mt-1">กดถูกใจมีมที่ชอบ แล้วจะมาปรากฏที่นี่</p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-full font-bold text-sm hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/25"
          >
            กลับไปเลือกมีม
          </Link>
        </div>
      )}

      {likedMemes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {likedMemes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              isLiked={isLiked(meme.id)}
              onLike={handleLike}
              onClick={() => !selectionMode && setSelectedMeme(meme)}
              selectionMode={selectionMode}
              isSelected={selectedIds.includes(meme.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      <MemeModal
        meme={selectedMeme}
        isLiked={selectedMeme ? isLiked(selectedMeme.id) : false}
        onLike={handleLike}
        onClose={() => setSelectedMeme(null)}
      />

      {selectionMode && selectedIds.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200 px-5 py-3 flex items-center gap-4 animate-fadeIn">
          <span className="text-sm font-semibold text-stone-700">
            เลือกแล้ว <span className="text-orange-600">{selectedIds.length}</span> มีม
          </span>
          <button
            onClick={handleBulkRemove}
            className="px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-bold hover:bg-rose-600 transition-colors cursor-pointer shadow-md shadow-rose-500/25"
          >
            🗑️ ลบออกจากรายการโปรด
          </button>
          <button
            onClick={toggleSelectionMode}
            className="px-3 py-2 text-stone-500 hover:text-stone-700 text-sm font-semibold cursor-pointer"
          >
            ✕ ยกเลิก
          </button>
        </div>
      )}
    </div>
  );
}
