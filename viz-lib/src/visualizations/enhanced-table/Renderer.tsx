import InfoCircleFilledIcon from "@ant-design/icons/InfoCircleFilled";
import Input from "antd/lib/input";
import Popover from "antd/lib/popover";
import React, { useEffect, useMemo, useState } from "react";
import Table from "antd/lib/table";
import { filter, get, initial, last, map, reduce } from "lodash";
import { filterRows, initRows, prepareColumns, sortRows } from "./utils";
import { RendererPropTypes } from "@/visualizations/prop-types";

import "./renderer.less";

function joinColumns(array: any, separator = ", ") {
  return reduce(
    array,
    (result, item, index) => {
      // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'string' a... Remove this comment to see the full error message
      if (index > 0) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        result.push(separator);
      }
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      result.push(item);
      return result;
    },
    []
  );
}

function getSearchColumns(columns: any, { limit = Infinity, renderColumn = (col: any) => col.title } = {}) {
  const firstColumns = map(columns.slice(0, limit), col => renderColumn(col));
  const restColumns = map(columns.slice(limit), col => col.title);
  if (restColumns.length > 0) {
    return [...joinColumns(firstColumns), ` and ${restColumns.length} others`];
  }
  if (firstColumns.length > 1) {
    return [...joinColumns(initial(firstColumns)), ` and `, last(firstColumns)];
  }
  return firstColumns;
}

function SearchInputInfoIcon({ searchColumns }: any) {
  return (
    <Popover
      arrowPointAtCenter
      placement="topRight"
      content={
        <div className="enhanced-table-visualization-search-info-content">
          Search {getSearchColumns(searchColumns, { renderColumn: col => <code key={col.name}>{col.title}</code> })}
        </div>
      }>
      <InfoCircleFilledIcon className="enhanced-table-visualization-search-info-icon" />
    </Popover>
  );
}

type OwnSearchInputProps = {
  onChange?: (...args: any[]) => any;
};

type SearchInputProps = OwnSearchInputProps & typeof SearchInput.defaultProps;

// @ts-expect-error ts-migrate(2339) FIXME: Property 'searchColumns' does not exist on type 'S... Remove this comment to see the full error message
function SearchInput({ searchColumns, ...props }: SearchInputProps) {
  if (searchColumns.length <= 0) {
    return null;
  }

  const searchColumnsLimit = 3;
  return (
    <Input.Search
      {...props}
      placeholder={`Search ${getSearchColumns(searchColumns, { limit: searchColumnsLimit }).join("")}...`}
      suffix={searchColumns.length > searchColumnsLimit ? <SearchInputInfoIcon searchColumns={searchColumns} /> : null}
    />
  );
}

SearchInput.defaultProps = {
  onChange: () => {},
};

export default function Renderer({ data, options, selected, setSelected, setRuleResultRows }: any) {
  const [conditionalFormattingActive, setConditionalFormattingActive] = useState(false);
  const [multiSelectActive, setMultiSelectActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState([]);

  const ruleResultCacheRows: any = [...data.rows];

  const searchColumns = useMemo(() => filter(options.columns, "allowSearch"), [options.columns]);

  const tableColumns = useMemo(() => {
    const searchInput =
      searchColumns.length > 0 ? (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(event: any) => void' is not assignable to t... Remove this comment to see the full error message
        <SearchInput searchColumns={searchColumns} onChange={(event: any) => setSearchTerm(event.target.value)} />
      ) : null;
    return prepareColumns(
      ruleResultCacheRows,
      options.conditionalFormattingEnabled,
      options.conditionalFormattingLabel,
      conditionalFormattingActive,
      (newConditionalFormattingActive: any) => {
        setConditionalFormattingActive(newConditionalFormattingActive);
      },
      options.selection?.multiSelectEnabled,
      options.selection?.multiSelectLabel,
      multiSelectActive,
      (newMultiSelectActive: any) => {
        setSelected(
          options.selectableColumns.includes(options.selection.defaultSelection)
            ? [options.selection.defaultSelection]
            : []
        );
        setMultiSelectActive(newMultiSelectActive);
      },
      options.columns,
      options.selectableColumns,
      selected,
      searchInput,
      orderBy,
      (newOrderBy: any) => {
        setOrderBy(newOrderBy);
        // Remove text selection - may occur accidentally
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.getSelection().removeAllRanges();
      },
      (columnName: any) => {
        if (!selected) {
          return;
        }

        let newSelected = selected.includes(columnName)
          ? selected.filter((item: any) => item !== columnName)
          : multiSelectActive
          ? [...selected, columnName]
          : [columnName];

        if (newSelected.length === 0 && options.selectableColumns.includes(options.selection.defaultSelection)) {
          newSelected = [options.selection.defaultSelection];
        }

        setSelected(newSelected);
      }
    );
  }, [conditionalFormattingActive, multiSelectActive, options.columns, searchColumns, orderBy]);

  const preparedRows = useMemo(() => sortRows(filterRows(initRows(data.rows), searchTerm, searchColumns), orderBy), [
    data.rows,
    searchTerm,
    searchColumns,
    orderBy,
  ]);

  useEffect(() => {
    if (options.selection?.bindingRuleResultEnabled) {
      setTimeout(() => {
        setRuleResultRows(ruleResultCacheRows);
      }, 10);
    }
  }, [data, options.selection?.bindingRuleResultEnabled, conditionalFormattingActive]);

  useEffect(() => {
    setConditionalFormattingActive(!!options.conditionalFormattingChecked);
  }, [options.conditionalFormattingChecked]);

  useEffect(() => {
    setConditionalFormattingActive(options.conditionalFormattingEnabled && !!options.conditionalFormattingChecked);
  }, [options.conditionalFormattingEnabled]);

  useEffect(() => {
    if (!options.selection?.multiSelectEnabled) {
      setMultiSelectActive(false);
    }
  }, [options.selection?.multiSelectEnabled]);

  // If data or config columns change - reset sorting
  useEffect(() => {
    setOrderBy([]);
  }, [options.columns, data.columns]);

  if (data.rows.length === 0) {
    return null;
  }

  return (
    <div className="enhanced-table-visualization-container">
      <Table
        className="enhanced-table-fixed-header"
        data-percy="show-scrollbars"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; dataIndex: string; align: any; s... Remove this comment to see the full error message
        columns={tableColumns}
        dataSource={preparedRows}
        pagination={{
          size: get(options, "paginationSize", ""),
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'TablePagi... Remove this comment to see the full error message
          position: "bottom",
          pageSize: options.itemsPerPage,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        showSorterTooltip={false}
      />
    </div>
  );
}

Renderer.propTypes = RendererPropTypes;
