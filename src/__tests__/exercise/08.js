// testing custom hooks
// should just test the component that uses the hook instead of testing the custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

// create setup function to avoid duplication
function setup({initialProps} = {}) {
  // get access to everything userCounter() returns
  const result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  
  render(<TestComponent />)
  return result
}

// testing without interacting with the DOM
// helpful if you cant create a test component that uses it
test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  // need to use result.current because of binding and this result does not update when the component rerenders
  expect(result.current.count).toBe(0)

  // act flushes the DOM after updates
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 2}})

  expect(result.current.count).toBe(2)

  // act flushes the DOM after updates
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}})

  expect(result.current.count).toBe(0)

  // act flushes the DOM after updates
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})