import { useSuspenseQuery } from "@tanstack/react-query";
import type { MoviesResponse } from "../types/movie";
import api from "../utils/api";

export type MovieCategory = "popular" | "top_rated" | "upcoming";

async function fetchMovies(category: MovieCategory) {
  const response = await api.get<MoviesResponse>(`/movie/${category}`);
  return response.data;
}

export const useMoviesQuery = (category: MovieCategory) => {
  return useSuspenseQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies(category),
  });
};
