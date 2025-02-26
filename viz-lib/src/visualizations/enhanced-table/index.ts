import Editor from "./Editor";
import getOptions from "./getOptions";
import Renderer from "./Renderer";

export default {
  type: "ENHANCED_TABLE",
  name: "Enhanced Table",
  getOptions,
  Renderer,
  Editor,

  autoHeight: true,
  defaultRows: 14,
  defaultColumns: 3,
  minColumns: 2,
};
