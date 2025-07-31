import React from 'react';
import WeatherFeature from './features/weather'
import './App.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WeatherFeature />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
