import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Join from "../components/Join/Join";
import { MemoryRouter } from "react-router";

//contain tests
it("Join does show Sign In button text when mounted", () => {
  const { container } = render(
    <MemoryRouter>
      <Join />
    </MemoryRouter>
  );

  expect(container.textContent).toContain("Sign In");
});

//snapshot tests
describe("Join snapshot testing", () => {
  const component = renderer.create(
    <MemoryRouter>
      <Join />
    </MemoryRouter>
  );
  let tree = component.toJSON();

  test("component Join render matches snapshot", () => {
    expect(tree).toMatchSnapshot();
  });

  test("component Join displays each time rendered", () => {
    expect(tree).toBeTruthy();
  });
});
