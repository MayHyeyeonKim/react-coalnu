import { useQuery } from "@tanstack/react-query";
import type { MovieReviewsResponse } from "../types/movie";
import api from "../utils/api";

async function fetchMovieReviews(movieId: number): Promise<MovieReviewsResponse> {
  const response = await api.get<MovieReviewsResponse>(`/movie/${movieId}/reviews`);
  return response.data;
}

export const useMovieReviewsQuery = (movieId: number) => {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
  });
};
