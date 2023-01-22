import { useForm, SubmitHandler } from "react-hook-form";
import { getUsers, postPost } from "../MISC/services";
import { PostType, UserType } from "../MISC/types";
import "./AddPost.scss";
import { Select, selects } from "../GENERICS/Select";
import { useEffect, useState } from "react";
import Input, { inputs } from "../GENERICS/Input";
import { rules } from "../MISC/rules";
import Button from "../GENERICS/Button";

type addPost = {
  submitHandler: (data: PostType) => void;
};

const AddPost: React.FC<addPost> = ({ submitHandler }) => {
  const { register, handleSubmit, formState, reset } = useForm<PostType>();

  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    const placeUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    placeUsers();
  }, []);

  const onSubmit = handleSubmit((data: PostType) => {
    submitHandler(data);
    reset();
  });

  return (
    <form className="postForm">
      <Select<PostType>
        register={register}
        formState={formState}
        type={selects.user}
        label="User:"
        rules={rules.userSelect}
        options={users}
        optionName="username"
      />
      <Input<PostType>
        register={register}
        formState={formState}
        type={inputs.title}
        label="Title:"
        rules={rules.title}
      />
      <Input<PostType>
        register={register}
        formState={formState}
        type={inputs.content}
        label="Content:"
        rules={rules.content}
      />

      <Button onClick={onSubmit} label="ADD POST" />
    </form>
  );
};

export default AddPost;
