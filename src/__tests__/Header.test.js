import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import axios from "axios";
import Header from "../components/header/Header";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../redux/store";

it("does not show drop down when mounted", () => {
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

it("shows dropdown when menu is clicked", () => {
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
