import { RootState } from '../../../store'

export const selectWeatherHistory = (state: RootState) => state.weather.history;
export const selectDeletedItem = (state: RootState) => state.weather.deletedItem;