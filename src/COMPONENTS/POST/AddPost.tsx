import { useForm } from "react-hook-form";
import { PostType } from "../MISC/types";
import "./AddPost.scss";
import { Select, selects } from "../GENERICS/Select";
import Input, { inputs } from "../GENERICS/Input";
import { rules } from "../MISC/rules";
import Button from "../GENERICS/Button";
import { useSelector } from "react-redux";
import { selectUsers } from "../../store";
import Textarea from "../GENERICS/Textarea";

type addPost = {
  submitHandler: (data: PostType) => void;
};

const AddPost: React.FC<addPost> = ({ submitHandler }) => {
  const { register, handleSubmit, formState, reset } = useForm<PostType>();

  const users = useSelector(selectUsers);

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
      <Textarea<PostType>
        type="body"
        register={register}
        formState={formState}
        rules={rules.postBody}
        label="Content:"
      />

      <Button onClick={onSubmit} label="Add Post" />
    </form>
  );
};

export default AddPost;
