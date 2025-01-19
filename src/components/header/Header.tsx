import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Report from "@mui/icons-material/Report";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useState } from "react";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut();
    setIsDrawerOpen(false);
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    setIsDrawerOpen(false);
    navigate(path);
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
              onClick={() => setIsDrawerOpen(prev => !prev)}
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
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: 8,
          }}
        >
          <List>
            <ListItemButton onClick={() => handleNavigate("/randomQuestion")}>
              <ListItemIcon>
                <ArrowForward />
              </ListItemIcon>
              <ListItemText primary="Practice Now" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigate("/userPerformance")}>
              <ListItemIcon>
                <Report />
              </ListItemIcon>
              <ListItemText primary="Your Performance" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
