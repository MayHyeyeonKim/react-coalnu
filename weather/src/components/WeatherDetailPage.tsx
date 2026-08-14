import type { LocationWeather } from "../types/LocationWeather";

type WeatherDetailPageProps = {
  locationWeather: LocationWeather;
  onBack: () => void;
};
export const WeatherDetailPage = ({ locationWeather, onBack }: WeatherDetailPageProps) => {
  const { location, weather } = locationWeather;
  return (
    <>
      <div> WeatherDetailPage</div>
      <p> {location.name}</p>
      <p> {weather.temperature}</p>
      <p> {weather.condition}</p>
      <button onClick={onBack}>Back</button>
    </>
  );
};
