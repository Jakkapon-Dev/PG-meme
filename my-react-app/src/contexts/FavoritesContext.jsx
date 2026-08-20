import { createContext, useContext, useState, useEffect, useMemo } from "react";

const FavoritesContext = createContext();

const STORAGE_KEY = "pg-meme-favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [likedIds, setLikedIds] = useState(loadFavorites);
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
  }, [likedIds]);

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isLiked = (id) => likedIds.includes(id);

  const bulkAddFavorites = (ids) => {
    setLikedIds((prev) => {
      const newSet = new Set(prev);
      ids.forEach((id) => newSet.add(id));
      return [...newSet];
    });
  };

  const bulkRemoveFavorites = (ids) => {
    setLikedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const setMemeData = (data) => setMemes(data);

  const likedMemes = useMemo(
    () => memes.filter((m) => likedIds.includes(m.id)),
    [memes, likedIds]
  );

  return (
    <FavoritesContext.Provider
      value={{ likedIds, likedMemes, toggleLike, isLiked, bulkAddFavorites, bulkRemoveFavorites, setMemeData, memes }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
