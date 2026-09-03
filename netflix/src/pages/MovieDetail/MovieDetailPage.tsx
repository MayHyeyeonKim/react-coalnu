import { Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetailsQuery } from "../../hooks/useMovieDetails";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? Number(id) : null;
  const navigate = useNavigate();

  const {
    data: movieData,
    isLoading: movieLoading,
    isError: movieIsError,
    error: movieError,
  } = useMovieDetailsQuery(movieId);

  if (movieLoading) {
    return (
      <main className="movie-detail-page movie-detail-status">
        <Spinner animation="border" />
      </main>
    );
  }

  if (movieIsError || movieId === null) {
    return (
      <main className="movie-detail-page movie-detail-status">
        <Alert variant="danger">{movieError?.message ?? "Movie not found."}</Alert>
      </main>
    );
  }

  if (!movieData) return null;

  const heroPath = movieData.backdrop_path ?? movieData.poster_path;
  const posterPath = movieData.poster_path ?? movieData.backdrop_path;
  const releaseYear = movieData.release_date ? movieData.release_date.slice(0, 4) : "Not available";
  const formattedBudget = movieData.budget > 0 ? `$${movieData.budget.toLocaleString()}` : "Not available";

  return (
    <main className="movie-detail-page">
      <div
        className="movie-detail-page-hero"
        style={{
          backgroundImage: heroPath
            ? `url(https://media.themoviedb.org/t/p/w1280_and_h720_face/${heroPath})`
            : undefined,
        }}
      />

      <Container fluid="xl" className="movie-detail-page-content">
        <button type="button" className="movie-detail-back-button" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left" />
          Back
        </button>

        <section className="movie-detail-layout">
          <div className="movie-detail-poster">
            {posterPath ? (
              <img
                src={`https://media.themoviedb.org/t/p/w500/${posterPath}`}
                alt={movieData.title}
              />
            ) : (
              <div className="movie-detail-poster-placeholder">No poster available</div>
            )}
          </div>

          <div className="movie-detail-main">
            <p className="movie-detail-kicker">Movie details</p>
            <h1>{movieData.title}</h1>

            <div className="movie-detail-page-metadata">
              <span className="movie-detail-page-rating">★ {movieData.vote_average.toFixed(1)}</span>
              <span>{releaseYear}</span>
              {movieData.runtime && <span>{movieData.runtime} min</span>}
              <span className="movie-detail-page-age-rating">{movieData.adult ? "18+" : "PG"}</span>
            </div>

            <div className="movie-detail-page-genres">
              {movieData.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <p className="movie-detail-page-overview">{movieData.overview || "No overview available."}</p>

            <dl className="movie-detail-facts">
              <div>
                <dt>Popularity</dt>
                <dd>{movieData.popularity.toFixed(0)}</dd>
              </div>
              <div>
                <dt>Budget</dt>
                <dd>{formattedBudget}</dd>
              </div>
              <div>
                <dt>Release date</dt>
                <dd>{movieData.release_date || "Not available"}</dd>
              </div>
            </dl>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default MovieDetailPage;
