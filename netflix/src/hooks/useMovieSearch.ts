import { useQuery } from "@tanstack/react-query";
import type { MoviesResponse } from "../types/movie";
import api from "../utils/api";

export const useMovieSearch = ({ keyword, page }: { keyword: string; page: number }) => {
    return useQuery({
        queryKey: ["movie-search", keyword || "popular", page],
        queryFn: async () => {
            const response = keyword
                ? await api.get<MoviesResponse>("/search/movie", {
                    params: { query: keyword, page },
                })
                : await api.get<MoviesResponse>("/movie/popular", {
                    params: { page },
                });

            return response.data;
        },
    });
};
