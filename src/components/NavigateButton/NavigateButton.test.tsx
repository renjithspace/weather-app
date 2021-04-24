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
      visibility={true}
      direction="next"
      onNavigate={handleNavigate}/>
  );
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('NavigateButton component', () => {
  test('Should set visiblity', () => {
    expect(screen.getByTestId('buttonNext')).toBeVisible()
    rerender(
      <NavigateButton
        visibility={false}
        direction="next"
        onNavigate={handleNavigate}/>
    )
    expect(screen.queryByTestId('buttonNext')).toBeNull()
  })

  test('Should set direction', () => {
    rerender(
      <NavigateButton
        visibility={true}
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
