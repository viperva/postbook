import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getPosts, getUsers } from "../MISC/services";
import Header from "../LAYOUT/Header";
import IsLoading from "../LAYOUT/IsLoading";
import AddPost from "./AddPost";
import { PostType, UserType } from "../MISC/types";
import "./posts.scss";
import Button from "../GENERICS/Button";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddPost, setIsAddPost] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);

  const update = (post: PostType) => {
    setPosts((prev) => [post, ...prev]);
  };

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
              <div key={post.id} className="posts__body">
                <button
                  className="posts__deleteButton"
                  onClick={() => deleteHandler(parseInt(post.id))}
                >
                  X
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
              </div>
            ))}
          </nav>
        </>
      )}
    </>
  );
};

export default Posts;
