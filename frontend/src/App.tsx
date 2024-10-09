import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home.component'
import Services from './components/services.component'
import Signin from './components/signin.component'
import ResponsiveAppBar from './components/responsiveAppBar'
import {ThemeProvider } from '@mui/material/styles';
import Meetings from './components/meetings.component'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { theme } from './utils/style/themeObject'



function App() {

  return (

      <Provider store={store}>
        <BrowserRouter >
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<ResponsiveAppBar />} >
                <Route index element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path='/meetings' element={<Meetings />} />
                <Route path="/signin" element={<Signin />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>

  )
}

export default App
