// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

// alternate way to setup reusable mock data
const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    passwored: fake(faker => faker.internet.password())
  }
})

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
