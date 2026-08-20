import { useSound } from "../contexts/SoundContext";

export default function CategoryFilters({ categories, selectedCategory, onSelectCategory }) {
  const { playSound } = useSound();

  const handleSelect = (catId) => {
    if (catId === "random") {
      playSound("dice");
    } else {
      playSound("pop");
    }
    onSelectCategory(catId);
  };

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar justify-start md:justify-center">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30 scale-102"
                : "bg-white text-stone-600 hover:bg-orange-50/60 border border-orange-100"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

