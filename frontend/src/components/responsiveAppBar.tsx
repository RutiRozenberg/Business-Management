import { MenuItem, Tooltip, Button, Avatar, Container, Menu, Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUser } from '../store/features/user.slice';


const ResponsiveAppBar = () => {

  const signOut = () => {
    sessionStorage.removeItem('token');
    setIsSignOut(true);
  }

  const pages = [{ text: 'Home', url: '/' },{ text: 'Services', url: '/services' }, { text: 'Meetings', url: '/meetings' }];
  const settings = [{ text: 'profile', url: '/', callback: undefined }, { text: 'Sign Out', url: '/', callback: signOut }];

  const theme = useTheme();
  const user = useAppSelector(state => state.user.user );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isSignOut, setIsSignOut] = useState(false);

  useEffect(()=>{
    (dispatch(fetchUser()));
  },[dispatch , isSignOut]);

 
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const handleCloseUserMenu = (url: string , callback?: () => void) => {
    if(callback){
      callback();
    }
    setAnchorElUser(null);
    navigate(url);
  };

  return (
    <>
      <AppBar
        position="static"
        component="div"
        sx={{
          color: theme.palette.primary.dark,
          backgroundColor: 'white',
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="Open Navigation Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.text} onClick={() => handleCloseNavMenu(page.url)} >
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => handleCloseNavMenu(page.url)}
                  sx=
                  {{
                    my: 2,
                    display: 'block',
                    fontWeight: 500,
                    color: theme.palette.primary.dark
                  }}
                >
                  {page.text}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      p: 0,
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.light,
                    }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={(event, reason) => {
                  if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    setAnchorElUser(null);
                  }
                }}
              >
              { user? settings.map((setting, index) => (
                  <MenuItem key={index} onClick={() => handleCloseUserMenu(setting.url , setting.callback)}>
                    <Typography textAlign="center">{setting.text}</Typography>
                  </MenuItem>
                )) : <MenuItem key={1} onClick={() => handleCloseUserMenu('login') }>
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem> }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default ResponsiveAppBar;
