import React from "react";
import { ContextHelp, Input, Section } from "@/components/visualizations/editor";
import { createNumberFormatter } from "@/lib/value-format";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  column: {
    name: string;
    numberFormat?: string;
  };
  onChange: (...args: any[]) => any;
};

function Editor({ column, onChange }: Props) {
  const [onChangeDebounced] = useDebouncedCallback(onChange, 200);

  return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
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
  );
}

export default function initNumberColumn(column: any) {
  const replaceColumnWithRuleResult = column.conditionalFormatting.replaceColumnWithRuleResult;

  function prepareData(row: any, conditionalFormattingActive: any) {
    const format = createNumberFormatter(
      conditionalFormattingActive && replaceColumnWithRuleResult ? "" : column.numberFormat
    );

    return {
      text: format(row[column.name]),
    };
  }

  function NumberColumn({ row, conditionalFormattingActive, ruleResultFormat, ruleResult }: any) {
    // eslint-disable-line react/prop-types
    const { text } = prepareData(row, conditionalFormattingActive);
    const format = createNumberFormatter(ruleResultFormat);
    return ruleResult[column.name] ? `${text}\n(${format(ruleResult[column.name])})` : text;
  }

  NumberColumn.prepareData = prepareData;

  return NumberColumn;
}

initNumberColumn.friendlyName = "Number";
initNumberColumn.Editor = Editor;
