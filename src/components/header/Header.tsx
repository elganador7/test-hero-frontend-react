import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import styles from "./Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export interface HeaderProps {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setIsDrawerOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

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
          {isAuthenticated && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            className={styles.title}
            onClick={() => navigate("/")}
          >
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
          <Button
            component={Link}
            to="/settings"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            Settings
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
