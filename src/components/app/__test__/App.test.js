import { render, screen } from "@testing-library/react";
import App from "./../App";

let appDiv = null;

beforeEach(() => {
  render(<App />);
  appDiv = screen.getByTestId("app");
});

test("should render the App component and should be in document", () => {
  expect(appDiv).toBeInTheDocument();
});

test("should render the App component and should be visible", () => {
  expect(appDiv).toBeVisible();
});
