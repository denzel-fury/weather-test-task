import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/slice';
import { weatherApi } from '../features/weather/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['weather'],
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(weatherApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
