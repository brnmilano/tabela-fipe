//API endpoints
export const carsBrandsPath = "/carros/marcas";

export const modelsPath = (brandSelected: number) =>
  `/carros/marcas/${brandSelected}/modelos`;

export const yearsPath = (brandSelected: number, modelSelected: number) =>
  `/carros/marcas/${brandSelected}/modelos/${modelSelected}/anos`;

export const resultsPath = (
  brandSelected: number,
  modelSelected: number,
  yearSelected: number
) =>
  `/carros/marcas/${brandSelected}/modelos/${modelSelected}/anos/${yearSelected}`;

//Application routes
export const fipeTableRoute = "/tabela-fipe";
export const resultsRoute = "/resultados";
