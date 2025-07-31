import React from "react";
import { useTranslation } from "react-i18next";
import useWeatherSearch from "./useWeatherSearch";
export interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const {
    handleInput,
    handleSearch,
    handleSuggestionClick,
    suggestions,
    input,
  } = useWeatherSearch({ onSearch })

  return (
    <div className="flex flex-col mb-4">
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder={t("enterCity") ?? ""}
          className="flex-1 border p-2"
          data-testid="city-input"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2"
          data-testid="search-button"
        >
          {t("search")}
        </button>
      </div>
      {suggestions && suggestions?.length > 0 && (
        <ul className="bg-white border mt-1">
          {suggestions.map((s: string) => (
            <li
              key={s}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(WeatherSearch);
