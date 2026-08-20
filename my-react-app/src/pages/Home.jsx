import { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilters from "../components/CategoryFilters";
import MemeCard from "../components/MemeCard";
import MemeModal from "../components/MemeModal";

const CATEGORIES = [
  { id: "all", label: "ทั้งหมด", icon: "✨" },
  { id: "top", label: "🔥 ยอดฮิต Top 20", icon: "🔥" },
  { id: "classic2", label: "มีม 2 ช่อง", icon: "✌️" },
  { id: "multi", label: "มีมหลายช่อง", icon: "📑" },
  { id: "random", label: "สุ่มมีมใหม่", icon: "🎲" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [likedMap, setLikedMap] = useState({});

  // ฟังก์ชันดึงข้อมูลมีมจาก Imgflip API
  const fetchMemes = async () => {
    try {
      setError(null);
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();

      if (data.success && data.data?.memes) {
        const formattedMemes = data.data.memes.map((m, index) => {
          const baseLikes = Math.max(1000, 100000 - index * 950 + (parseInt(m.id, 10) % 3000));
          return {
            id: m.id,
            title: m.name,
            image: m.url,
            width: m.width,
            height: m.height,
            boxCount: m.box_count,
            author: `@MemeCreator_${m.id.slice(-3)}`,
            authorAvatar: ["😼", "🐶", "🐸", "😎", "👾", "🦊", "🐼", "🔥"][index % 8],
            likes: baseLikes,
            isTop20: index < 20,
            badge: index < 5 ? "Top 5" : index < 20 ? "Hot" : `${(baseLikes / 1000).toFixed(0)}k`,
            badgeType: index < 5 ? "top" : index < 20 ? "hot" : "trending",
          };
        });
        setMemes(formattedMemes);
      } else {
        throw new Error("ไม่สามารถโหลดข้อมูลมีมได้");
      }
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Imgflip API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId === "random") {
      setMemes((prev) => [...prev].sort(() => Math.random() - 0.5));
    }
  };

  // กรองมีมตามคำค้นหาและหมวดหมู่
  const filteredMemes = useMemo(() => {
    let list = memes.filter((meme) =>
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
  }, [memes, searchQuery, selectedCategory]);

  const handleLike = (e, id) => {
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. ค้นหามีม */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
        placeholder="ค้นหาชื่อมีมจาก Imgflip (เช่น Drake, Cat, Doge...)"
      />

      {/* 2. หมวดหมู่มีม */}
      <CategoryFilters
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. ส่วนหัวข้อและปุ่มรีเฟรช */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#702a11] font-serif tracking-tight">
            มีมยอดนิยมจาก Imgflip
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
            {filteredMemes.length} มีม
          </span>
        </div>
        <button
          onClick={() => {
            setSelectedCategory("all");
            setSearchQuery("");
            fetchMemes();
          }}
          className="text-xs md:text-sm font-semibold text-[#8B3A1C] hover:text-[#b44820] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>🔄</span> รีเฟรชข้อมูล
        </button>
      </div>

      {/* 4. กำลังโหลดข้อมูล */}
      {loading && (
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

      {/* สถานะผิดพลาด */}
      {error && !loading && (
        <div className="text-center py-12 bg-rose-50 rounded-3xl border border-rose-200 p-8">
          <span className="text-5xl">⚠️</span>
          <h3 className="text-lg font-bold text-rose-800 mt-3">{error}</h3>
          <button
            onClick={fetchMemes}
            className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-full font-bold text-sm hover:bg-rose-700 transition-colors cursor-pointer shadow-md"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* ไม่พบผลลัพธ์ */}
      {!loading && !error && filteredMemes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-orange-100 p-8 shadow-xs">
          <span className="text-5xl">🧐</span>
          <h3 className="text-lg font-bold text-stone-700 mt-3">ไม่พบมีมที่คุณค้นหา</h3>
          <p className="text-sm text-stone-400 mt-1">ลองพิมพ์ชื่อมีมเป็นภาษาอังกฤษ เช่น "Cat", "Drake", "Dog"</p>
        </div>
      )}

      {/* 5. รายการการ์ดมีม */}
      {!loading && !error && filteredMemes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {filteredMemes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              isLiked={likedMap[meme.id]}
              onLike={handleLike}
              onClick={() => setSelectedMeme(meme)}
            />
          ))}
        </div>
      )}

      {/* 6. Modal พรีวิวมีม */}
      <MemeModal
        meme={selectedMeme}
        isLiked={selectedMeme ? likedMap[selectedMeme.id] : false}
        onLike={handleLike}
        onClose={() => setSelectedMeme(null)}
      />
    </div>
  );
}
