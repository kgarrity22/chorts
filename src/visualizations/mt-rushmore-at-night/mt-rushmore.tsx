import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { TopLevelSpec } from "vega-lite";
import { data, starsData } from "./data";

export const MtRushmoreNight = () => {
  const spec: TopLevelSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    height: 450,
    width: 800,
    data: {
      values: data,
    },
    view: {
      stroke: null,
      fill: "#00001f",
      cornerRadius: 20,
    },
    config: {
      axis: {
        disable: true,
      },
    },
    title: {
      text: "Mount Rushmore at Night",
      fontSize: 30,
      font: "Comfortaa",
      anchor: "middle",
      color: "#000043",
    },
    layer: [
      {
        data: { values: starsData },
        encoding: {
          x: {
            field: "x",
            type: "quantitative",
            scale: {
              domain: [0, 5.2],
            },
          },
          y: {
            field: "y",
            type: "quantitative",
            scale: {
              domain: [0, 145],
            },
          },
          size: { field: "size", type: "quantitative", legend: null },
          shape: {
            value:
              "M.50 0 L.60 .40 L1.00 .50 L.60 .60 L.50 1.00 L.40 .60 L0 .50 L.40 .40 ",
          },
        },
        mark: {
          type: "point",
          fill: "#fdf8ec",
          stroke: "transparent",
          clip: true,
        },
      },

      {
        encoding: {
          x: {
            field: "x",
            type: "quantitative",
            scale: {
              domain: [0, 5.2],
            },
          },
          y: {
            field: "y",
            type: "quantitative",
            scale: {
              domain: [0, 145],
            },
          },
        },
        mark: {
          type: "area",
          color: "#000000",
        },
      },
    ],
  };
  return (
    <Box
      sx={{
        background: "#e1e5f2",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ m: 5, mt: 15, mb: 15 }}>
        <BaseChart spec={spec} />
      </Box>
    </Box>
  );
};
