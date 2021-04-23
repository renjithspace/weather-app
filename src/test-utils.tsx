import { ReactElement, FC } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import Provider from './components/Provider/Provider'

type Options = Omit<RenderOptions, 'queries'>

function customRender (ui: ReactElement, options?: Options) {
  return render(ui, { wrapper: Provider as FC, ...options })
}

export { customRender as render }
