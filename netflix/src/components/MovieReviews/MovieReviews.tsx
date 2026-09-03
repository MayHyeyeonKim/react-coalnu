import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import type { MovieReview } from "../../types/movie";
import "./MovieReviews.style.css";

const REVIEW_PREVIEW_LENGTH = 280;

interface MovieReviewsProps {
  movieId: number;
}

interface MovieReviewCardProps {
  review: MovieReview;
}

function MovieReviewCard({ review }: MovieReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongReview = review.content.length > REVIEW_PREVIEW_LENGTH;
  const reviewContent = isExpanded ? review.content : review.content.slice(0, REVIEW_PREVIEW_LENGTH);
  const reviewDate = new Date(review.created_at).toLocaleDateString();

  return (
    <article className="movie-review-card">
      <div className="movie-review-header">
        <div className="movie-review-avatar">{review.author.slice(0, 1).toUpperCase()}</div>

        <div>
          <h3>{review.author}</h3>
          <span>{reviewDate}</span>
        </div>

        {review.author_details.rating !== null && (
          <span className="movie-review-rating">★ {review.author_details.rating.toFixed(1)}</span>
        )}
      </div>

      <p className="movie-review-content">
        {reviewContent}
        {isLongReview && !isExpanded && "..."}
      </p>

      {isLongReview && (
        <button type="button" className="movie-review-toggle" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

function MovieReviews({ movieId }: MovieReviewsProps) {
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsIsError,
  } = useMovieReviewsQuery(movieId);

  return (
    <section className="movie-reviews">
      <div className="movie-reviews-title-row">
        <h2>Reviews</h2>
        {reviewsData && <span>{reviewsData.total_results.toLocaleString()}</span>}
      </div>

      {reviewsLoading && (
        <div className="movie-reviews-status">
          <Spinner animation="border" size="sm" />
        </div>
      )}

      {reviewsIsError && <p className="movie-reviews-status">Unable to load reviews.</p>}

      {reviewsData?.results.length === 0 && <p className="movie-reviews-status">No reviews yet.</p>}

      <div className="movie-reviews-list">
        {reviewsData?.results.map((review) => (
          <MovieReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

export default MovieReviews;
