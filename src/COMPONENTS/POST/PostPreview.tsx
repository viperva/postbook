import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostType, UserType } from "../MISC/types";
import { EditPost } from "./EditPost";
import Backdrop from "../BACKDROP/Backdrop";
import "./posts.scss";
import { useDispatch, useSelector } from "react-redux";
import { editPost, selectUsers } from "../../store";
import { patchPost } from "../MISC/services";

type PostPreviewProps = {
  post: PostType;
  onDelete: (id: number) => void;
};

const PostPreview: React.FC<PostPreviewProps> = ({ post, onDelete }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>();
  const deleteHandler = () => onDelete(+post.id);
  const editHandler = () => {
    setIsEditing(true);
  };

  const submitHandler = (data: PostType) => {
    dispatch(editPost({ ...post, newTitle: data.title, newBody: data.body }));
    patchPost(post.id, data.title, data.body);
  };

  useEffect(() => {
    setUser(users.find((u) => Number(u.id) === Number(post.userId)));
  }, []);

  return (
    <div key={post.id} className="posts__body">
      <button className="posts__deleteButton" onClick={() => deleteHandler()}>
        ❌
      </button>
      <button className="posts__editButton" onClick={editHandler}>
        🖋️
      </button>
      <h3 style={{ marginBottom: "1rem" }}>Title:</h3>

      <Link className="posts__link" to={`/posts/${post.id}`}>
        {post.title}
      </Link>
      {user && (
        <Link to={`/users/${user.id}`} className="posts__info">
          <img
            className="posts__userPhoto"
            src={`https://picsum.photos/seed/${user.id}/50`}
            alt="user"
          />
          <h4>By: {user.username}</h4>
        </Link>
      )}
      {isEditing && (
        <Backdrop>
          <EditPost
            post={post}
            onCloseEditing={setIsEditing}
            submitHandler={submitHandler}
          />
        </Backdrop>
      )}
    </div>
  );
};
export default PostPreview;
