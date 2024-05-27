import { render, screen, fireEvent } from "@testing-library/react";
import { RequestsProvider } from "@/hooks/useRequests";
import Results from ".";

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/tabela-fipe",
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

it("Results page should have Templates", () => {
  render(
    <RequestsProvider>
      <Results />
    </RequestsProvider>
  );

  const templatesSubtitle = screen.getByText(
    "Este é o preço de compra do veículo"
  );
  expect(templatesSubtitle).toBeInTheDocument();

  const templateButtonText = screen.getByText("Nova consulta");
  expect(templateButtonText).toBeInTheDocument();
});

it("Results page should have Tabela Fipe link", () => {
  render(
    <RequestsProvider>
      <Results />
    </RequestsProvider>
  );

  const templateLink = screen.getByRole("link", { name: "Nova consulta" });
  fireEvent.click(templateLink);

  expect(templateLink.getAttribute("href")).toBe("/tabela-fipe");
});
