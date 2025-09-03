import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritosContext";

export default function Sobre() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_KEY = "a9f1c25d";

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        const data = await res.json();
        if (data.Response === "True") setMovie(data);
        else setError(data.Error);
      } catch {
        setError("Erro ao buscar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [imdbID]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div>

      <div>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
        />
        <div>
          <h1>{movie.Title}</h1>
          <button onClick={() => toggleFavorite(movie)}>
            {isFavorite(movie.imdbID) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </button>
          <p><strong>Ano:</strong> {movie.Year}</p>
          <p><strong>Diretor:</strong> {movie.Director}</p>
          <p><strong>Elenco:</strong> {movie.Actors}</p>
          <p><strong>Avaliação:</strong> {movie.imdbRating}</p>
          <p><strong>Sinopse:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}