import type { GenreMap, Movie } from "../../types/movie";
import "./MovieCard.style.css";

interface MovieCardProp {
  movie: Movie;
  genreMap: GenreMap;
}

function MovieCard({ movie, genreMap }: MovieCardProp) {
  const previewPath = movie.backdrop_path ?? movie.poster_path;
  const genreNames = movie.genre_ids
    .map((id) => genreMap[id])
    .filter((name): name is string => Boolean(name))
    .slice(0, 3);

  return (
    <article className="movie-card">
      <div
        className="movie-card-preview"
        style={{
          backgroundImage: previewPath
            ? `url(https://media.themoviedb.org/t/p/w500_and_h282_face/${previewPath})`
            : undefined,
        }}
      >
        <h4>{movie.title}</h4>
      </div>

      <div className="movie-card-info">
        <div className="movie-card-actions">
          <button type="button" className="movie-action movie-action-play">
            <i className="bi bi-play-fill" />
          </button>
          <button type="button" className="movie-action">
            <i className="bi bi-plus-lg" />
          </button>
          <button type="button" className="movie-action">
            <i className="bi bi-hand-thumbs-up" />
          </button>
          <button type="button" className="movie-action movie-action-more">
            <i className="bi bi-chevron-down" />
          </button>
        </div>

        <div className="movie-card-metadata">
          <span className="movie-rating">★ {movie.vote_average.toFixed(1)}</span>
          <span className="movie-age-rating">{movie.adult ? "18+" : "PG"}</span>
          <span className="movie-quality">HD</span>
        </div>

        <div className="movie-card-genres">
          {genreNames.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>

        {movie.vote_average >= 7.5 && (
          <div className="movie-highlight">
            <i className="bi bi-hand-thumbs-up-fill" />
            Highly Rated
          </div>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
