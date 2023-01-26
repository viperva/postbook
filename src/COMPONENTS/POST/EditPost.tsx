import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Button from "../GENERICS/Button";
import Input, { inputs } from "../GENERICS/Input";
import { rules } from "../MISC/rules";
import { PostType } from "../MISC/types";
import "./editPost.scss";
import Textarea from "../GENERICS/Textarea";

type editPost = {
  post: PostType;
  onCloseEditing: React.Dispatch<SetStateAction<boolean>>;
  submitHandler: (data: PostType) => void;
};

export const EditPost: React.FC<editPost> = ({
  post,
  onCloseEditing,
  submitHandler,
}) => {
  const { register, formState, handleSubmit, unregister } = useForm<PostType>();

  const onSubmit = handleSubmit((data: PostType) => {
    submitHandler(data);
    onCloseEditing(false);
  });
  const handleCloseEditing = () => {
    unregister();
    onCloseEditing(false);
  };

  return (
    <form
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()}
      className="editForm"
    >
      <Input<PostType>
        defaultValue={post.title}
        register={register}
        formState={formState}
        type={inputs.title}
        rules={rules.title}
        label="Title:"
      />
      <Textarea<PostType>
        type="body"
        register={register}
        formState={formState}
        rules={rules.postBody}
        defaultValue={post.body}
        label="Content:"
      />
      <div className="flex__container">
        <Button onClick={handleCloseEditing} label="Cancel" />
        <Button onClick={onSubmit} label="Edit Post" />
      </div>
    </form>
  );
};
