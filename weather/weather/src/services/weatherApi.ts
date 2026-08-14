
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherByCoords(latitude: number, longitude: number) {
    // fetch

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
        throw new Error("Failed to  fetch weather")
    }

    const data = (await response).json()
    return data
}