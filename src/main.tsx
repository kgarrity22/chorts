import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import "./style.css";
import { theme } from "./styles/theme";
import Layout from "./layout";
import { CandyMap, MtRushmoreNight } from "./visualizations";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <></> },
      { path: "/home", element: <></> },
      { path: "/candy-map", element: <CandyMap /> },
      { path: "/mt-rushmore", element: <MtRushmoreNight /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
