import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import ReactPaginateImport from "react-paginate";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieDetailModal from "../../components/MovieDetailModal/MovieDetailModal";
import { useMovieGenresQuery } from "../../hooks/useMovieGenres";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import "./MoviePage.style.css";

const ReactPaginate =
  (
    ReactPaginateImport as typeof ReactPaginateImport & {
      default?: typeof ReactPaginateImport;
    }
  ).default ?? ReactPaginateImport;

const MAX_TMDB_PAGE = 500;
const MOVIES_PER_PAGE = 20;

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q")?.trim() ?? "";
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({ keyword, page: 1 });
  const page = pagination.keyword === keyword ? pagination.page : 1;
  const apiPage = Math.min(page, MAX_TMDB_PAGE);

  const handleOpenDetails = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };
  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useMovieSearch({ keyword, page: apiPage });
  const {
    data: genreMap,
    isLoading: genresLoading,
    isError: genresIsError,
    error: genresError,
  } = useMovieGenresQuery();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPagination({ keyword, page: selected + 1 });
  };

  if (moviesLoading || genresLoading) {
    return <h2 className="movie-page-status">Loading...</h2>;
  }

  if (moviesIsError || genresIsError) {
    return <Alert variant="danger">{moviesError?.message ?? genresError?.message}</Alert>;
  }

  if (!moviesData || !genreMap) {
    return null;
  }

  const pageCount = Number.isFinite(moviesData.total_pages)
    ? Math.min(MAX_TMDB_PAGE, Math.max(0, Math.floor(moviesData.total_pages)))
    : 0;
  const firstMovieNumber = (apiPage - 1) * MOVIES_PER_PAGE + 1;
  const lastMovieNumber = Math.min(firstMovieNumber + moviesData.results.length - 1, moviesData.total_results);

  return (
    <main className="movie-page">
      <Container fluid="xl">
        <h1 className="movie-page-title">{keyword ? `Results for “${keyword}”` : "Popular Movies"}</h1>

        <Row className="g-4">
          <Col md={3}>sort</Col>

          <Col md={9}>
            {moviesData.results.length > 0 ? (
              <>
                <div className="movie-results-header">
                  <span>
                    Showing {firstMovieNumber.toLocaleString()}–{lastMovieNumber.toLocaleString()} of{" "}
                    {moviesData.total_results.toLocaleString()} titles
                  </span>
                </div>

                <div className="movie-results-grid">
                  {moviesData.results.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      genreMap={genreMap}
                      variant="grid"
                      onOpenDetails={handleOpenDetails}
                    />
                  ))}
                </div>
                {pageCount > 1 && (
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    forcePage={Math.min(apiPage - 1, pageCount - 1)}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                )}
              </>
            ) : (
              <p className="movie-page-empty">No movies found for “{keyword}”.</p>
            )}
          </Col>
        </Row>

        <MovieDetailModal movieId={selectedMovieId} onClose={handleCloseDetails} />
      </Container>
    </main>
  );
};

export default MoviePage;
