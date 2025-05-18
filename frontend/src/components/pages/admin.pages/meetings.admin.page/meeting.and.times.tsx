import { Drawer, Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { meetingPages } from '../../../admin.app.bar';
import ListDrawer from '../../../utils.components/list.drawer';
import { ResponsiveAppBarObjectProps } from '../../../responsive.app.bar';

  
const drawerWidth = 240;
  
const MeetingAndTimesDrawer: React.FC = () =>{


    const navigate = useNavigate();


    const handleNavigate = (page:ResponsiveAppBarObjectProps) => {
        navigate(page.url);
    }

    return (
        <Box>
            <Box
                sx={{ width: { sm: '100%', m: '20px' }}}
            >
                
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                  <ListDrawer pages={meetingPages} handleCloseNavMenu={handleNavigate}/>
                </Drawer>
            </Box>
            
            <Box>
                <Box sx={{display:{ xs: 'block', md: 'none' },}}>
                    <Outlet/>
                </Box> 
                <Box sx={{pl: '240px', display: { xs: 'none', md: 'block' },}}>
                    <Outlet/>
                 </Box>
            </Box>
        </Box>
    );
}

export default MeetingAndTimesDrawer;
