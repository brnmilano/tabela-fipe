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
import {
  carsBrandsPath,
  fipeTableRoute,
  modelsPath,
  yearsPath,
} from "@/constants/path";
import { api } from "@/services";
import { SelectOptionsProps, SingleSelectProps } from "@/types/select";
import { useCommon } from "./useCommon";
import { vehicleProps } from "@/types/vehicle";
import { usePathname } from "next/navigation";

interface useReqsProps {
  children: ReactNode;
}

interface ReqsContextData {
  brands: SelectOptionsProps[];
  setBrands: Dispatch<SetStateAction<SelectOptionsProps[]>>;
  models: SelectOptionsProps[];
  setModels: Dispatch<SetStateAction<SelectOptionsProps[]>>;
  years: SingleSelectProps[];
  setYears: Dispatch<SetStateAction<SingleSelectProps[]>>;

  brandSelected: SingleSelectProps;
  setBrandSelected: Dispatch<SetStateAction<SingleSelectProps>>;
  modelSelected: SingleSelectProps;
  setModelSelected: Dispatch<SetStateAction<SingleSelectProps>>;
  yearSelected: SingleSelectProps;
  setYearSelected: Dispatch<SetStateAction<SingleSelectProps>>;

  results: vehicleProps;
  setResults: Dispatch<SetStateAction<vehicleProps>>;

  getBrands: () => void;
  getModels: () => void;
  getYears: () => void;
  getResults: () => void;
}

export const ReqsContext = createContext({} as ReqsContextData);

function ReqsProvider({ children }: useReqsProps) {
  const pathname = usePathname();

  const { setLoading } = useCommon();

  const [brands, setBrands] = useState<SelectOptionsProps[]>([]);
  const [models, setModels] = useState<SelectOptionsProps[]>([]);
  const [years, setYears] = useState<SingleSelectProps[]>([]);

  const [results, setResults] = useState<vehicleProps>({} as vehicleProps);

  const [brandSelected, setBrandSelected] = useState<SingleSelectProps>(null);
  const [modelSelected, setModelSelected] = useState<SingleSelectProps>(null);
  const [yearSelected, setYearSelected] = useState<SingleSelectProps>(null);

  /**
   * Função que busca as marcas de veículos disponíveis na API.
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setBrands.
   */
  async function getBrands() {
    api
      .get(`${carsBrandsPath}`)
      .then((response) => {
        setLoading(false);

        const content = response.data;

        let contentFormatted = content.map(
          (brand: { nome: string; codigo: string }) => {
            return {
              label: brand.nome,
              value: brand.codigo,
            };
          }
        );

        setBrands(contentFormatted);
      })
      .catch(() => {
        setBrands([]);
      });
  }

  /**
   * Função que busca os modelos de veículos disponíveis na API.
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setModels.
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
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setYears.
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
   * Caso a requisição seja bem sucedida, formata o conteúdo e o adiciona no estado setResults.
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
    if (pathname === fipeTableRoute) {
      getBrands();
    }
  }, [pathname === fipeTableRoute]);

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
        brands,
        setBrands,
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

        getBrands,
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
