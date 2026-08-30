export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  adult: boolean;
}

export interface PopularMoviesResponse {
  results: Movie[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieGenresResponse {
  genres: Genre[];
}
