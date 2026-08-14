import { useState, useEffect } from "react";
import "./App.css";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherDetailPage } from "./components/WeatherDetailPage";
import { getWeatherByCoords } from "./services/weatherApi";
import type { LocationWeather } from "./types/LocationWeather";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (selectedLocationWeather) {
    return (
      <WeatherDetailPage
        locationWeather={selectedLocationWeather}
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
            setSelectedLocationWeather={setSelectedLocationWeather}
          />
        );
      })}
    </>
  );
}

export default App;
