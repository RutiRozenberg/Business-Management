import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material';
import UserAppBar from './userAppBar.component';
import Services from './pages/service.page/services.component';
import Meetings from './pages/meeting.page/meetings.component';
import NotLogin from './pages/notLogin.page/notLogin.component';
import NotFound from './pages/notfound.page/notfound.component';
import Login from './pages/login.page/login.component';
import MainAdmin from './pages/admin.pages/main.admin/main.admin';
import BusinessAdmin from './pages/admin.pages/business.page/business.admin.component';
import ServicesAdmin from './pages/admin.pages/servises.admin.page/services.admin.component';
import MeetingsAdmin from './pages/admin.pages/meetings.admin.page/meetings.admin.component';
import AdminLogin from './pages/admin.pages/login.admin.page/login.admin.component';
import Home from './pages/home.page/home.component';


const AppRoutes = () => {
    return(
        <Routes>

        <Route path='' element={<UserAppBar />} >
          <Route index element={<Home />} />
          <Route path='services' element={<Services />} />
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
    )
};

export default AppRoutes;