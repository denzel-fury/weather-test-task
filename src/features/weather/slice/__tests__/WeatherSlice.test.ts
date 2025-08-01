import weatherReducer, {
  addCityToHistory,
  removeCityFromHistory,
  undoDelete,
} from '../index';

describe('weatherSlice', () => {
  const initialState = {
    history: [],
    deletedItem: null,
  };

  test('should return the initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('addCityToHistory should add city if not already in history', () => {
    const action = addCityToHistory('London');
    const result = weatherReducer(initialState, action);

    expect(result.history).toEqual(['London']);
  });

  test('addCityToHistory should not add duplicate cities', () => {
    const state = { ...initialState, history: ['London'] };
    const action = addCityToHistory('London');
    const result = weatherReducer(state, action);

    expect(result.history).toEqual(['London']); // no duplicate
  });

  test('removeCityFromHistory should remove city and set deletedItem', () => {
    const state = { ...initialState, history: ['London', 'Paris'] };
    const action = removeCityFromHistory('London');
    const result = weatherReducer(state, action);

    expect(result.history).toEqual(['Paris']);
    expect(result.deletedItem).toBe('London');
  });

  test('undoDelete should restore deletedItem if not in history', () => {
    const state = {
      history: ['Paris'],
      deletedItem: 'London',
    };
    const result = weatherReducer(state, undoDelete());

    expect(result.history).toEqual(['London', 'Paris']);
    expect(result.deletedItem).toBe(null);
  });

  test('undoDelete should do nothing if deletedItem is already in history', () => {
    const state = {
      history: ['London', 'Paris'],
      deletedItem: 'London',
    };
    const result = weatherReducer(state, undoDelete());

    expect(result.history).toEqual(['London', 'Paris']);
    expect(result.deletedItem).toBe('London');
  });
});
