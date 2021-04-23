import React, { Fragment } from 'react'
import { screen, RenderResult } from '@testing-library/react'
import { render } from '../../test-utils'
import StateService from '../../services/State.service'

let unmount: RenderResult['unmount']
beforeEach(() => {
  const result = render(<Fragment/>);
  ({ unmount } = result)
})
afterEach(() => unmount())

describe('Alert component', () => {
  test('Should update visibility when has message', () => {
    const message = 'Test message'
    StateService.replaceAlertMessage(message)
    expect(screen.getByText(message)).toBeVisible()
    StateService.replaceAlertMessage('')
    expect(screen.queryByText(message)).toBeNull()
  })
})
