/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { carsBrandsPath, modelsPath, yearsPath } from "@/constants/path";
import { SelectOptionsProps, SingleSelectProps } from "@/types/select";
import { api } from "@/services";
import { useCommon } from "./useCommon";
import { vehicleProps } from "@/types/vehicle";

interface useReqsProps {
  children: ReactNode;
}

interface ReqsContextData {
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

  //getBrands: () => void;
  getModels: () => void;
  getYears: () => void;
  getResults: () => void;
}

export const ReqsContext = createContext({} as ReqsContextData);

function ReqsProvider({ children }: useReqsProps) {
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
    api
      .get(`${carsBrandsPath}/${brandSelected?.value}/${modelsPath}`)
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

  /**
   * Função que busca os anos de veículos disponíveis na API.
   *
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setYears.
   *
   * Caso a requisição falhe, seta o estado setYears como um array vazio.
   */
  async function getYears() {
    api
      .get(
        `${carsBrandsPath}/${brandSelected?.value}/${modelsPath}/${modelSelected?.value}/${yearsPath}`
      )
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

  /**
   * Função que busca os resultados de veículos disponíveis na API.
   *
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setResults.
   *
   * Caso a requisição falhe, seta o estado setResults como um objeto vazio.
   */
  async function getResults() {
    api
      .get(
        `${carsBrandsPath}/${brandSelected?.value}/${modelsPath}/${modelSelected?.value}/${yearsPath}/${yearSelected?.value}`
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

  useEffect(() => {
    if (brandSelected) {
      getModels();
    }
  }, [brandSelected]);

  useEffect(() => {
    if (modelSelected) {
      getYears();
    }
  }, [modelSelected]);

  return (
    <ReqsContext.Provider
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

        //getBrands,
        getModels,
        getYears,
        getResults,
      }}
    >
      {children}
    </ReqsContext.Provider>
  );
}

function useReqs() {
  return useContext(ReqsContext);
}

export { useReqs, ReqsProvider };
