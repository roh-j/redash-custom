import ColumnsSettings from "@/visualizations/table/Editor/ColumnsSettings";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import getOptions from "@/visualizations/table/getOptions";
import GridSettings from "@/visualizations/table/Editor/GridSettings";
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

      return ColumnsSettings({
        options: getOptions(options, {
          columns,
        }),
        onOptionsChange,
      });
    },
  },
  { key: "Grid", title: "Grid", component: GridSettings },
]);
