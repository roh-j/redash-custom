import Editor from "./Editor";
import Renderer from "./Renderer";
import { merge } from "lodash";

const DEFAULT_OPTIONS = {
  echartsOptions: "",
  table: {
    enabled: false,
  },
  defaultConditionalFormattingEnabled: false,
  selectableColumns: [],
  selection: {
    multiSelectEnabled: false,
    defaultSelection: "",
  },
  height: "",
};

export default {
  type: "ECHARTS",
  name: "ECharts",
  getOptions: (options: any) => merge({}, DEFAULT_OPTIONS, options),
  Renderer,
  Editor,
};
