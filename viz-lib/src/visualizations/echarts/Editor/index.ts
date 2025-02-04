import ColumnsSettings from "@/visualizations/custom-table/Editor/ColumnsSettings";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import GeneralSettings from "./GeneralSettings";
import getOptions from "@/visualizations/custom-table/getOptions";
import GridSettings from "@/visualizations/custom-table/Editor/GridSettings";
import OptionsSettings from "./OptionsSettings";

export default createTabbedEditor([
  { key: "General", title: "General", component: GeneralSettings },
  { key: "Options", title: "Options", component: OptionsSettings },
  {
    key: "Columns",
    title: "Columns",
    component: ({ data, options, onOptionsChange }: any) => {
      return ColumnsSettings({ options: getOptions(options, { columns: data.columns }), onOptionsChange });
    },
  },
  { key: "Grid", title: "Grid", component: GridSettings },
]);
