import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { TopLevelSpec } from "vega-lite";

// bubbles that race over time showing climate
export const ClimateRacingBubbles = () => {
  const spec = {
    data: { url: "data/gapminder.json" },
    mark: "point",
    params: [
      {
        name: "year",
        select: { type: "point", on: "timer" },
        bind: { input: "range", min: 1955, max: 2005, step: 5 },
      },
    ],
    transform: [{ filter: { param: "year" } }],
    encoding: {
      color: { field: "country", legend: null },
      x: { field: "fertility", type: "quantitative" },
      y: { field: "life_expect", type: "quantitative" },
      time: {
        field: "year",
        scale: { range: [0, 5000] },
        key: { field: "country" },
      },
    },
  } as TopLevelSpec;
  return (
    <Box>
      <BaseChart spec={spec} />
    </Box>
  );
};
