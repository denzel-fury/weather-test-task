import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../index';
import { WeatherData } from '../../../api/types'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // simple passthrough
  }),
}));

describe('WeatherDisplay', () => {
  const mockWeather: WeatherData = {
    name: 'Paris',
    weather: [{ description: 'clear sky', icon: 'mock' }],
    main: {
      temp: 25,
      temp_min: 20,
      temp_max: 28,
    },
    wind: {
      speed: 5,
    },
  };

  test('renders weather data correctly', () => {
    render(<WeatherDisplay weather={mockWeather} />);

    const display = screen.getByTestId('weather-display');
    expect(display).toBeInTheDocument();

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText(/temp.*25°C/)).toBeInTheDocument();
    expect(screen.getByText(/min.*20°C.*max.*28°C/)).toBeInTheDocument();
    expect(screen.getByText(/wind.*5 m\/s/)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<WeatherDisplay weather={mockWeather} />);;
    expect(asFragment()).toMatchSnapshot();
  });
});
