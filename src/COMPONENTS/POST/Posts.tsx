import { useCallback, useEffect, useState } from "react";
import { deletePost, getPosts, getUsers } from "../MISC/services";
import IsLoading from "../LAYOUT/IsLoading";
import AddPost from "./AddPost";
import { PostType, UserType } from "../MISC/types";
import "./posts.scss";
import Button from "../GENERICS/Button";
import PostPreview from "./PostPreview";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddPost, setIsAddPost] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);

  const deleteHandler = async (postId: number) => {
    const newPosts = posts.filter((post) => parseInt(post.id) !== postId);
    setPosts(newPosts);
    try {
      await deletePost(postId);
      setWasDeleted(true);
      setTimeout(() => {
        setWasDeleted(false);
      }, 3500);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPosts();
      if (data.length) {
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitHandler = (data: PostType) => {
    setPosts([{ ...data, id: (posts.length + 1).toString() }, ...posts]);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <div style={{ right: wasDeleted ? "1rem" : "-100%" }} className="delete">
        Post was successfuly deleted!
      </div>
      {isLoading ? (
        <IsLoading />
      ) : (
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
            {posts.map((post) => (
              <PostPreview
                key={post.id}
                post={post}
                users={users}
                onDelete={deleteHandler}
              />
            ))}
          </nav>
        </>
      )}
    </>
  );
};

export default Posts;
