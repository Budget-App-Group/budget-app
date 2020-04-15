import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Footer from "../components/footer/Footer";
import { MemoryRouter } from "react-router";

//contain tests
it("footer does show copyright when mounted", () => {
  const { container } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(container.textContent).toContain("©");
});

it("footer does show names when mounted", () => {
  const { container } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(container.textContent).toContain("Whitney, Nick, Colby");
});

it("footer does contain Link when mounted", () => {
  const { container } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(container.textContent).toContain("Contact Us");
});

//snapshot tests
describe("Snapshot test of footer", () => {
  const component = renderer.create(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  let tree = component.toJSON();

  test("component Footer matches the snapshot when rendered", () => {
    expect(tree).toMatchSnapshot();
  });

  test("component Footer renders truthy each time rendered", () => {
    expect(tree).toBeTruthy();
  });
});
