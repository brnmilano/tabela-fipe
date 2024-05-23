import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { carsBrands } from "@/constants/path";
import { api } from "@/services";
import { SelectOptionsProps, SingleSelectProps } from "@/types/select";
import { useCommon } from "./useCommon";

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

  getBrands: () => void;
  getModels: () => void;
  getYears: () => void;
}

export const ReqsContext = createContext({} as ReqsContextData);

function ReqsProvider({ children }: useReqsProps) {
  const { setLoading } = useCommon();

  const [brands, setBrands] = useState<SelectOptionsProps[]>([]);
  const [models, setModels] = useState<SelectOptionsProps[]>([]);
  const [years, setYears] = useState<SingleSelectProps[]>([]);

  const [brandSelected, setBrandSelected] = useState<SingleSelectProps>(null);
  const [modelSelected, setModelSelected] = useState<SingleSelectProps>(null);
  const [yearSelected, setYearSelected] = useState<SingleSelectProps>(null);

  const brandsForSearchModel = brandSelected?.value;
  const modelsForSearchYear = modelSelected?.value;

  console.log(brandsForSearchModel);
  console.log(modelsForSearchYear);

  async function getBrands() {
    api
      .get(`${carsBrands}`)
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

  async function getModels() {
    api
      .get(`/carros/marcas/${brandsForSearchModel}/modelos`)
      .then((response) => {
        console.log("getModels", { response });
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

  async function getYears() {
    api
      .get(
        `/carros/marcas/${brandsForSearchModel}/modelos/${modelsForSearchYear}/anos`
      )
      .then((response) => {
        const years = response.data.modelos;

        console.log({ years });

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

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (brandsForSearchModel !== undefined) {
      getModels();
    }
  }, [brandsForSearchModel]);

  useEffect(() => {
    if (modelsForSearchYear !== undefined) {
      getYears();
    }
  }, [modelsForSearchYear]);

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

        getBrands,
        getModels,
        getYears,
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
