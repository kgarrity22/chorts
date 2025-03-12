import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { VizCard } from "../project-card";
import { Particles } from "../particles/particles";
import { projects } from "./constants";
// darkest to lightest
const darkScheme = {
  dark: "#0d1321",
  "dark-2": "#1d2d44",
  medium: "#3e5c76",
  "light-2": "#748cab",
  light: "#f0ebd8",
};

export const Home = () => {
  const theme = useTheme();
  return (
    <Box>
      <Particles />
      <Box
        sx={{
          margin: theme.spacing(8),
          mt: theme.spacing(5),
          mb: theme.spacing(10),
        }}
      >
        <Box
          sx={{
            mb: theme.spacing(10),
            display: "flex",
            justifyContent: "center",
            mt: theme.spacing(15),
          }}
        >
          <Box maxWidth={550}>
            <Typography
              variant="h2"
              sx={{
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
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(180deg, var(--color-neutral-300) 5%, transparent 40%, transparent 60%, var(--color-neutral-300) 95%)",
          }}
        >
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
    </Box>
  );
};
