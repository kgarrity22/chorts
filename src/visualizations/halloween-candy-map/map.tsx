import { Box } from "@mui/material";
import { BaseChart } from "../utils/vega-utils";
// import AlmondJoy from "static/halloween-svgs/almond-joy.svg";
import AlmondJoy from "/src/assets/halloween-svgs/almond-joy.svg";
import BlowPop from "/src/assets/halloween-svgs/blow-pop.svg";
import ButterFinger from "/src/assets/halloween-svgs/butterfinger.svg";
import CandyCorn from "/src/assets/halloween-svgs/candy-corn.svg";
import HersheysKisses from "/src/assets/halloween-svgs/hersheys-kisses.svg";
import HersheysBar from "/src/assets/halloween-svgs/hersheys-mini-bar.svg";
import HotTamales from "/src/assets/halloween-svgs/hot-tamales.svg";
import JollyRanchers from "/src/assets/halloween-svgs/jolly-ranchers.svg";
import LemonHeads from "/src/assets/halloween-svgs/lemonheads.svg";
import MilkyWay from "/src/assets/halloween-svgs/milky-way.svg";
import MNMs from "/src/assets/halloween-svgs/mms.svg";
import Reeses from "/src/assets/halloween-svgs/reeses-cups.svg";
import Skittles from "/src/assets/halloween-svgs/skittles.svg";
import Snickers from "/src/assets/halloween-svgs/snickers.svg";
import SourPatch from "/src/assets/halloween-svgs/sour-patch-kids.svg";
import Starburst from "/src/assets/halloween-svgs/starburst.svg";
import ThreeMusketeers from "/src/assets/halloween-svgs/three-musketeers.svg";
import TootsiePop from "/src/assets/halloween-svgs/tootsie-pop.svg";
import Twix from "/src/assets/halloween-svgs/twix.svg";

import { TopLevelSpec } from "vega-lite";

const CandiesWrapper = () => (
  <>
    <AlmondJoy />
    <Skittles />
    <MilkyWay />
    <Reeses />
    <HotTamales />
    <SourPatch />
    <JollyRanchers />
    <MNMs />
    <ButterFinger />
    <Snickers />
    <CandyCorn />
    <Twix />
    <HersheysBar />
    <HersheysKisses />
    <Starburst />
    <BlowPop />
    <TootsiePop />
    <LemonHeads />
    <ThreeMusketeers />
  </>
);

/**
 * Candy Map
 */
