import { Box, Typography } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
// import data from "./data/revenue-data.csv";

export const MusicRevenues = () => {
  const spec = {
    data: {
      url: "data/revenue-data.csv",
      format: "",
    },
    transform: [
      { calculate: "+datum['Value (For Charting)']", as: "value" },
      { calculate: "+datum.Year", as: "year" },
      { calculate: "datum.Format", as: "name" },
      //   data.map(
      //     ({ Format, Year, ["Revenue (Inflation Adjusted)"]: Revenue }) => ({
      //       name: Format,
      //       year: +Year,
      //       value: +Revenue,
      //     })
      //   ),
    ],
    encoding: {
      color: { field: "name", legend: { offset: 80 } },
      x: { field: "Value (For Charting)", type: "quantitative" },
      y: {
        field: "name",
        type: "nominal",
        sort: { field: "Value (For Charting)", order: "descending" },
        axis: false,
      },
      //   time: {
      //     field: "Year",
      //     scale: {
      //       type: "band",
      //       // range: [0, 10000]
      //     },
      //     key: { field: "name" },
      //     rescale: true,
      //   },
    },
    params: [
      //   {
      //     name: "year",
      //     select: { type: "point", on: "timer" },
      //     bind: { input: "range", min: 1973, max: 2023, step: 1 },
      //   },
    ],
    layer: [{ mark: "bar" }],
  };
  return (
    <Box sx={{ color: "#fff" }}>
      <Typography variant="h2">Music Revenues by format</Typography>
      <Typography>
        Data Source: RIAA (https://www.riaa.com/u-s-sales-database/)
      </Typography>
      <Typography>Reimaging this chart as a racing bar chart</Typography>
      <BaseChart spec={spec} />
    </Box>
  );
};
