import React from "react";
import { merge } from "lodash";
import { Section } from "@/components/visualizations/editor";
import { Switch } from "antd";

export default function TableSettings({ options, data, visualizationName, onOptionsChange }: any) {
  const updateOptions = (updates: any) => {
    onOptionsChange(merge({}, options, updates));
  };

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          id="echarts-show-table"
          defaultChecked={options.table.enabled}
          onChange={(enabled: any) => updateOptions({ table: { enabled: enabled } })}>
          Show Table
        </Switch>
      </Section>
    </React.Fragment>
  );
}
