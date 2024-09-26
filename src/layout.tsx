import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <CssBaseline />
      <Outlet />
    </Box>
  );
}
