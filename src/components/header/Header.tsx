import { AppBar, Link, Menu, Toolbar, Typography, Button, Drawer } from '@mui/material'
import styles from "./Header.module.scss"
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu as MenuIcon, ArrowBack } from '@mui/icons-material';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useState } from 'react';

export const Header: React.FC = () => {
    const navigate  = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut()
    const [isMenuOpen, setIsMenuOpem] = useState(false);

    const handleLogin = () => {
      navigate('/login');
    };

    const handleLogout = () => {
      signOut();
      navigate('/');
    }

    const navigateToPerformance = ()=> {
      navigate('/userPerformance')
    }
      
    return(
        <AppBar position="static">
          <Toolbar>
          {!isAuthenticated && (
            <Menu
              open={isMenuOpen}
              // anchor="left"
            >
              <Button>
                Practice Now
              </Button>
              <Button
                color='inherit'
                startIcon={<ArrowBack/>}
                onClick={navigateToPerformance}
              >
                Your Performance
              </Button>
              <Button
                color='inherit'
                startIcon={<ArrowBack/>}
                onClick={() => setIsMenuOpem(false)}
              >
                Close
              </Button>
            </Menu>
          )}
          {!isAuthenticated && (
            <Button
                color="inherit"
                startIcon={<MenuIcon />}
                onClick={() => setIsMenuOpem(prev => !prev)}
            />
          )}
            <Typography variant="h6" sx={{ flexGrow: 1 }} className={styles.title} onClick={() => navigate('/')}>
              TestHero
            </Typography>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            ) : (
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
)

}