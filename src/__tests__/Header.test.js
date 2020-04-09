// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import Header from "./../components/header/Header";

// it("does not show drop down when mounted", () => {
//   const { queryByTestId } = render(<Header />);

//   const dropdown = queryByTestId("dropdown");

//   expect(dropdown).not.toBeTruthy();
// });

// it("shows dropdown when menu is clicked", () => {
//   const { container, getByTestId } = render(<Header />);

//   const headButton = getByTestId("menu-button");

//   fireEvent.click(headButton);

//   expect(container.textContent).toContain("Dashboard");
// });
