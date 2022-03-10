// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// make sure test page is clear before each test
beforeEach(() => {
  document.body.innerHTML = ""
})

test('counter increments and decrements when the buttons are clicked', () => {
  // render component
  const div = document.createElement('div')
  document.body.append(div)

  ReactDOM.render(<Counter />, div)
  // console.log(document.body.innerHTML)

  // find element
  const message = div.firstChild.querySelector('div')
  // console.log(message.textContent)
  
  // verify text
  expect(message.textContent).toBe("Current count: 0")

  // desctructure decrement is the first button
  const [decrement, increment] = div.querySelectorAll("button")
  increment.click()
  expect(message.textContent).toBe("Current count: 1")

  decrement.click()
  expect(message.textContent).toBe("Current count: 0")
})
