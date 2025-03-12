import { Box, Typography, useTheme } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";

const colorScheme = {
  0: "#EDE0D4",
  1: "#E6CCB2",
  2: "#DDB892",
  3: "#B08968",
  4: "#9C6644",
  5: "#7F5539",
};
// vega lite coorindate map
export const GroundHogMap = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: colorScheme[2],
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          m: theme.spacing(5),
          ml: theme.spacing(10),
          mr: theme.spacing(10),
        }}
      >
        <Typography variant="h4">
          Here's where you can see a ground hog (or groundhog like character)
          check for its shadow
        </Typography>
        <BaseChart spec={{}} />
      </Box>
    </Box>
  );
};
