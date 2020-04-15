import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import ContactUs from "../components/contactUs/ContactUs";
import { MemoryRouter } from "react-router";

it("Join does show Sign In button text when mounted", () => {
  const { container } = render(
    <MemoryRouter>
      <ContactUs />
    </MemoryRouter>
  );

  expect(container.textContent).toContain("Contact Us");
});

//snapshot tests
describe("contact us snapshot tests", () => {
  const component = renderer.create(
    <MemoryRouter>
      <ContactUs />
    </MemoryRouter>
  );
  let tree = component.toJSON();

  test("component Contact us matches snapshot", () => {
    expect(tree).toMatchSnapshot();
  });

  test("component Contact us displays a truthy value", () => {
    expect(tree).toBeTruthy();
  });
});
