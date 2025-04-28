import React from "react";
import HtmlContent from "@/components/HtmlContent";
import { Checkbox, ContextHelp, Input, Section } from "@/components/visualizations/editor";
import { createNumberFormatter } from "@/lib/value-format";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  column: {
    name: string;
    numberFormat?: string;
    changeIndicatorEnabled?: boolean;
  };
  onChange: (...args: any[]) => any;
};

function Editor({ column, onChange }: Props) {
  const [onChangeDebounced] = useDebouncedCallback(onChange, 200);

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label={
            <React.Fragment>
              Number format
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          defaultValue={column.numberFormat}
          onChange={(event: any) => onChangeDebounced({ numberFormat: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          checked={column.changeIndicatorEnabled}
          onChange={event => onChange({ changeIndicatorEnabled: event.target.checked })}>
          Enable Change Indicator
        </Checkbox>
      </Section>
    </React.Fragment>
  );
}

export default function initNumberColumn(column: any) {
  const replaceColumnWithRuleResult = column.conditionalFormatting.replaceColumnWithRuleResult;

  function prepareData(row: any, conditionalFormattingActive: any) {
    const format = createNumberFormatter(
      conditionalFormattingActive && replaceColumnWithRuleResult
        ? column.conditionalFormatting.ruleResultFormat
        : column.numberFormat
    );

    return {
      number: row[column.name],
      text: format(row[column.name]),
    };
  }

  function NumberColumn({ row, conditionalFormattingActive, ruleResultFormat, ruleResult }: any) {
    // eslint-disable-line react/prop-types
    const { number, text } = prepareData(row, conditionalFormattingActive);
    const format = createNumberFormatter(ruleResultFormat);
    const textResult = ruleResult[column.name] !== undefined ? `${text}\n(${format(ruleResult[column.name])})` : text;
    if (column.changeIndicatorEnabled) {
      if (number > 0) {
        return <HtmlContent>{`<span style="color: red;">▲ ${textResult}</span>`}</HtmlContent>;
      }
      if (number < 0) {
        return <HtmlContent>{`<span style="color: blue;">▼ ${textResult}</span>`}</HtmlContent>;
      }
    }
    return textResult;
  }

  NumberColumn.prepareData = prepareData;

  return NumberColumn;
}

initNumberColumn.friendlyName = "Number";
initNumberColumn.Editor = Editor;
