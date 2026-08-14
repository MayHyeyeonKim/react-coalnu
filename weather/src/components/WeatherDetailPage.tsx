import type { LocationWeather } from "../types/LocationWeather";
import { convertTemperature } from "../utils/temperature";
import { getWeatherTone } from "../utils/weatherPresentation";
import { WeatherIcon } from "./WeatherIcon";

type WeatherDetailPageProps = {
  locationWeather: LocationWeather;
  unit: "celsius" | "fahrenheit";
  onBack: () => void;
};

export const WeatherDetailPage = ({ locationWeather, unit, onBack }: WeatherDetailPageProps) => {
  const { location, weather } = locationWeather;
  const current = Math.round(convertTemperature(weather.temperature, unit));
  const high = Math.round(convertTemperature(weather.high, unit));
  const low = Math.round(convertTemperature(weather.low, unit));
  const unitLabel = unit === "celsius" ? "C" : "F";
  const position = high === low ? 50 : Math.min(100, Math.max(0, ((current - low) / (high - low)) * 100));

  return (
    <main className={`detail-page detail-page--${getWeatherTone(weather.condition)}`}>
      <div className="ambient-orb ambient-orb--one" aria-hidden="true" />
      <nav className="detail-nav">
        <button className="back-button" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> All places
        </button>
        <span className="detail-brand">May’s Sky</span>
      </nav>

      <section className="detail-hero">
        <div className="detail-location">
          <p className="eyebrow">{location.id === "current" ? "Your location" : "Saved place"}</p>
          <h1>{location.name}</h1>
          <p className="coordinates">{Math.abs(location.latitude).toFixed(2)}° {location.latitude >= 0 ? "N" : "S"} · {Math.abs(location.longitude).toFixed(2)}° {location.longitude >= 0 ? "E" : "W"}</p>
        </div>

        <div className="detail-weather">
          <WeatherIcon condition={weather.condition} large />
          <div>
            <span className="detail-temperature">{current}<sup>°{unitLabel}</sup></span>
            <p>{weather.condition}</p>
          </div>
        </div>
      </section>

      <section className="day-card" aria-labelledby="today-heading">
        <div className="day-card-heading">
          <div>
            <p className="eyebrow">Today</p>
            <h2 id="today-heading">The day ahead</h2>
          </div>
          <p>Temperatures will range from {low}° to {high}° today.</p>
        </div>

        <div className="temperature-range">
          <div className="range-labels"><span>Low <strong>{low}°</strong></span><span>High <strong>{high}°</strong></span></div>
          <div className="range-track"><span style={{ left: `${position}%` }}><i />Now {current}°</span></div>
        </div>

        <div className="detail-stats">
          <div><span>Feels now</span><strong>{current}°</strong></div>
          <div><span>Daytime high</span><strong>{high}°</strong></div>
          <div><span>Overnight low</span><strong>{low}°</strong></div>
        </div>
      </section>

      <p className="detail-footnote">Fresh from the sky · Updated just now</p>
    </main>
  );
};
