import AppearanceSettings from "@/visualizations/enhanced-table/Editor/AppearanceSettings";
import ColumnsSettings from "@/visualizations/enhanced-table/Editor/ColumnsSettings";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import getOptions from "@/visualizations/enhanced-table/getOptions";
import GridSettings from "@/visualizations/enhanced-table/Editor/GridSettings";
import PivotSettings from "./PivotSettings";
import { getPivotCols } from "../utils";

export default createTabbedEditor([
  {
    key: "Pivot",
    title: "Pivot",
    component: ({ data, options, onOptionsChange }: any) => {
      return PivotSettings({ options: getOptions(options, { columns: data.columns }), onOptionsChange });
    },
  },
  { key: "Appearance", title: "Appearance", component: AppearanceSettings },
  {
    key: "Columns",
    title: "Columns",
    component: ({ data, options, onOptionsChange }: any) => {
      const columns = getPivotCols({
        data,
        pivotRow: options.pivotRow,
        pivotCol: options.pivotCol,
        value: options.value,
      });

      return ColumnsSettings({ options: getOptions(options, { columns: columns }), onOptionsChange });
    },
  },
  { key: "Grid", title: "Grid", component: GridSettings },
]);
