import { useState, useEffect } from "react";
import "./App.css";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherDetailPage } from "./components/WeatherDetailPage";
import { getWeatherByCoords, searchLocation } from "./services/weatherApi";
import type { LocationWeather } from "./types/LocationWeather";
import type { SearchLocation } from "./types/SearchLocation";

/**
 * 1. 앱이 실행되자마자 현재 위치 기반 날씨 정보 보인다
 * 2. 날씨는 섭씨 화씨로 바꿀 수 있다
 * 3. 도시별로 날씨 추가할 수 있다
 * 4. 현재 위치 날씨로 디폴트 돌아오는거
 * 5. 로딩스피너
 */

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
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const data = await getWeatherByCoords(latitude, longitude);
      console.log("data: ", data);

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

    if (alreadyExists) return;

    if (locationWeathers.length >= 5) return;

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
    setIsSearchOpen(false);
    setSearch("");
    setSearchResults([]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (selectedLocationWeather) {
    return (
      <WeatherDetailPage
        locationWeather={selectedLocationWeather}
        unit={unit}
        onBack={() => {
          setSelectedLocationWeather(null);
        }}
      />
    );
  }
  return (
    <>
      {locationWeathers.map((item) => {
        return (
          <WeatherCard
            key={item.location.id}
            locationWeather={item}
            unit={unit}
            setSelectedLocationWeather={setSelectedLocationWeather}
          />
        );
      })}

      <button
        type="button"
        onClick={() => {
          setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
        }}
      >
        {unit === "celsius" ? "Switch to °F" : "Switch to °C"}
      </button>

      <button
        type="button"
        disabled={locationWeathers.length >= 5}
        onClick={() => {
          setIsSearchOpen(true);
        }}
      >
        Add Location
      </button>

      {isSearchOpen && (
        <>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search city"
          />

          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(false);
              setSearch("");
              setSearchResults([]);
            }}
          >
            Cancel
          </button>

          {searchResults.map((location) => {
            return (
              <button
                key={`${location.latitude}-${location.longitude}`}
                type="button"
                onClick={() => {
                  handleSelectLocation(location);
                }}
              >
                {location.name}, {location.state}, {location.country}
              </button>
            );
          })}
        </>
      )}
    </>
  );
}

export default App;
