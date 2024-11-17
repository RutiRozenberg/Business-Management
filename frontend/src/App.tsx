import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/pages/home.page/home.component'
import Services from './components/pages/service.page/services.component'
import ResponsiveAppBar from './components/responsiveAppBar'
import { ThemeProvider } from '@mui/material/styles';
import Meetings from './components/pages/meeting.page/meetings.component'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { theme } from './utils/style/themeObject'
import Login from './components/pages/login.page/login.component'



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
              </Route>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>

  )
}

export default App
