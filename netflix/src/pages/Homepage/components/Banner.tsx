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
  return (
    <div
      style={{
        backgroundImage:
          "url(" + `https://media.themoviedb.org/t/p/w533_and_h300_face/${data.results[0].poster_path}` + ")",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
}

export default Banner;
