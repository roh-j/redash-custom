import Editor from "./Editor";
import Renderer from "./Renderer";
import { merge } from "lodash";

const DEFAULT_OPTIONS = {
  echartsOption: "",
  table: {
    enabled: false,
  },
  selectableColumns: [],
  selection: {
    multiSelectEnabled: false,
    defaultSelection: "",
    multiSelectLabel: "",
  },
  height: "300px",
};

export default {
  type: "ECHARTS",
  name: "ECharts",
  getOptions: (options: any) => merge({}, DEFAULT_OPTIONS, options),
  Renderer,
  Editor,
};
