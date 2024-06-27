// CategoryTextSlider.test.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import CategoryTextSlider from '../home/CategoryTextSlider' // Upewnij się, że ścieżka jest poprawna
import { Category } from '@/utils/types' // Importuj typ Category jeśli jest używany w testach
import { Colors } from '@/constants/Colors'

// Mock funkcji selectCategory
const mockSelectCategory = jest.fn()

describe('CategoryTextSlider', () => {
  beforeEach(() => {
    mockSelectCategory.mockClear() // Czyści poprzednie wywołania mocka przed każdym testem
  })

  it('should render all categories', () => {
    const { getByText } = render(
      <CategoryTextSlider selectCategory={mockSelectCategory} />
    )

    expect(getByText('Latest')).toBeTruthy()
    expect(getByText('World')).toBeTruthy()
    expect(getByText('Sport')).toBeTruthy()
    expect(getByText('Finance')).toBeTruthy()
    expect(getByText('Politics')).toBeTruthy()
    expect(getByText('Culture')).toBeTruthy()
  })

  it('should call selectCategory with the correct category on press', () => {
    const { getByText } = render(
      <CategoryTextSlider selectCategory={mockSelectCategory} />
    )

    fireEvent.press(getByText('World')) // Symulowanie kliknięcia na "World"

    expect(mockSelectCategory).toHaveBeenCalledWith('World')
  })

it('should update the active category when a new category is pressed', () => {
  const mockSelectCategory = jest.fn()

  const { getByText, queryByText } = render(
    <CategoryTextSlider selectCategory={mockSelectCategory} />
  )

  // Sprawdź, czy początkowa kategoria jest oznaczona jako aktywna
  const initialActiveText = getByText('Latest')
  expect(initialActiveText.props.style).toEqual({
    marginRight: 15,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.primary, // Oczekiwany kolor aktywnej kategorii
  })

  // Kliknij nową kategorię
  fireEvent.press(getByText('World'))

  // Sprawdź, czy nowa kategoria jest oznaczona jako aktywna
  const newActiveText = getByText('World')
  expect(newActiveText.props.style).toEqual({
    marginRight: 15,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.primary, // Oczekiwany kolor aktywnej kategorii
  })

  // Sprawdź, czy poprzednia kategoria jest oznaczona jako nieaktywna
  const previousActiveText = queryByText('Latest')
  expect(previousActiveText?.props.style).toEqual({
    marginRight: 15,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.gray, // Oczekiwany kolor nieaktywnej kategorii
  })

  // Upewnij się, że funkcja `selectCategory` została wywołana z odpowiednim argumentem
  expect(mockSelectCategory).toHaveBeenCalledWith('World')
})
})
