import { useQuery } from "@tanstack/react-query";
import type { MovieGenresResponse } from "../types/movie";
import api from "../utils/api";

const fetchMovieGenres = () => {
  return api.get<MovieGenresResponse>("/genre/movie/list");
};

export const useMovieGenresQuery = () => {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    select: (response) => response.data,
    staleTime: Infinity,
  });
};
