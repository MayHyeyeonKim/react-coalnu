import type { LocationWeather } from "../types/LocationWeather";
import { convertTemperature } from "../utils/temperature";

type WeatherDetailPageProps = {
  locationWeather: LocationWeather;
  unit: "celsius" | "fahrenheit";
  onBack: () => void;
};
export const WeatherDetailPage = ({ locationWeather, unit, onBack }: WeatherDetailPageProps) => {
  const { location, weather } = locationWeather;
  return (
    <>
      <div> WeatherDetailPage</div>
      <p> {location.name}</p>
      <p> {weather.temperature}</p>
      <p> {weather.condition}</p>
      <p>
        {Math.round(convertTemperature(weather.temperature, unit))}
        {unit === "celsius" ? "°C" : "°F"}
      </p>

      <p>
        H: {Math.round(convertTemperature(weather.high, unit))}° / L:{" "}
        {Math.round(convertTemperature(weather.low, unit))}°
      </p>
      <button onClick={onBack}>Back</button>
    </>
  );
};
