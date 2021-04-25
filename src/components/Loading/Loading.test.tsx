import React from 'react'
import { RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import Loading from './Loading'

let unmount: RenderResult['unmount']
beforeEach(() => {
  const result = render(<Loading/>);
  ({ unmount } = result)
})
afterEach(() => unmount())

describe('Loading component', () => {
  test('Should render with loading content', () => {
    expect(screen.getByAltText('Four bubbles bouncing')).toBeVisible()
    expect(screen.getByText('Loading...')).toBeVisible()
    expect(screen.getByText(/Please wait./)).toBeVisible()
  })
})
