import React from "react";
import { useTranslation } from "react-i18next";


import HistorySection from './components/HistorySection'
import WeatherDisplay from './components/WeatherDisplay'
import WeatherSearch from './components/WeatherSearch'
import useWeather from "./hooks/useWeather";

const WeatherModule: React.FC = () => {

  const { t } = useTranslation();
  const {
    history,
    deletedItem,
    weather,
    isFetching,
    weatherError,
    handleDelete,
    handleSearch,
    handleUndo,
  } = useWeather();

  return (
    <div className="max-w-md mx-auto p-4" data-testid="weather-app">
      <h1 className="text-2xl font-bold mb-4">{t("weatherForecast")}</h1>
      <WeatherSearch onSearch={handleSearch} />

      {isFetching && <p className="text-sm text-gray-600">Loading...</p>}
      {
        weatherError && (
          <div className="text-red-600 text-sm mb-4" data-testid="error-block">
            {weatherError}
          </div>)
      }
      {weather && !isFetching && !weatherError && (
        <WeatherDisplay weather={weather} />
      )}

      {history.length > 0 && (
        <HistorySection
          history={history}
          deletedItem={deletedItem}
          onCitySelect={handleSearch}
          onDelete={handleDelete}
          onUndo={handleUndo}
        />
      )}
    </div>
  );
};



export default React.memo(WeatherModule);
