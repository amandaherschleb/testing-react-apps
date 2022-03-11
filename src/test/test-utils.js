// better to do all this importing and rendering in a shared util file
// since all components share the providers
import * as React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {ThemeProvider} from 'components/theme'

function render(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export {render}
