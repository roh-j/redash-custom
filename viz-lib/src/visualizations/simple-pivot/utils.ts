import { Parser } from "expr-eval";

export function getPivotColumns({ data, pivotRow, pivotColumn, value }: any) {
  if (!(pivotRow && pivotColumn && value)) {
    return [];
  }

  const firstColumn = `${pivotRow}/${pivotColumn}`;
  const columnkey: any = {};
  let columns = [];

  const pivotColumnInfo = data.columns.find((item: any) => item.name === pivotColumn);
  const pivotRowInfo = data.columns.find((item: any) => item.name === pivotRow);

  for (let item of data.rows) {
    const name = item[pivotColumnInfo.name];

    if (columnkey[name]) {
      continue;
    }

    columnkey[name] = true;

    columns.push({
      name: name,
      friendly_name: name,
      type: "integer",
    });
  }

  return [
    {
      name: firstColumn,
      friendly_name: firstColumn,
      type: pivotRowInfo.type,
    },
    ...columns,
  ];
}

export function getPivotRows({ data, pivotRow, pivotColumn, columns, value }: any) {
  if (!(pivotRow && pivotColumn && value)) {
    return [];
  }

  const firstColumn = `${pivotRow}/${pivotColumn}`;
  let pivotCache: any = {};
  let rows = [];

  for (let row of data.rows) {
    let result: any = {};
    let isUnique = false;

    for (let column of columns) {
      if (column.name === `${pivotRow}/${pivotColumn}`) {
        result[column.name] = row[pivotRow];
        continue;
      }

      const uniqueCacheKey = `${row[pivotRow]}/${column.name}`;

      if (!pivotCache[uniqueCacheKey]) {
        isUnique = true;
      }

      try {
        const parser = new Parser();
        const compiledExpr = parser.parse(value);
        const variables: any = compiledExpr.variables();
        const parameter = variables.reduce((acc: any, key: any) => {
          acc[key] = key === "prev" ? pivotCache[uniqueCacheKey] || 0 : row[key];
          return acc;
        }, {});

        pivotCache[uniqueCacheKey] = Number(compiledExpr.evaluate(parameter));
      } catch (error) {}

      result[column.name] = pivotCache[uniqueCacheKey];
    }

    if (isUnique) {
      rows.push(result);
    } else {
      const findedIndex = rows.findIndex((item: any) => item[firstColumn] === row[pivotRow]);
      rows.splice(findedIndex, 1, result);
    }
  }

  return rows;
}
