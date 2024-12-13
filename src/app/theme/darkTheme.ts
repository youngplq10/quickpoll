import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
      },
      secondary: {
        main: '#FFC107',
        light: '#FFD54F',
        dark: '#FFA000',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#BDBDBD',
        disabled: '#757575',
      },
      divider: '#424242',
      error: {
        main: '#F44336',
        light: '#E57373',
        dark: '#D32F2F',
      },
      success: {
        main: '#4CAF50',
      },
      warning: {
        main: '#FF9800',
      },
      info: {
        main: '#2196F3',
      },
    },
  });