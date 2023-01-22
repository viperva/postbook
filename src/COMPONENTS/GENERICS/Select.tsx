import React, { useEffect, useState } from "react";
import { UserType } from "../MISC/types";
import { getUsers } from "../MISC/services";
import { FieldValues, Path, UseFormRegister, useForm } from "react-hook-form";

export enum selects {
  user = "userId",
}

type SelectProps<FormFieldsType extends FieldValues> = {
  register: UseFormRegister<FormFieldsType>;
  formState: any;
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
    <div>
      <label htmlFor={type}>{label}</label>
      <select {...register(type, rules)}>
        <option value="">-------------</option>
        {options?.map((o) => (
          <option value={o.id} key={o.id}>
            {o[optionName as keyof typeof o].toString()}
          </option>
        ))}
      </select>
      <div style={{ width: "20rem" }}>
        {formState.errors[type]?.message && (
          <span className="form__error">{formState.errors[type].message}</span>
        )}
      </div>
    </div>
  );
};
