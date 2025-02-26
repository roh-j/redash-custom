import * as echarts from "echarts";
import EnhancedTableRenderer from "../../enhanced-table/Renderer";
import getOptions from "@/visualizations/enhanced-table/getOptions";
import React, { useEffect, useRef, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { RendererPropTypes } from "@/visualizations/prop-types";
import "./theme";

export default function Renderer({ data, options }: any) {
  const containerElRef = useRef<any>(null);
  const echartsCoreRef = useRef<any>(null);

  const [echartsInstance, setEchartsInstance] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(selected.filter((item: any) => options.selectableColumns.includes(item)));
  }, [options.selectableColumns]);

  useEffect(() => {
    if (!echartsCoreRef.current) {
      return;
    }

    const instance = echartsCoreRef.current.getEchartsInstance();

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    setEchartsInstance(instance);
    setSelected(
      options.selectableColumns.includes(options.selection.defaultSelection) ? [options.selection.defaultSelection] : []
    );

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [options]);

  const resizeTable = (tableEl: any) => {
    const echartsHeight = options.height || "300px";
    const childEl = tableEl.querySelector("div");

    if (tableEl.closest(".query-results") || tableEl.closest(".query-results-wrapper")) {
      tableEl.style.position = "relative";
      return;
    }

    tableEl.style.height = `calc(100% - ${echartsHeight})`;
    tableEl.style.top = echartsHeight;

    if (childEl) {
      childEl.style.height = "100%";
    }
  };

  const resizeHandler = () => {
    if (!containerElRef.current) {
      return;
    }

    const tableEl = containerElRef.current.querySelector(".enhanced-table-visualization-container");

    if (tableEl && (tableEl.closest(".query-fixed-layout") || tableEl.closest(".widget-visualization"))) {
      resizeTable(tableEl);
    }
  };

  const getEchartsOption = () => {
    let result = {};

    if (options.echartsOption) {
      try {
        const rows = [...data.rows];
        const getOption = new Function("rows", "echarts", "echartsInstance", "selected", options.echartsOption);
        const funcResult = getOption(rows, echarts, echartsInstance, selected);

        if (funcResult) {
          result = funcResult;
        }
      } catch (error) {}
    }

    return result;
  };

  return (
    <div ref={containerElRef} className="echarts-visualization-container">
      <ReactEChartsCore
        key={selected.join(",")}
        echarts={echarts}
        ref={echartsCoreRef}
        lazyUpdate={true}
        option={getEchartsOption()}
        theme="custom_theme"
        style={{
          height: options.height || "300px",
          ...(!Object.keys(getEchartsOption()).length && { background: "#edecec" }),
        }}
      />
      {options.table.enabled && (
        <EnhancedTableRenderer
          data={data}
          options={getOptions(options, { columns: data.columns })}
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}

Renderer.propTypes = RendererPropTypes;
