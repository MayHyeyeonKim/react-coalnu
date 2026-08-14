import type { LocationWeather } from "../types/LocationWeather";
import { convertTemperature } from "../utils/temperature";

type WeatherCardProps = {
  locationWeather: LocationWeather;
  unit: "celsius" | "fahrenheit";
  setSelectedLocationWeather: (item: LocationWeather) => void;
};
export const WeatherCard = ({ locationWeather, unit, setSelectedLocationWeather }: WeatherCardProps) => {
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
        <span>
          {Math.round(convertTemperature(weather.temperature, unit))}
          {unit === "celsius" ? "°C" : "°F"}
        </span>

        <p>
          H: {Math.round(convertTemperature(weather.high, unit))}°{" / "}
          L: {Math.round(convertTemperature(weather.low, unit))}°
        </p>
      </div>
    </button>
  );
};
