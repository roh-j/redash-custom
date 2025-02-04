import React from "react";
import HtmlContent from "@/components/HtmlContent";
import { Section, Checkbox } from "@/components/visualizations/editor";
import { createNumberFormatter, createTextFormatter } from "@/lib/value-format";

type Props = {
  column: {
    name: string;
    allowHTML?: boolean;
    highlightLinks?: boolean;
  };
  onChange: (...args: any[]) => any;
};

function Editor({ column, onChange }: Props) {
  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          data-test="CustomTable.ColumnEditor.Text.AllowHTML"
          checked={column.allowHTML}
          onChange={event => onChange({ allowHTML: event.target.checked })}>
          Allow HTML content
        </Checkbox>
      </Section>

      {column.allowHTML && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        <Section>
          <Checkbox
            data-test="CustomTable.ColumnEditor.Text.HighlightLinks"
            checked={column.highlightLinks}
            onChange={event => onChange({ highlightLinks: event.target.checked })}>
            Highlight links
          </Checkbox>
        </Section>
      )}
    </React.Fragment>
  );
}

export default function initTextColumn(column: any) {
  const format = createTextFormatter(column.allowHTML && column.highlightLinks);

  function prepareData(row: any) {
    return {
      text: format(row[column.name]),
    };
  }

  function TextColumn({ row, ruleFormat, ruleResult }: any) {
    // eslint-disable-line react/prop-types
    const { text } = prepareData(row);
    const format = createNumberFormatter(ruleFormat);
    const appendedText = ruleResult[column.name] ? `${text}\n(${format(ruleResult[column.name])})` : text;
    return column.allowHTML ? <HtmlContent>{appendedText}</HtmlContent> : appendedText;
  }

  TextColumn.prepareData = prepareData;

  return TextColumn;
}

initTextColumn.friendlyName = "Text";
initTextColumn.Editor = Editor;
