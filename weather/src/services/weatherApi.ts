import type { GeocodingResult } from "../types/GeocodingResult"

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

export async function searchLocation(query: string): Promise<GeocodingResult[]> {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    )

    if (!response.ok) {
        throw new Error("Failed to search locations")
    }

    const data = await response.json()
    return data
}