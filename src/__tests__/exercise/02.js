// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
// dont need this import in each file becuase its in jest.config.js OR add to setupTests.js file for create react apps
// import '@testing-library/jest-dom/extend-expect'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {

  // render is a built in react-testing-library funciton that returns a container div with the component
  const {container} = render(<Counter />)

  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')
  // best to use jest dom assertions > checkout their docs for more options than 'toHaveTextContent'
  expect(message).toHaveTextContent('Current count: 0')

  // fireEvent has lots of options to choose from besides click
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
