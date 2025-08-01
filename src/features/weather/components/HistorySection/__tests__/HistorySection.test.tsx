import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HistorySection from '../index';

describe('HistorySection', () => {
  const mockHistory = ['Paris', 'Berlin', 'London'];
  const mockOnCitySelect = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnUndo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders history items and calls onCitySelect', () => {
    render(
      <HistorySection
        history={mockHistory}
        deletedItem={null}
        onCitySelect={mockOnCitySelect}
        onDelete={mockOnDelete}
        onUndo={mockOnUndo}
      />
    );

    expect(screen.getByTestId('history-section')).toBeInTheDocument();

    mockHistory.forEach((city) => {
      const cityBtn = screen.getByTestId(`history-${city}`);
      expect(cityBtn).toBeInTheDocument();

      fireEvent.click(cityBtn);
      expect(mockOnCitySelect).toHaveBeenCalledWith(city);
    });
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <HistorySection
        history={mockHistory}
        deletedItem={null}
        onCitySelect={mockOnCitySelect}
        onDelete={mockOnDelete}
        onUndo={mockOnUndo}
      />
    );

    const deleteBtn = screen.getByTestId(`delete-Paris`);
    fireEvent.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledWith('Paris');
  });

  test('renders undo button when deletedItem exists and triggers onUndo', () => {
    render(
      <HistorySection
        history={mockHistory}
        deletedItem="Berlin"
        onCitySelect={mockOnCitySelect}
        onDelete={mockOnDelete}
        onUndo={mockOnUndo}
      />
    );

    const undoBtn = screen.getByTestId('undo-button');
    expect(undoBtn).toBeInTheDocument();

    fireEvent.click(undoBtn);
    expect(mockOnUndo).toHaveBeenCalled();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <HistorySection
        history={mockHistory}
        deletedItem="Berlin"
        onCitySelect={mockOnCitySelect}
        onDelete={mockOnDelete}
        onUndo={mockOnUndo}
      />
    );;
    expect(asFragment()).toMatchSnapshot();
  });
});
