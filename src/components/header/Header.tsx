import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import styles from "./Header.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeStore } from '../../App';
import { useQuery } from "@tanstack/react-query";
import { getTestTopics } from "../../services/api";
import FilterSelect from "../common/FilterSelect";
import { useSettingsStore } from "../../store/useSettingsStore";
import { useMemo } from "react";

export interface HeaderProps {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setIsDrawerOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const { mode, toggleMode } = useThemeStore();
  const { filters, setFilter, clearFilter } = useSettingsStore();

  const showFilters = location.pathname === '/practice';

  const { data: allTopics } = useQuery({
    queryKey: ["topics"],
    queryFn: getTestTopics,
    enabled: showFilters,
  });

  const testTypes = useMemo(() => {
    if (!allTopics) return [];
    return Array.from(new Set(allTopics.map(topic => topic.test_type)));
  }, [allTopics]);

  const availableSubjects = useMemo(() => {
    if (!allTopics || !filters.testType) return [];
    return Array.from(
      new Set(
        allTopics
          .filter(topic => topic.test_type === filters.testType)
          .map(topic => topic.subject)
      )
    );
  }, [allTopics, filters.testType]);

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    signOut();
    setIsDrawerOpen(false);
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar className={styles.toolbar}>
        {/* Left section */}
        <Box className={styles.leftSection}>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              className={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Center section - always centered */}
        <Box className={styles.centerSection}>
          <Typography
            variant="h6"
            className={styles.title}
            onClick={() => navigate("/")}
          >
            TestHero
          </Typography>
        </Box>

        {/* Filters section */}
        {isAuthenticated && showFilters && (
          <Box className={styles.filtersSection}>
            <FilterSelect
              placeholder="Choose test..."
              value={filters.testType}
              options={testTypes}
              onChange={(value) => {
                setFilter("testType", value as string);
                if (value !== filters.testType) {
                  clearFilter("subjects");
                }
              }}
              onClear={() => {
                clearFilter("testType");
                clearFilter("subjects");
              }}
              variant="small"
            />

            {filters.testType && (
              <FilterSelect
                placeholder="Choose subject..."
                value={filters.subjects}
                options={availableSubjects}
                onChange={(value) => setFilter("subjects", [value as string])}
                onClear={() => clearFilter("subjects")}
                variant="small"
              />
            )}
          </Box>
        )}

        {/* Right section */}
        <Box className={styles.rightSection}>
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
          <IconButton 
            color="inherit" 
            onClick={toggleMode}
            className={styles.themeToggle}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
