import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import CarouselNavigator from './CarouselNavigator'

let unmount: RenderResult['unmount'],
  rerender: RenderResult['rerender']
const handleNavigate = jest.fn()
beforeEach(() => {
  const result = render(
    <CarouselNavigator
      navigators={['next', 'previous']}
      onNavigate={handleNavigate}/>
  );
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('CarouselNavigator component', () => {
  test('Should set navigators', () => {
    expect(screen.getByTestId('buttonPrevious')).toBeVisible()
    rerender(
      <CarouselNavigator
      navigators={['next']}
      onNavigate={handleNavigate}/>
    )
    expect(screen.getByTestId('buttonNext')).toBeVisible()
    expect(screen.queryByTestId('buttonPrevious')).toBeNull()
    rerender(
      <CarouselNavigator
      navigators={['previous']}
      onNavigate={handleNavigate}/>
    )
    expect(screen.queryByTestId('buttonNext')).toBeNull()
    expect(screen.getByTestId('buttonPrevious')).toBeVisible()
  })

  test('Should handle onNavigate', () => {
    fireEvent.click(screen.getByTestId('buttonNext'))
    fireEvent.click(screen.getByTestId('buttonPrevious'))
    expect(handleNavigate).toBeCalledTimes(2)
  })
})
