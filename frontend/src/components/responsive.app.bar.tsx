import { MenuItem, Tooltip, Button, Avatar, Container, Menu, Box, AppBar, Toolbar, IconButton, Typography, useTheme, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUser } from '../store/features/user.slice';
import { fetchAdmin } from '../store/features/admin.slice';
import CssBaseline from '@mui/material/CssBaseline';
import ListDrawer from './utils.components/list.drawer';


interface ResponsiveAppBarProps {
  pages: ResponsiveAppBarObjectProps[];
  isAdmin: boolean;
}

export interface ResponsiveAppBarObjectProps {
  text: string;
  url: string;
  subNav?: ResponsiveAppBarObjectProps[];
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ pages, isAdmin }) => {

  const drawerWidth = 240;

  const signOut = () => {
    sessionStorage.removeItem('token');
    setIsSignOut(true);
  }

  const profile = [{ text: 'Sign Out', url: '/', callback: signOut }];

  const theme = useTheme();
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isSignOut, setIsSignOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(true); 
  const [openSubNav, setOpenSubNav] = useState<string | null>(null);


  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
    setOpenSubNav(null);
  };


  const handleDrawerToggle = () => {
    console.log(isClosing, mobileOpen)
    if (isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };


  const handleDrawerTransitionEnd = () => {
    setIsClosing(true);
    setOpenSubNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: ResponsiveAppBarObjectProps) => {
    if (page.subNav && mobileOpen) {
      handleSubNavToggle(page.text);
    } else {
      handleDrawerClose();
      navigate(page.url);
    }

  };

  const handleCloseUserMenu = (url: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    setAnchorElUser(null);
    navigate(url);
  };

  const handleSubNavToggle = (text: string) => {
    setOpenSubNav(openSubNav === text ? null : text);
  };

  useEffect(() => {
    (dispatch(fetchUser()));
    (dispatch(fetchAdmin()));
  }, [dispatch, isSignOut]);


  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        component="div"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <ListDrawer pages={pages} handleCloseNavMenu={handleCloseNavMenu}/>
              </Drawer>

            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => handleCloseNavMenu(page)}
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

            {isAdmin ? <Typography>Admin</Typography>
              : <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open profile">
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

                  {user ? profile.map((setting, index) => (
                    <MenuItem key={index} onClick={() => handleCloseUserMenu(setting.url, setting.callback)}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </MenuItem>
                  )) : <MenuItem key={1} onClick={() => handleCloseUserMenu('login')}>
                    <Typography textAlign="center">Sign In</Typography>
                  </MenuItem>}
                </Menu>
              </Box>}

          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Toolbar />
        <Outlet />
      </Box>

    </>
  );
}

export default ResponsiveAppBar;
