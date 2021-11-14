import { render, screen } from "@testing-library/react";
import Logo from "./../Logo";

let img = null;

beforeEach(() => {
  render(<Logo />);
  img = screen.getByAltText("logo");
});

test("should render the Logo component and should be in document", () => {
  expect(img).toBeInTheDocument();
});

test("should render the Logo component and should be visible", () => {
  expect(img).toBeVisible();
});
