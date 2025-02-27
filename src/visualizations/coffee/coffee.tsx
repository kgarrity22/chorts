import { Box } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import coffeeData from "./data/data.json";

type Coffee = {
  name: string;
  ingredients: { type: string; measurement_oz: number }[];
};
const formatData = (data: Coffee[]) =>
  data.map((d) => {
    const flattened = d.ingredients.map((s) => [[s.type], s.measurement_oz]);
    return { name: d.name, ...Object.fromEntries(flattened) };
  });
// --> flatten the data
export const Coffee = () => {
  console.log(formatData(coffeeData));
  return (
    <Box
      height={700}
      width={1400}
      sx={{
        background: "#84a98c",
      }}
    >
      <ResponsiveBar
        data={formatData(coffeeData)}
        //
        keys={[
          ...new Set(
            coffeeData
              .map((d) => {
                return d.ingredients.map((s) => s.type);
              })
              .flat()
          ),
        ]}
        indexBy="name"
        motionConfig="molasses"
        margin={{ top: 200, right: 200, bottom: 200, left: 200 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band" }}
        colors={{ scheme: "nivo" }}
        // defs={[
        //   {
        //     id: "dots",
        //     type: "patternDots",
        //     background: "inherit",
        //     color: "#38bcb2",
        //     size: 4,
        //     padding: 1,
        //     stagger: true,
        //   },
        //   {
        //     id: "lines",
        //     type: "patternLines",
        //     background: "inherit",
        //     color: "#eed312",
        //     rotation: -45,
        //     lineWidth: 6,
        //     spacing: 10,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: "fries",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "sandwich",
        //     },
        //     id: "lines",
        //   },
        // ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "coffee type",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="chart"
        ariaLabel=""
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </Box>
  );
};
