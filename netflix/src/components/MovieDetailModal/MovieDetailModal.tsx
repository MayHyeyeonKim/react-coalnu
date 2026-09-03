import { Alert, Modal, Spinner } from "react-bootstrap";
import { useMovieDetailsQuery } from "../../hooks/useMovieDetails";
import "./MovieDetailModal.style.css";

interface MovieDetailModalProps {
  movieId: number | null;
  onClose: () => void;
}

function MovieDetailModal({ movieId, onClose }: MovieDetailModalProps) {
  const { data: movie, isLoading, isError, error } = useMovieDetailsQuery(movieId);
  const imagePath = movie?.backdrop_path ?? movie?.poster_path;

  return (
    <Modal
      show={movieId !== null}
      onHide={onClose}
      centered
      size="lg"
      dialogClassName="movie-detail-modal"
      backdropClassName="movie-detail-backdrop"
    >
      <Modal.Body className="movie-detail-body">
        <button type="button" className="movie-detail-close" onClick={onClose}>
          <i className="bi bi-x-lg" />
        </button>

        {isLoading && (
          <div className="movie-detail-status">
            <Spinner animation="border" />
          </div>
        )}

        {isError && <Alert variant="danger">{error.message}</Alert>}

        {movie && (
          <>
            <div
              className="movie-detail-hero"
              style={{
                backgroundImage: imagePath
                  ? `url(https://media.themoviedb.org/t/p/w1280_and_h720_face/${imagePath})`
                  : undefined,
              }}
            />

            <div className="movie-detail-content">
              <h2>{movie.title}</h2>

              <div className="movie-detail-metadata">
                <span className="movie-detail-rating">★ {movie.vote_average.toFixed(1)}</span>
                {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
                {movie.runtime && <span>{movie.runtime} min</span>}
                <span className="movie-detail-age-rating">{movie.adult ? "18+" : "PG"}</span>
              </div>

              <p className="movie-detail-overview">{movie.overview}</p>

              <div className="movie-detail-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MovieDetailModal;
