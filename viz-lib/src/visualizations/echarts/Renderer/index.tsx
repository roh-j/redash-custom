import getOptions from "@/visualizations/custom-table/getOptions";
import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import CustomTableRenderer from "../../custom-table/Renderer";
import { RendererPropTypes } from "@/visualizations/prop-types";

import "./index.less";

export default function Renderer({ data, options }: any) {
  const echartsInstanceRef = useRef<any>(null);
  const [echartsInstance, setEchartsInstance] = useState<any>(null);

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
        const getOptions = new Function("rows", "echartsInstance", options.echartsOptions);
        const funcResult = getOptions(rows, echartsInstance);

        if (funcResult) {
          result = funcResult;
        }
      } catch (error) {}
    }

    return result;
  };

  return (
    <div className="echarts-visualization-container">
      <ReactECharts ref={echartsInstanceRef} notMerge={true} lazyUpdate={true} option={handleGetOptions()} />
      {options.table.enabled && (
        <CustomTableRenderer data={data} options={getOptions(options, { columns: data.columns })} />
      )}
    </div>
  );
}

Renderer.propTypes = RendererPropTypes;
