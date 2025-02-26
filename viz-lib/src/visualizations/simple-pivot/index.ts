import Editor from "./Editor";
import Renderer from "./Renderer";
import { merge } from "lodash";

const DEFAULT_OPTIONS = {
  pivotCol: "",
  pivotRow: "",
  value: "",
  valueResultFormat: "0,0",
  backgroundColor: "FFFFFF",
  opacityRangeMin: 0,
  opacityRangeMax: 1,
};

export default {
  type: "SIMPLE_PIVOT",
  name: "Simple Pivot Table",
  getOptions: (options: any) => merge({}, DEFAULT_OPTIONS, options),
  Renderer,
  Editor,
};
