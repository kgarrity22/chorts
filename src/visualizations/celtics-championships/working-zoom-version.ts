// vega spec with click to zoom in and out
export const workingSpec = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "An interactive scatter plot example supporting pan and zoom.",
  width: 400,
  height: 400,
  signals: [
    {
      name: "initialDuration",
      value: 2000,
      description: "The duration parameter for transitions occur",
    },
    {
      name: "duration",
      init: "initialDuration",
      description:
        "The actual duration for transitions. This separate signal has been created to allow for slow transitions",
      on: [
        {
          events: { type: "click", marknames: ["griditems", "background"] },
          update: "(event.metaKey || event.ctrlKey ? 4 : 1) *initialDuration",
        },
      ],
      value: 0,
    },
    {
      name: "timer",
      description:
        "The timer to be used for transitions such as zoom, fade, etc.",
      on: [{ events: "timer", update: "now()" }],
    },
    {
      name: "interpolateTime",
      on: [
        {
          events: { type: "click", marknames: ["griditems", "background"] },
          update: "{'start': timer, 'end': timer+duration}",
        },
      ],
    },
    {
      name: "t",
      description: "The normalized time for easing",
      update:
        "interpolateTime ? clamp((timer-interpolateTime.start)/(interpolateTime.end-interpolateTime.start), 0, 1): null",
    },
    {
      name: "tEase",
      description: "The easing calculation. Currently set as easeInOutCubic",
      update:
        "t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1",
    },
    {
      name: "interpolateTimeDelayed",
      description: "The delayed time for easing",
      on: [
        {
          events: { signal: "interpolateTime" },
          update:
            "{'start': interpolateTime.end, 'end': interpolateTime.end+duration}",
        },
      ],
    },
    {
      name: "tDelayed",
      description: "The delayed normalized time for easing",
      update:
        "interpolateTimeDelayed ? clamp((timer-interpolateTimeDelayed.start)/(interpolateTimeDelayed.end-interpolateTimeDelayed.start), 0, 1): null",
    },
    {
      name: "tEaseDelayed",
      description:
        "The delayed easing calculation. Currently set as easeInOutCubic",
      update:
        "tDelayed < 0.5 ? 4 * tDelayed * tDelayed * tDelayed : (tDelayed - 1) * (2 * tDelayed - 2) * (2 * tDelayed - 2) + 1",
    },
    {
      name: "hover",
      on: [
        { events: "*:pointerover", encode: "hover" },
        { events: "*:pointerout", encode: "leave" },
        { events: "*:pointerdown", encode: "select" },
        { events: "*:pointerup", encode: "release" },
      ],
    },
    {
      name: "tooltip",
      on: [
        { events: { type: "click", markname: "circles" }, update: "item()" },
      ],
    },
    {
      name: "clicked",
      on: [
        { events: { type: "click", markname: "circles" }, update: "datum" },
        {
          events: { type: "click", markname: "background" },
          update: "null",
        },
      ],
    },
    { name: "xrange", update: "[0, width]" },
    { name: "yrange", update: "[height, 0]" },
    {
      name: "anchor2",
      value: [0, 0],
      on: [
        {
          events: { type: "click", markname: "circles" },
          update:
            "tooltip ? [invert('xscale', (tooltip.bounds.x1 + tooltip.bounds.x2) / 2), invert('yscale', (tooltip.bounds.y1 + tooltip.bounds.y2) / 2)] : [0,0]",
        },
      ],
    },
    {
      name: "anchor3",
      value: [[], []],
      on: [
        {
          events: { type: "click", markname: "circles" },
          update:
            "tooltip ? [[invert('xscale', tooltip.bounds.x1), invert('xscale',tooltip.bounds.x2)], [invert('yscale', tooltip.bounds.y1), invert('yscale',tooltip.bounds.y2)]] : [0,0]",
        },
      ],
    },
    {
      name: "zoom",
      value: 1,
      on: [
        {
          events: [{ signal: "tEase" }, { signal: "clicked" }],
          update:
            "clicked ? pow(1.001, -tEase*100 * pow(16, 0)) : pow(1.001, tEase*100 * pow(16, 0))",
        },
      ],
    },
    {
      name: "xdom",
      update: "slice(xext)",
      on: [
        {
          events: { signal: "zoom" },
          update:
            "[anchor3[0][0] + (xdom[0] - anchor3[0][0]) * zoom, anchor3[0][1] + (xdom[1] - anchor3[0][1]) * zoom]",
        },
      ],
    },
    {
      name: "ydom",
      update: "slice(yext)",
      on: [
        {
          events: { signal: "zoom" },
          update:
            "[anchor3[1][1] + (ydom[0] - anchor3[1][1]) * zoom, anchor3[1][0] + (ydom[1] - anchor3[1][0]) * zoom]",
        },
      ],
    },
    // {"name": "size", "update": "[span(xdom), span(ydom), width*height]"}
    { name: "size", update: "pow((1/span(xdom)), 2)" },
  ],
  // pow(2*(datum['r'] * lerp([focus0['k'], k],tEase)),2)
  data: [
    {
      name: "points",
      values: [
        { u: 1, v: 1 },
        { u: 2, v: 1.5 },
        { u: 2, v: 3 },
        { u: 4, v: 1 },
        { u: 5, v: 5 },
        { u: 3, v: 2 },
      ],
      transform: [
        { type: "extent", field: "u", signal: "xext" },
        { type: "extent", field: "v", signal: "yext" },
      ],
    },
  ],
  scales: [
    {
      name: "xscale",
      zero: false,
      domain: { signal: "xdom" },
      range: { signal: "xrange" },
    },
    {
      name: "yscale",
      zero: false,
      domain: { signal: "ydom" },
      range: { signal: "yrange" },
    },
    {
      name: "sizescale",
      zero: false,
      // "domain": {"signal": "[0, 10]"},
      range: { signal: "[0, width*height]" },
    },
  ],
  axes: [
    { scale: "xscale", orient: "bottom" },
    { scale: "yscale", orient: "left" },
  ],
  marks: [
    {
      name: "background",
      description:
        "An ivisible rect that covers the entire canvas and sits behind everything",
      type: "rect",
      data: [{}],
      encode: {
        enter: {
          x: { signal: "-padding['left']" },
          y: { signal: "-padding['top']" },
          width: { signal: "width" },
          height: { signal: "height" },
          fillOpacity: { value: 0 },
        },
      },
    },
    {
      name: "circles",
      type: "symbol",
      from: { data: "points" },
      clip: true,
      encode: {
        enter: {
          fillOpacity: { value: 0.6 },
          fill: { value: "steelblue" },
        },
        update: {
          x: { scale: "xscale", field: "u" },
          y: { scale: "yscale", field: "v" },
          size: { signal: "size", scale: "sizescale" },
          tooltip: { signal: "tooltip" },
        },
        hover: { fill: { value: "firebrick" } },
        leave: { fill: { value: "steelblue" } },
      },
    },
  ],
};
