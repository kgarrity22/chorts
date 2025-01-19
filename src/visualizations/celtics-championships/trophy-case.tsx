import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { TopLevelSpec } from "vega-lite";

/**
 * Celtics Banners
 */

/**
 * do this with rects
 * --> x =
 */
export const TrophyCase = () => {
  const spec: TopLevelSpec = {
    padding: 50,
    width: 1000,
    height: 1500,
    background: "#f6bd60",
    // background: "#d8f3dc",
    title: {
      text: "Banner town",
      subtitle:
        "this doesn't work yet, but eventually click on a banner to get a detailed view of that year's celtics win",
    },
    data: { url: "src/visualizations/celtics-championships/data/data.json" },
    encoding: {
      x: { value: { expr: "(datum.col-1)*250" } },
      x2: { value: { expr: "(datum.col-1)*250 + 200" } },
      y: { value: { expr: "(datum.row-1)*350" } },
      y2: { value: { expr: "(datum.row-1)*350 + 300" } },
    },
    layer: [
      {
        mark: {
          type: "rect",
          stroke: "#07846a",
          strokeWidth: 15,
          tooltip: { expr: "datum" },
          fillOpacity: 0.85,
          fill: "white",
          cursor: "pointer",
        },
      },
      //
      {
        mark: {
          type: "text",
          color: "#07846a",
          dx: 100,
          dy: 50,
          fontWeight: 800,
          fontSize: 50,
        },
        encoding: {
          text: {
            value: ["BOSTON", "CELTICS"],
          },
        },
      },
      {
        mark: {
          type: "text",
          color: "#07846a",
          dx: 100,
          dy: 155,
          // fontWeight: 800,
          fontSize: 20,
        },
        encoding: {
          text: {
            value: "NBA",
          },
        },
      },
      {
        mark: {
          type: "text",
          color: "#07846a",
          dx: 100,
          dy: 200,
          fontWeight: 700,
          fontSize: 30,
        },
        encoding: {
          text: {
            value: { expr: '[ datum.Year, "WORLD", "CHAMPIONS"]' },
          },
        },
      },
    ],
    config: {
      font: "Reddit Sans Condensed",
      // fontWeight: "bold",
      view: { stroke: null },
      axis: { grid: false, domain: false, labels: false, ticks: false },
    },
  };
  return (
    <Box
      sx={{
        background: "#f6bd60",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ m: 5 }}>
        <BaseChart spec={spec} />
      </Box>
    </Box>
  );
};
