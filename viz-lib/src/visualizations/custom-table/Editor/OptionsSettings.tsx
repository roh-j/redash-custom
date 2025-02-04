import React from "react";
import { Input, Section, Switch } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

export default function OptionsSettings({ options, onOptionsChange }: any) {
  return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    <Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="Conditional Formatting Option Name"
          defaultValue={options.conditionalFormattingOptionName}
          onChange={(event: any) => onOptionsChange({ conditionalFormattingOptionName: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          checked={options.conditionalFormattingByDefaultEnabled}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
          onChange={(enabled: any) => onOptionsChange({ conditionalFormattingByDefaultEnabled: enabled })}>
          Enable Conditional Formatting by Default
        </Switch>
      </Section>
    </Section>
  );
}

OptionsSettings.propTypes = EditorPropTypes;
