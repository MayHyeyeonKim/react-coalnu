import type { Location } from "../types/Location";
import type { Weather } from "../types/Weather";

type WeatherCardProps = {
  location: Location;
  weather: Weather | null;
  setSelectedLocation: (location: Location) => void;
};
export const WeatherCard = ({ location, weather, setSelectedLocation }: WeatherCardProps) => {
  console.log(location);
  return (
    <button className="weather-card" onClick={() => setSelectedLocation(location)}>
      WeatherCard
      <div>
        <div>{location.name}</div>
        <div>My Location</div>
        <p>{weather?.condition}</p>
      </div>
      <div>
        <span> {weather?.temperature}</span>
        <p>
          {" "}
          {weather?.high} / {weather?.low}
        </p>
      </div>
    </button>
  );
};
