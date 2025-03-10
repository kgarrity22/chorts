import { Box, Typography, useTheme } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { TopLevelSpec } from "vega-lite";
import nbaData from "./data/nba-top-24-25.json";
import wnbaData from "./data/wnba-top-24-25.json";

export const NBASalaries = () => {
  const theme = useTheme();
  const nbaSpec: TopLevelSpec = {
    background: "transparent",
    title: "Top NBA Salaries 24-25 Season",
    config: {
      axis: { labelColor: "#faf0ca" },
      title: { color: "#faf0ca" },
    },
    // color: "#fff",
    height: 400,
    width: 400,
    data: { values: nbaData.players.slice(0, 25) },
    encoding: {
      color: { field: "team", scale: { scheme: "plasma" } }, // todo:
      x: {
        field: "salary",
        type: "quantitative",
      },
      y: {
        field: "name",
        sort: "-x",
      },
      tooltip: [{ field: "name" }, { field: "team" }, { field: "salary" }],
    },
    params: [],
    mark: {
      type: "bar",
    },
  };

  const wnbaSpec: TopLevelSpec = {
    background: "transparent",
    title: "Top WNBA Salaries 24-25 Season",
    config: {
      axis: { labelColor: "#faf0ca" },
      title: { color: "#faf0ca" },
    },

    height: 400,
    width: 400,
    data: { values: wnbaData.players.slice(0, 25) },
    encoding: {
      color: { field: "team", scale: { scheme: "plasma" } }, // todo:
      x: {
        field: "salary",
        type: "quantitative",
      },
      y: {
        field: "name",
        sort: "-x",
      },
      tooltip: [{ field: "name" }, { field: "team" }, { field: "salary" }],
    },
    params: [],
    mark: {
      type: "bar",
    },
  };
  return (
    <Box
      sx={{
        background: "#0d3b66",
        color: "#faf0ca",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ m: theme.spacing(10) }}>
        <Typography variant="h2">NBA Salary Comparison</Typography>
        <BaseChart spec={nbaSpec} />
        <BaseChart spec={wnbaSpec} />
      </Box>
    </Box>
  );
};
