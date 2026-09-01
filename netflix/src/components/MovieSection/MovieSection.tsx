import { Alert } from "react-bootstrap";
import { useMovieGenresQuery } from "../../hooks/useMovieGenres";
import { useMoviesQuery, type MovieCategory } from "../../hooks/useMovies";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import "./MovieSection.style.css";

interface MovieSectionProps {
  title: string;
  category: MovieCategory;
}

function MovieSection({ title, category }: MovieSectionProps) {
  const moviesQuery = useMoviesQuery(category);
  const genresQuery = useMovieGenresQuery();

  if (moviesQuery.isLoading || genresQuery.isLoading) {
    return <h2 className="movie-section-status">Loading...</h2>;
  }

  if (moviesQuery.isError || genresQuery.isError) {
    return (
      <Alert variant="danger">
        {moviesQuery.error?.message ?? genresQuery.error?.message}
      </Alert>
    );
  }

  if (!moviesQuery.data || !genresQuery.data) {
    return null;
  }

  return (
    <section className="movie-section">
      <h3 className="movie-section-title">{title}</h3>
      <MovieCarousel movies={moviesQuery.data.results} genreMap={genresQuery.data} />
    </section>
  );
}

export default MovieSection;
