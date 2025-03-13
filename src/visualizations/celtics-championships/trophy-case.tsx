import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { TopLevelSpec } from "vega-lite";
// import "./custom-tooltip-styles.css";

/**
 * Celtics Banners
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
        "Click on a banner to get a detailed view of that year's celtics win",
    },
    data: { url: "/data/celtics-championships/data.json" },
    transform: [
      // {
      //   calculate: `'<div style="display:grid; grid-template-columns:auto 30px; gap:2px;">' +
      //           datum.Roster[0] + '</div>'`,
      //   as: "formattedRoster",
      // },
      {
        calculate: `pluck(datum.Roster, 'player')`,
        as: "formattedRoster",
      },
      {
        calculate: `join(pluck(datum.Roster, 'player'), '<br />')`,
        as: "formattedRoster2",
      },
      // {
      //   flatten: ["formattedRoster"],
      //   as: ["player"],
      // },
      // {
      //   calculate: "replace(pluck(datum.Roster, 'player'), /[\\[\\]\"]/g, '')",
      //   // "replace(replace(toString(datum.Roster), /[\\[\\]\"]/g, ''), /,/g, '\n•')",
      //   // "replace(toString(datum.Roster), /[\\[\\]\"]/g, '')",
      //   // "toString(datum.Roster)",
      //   // "replace(replace(toString(datum.Roster), /[\\[\\]\"]/g, ''), /,/g, '\n•')",
      //   as: "FormattedRoster",
      // },
    ],
    encoding: {
      x: { value: { expr: "(datum.col-1)*250" } },
      x2: { value: { expr: "(datum.col-1)*250 + 200" } },
      y: { value: { expr: "(datum.row-1)*350" } },
      y2: { value: { expr: "(datum.row-1)*350 + 300" } },
      tooltip: [
        { field: "Coach", type: "nominal", title: "Coach:" },
        { field: "Record", type: "nominal", title: "Record:" },
        { field: "Opponent", type: "nominal", title: "Finals Opponent:" },
        { field: "Series_score", type: "nominal", title: "Finals Result:" },
        // { field: "Roster", type: "nominal", title: "Roster:" },
        { field: "formattedRoster", type: "nominal", title: "Roster:" },
        { field: "formattedRoster2", type: "nominal", title: "Roster2:" },
        // { field: "player", type: "nominal", title: "player?:" },
        // {
        //   field: "Roster",
        //   title: "Team Roster",
        //   type: "nominal",
        //   format: "players",
        //   // formatType: "custom",

        //   // custom: {
        //   //   players: (value) => {
        //   //     return value.join("\n");
        //   //   },
        //   // },
        // },
      ],
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
      lineBreak: "<br />",
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
        <BaseChart spec={spec} tooltipTheme="card" />
      </Box>
    </Box>
  );
};
