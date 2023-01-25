import { useForm } from "react-hook-form";
import { UserType } from "../MISC/types";
import Input, { inputs } from "../GENERICS/Input";
import { rules } from "../MISC/rules";
import Button from "../GENERICS/Button";

type addUser = {
  submitHandler: (data: UserType) => void;
};

const AddUser: React.FC<addUser> = ({ submitHandler }) => {
  const { register, handleSubmit, reset, formState } = useForm<UserType>();

  const onSubmit = handleSubmit((data: UserType) => {
    submitHandler(data);
    reset();
  });

  return (
    <>
      <form className="userForm">
        <div className="userForm__section">
          <h3>Personal info: *required*</h3>
          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.name}
            label="Name:"
            rules={rules.name}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.username}
            label="Username:"
            rules={rules.username}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.email}
            label="Email:"
            rules={rules.email}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.phone}
            label="Phone number:"
            rules={rules.phone}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.website}
            label="Website:"
            rules={rules.website}
          />
        </div>

        <div className="userForm__section">
          <h3>Address: *not required*</h3>

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.street}
            label="Street:"
            rules={rules.street}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.suite}
            label="Suite:"
            rules={rules.suite}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.city}
            label="City:"
            rules={rules.city}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.zip}
            label="Zip code:"
            rules={rules.zip}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.latitude}
            label="Latitude:"
            rules={rules.latitude}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.longitude}
            label="Longitude:"
            rules={rules.longitude}
          />
        </div>

        <div className="userForm__section">
          <h3>Company: *not required*</h3>

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.companyName}
            label="Name:"
            rules={rules.companyName}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.catchphrase}
            label="Catchphrase:"
            rules={rules.catchphrase}
          />

          <Input<UserType>
            register={register}
            formState={formState}
            type={inputs.bs}
            label="Business Services:"
            rules={rules.bs}
          />

          <Button onClick={onSubmit} label="Add User" />
        </div>
      </form>
    </>
  );
};

export default AddUser;
