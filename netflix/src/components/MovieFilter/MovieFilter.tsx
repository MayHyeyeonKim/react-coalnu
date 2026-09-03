import type { GenreMap } from "../../types/movie";
import "./MovieFilter.style.css";

interface MovieFilterProps {
  genreMap: GenreMap;
  selectedGenreIds: number[];
  onToggleGenre: (genreId: number) => void;
  onClearFilters: () => void;
}

function MovieFilter({ genreMap, selectedGenreIds, onToggleGenre, onClearFilters }: MovieFilterProps) {
  const genres = Object.entries(genreMap).map(([id, name]) => ({ id: Number(id), name }));

  return (
    <aside className="movie-filter">
      <div className="movie-filter-header">
        <h2>Genres</h2>
        {selectedGenreIds.length > 0 && (
          <button type="button" className="movie-filter-clear" onClick={onClearFilters}>
            Clear
          </button>
        )}
      </div>

      <div className="movie-filter-options">
        {genres.map((genre) => {
          const isSelected = selectedGenreIds.includes(genre.id);

          return (
            <button
              type="button"
              key={genre.id}
              className={`movie-filter-option${isSelected ? " is-selected" : ""}`}
              onClick={() => onToggleGenre(genre.id)}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default MovieFilter;
