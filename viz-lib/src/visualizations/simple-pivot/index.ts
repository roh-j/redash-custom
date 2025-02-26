import Editor from "./Editor";
import Renderer from "./Renderer";
import { merge } from "lodash";

const DEFAULT_OPTIONS = {
  pivotRow: "",
  pivotColumn: "",
};

export default {
  type: "SIMPLE_PIVOT",
  name: "Simple Pivot Table",
  getOptions: (options: any) => merge({}, DEFAULT_OPTIONS, options),
  Renderer,
  Editor,
};
