
export interface WeatherState {
  history: string[];
  deletedItem: string | null;
}

export const initialState: WeatherState = {
  history: [],
  deletedItem: null,
};