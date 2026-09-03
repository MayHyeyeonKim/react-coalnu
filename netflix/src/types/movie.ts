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

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
  budget: number;
  genres: Genre[];
  release_date: string;
  runtime: number | null;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieGenresResponse {
  genres: Genre[];
}

export interface MovieReview {
  id: string;
  author: string;
  author_details: {
    rating: number | null;
  };
  content: string;
  created_at: string;
}

export interface MovieReviewsResponse {
  page: number;
  results: MovieReview[];
  total_pages: number;
  total_results: number;
}

export type GenreMap = Record<number, string>;

export type MovieSortBy = "popularity.desc" | "primary_release_date.desc" | "vote_average.desc";
