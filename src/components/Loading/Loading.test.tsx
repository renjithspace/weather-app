import React from 'react'
import { RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import Loading from './Loading'

let rerender: RenderResult['rerender'],
  unmount: RenderResult['unmount']
beforeEach(() => {
  const result = render(<Loading visibility={true} />);
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('Loading component', () => {
  test('Should update visibility', () => {
    expect(screen.getByText('Loading...')).toBeVisible()
    rerender(<Loading visibility={false} />)
    expect(screen.queryByText('Loading...')).toBeNull()
  })
})
