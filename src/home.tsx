import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { VizCard } from "./components/project-card";
import { Particles } from "./components/particles/particles";
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
      description: "",
      isComingSoon: false,
    },
    {
      name: "Mt. Rushmore At Night",
      url: "/mt-range",
      img: "mt-range-at-night.png",
      description: "",
      isComingSoon: false,
    },
    {
      name: "Periodic Table",
      url: "/periodic-table",
      img: "periodic-table.png",
      description: "",
      isComingSoon: false,
    },
    {
      name: "Presidential Ages",
      url: "https://observablehq.com/d/3cfb3567c7ba0445",
      img: "presidential-ages.png",
      description: "",
      isComingSoon: false,
    },
    {
      name: "World Network Graph",
      url: "https://observablehq.com/d/5bf60404d3219afa",
      img: "world-network-graph.png",
      description: "",
      isComingSoon: false,
    },
    {
      name: "Market Cap by Sector",
      url: "https://observablehq.com/d/f65c0eaac01cbc84",
      img: "market-cap-treemap.png",
      description: "",
      isComingSoon: false,
    },
    {
      name: "U.S. Presidents",
      url: "https://observablehq.com/@kgarrityviz/us-presidents",
      img: "presidents-zoomable.png",
      description: "",
      isComingSoon: false,
    },
    {
      name: "History of the Costco Hotdog",
      url: "https://observablehq.com/d/0084e695ae0f64b5",
      img: "costco-hotdog.png",
      description: "",
      isComingSoon: false,
    },
    /////////////////////////////////////
    {
      name: "Celtics Trophy Case",
      url: "/celtics-trophy-case",
      img: "celtics-banners.png",
      description: "",
      isComingSoon: false,
    },
    //
    {
      name: "Oscar Winners",
      url: "https://observablehq.com/d/3bc3052e763266c5",
      img: "/oscars-tree.png",
      description: "",
      isComingSoon: true,
    },
    // {
    //   name: "Boston Championships",
    //   url: "/boston-championships",
    //   img: "",
    //   isComingSoon: true,
    // },
    // { name: "Coffee", url: "/coffee", img: "", isComingSoon: true },
    // { name: "Cocktails", url: "/cocktails", img: "", isComingSoon: true },
    // { name: "NBA Salaries", url: "/nba-salaries", img: "", isComingSoon: true },
  ];
  const theme = useTheme();
  return (
    <Box>
      <Particles />
      <Box
        sx={{
          margin: theme.spacing(12),
          mt: theme.spacing(5),
          mb: theme.spacing(10),
        }}
      >
        <Box
          sx={{
            mb: theme.spacing(10),
            display: "flex",
            justifyContent: "center",
            position: "sticky",
            top: theme.spacing(1),
          }}
        >
          <Box maxWidth={550}>
            <Typography
              variant="h2"
              sx={{
                mt: theme.spacing(15),
                mb: theme.spacing(2),
                fontWeight: 900,
                fontSize: 70,
                color: "#99b5f3", // light blue
                fontFamily: "Figtree",
                textAlign: "center",
              }}
            >
              Viz Gallery
            </Typography>
            <Typography
              variant="body2"
              sx={{
                ml: theme.spacing(2),
                color: darkScheme["light"],
                textAlign: "center",
              }}
            >
              These are a few collected vizualiztions I have created mostly with
              D3, Vega and Vega-Lite. Some are built directly into this app
              while others are hosted on the platform Observable. Click on any
              of the items below to explore the visualization live.
            </Typography>
          </Box>
        </Box>
        {/** want to create a fade into blur effect here */}
        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid key={p.name} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <VizCard
                name={p.name}
                url={p.url}
                img={p.img}
                description={p.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
