import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from 'uikit'

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({
  isDark: true,
  toggleTheme: () => null,
})

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return true
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={dark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
