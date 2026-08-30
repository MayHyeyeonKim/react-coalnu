import { usePopularMoviesQuery } from "../../../hook/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "../Homepage.style.css";

function Banner() {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log("data: ", data);

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

  return (
    <div
      style={{
        backgroundImage: movie.poster_path
          ? `url(https://media.themoviedb.org/t/p/w533_and_h300_face/${movie.poster_path})`
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
