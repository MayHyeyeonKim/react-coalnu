import type { Location } from "../types/Location";

type WeatherDetailPageProps = {
  location: Location;
  onBack: () => void;
};
export const WeatherDetailPage = ({ location, onBack }: WeatherDetailPageProps) => {
  return (
    <>
      <div> WeatherDetailPage</div>
      <p> {location.name}</p>
      <button onClick={onBack}>Back</button>
    </>
  );
};
