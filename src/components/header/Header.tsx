import { AppBar, Link, IconButton, Toolbar, Typography, Button } from '@mui/material';
import styles from "./Header.module.scss"
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LogoutIcon from '@mui/icons-material/Logout';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export const Header: React.FC = () => {
    const navigate  = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut()

    const handleLogin = () => {
      navigate('/login');
    };

    const handleLogout = () => {
      signOut();
      navigate('/');
    }
    
    const handlePractice = () => {
      navigate('/randomQuestion');
    };

      
    return(
        <AppBar position="static">
          <Toolbar>
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