import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/pages/home.page/home.component'
import Services from './components/pages/service.page/services.component'
import { ThemeProvider } from '@mui/material/styles';
import Meetings from './components/pages/meeting.page/meetings.component'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { theme } from './utils/style/themeObject'
import Login from './components/pages/login.page/login.component'
import UserAppBar from './components/userAppBar.component'
import NotFound from './components/pages/notfound.page/notfound.component';
import NotLogin from './components/pages/notLogin.page/notLogin.component';
import { Box } from '@mui/material';
import BusinessAdmin from './components/pages/admin.pages/business.page/business.admin.component';
import ServicesAdmin from './components/pages/admin.pages/servises.admin.page/services.admin.component';
import MeetingsAdmin from './components/pages/admin.pages/meetings.admin.page/meetings.admin.component';
import MainAdmin from './components/pages/admin.pages/main.admin/main.admin';
import AdminLogin from './components/pages/admin.pages/login.admin.page/login.admin.component';


function App() {

  return (

      <Provider store={store}>
        <BrowserRouter >
          <ThemeProvider theme={theme}>
            <Routes>

              <Route path="" element={<UserAppBar />} >
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path='meetings' element={<Meetings />} />
                <Route path='notLogin' element={<NotLogin/>} />
                <Route path='*' element={<NotFound/>}/>
              </Route>

              <Route path='login' element={<Login/>}/>
              
              <Route path='admin' element={<MainAdmin/>}>
                <Route index element={<BusinessAdmin/>}/>
                <Route path='services' element={<ServicesAdmin />}/>
                <Route path='meetings' element={<MeetingsAdmin/>}/>
                <Route path='login' element={<AdminLogin/>}/>
                <Route path='*' element={<Box>Not found</Box>}/>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>

  )
}

export default App
