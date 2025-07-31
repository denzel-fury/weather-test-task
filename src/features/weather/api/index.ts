import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherData, SuggestionsApiResponse } from './types'
const API_KEY = "0c9231a730ccab5862b083452b48a013";

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherData, string>({
      query: (city) => `weather?q=${city}&appid=${API_KEY}&units=metric`,
    }),
    getSuggestions: builder.query<string[], string>({
      query: (query) => `find?q=${query}&type=like&appid=${API_KEY}&units=metric`,
      transformResponse: (res: SuggestionsApiResponse) => {
        const seen = new Set<string>();

        return res.list
          .map((item) => item.name)
          .filter((location) => {
            if (seen.has(location)) return false;
            seen.add(location);
            return true;
          });
      }
    }),
  }),
});

export const { useGetWeatherQuery, useGetSuggestionsQuery } = weatherApi;
