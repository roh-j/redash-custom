import * as Grid from "antd/lib/grid";
import ColorPalette from "@/visualizations/ColorPalette";
import React from "react";
import { ColorPicker, Input, InputNumber, Section, Select } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { filter, flatten, isString, map, merge, sortBy, toNumber, uniq } from "lodash";

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
          label="Col"
          mode="default"
          allowClear
          showSearch
          placeholder="Choose column..."
          value={options.pivotCol || undefined}
          onChange={(col: any) => updateOptions({ columns: [], pivotCol: col || "" })}>
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
        <Input
          label="Value"
          defaultValue={options.value}
          onChange={(event: any) => updateOptions({ value: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <ColorPicker
          layout="horizontal"
          label="Background Color"
          interactive
          placement="topLeft"
          presetColors={ColorPalette}
          color={options.backgroundColor}
          onChange={(backgroundColor: any) => updateOptions({ backgroundColor })}
          addonAfter={
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
            <ColorPicker.Label color={options.backgroundColor} presetColors={ColorPalette} />
          }
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; gutter: number; type:... Remove this comment to see the full error message */}
        <Grid.Row gutter={15} type="flex" align="middle">
          <Grid.Col span={12}>
            <InputNumber
              label="Opacity Min Value"
              defaultValue={toNumber(options.opacityRangeMin)}
              onChange={(value: any) => updateOptions({ opacityRangeMin: toNumber(value) })}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <InputNumber
              label="Opacity Max Value"
              defaultValue={toNumber(options.opacityRangeMax)}
              onChange={(value: any) => updateOptions({ opacityRangeMax: toNumber(value) })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section>
    </React.Fragment>
  );
}

PivotSettings.propTypes = EditorPropTypes;
