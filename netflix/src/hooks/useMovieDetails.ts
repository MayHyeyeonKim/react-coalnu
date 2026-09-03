import { useQuery } from "@tanstack/react-query";
import type { MovieDetails } from "../types/movie";
import api from "../utils/api";

async function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  const response = await api.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
}

export const useMovieDetailsQuery = (movieId: number | null) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => {
      if (movieId === null) {
        throw new Error("Movie ID is required.");
      }

      return fetchMovieDetails(movieId);
    },
    enabled: movieId !== null,
  });
};
