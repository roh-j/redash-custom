import Checkbox from "antd/lib/checkbox";
import Collapse from "antd/lib/collapse";
import ColumnEditor from "./ColumnEditor";
import EyeInvisibleOutlinedIcon from "@ant-design/icons/EyeInvisibleOutlined";
import EyeOutlinedIcon from "@ant-design/icons/EyeOutlined";
import React from "react";
import Tooltip from "antd/lib/tooltip";
import Typography from "antd/lib/typography";
import { DragHandle, SortableContainer } from "@/components/sortable";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { map } from "lodash";
// @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../../node_modules/react-sortable-h... Remove this comment to see the full error message
import { sortableElement } from "react-sortable-hoc";

const { Text } = Typography;

const SortableItem = sortableElement(Collapse.Panel);

export default function ColumnsSettings({ options, onOptionsChange }: any) {
  function handleColumnChange(newColumn: any, event: any) {
    if (event) {
      event.stopPropagation();
    }
    const columns = map(options.columns, c => (c.name === newColumn.name ? newColumn : c));
    onOptionsChange({ columns });
  }

  function handleColumnsReorder({ oldIndex, newIndex }: any) {
    const columns = [...options.columns];
    columns.splice(newIndex, 0, ...columns.splice(oldIndex, 1));
    onOptionsChange({ columns });
  }

  function handleSelectableColumnChange(columnName: any, event: any) {
    if (event) {
      event.stopPropagation();
    }

    const findedIndex = options.selectableColumns.findIndex((item: any) => item === columnName);

    if (findedIndex !== -1) {
      options.selectableColumns.splice(findedIndex, 1);
    } else {
      options.selectableColumns.push(columnName);
    }
    onOptionsChange({ selectableColumns: options.selectableColumns });
  }

  return (
    <SortableContainer
      axis="y"
      lockAxis="y"
      useDragHandle
      helperClass="custom-table-editor-columns-dragged-item"
      helperContainer={(container: any) => container.firstChild}
      onSortEnd={handleColumnsReorder}
      containerProps={{
        className: "custom-table-visualization-editor-columns",
      }}>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message */}
      <Collapse bordered={false} defaultActiveKey={[]} expandIconPosition="right">
        {map(options.columns, (column, index) => (
          <SortableItem
            key={column.name}
            index={index}
            header={
              <React.Fragment>
                <DragHandle />
                <span>
                  {column.name}
                  {column.title !== "" && column.title !== column.name && (
                    <Text type="secondary" style={{ marginLeft: 5 }}>
                      <i>({column.title})</i>
                    </Text>
                  )}
                </span>
              </React.Fragment>
            }
            extra={
              <div
                style={{
                  ...(options.selectableColumns
                    ? {
                        display: "flex",
                        alignItems: "center",
                      }
                    : {}),
                }}>
                <Tooltip title="Toggle visibility" mouseEnterDelay={0} mouseLeaveDelay={0}>
                  {column.visible ? (
                    <EyeOutlinedIcon
                      onClick={event => handleColumnChange({ ...column, visible: !column.visible }, event)}
                    />
                  ) : (
                    <EyeInvisibleOutlinedIcon
                      onClick={event => handleColumnChange({ ...column, visible: !column.visible }, event)}
                    />
                  )}
                </Tooltip>
                {options.selectableColumns && (
                  <Tooltip title="Enable Selection">
                    <div className="m-l-10">
                      <Checkbox
                        checked={
                          options.selectableColumns &&
                          options.selectableColumns.find((item: any) => item === column.name)
                        }
                        onClick={event => handleSelectableColumnChange(column.name, event)}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            }>
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '(newColumn: any, event: any) => void' is not... Remove this comment to see the full error message */}
            <ColumnEditor column={column} onChange={handleColumnChange} />
          </SortableItem>
        ))}
      </Collapse>
    </SortableContainer>
  );
}

ColumnsSettings.propTypes = EditorPropTypes;
