// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import { fake } from 'faker'

// set window.navigator.geolocation to an object that has a getCurrentPosition mock function
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn()
  }
})

// this util allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {

  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139
    }
  }
  const {promise, resolve} = deferred();
  // Mock the geolocation's getCurrentPosition function and return expected data
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => { 
      promise.then(() => callback(fakePosition))
    }
  )

  render(<Location />)
  // confirm loading shows after render
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  
  // resolve and wait for promise to resolve to mock the getCurrentPosition call
  // make the act warning go away
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  // clear all side effects when you call a function that updates the dom
  await act(async () => {
    resolve()
    await promise
  })

  // getByLabelText throws if not found so use query here instead for not testing
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument() 
  
  // check latitude and longitude fields
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)

})