export const CandyMap = () => {
  const spec: TopLevelSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    padding: { right: 100 },
    config: {
      title: {
        color: "#fff",
        font: "Plus Jakarta Sans",
        fontSize: 25,
        anchor: "start",
        subtitleColor: "#fff",
        subtitleFont: "Plus Jakarta Sans",
      },
      axis: {
        titleColor: "#fff",
        labelColor: "#fff",
        labelFont: "Plus Jakarta Sans",
        titleFontSize: 12,
      },
      legend: {
        titleColor: "#fff",
        titleFont: "Plus Jakarta Sans",
        labelColor: "#fff",
        labelFont: "Plus Jakarta Sans",
        offset: -40,
      },
    },
    title: {
      text: "Top Halloween Candy By State",
      color: "#ffc971",
      fontSize: 70,
      font: "Creepster",
      subtitle: [
        "This map shows the most popular halloween candies in each state in 2023.",
        "Click on any state to see the top three most popular candies for that state in the bar chart below.",
        "Source: https://www.candystore.com/blogs/facts-trivia/halloween-candy-map-popular",
      ],
      subtitleFontSize: 15,
    },

    vconcat: [
      {
        projection: {
          type: "albersUsa",
        },
        width: 800,
        height: 600,
        layer: [
          {
            data: {
              url: "src/visualizations/halloween-candy-map/data/us-states.json",
              format: { type: "json", property: "features" },
            },
            mark: {
              type: "geoshape",
              fill: "lightgray",
              stroke: "white",
              cursor: "pointer",
            },
          },
          {
            params: [
              {
                name: "pts",
                select: { type: "point", encodings: ["shape", "color"] },
              },
              {
                name: "highlight",
                select: { type: "point", on: "pointerover" },
              },
            ],
            mark: {
              type: "geoshape",
              stroke: "white",
              strokeWidth: 3,
              cursor: "pointer",
            },
            data: {
              url: "/src/visualizations/halloween-candy-map/data/data.json",
            },
            transform: [
              {
                lookup: "stateId",
                from: {
                  data: {
                    url: "/src/visualizations/halloween-candy-map/data/us-states.json",
                    format: { type: "json", property: "features" },
                  },
                  key: "id",
                },
                as: "geo",
              },
            ],
            encoding: {
              shape: { field: "geo", type: "geojson" },
              color: {
                scale: {
                  domain: [
                    "Almond Joy",
                    "Reese's Cups",
                    "Skittles",
                    "Milky Way",
                    "M&M's",
                    "Hot Tamales",
                    "Sour Patch Kids",
                    "Jolly Ranchers",
                    "Butterfinger",
                    "Candy Corn",
                    "Hershey's Mini Bars",
                    "Hershey Kisses",
                    "Snickers",
                    "Twix",
                    "Starburst",
                    "Lemonheads",
                    "Tootsie Pops",
                    "Blow Pops",
                    "3 Musketeers",
                  ],
                  range: [
                    "url(#almond-joy)",
                    "url(#reeses)",
                    "url(#skittles)",
                    "url(#milky-way)",
                    "url(#mnms)",
                    "url(#hot-tamales)",
                    "url(#sour-patch)",
                    "url(#jolly-ranchers)",
                    "url(#butterfinger)",
                    "url(#candy-corn)",
                    "url(#hersheys-bar)",
                    "url(#hersheys-kiss)",
                    "url(#snickers)",
                    "url(#twix)",
                    "url(#starburst)",
                    "url(#lemonheads)",
                    "url(#tootsie-pop)",
                    "url(#blow-pop)",
                    "url(#three-musketeers)",
                  ],
                },
                field: "first.candy",
                title: "Most Popular Candy",
              },

              tooltip: [
                {
                  field: "geo.properties.name",
                  type: "ordinal",
                  title: "State",
                },
                {
                  field: "first.candy",
                  title: "Most Popular Candy",
                },
              ],
              strokeWidth: {
                condition: [
                  {
                    param: "pts",
                    empty: false,
                    value: 2.5,
                  },
                  {
                    param: "highlight",
                    empty: false,
                    value: 2.5,
                  },
                ],
                value: 1.5,
              },

              stroke: {
                condition: [
                  {
                    param: "pts",
                    empty: false,
                    value: "#fff",
                  },
                  {
                    param: "highlight",
                    empty: false,
                    value: "#fff",
                  },
                ],
                value: "#000",
              },
              order: {
                condition: [
                  {
                    param: "pts",
                    empty: false,
                    value: 1,
                  },
                  {
                    param: "highlight",
                    empty: false,
                    value: 1,
                  },
                ],
                value: 0,
              },
            },
          },
        ],
      },
      {
        hconcat: [
          { height: 150, width: 100, mark: "point" },
          {
            height: 200,
            width: 600,
            data: {
              url: "/src/visualizations/halloween-candy-map/data/data.json",
            },
            title: {
              text: {
                signal:
                  "pts.geo ? 'Top 3 Most Popular Candy Types in ' + pts.geo[0].properties.name : 'Top 3 Most Popular Candy Types'",
              },
              color: "#ffc971",
            },
            view: {
              stroke: "transparent",
            },
            layer: [
              {
                transform: [
                  { filter: "pts.geo && datum.stateId == pts.geo[0].id" },
                  {
                    calculate: "pts.geo[0].properties.name",
                    as: "stateName",
                  },
                  {
                    fold: ["first", "second", "third"],
                    as: ["rank", "candyInfo"],
                  },
                  {
                    calculate: "datum.candyInfo.weight",
                    as: "weight",
                  },
                  {
                    calculate: "datum.candyInfo.candy",
                    as: "candy",
                  },
                ],
                mark: {
                  type: "bar",
                  fill: "#ffc971",
                  stroke: "#fff",
                  strokeWidth: 1,
                },
                encoding: {
                  y: {
                    field: "candy",
                    title: "Candy",
                    sort: "-x",
                    axis: {
                      labelAngle: 0,
                      grid: false,
                      domainColor: "#fff",
                      tickColor: "#fff",
                    },
                  },
                  x: {
                    field: "weight",
                    title: "Total Pounds Purchased",
                    type: "quantitative",
                    axis: {
                      grid: false,
                      domainColor: "#fff",
                      tickColor: "#fff",
                    },
                  },
                  tooltip: [
                    {
                      field: "weight",
                      title: "Weight (lbs)",
                      format: `,`,
                    },
                    { field: "candy", title: "Candy" },
                  ],
                },
              },
              {
                transform: [
                  {
                    calculate:
                      '"Click on one of the states in the map above to see the top three candy types for that state in the chart below ⤵"',
                    as: "text-field",
                  },
                ],
                mark: {
                  type: "text",
                  color: "firebrick",
                  x: 0,
                  align: "left",
                  y: -30,
                  fontSize: 15,
                  font: "Plus Jakarta Sans",
                  text: [
                    "Click on one of the states in the map above to see the",
                    " top three candy types for that state in the chart below ⤵",
                  ],
                },
                encoding: {
                  color: { value: "#fff" },
                },
              },
            ],
          },
          { height: 150, width: 100, mark: "point" },
        ],
      },
    ],
  };

  return (
    <Box
      sx={{
        background: "#e85d04",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box sx={{ m: 5 }}>
        <CandiesWrapper />
        <BaseChart spec={spec} />
      </Box>
    </Box>
  );
};
