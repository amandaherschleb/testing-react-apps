// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
// fires all events associated with an interaction (ex: mouseDown, mouseUp, click, etc)
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  // get elements using screen queries
  // /name/i < make it case insensitive
  // now order of buttons can change
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')
  
  userEvent.click(increment)  
  expect(message).toHaveTextContent('Current count: 1')
  
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
