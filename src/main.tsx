import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import "./style.css";
import { theme } from "./styles/theme";
import Layout from "./layout";
import { CandyMap, MtRushmoreNight } from "./visualizations";
import { Home } from "./components/home/home";
import { TrophyCase } from "./visualizations/celtics-championships";
import { BostonChampionships } from "./visualizations/boston-championships";
import { PeriodicTable } from "./visualizations/periodic-table";
import { Cocktails } from "./visualizations/cocktails";
import { Coffee } from "./visualizations/coffee";
import { GroundHogMap } from "./visualizations/groundhogs/groundhog-map";
import { NBASalaries } from "./visualizations/nba-salaries/nba-salaries";
import { MusicRevenues } from "./visualizations/music-revenues/music-revenues";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/candy-map", element: <CandyMap /> },
      { path: "/mt-range", element: <MtRushmoreNight /> },
      { path: "/periodic-table", element: <PeriodicTable /> },
      { path: "/celtics-trophy-case", element: <TrophyCase /> },

      //
      { path: "/groundhogs", element: <GroundHogMap /> },
      { path: "/nba-salaries", element: <NBASalaries /> },
      { path: "/music-revenues", element: <MusicRevenues /> },

      // not finished
      { path: "/boston-championships", element: <BostonChampionships /> },

      { path: "/coffee", element: <Coffee /> },
      { path: "/cocktails", element: <Cocktails /> },
      { path: "/oscar-winners", element: <></> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
