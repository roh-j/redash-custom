import * as echarts from "echarts";

echarts.registerTheme("custom_theme", {
  color: [
    "#8C9EFF",
    "#90CAF9",
    "#80DEEA",
    "#80CBC4",
    "#A5D6A7",
    "#C5E1A5",
    "#E6EE9C",
    "#FFF59D",
    "#FFE082",
    "#FFCC80",
    "#FFAB91",
    "#FF8A65",
    "#EF9A9A",
    "#F48FB1",
    "#CE93D8",
    "#B39DDB",
    "#9FA8DA",
  ],
  backgroundColor: "#FFFFFF",
  textStyle: {},
  title: {
    textStyle: {
      color: "#000000",
    },
    subtextStyle: {
      color: "#000000",
    },
  },
  line: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 6,
    symbol: "emptyCircle",
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 6,
    symbol: "emptyCircle",
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: "#cccccc",
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
  },
  candlestick: {
    itemStyle: {
      color: "#FFAB91",
      color0: "#A5D6A7",
      borderColor: "#FFAB91",
      borderColor0: "#A5D6A7",
      borderWidth: 1,
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#cccccc",
    },
    lineStyle: {
      width: 1,
      color: "#aaaaaa",
    },
    symbolSize: 6,
    symbol: "emptyCircle",
    color: [
      "#8C9EFF",
      "#90CAF9",
      "#80DEEA",
      "#80CBC4",
      "#A5D6A7",
      "#C5E1A5",
      "#E6EE9C",
      "#FFF59D",
      "#FFE082",
      "#FFCC80",
      "#FFAB91",
      "#FF8A65",
      "#EF9A9A",
      "#F48FB1",
      "#CE93D8",
      "#B39DDB",
      "#9FA8DA",
    ],
    label: {
      color: "#000000",
    },
  },
  map: {
    itemStyle: {
      areaColor: "#f5f5f5",
      borderColor: "#cccccc",
      borderWidth: 0.5,
    },
    label: {
      color: "#000000",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255, 204, 128, 0.8)",
        borderColor: "#cccccc",
        borderWidth: 1,
      },
      label: {
        color: "#000000",
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: "#f5f5f5",
      borderColor: "#cccccc",
      borderWidth: 0.5,
    },
    label: {
      color: "#000000",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255, 204, 128, 0.8)",
        borderColor: "#cccccc",
        borderWidth: 1,
      },
      label: {
        color: "#000000",
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisLabel: {
      show: true,
      color: "#000000",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisLabel: {
      show: true,
      color: "#000000",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisLabel: {
      show: true,
      color: "#000000",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisLabel: {
      show: true,
      color: "#000000",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: "#999999",
    },
    emphasis: {
      iconStyle: {
        borderColor: "#666666",
      },
    },
  },
  legend: {
    textStyle: {
      color: "#000000",
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: "#cccccc",
        width: 1,
      },
      crossStyle: {
        color: "#cccccc",
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: "#9FA8DA",
      width: 2,
    },
    itemStyle: {
      color: "#9FA8DA",
      borderWidth: 1,
    },
    controlStyle: {
      color: "#9FA8DA",
      borderColor: "#9FA8DA",
      borderWidth: 1,
    },
    checkpointStyle: {
      color: "#FFAB91",
      borderColor: "#ffffff",
    },
    label: {
      color: "#000000",
    },
    emphasis: {
      itemStyle: {
        color: "#FFAB91",
      },
      controlStyle: {
        color: "#FFAB91",
        borderColor: "#FFAB91",
        borderWidth: 1,
      },
      label: {
        color: "#000000",
      },
    },
  },
  visualMap: {
    color: ["#9FA8DA", "#FFAB91", "#FFF59D"],
  },
  dataZoom: {
    handleSize: "undefined%",
    textStyle: {},
  },
  markPoint: {
    label: {
      color: "#000000",
    },
    emphasis: {
      label: {
        color: "#000000",
      },
    },
  },
});
