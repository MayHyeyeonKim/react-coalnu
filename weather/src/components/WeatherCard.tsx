import type { LocationWeather } from "../types/LocationWeather";
import { convertTemperature } from "../utils/temperature";
import { getWeatherTone } from "../utils/weatherPresentation";
import { WeatherIcon } from "./WeatherIcon";

type WeatherCardProps = {
  locationWeather: LocationWeather;
  unit: "celsius" | "fahrenheit";
  index: number;
  setSelectedLocationWeather: (item: LocationWeather) => void;
};

export const WeatherCard = ({ locationWeather, unit, index, setSelectedLocationWeather }: WeatherCardProps) => {
  const { location, weather } = locationWeather;
  const unitLabel = unit === "celsius" ? "C" : "F";

  return (
    <button
      className={`weather-card weather-card--${getWeatherTone(weather.condition)}`}
      style={{ "--card-delay": `${index * 80}ms` } as React.CSSProperties}
      onClick={() => setSelectedLocationWeather(locationWeather)}
      aria-label={`View weather details for ${location.name}`}
    >
      <span className="card-glow" aria-hidden="true" />
      <span className="card-topline">
        <span className="location-label">
          <i aria-hidden="true" />
          {location.id === "current" ? "Current location" : "Saved place"}
        </span>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </span>

      <span className="card-main">
        <span>
          <strong className="city-name">{location.name}</strong>
          <span className="condition">{weather.condition}</span>
        </span>
        <WeatherIcon condition={weather.condition} />
      </span>

      <span className="card-forecast">
        <span className="temperature">
          {Math.round(convertTemperature(weather.temperature, unit))}<sup>°{unitLabel}</sup>
        </span>
        <span className="high-low">
          <span><small>High</small>{Math.round(convertTemperature(weather.high, unit))}°</span>
          <i />
          <span><small>Low</small>{Math.round(convertTemperature(weather.low, unit))}°</span>
        </span>
      </span>
    </button>
  );
};
