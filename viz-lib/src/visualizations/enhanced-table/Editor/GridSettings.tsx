import React from "react";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { map } from "lodash";
import { Section, Select } from "@/components/visualizations/editor";

const ALLOWED_ITEM_PER_PAGE = [5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500];

export default function GridSettings({ options, onOptionsChange }: any) {
  return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    <Section>
      <Select
        label="Items per page"
        defaultValue={options.itemsPerPage}
        onChange={(itemsPerPage: any) => onOptionsChange({ itemsPerPage })}>
        {map(ALLOWED_ITEM_PER_PAGE, value => (
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
          <Select.Option key={`ipp${value}`} value={value}>
            {value}
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
          </Select.Option>
        ))}
      </Select>
    </Section>
  );
}

GridSettings.propTypes = EditorPropTypes;
