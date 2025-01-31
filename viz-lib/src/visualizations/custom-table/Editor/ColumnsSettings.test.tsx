import React from "react";
import enzyme from "enzyme";

import getOptions from "../getOptions";
import ColumnsSettings from "./ColumnsSettings";

function findByTestID(wrapper: any, testId: any) {
  return wrapper.find(`[data-test="${testId}"]`);
}

function mount(options: any, done: any) {
  const data = {
    columns: [{ name: "a", type: "string" }],
    rows: [{ a: "test" }],
  };
  options = getOptions(options, data);
  return enzyme.mount(
    <ColumnsSettings
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

describe("Visualizations -> Custom Table -> Editor -> Columns Settings", () => {
  test("Toggles column visibility", done => {
    const el = mount({}, done);

    findByTestID(el, "CustomTable.Column.a.Visibility")
      .last()
      .simulate("click");
  });

  test("Changes column title", done => {
    const el = mount({}, done);
    findByTestID(el, "CustomTable.Column.a.Name")
      .last()
      .simulate("click"); // expand settings

    findByTestID(el, "CustomTable.Column.a.Title")
      .last()
      .simulate("change", { target: { value: "test" } });
  });

  test("Changes column alignment", done => {
    const el = mount({}, done);
    findByTestID(el, "CustomTable.Column.a.Name")
      .last()
      .simulate("click"); // expand settings

    findByTestID(el, "CustomTable.Column.a.TextAlignment")
      .last()
      .find('[data-test="TextAlignmentSelect.Right"] input')
      .simulate("change", { target: { checked: true } });
  });

  test("Enables search by column data", done => {
    const el = mount({}, done);
    findByTestID(el, "CustomTable.Column.a.Name")
      .last()
      .simulate("click"); // expand settings

    findByTestID(el, "CustomTable.Column.a.UseForSearch")
      .last()
      .find("input")
      .simulate("change", { target: { checked: true } });
  });

  test("Changes column display type", done => {
    const el = mount({}, done);
    findByTestID(el, "CustomTable.Column.a.Name")
      .last()
      .simulate("click"); // expand settings

    findByTestID(el, "CustomTable.Column.a.DisplayAs")
      .last()
      .simulate("mouseDown");
    findByTestID(el, "CustomTable.Column.a.DisplayAs.number")
      .last()
      .simulate("click");
  });
});
