import { ThemeOptions, createTheme } from "@mui/material";

// the old theme
export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#192a3e",
      light: "#9bb7da",
    },
    secondary: {
      main: "#a90ea5",
      light: "#ffdcfe26",
    },
    info: {
      main: "#7695d7",
      light: "#f4f8ff",
      dark: "#004FC4",
    },
    warning: {
      main: "#ffb427",
      dark: "#E57A00",
    },
    error: {
      main: "#ff372e",
      light: "#ff6666",
      dark: "#E53535",
    },
    success: {
      main: "#38983d",
      dark: "#05A660",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },

  typography: {
    h1: {
      fontFamily: "Inter",
      fontWeight: 200,
    },
    h2: {
      fontFamily: "Inter",
    },
    h3: {
      fontFamily: "Figtree",
      fontWeight: 200,
    },
    h4: {
      fontFamily: "Inter",
      fontWeight: 200,
    },
    h5: {
      fontFamily: "Figtree",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "Figtree",
      fontSize: 20,
      fontWeight: 600,
    },
    body1: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Figtree",
      fontSize: 16,
    },
    caption: {
      fontWeight: 700,
      fontFamily: "Figtree",
      fontSize: 14,
      color: "black",
    },
    button: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: 200,
      textTransform: "none",
    },
    fontFamily: "Inter",
  },

  spacing: 8,
  //   borderRadius: 45,
  shape: {
    borderRadius: 6,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export const theme = () => createTheme(themeOptions);
