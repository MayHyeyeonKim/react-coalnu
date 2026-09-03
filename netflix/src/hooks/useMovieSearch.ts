import { useSuspenseQuery } from "@tanstack/react-query";
import type { MoviesResponse, MovieSortBy } from "../types/movie";
import api from "../utils/api";

export const useMovieSearch = ({
  sortBy,
  keyword,
  page,
}: {
  sortBy: MovieSortBy;
  keyword: string;
  page: number;
}) => {
  return useSuspenseQuery({
    queryKey: ["movie-search", keyword || "popular", sortBy, page],
    queryFn: async () => {
      const response = keyword
        ? await api.get<MoviesResponse>("/search/movie", {
            params: { query: keyword, page },
          })
        : await api.get<MoviesResponse>("/discover/movie", {
            params: { page, sort_by: sortBy },
          });

      return response.data;
    },
  });
};
