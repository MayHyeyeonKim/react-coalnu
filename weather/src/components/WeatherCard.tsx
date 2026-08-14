import type { LocationWeather } from "../types/LocationWeather";

type WeatherCardProps = {
  locationWeather: LocationWeather;
  setSelectedLocationWeather: (item: LocationWeather) => void;
};
export const WeatherCard = ({ locationWeather, setSelectedLocationWeather }: WeatherCardProps) => {
  const { location, weather } = locationWeather;
  return (
    <button className="weather-card" onClick={() => setSelectedLocationWeather(locationWeather)}>
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
