import { Box } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import { BaseChart } from "../utils/vega-utils";

/**
 *
 */
export const OlympicMedals = () => {
  const spec: TopLevelSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    height: 450,
    width: 800,
    data: {
      values: [],
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
    encoding: {},
    mark: {
      type: "point",
    },
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
