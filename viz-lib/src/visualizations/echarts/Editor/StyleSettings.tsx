import React from "react";
import { merge } from "lodash";
import { Input, Section, Switch } from "@/components/visualizations/editor";

export default function StyleSettings({ options, onOptionsChange }: any) {
  const updateOptions = (updates: any) => {
    onOptionsChange(merge({}, options, updates));
  };

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="Height"
          defaultValue={options.height}
          onChange={(event: any) => updateOptions({ height: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          checked={options.table.enabled}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
          onChange={(enabled: any) => updateOptions({ table: { enabled: enabled } })}>
          Show Table
        </Switch>
      </Section>
    </React.Fragment>
  );
}
