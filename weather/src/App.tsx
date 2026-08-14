import { useEffect, useState } from "react";
import "./App.css";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherDetailPage } from "./components/WeatherDetailPage";
import { getWeatherByCoords, searchLocation } from "./services/weatherApi";
import type { LocationWeather } from "./types/LocationWeather";
import type { SearchLocation } from "./types/SearchLocation";

function App() {
  const [selectedLocationWeather, setSelectedLocationWeather] = useState<LocationWeather | null>(null);
  const [locationWeathers, setLocationWeathers] = useState<LocationWeather[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchLocation[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const data = await getWeatherByCoords(position.coords.latitude, position.coords.longitude);

      setLocationWeathers([
        {
          location: {
            id: "current",
            name: data.name,
            longitude: data.coord.lon,
            latitude: data.coord.lat,
          },
          weather: {
            temperature: data.main.temp,
            high: data.main.temp_max,
            low: data.main.temp_min,
            condition: data.weather[0].main,
          },
        },
      ]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      return;
    }

    const searchCity = async () => {
      const data = await searchLocation(search);
      setSearchResults(
        data.map((item) => ({
          name: item.name,
          latitude: item.lat,
          longitude: item.lon,
          country: item.country,
          state: item.state,
        })),
      );
    };
    searchCity();
  }, [search]);

  const handleSelectLocation = async (location: SearchLocation) => {
    const alreadyExists = locationWeathers.some(
      (item) => item.location.latitude === location.latitude && item.location.longitude === location.longitude,
    );
    if (alreadyExists || locationWeathers.length >= 5) return;

    const data = await getWeatherByCoords(location.latitude, location.longitude);
    const newLocationWeather: LocationWeather = {
      location: {
        id: crypto.randomUUID(),
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      weather: {
        temperature: data.main.temp,
        high: data.main.temp_max,
        low: data.main.temp_min,
        condition: data.weather[0].main,
      },
    };

    setLocationWeathers((prev) => [...prev, newLocationWeather]);
    closeSearch();
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearch("");
    setSearchResults([]);
  };

  const handleRemoveLocation = (locationId: string) => {
    setLocationWeathers((prev) => prev.filter((item) => item.location.id !== locationId));
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  if (isLoading) {
    return (
      <main className="loading-screen" aria-live="polite">
        <div className="loading-mark" aria-hidden="true">
          <span />
        </div>
        <p className="eyebrow">May’s Sky</p>
        <h1>Gathering the clouds...</h1>
        <p>A little forecast magic is on its way</p>
      </main>
    );
  }

  if (selectedLocationWeather) {
    return (
      <WeatherDetailPage
        locationWeather={selectedLocationWeather}
        unit={unit}
        onBack={() => setSelectedLocationWeather(null)}
      />
    );
  }

  return (
    <main className="app-shell">
      <div className="ambient-orb ambient-orb--one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="May’s Sky weather home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>May’s Sky</span>
        </a>

        <button
          className="unit-toggle"
          type="button"
          onClick={() => setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"))}
          aria-label={`Switch to ${unit === "celsius" ? "Fahrenheit" : "Celsius"}`}
        >
          <span className={unit === "celsius" ? "active" : ""}>°C</span>
          <span className={unit === "fahrenheit" ? "active" : ""}>°F</span>
        </button>
      </header>

      <section className="intro" id="top">
        <div>
          <p className="eyebrow">{formattedDate}</p>
          <h1>Your weather,<br /><em>at a glance.</em></h1>
        </div>
        <p className="intro-copy">A pocketful of weather for all the places you love. Pick a city and see what the sky is up to.</p>
      </section>

      <section className="weather-section" aria-labelledby="saved-places-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Forecast</p>
            <h2 id="saved-places-title">Saved places</h2>
          </div>
          <span>{locationWeathers.length} / 5</span>
        </div>

        <div className="weather-grid">
          {locationWeathers.map((item, index) => (
            <WeatherCard
              key={item.location.id}
              locationWeather={item}
              unit={unit}
              index={index}
              setSelectedLocationWeather={setSelectedLocationWeather}
              onRemove={item.location.id === "current" ? undefined : handleRemoveLocation}
            />
          ))}

          <button
            className="add-card"
            type="button"
            disabled={locationWeathers.length >= 5}
            onClick={() => setIsSearchOpen(true)}
          >
            <span className="add-icon" aria-hidden="true">+</span>
            <span>
              <strong>{locationWeathers.length >= 5 ? "All places filled" : "Add a new place"}</strong>
              <small>{locationWeathers.length >= 5 ? "Remove a place to add another" : "Search cities around the world"}</small>
            </span>
          </button>
        </div>
      </section>

      <footer>
        <span>Fresh from the sky</span>
        <span className="footer-dot" />
        <span>Updated just now</span>
      </footer>

      {isSearchOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeSearch()}>
          <section className="search-modal" role="dialog" aria-modal="true" aria-labelledby="search-title">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Explore</p>
                <h2 id="search-title">Add a place</h2>
              </div>
              <button className="icon-button" type="button" onClick={closeSearch} aria-label="Close search">×</button>
            </div>

            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                autoFocus
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search city or town"
              />
            </label>

            <div className="search-results" aria-live="polite">
              {!search.trim() && <p className="search-hint">Try “Lisbon”, “Seoul”, or somewhere you love.</p>}
              {search.trim() && searchResults.length === 0 && <p className="search-hint">Searching the map...</p>}
              {search.trim() && searchResults.map((location) => (
                <button
                  className="search-result"
                  key={`${location.latitude}-${location.longitude}`}
                  type="button"
                  onClick={() => handleSelectLocation(location)}
                >
                  <span className="pin" aria-hidden="true">⌖</span>
                  <span>
                    <strong>{location.name}</strong>
                    <small>{[location.state, location.country].filter(Boolean).join(", ")}</small>
                  </span>
                  <span className="result-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
