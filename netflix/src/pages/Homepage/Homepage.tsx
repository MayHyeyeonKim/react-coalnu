import MovieSection from "../../components/MovieSection/MovieSection";
import Banner from "./components/Banner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Homepage = () => {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Banner />
        <MovieSection title="Popular Movies" category="popular" />
        <MovieSection title="Top Rated Movies" category="top_rated" />
        <MovieSection title="Upcoming Movies" category="upcoming" />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Homepage;
