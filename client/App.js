import React, { useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { ThemeProvider } from '@material-ui/styles'

import MainBrowserRouter from './ToLoad/MainBrowserRouter/'
import theme from './ToLoad/Theme/'


function App() {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainBrowserRouter/>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default hot(module)(App)
