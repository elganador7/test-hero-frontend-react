import { AppBar, Link, IconButton, Toolbar, Typography, Button } from '@mui/material';
import styles from "./Header.module.scss"
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const Header: React.FC = () => {
    const navigate  = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogin = () => {
      navigate('/login');
    };
    
    const handlePractice = () => {
      navigate('/randomQuestion');
    };

      
    return(
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }} className={styles.title}>
              TestHero
            </Typography>
            {!isLoggedIn ? (
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
              >
                Log In
              </Button>
            ) : (
              <Button
                color="inherit"
                startIcon={<PlayArrowIcon />}
                onClick={handlePractice}
              >
                Practice
              </Button>
            )}
          </Toolbar>
        </AppBar>
)

}