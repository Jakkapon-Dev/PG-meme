import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as sounds from "../services/soundEffects";

const SoundContext = createContext();

const MUTE_STORAGE_KEY = "pg-meme-sound-muted";
const VOLUME_STORAGE_KEY = "pg-meme-sound-volume";

function loadMutedState() {
  try {
    const raw = localStorage.getItem(MUTE_STORAGE_KEY);
    return raw !== null ? JSON.parse(raw) : false; // default to sound ON
  } catch {
    return false;
  }
}

function loadVolumeState() {
  try {
    const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
    return raw !== null ? parseFloat(raw) : 0.8;
  } catch {
    return 0.8;
  }
}

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(loadMutedState);
  const [volume, setVolume] = useState(loadVolumeState);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(MUTE_STORAGE_KEY, JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem(VOLUME_STORAGE_KEY, volume.toString());
  }, [volume]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        // เมื่อเปิดเสียง ให้มีเสียงทดสอบ pop สั้นๆ
        setTimeout(() => sounds.playPopSound(volume), 50);
      }
      return next;
    });
  }, [volume]);

  const playSound = useCallback(
    (soundName) => {
      if (isMuted) return;

      switch (soundName) {
        // UI Sounds
        case "heart":
        case "like":
          sounds.playHeartSound(volume);
          break;
        case "unlike":
          sounds.playUnlikeSound(volume);
          break;
        case "pop":
        case "click":
          sounds.playPopSound(volume);
          break;
        case "dice":
        case "next":
          sounds.playDiceSound(volume);
          break;
        case "copy":
          sounds.playCopySound(volume);
          break;
        case "trash":
        case "delete":
          sounds.playTrashSound(volume);
          break;
        case "tada":
        case "success":
          sounds.playTadaSound(volume);
          break;
        case "whoosh":
        case "modal":
          sounds.playWhooshSound(volume);
          break;
        case "boing":
          sounds.playBoing(volume);
          break;

        // Meme Soundboard Sounds
        case "airhorn":
          sounds.playAirhorn(volume);
          break;
        case "bruh":
          sounds.playBruh(volume);
          break;
        case "badumtss":
        case "drum":
          sounds.playBaDumTss(volume);
          break;
        case "sadtrombone":
        case "fail":
          sounds.playSadTrombone(volume);
          break;
        case "quack":
          sounds.playQuack(volume);
          break;
        case "laser":
          sounds.playLaser(volume);
          break;
        case "animewow":
        case "wow":
          sounds.playAnimeWow(volume);
          break;

        default:
          sounds.playPopSound(volume);
          break;
      }
    },
    [isMuted, volume]
  );

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        volume,
        setVolume,
        playSound,
        isSoundboardOpen,
        openSoundboard: () => setIsSoundboardOpen(true),
        closeSoundboard: () => setIsSoundboardOpen(false),
        toggleSoundboard: () => setIsSoundboardOpen((prev) => !prev),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
