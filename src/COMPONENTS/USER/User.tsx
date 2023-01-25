import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IsLoading from "../LAYOUT/IsLoading";
import { PostType, UserType } from "../MISC/types";
import "./User.scss";
import { useSelector } from "react-redux";
import { selectPosts, selectUsers } from "../../store";

const User = () => {
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();
  const allPosts = useSelector(selectPosts);
  const [posts, setPosts] = useState<PostType[]>();
  let { userId } = useParams();

  const users = useSelector(selectUsers);

  useEffect(() => {
    setUser(
      users.find((u) => {
        return Number(u.id) === Number(userId);
      })
    );
  }, [userId, users]);

  useEffect(() => {
    const userPosts = allPosts.filter((p) => {
      return Number(p.userId) === Number(userId);
    });
    setPosts(userPosts);
  }, [user]);

  return (
    <>
      {user && (
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
              <Link className="user__post" to={`/posts/${post.id}`} key={index}>
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default User;
