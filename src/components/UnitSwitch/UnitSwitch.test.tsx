import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import UnitSwitch from './UnitSwitch'

const handleChange = jest.fn()
let unmount: RenderResult['unmount'],
  rerender: RenderResult['rerender']
beforeEach(() => {
  const result = render(
    <UnitSwitch unit="fahrenheit" onChange={handleChange} />
  );
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('UnitSwitch component', () => {
  test('Should default unit radio active', () => {
    const radio = screen.getByTestId('fahrenheitUnit').querySelector('input')
    expect(radio).toBeChecked()
  })

  test('Should call change handler when choose', () => {
    fireEvent.click(screen.getByTestId('celsiusUnit'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('Should update checked when unit change', () => {
    rerender(<UnitSwitch unit="celsius" onChange={handleChange} />)
    const radio = screen.getByTestId('celsiusUnit').querySelector('input')
    expect(radio).toBeChecked()
  })
})
