// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// can use this pattern for any providers
// options alllows you to send somthing other than theme to forward onto the ThemeProvider
function renderWithTheme(ui, {theme='light', ...options} = {}) {
  const Wrapper = ({children}) => {
    return (
      <ThemeProvider initialTheme={theme}>
        {children}
      </ThemeProvider>
    )
  }
  // render takes 2 args, the component and options
  return render(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {

  renderWithTheme(<EasyButton>Easy</EasyButton>)
  
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  
})

test('renders with the dark styles for the dark theme', () => {
  renderWithTheme(
    <EasyButton>Easy</EasyButton>, 
    {theme: 'dark'}
  )
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
  
})
