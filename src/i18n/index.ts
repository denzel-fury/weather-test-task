import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      weatherForecast: "Weather Forecast",
      enterCity: "Enter city",
      search: "Search",
      cityNotFound: "City not found",
      temp: "Temp",
      min: "Min",
      max: "Max",
      wind: "Wind",
      searchHistory: "Search History",
      undoDelete: "Undo delete",
    }
  },
  // Add more languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
