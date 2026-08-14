import { getWeatherTone } from "../utils/weatherPresentation";

type WeatherIconProps = {
  condition: string;
  large?: boolean;
};

export const WeatherIcon = ({ condition, large = false }: WeatherIconProps) => {
  const tone = getWeatherTone(condition);
  const symbols = { sun: "☀", cloud: "☁", rain: "☂", snow: "✣", mist: "≋" };

  return (
    <span className={`weather-icon weather-icon--${tone}${large ? " weather-icon--large" : ""}`} aria-hidden="true">
      <span>{symbols[tone]}</span>
    </span>
  );
};
