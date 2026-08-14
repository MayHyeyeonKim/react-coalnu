export const convertTemperature = (
    temperature: number,
    unit: "celsius" | "fahrenheit",
) => {
    if (unit === "celsius") return temperature;

    return (temperature * 9) / 5 + 32;
};