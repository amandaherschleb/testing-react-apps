// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
// import same as react component file
import { useCurrentPosition } from 'react-use-geolocation'
import Location from '../../examples/location'

// auto creates a jest mock funciton for all function exports
jest.mock('react-use-geolocation')

// set window.navigator.geolocation to an object that has a getCurrentPosition mock function
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn()
  }
})

test('displays the users current location', async () => {

  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139
    }
  }

  // mock implementation of setting state and returning the value
  let setReturnValue
  function useMockCurrentPosition() {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  // confirm loading shows after render
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  
  // update state 
  // make the act warning go away
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  // clear all side effects when you call a function that updates the dom
  act(() => {
    setReturnValue([fakePosition])
  })

  // getByLabelText throws if not found so use query here instead for not testing
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument() 
  
  // check latitude and longitude fields
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)

})
