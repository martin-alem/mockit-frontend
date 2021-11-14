import { render, screen} from "@testing-library/react";
import LoginButton from "./../LoginButton";

let button = null;

beforeEach(() => {
  render(<LoginButton />);
  button = screen.getByRole("button");
});

test("should render the Button component and should be in document", () => {
  expect(button).toBeInTheDocument();
});

test("should render the Button component and should be visible", () => {
  expect(button).toBeVisible();
});
