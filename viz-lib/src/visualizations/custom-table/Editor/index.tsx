import AppearanceSettings from "./AppearanceSettings";
import ColumnsSettings from "./ColumnsSettings";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import GridSettings from "./GridSettings";

import "./editor.less";

export default createTabbedEditor([
  { key: "Appearance", title: "Appearance", component: AppearanceSettings },
  { key: "Columns", title: "Columns", component: ColumnsSettings },
  { key: "Grid", title: "Grid", component: GridSettings },
]);
