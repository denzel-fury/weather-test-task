import React from 'react'
import { useTranslation } from "react-i18next";


interface WeatherDisplayProps {
  weather: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 p-4 rounded mb-4" data-testid="weather-display">
      <h2 className="text-xl font-semibold">{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>{t("temp")}: {weather.main.temp}°C</p>
      <p>{t("min")}: {weather.main.temp_min}°C / {t("max")}: {weather.main.temp_max}°C</p>
      <p>{t("wind")}: {weather.wind.speed} m/s</p>
    </div>
  );
};

const MemoizedWeatherDisplay = React.memo(WeatherDisplay);

export default MemoizedWeatherDisplay