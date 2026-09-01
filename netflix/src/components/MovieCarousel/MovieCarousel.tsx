import "react-multi-carousel/lib/styles.css";
import CarouselImport from "react-multi-carousel";
import { movieCarouselResponsive } from "../../constants/movieCarouselResponsive";
import type { GenreMap, Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
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
  return (
    <Carousel
      infinite
      centerMode
      itemClass="movie-carousel-item p-1"
      containerClass="movie-carousel"
      responsive={movieCarouselResponsive}
    >
      {movies.map((movie) => (
        <MovieCard movie={movie} genreMap={genreMap} key={movie.id} />
      ))}
    </Carousel>
  );
}

export default MovieCarousel;
