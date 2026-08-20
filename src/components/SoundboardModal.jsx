import { useState } from "react";
import { useSound } from "../contexts/SoundContext";

const MEME_SOUNDS = [
  { id: "airhorn", name: "Airhorn", thai: "แตรลมมหาเทพ", icon: "📯", color: "from-amber-500 to-orange-600" },
  { id: "bruh", name: "Bruh", thai: "บรู้วววว โมอาย", icon: "🗿", color: "from-stone-500 to-stone-700" },
  { id: "badumtss", name: "Ba-Dum Tss", thai: "มุกตบกลอง", icon: "🥁", color: "from-rose-500 to-pink-600" },
  { id: "sadtrombone", name: "Sad Trombone", thai: "หวืด / แป้ก", icon: "🎺", color: "from-blue-500 to-indigo-600" },
  { id: "animewow", name: "Anime Wow", thai: "ประกายวิ้งวับ", icon: "✨", color: "from-yellow-400 to-amber-500" },
  { id: "quack", name: "Quack", thai: "เป็ดกวนโอ๊ย", icon: "🦆", color: "from-lime-500 to-emerald-600" },
  { id: "boing", name: "Boing!", thai: "เด้งดึ๋งการ์ตูน", icon: "🌀", color: "from-purple-500 to-fuchsia-600" },
  { id: "laser", name: "Pew Pew Laser", thai: "ยิงเลเซอร์", icon: "💥", color: "from-red-500 to-rose-600" },
  { id: "heart", name: "Kawaii Chime", thai: "เสียงรักฟรุ้งฟริ้ง", icon: "💖", color: "from-pink-400 to-rose-500" },
  { id: "dice", name: "Dice Bounce", thai: "ทอยลูกเต๋า", icon: "🎲", color: "from-orange-400 to-amber-600" },
];

export default function SoundboardModal() {
  const { isSoundboardOpen, closeSoundboard, playSound, isMuted, toggleMute, volume, setVolume } = useSound();
  const [activeSoundId, setActiveSoundId] = useState(null);

  if (!isSoundboardOpen) return null;

  const handlePlay = (id) => {
    setActiveSoundId(id);
    playSound(id);
    setTimeout(() => {
      setActiveSoundId(null);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={closeSoundboard}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-orange-100/90 animate-scaleUp max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl animate-bounce">📢</span>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl font-serif">Meme Soundboard</h3>
              <p className="text-xs text-orange-100">แตะเพื่อเล่นเสียงเอฟเฟกต์สุดฮิต</p>
            </div>
          </div>
          <button
            onClick={closeSoundboard}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Volume & Mute Bar inside Soundboard */}
        <div className="bg-orange-50/80 px-4 py-2.5 border-b border-orange-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isMuted
                  ? "bg-stone-200 text-stone-600 hover:bg-stone-300"
                  : "bg-orange-500 text-white shadow-xs"
              }`}
            >
              <span>{isMuted ? "🔇 ปิดเสียงอยู่" : "🔊 เปิดเสียง"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-[160px]">
            <span className="text-stone-500 font-medium">ความดัง</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              disabled={isMuted}
              className="w-full h-1.5 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-40"
            />
            <span className="text-stone-500 font-mono text-[10px]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Sound Buttons Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto grid grid-cols-2 gap-3 sm:gap-3.5">
          {MEME_SOUNDS.map((item) => {
            const isPlaying = activeSoundId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePlay(item.id)}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer group select-none relative overflow-hidden ${
                  isPlaying
                    ? "scale-95 ring-2 ring-orange-400 bg-orange-50 border-orange-300 shadow-inner"
                    : "bg-white border-stone-200/80 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                {/* Icon with gradient badge */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl shrink-0 shadow-xs group-hover:scale-110 transition-transform ${
                    isPlaying ? "animate-spin" : ""
                  }`}
                >
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs sm:text-sm text-stone-800 truncate group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate">
                    {item.thai}
                  </div>
                </div>

                {/* Animated sound ripple indicator when playing */}
                {isPlaying && (
                  <span className="absolute right-2.5 top-2.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="bg-stone-50 px-4 py-3 border-t border-stone-100 text-center text-xs text-stone-500">
          💡 เสียงสังเคราะห์ทันทีด้วย Web Audio API • ไม่มีกระตุก • กดรัวๆ ได้เลย!
        </div>
      </div>
    </div>
  );
}
