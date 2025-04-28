import Checkbox from "antd/lib/checkbox";
import ColumnTypes from "./columns";
import cx from "classnames";
import hexRgb from "hex-rgb";
import React from "react";
import Tooltip from "antd/lib/tooltip";
import { each, filter, findIndex, get, isNil, map, some, sortBy, toString } from "lodash";
import { Parser } from "expr-eval";

function nextOrderByDirection(direction: any) {
  switch (direction) {
    case "ascend":
      return "descend";
    case "descend":
      return null;
    default:
      return "ascend";
  }
}

function toggleOrderBy(columnName: any, orderBy = [], multiColumnSort = false) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
  const index = findIndex(orderBy, i => i.name === columnName);
  const item = { name: columnName, direction: "ascend" };
  if (index >= 0) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    item.direction = nextOrderByDirection(orderBy[index].direction);
  }

  if (multiColumnSort) {
    if (!item.direction) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
      return filter(orderBy, i => i.name !== columnName);
    }
    if (index >= 0) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: any; direction: string; }' is not as... Remove this comment to see the full error message
      orderBy[index] = item;
    } else {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ name: any; direction: string; ... Remove this comment to see the full error message
      orderBy.push(item);
    }
    return [...orderBy];
  }
  return item.direction ? [item] : [];
}

function getOrderByInfo(orderBy: any) {
  const result = {};
  each(orderBy, ({ name, direction }, index) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result[name] = { direction, index: index + 1 };
  });
  return result;
}

function getConditionalFormattingRuleResult(column: any, record: any) {
  const rule = column.conditionalFormatting.rule;
  let result = 0;

  try {
    const parser = new Parser();
    const compiledExpr = parser.parse(rule);
    const variables: any = compiledExpr.variables();
    const parameter = variables.reduce((acc: any, key: any) => {
      acc[key] = record[key];
      return acc;
    }, {});

    result = Number(compiledExpr.evaluate(parameter));
  } catch (error) {}

  return result;
}

function isValidConditionalFormatting(column: any, conditionalFormattingActive: boolean) {
  const enabled = column.conditionalFormatting.enabled;
  const backgroundColor = column.conditionalFormatting.backgroundColor;

  return enabled && backgroundColor && conditionalFormattingActive;
}

function getConditionalFormattingStyle(column: any, record: any, conditionalFormattingActive: boolean) {
  if (!isValidConditionalFormatting(column, conditionalFormattingActive)) {
    return {};
  }

  const { red, green, blue } = hexRgb(column.conditionalFormatting.backgroundColor);
  let opacity = 0;

  const ruleResult = getConditionalFormattingRuleResult(column, record);
  const opacityRangeMin = column.conditionalFormatting.opacityRangeMin;
  const opacityRangeMax = column.conditionalFormatting.opacityRangeMax;

  if (ruleResult >= opacityRangeMax) {
    opacity = 1;
  }
  if (ruleResult > opacityRangeMin && ruleResult < opacityRangeMax) {
    opacity = (ruleResult - opacityRangeMin) / (opacityRangeMax - opacityRangeMin);
  }

  return { backgroundColor: `rgba(${red}, ${green}, ${blue}, ${opacity})`, color: "#000000" };
}

