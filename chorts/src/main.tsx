import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import "./style.css";
import { theme } from "./styles/theme";

const router = createBrowserRouter([
  {
    path: "",
    element: <></>,
    children: [
      { path: "/", element: <></> },
      { path: "/home", element: <></> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
