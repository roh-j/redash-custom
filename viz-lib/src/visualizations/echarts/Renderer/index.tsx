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
    instance.resize();

    setEchartsInstance(instance);
    setSelected(
      options.selectableColumns.includes(options.selection.defaultSelection) ? [options.selection.defaultSelection] : []
    );

    return () => {
      window.addEventListener("resize", resizeHandler);
    };
  }, [options]);

  const resizeTableContainer = (element: any) => {
    const echartsHeight = options.height || "300px";
    const childElement = element.querySelector("div");

    if (element.closest(".query-results") || element.closest(".query-results-wrapper")) {
      element.style.position = "relative";
      return;
    }

    element.style.height = `calc(100% - ${echartsHeight})`;
    element.style.top = echartsHeight;

    if (childElement) {
      childElement.style.height = "100%";
    }
  };

  const resizeHandler = () => {
    if (!containerElRef.current) {
      return;
    }

    const tableEl = containerElRef.current.querySelector(".enhanced-table-visualization-container");

    if (tableEl && (tableEl.closest(".query-fixed-layout") || tableEl.closest(".widget-visualization"))) {
      resizeTableContainer(tableEl);
    }
  };

  const getEchartsOption = () => {
    let result = {};

    if (options.echartsOptions) {
      try {
        const rows = [...data.rows];
        const getOption = new Function("rows", "echarts", "echartsInstance", "selected", options.echartsOptions);
        const funcResult = getOption(rows, echarts, echartsInstance, selected);

        if (funcResult) {
          result = funcResult;
        }
      } catch (error) {
        return {};
      }
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
