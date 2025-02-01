import Editor from "./Editor";
import Renderer from "./Renderer";
import { merge } from "lodash";

const DEFAULT_OPTIONS = {
  echartsOptions: "",
  selectableColumns: [],
  table: {
    enabled: false,
  },
};

export default {
  type: "ECHARTS",
  name: "ECharts",
  getOptions: (options: any) => merge({}, DEFAULT_OPTIONS, options),
  Renderer,
  Editor,
};
