import AceEditor from "react-ace";
import Beautify from "ace-builds/src-noconflict/ext-beautify";
import React, { useEffect, useRef } from "react";
import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { merge } from "lodash";
import { Section } from "@/components/visualizations/editor";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/webpack-resolver";

type Columns = {
  label: string;
  value: string;
};

export default function GeneralSettings({ data, options, onOptionsChange }: any) {
  const editorRef = useRef<any>(null);
  const columns: Columns[] = data.columns.map(({ name }: any) => ({
    label: name,
    value: name,
  }));

  const handleBeautify = () => {
    if (!editorRef.current) {
      return;
    }

    Beautify.beautify(editorRef.current.editor.session);
  };

  const renderEcharts = () => {
    if (!editorRef.current) {
      return;
    }

    const value = editorRef.current.editor.session.getValue();
    onOptionsChange(merge({}, options, { echartsOptions: value }));
  };

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.editor.session.setValue(options.echartsOptions);
  }, []);

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Space style={{ display: "flex" }} size="small">
          <Dropdown
            overlay={
              <Menu>
                {columns.map(column => (
                  <Menu.Item
                    key={column.value}
                    onClick={e => {
                      window.navigator.clipboard.writeText(e.key as string);
                    }}>
                    {column.value}
                  </Menu.Item>
                ))}
              </Menu>
            }>
            <Button>
              Copy Columns
              <DownOutlined aria-hidden="true" />
            </Button>
          </Dropdown>
          <Button onClick={handleBeautify}>Beautify</Button>
          <Button onClick={renderEcharts}>Apply</Button>
        </Space>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <p style={{ fontSize: "13px" }}>
          <span style={{ color: "blue" }}>function</span> <span style={{ color: "#0000A2" }}>getOptions</span>(
          <span style={{ color: "rgb(49, 132, 149)" }}>rows</span>,{" "}
          <span style={{ color: "rgb(49, 132, 149)" }}>echarts</span>,{" "}
          <span style={{ color: "rgb(49, 132, 149)" }}>echartsInstance</span>,{" "}
          <span style={{ color: "rgb(49, 132, 149)" }}>selected</span>) {"{"} {"}"}
        </p>
        <AceEditor
          ref={editorRef}
          mode="javascript"
          theme="textmate"
          style={{ width: "100%", height: "400px" }}
          fontSize={13}
          editorProps={{ $blockScrolling: Infinity }}
          showPrintMargin={false}
          enableLiveAutocompletion={true}
        />
      </Section>
    </React.Fragment>
  );
}
