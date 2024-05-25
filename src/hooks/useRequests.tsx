import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  carsBrandsPath,
  modelsPath,
  resultsPath,
  yearsPath,
} from "@/constants/path";
import { SelectOptionsProps, SingleSelectProps } from "@/types/select";
import { api } from "@/services";
import { useCommon } from "./useCommon";
import { vehicleProps } from "@/types/vehicle";

interface useRequestsProps {
  children: ReactNode;
}

interface RequestsContextData {
  models: SelectOptionsProps[];
  setModels: Dispatch<SetStateAction<SelectOptionsProps[]>>;
  years: SelectOptionsProps[];
  setYears: Dispatch<SetStateAction<SelectOptionsProps[]>>;
  brandSelected: SingleSelectProps;
  setBrandSelected: Dispatch<SetStateAction<SingleSelectProps>>;
  modelSelected: SingleSelectProps;
  setModelSelected: Dispatch<SetStateAction<SingleSelectProps>>;
  yearSelected: SingleSelectProps;
  setYearSelected: Dispatch<SetStateAction<SingleSelectProps>>;
  results: vehicleProps;
  setResults: Dispatch<SetStateAction<vehicleProps>>;
  getModels: () => void;
  getYears: () => void;
  getResults: () => void;
}

export const RequestsContext = createContext({} as RequestsContextData);

function RequestsProvider({ children }: useRequestsProps) {
  const { setLoading } = useCommon();

  const [models, setModels] = useState<SelectOptionsProps[]>([]);
  const [years, setYears] = useState<SelectOptionsProps[]>([]);

  const [results, setResults] = useState<vehicleProps>({} as vehicleProps);

  const [brandSelected, setBrandSelected] = useState<SingleSelectProps>(null);
  const [modelSelected, setModelSelected] = useState<SingleSelectProps>(null);
  const [yearSelected, setYearSelected] = useState<SingleSelectProps>(null);

  /**
   * Função que busca os modelos de veículos disponíveis na API.
   *
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setModels.
   *
   * Caso a requisição falhe, seta o estado setModels como um array vazio.
   */
  async function getModels() {
    if (brandSelected) {
      api
        .get(modelsPath(brandSelected.value))
        .then((response) => {
          const models = response.data.modelos;

          let modelsFormatted = models.map(
            (brand: { nome: string; codigo: string }) => {
              return {
                label: brand.nome,
                value: brand.codigo,
              };
            }
          );

          setModels(modelsFormatted);
        })
        .catch(() => {
          setModels([]);
        });
    }
  }

  /**
   * Função que busca os anos de veículos disponíveis na API.
   *
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setYears.
   *
   * Caso a requisição falhe, seta o estado setYears como um array vazio.
   */
  async function getYears() {
    if (brandSelected && modelSelected) {
      api
        .get(yearsPath(brandSelected.value, modelSelected.value))
        .then((response) => {
          const years = response.data;

          let yearsFormatted = years.map(
            (brand: { nome: string; codigo: string }) => {
              return {
                label: brand.nome,
                value: brand.codigo,
              };
            }
          );

          setYears(yearsFormatted);
        })
        .catch(() => {
          setYears([]);
        });
    }
  }

  /**
   * Função que busca os resultados de veículos disponíveis na API.
   *
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setResults.
   *
   * Caso a requisição falhe, seta o estado setResults como um objeto vazio.
   */
  async function getResults() {
    if (brandSelected && modelSelected && yearSelected) {
      api
        .get(
          resultsPath(
            brandSelected.value,
            modelSelected.value,
            yearSelected.value
          )
        )
        .then((response) => {
          setResults(response.data);
        })
        .catch(() => {
          setResults({} as vehicleProps);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (brandSelected) {
      getModels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandSelected]);

  useEffect(() => {
    if (modelSelected) {
      getYears();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelSelected]);

  return (
    <RequestsContext.Provider
      value={{
        models,
        setModels,
        years,
        setYears,
        brandSelected,
        setBrandSelected,
        modelSelected,
        setModelSelected,
        yearSelected,
        setYearSelected,
        results,
        setResults,
        getModels,
        getYears,
        getResults,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
}

function useRequests() {
  return useContext(RequestsContext);
}

export { useRequests, RequestsProvider };
