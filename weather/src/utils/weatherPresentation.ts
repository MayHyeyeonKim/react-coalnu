export const getWeatherTone = (condition: string) => {
  const value = condition.toLowerCase();

  if (value.includes("rain") || value.includes("drizzle") || value.includes("thunder")) return "rain";
  if (value.includes("snow")) return "snow";
  if (value.includes("cloud")) return "cloud";
  if (value.includes("mist") || value.includes("fog") || value.includes("haze")) return "mist";
  return "sun";
};
