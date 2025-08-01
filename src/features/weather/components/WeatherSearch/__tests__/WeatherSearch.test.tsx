import React from 'react';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../../../../test-utils/renderWithProviders';
import WeatherSearch from '../index';

describe('WeatherSearch', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders input and button', () => {
    renderWithProviders(<WeatherSearch onSearch={mockOnSearch} />);

    expect(screen.getByTestId('city-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  test('typing into input updates its value', async () => {
    renderWithProviders(<WeatherSearch onSearch={mockOnSearch} />);
    const input = screen.getByTestId('city-input');

    fireEvent.change(input, { target: { value: 'Paris' } });

    expect((input as HTMLInputElement).value).toBe('Paris');
  });

  test('clicking search calls onSearch with input value', async () => {
    renderWithProviders(<WeatherSearch onSearch={mockOnSearch} />);
    const input = screen.getByTestId('city-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Berlin' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Berlin');
  });

  test('renders suggestions and handles click', async () => {
    renderWithProviders(<WeatherSearch onSearch={mockOnSearch} />);

    const input = screen.getByTestId('city-input');
    fireEvent.change(input, { target: { value: 'Lon' } });

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('London'));

    expect(mockOnSearch).toHaveBeenCalledWith('London');
    expect((input as HTMLInputElement).value).toBe('London');
  });

  test('matches snapshot', () => {
    const { asFragment } = renderWithProviders(<WeatherSearch onSearch={() => { }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
