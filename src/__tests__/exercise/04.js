// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  // see what the component looks like:
  // screen.debug()

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)
  // use variables here so they can be used for setting and in the assertion
  const username = 'fakeusername123'
  const password = 'bestpasswordever'
  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)

  expect(handleSubmit).toBeCalledWith({
    username,
    password
  })
})
