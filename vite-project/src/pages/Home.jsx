import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(""); // <--- NOVO
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const key = "INSERIR_CHAVE_API";

  async function fetchMovies(q, p) {
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(q)}&page=${p}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10) || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "Nenhum resultado.");
      }
    } catch {
      setMovies([]);
      setTotalResults(0);
      setError("Erro ao buscar filmes.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setPage(1);
    setSubmittedQuery(q);
  }

  useEffect(() => {
    if (!submittedQuery) return;
    fetchMovies(submittedQuery, page);
  }, [submittedQuery, page]);

  const lastPage = Math.max(1, Math.ceil(totalResults / 10));

  return (
    <div>
      <h1>Pesquise o Filme:</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme..."
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}

      <br />
      <div className="filmes">
        {movies.slice(0, 8).map((movie) => (
          <div key={movie.imdbID} id="quadro">
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
            <div id="texto">
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <NavLink to={`/sobre/${movie.imdbID}`}>Detalhes</NavLink>
            </div>
          </div>
        ))}
      </div>

      <br />
      <div>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading}> 🡸 </button>

        <span> Página {page} de {lastPage} </span>

        <button onClick={() => setPage((p) => Math.min(lastPage, p + 1))} disabled={page >= lastPage || loading || movies.length === 0}> 🡺 </button>
      </div>
    </div>
  );
}
