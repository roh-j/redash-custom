import CustomTableRenderer from "../../custom-table/Renderer";
import getOptions from "@/visualizations/custom-table/getOptions";
import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { RendererPropTypes } from "@/visualizations/prop-types";

import "./index.less";

export default function Renderer({ data, options }: any) {
  const echartsInstanceRef = useRef<any>(null);
  const [echartsInstance, setEchartsInstance] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const rows = data.rows;

  useEffect(() => {
    if (!echartsInstanceRef.current) {
      return;
    }

    setEchartsInstance(echartsInstanceRef.current.echarts);
  }, [echartsInstanceRef.current]);

  const handleGetOptions = () => {
    let result = {};

    if (options.echartsOptions) {
      try {
        const getOptions = new Function("rows", "echartsInstance", "selected", options.echartsOptions);
        const funcResult = getOptions(rows, echartsInstance, selected);

        if (funcResult) {
          result = funcResult;
        }
      } catch (error) {
        console.error(error);
      }
    }

    return result;
  };

  return (
    <div className="echarts-visualization-container">
      <ReactECharts
        ref={echartsInstanceRef}
        notMerge={true}
        lazyUpdate={true}
        option={handleGetOptions()}
        style={{
          ...(!Object.keys(handleGetOptions()).length && { background: "#fafafa" }),
        }}
      />
      {options.table.enabled && (
        <CustomTableRenderer
          data={data}
          options={getOptions(options, { columns: data.columns })}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}

Renderer.propTypes = RendererPropTypes;
