import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
import { Spec } from "vega";

/**
 * Candy Map
 */
export const BostonChampionships = () => {
  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    // description:
    //   "This is an exploration of some new interaction techniques. This visual includes: A scrubber control (in the form of a rotating baseball!), Dynamic progress line, Sub node-link trees that fade-in on a delay. Although each node-link tree only goes one level deep, I can see some potential for combining on-demand trees with other visuals such as scatter plots, line charts, etc.",
    // usermeta: {
    //   developedBy: "Madison Giammaria",
    //   LinkedIn: "https://www.linkedin.com/in/madison-giammaria-58463b33",
    //   email: "giammariam@gmail.com",
    // },
    background: "white",
    padding: { top: 100, right: 40, bottom: 10, left: 40 },
    width: 800,
    height: 240,
    // title: {
    //   text: { signal: "['New York Yankees']" },
    //   subtitle: "A Timeline of World Series Wins",
    //   orient: "bottom",
    //   anchor: "start",
    //   dy: -26,
    // },
    encode: { init: { stroke: { value: "transparent" } } },
    signals: [
      {
        name: "timelineHeight",
        update: "height/2",
        description:
          "height for all timeline markers except for the link lines and link text. The smaller height is to leave space for the link lines and link text",
      },
      {
        name: "timelinePointSize",
        value: 50,
        description: "size of the timeline circle symbols",
      },
      {
        name: "yPosCount",
        value: 4,
        description:
          "number of increments for staggering vertical placement of timeline marks",
      },
      {
        name: "xDomainMin",
        update: "toDate('01/01/1903')",
        description: "minimum date to use for the x scale",
      },
      {
        name: "xDomainMax",
        update: "toDate('01/01/'+year(now()))",
        description: "maximum data to use for the x scale",
      },
      {
        name: "yearCounter",
        update: "abs(+year(xDomainMin)-scrubbedSeason)+1",
        description:
          "number of seasons into the timeline according to the ball placement",
      },
      {
        name: "ballRotationAngleInterval",
        value: 40,
        description: "how much the ball should rotate per year",
      },
      {
        name: "ballRotationAngle",
        update: "yearCounter*ballRotationAngleInterval",
        description: "the current ball rotation angle",
      },
      {
        name: "unit",
        value: "null",
        description: "used to obtain properties on the focused mark",
        on: [
          { events: "mousemove", update: "isTuple(group()) ? group() : unit" },
          { events: "touchmove", update: "isTuple(group()) ? group() : unit" },
        ],
      },
      {
        name: "scrubbedSeason",
        init: "toDate(xDomainMin)",
        description: "the season that the ball is currently on in the timeline",
        on: [
          {
            events: "pointerdown",
            update:
              "toDate('01/01/'+utcFormat(invert('x', clamp(x(unit), 0, width)), '%Y'))",
          },
          {
            events: "touchstart",
            update:
              "toDate('01/01/'+utcFormat(invert('x', clamp(x(unit), 0, width)), '%Y'))",
          },
          {
            events: {
              type: "pointermove",
              source: "window",
              between: [{ type: "pointerdown" }, { type: "pointerup" }],
            },
            update:
              "unit && unit !== {} ?  toDate('01/01/'+utcFormat(invert('x', clamp(x(unit), 0, width)), '%Y')) : scrubbedSeason",
          },
          {
            events: {
              type: "touchmove",
              source: "window",
              between: [{ type: "pointerdown" }, { type: "pointerup" }],
            },
            update:
              "unit && unit !== {} ?  toDate('01/01/'+utcFormat(invert('x', clamp(x(unit), 0, width)), '%Y')) : scrubbedSeason",
          },
          { events: "mouseout", update: "scrubbedSeason" },
          { events: "touchend", update: "scrubbedSeason" },
        ],
      },
      {
        name: "isWinningYear",
        description:
          "indicates if the current scrubbed year is a world series win year",
        update: "data('selected_dataset')[0]['isWinningYear']",
      },
      {
        name: "latestWinningYear",
        description: "indicates the last scrubbed world series win year",
        value: null,
        on: [
          {
            events: { signal: "scrubbedSeason" },
            update: "isWinningYear ? scrubbedSeason : latestWinningYear",
          },
        ],
      },
      {
        name: "timer",
        description: "timer that updates every milisecond",
        init: "now()",
        on: [{ events: { type: "timer", throttle: 1 }, update: "now()" }],
      },
      {
        name: "hierarchyFadeInDelay",
        description:
          "how long to wait in miliseconds before showing the link paths and node text",
        value: 500,
      },
      {
        name: "hierarchyFadeInInterval",
        description:
          "how long it should take in miliseconds to fade in the link paths and node text",
        value: 500,
      },
      {
        name: "hierarchyFadeInTimerStart",
        description:
          "the start time in miliseconds for the current fade-in of the link paths and node text",
        value: null,
        on: [
          {
            events: { signal: "isWinningYear" },
            update: "isWinningYear ? timer+hierarchyFadeInDelay : null",
          },
          {
            events: { signal: "latestWinningYear" },
            update: "isWinningYear ? timer+hierarchyFadeInDelay : null",
          },
        ],
      },
      {
        name: "hierarchyFadeInTimerEnd",
        description:
          "the end time in miliseconds for the current fade-in of the link paths and node text",
        value: null,
        on: [
          {
            events: { signal: "hierarchyFadeInTimerStart" },
            update:
              "isWinningYear ? hierarchyFadeInTimerStart +  hierarchyFadeInInterval + hierarchyFadeInDelay: null",
          },
        ],
      },
      {
        name: "hierarchyFadeInOpacity",
        description:
          "the current opacity between 0 and 1 for the current fade-in of the link paths and node text",
        value: 0,
        on: [
          {
            events: { signal: "timer" },
            update:
              "isWinningYear ? clamp((timer - hierarchyFadeInTimerStart)/(hierarchyFadeInTimerEnd - hierarchyFadeInTimerStart), 0, 1): 0",
          },
        ],
      },
      {
        name: "yankeesLogoPath",
        description: "the shape path for the Yankees logo",
        value:
          "M2.96361 231.26c11.8781,0.444306 74.5665,-67.1918 83.7622,-74.1069 67.0252,91.7527 68.8827,123.512 223.384,262.9 -9.30088,-63.5203 -119.626,-251.998 -176.841,-310.545 27.9263,-28.2288 86.1657,-84.8907 102.373,-104.1 17.1672,49.3959 78.1812,241.727 141.479,358.18l0 0c48.395,-91.7527 132.938,-324.667 132.16,-359.947 27.6663,25.6126 70.0112,81.1011 100.525,107.635 -59.5783,45.8746 -161.955,255.841 -199.192,354.653 -10.7898,28.6601 -1.85403,45.8746 -1.85403,45.8746 33.3726,25.6126 145.195,130.568 165.675,149.978 -40.9423,-264.663 44.6834,-441.109 104.249,-504.63 9.54548,10.0642 38.3651,34.182 68.8768,65.2846 -31.6402,42.3449 -94.22,152.947 -96.796,268.196 -3.72697,165.857 24.1922,238.201 68.8674,303.484 -19.9819,24.4959 -34.9513,22.8888 -63.2828,56.4646 -44.8276,-41.1574 -215.687,-195.336 -245.729,-222.322l0 0 5.59636 125.275c1.42627,7.31332 3.02979,73.0103 31.6402,104.109 -62.8492,0.0815348 -74.9234,0.0874431 -137.75,1.76068 20.9793,-28.3599 27.4441,-90.1834 27.9263,-109.393l-1.86939 -199.386c-24.7996,-23.7833 -147.323,-135.036 -158.219,-146.451l0 0c13.0219,67.0512 14.8949,275.256 -78.1742,432.299 -7.63828,-10.9859 -85.3504,-103.405 -83.78,-105.872 28.6069,-44.8276 79.084,-145.742 80.0412,-239.964 1.74532,-172.061 -65.4145,-217.301 -93.069,-259.38z",
      },
    ],
    marks: [
      // {
      //   name: "yankeeLogo",
      //   type: "symbol",
      //   source: { data: [{}] },
      //   encode: {
      //     enter: {
      //       size: { signal: "0.05" },
      //       y: { signal: "height-105" },
      //       shape: { signal: "yankeesLogoPath" },
      //       fill: { value: "#0C2340" },
      //     },
      //     update: {
      //       opacity: {
      //         signal:
      //           "indexof(['1927', '1932'], toString(year(scrubbedSeason))) >= 0 ? 0 : 1",
      //       },
      //     },
      //   },
      // },
      {
        name: "yearText",
        type: "text",
        from: { data: "selected_dataset" },
        encode: {
          enter: {
            y: { signal: "height-35" },
            x: { signal: "width" },
            align: { value: "right" },
            baseline: { value: "middle" },
            fontSize: { value: 90 },
            font: { value: "Impact" },
            fill: { value: "#0C2340" },
          },
          update: {
            text: { signal: "year(scrubbedSeason)" },
            opacity: {
              signal:
                "indexof(['1998', '2000'], toString(year(scrubbedSeason))) >= 0 ? 0 : isWinningYear ? 1 : 0.35",
            },
          },
        },
      },
      // {
      //   name: "dataSourceText",
      //   type: "text",
      //   source: { data: [{}] },
      //   encode: {
      //     enter: {
      //       y: { signal: "height+12" },
      //       x: { signal: "width" },
      //       align: { value: "right" },
      //       baseline: { value: "middle" },
      //       fontSize: { value: 8 },
      //       fill: { value: "#00bcd4" },
      //       text: { signal: "'Data Source: Wikipedia'" },
      //       fontStyle: { value: "italic" },
      //       cursor: { value: "pointer" },
      //     },
      //     update: {
      //       href: {
      //         signal: "'https://en.wikipedia.org/wiki/New_York_Yankees'",
      //       },
      //     },
      //   },
      // },
      // {
      //   name: "vizByText",
      //   type: "text",
      //   source: { data: [{}] },
      //   encode: {
      //     enter: {
      //       y: { signal: "height+22" },
      //       x: { signal: "width" },
      //       align: { value: "right" },
      //       baseline: { value: "middle" },
      //       fontSize: { value: 8 },
      //       fill: { value: "#00bcd4" },
      //       text: { signal: "'Visual by Madison Giammaria'" },
      //       fontStyle: { value: "italic" },
      //       cursor: { value: "pointer" },
      //     },
      //     update: {
      //       href: {
      //         signal: "'http://www.linkedin.com/in/madison-giammaria-58463b33'",
      //       },
      //     },
      //   },
      // },
      {
        name: "helperArrowText",
        type: "text",
        encode: {
          enter: {
            x: { value: 7 },
            y: { value: 15 },
            text: { value: "⤴" },
            fontSize: { value: 20 },
            fill: { value: "red" },
            angle: { value: 160 },
          },
          update: {
            opacity: { signal: "scrubbedSeason===xDomainMin ? 1 : 0" },
          },
        },
      },
      {
        name: "helperText",
        type: "text",
        encode: {
          enter: {
            x: { value: 10 },
            y: { value: 9 },
            fontStyle: { value: "italic" },
            text: {
              signal: "['Grab and move the ball', 'to explore the timeline']",
            },
            fontSize: { value: 12 },
            fill: { value: "red" },
            angle: { value: 335 },
          },
          update: {
            opacity: { signal: "scrubbedSeason===xDomainMin ? 1 : 0" },
          },
        },
      },
      {
        name: "xAxisTicks",
        type: "text",
        from: { data: "xAxisLabelsData" },
        encode: {
          enter: {
            text: { value: "|" },
            x: { scale: "x", field: "Season" },
            y: { scale: "y", field: "yPos", offset: 5 },
            align: { value: "center" },
            baseline: { value: "middle" },
          },
          update: {
            fill: {
              signal:
                "datum['type'] === 'start' && scrubbedSeason!==xDomainMin ? '#0C2340' : 'gainsboro'",
            },
            stroke: {
              signal:
                "datum['type'] === 'start' && scrubbedSeason!==xDomainMin ? '#0C2340' : 'gainsboro'",
            },
            strokewidth: {
              signal:
                "datum['type'] === 'start' && scrubbedSeason!==xDomainMin ? 2 : 0",
            },
          },
        },
      },
      {
        name: "xAxisLabels",
        type: "text",
        from: { data: "xAxisLabelsData" },
        encode: {
          enter: {
            opacity: { value: 0.5 },
            fill: { value: "#000" },
            text: { signal: "datum['label']" },
            x: { scale: "x", field: "Season" },
            y: { scale: "y", field: "yPos", offset: 20 },
            align: { value: "center" },
            baseline: { value: "middle" },
          },
        },
      },
      {
        name: "timelineToLinkConnection",
        type: "rule",
        from: { data: "datasetUpdated" },
        encode: {
          enter: {
            stroke: { value: "#0C2340" },
            strokeWidth: { value: 2 },
            x: { scale: "x", field: "Season" },
            y: { signal: "timelineHeight/2" },
            y2: { signal: "datum['yPos'] > 0 ? -20 : timelineHeight+20" },
          },
          update: {
            opacity: {
              signal:
                "+datum['Year'] === year(scrubbedSeason) ? hierarchyFadeInOpacity : 0",
            },
          },
        },
      },
      {
        name: "timelineRules",
        type: "rule",
        from: { data: "datasetUpdated" },
        encode: {
          enter: {
            stroke: { value: "#0C2340" },
            strokeDash: { value: [2, 1] },
            x: { scale: "x", field: "Season" },
            y: { scale: "y", field: "yPos" },
            y2: { scale: "y", field: "y2Pos" },
          },
          update: { opacity: { signal: "datum['opacity']" } },
        },
      },
      {
        name: "timelinePointLabelBackgrounds",
        type: "text",
        from: { data: "datasetUpdated" },
        encode: {
          enter: {
            opacity: { value: 1 },
            fill: { value: "#fff" },
            stroke: { value: "#fff" },
            strokeWidth: { value: 5 },
            text: { signal: "datum['Year']" },
            fontWeight: { value: "400" },
            fontSize: { value: 11 },
            x: { scale: "x", field: "Season" },
            y: {
              scale: "y",
              field: "yPos",
              offset: { signal: "(datum['yPos'] < 0 ? 1 : -1) * 12" },
            },
            align: { value: "center" },
            baseline: { value: "middle" },
          },
          update: {
            fontWeight: {
              signal: "+datum['Year'] === year(scrubbedSeason) ? 800 : 400",
            },
            fontSize: {
              signal: "+datum['Year'] === year(scrubbedSeason) ? 14 : 11",
            },
          },
        },
      },
      {
        name: "timelinePointLabels",
        type: "text",
        from: { data: "datasetUpdated" },
        encode: {
          enter: {
            text: { signal: "datum['Year']" },
            fontWeight: { value: "400" },
            fontSize: { value: 11 },
            fill: { value: "#0C2340" },
            x: { scale: "x", field: "Season" },
            y: {
              scale: "y",
              field: "yPos",
              offset: { signal: "(datum['yPos'] < 0 ? 1 : -1) * 12" },
            },
            align: { value: "center" },
            baseline: { value: "middle" },
          },
          update: {
            opacity: { signal: "datum['opacity']" },
            fontWeight: {
              signal: "+datum['Year'] === year(scrubbedSeason) ? 800 : 400",
            },
            fontSize: {
              signal: "+datum['Year'] === year(scrubbedSeason) ? 14 : 11",
            },
          },
        },
      },
      {
        name: "timelinePoints",
        type: "symbol",
        from: { data: "datasetUpdated" },
        encode: {
          enter: {
            size: { signal: "timelinePointSize" },
            fill: { value: "#0C2340" },
            x: { scale: "x", field: "Season" },
            y: { scale: "y", field: "yPos" },
          },
          update: {
            opacity: {
              signal:
                "+datum['Year'] === year(scrubbedSeason) ? 0 : datum['opacity']",
            },
          },
        },
      },
      {
        type: "path",
        from: { data: "links" },
        encode: {
          update: {
            path: { field: "path" },
            stroke: { value: "#0C2340" },
            strokeWidth: { value: 2 },
            y: {
              signal:
                "(datum['source']['yPos'] > 0 ? -0.5*timelineHeight-20 : timelineHeight + 20)",
            },
            opacity: { signal: "hierarchyFadeInOpacity" },
          },
        },
      },
      {
        type: "text",
        from: { data: "tree" },
        encode: {
          enter: {
            text: { signal: "[datum['key']+':', datum['value']]" },
            fontSize: { value: 12 },
            baseline: { value: "middle" },
            fill: { value: "#0C2340" },
          },
          update: {
            x: { field: "x" },
            y: {
              signal:
                "(datum['yPos'] > 0 ? -0.5*timelineHeight-40 : timelineHeight + 30+datum['y'])",
            },
            baseline: { signal: "datum['yPos'] > 0 ? 'bottom' : 'top'" },
            dx: { signal: "datum.children ? -7 : 7" },
            align: { value: "center" },
            opacity: {
              signal: "datum['depth'] > 0 ? hierarchyFadeInOpacity : 0",
            },
          },
        },
      },
      {
        name: "progressLine",
        type: "rect",
        from: { data: "scrubberData" },
        encode: {
          update: {
            x: { scale: "x", field: "Season" },
            x2: { value: 0 },
            y: { scale: "y", field: "yPos", offset: -1 },
            y2: { scale: "y", field: "yPos", offset: 1 },
            fill: { value: "#0C2340" },
          },
        },
      },
      {
        name: "scrubberListenerRect",
        type: "rect",
        from: { data: "scrubberData" },
        encode: {
          enter: {
            opacity: { value: 0 },
            cursor: { value: "grab" },
            x: { value: 0 },
            y: { signal: "0" },
            width: { signal: "width" },
            height: { signal: "height/2" },
          },
        },
      },
      {
        name: "timelineScrubberBackground",
        type: "symbol",
        from: { data: "scrubberData" },
        encode: {
          enter: {
            opacity: { value: 1 },
            fill: { value: "#fff" },
            stroke: { value: "#000" },
            strokeWidth: { value: 1 },
            strokeOpacity: { value: 0.5 },
            y: { scale: "y", field: "yPos" },
            size: { value: 337 },
            cursor: { value: "grab" },
            shape: { value: "circle" },
          },
          update: { x: { scale: "x", field: "Season" } },
        },
      },
      {
        name: "timelineScrubberForeground",
        type: "text",
        from: { data: "scrubberData" },
        encode: {
          enter: {
            opacity: { value: 0.5 },
            fill: { value: "red" },
            baseline: { value: "middle" },
            text: { value: ") (" },
            y: { scale: "y", field: "yPos" },
            fontSize: { value: 14 },
            cursor: { value: "grab" },
            align: { value: "center" },
          },
          update: {
            x: { scale: "x", field: "Season" },
            angle: { signal: "ballRotationAngle" },
          },
        },
      },
    ],
    scales: [
      {
        name: "x",
        type: "time",
        domain: {
          fields: [
            { data: "xAxisLabelsData", field: "Season" },
            { data: "datasetUpdated", field: "Season" },
            { data: "scrubberData", field: "Season" },
          ],
        },
        range: [0, { signal: "width" }],
        domainMax: { signal: "xDomainMax" },
        domainMin: { signal: "xDomainMin" },
      },
      {
        name: "y",
        type: "linear",
        domain: {
          fields: [
            { data: "xAxisLabelsData", field: "yPos" },
            { data: "datasetUpdated", field: "yPos" },
            { data: "datasetUpdated", field: "y2Pos" },
            { data: "scrubberData", field: "yPos" },
          ],
        },
        range: [{ signal: "timelineHeight" }, 0],
        nice: true,
        zero: true,
      },
    ],
    axes: [
      {
        scale: "y",
        orient: "left",
        gridColor: "gainsboro",
        gridScale: "x",
        grid: true,
        tickCount: { signal: "ceil(timelineHeight/40)" },
        encode: {
          grid: {
            update: { opacity: { signal: "datum['value'] === 0 ? 1 : 0" } },
          },
        },
        domain: false,
        labels: false,
        maxExtent: 0,
        minExtent: 0,
        ticks: false,
        zindex: 0,
      },
      {
        scale: "y",
        orient: "left",
        grid: false,
        domain: false,
        labels: false,
        ticks: false,
        labelOverlap: true,
        tickCount: { signal: "ceil(timelineHeight/40)" },
        zindex: 0,
      },
    ],
    data: [
      {
        name: "dataset",
        url: "/src/visualizations/boston-championships/data/data.json",
      },
      {
        name: "datasetUpdated",
        source: "dataset",
        transform: [
          { type: "formula", expr: "toDate(datum['Season'])", as: "Season" },
          {
            type: "window",
            params: [null],
            as: ["id"],
            ops: ["row_number"],
            fields: [null],
            sort: { field: [], order: [] },
          },
          {
            type: "formula",
            expr: "utcFormat(datum['Season'], '%Y')",
            as: "Year",
          },
          {
            type: "formula",
            expr: "slice(datum['Series_score'], -1)=='0'",
            as: "Sweep",
          },
          {
            type: "formula",
            expr: "datum['Series_score'] + (datum['Sweep'] ? ' 🧹' : '')",
            as: "Series_score",
          },
          {
            type: "window",
            params: [null],
            as: ["yPos"],
            ops: ["row_number"],
            fields: [null],
            sort: { field: [], order: [] },
            groupby: ["Orient"],
          },
          {
            type: "formula",
            expr: "datum['yPos']%yPosCount===0 ? yPosCount : (datum['yPos']%yPosCount) ",
            as: "yPos",
          },
          {
            type: "formula",
            expr: "(datum['id']%2 === 0 ? -1 : 1) * datum['yPos']",
            as: "yPos",
          },
          { type: "formula", expr: "0", as: "y2Pos" },
          {
            type: "formula",
            expr: "year(scrubbedSeason) >= datum['Year'] ? 1 : 0.25",
            as: "opacity",
          },
          {
            type: "filter",
            expr: "(isDate(datum['Season']) || (isValid(datum['Season']) && isFinite(+datum['Season']))) && isValid(datum['yPos']) && isFinite(+datum['yPos'])",
          },
        ],
      },
      {
        name: "xAxisLabelsData",
        values: [{ type: "start" }, { type: "end" }],
        transform: [
          { type: "formula", expr: "0", as: "yPos" },
          {
            type: "formula",
            expr: "datum['type'] === 'start' ? xDomainMin : xDomainMax",
            as: "Season",
          },
          {
            type: "formula",
            expr: "datum['type'] === 'start' ? utcFormat(xDomainMin, '%Y') : 'Today'",
            as: "label",
          },
          {
            type: "filter",
            expr: "(isDate(datum['Season']) || (isValid(datum['Season']) && isFinite(+datum['Season']))) && isValid(datum['yPos']) && isFinite(+datum['yPos'])",
          },
        ],
      },
      {
        name: "scrubberData",
        values: [{ type: "scrubber" }],
        transform: [
          {
            type: "formula",
            expr: "toDate('01/01/'+year((scrubbedSeason ? scrubbedSeason : xDomainMin)))",
            as: "Season",
          },
          { type: "formula", expr: "0", as: "yPos" },
        ],
      },
      {
        name: "tree",
        source: "datasetUpdated",
        transform: [
          { type: "filter", expr: "+datum['Year'] === year(scrubbedSeason)" },
          {
            type: "fold",
            fields: ["id", "Opponent", "Series_score", "Record", "Coach"],
          },
          { type: "project", fields: ["id", "Season", "yPos", "key", "value"] },
          {
            type: "formula",
            expr: "datum['key'] === 'id' && datum['value'] === datum['id'] ? null : datum['id']",
            as: "parentId",
          },
          { type: "window", ops: ["row_number"], as: ["rn"] },
          {
            type: "formula",
            expr: "datum['parentId'] ? datum['rn']+100 : datum['id']",
            as: "id",
          },
          { type: "stratify", key: "id", parentKey: "parentId" },
          {
            type: "tree",
            method: "tidy",
            size: [
              { signal: "timelineHeight*3" },
              { signal: "timelineHeight/2" },
            ],
            separation: { signal: "true" },
            as: ["x", "y", "depth", "children"],
          },
          {
            type: "formula",
            expr: "datum['x']+scale('x', datum['Season'])-(timelineHeight*1.5)",
            as: "x",
          },
        ],
      },
      {
        name: "links",
        source: "tree",
        transform: [
          { type: "treelinks" },
          {
            type: "linkpath",
            orient: "vertical",
            sourceY: {
              expr: "datum['source']['yPos'] > 0 ? datum['target']['y'] : datum['source']['y']",
            },
            targetY: {
              expr: "datum['source']['yPos'] > 0 ? datum['source']['y'] : datum['target']['y']",
            },
            shape: "diagonal",
          },
        ],
      },
      {
        name: "selected_dataset",
        source: "scrubberData",
        transform: [
          {
            type: "formula",
            expr: "toString(year(datum['Season']))",
            as: "Year",
          },
          {
            type: "lookup",
            from: "datasetUpdated",
            key: "Year",
            fields: ["Year"],
            as: ["isWinningYear"],
            values: ["Year"],
          },
          {
            type: "formula",
            expr: "isValid(datum['isWinningYear'])",
            as: "isWinningYear",
          },
        ],
      },
    ],
  } as Spec;

  return (
    <Box
      sx={{
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
