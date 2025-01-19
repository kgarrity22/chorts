import { Box, List, ListItem, Typography } from "@mui/material";

// TODO: image grid of all the visuals to demo
export const Home = () => {
  const projects = [
    { name: "Halloween Candy Map", url: "/candy-map" },
    { name: "Mt. Rushmore At Night", url: "/mt-rushmore" },
    { name: "Periodic Table", url: "/periodic-table" },
    {
      name: "Presidential Ages",
      url: "https://observablehq.com/@kgarrityviz/presidential-age-ranges-compared-with-u-s-life-exp",
    },
    {
      name: "U.S. Presidents",
      url: "https://observablehq.com/@kgarrityviz/us-presidents",
    },
    {
      name: "Celtics Trophy Case",
      url: "/celtics-trophy-case",
    },
    //
    { name: "Boston Championships", url: "/boston-championships" },
    // { name: "", url: "" },
  ];
  return (
    <Box
      sx={{
        height: "100%",

        // background:
        //   "linear-gradient(301deg, rgba(15,5,167,1) 0%, rgba(172,0,198,1) 100%)",
        // color: "white",
      }}
    >
      <Typography variant="caption">
        A series of visualization projects
      </Typography>
      <List>
        {projects.map((p) => (
          <ListItem key={p.name}>
            <a href={p.url}>{p.name}</a>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
