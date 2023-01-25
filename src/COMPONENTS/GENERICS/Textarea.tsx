import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import "./Generics.scss";

export enum inputs {
  content = "content",
}

type TextareaProps<FormFieldsType extends FieldValues> = {
  type: Path<FormFieldsType>;
  register: UseFormRegister<FormFieldsType>;
  formState: any;
  rules: any;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

const Textarea = <FormFieldsType extends FieldValues>({
  type,
  register,
  formState,
  onChange,
  rules,
  label,
  defaultValue,
}: TextareaProps<FormFieldsType>) => {
  return (
    <div className="inputContainer">
      <label htmlFor={type}>{label}</label>
      <textarea
        defaultValue={defaultValue}
        className="input"
        rows={8}
        {...register(type, rules)}
      />
      <div style={{ width: "20rem" }}>
        {formState.errors[type]?.message && (
          <span className="error">{formState.errors[type].message}</span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
