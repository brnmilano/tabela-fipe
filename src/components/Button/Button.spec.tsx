import { Button } from "@/components/Button";
import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import "@testing-library/jest-dom";

describe("Button Testing group", () => {
  it("should render button with text", () => {
    render(<Button>Consultar preço</Button>);

    expect(screen.getByText("Consultar preço")).toBeInTheDocument();
  });

  it("should testing onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Consultar preço</Button>);

    const button = screen.getByRole("button");

    button.click();

    expect(onClick).toHaveBeenCalled();
  });

  it("should render loading", () => {
    render(<Button loading>Consultar preço</Button>);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
