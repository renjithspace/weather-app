// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import '@testing-library/jest-dom'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve('../.env.test.local') })
jest.mock('react-chartjs-2', () => ({ Bar: () => null }))
