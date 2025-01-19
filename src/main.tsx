import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import "./style.css";
import { theme } from "./styles/theme";
import Layout from "./layout";
import { CandyMap, MtRushmoreNight } from "./visualizations";
import { Home } from "./home";
import { TrophyCase } from "./visualizations/celtics-championships";
import { BostonChampionships } from "./visualizations/boston-championships";
import { PeriodicTable } from "./visualizations/periodic-table";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/candy-map", element: <CandyMap /> },
      { path: "/mt-rushmore", element: <MtRushmoreNight /> },
      // two new ones

      { path: "/celtics-trophy-case", element: <TrophyCase /> },
      { path: "/periodic-table", element: <PeriodicTable /> },
      // not finished
      { path: "/boston-championships", element: <BostonChampionships /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
