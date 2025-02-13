import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { VizCard } from "./components/project-card";

// TODO: image grid of all the visuals to demo
export const Home = () => {
  const projects = [
    {
      name: "Halloween Candy Map",
      url: "/candy-map",
      img: "halloween-candy.png",
    },
    {
      name: "Mt. Rushmore At Night",
      url: "/mt-range",
      img: "mt-range-at-night.png",
    },
    {
      name: "Periodic Table",
      url: "/periodic-table",
      img: "periodic-table.png",
    },
    {
      name: "Presidential Ages",
      url: "https://observablehq.com/@kgarrityviz/presidential-age-ranges-compared-with-u-s-life-exp",
      img: "presidential-ages.png",
    },
    {
      name: "World Network Graph",
      url: "https://observablehq.com/@kgarrityviz",
      img: "world-network-graph.png",
    },
    {
      name: "Market Cap by Sector",
      url: "https://observablehq.com/@kgarrityviz/presidential-age-ranges-compared-with-u-s-life-exp",
      img: "market-cap-treemap.png",
    },
    /////////////////////////////////////
    {
      name: "U.S. Presidents",
      url: "https://observablehq.com/@kgarrityviz/us-presidents",
      img: "",
    },
    {
      name: "History of the Costco Hotdog",
      url: "https://observablehq.com/@kgarrityviz/presidential-age-ranges-compared-with-u-s-life-exp",
      img: "costco-hotdog.png",
    },
    {
      name: "Celtics Trophy Case",
      url: "/celtics-trophy-case",
      img: "",
    },
    {
      name: "Boston Championships",
      url: "/boston-championships",
      img: "",
    },
    { name: "Coffee", url: "/coffee", img: "" },
    { name: "Cocktails", url: "/cocktails", img: "" },
    { name: "NBA Salaries", url: "/nba-salaries", img: "" },
    { name: "Oscar Winners", url: "/oscar-winners", img: "" },
  ];
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        margin: theme.spacing(5),
      }}
    >
      <Typography variant="h2">A series of visualization projects</Typography>
      <Grid container spacing={4}>
        {projects.map((p) => (
          <Grid key={p.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <VizCard name={p.name} url={p.url} img={p.img} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
