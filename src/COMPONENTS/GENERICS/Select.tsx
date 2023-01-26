import React from "react";
import { UserType } from "../MISC/types";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";
import "./Generics.scss";

export enum selects {
  user = "userId",
}

type SelectProps<FormFieldsType extends FieldValues> = {
  register: UseFormRegister<FormFieldsType>;
  formState: FormState<FormFieldsType>;
  type: Path<FormFieldsType>;
  rules: any;
  label: string;
  options: UserType[] | undefined;
  optionName: string;
};

export const Select = <FormFieldsType extends FieldValues>({
  register,
  formState,
  type,
  rules,
  label,
  options,
  optionName,
}: SelectProps<FormFieldsType>) => {
  return (
    <div className="inputContainer">
      <label htmlFor={type}>{label}</label>
      <select className="input" {...register(type, rules)}>
        <option value="">-------------</option>
        {options?.map((o) => (
          <option value={o.id} key={o.id}>
            {o[optionName as keyof typeof o].toString()}
          </option>
        ))}
      </select>
      <div style={{ width: "20rem" }}>
        {formState.errors[type]?.message && (
          <span className="error">
            {formState.errors[type]?.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};
