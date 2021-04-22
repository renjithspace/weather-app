import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from './Loading'

let rerender: any, unmount: any
beforeEach(() => {
  const result = render(<Loading visibility={true} />);
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('Loading component', () => {
  test('Should update visibility', () => {
    expect(screen.queryByText('Loading...')).toBeVisible()
    rerender(<Loading visibility={false} />)
    expect(screen.queryByText('Loading...')).toBeNull()
  })
})
