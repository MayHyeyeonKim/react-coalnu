import { Alert, Col, Row, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useMovieGenresQuery } from "../../hooks/useMovieGenres";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q")?.trim() ?? "";
  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useMovieSearch({ keyword });
  const {
    data: genreMap,
    isLoading: genresLoading,
    isError: genresIsError,
    error: genresError,
  } = useMovieGenresQuery();

  if (moviesLoading || genresLoading) {
    return <h2 className="movie-page-status">Loading...</h2>;
  }

  if (moviesIsError || genresIsError) {
    return <Alert variant="danger">{moviesError?.message ?? genresError?.message}</Alert>;
  }

  if (!moviesData || !genreMap) {
    return null;
  }

  return (
    <main className="movie-page">
      <Container fluid="xl">
        <h1 className="movie-page-title">
          {keyword ? `Results for “${keyword}”` : "Popular Movies"}
        </h1>

        <Row className="g-4">
          <Col md={3}>sort</Col>

          <Col md={9}>
            {moviesData.length > 0 ? (
              <>
                <div className="movie-results-header">
                  <span>{moviesData.length} titles</span>
                </div>

                <div className="movie-results-grid">
                  {moviesData.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      genreMap={genreMap}
                      variant="grid"
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="movie-page-empty">No movies found for “{keyword}”.</p>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MoviePage;
