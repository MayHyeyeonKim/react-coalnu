import MovieSection from "../../components/MovieSection/MovieSection";
import Banner from "./components/Banner";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <MovieSection title="Popular Movies" category="popular" />
      <MovieSection title="Top Rated Movies" category="top_rated" />
      <MovieSection title="Upcoming Movies" category="upcoming" />
    </div>
  );
};

export default Homepage;
