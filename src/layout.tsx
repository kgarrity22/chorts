import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

// darkest to lightest
const darkScheme = {
  dark: "#0d1321",
  "dark-2": "#1d2d44",
  medium: "#3e5c76",
  "light-2": "#748cab",
  light: "#f0ebd8",
};
export default function Layout() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        background: darkScheme["dark"],
        color: darkScheme["light-2"],
      }}
    >
      <CssBaseline />
      <Outlet />
    </Box>
  );
}
