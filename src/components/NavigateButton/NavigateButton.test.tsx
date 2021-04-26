import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import NavigateButton from './NavigateButton'

let unmount: RenderResult['unmount'],
  rerender: RenderResult['rerender']
const handleNavigate = jest.fn()
beforeEach(() => {
  const result = render(
    <NavigateButton
      direction="next"
      onNavigate={handleNavigate}/>
  );
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('NavigateButton component', () => {
  test('Should set direction', () => {
    expect(screen.getByTestId('buttonNext')).toBeVisible()
    rerender(
      <NavigateButton
        direction="previous"
        onNavigate={handleNavigate}/>
    )
    expect(screen.getByTestId('buttonPrevious')).toBeVisible()
  })

  test('Should handle onNavigate', () => {
    fireEvent.click(screen.getByTestId('buttonNext'))
    expect(handleNavigate).toBeCalledTimes(1)
  })
})
