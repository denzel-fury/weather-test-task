import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import weatherReducer from '../features/weather/slice';

const createTestStore = () =>
  configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });

const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  const store = createTestStore();
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { renderWithProviders };
