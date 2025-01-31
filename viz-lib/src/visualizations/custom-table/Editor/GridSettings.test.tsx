import React from "react";
import enzyme from "enzyme";

import getOptions from "../getOptions";
import GridSettings from "./GridSettings";

function findByTestID(wrapper: any, testId: any) {
  return wrapper.find(`[data-test="${testId}"]`);
}

function mount(options: any, done: any) {
  const data = { columns: [], rows: [] };
  options = getOptions(options, data);
  return enzyme.mount(
    <GridSettings
      visualizationName="Test"
      data={data}
      options={options}
      onOptionsChange={changedOptions => {
        expect(changedOptions).toMatchSnapshot();
        done();
      }}
    />
  );
}

describe("Visualizations -> Custom Table -> Editor -> Grid Settings", () => {
  test("Changes items per page", done => {
    const el = mount(
      {
        itemsPerPage: 25,
      },
      done
    );

    findByTestID(el, "CustomTable.ItemsPerPage")
      .last()
      .simulate("mouseDown");
    findByTestID(el, "CustomTable.ItemsPerPage.100")
      .last()
      .simulate("click");
  });
});
