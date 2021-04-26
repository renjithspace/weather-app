import path from 'path'
import { ReactElement, FC } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import Provider from './components/Provider/Provider'
import dotenv from 'dotenv'

type Options = Omit<RenderOptions, 'queries'>

dotenv.config({ path: path.resolve('../.env.test.local') })

function customRender (ui: ReactElement, options?: Options) {
  return render(ui, { wrapper: Provider as FC, ...options })
}

export { customRender as render }
