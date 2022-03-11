// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 📜 https://mswjs.io/ for info on setupServer
// use all handlers from shared file
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

// reset in case you overwrote the server in one of the tests
afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // spinner has an aria-label of "loading" for accessibility purposes, so
  // we can wait for it to be removed to know it is done loading
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // assert that the username is on the screen
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`omitting password results in an error`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  // dont fill in password
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // start with empty toMatchInlineSnapshot() and it will fill with what should be there
  // if it changes you just press 'u' when prompted during tests running
  // helps when you are looking at text that might change
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test('unknown server error displays the error message', async () => {
  const testErrorMessage = 'Oh no something bad happened'
  // make the server return an error instead
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: testErrorMessage}))
      },
    ),
  )

  render(<Login />)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // not dependent on the code, message was defined here so we can use toHaveTextContent
  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
