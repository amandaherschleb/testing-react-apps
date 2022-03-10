// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

// make reusable util to get login info
function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}

test('submitting the form calls onSubmit with username and password', () => {

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  // see what the component looks like:
  // screen.debug()
  
  const {username, password} = buildLoginForm()
  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)
  
  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)

  expect(handleSubmit).toBeCalledWith({
    username,
    password
  })

  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
