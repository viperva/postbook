import React, { useState } from "react";
import { UserType } from "../MISC/types";
import { FieldValues, Path, UseFormRegister, useForm } from "react-hook-form";

export enum inputs {
  title = "title",
  content = "content",
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
  formState: any;
  rules: any;
  label: string;
  // onChange: () => void;
};

const Input = <FormFieldsType extends FieldValues>({
  type,
  register,
  formState,
  rules,
  label,
}: InputProps<FormFieldsType>) => {
  return (
    <div className="postForm__input">
      <label htmlFor={type}>{label}</label>
      <input type="string" {...register(type, rules)} />
      <div style={{ width: "20rem" }}>
        {formState.errors[type]?.message && (
          <span className="form__error">{formState.errors[type].message}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
