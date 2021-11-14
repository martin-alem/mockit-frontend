import { render, screen } from "@testing-library/react";
import App from "./../App";

test("should render the App component and should be in document", () => {
  render(<App />);
  const appDiv = screen.getByTestId("app");
  expect(appDiv).toBeInTheDocument();
});

test("should render the App component and should be visible", () => {
  render(<App />);
  const appDiv = screen.getByTestId("app");
  expect(appDiv).toBeVisible();
});
