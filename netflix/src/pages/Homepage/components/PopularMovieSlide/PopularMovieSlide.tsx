import { Alert } from "react-bootstrap";
import { useMovieGenresQuery } from "../../../../hook/useMovieGenres";
import { usePopularMoviesQuery } from "../../../../hook/usePopularMovies";

import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";

const Carousel =
  (
    CarouselImport as typeof CarouselImport & {
      default?: typeof CarouselImport;
    }
  ).default ?? CarouselImport;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function PopularMovieSlide() {
  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = usePopularMoviesQuery();
  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresIsError,
    error: genresError,
  } = useMovieGenresQuery();

  if (moviesLoading || genresLoading) {
    return <h1>Loading...</h1>;
  }

  if (moviesIsError || genresIsError) {
    return <Alert variant="danger">{moviesError?.message ?? genresError?.message}</Alert>;
  }

  if (!moviesData || !genresData) {
    return null;
  }

  const genreMap = Object.fromEntries(genresData.genres.map((genre) => [genre.id, genre.name]));

  return (
    <section className="popular-movie-section">
      <h3 className="popular-movie-title">Popular Movies</h3>

      <Carousel
        infinite
        centerMode
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {moviesData.results.map((movie) => (
          <MovieCard movie={movie} genreMap={genreMap} key={movie.id} />
        ))}
      </Carousel>
    </section>
  );
}
export default PopularMovieSlide;
