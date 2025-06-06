import React from "react";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { filter, flatten, isString, map, merge, sortBy, uniq } from "lodash";
import { Input, Section, Select, Switch } from "@/components/visualizations/editor";

export default function OptionsSettings({ options, onOptionsChange }: any) {
  const updateOptions = (updates: any) => {
    onOptionsChange(merge({}, options, updates));
  };

  const availableColumns = map(options.columns, c => c.name);
  const columns = sortBy(filter(uniq(flatten([availableColumns])), (v: any) => isString(v) && v !== ""));

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section.Title>ECharts</Section.Title>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="Height"
          defaultValue={options.height}
          onChange={(event: any) => updateOptions({ height: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section.Title>Table Preference</Section.Title>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          checked={options.table.enabled}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
          onChange={(enabled: any) => updateOptions({ table: { ...options.table, enabled: enabled } })}>
          Show Table
        </Switch>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          checked={options.selection.multiSelectEnabled}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
          onChange={(enabled: any) =>
            updateOptions({ selection: { ...options.selection, multiSelectEnabled: enabled } })
          }>
          Enable Multi Select
        </Switch>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          checked={options.selection.bindingRuleResultEnabled}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
          onChange={(enabled: any) =>
            updateOptions({ selection: { ...options.selection, bindingRuleResultEnabled: enabled } })
          }>
          Binding Rule Result
        </Switch>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          label="Default Selection"
          mode="default"
          allowClear
          showSearch
          placeholder="Choose column..."
          value={options.selection.defaultSelection || undefined}
          onChange={(column: any) =>
            updateOptions({ selection: { ...options.selection, defaultSelection: column || "" } })
          }>
          {map(columns, c => (
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
          label="Multi Select Label"
          defaultValue={options.selection.multiSelectLabel}
          onChange={(event: any) =>
            updateOptions({ selection: { ...options.selection, multiSelectLabel: event.target.value } })
          }
        />
      </Section>
    </React.Fragment>
  );
}

OptionsSettings.propTypes = EditorPropTypes;
