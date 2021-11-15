import { render, screen } from "@testing-library/react";
import Heading from "./../Heading";

let h1Heading = null;
let h4Heading = null;

beforeEach(() => {
  render(<Heading />);
  h1Heading = screen.getByTestId("h1");
  h4Heading = screen.getByTestId("h4");
});

test("should render the H1 component and should be in document", () => {
  expect(h1Heading).toBeInTheDocument();
});

test("should render the H1 component and should be visible", () => {
  expect(h1Heading).toBeVisible();
});

test("should render the H4 component and should be in document", () => {
  expect(h4Heading).toBeInTheDocument();
});

test("should render the H4 component and should be visible", () => {
  expect(h4Heading).toBeVisible();
});

