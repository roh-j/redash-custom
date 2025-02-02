import ColumnsSettings from "@/visualizations/custom-table/Editor/ColumnsSettings";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import GeneralSettings from "./GeneralSettings";
import getOptions from "@/visualizations/custom-table/getOptions";
import GridSettings from "@/visualizations/custom-table/Editor/GridSettings";
import StyleSettings from "./StyleSettings";

export default createTabbedEditor([
  { key: "General", title: "General", component: GeneralSettings },
  { key: "Style", title: "Style", component: StyleSettings },
  {
    key: "Columns",
    title: "Columns",
    component: ({ visualizationName, data, options, onOptionsChange }: any) =>
      ColumnsSettings({ visualizationName, options: getOptions(options, { columns: data.columns }), onOptionsChange }),
  },
  { key: "Grid", title: "Grid", component: GridSettings },
]);
