import { useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import ReactPaginateImport from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieDetailModal from "../../components/MovieDetailModal/MovieDetailModal";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import { useMovieGenresQuery } from "../../hooks/useMovieGenres";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import type { MovieSortBy } from "../../types/movie";
import "./MoviePage.style.css";

const ReactPaginate =
  (
    ReactPaginateImport as typeof ReactPaginateImport & {
      default?: typeof ReactPaginateImport;
    }
  ).default ?? ReactPaginateImport;

const MAX_TMDB_PAGE = 500;
const MOVIES_PER_PAGE = 20;
const SORT_LABELS: Record<MovieSortBy, string> = {
  "popularity.desc": "Popular",
  "primary_release_date.desc": "Latest",
  "vote_average.desc": "Rating",
};

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<MovieSortBy>("popularity.desc");
  const keyword = searchParams.get("q")?.trim() ?? "";
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({ keyword, page: 1 });
  const page = pagination.keyword === keyword ? pagination.page : 1;
  const apiPage = Math.min(page, MAX_TMDB_PAGE);

  const navigate = useNavigate();

  const handleOpenDetails = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  const handleGoToDetailPage = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleSortChange = (sortOption: MovieSortBy) => {
    setSortBy(sortOption);
    setPagination({ keyword, page: 1 });
  };

  const handleToggleGenre = (genreId: number) => {
    setSelectedGenreIds((previousGenreIds) =>
      previousGenreIds.includes(genreId)
        ? previousGenreIds.filter((selectedGenreId) => selectedGenreId !== genreId)
        : [...previousGenreIds, genreId],
    );
    setPagination({ keyword, page: 1 });
  };

  const handleClearFilters = () => {
    setSelectedGenreIds([]);
    setPagination({ keyword, page: 1 });
  };

  const { data: moviesData } = useMovieSearch({
    sortBy,
    keyword,
    page: apiPage,
    genreIds: selectedGenreIds,
  });
  const { data: genreMap } = useMovieGenresQuery();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPagination({ keyword, page: selected + 1 });
  };

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
          {!keyword && (
            <Col md={3}>
              <MovieFilter
                genreMap={genreMap}
                selectedGenreIds={selectedGenreIds}
                onToggleGenre={handleToggleGenre}
                onClearFilters={handleClearFilters}
              />
            </Col>
          )}

          <Col md={keyword ? 12 : 9}>
            {moviesData.results.length > 0 ? (
              <>
                <div className="movie-results-header">
                  {!keyword && (
                    <Dropdown className="movie-sort-dropdown">
                      <Dropdown.Toggle variant="dark" id="movie-sort-dropdown" className="movie-sort-toggle">
                        Sort by: {SORT_LABELS[sortBy]}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortChange("popularity.desc")}>Popular</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("primary_release_date.desc")}>Latest</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("vote_average.desc")}>Rating</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}

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
                      onGoToDetailPage={handleGoToDetailPage}
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
