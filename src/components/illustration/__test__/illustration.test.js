import { render, screen } from "@testing-library/react";
import Illustration from "./../Illustration";

let illustration = null;

beforeEach(() => {
  render(<Illustration />);
  illustration = screen.getByAltText("illustration");
});

test("should render the Illustration component and should be in document", () => {
  expect(illustration).toBeInTheDocument();
});

test("should render the Illustration component and should be visible", () => {
  expect(illustration).toBeVisible();
});
