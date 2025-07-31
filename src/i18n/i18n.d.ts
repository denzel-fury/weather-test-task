import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        weatherForecast: string;
        enterCity: string;
        search: string;
        cityNotFound: string;
        temp: string;
        min: string;
        max: string;
        wind: string;
        searchHistory: string;
        undoDelete: string;
      };
    };
  }
}