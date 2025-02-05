import { map, keys, toNumber } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import {
  Section,
  Select,
  Input,
  Checkbox,
  TextAlignmentSelect,
  ColorPicker,
  InputNumber,
  ContextHelp,
} from "@/components/visualizations/editor";

import ColumnTypes from "../columns";
import ColorPalette from "@/visualizations/ColorPalette";

type OwnProps = {
  column: {
    name: string;
    title?: string;
    visible?: boolean;
    alignContent?: "left" | "center" | "right";
    displayAs?: any; // TODO: PropTypes.oneOf(keys(ColumnTypes))
    conditionalFormatting?: {
      enabled: boolean;
      showRuleResult: boolean;
      backgroundColor: string;
      rule: string;
      ruleResultFormat: string;
      opacityRangeMin: string;
      opacityRangeMax: string;
    };
  };
  onChange?: (...args: any[]) => any;
};

type Props = OwnProps & typeof ColumnEditor.defaultProps;

export default function ColumnEditor({ column, onChange }: Props) {
  function handleChange(changes: any) {
    onChange({ ...column, ...changes });
  }

  const [handleChangeDebounced] = useDebouncedCallback(handleChange, 200);

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const AdditionalOptions = ColumnTypes[column.displayAs].Editor || null;

  return (
    <div className="custom-table-visualization-editor-column">
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; gutter: number; type:... Remove this comment to see the full error message */}
        <Grid.Row gutter={15} type="flex" align="middle">
          <Grid.Col span={16}>
            <Input
              defaultValue={column.title}
              onChange={(event: any) => handleChangeDebounced({ title: event.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <TextAlignmentSelect
              defaultValue={column.alignContent}
              onChange={(event: any) => handleChange({ alignContent: event.target.value })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'allowSearch' does not exist on type '{ n... Remove this comment to see the full error message
          defaultChecked={column.allowSearch}
          onChange={event => handleChange({ allowSearch: event.target.checked })}>
          Use for search
        </Checkbox>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          checked={column.conditionalFormatting?.enabled}
          onChange={event =>
            handleChange({ conditionalFormatting: { ...column.conditionalFormatting, enabled: event.target.checked } })
          }>
          Conditional Formatting
        </Checkbox>
      </Section>

      {column.conditionalFormatting?.enabled && (
        <React.Fragment>
          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Checkbox
              defaultChecked={column.conditionalFormatting.showRuleResult}
              onChange={(event: any) =>
                handleChangeDebounced({
                  conditionalFormatting: { ...column.conditionalFormatting, showRuleResult: event.target.checked },
                })
              }>
              Show Rule Result
            </Checkbox>
          </Section>

          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <ColorPicker
              layout="horizontal"
              label="Background Color"
              interactive
              placement="topLeft"
              presetColors={ColorPalette}
              color={column.conditionalFormatting.backgroundColor}
              onChange={(backgroundColor: any) =>
                handleChange({
                  conditionalFormatting: { ...column.conditionalFormatting, backgroundColor: backgroundColor },
                })
              }
              addonAfter={
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                <ColorPicker.Label color={column.conditionalFormatting.backgroundColor} presetColors={ColorPalette} />
              }
            />
          </Section>

          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Input
              layout="horizontal"
              label="Rule"
              defaultValue={column.conditionalFormatting.rule}
              onChange={(event: any) =>
                handleChangeDebounced({
                  conditionalFormatting: { ...column.conditionalFormatting, rule: event.target.value },
                })
              }
            />
          </Section>

          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Input
              label={
                <React.Fragment>
                  Rule Result Format
                  <ContextHelp.NumberFormatSpecs />
                </React.Fragment>
              }
              defaultValue={column.conditionalFormatting.ruleResultFormat}
              onChange={(event: any) =>
                handleChangeDebounced({
                  conditionalFormatting: { ...column.conditionalFormatting, ruleResultFormat: event.target.value },
                })
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
                  defaultValue={toNumber(column.conditionalFormatting.opacityRangeMin)}
                  onChange={(value: any) =>
                    handleChange({
                      conditionalFormatting: { ...column.conditionalFormatting, opacityRangeMin: toNumber(value) },
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <InputNumber
                  label="Opacity Max Value"
                  defaultValue={toNumber(column.conditionalFormatting.opacityRangeMax)}
                  onChange={(value: any) =>
                    handleChange({
                      conditionalFormatting: { ...column.conditionalFormatting, opacityRangeMax: toNumber(value) },
                    })
                  }
                />
              </Grid.Col>
            </Grid.Row>
          </Section>
        </React.Fragment>
      )}

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="Description"
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'description' does not exist on type '{ n... Remove this comment to see the full error message
          defaultValue={column.description}
          onChange={(event: any) => handleChangeDebounced({ description: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          label="Display as:"
          defaultValue={column.displayAs}
          onChange={(displayAs: any) => handleChange({ displayAs })}>
          {map(ColumnTypes, ({ friendlyName }, key) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={key}>
              {friendlyName}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {AdditionalOptions && <AdditionalOptions column={column} onChange={handleChange} />}
    </div>
  );
}

ColumnEditor.defaultProps = {
  onChange: () => {},
};
