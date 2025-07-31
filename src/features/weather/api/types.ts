export interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
}

export interface CitySuggestion {
  name: string;
}

export interface SuggestionsApiResponse {
  list: CitySuggestion[];
}