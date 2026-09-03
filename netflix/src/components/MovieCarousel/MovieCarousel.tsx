import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import CarouselImport from "react-multi-carousel";
import { movieCarouselResponsive } from "../../constants/movieCarouselResponsive";
import type { GenreMap, Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import MovieDetailModal from "../MovieDetailModal/MovieDetailModal";
import "./MovieCarousel.style.css";

const Carousel =
  (
    CarouselImport as typeof CarouselImport & {
      default?: typeof CarouselImport;
    }
  ).default ?? CarouselImport;

interface MovieCarouselProps {
  movies: Movie[];
  genreMap: GenreMap;
}

function MovieCarousel({ movies, genreMap }: MovieCarouselProps) {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleOpenDetails = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <>
      <Carousel
        infinite
        partialVisible
        swipeable
        draggable
        itemClass="movie-carousel-item p-1"
        containerClass="movie-carousel"
        responsive={movieCarouselResponsive}
        removeArrowOnDeviceType={["tablet", "largeMobile", "mobile"]}
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} genreMap={genreMap} key={movie.id} onOpenDetails={handleOpenDetails} />
        ))}
      </Carousel>

      <MovieDetailModal movieId={selectedMovieId} onClose={handleCloseDetails} />
    </>
  );
}

export default MovieCarousel;
