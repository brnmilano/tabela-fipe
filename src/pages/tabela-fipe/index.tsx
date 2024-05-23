import {
  fipeTableDescription,
  fipeTableTitle,
  requiredField,
} from "@/constants/messages";
import { Button } from "@/components/Button";
import { useReqs } from "@/hooks/useReq";
import { useCommon } from "@/hooks/useCommon";
import { useState } from "react";
import styles from "./styles.module.scss";
import { ReactSelect } from "@/components/Select";
import { SelectOptionsProps, SingleSelectProps } from "@/types/select";
import { errorsMessageProps } from "@/types/inputErrors";
import Results from "@/components/Results";

export default function FipeTable() {
  const { loading } = useCommon();

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
  } = useReqs();

  const [inputErrors, setInputErrors] = useState<errorsMessageProps[]>([]);

  const handleVerifySelects = async () => {
    setInputErrors([]);
    let currentErrors: errorsMessageProps[] = [];

    if (!brandSelected || brandSelected.value === undefined) {
      currentErrors.push({ field: "brandSelected", message: requiredField });
    }

    if (!modelSelected || modelSelected.value === undefined) {
      currentErrors.push({ field: "modelSelected", message: requiredField });
    }

    if (!yearSelected || yearSelected.value === undefined) {
      currentErrors.push({ field: "yearSelected", message: requiredField });
    }

    if (currentErrors.length > 0) {
      return setInputErrors((oldValue) => {
        return [...oldValue, ...currentErrors];
      });
    }

    setInputErrors(currentErrors);
  };

  return (
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
            onSelect={(value) => setBrandSelected(value)}
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
            onSelect={(value) => setModelSelected(value)}
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
            label="Marca"
            name="marca"
            placeholder="Selecione"
            options={years as SelectOptionsProps[]}
            onSelect={(value) => setYearSelected(value)}
            isDisabled={!modelSelected || loading}
            error={
              inputErrors.findIndex((item) => item.field === "yearSelected") !==
              -1
            }
            errorMessage={
              inputErrors.find((item) => item.field === "yearSelected")
                ?.message || ""
            }
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button onClick={handleVerifySelects} type="submit" loading={loading}>
            Consultar preço
          </Button>
        </div>
      </div>

      <Results />
    </div>
  );
}
