import { useState } from "react";
import { Link } from "react-router-dom";
import { PostType, UserType } from "../MISC/types";
import { EditPost } from "./EditPost";
import Backdrop from "../BACKDROP/Backdrop";
import "./posts.scss";

type PostPreviewProps = {
  post: PostType;
  users: UserType[];
  onDelete: (id: number) => void;
};

const PostPreview: React.FC<PostPreviewProps> = ({ post, users, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const deleteHandler = () => onDelete(+post.id);
  const editHandler = () => {
    setIsEditing(true);
  };

  return (
    <div key={post.id} className="posts__body">
      <button className="posts__deleteButton" onClick={() => deleteHandler()}>
        X
      </button>
      <button className="posts__editButton" onClick={editHandler}>
        ✏
      </button>
      <h3 style={{ marginBottom: "1rem" }}>Title:</h3>

      <Link className="posts__link" to={`/posts/${post.id}`}>
        {post.title}
      </Link>
      {users[post.userId - 1] && (
        <Link
          to={`/users/${users[post.userId - 1].id}`}
          className="posts__info"
        >
          <img
            className="posts__userPhoto"
            src={`https://picsum.photos/seed/${post.userId}/50`}
            alt="user"
          />
          <h4>By: {users[post.userId - 1].username}</h4>
        </Link>
      )}
      {isEditing && (
        <Backdrop>
          <EditPost post={post} onCloseEditing={setIsEditing} />
        </Backdrop>
      )}
    </div>
  );
};
export default PostPreview;
