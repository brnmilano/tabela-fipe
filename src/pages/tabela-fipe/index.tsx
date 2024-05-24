/* eslint-disable react-hooks/exhaustive-deps */
import {
  fipeTableDescription,
  fipeTableTitle,
  requiredField,
} from "@/constants/messages";
import { Button } from "@/components/Button";
import { useReqs } from "@/hooks/useReq";
import { useCommon } from "@/hooks/useCommon";
import { useEffect, useState } from "react";
import { ReactSelect } from "@/components/Select";
import { SelectOptionsProps } from "@/types/select";
import { errorsMessageProps } from "@/types/inputErrors";
import { useRouter } from "next/router";
import { resultsRoute } from "@/constants/path";
import { vehicleProps } from "@/types/vehicle";
import FadeInFromTopWhenVisible from "@/components/Animations/FadeInFromTopWhenVisible";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

export default function FipeTable() {
  const router = useRouter();

  const { loading, setLoading } = useCommon();

  const {
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
    setResults,
    getResults,
  } = useReqs();

  const [inputErrors, setInputErrors] = useState<errorsMessageProps[]>([]);

  let currentErrors: errorsMessageProps[] = [];

  /**
   * Verifica se os campos obrigatórios foram preenchidos e chama a função getResults para buscar os resultados.
   * Caso algum campo não tenha sido preenchido, exibe uma mensagem de erro no campo correspondente.
   */
  const handleVerifySelects = async () => {
    setInputErrors([]);

    setLoading(true);

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

      toast.error("Preencha todos os campos obrigatórios!");

      return setLoading(false);
    }

    setInputErrors(currentErrors);

    getResults();

    router.push(resultsRoute);
  };

  /**
   * Lida com a seleção e limpeza dos campos do componente Select.
   * @param value O valor selecionado no componente Select.
   * @param setField A função para atualizar o estado do campo selecionado.
   * @param clearFields Um array de funções para limpar os estados dos outros campos.
   */
  const handleSelect = (value: any, setField: any, clearFields: any) => {
    setField(value);

    clearFields.forEach((clearField: any) => {
      clearField(null);
    });

    setInputErrors(
      inputErrors.filter((item) => item.field !== "brandSelected")
    );

    setInputErrors(
      inputErrors.filter((item) => item.field !== "modelSelected")
    );

    setInputErrors(inputErrors.filter((item) => item.field !== "yearSelected"));
  };

  useEffect(() => {
    // Limpa os campos selecionados e os resultados da pesquisa.
    setBrands([]);
    setBrandSelected(null);
    setModels([]);
    setModelSelected(null);
    setYears([]);
    setYearSelected(null);
    setResults({} as vehicleProps);
  }, []);

  return (
    <FadeInFromTopWhenVisible>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1>{fipeTableTitle}</h1>

          <p>{fipeTableDescription}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.formWrapper}>
            <ReactSelect
              label="Marca"
              name="marca"
              placeholder="Selecione"
              options={brands as SelectOptionsProps[]}
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
              options={models as SelectOptionsProps[]}
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
              options={years as SelectOptionsProps[]}
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
