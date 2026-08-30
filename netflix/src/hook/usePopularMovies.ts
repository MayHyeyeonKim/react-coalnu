import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"
import type { PopularMoviesResponse } from "../types/movie"

const fetchPopularMovies = () => {
    return api.get<PopularMoviesResponse>(`/movie/popular`)
}

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
        select: (result) => result.data
    })
}
