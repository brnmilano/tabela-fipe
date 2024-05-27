import { requiredField } from "@/constants/messages";
import { Button } from "@/components/Button";
import { useRequests } from "@/hooks/useRequests";
import { useCommon } from "@/hooks/useCommon";
import { useEffect, useState } from "react";
import { ReactSelect } from "@/components/Select";
import { SelectOptionsProps } from "@/types/select";
import { errorsMessageProps } from "@/types/inputErrors";
import { useRouter } from "next/router";
import { carsBrandsPath, resultsRoute } from "@/constants/path";
import { vehicleProps } from "@/types/vehicle";
import { api } from "@/services";
import FadeInFromTopWhenVisible from "@/components/Animations/FadeInFromTopWhenVisible";
import styles from "./styles.module.scss";

interface Brand {
  brandsFormatted?: SelectOptionsProps[];
}

export default function FipeTable(props: Brand) {
  const brandsOptions = props.brandsFormatted;

  const {
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
    setResults,
    getResults,
  } = useRequests();

  const { loading, setLoading } = useCommon();

  const router = useRouter();

  const [inputErrors, setInputErrors] = useState<errorsMessageProps[]>([]);

  /**
   * Lida com a seleção e limpeza dos campos do componente Select.
   * @param value O valor selecionado no componente Select.
   * @param setField Atualizar o estado do campo selecionado.
   * @param clearFields Limpa os estados dos outros campos.
   */
  const handleSelect = (
    value: SelectOptionsProps,
    setField: any,
    clearFields: any
  ) => {
    setField(value);

    clearFields.forEach((clearField: any) => {
      clearField(null);
    });

    setInputErrors(
      inputErrors.filter((item) => item.field !== "brandSelected")
    );
  };

  /**
   * Verifica se os campos obrigatórios foram preenchidos e chama a função getResults para buscar os resultados.
   *
   * Caso algum campo não tenha sido preenchido, exibe uma mensagem de erro no campo correspondente.
   */
  const handleVerifySelects = () => {
    setInputErrors([]);

    setLoading(true);

    const currentErrors: errorsMessageProps[] = [];

    if (!brandSelected || brandSelected.value === undefined) {
      currentErrors.push({ field: "brandSelected", message: requiredField });

      setLoading(false);
    }

    if (!modelSelected || modelSelected.value === undefined) {
      currentErrors.push({ field: "modelSelected", message: requiredField });
    }

    if (!yearSelected || yearSelected.value === undefined) {
      currentErrors.push({ field: "yearSelected", message: requiredField });
    }

    if (currentErrors.length > 0) {
      setInputErrors((oldValue) => {
        return [...oldValue, ...currentErrors];
      });

      return setLoading(false);
    }

    setInputErrors(currentErrors);

    getResults();

    router.push(resultsRoute);
  };

  useEffect(() => {
    // Limpa os campos selecionados e os resultados da pesquisa.
    setBrandSelected(null);
    setModels([]);
    setModelSelected(null);
    setYears([]);
    setYearSelected(null);
    setResults({} as vehicleProps);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeInFromTopWhenVisible>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1>Tabela fipe</h1>

          <p>Consulte o valor de um veículo de forma gratuita</p>
        </div>

        <div className={styles.content}>
          <div className={styles.formWrapper}>
            <ReactSelect
              label="Marca"
              name="marca"
              placeholder="Selecione"
              options={brandsOptions}
              defaultValue={brandSelected}
              onSelect={(value) =>
                handleSelect(value, setBrandSelected, [
                  setModelSelected,
                  setYearSelected,
                ])
              }
              isDisabled={loading}
              error={
                inputErrors.findIndex(
                  (item) => item.field === "brandSelected"
                ) !== -1
              }
              errorMessage={
                inputErrors.find((item) => item.field === "brandSelected")
                  ?.message || ""
              }
            />

            <ReactSelect
              label="Modelo"
              name="modelo"
              placeholder="Selecione"
              options={models}
              defaultValue={modelSelected}
              onSelect={(value) =>
                handleSelect(value, setModelSelected, [setYearSelected])
              }
              isDisabled={!brandSelected || loading}
              error={
                inputErrors.findIndex(
                  (item) => item.field === "modelSelected"
                ) !== -1
              }
              errorMessage={
                inputErrors.find((item) => item.field === "modelSelected")
                  ?.message || ""
              }
            />

            <ReactSelect
              label="Ano"
              name="ano"
              placeholder="Selecione"
              options={years}
              defaultValue={yearSelected}
              onSelect={(value) => handleSelect(value, setYearSelected, [])}
              isDisabled={!modelSelected || loading}
              error={
                inputErrors.findIndex(
                  (item) => item.field === "yearSelected"
                ) !== -1
              }
              errorMessage={
                inputErrors.find((item) => item.field === "yearSelected")
                  ?.message || ""
              }
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              onClick={handleVerifySelects}
              type="submit"
              loading={loading}
            >
              Consultar preço
            </Button>
          </div>
        </div>
      </div>
    </FadeInFromTopWhenVisible>
  );
}

export const getServerSideProps = async () => {
  const response = await api.get<{ nome: string; codigo: string }[]>(
    carsBrandsPath
  );

  if (!response) return;

  let brandsFormatted = response.data.map((brand) => {
    return {
      label: brand.nome,
      value: brand.codigo,
    };
  });

  return {
    props: {
      brandsFormatted,
    },
  };
};
