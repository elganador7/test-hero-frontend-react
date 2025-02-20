import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import styles from "./Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeStore } from '../../App';

export interface HeaderProps {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setIsDrawerOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const { mode, toggleMode } = useThemeStore();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut();
    setIsDrawerOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '33%' }}>
            {isAuthenticated && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          <Box sx={{ 
            width: '34%',
            display: 'flex', 
            justifyContent: 'center'
          }}>
            <Typography
              variant="h6"
              className={styles.title}
              onClick={() => navigate("/")}
            >
              TestScoreHero
            </Typography>
          </Box>

          <Box sx={{ 
            width: '33%',
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 1
          }}>
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
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
