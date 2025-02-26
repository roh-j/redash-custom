export function getPivotColumns({ data, pivotRow, pivotColumn, value }: any) {
  if (!(pivotRow && pivotColumn && value)) {
    return [];
  }

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
      type: pivotColumnInfo.type,
    });
  }

  return [
    {
      name: `${pivotRow}/${pivotColumn}`,
      friendly_name: `${pivotRow}/${pivotColumn}`,
      type: pivotRowInfo.type,
    },
    ...columns,
  ];
}

export function getPivotRows({ data, pivotRow, pivotColumn, columns, value }: any) {
  if (!(pivotRow && pivotColumn && value)) {
    return [];
  }

  let pivotCache: any = {};
  let rows = [];

  for (let item of data.rows) {
    let result: any = {};

    for (let column of columns) {
      if (column.name === `${pivotRow}/${pivotColumn}`) {
        result[column.name] = item[pivotRow];
        continue;
      }

      const uniqueCacheKey = `${item[pivotRow]}/${column.name}`;

      pivotCache[uniqueCacheKey] = pivotCache[uniqueCacheKey] || 0 + item[value];
      result[column.name] = pivotCache[uniqueCacheKey];
    }

    rows.push(result);
  }

  return rows;
}
