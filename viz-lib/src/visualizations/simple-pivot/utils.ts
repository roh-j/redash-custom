import hexRgb from "hex-rgb";
import { createNumberFormatter } from "@/lib/value-format";
import { Parser } from "expr-eval";
import "moment/locale/ko";

export function getPivotCols({ data, pivotRow, pivotCol, value }: any) {
  if (!(pivotRow && pivotCol && value)) {
    return [];
  }

  let columns = [];
  const axisLabel = `${pivotRow}/${pivotCol}`;
  const uniqueColLabel: any = {};

  const pivotColData = data.columns.find((item: any) => item.name === pivotCol);
  const pivotRowData = data.columns.find((item: any) => item.name === pivotRow);

  for (let row of data.rows) {
    let colLabel = "";

    if (pivotColData.type === "datetime") {
      colLabel = row[pivotColData.name].locale("ko").format("YYYY-MM-DD (dd)");
    } else {
      colLabel = row[pivotColData.name].toString();
    }

    if (uniqueColLabel[colLabel]) {
      continue;
    }

    uniqueColLabel[colLabel] = true;

    columns.push({
      name: colLabel,
      friendly_name: colLabel,
      type: "string",
    });
  }

  return [
    {
      name: axisLabel,
      friendly_name: axisLabel,
      type: pivotRowData.type,
    },
    ...columns,
  ];
}

export function getPivotRows({
  data,
  pivotRow,
  pivotCol,
  columns,
  value,
  valueResultFormat,
  backgroundColor,
  opacityRangeMin,
  opacityRangeMax,
}: any) {
  if (!(pivotRow && pivotCol && columns && value)) {
    return [];
  }

  let valueCache: any = {};
  let rows = [];
  const axisLabel = `${pivotRow}/${pivotCol}`;

  for (let row of data.rows) {
    let cache: any = {};
    let isUnique = false;

    for (let column of columns) {
      if (column.name === axisLabel) {
        cache[column.name] = row[pivotRow];
        continue;
      }

      const uniqueValueKey = `${row[pivotRow]}/${column.name}`;
      const pivotColData = data.columns.find((item: any) => item.name === pivotCol);

      if (valueCache[uniqueValueKey] === undefined) {
        isUnique = true;
      }

      if (
        (pivotColData.type === "datetime" && row[pivotCol].locale("ko").format("YYYY-MM-DD (dd)") === column.name) ||
        row[pivotCol].toString() === column.name
      ) {
        try {
          const parser = new Parser();
          const compiledExpr = parser.parse(value);
          const variables: any = compiledExpr.variables();
          const parameter = variables.reduce((acc: any, key: any) => {
            acc[key] = row[key];
            return acc;
          }, {});

          valueCache[uniqueValueKey] = Number(
            compiledExpr.evaluate({ ...parameter, acc: valueCache[uniqueValueKey] || 0 })
          );
        } catch (error) {
          valueCache[uniqueValueKey] = 0;
        }
      } else {
        valueCache[uniqueValueKey] = valueCache[uniqueValueKey] || 0;
      }

      const format = createNumberFormatter(valueResultFormat);
      const style = getBackgroundColor({
        valueResult: valueCache[uniqueValueKey],
        backgroundColor,
        opacityRangeMin,
        opacityRangeMax,
      });

      cache[column.name] = `
        <div style="background-color: ${
          style.backgroundColor
        }; position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></div>
        <span style="position: relative; color: #000000;">${format(valueCache[uniqueValueKey])}</span>
      `;
    }

    if (isUnique) {
      rows.push(cache);
    } else {
      const findedIndex = rows.findIndex((item: any) => item[axisLabel] === row[pivotRow]);
      rows.splice(findedIndex, 1, cache);
    }
  }

  return rows;
}

function getBackgroundColor({ valueResult, backgroundColor, opacityRangeMin, opacityRangeMax }: any) {
  const { red, green, blue } = hexRgb(backgroundColor);
  let opacity = 0;

  if (valueResult >= opacityRangeMax) {
    opacity = 1;
  }
  if (valueResult > opacityRangeMin && valueResult < opacityRangeMax) {
    opacity = (valueResult - opacityRangeMin) / (opacityRangeMax - opacityRangeMin);
  }

  return { backgroundColor: `rgba(${red}, ${green}, ${blue}, ${opacity})` };
}
