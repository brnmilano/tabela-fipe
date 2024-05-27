import { render } from "@testing-library/react";
import { ReactSelect } from "@/components/Select";
import "@testing-library/jest-dom";

describe("Select Testing Group", () => {
  const brandsOptions = [
    { label: "Brand 1", value: 1 },
    { label: "Brand 2", value: 2 },
    { label: "Brand 3", value: 3 },
  ];

  it("should render with default values", () => {
    const onSelectMock = jest.fn();

    const { getByText } = render(
      <ReactSelect
        label="Marca"
        name="marca"
        placeholder="Selecione"
        options={brandsOptions}
        defaultValue={brandsOptions[0]}
        onSelect={onSelectMock}
        error
        errorMessage="Cambo obrigatório!"
        isDisabled
      />
    );

    expect(getByText("Brand 1")).toBeInTheDocument();
    expect(getByText("Marca")).toBeInTheDocument();
  });

  it("should render with required field", () => {
    const onSelectMock = jest.fn();

    const { getByText } = render(
      <ReactSelect
        label="Marca"
        name="marca"
        placeholder="Selecione"
        options={brandsOptions}
        defaultValue={brandsOptions[0]}
        onSelect={onSelectMock}
        error
        errorMessage="Cambo obrigatório!"
        isDisabled
      />
    );

    expect(getByText("Cambo obrigatório!")).toBeInTheDocument();
  });
});
