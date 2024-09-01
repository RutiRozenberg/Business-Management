import { MenuItem, Tooltip, Button, Avatar, Container, Menu, Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const pages = [{ text: 'Services', url: '/services' }, { text: 'Meetings', url: '/meetings' }];
const settings = [{ text: 'profile', url: '/' }, { text: 'Logout', url: '/' }];

export default function ResponsiveAppBar() {

  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

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

  const handleCloseUserMenu = (url: string) => {
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
            <CameraEnhanceRoundedIcon
              sx=
              {{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                fontSize: 30,
              }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontSize: 30,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'default',
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                color: theme.palette.primary.dark
              }}
            >
              Racheli
            </Typography>

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
            <CameraEnhanceRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'default',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Racheli
            </Typography>
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={() => handleCloseUserMenu(setting.url)}>
                    <Typography textAlign="center">{setting.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}