import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { TopLevelSpec } from "vega-lite";

/**
 *
 *
 * TODO: fix the legend placement
 *  ---> add an onclick --> show a large square with the full into at the top of the chart
 *  ---> adjust title styling
 */
export const PeriodicTable = () => {
  const spec: TopLevelSpec = {
    title: {
      text: "Interactive Periodic Table of Elements",
      subtitle: "Click on an element below to learn more about it",
      anchor: "start",
      fontSize: 25,
      font: "Trebuchet MS, sans-serif",
      //subtitleFont
      subtitleFontSize: 13,
      color: "#2b2d42",
      subtitleColor: "#2b2d42",
    },
    padding: { left: 20, top: 20, right: 20, bottom: 40 },
    background: "#edf2f4",
    width: 1000,
    height: 500,
    data: { url: "src/visualizations/periodic-table/data/data.json" },
    encoding: {
      x: { field: "col", type: "quantitative", axis: null },
      y: {
        field: "row",
        type: "quantitative",
        scale: { reverse: true },
        axis: null,
      },
      color: {
        field: "type",
        legend: {
          offset: 40,
        },
      },
    },
    layer: [
      {
        mark: {
          type: "text",
          color: "black",
          size: 9,
          dy: 18,
          font: "monospace",
          limit: 48,
        },
        encoding: {
          text: { field: "name" },
          color: { value: "black" },
          opacity: { condition: { param: "hover", value: 0 }, value: 1 },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          size: 25,
          fontWeight: "bold",
          font: "monospace",
        },
        encoding: {
          text: { field: "symbol" },
          color: { value: "black" },
          opacity: { condition: { param: "hover", value: 0 }, value: 1 },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          size: 11,
          dx: -15,
          dy: -16,
          font: "monospace",
          fontWeight: "bold",
        },
        encoding: {
          text: { field: "code" },
          color: { value: "black" },
          opacity: { condition: { param: "hover", value: 0 }, value: 1 },
        },
      },
      {
        mark: {
          type: "square",
          // tooltip: true
        },
        params: [
          { name: "hover", select: { type: "point", on: "pointerover" } },
          { name: "selected", select: { type: "point", on: "click" } },
        ],
        encoding: {
          size: {
            condition: { param: "hover", empty: false, value: 8000 },
            value: 2500,
          },
          order: { condition: { param: "hover", value: 1 }, value: 0 },
          opacity: {
            condition: { param: "hover", empty: false, value: 1 },
            value: 0.7,
          },
          stroke: {
            condition: [{ param: "hover", empty: false, value: "black" }],
            value: null,
          },
        },
      },
      // the rectangle to display the selected details
      {
        mark: {
          type: "rect",
          height: 240,
          width: 250,
        },
        encoding: {
          x: { value: 450 },
          y: { value: 60 },
          color: {
            condition: {
              test: "selected_tuple && selected_tuple._vgsid_ === datum.code",
              empty: false,
              field: "type",
            },
            value: null,
          },
          opacity: {
            // hide and show the detail element on click
            condition: {
              test: "selected_tuple && selected_tuple._vgsid_ === datum.code",
              empty: false,
              value: 1,
            },
            value: 0,
          },
          stroke: { value: "black" },
        },
      },
      //
      {
        mark: {
          type: "text",
          color: "black",
          font: "sans-serif",
          fontSize: 40,
          fontWeight: "bold",
        },
        encoding: {
          x: { value: 450 },
          y: { value: 0 },
          color: { value: "black" },
          text: { field: "symbol" },
          opacity: {
            condition: {
              test: "selected_tuple && selected_tuple._vgsid_ === datum.code",
              empty: false,
              value: 1,
            },
            value: 0,
          },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          font: "sans-serif",
          fontSize: 20,
        },
        encoding: {
          x: { value: 450 },
          y: { value: 30 },
          color: { value: "black" },
          text: { field: "name" },
          opacity: {
            condition: {
              test: "selected_tuple && selected_tuple._vgsid_ === datum.code",
              empty: false,
              value: 1,
            },
            value: 0,
          },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          font: "sans-serif",
          fontSize: 12,
          // fontWeight: "bold",
          text: {
            expr: `[ 
            'Code: ' + datum.code, 
            'Type: ' + datum.type, 
            'Atomic Mass: ' + datum.atomic_mass + 'u', 
            'Standard State: ' + datum.standard_state, 
            '🪧 ' + datum.fun_fact
             ]`,
          },
        },
        encoding: {
          x: { value: 450 },
          y: { value: 55 },
          color: { value: "black" },
          opacity: {
            condition: {
              test: "selected_tuple && selected_tuple._vgsid_ === datum.code",
              empty: false,
              value: 1,
            },
            value: 0,
          },
        },
      },

      //
      {
        mark: {
          type: "text",
          color: "black",
          size: {
            expr: "hover_tuple ? hover_tuple._vgsid_ === datum.code ? 10: 9 : 9",
          },
          dy: {
            expr: "hover_tuple ? hover_tuple._vgsid_ === datum.code ? 30: 18 : 18",
          },
          font: "monospace",
          limit: {
            expr: "hover_tuple ? hover_tuple._vgsid_ === datum.code ? 1000: 48 : 48",
          },
        },
        encoding: {
          text: { field: "name" },
          color: { value: "black" },
          opacity: { condition: { param: "hover", value: 1 }, value: 0 },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          size: {
            expr: "hover_tuple ?hover_tuple._vgsid_ === datum.code ? 35: 25 : 25",
          },
          fontWeight: "bold",
          font: "monospace",
        },
        encoding: {
          text: { field: "symbol" },
          color: { value: "black" },
          opacity: { condition: { param: "hover", value: 1 }, value: 0 },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          size: 11,
          dx: {
            expr: "hover_tuple ?hover_tuple._vgsid_ === datum.code ? -33: -15 : -15",
          },
          dy: {
            expr: "hover_tuple ?hover_tuple._vgsid_ === datum.code ? -30: -16 : -16",
          },
          font: "monospace",
          fontWeight: "bold",
        },
        encoding: {
          text: { field: "code" },
          color: { value: "black" },
          opacity: { condition: { param: "hover", value: 1 }, value: 0 },
        },
      },
      {
        mark: {
          type: "text",
          color: "black",
          size: 11,
          dx: {
            expr: "hover_tuple ?hover_tuple._vgsid_ === datum.code ? 20: 0 : 0",
          },
          dy: {
            expr: "hover_tuple ?hover_tuple._vgsid_ === datum.code ? -30: -16 : -16",
          },
          font: "monospace",
          fontWeight: "bold",
        },
        encoding: {
          text: {
            value: {
              expr: "datum ? format(datum.atomic_mass, '.2f') + 'u' : ''",
            },
          },
          color: { value: "black" },
          opacity: {
            condition: { param: "hover", empty: false, value: 1 },
            value: 0,
          },
        },
      },
    ],
    config: {
      view: { stroke: null },
      axis: { grid: false, domain: false, labels: false, ticks: false },
    },
  };
  return (
    <Box
      sx={{
        background: "#edf2f4",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ m: 5, mt: 5, mb: 15 }}>
        <BaseChart spec={spec} />
      </Box>
    </Box>
  );
};
