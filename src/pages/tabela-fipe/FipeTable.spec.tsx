import { render, screen, fireEvent } from "@testing-library/react";
import { RequestsProvider } from "@/hooks/useRequests";
import { CommonProvider } from "@/hooks/useCommon";
import FipeTable from ".";

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/resultados",
    pathname: "",
    query: "",
    asPath: "",
    push: jest.fn(),
  }),
}));

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = "";
  thresholds = [0];
  takeRecords = () => [];
};

it("Tabela Fipe page should have Templates", () => {
  render(
    <CommonProvider>
      <RequestsProvider>
        <FipeTable />
      </RequestsProvider>
    </CommonProvider>
  );

  const templatesTitle = screen.getByText("Tabela fipe");
  expect(templatesTitle).toBeInTheDocument();

  const templatesSubtitle = screen.getByText(
    "Consulte o valor de um veículo de forma gratuita"
  );
  expect(templatesSubtitle).toBeInTheDocument();

  const templateButtonText = screen.getByText("Consultar preço");
  expect(templateButtonText).toBeInTheDocument();
});

it("Tabela Fipe page should have Selects", () => {
  render(
    <CommonProvider>
      <RequestsProvider>
        <FipeTable />
      </RequestsProvider>
    </CommonProvider>
  );

  const selectElements = screen.getAllByRole("combobox");
  expect(selectElements).toHaveLength(1);

  const select = screen.getByRole("combobox");
  expect(select).toBeInTheDocument();
});

it("Tabela Fipe page should have Buttons", () => {
  const { getByRole } = render(
    <CommonProvider>
      <RequestsProvider>
        <FipeTable />
      </RequestsProvider>
    </CommonProvider>
  );

  const button = getByRole("button");
  fireEvent.click(button);

  const buttonElement = screen.getAllByRole("button");
  expect(buttonElement).toHaveLength(1);
  expect(button).toBeInTheDocument();
});
