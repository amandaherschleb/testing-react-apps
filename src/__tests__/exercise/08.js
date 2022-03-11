// testing custom hooks
// should just test the component that uses the hook instead of testing the custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

// testing without interacting with the DOM
// helpful if you cant create a test component that uses it
test('exposes the count and increment/decrement functions', () => {
  // get access to everything userCounter() returns
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }

  render(<TestComponent />)
  // console.log(result)

  expect(result.count).toBe(0)

  // act flushes the DOM after updates
  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})
