import AppearanceSettings from "@/visualizations/enhanced-table/Editor/AppearanceSettings";
import ColumnsSettings from "@/visualizations/enhanced-table/Editor/ColumnsSettings";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import GeneralSettings from "./GeneralSettings";
import getOptions from "@/visualizations/enhanced-table/getOptions";
import GridSettings from "@/visualizations/enhanced-table/Editor/GridSettings";
import OptionsSettings from "./OptionsSettings";

export default createTabbedEditor([
  { key: "General", title: "General", component: GeneralSettings },
  {
    key: "Options",
    title: "Options",
    component: ({ data, options, onOptionsChange }: any) => {
      return OptionsSettings({ options: getOptions(options, { columns: data.columns }), onOptionsChange });
    },
  },
  { key: "Table Appearance", title: "Table Appearance", component: AppearanceSettings },
  {
    key: "Columns",
    title: "Columns",
    component: ({ data, options, onOptionsChange }: any) => {
      return ColumnsSettings({ options: getOptions(options, { columns: data.columns }), onOptionsChange });
    },
  },
  { key: "Grid", title: "Grid", component: GridSettings },
]);
