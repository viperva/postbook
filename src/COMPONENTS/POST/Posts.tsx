import { useState } from "react";
import { deletePost, postPost } from "../MISC/services";
import AddPost from "./AddPost";
import { PostType } from "../MISC/types";
import "./posts.scss";
import Button from "../GENERICS/Button";
import PostPreview from "./PostPreview";
import { useSelector, useDispatch } from "react-redux";
import { addPost, removePost, selectPosts } from "../../store";

const Posts = () => {
  const [isAddPost, setIsAddPost] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const deleteHandler = (postId: number) => {
    deletePost(postId);
    const deletedPost = posts.find((p) => Number(p.id) === Number(postId));
    deletedPost && dispatch(removePost(deletedPost));
    setWasDeleted(true);
    setTimeout(() => {
      setWasDeleted(false);
    }, 2000);
  };

  const submitHandler = (data: PostType) => {
    dispatch(addPost(data));
    postPost(data);
  };

  return (
    <>
      <div style={{ right: wasDeleted ? "1rem" : "-100%" }} className="delete">
        Post was successfuly deleted!
      </div>
      <>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "10%",
            translate: "-50%",
          }}
        >
          <Button
            label={isAddPost ? "Cancel" : "Add Post"}
            onClick={() => setIsAddPost(!isAddPost)}
          />
        </div>

        {isAddPost && (
          <div className="addPost__form">
            <AddPost submitHandler={submitHandler} />
          </div>
        )}
        <nav className="posts">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <PostPreview key={post.id} post={post} onDelete={deleteHandler} />
            ))}
        </nav>
      </>
    </>
  );
};

export default Posts;
