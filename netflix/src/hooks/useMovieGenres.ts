import { useSuspenseQuery } from "@tanstack/react-query";
import type { GenreMap, MovieGenresResponse } from "../types/movie";
import api from "../utils/api";

async function fetchMovieGenres(): Promise<GenreMap> {
  const response = await api.get<MovieGenresResponse>("/genre/movie/list");

  return Object.fromEntries(response.data.genres.map((genre) => [genre.id, genre.name]));
}

export const useMovieGenresQuery = () => {
  return useSuspenseQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    staleTime: Infinity,
  });
};
