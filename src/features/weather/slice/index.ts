import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './types'

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCityToHistory(state, action: PayloadAction<string>) {
      if (!state.history.includes(action.payload)) {
        state.history.unshift(action.payload);
      }
    },
    removeCityFromHistory(state, action: PayloadAction<string>) {
      state.deletedItem = action.payload;
      state.history = state.history.filter((c) => c !== action.payload);
    },
    undoDelete(state) {
      if (state.deletedItem && !state.history.includes(state.deletedItem)) {
        state.history.unshift(state.deletedItem);
        state.deletedItem = null;
      }
    },
  },
});

export const { addCityToHistory, removeCityFromHistory, undoDelete } = weatherSlice.actions;

export default weatherSlice.reducer;
