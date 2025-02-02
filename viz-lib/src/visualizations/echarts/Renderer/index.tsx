import CustomTableRenderer from "../../custom-table/Renderer";
import getOptions from "@/visualizations/custom-table/getOptions";
import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { RendererPropTypes } from "@/visualizations/prop-types";

export default function Renderer({ data, options }: any) {
  const echartsRef = useRef<any>(null);
  const [echarts, setEcharts] = useState<any>(null);
  const [echartsInstance, setEchartsInstance] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const rows = data.rows;

  useEffect(() => {
    const newSelected = selected.map((item: any) => {
      if (options.selectableColumns.find((column: any) => column === item)) {
        return item;
      }
    });

    setSelected(newSelected);
  }, [options.selectableColumns]);

  useEffect(() => {
    if (!echartsRef.current) {
      return;
    }

    setEcharts(echartsRef.current.echarts);
    setEchartsInstance(echartsRef.current.getEchartsInstance());
  }, []);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.addEventListener("resize", resizeHandler);
    };
  }, [options.height]);

  const resizeTableContainer = (element: any) => {
    const echartsHeight = options.height || "300px";
    const childElement = element.querySelector("div");

    element.style.height = `calc(100% - ${echartsHeight})`;
    element.style.top = echartsHeight;

    if (childElement) {
      childElement.style.height = "100%";
    }
  };

  const resizeHandler = () => {
    const queryTableContainer = document.querySelectorAll(
      ".query-fixed-layout .echarts-visualization-container .custom-table-visualization-container"
    );
    const widgetTableContainer = document.querySelectorAll(
      ".widget-visualization .echarts-visualization-container .custom-table-visualization-container"
    );

    queryTableContainer.forEach((element: any) => {
      resizeTableContainer(element);
    });
    widgetTableContainer.forEach((element: any) => {
      resizeTableContainer(element);
    });
  };

  const handleGetOptions = () => {
    let result = {};

    if (options.echartsOptions) {
      try {
        const getOptions = new Function("rows", "echarts", "echartsInstance", "selected", options.echartsOptions);
        const funcResult = getOptions(rows, echarts, echartsInstance, selected);

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
    <div className="echarts-visualization-container">
      <ReactECharts
        ref={echartsRef}
        notMerge={true}
        lazyUpdate={true}
        option={{
          ...handleGetOptions(),
          ...{
            toolbox: {
              feature: {
                restore: {},
                saveAsImage: {},
              },
            },
          },
        }}
        style={{
          height: options.height || "300px",
          ...(!Object.keys(handleGetOptions()).length && { background: "#fafafa" }),
        }}
      />
      {options.table.enabled && (
        <CustomTableRenderer
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
