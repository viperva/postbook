import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../GENERICS/Button";
import Input, { inputs } from "../GENERICS/Input";
import { Select, selects } from "../GENERICS/Select";
import { rules } from "../MISC/rules";
import { getUsers } from "../MISC/services";
import { PostType, UserType } from "../MISC/types";
import "./editPost.scss";

type editPost = {
  post: PostType;
  onCloseEditing: React.Dispatch<SetStateAction<boolean>>;
};

export const EditPost: React.FC<editPost> = ({ post, onCloseEditing }) => {
  const { register, formState } = useForm<PostType>();
  const [users, setUsers] = useState<UserType[]>();
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);

  useEffect(() => {
    const placeUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    placeUsers();
  }, []);
  const handleSubmit = (e: HTMLButtonElement) => {
    console.log(title);
    console.log(content);
  };
  const handleCloseEditing = () => {
    onCloseEditing(false);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.currentTarget.value);

  return (
    <form
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()}
      className="editForm"
    >
      <label>Title</label>
      <Input<PostType>
        defaultValue={post.title}
        register={register}
        formState={formState}
        type={inputs.title}
        rules={rules.title}
        onChange={handleTitleChange}
      />
      <label> Content</label>
      <textarea
        className="textarea"
        defaultValue={post.content}
        onChange={handleContentChange}
      />
      <div className="flex__container">
        <Button onClick={handleCloseEditing} label="CLOSE" />
        <Button onClick={handleSubmit} label="EDIT POST" />
      </div>
    </form>
  );
};
