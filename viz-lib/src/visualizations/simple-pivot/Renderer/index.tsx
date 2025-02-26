import EnhancedTableRenderer from "../../enhanced-table/Renderer";
import getOptions from "@/visualizations/enhanced-table/getOptions";
import React from "react";
import { getPivotCols, getPivotRows } from "../utils";
import { RendererPropTypes } from "@/visualizations/prop-types";

export default function Renderer({ data, options }: any) {
  const columns = getPivotCols({
    data,
    pivotRow: options.pivotRow,
    pivotCol: options.pivotCol,
    value: options.value,
  });
  const rows = getPivotRows({
    data,
    pivotRow: options.pivotRow,
    pivotCol: options.pivotCol,
    columns,
    value: options.value,
  });

  return <EnhancedTableRenderer data={{ columns, rows }} options={getOptions(options, { columns: columns })} />;
}

Renderer.propTypes = RendererPropTypes;
