import { useFavorites } from "../contexts/FavoritosContext";

export default function Favoritos() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div>
      <h1>Lista de Favoritos</h1>
      {favorites.map((movie) => (
        <div key={movie.imdbID} className="favoritos">
          <img src={movie.Poster} alt={movie.Title} width={100} />
          <div id="texto">
            <h2>{movie.Title} ({movie.Year})</h2>
            <button onClick={() => toggleFavorite(movie)}>Remover</button>
          </div>
        </div>
      ))}
    </div>
  );
}
