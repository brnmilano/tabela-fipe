import { useEffect, useState } from "react";
import { SelectOptionsProps } from "@/types/select";
import Select from "react-select";
import styles from "./styles.module.scss";

interface InputProps {
  label?: string;
  name?: string;
  options?: SelectOptionsProps[];
  isDisabled?: boolean;
  defaultValue?: {
    label: string;
    value: number;
  } | null;
  placeholder?: string;
  onSelect: (data: SelectOptionsProps) => void;
  error?: boolean;
  errorMessage?: any;
  clearValue?: boolean;
  noOptionsMessage?: string;
  onBlur?: () => void;
  type?: "clear" | "outlined";
  isClearable?: boolean;
}

export function ReactSelect({
  label,
  name,
  options,
  isDisabled,
  defaultValue,
  placeholder = "",
  onSelect,
  error,
  errorMessage,
  clearValue,
  noOptionsMessage,
  onBlur,
  type = "outlined",
  isClearable = false,
  ...rest
}: InputProps) {
  const [value, setValue] = useState<SelectOptionsProps | null>(null);

  const errorStyle = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: isDisabled ? "#f4f4f2" : "",
      border: "solid 1.2px #BB1616",
      borderRadius: "8px",
      padding: "5.5px 5px",
      fontSize: "14px",

      "&:hover": {
        border: "1px solid #BB1616",
      },
    }),
  };

  const style = {
    control: (provided: any, state: any) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isDisabled ? "#f4f4f2" : "",
      border: state.isFocused ? "1px solid transparent" : "1px solid #c2c1c2",
      borderRadius: "8px",
      padding: "5.5px 5px",
      fontSize: "14px",
      color: "#000000",

      "&:hover": {
        border: "1px solid #c2c1c2",
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#000000",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: isDisabled ? "#9F9F9F" : "#202020",
    }),
    option: (provided: any) => ({
      ...provided,
      cursor: "pointer",
      color: "#000000",
      backgroundColor: "transparent",
    }),
    menuList: (provided: any) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 5,
      minWidth: "100%",
    }),
  };

  useEffect(() => {
    setValue(null);

    if (defaultValue?.value) {
      setValue(defaultValue);
    }
  }, [defaultValue, clearValue]);

  return (
    <div draggable={false} className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        {...rest}
        components={{
          IndicatorSeparator: () => null,
        }}
        isSearchable={true}
        className={styles.select}
        styles={error ? errorStyle : style}
        isDisabled={isDisabled}
        name={name}
        options={options}
        placeholder={<div>{placeholder}</div>}
        escapeClearsValue
        value={value}
        noOptionsMessage={() => noOptionsMessage || "Nenhuma opção encontrada"}
        backspaceRemovesValue
        onChange={(event) => {
          if (!event) {
            setValue(null);
            onSelect({} as SelectOptionsProps);
          } else {
            onSelect({ label: event.label, value: event.value });
            setValue({ label: event.label, value: event.value });
          }
        }}
        onBlur={onBlur}
      />

      <p
        className={`${styles.errorMessage} ${error && styles.showErrorMessage}`}
      >
        {errorMessage}
      </p>
    </div>
  );
}
