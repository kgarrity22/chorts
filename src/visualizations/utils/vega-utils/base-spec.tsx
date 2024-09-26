import { Alert, Box } from "@mui/material";
import { VegaLite } from "react-vega";
import { Spec } from "vega";
import { TopLevelSpec } from "vega-lite";

export type BaseChartProps = {
  brushSelection?: boolean;
  chartTooltip?: { alert: string };
  getTooltip?: (datum: unknown) => string;
  showAxisLabelTooltip?: boolean;
  spec: TopLevelSpec | Spec;
  tooltipTheme?: unknown;
};

/**
 * Base Chart
 */
export const BaseChart = ({
  chartTooltip,
  spec,
}: BaseChartProps): JSX.Element => {
  const { width } = spec as { height: number; width: number | string };

  const compiledSpec = spec;

  const isResponsive = width === "container";

  return (
    <Box display="flex" justifyContent="center">
      <VegaLite
        renderer={"svg"}
        spec={compiledSpec}
        style={isResponsive ? { width: "100%" } : {}}
      />
      {chartTooltip && (
        <Box>
          <Alert severity="info">{chartTooltip.alert}</Alert>
        </Box>
      )}
    </Box>
  );
};
