import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.imdbID === movie.imdbID);
      let updated;
      if (exists) {
        updated = prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        updated = [...prev, movie];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(imdbID) {
    return favorites.some((fav) => fav.imdbID === imdbID);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
