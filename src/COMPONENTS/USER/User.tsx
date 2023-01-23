import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../LAYOUT/Header";
import IsLoading from "../LAYOUT/IsLoading";
import { getUserPosts, getUser } from "../MISC/services";
import { PostType, UserType } from "../MISC/types";
import "./User.scss";

const User = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();
  const [posts, setPosts] = useState<PostType[]>();
  let params = useParams();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await getUser(params.userId);
      const posts = await getUserPosts(params.userId);
      setUser(user);
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [params.userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        user && (
          <div className="user">
            <div className="user__left">
              <img
                style={{ visibility: imageIsLoading ? "hidden" : "visible" }}
                onLoad={() => setImageIsLoading(false)}
                className="user__photo"
                src={`https://picsum.photos/seed/${user.id}/400`}
                alt="profile pic"
              />
              <div className="user__info">
                <div className="user__info2">
                  <h1>{user.name}</h1>
                  <h4>Username: {user.username}</h4>
                </div>
                <h1>Contact:</h1>
                <h3>Email: {user.email}</h3>
                <h3>Phone: {user.phone}</h3>
                <h3>
                  Website:{" "}
                  <a href={`https://www.${user.website}`}> {user.website} </a>
                </h3>
              </div>
            </div>
            <div className="user__posts">
              <h1>{user.username}'s posts:</h1>
              {posts?.map((post, index) => (
                <Link
                  className="user__post"
                  to={`/posts/${post.id}`}
                  key={index}
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};
export default User;
