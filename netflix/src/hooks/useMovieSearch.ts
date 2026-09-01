import { useQuery } from "@tanstack/react-query";
import type { MoviesResponse } from "../types/movie";
import api from "../utils/api";

export const useMovieSearch = ({ keyword }: { keyword: string }) => {
    return useQuery({
        queryKey: ["movie-search", keyword || "popular"],
        queryFn: async () => {
            const response = keyword
                ? await api.get<MoviesResponse>("/search/movie", {
                    params: { query: keyword },
                })
                : await api.get<MoviesResponse>("/movie/popular");

            return response.data.results;
        },
    });
};
