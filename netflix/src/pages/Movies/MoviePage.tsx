import { Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useMovieGenresQuery } from "../../hooks/useMovieGenres";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q")?.trim() ?? "";
  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useMovieSearch({ keyword });
  const {
    data: genreMap,
    isLoading: genresLoading,
    isError: genresIsError,
    error: genresError,
  } = useMovieGenresQuery();

  if (moviesLoading || genresLoading) {
    return <h2 className="movie-page-status">Loading...</h2>;
  }

  if (moviesIsError || genresIsError) {
    return <Alert variant="danger">{moviesError?.message ?? genresError?.message}</Alert>;
  }

  if (!moviesData || !genreMap) {
    return null;
  }

  return (
    <main className="movie-page">
      <h1 className="movie-page-title">{keyword ? `Results for “${keyword}”` : "Popular Movies"}</h1>

      {moviesData.length > 0 ? (
        <MovieCarousel movies={moviesData} genreMap={genreMap} />
      ) : (
        <p className="movie-page-empty">No movies found for “{keyword}”.</p>
      )}
    </main>
  );
};

export default MoviePage;
