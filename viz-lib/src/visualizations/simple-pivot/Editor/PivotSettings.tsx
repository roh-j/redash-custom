import React from "react";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { filter, flatten, isString, map, merge, sortBy, uniq } from "lodash";
import { Section, Select } from "@/components/visualizations/editor";

export default function PivotSettings({ options, onOptionsChange }: any) {
  const updateOptions = (updates: any) => {
    onOptionsChange(merge({}, options, updates));
  };

  const availableColumns = map(options.columns, (c: any) => c.name);
  const columns = sortBy(filter(uniq(flatten([availableColumns])), (v: any) => isString(v) && v !== ""));

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          label="Row"
          mode="default"
          allowClear
          showSearch
          placeholder="Choose column..."
          value={options.pivotRow || undefined}
          onChange={(column: any) => updateOptions({ columns: [], pivotRow: column || "" })}>
          {map(columns, (c: any) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={c} value={c}>
              {c}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          label="Column"
          mode="default"
          allowClear
          showSearch
          placeholder="Choose column..."
          value={options.pivotColumn || undefined}
          onChange={(column: any) => updateOptions({ columns: [], pivotColumn: column || "" })}>
          {map(columns, (c: any) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={c} value={c}>
              {c}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          label="Value"
          mode="default"
          allowClear
          showSearch
          placeholder="Choose column..."
          value={options.value || undefined}
          onChange={(column: any) => updateOptions({ columns: [], value: column || "" })}>
          {map(columns, (c: any) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={c} value={c}>
              {c}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>
    </React.Fragment>
  );
}

PivotSettings.propTypes = EditorPropTypes;
