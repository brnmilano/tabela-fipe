import { SingleValue } from "react-select";

export type SelectOptionsProps = {
  isDisabled?: boolean;
  value: number;
  label: string;
  key?: string;
  optionSelect?: String;
};

export type SingleSelectProps = SingleValue<SelectOptionsProps>;
