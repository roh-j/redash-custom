import getOptions from "@/visualizations/table/getOptions";
import React from "react";
import TableRenderer from "../../table/Renderer";
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
    valueResultFormat: options.valueResultFormat,
    backgroundColor: options.backgroundColor,
    opacityRangeMin: options.opacityRangeMin,
    opacityRangeMax: options.opacityRangeMax,
  });

  return <TableRenderer data={{ columns, rows }} options={getOptions(options, { columns: columns })} />;
}

Renderer.propTypes = RendererPropTypes;
