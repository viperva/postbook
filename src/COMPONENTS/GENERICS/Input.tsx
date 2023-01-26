import React from "react";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";
import "./Generics.scss";

export enum inputs {
  title = "title",
  postBody = "body",
  username = "username",
  email = "email",
  commentBody = "body",
  name = "name",
  phone = "phone",
  website = "website",
  street = "address.street",
  suite = "address.suite",
  city = "address.city",
  zip = "address.zipcode",
  latitude = "address.geo.lat",
  longitude = "address.geo.lng",
  companyName = "company.name",
  catchphrase = "company.catchPhrase",
  bs = "company.bs",
}

type InputProps<FormFieldsType extends FieldValues> = {
  type: Path<FormFieldsType>;
  register: UseFormRegister<FormFieldsType>;
  formState: FormState<FormFieldsType>;
  rules: any;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

const Input = <FormFieldsType extends FieldValues>({
  type,
  register,
  formState,
  onChange,
  rules,
  label,
  defaultValue,
}: InputProps<FormFieldsType>) => {
  return (
    <div className="inputContainer">
      <label htmlFor={type}>{label}</label>
      <input
        defaultValue={defaultValue}
        className="input"
        type="text"
        {...register(type, rules)}
        onChange={onChange}
      />
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

export default Input;
