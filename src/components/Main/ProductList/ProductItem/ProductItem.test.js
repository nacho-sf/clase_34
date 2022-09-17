import React from "react";
import { shallow } from "enzyme";
import ProductItem from "./ProductItem";

describe("ProductItem", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProductItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
