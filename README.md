# 🌤️ Weather Forecast App

A responsive React app that fetches and displays weather data by city using the OpenWeatherMap API. It features search history, undo support, live suggestions, i18n support, and performance optimizations.

## 🚀 Features

- 🔍 Search weather by city name
- 🌡️ Shows current, min/max temperature, weather description, and wind speed
- 🕓 Debounced input and API calls
- 📜 Autocomplete suggestions for cities
- 📂 Search history stored in localStorage
- 🔁 Undo deleted history items

---

## 🛠️ Tech Stack

- React (w/ Hooks)
- TypeScript or JavaScript
- Tailwind CSS
- redux-toolkit
- Axios
- Lodash (for debounce)
- react-i18next (internationalization)
- OpenWeatherMap API

---

## 📦 Installation

- Create `.env` file with REACT_APP_WEATHER_API_KEY key that responsible for weather api communication
  find more at `https://openweathermap.org/api`

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
yarn
yarn run start
```

---

## 📦 Testing

Project covered with tests unit/snapshots

```bash
yarn test
```
