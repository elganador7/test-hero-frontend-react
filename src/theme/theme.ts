import { createTheme, PaletteOptions } from "@mui/material/styles";

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: "#0D3B66",
    light: "#1C5D8F",
    dark: "#092C4D",
  },
  secondary: {
    main: "#FAE1DD",
    light: "#FFF5F3",
    dark: "#F5C7C0",
  },
  background: {
    default: "#F9F9F9",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#2E2E2E",
    secondary: "#6B6B6B",
  },
  divider: "rgba(0, 0, 0, 0.12)",
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: "#4F8CC9",
    light: "#6FA4D6",
    dark: "#3B6A98",
  },
  secondary: {
    main: "#D4958C",
    light: "#E2B3AC",
    dark: "#B67A72",
  },
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B0B0",
  },
  divider: "rgba(255, 255, 255, 0.12)",
};

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: mode === 'light' ? lightPalette : darkPalette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      letterSpacing: "-0.00833em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      letterSpacing: "0.00735em",
    },
    body1: {
      fontSize: "1rem",
      letterSpacing: "0.00938em",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0 2px 12px rgba(0, 0, 0, 0.08)'
            : '0 2px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default getTheme; 