import React from 'react'
import { screen, RenderResult } from '@testing-library/react'
import { render } from '../../test-utils'
import AlertService from '../../services/Alert.service'
import App from '../../App'

let unmount: RenderResult['unmount']
beforeEach(() => {
  const result = render(<App/>);
  ({ unmount } = result)
})
afterEach(() => unmount())

describe('Alert component', () => {
  test('Should visible when has message', () => {
    const message = 'Test message'
    AlertService.pushMessage(message)
    expect(screen.getByText(message)).toBeVisible()
    AlertService.clearMessage()
    expect(screen.queryByText(message)).toBeNull()
  })
})
