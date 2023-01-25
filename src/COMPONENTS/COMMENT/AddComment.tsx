import { useForm } from "react-hook-form";
import { AddCommentType, CommentType } from "../MISC/types";
import "./AddComment.scss";
import Input, { inputs } from "../GENERICS/Input";
import { rules } from "../MISC/rules";
import Button from "../GENERICS/Button";

const AddComment: React.FC<AddCommentType> = ({ submitHandler }) => {
  const { register, handleSubmit, reset, formState } = useForm<CommentType>();

  const onSubmit = handleSubmit((data: CommentType) => {
    submitHandler(data);
    reset();
  });

  return (
    <form className="form">
      <Input<CommentType>
        register={register}
        formState={formState}
        type={inputs.username}
        label="Username:"
        rules={rules.username}
      />

      <Input<CommentType>
        register={register}
        formState={formState}
        type={inputs.email}
        label="Email:"
        rules={rules.email}
      />

      <Input<CommentType>
        register={register}
        formState={formState}
        type={inputs.commentBody}
        label="Comment:"
        rules={rules.commentBody}
      />

      <Button onClick={onSubmit} label="ADD COMMENT" />
    </form>
  );
};

export default AddComment;
