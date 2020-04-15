import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Header from "../components/header/Header";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../redux/store";

//contains testing
it("header does not show dropdown when mounted", () => {
  const { queryByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  const dropdown = queryByTestId("dropdown");

  expect(dropdown).not.toBeTruthy();
});

it("header does show budKid when mounted", () => {
  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  //   const title = queryByTestId("title");

  expect(container.textContent).toContain("BudKid");
});

it("header shows dashboard when menu is clicked", () => {
  const { container, getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  const headButton = getByTestId("menu-button");

  fireEvent.click(headButton);

  expect(container.textContent).toContain("Dashboard");
});

it("header shows logout when menu is clicked", () => {
  const { container, getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  const headButton = getByTestId("menu-button");

  fireEvent.click(headButton);

  expect(container.textContent).toContain("Logout");
});

//snapshot tests
describe("snapshot tests Header component", () => {
  const component = renderer.create(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );
  let tree = component.toJSON();

  test("component header matches the snapshot", () => {
    expect(tree).toMatchSnapshot();
  });

  test("component Header renders truthy", () => {
    expect(tree).toBeTruthy();
  });
});
