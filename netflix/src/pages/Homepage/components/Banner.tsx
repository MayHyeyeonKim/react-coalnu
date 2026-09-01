import { useMoviesQuery } from "../../../hooks/useMovies";
import Alert from "react-bootstrap/Alert";
import "../Homepage.style.css";

function Banner() {
  const { data, isLoading, isError, error } = useMoviesQuery("popular");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const movie = data?.results[0];

  if (!movie) {
    return null;
  }

  const bannerPath = movie.backdrop_path ?? movie.poster_path;

  return (
    <div
      style={{
        backgroundImage: bannerPath
          ? `url(https://media.themoviedb.org/t/p/w1280_and_h720_face/${bannerPath})`
          : undefined,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