export function prepareColumns(
  conditionalFormattingEnabled: any,
  conditionalFormattingLabel: any,
  conditionalFormattingActive: any,
  onConditionalFormattingActiveChange: any,
  multiSelectEnabled: any,
  multiSelectLabel: any,
  multiSelectActive: any,
  onMultiSelectEnabledChange: any,
  columns: any,
  selectableColumns: any,
  selected: any,
  searchInput: any,
  orderBy: any,
  onOrderByChange: any,
  onColumnClick: any
) {
  columns = filter(columns, "visible");
  columns = sortBy(columns, "order");

  const isMultiColumnSort = orderBy.length > 1;
  const orderByInfo = getOrderByInfo(orderBy);

  let tableColumns = map(columns, column => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const isAscend = orderByInfo[column.name] && orderByInfo[column.name].direction === "ascend";
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const isDescend = orderByInfo[column.name] && orderByInfo[column.name].direction === "descend";

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const sortColumnIndex = isMultiColumnSort && orderByInfo[column.name] ? orderByInfo[column.name].index : null;

    function getSelectableColumnStyle(columnName: any) {
      if (!selectableColumns || !selectableColumns.find((item: any) => item === columnName)) {
        return {};
      }
      if (selected && selected.find((item: any) => item === columnName)) {
        return { borderBottom: "2px solid #2196f3" };
      }
      return { borderBottom: "2px solid #767676" };
    }

    const result = {
      key: column.name,
      dataIndex: `record[${JSON.stringify(column.name)}]`,
      align: column.alignContent,
      sorter: { multiple: 1 }, // using { multiple: 1 } to allow built-in multi-column sort arrows
      sortOrder: get(orderByInfo, [column.name, "direction"], null),
      title: (
        <React.Fragment>
          <Tooltip
            placement="top"
            title={
              column.description ? (
                <>
                  {column.description.split("\\n").map((str: string) => (
                    <div>{str}</div>
                  ))}
                </>
              ) : (
                column.title
              )
            }>
            <div
              className="enhanced-table-visualization-heading"
              data-sort-column-index={sortColumnIndex}
              onClick={(event: any) => {
                if (event) {
                  event.preventDefault();
                  event.stopPropagation();
                }

                if (selectableColumns && selectableColumns.find((item: any) => item === column.name)) {
                  onColumnClick(column.name);
                }
              }}
              style={getSelectableColumnStyle(column.name)}>
              {column.title}
            </div>
          </Tooltip>
        </React.Fragment>
      ),
      onHeaderCell: () => ({
        className: cx({
          "enhanced-table-visualization-column-is-sorted": isAscend || isDescend,
        }),
        onClick: (event: any) => onOrderByChange(toggleOrderBy(column.name, orderBy, event.shiftKey)),
      }),
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const initColumn = ColumnTypes[column.displayAs];
    const Component = initColumn(column);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'render' does not exist on type '{ key: a... Remove this comment to see the full error message
    result.render = (unused: any, row: any) => {
      let ruleResult: any = {};
      let rowRecord = { ...row.record };

      if (rowRecord[column.name] !== null && isValidConditionalFormatting(column, conditionalFormattingActive)) {
        const value = getConditionalFormattingRuleResult(column, row.record);

        if (column.conditionalFormatting.showColumnWithRuleResult) {
          ruleResult[column.name] = value;
        }
        if (column.conditionalFormatting.replaceColumnWithRuleResult) {
          rowRecord[column.name] = value;
        }
      }

      return {
        children: (
          <Component
            row={rowRecord}
            conditionalFormattingActive={conditionalFormattingActive}
            ruleResultFormat={column.conditionalFormatting.ruleResultFormat}
            ruleResult={ruleResult}
          />
        ),
        props: {
          className: `display-as-${column.displayAs}`,
          style: getConditionalFormattingStyle(column, row.record, conditionalFormattingActive),
        },
      };
    };

    return result;
  });

  tableColumns.push({
    key: "###Redash::Visualizations::EnhancedTable::Spacer###",
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string'.
    dataIndex: null,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Element'.
    title: "",
    className: "enhanced-table-visualization-spacer",
    render: () => "",
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClick' is missing in type '{ className... Remove this comment to see the full error message
    onHeaderCell: () => ({ className: "enhanced-table-visualization-spacer" }),
  });

  if (searchInput) {
    // Add searchInput as the ColumnGroup for all table columns
    tableColumns = [
      {
        key: "enhanced-table-search",
        title: searchInput,
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClick' is missing in type '{ className... Remove this comment to see the full error message
        onHeaderCell: () => ({ className: "enhanced-table-visualization-search" }),
        children: tableColumns,
      },
    ];
  }

  if (conditionalFormattingEnabled || multiSelectEnabled) {
    tableColumns = [
      {
        key: "enhanced-table-toolbar",
        title: (
          <span className="enhanced-table-visualization-toolbar-checkbox">
            {conditionalFormattingEnabled && (
              <Checkbox
                checked={conditionalFormattingActive}
                onChange={e => {
                  onConditionalFormattingActiveChange(e.target.checked);
                }}>
                {conditionalFormattingLabel || "Conditional formatting"}
              </Checkbox>
            )}
            {multiSelectEnabled && (
              <Checkbox
                checked={multiSelectActive}
                onChange={e => {
                  onMultiSelectEnabledChange(e.target.checked);
                }}>
                {multiSelectLabel || "Multi Select"}
              </Checkbox>
            )}
          </span>
        ),
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClick' is missing in type '{ className... Remove this comment to see the full error message
        onHeaderCell: () => ({ className: "enhanced-table-visualization-toolbar" }),
        children: tableColumns,
      },
    ];
  }

  return tableColumns;
}

export function initRuleResultRows(conditionalFormattingActive: boolean, columns: any, rows: any) {
  columns = filter(columns, "visible");
  columns = sortBy(columns, "order");

  const ruleResultRows = [...rows];

  map(columns, column => {
    let ruleResultRecord: any = {};

    map(rows, (record: any, index: any) => {
      if (record[column.name] !== null && isValidConditionalFormatting(column, conditionalFormattingActive)) {
        const value = getConditionalFormattingRuleResult(column, record);
        ruleResultRecord[column.name] = value;
      }
      ruleResultRows[index] = { ...ruleResultRows[index], ...ruleResultRecord };
    });
  });

  return ruleResultRows;
}

export function initRows(rows: any) {
  return map(rows, (record, index) => ({ key: `record${index}`, record }));
}

export function filterRows(rows: any, searchTerm: any, searchColumns: any) {
  if (searchTerm !== "" && searchColumns.length > 0) {
    searchTerm = searchTerm.toUpperCase();
    const matchFields = map(searchColumns, column => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const initColumn = ColumnTypes[column.displayAs];
      const { prepareData } = initColumn(column);
      return (row: any) => {
        const { text } = prepareData(row);
        return (
          toString(text)
            .toUpperCase()
            .indexOf(searchTerm) >= 0
        );
      };
    });

    return filter(rows, row => some(matchFields, match => match(row.record)));
  }
  return rows;
}

export function sortRows(
  conditionalFormattingActive: boolean,
  columns: any,
  ruleResultRows: any,
  rows: any,
  orderBy: any
) {
  if (orderBy.length === 0 || rows.length === 0) {
    return rows;
  }

  const directions = { ascend: 1, descend: -1 };
  let replaceColumnWithRuleResult = false;

  for (const column of columns) {
    if (column.name === orderBy[0].name) {
      replaceColumnWithRuleResult = column?.conditionalFormatting?.replaceColumnWithRuleResult;
    }
  }

  // Create a copy of array before sorting, because .sort() will modify original array
  const sortedRows = (conditionalFormattingActive && replaceColumnWithRuleResult
    ? [...ruleResultRows]
    : [...rows]
  ).sort((a: any, b: any) => {
    let va;
    let vb;
    va = a.record[orderBy[0].name];
    vb = b.record[orderBy[0].name];
    if (isNil(va) || va < vb) {
      // if a < b - we should return -1, but take in account direction
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return -1 * directions[orderBy[0].direction];
    }
    if (va > vb || isNil(vb)) {
      // if a > b - we should return 1, but take in account direction
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return 1 * directions[orderBy[0].direction];
    }
    return 0;
  });

  return conditionalFormattingActive && replaceColumnWithRuleResult
    ? sortedRows.map((item: any) => rows[item.key.replace("record", "")])
    : sortedRows;
}
