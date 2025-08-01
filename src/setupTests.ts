import '@testing-library/jest-dom';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Optionally mock axios or fetch globally
jest.mock('axios');


jest.mock('@reduxjs/toolkit/query/react', async () => {
  const actual = jest.requireActual('@reduxjs/toolkit/query/react');

  return ({
    ...actual,
    createApi: () => ({
      reducerPath: 'api',
      reducer: () => ({}),
      middleware: () => (next: any) => (action: any) => next(action),
      endpoints: {},
      useQuery: () => ({ data: {}, isLoading: false, error: null }),
      useLazyQuery: () => [() => { }, { data: {}, isLoading: false }],
    }),
    fetchBaseQuery: () => () => Promise.resolve({ data: {} }),
    useLazyQuery: () => [() => { }, { data: {}, isLoading: false }],
    useQuery: () => ({ data: {}, isLoading: false, error: null }),
  })
});

jest.mock('./features/weather/api/index', () => ({
  useGetSuggestionsQuery: () => ({ data: ['London', 'Lisbon'] }),
  useGetWeatherQuery: () => ({ data: {} }),
}))

