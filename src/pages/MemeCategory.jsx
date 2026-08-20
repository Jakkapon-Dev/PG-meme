import { useState, useEffect, useMemo, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilters from "../components/CategoryFilters";
import MemeCard from "../components/MemeCard";
import MemeModal from "../components/MemeModal";
import { useFavorites } from "../contexts/FavoritesContext";

const CATEGORIES = [
  { id: "all", label: "ทั้งหมด", icon: "✨" },
  { id: "top", label: "🔥 ยอดฮิต Top 20", icon: "🔥" },
  { id: "classic2", label: "มีม 2 ช่อง", icon: "✌️" },
  { id: "multi", label: "มีมหลายช่อง", icon: "📑" },
  { id: "random", label: "สุ่มมีมใหม่", icon: "🎲" },
];

export default function MemeCategory() {
  const { memes: contextMemes, loading: contextLoading, isLiked, toggleLike, bulkAddFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [localMemes, setLocalMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (contextMemes && contextMemes.length > 0) {
      setLocalMemes(contextMemes);
    }
  }, [contextMemes]);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId === "random") {
      setLocalMemes((prev) => [...prev].sort(() => Math.random() - 0.5));
    }
  };

  const filteredMemes = useMemo(() => {
    let list = localMemes.filter(
      (meme) =>
        meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meme.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory === "top") {
      list = list.filter((m) => m.isTop20);
    } else if (selectedCategory === "classic2") {
      list = list.filter((m) => m.boxCount === 2);
    } else if (selectedCategory === "multi") {
      list = list.filter((m) => m.boxCount > 2);
    }

    return list;
  }, [localMemes, searchQuery, selectedCategory]);

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
    setSelectionMode((prev) => !prev);
    setSelectedIds([]);
  };

  const handleBulkAdd = () => {
    bulkAddFavorites(selectedIds);
    setSelectedIds([]);
    setSelectionMode(false);
  };

  return (
    <div className="space-y-6">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
        placeholder="ค้นหาชื่อมีมจาก Imgflip (เช่น Drake, Cat, Doge...)"
      />

      <CategoryFilters
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#702a11] font-serif tracking-tight">
            มีมยอดนิยมจาก Imgflip
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
            {filteredMemes.length} มีม
          </span>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              if (contextMemes) setLocalMemes(contextMemes);
            }}
            className="text-xs md:text-sm font-semibold text-[#8B3A1C] hover:text-[#b44820] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>🔄</span> รีเซ็ต
          </button>
        </div>
      </div>

      {contextLoading && localMemes.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 py-8">
          {[...Array(8)].map((_, i) => (
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

      {!contextLoading && filteredMemes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-orange-100 p-8 shadow-xs">
          <span className="text-5xl">🧐</span>
          <h3 className="text-lg font-bold text-stone-700 mt-3">ไม่พบมีมที่คุณค้นหา</h3>
          <p className="text-sm text-stone-400 mt-1">ลองพิมพ์ชื่อมีมเป็นภาษาอังกฤษ เช่น "Cat", "Drake", "Dog"</p>
        </div>
      )}

      {filteredMemes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {filteredMemes.map((meme) => (
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
            onClick={handleBulkAdd}
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold hover:bg-orange-600 transition-colors cursor-pointer shadow-md shadow-orange-500/25"
          >
            ⭐ เพิ่มเข้ารายการโปรด
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
