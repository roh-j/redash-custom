import EnhancedTableRenderer from "../../enhanced-table/Renderer";
import getOptions from "@/visualizations/enhanced-table/getOptions";
import React from "react";
import { getPivotColumns, getPivotRows } from "../utils";
import { RendererPropTypes } from "@/visualizations/prop-types";

export default function Renderer({ data, options }: any) {
  const columns = getPivotColumns({
    data,
    pivotRow: options.pivotRow,
    pivotColumn: options.pivotColumn,
    value: options.value,
  });
  const rows = getPivotRows({
    data,
    pivotRow: options.pivotRow,
    pivotColumn: options.pivotColumn,
    columns,
    value: options.value,
  });

  return <EnhancedTableRenderer data={{ columns, rows }} options={getOptions(options, { columns: columns })} />;
}

Renderer.propTypes = RendererPropTypes;
