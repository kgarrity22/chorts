import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { VizCard } from "./components/project-card";
// darkest to lightest
const darkScheme = {
  dark: "#0d1321",
  "dark-2": "#1d2d44",
  medium: "#3e5c76",
  "light-2": "#748cab",
  light: "#f0ebd8",
};
// TODO: image grid of all the visuals to demo
export const Home = () => {
  const projects = [
    {
      name: "Halloween Candy Map",
      url: "/candy-map",
      img: "halloween-candy.png",
      isComingSoon: false,
    },
    {
      name: "Mt. Rushmore At Night",
      url: "/mt-range",
      img: "mt-range-at-night.png",
      isComingSoon: false,
    },
    {
      name: "Periodic Table",
      url: "/periodic-table",
      img: "periodic-table.png",
      isComingSoon: false,
    },
    {
      name: "Presidential Ages",
      url: "https://observablehq.com/d/3cfb3567c7ba0445",
      img: "presidential-ages.png",
      isComingSoon: false,
    },
    {
      name: "World Network Graph",
      url: "https://observablehq.com/d/5bf60404d3219afa",
      img: "world-network-graph.png",
      isComingSoon: false,
    },
    {
      name: "Market Cap by Sector",
      url: "https://observablehq.com/d/f65c0eaac01cbc84",
      img: "market-cap-treemap.png",
      isComingSoon: false,
    },
    {
      name: "U.S. Presidents",
      url: "https://observablehq.com/@kgarrityviz/us-presidents",
      img: "presidents-zoomable.png",
      isComingSoon: false,
    },
    {
      name: "History of the Costco Hotdog",
      url: "https://observablehq.com/d/0084e695ae0f64b5",
      img: "costco-hotdog.png",
      isComingSoon: false,
    },
    /////////////////////////////////////
    {
      name: "Celtics Trophy Case",
      url: "/celtics-trophy-case",
      img: "",
      isComingSoon: false,
    },
    //
    {
      name: "Oscar Winners",
      url: "/oscar-winners",
      img: "",
      isComingSoon: true,
    },
    {
      name: "Boston Championships",
      url: "/boston-championships",
      img: "",
      isComingSoon: true,
    },
    { name: "Coffee", url: "/coffee", img: "", isComingSoon: true },
    // { name: "Cocktails", url: "/cocktails", img: "", isComingSoon: true },
    { name: "NBA Salaries", url: "/nba-salaries", img: "", isComingSoon: true },
  ];
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        margin: theme.spacing(12),
        mt: theme.spacing(5),
        mb: theme.spacing(100),
      }}
    >
      <Box
        sx={{
          mb: theme.spacing(10),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: theme.spacing(2),
            fontWeight: 900,
            color: darkScheme["medium"],
            fontFamily: "Figtree",
          }}
        >
          Viz Library
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ml: theme.spacing(2),
            color: darkScheme["light"],
          }}
        >
          Gonna put a little description of what this is about down here
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {projects.map((p) => (
          <Grid key={p.name} size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
            <VizCard name={p.name} url={p.url} img={p.img} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
