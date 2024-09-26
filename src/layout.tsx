import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    // TODO: add anything we want for consistent styling
    <Box>
      <CssBaseline />
      <Outlet />
    </Box>
  );
}
