// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../../components/counter'

// React Testing Library does this automatically! So we dont need this anymore!
// beforeEach(() => {
//   document.body.innerHTML = ''
// })

test('counter increments and decrements when the buttons are clicked', () => {

  // render is a built in react-testing-library funciton that returns a container div with the component
  const {container} = render(<Counter />)

  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  // fireEvent has lots of options to choose from besides click
  fireEvent.click(increment)
  expect(message.textContent).toBe('Current count: 1')

  fireEvent.click(decrement)
  expect(message.textContent).toBe('Current count: 0')
})
