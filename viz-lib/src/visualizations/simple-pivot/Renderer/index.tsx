import getOptions from "@/visualizations/table/getOptions";
import React, { useEffect, useState } from "react";
import TableRenderer from "../../table/Renderer";
import { getPivotCols, getPivotRows } from "../utils";
import { RendererPropTypes } from "@/visualizations/prop-types";

export default function Renderer({ data, options }: any) {
  const [columns, setColumns] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const newColumns = getPivotCols({
      data,
      pivotRow: options.pivotRow,
      pivotCol: options.pivotCol,
      value: options.value,
    });
    const newRows = getPivotRows({
      data,
      pivotRow: options.pivotRow,
      pivotCol: options.pivotCol,
      columns: newColumns,
      value: options.value,
      valueResultFormat: options.valueResultFormat,
      backgroundColor: options.backgroundColor,
      opacityRangeMin: options.opacityRangeMin,
      opacityRangeMax: options.opacityRangeMax,
    });

    setColumns(newColumns);
    setRows(newRows);
  }, [options]);

  return (
    <React.Fragment>
      {columns.length && rows.length ? (
        <TableRenderer data={{ columns, rows }} options={getOptions(options, { columns })} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

Renderer.propTypes = RendererPropTypes;
