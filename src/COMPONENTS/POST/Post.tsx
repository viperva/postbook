import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./post.scss";
import Comments from "../COMMENT/Comments";
import { PostType, UserType } from "../MISC/types";
import { Link } from "react-router-dom";
import Button from "../GENERICS/Button";
import { useSelector } from "react-redux";
import { selectPosts, selectUsers } from "../../store";

const Post = () => {
  let { postId } = useParams();
  const [post, setPost] = useState<PostType>();
  const [postUser, setPostUser] = useState<UserType>();
  const [showComments, setShowComments] = useState<boolean>(false);
  const posts = useSelector(selectPosts);
  const users = useSelector(selectUsers);

  useEffect(() => {
    setPost(
      posts.find((p) => {
        return Number(p.id) === Number(postId);
      })
    );
  }, [postId, posts]);

  useEffect(() => {
    setPostUser(users.find((u) => Number(u.id) === Number(post?.userId)));
  }, [post, postId, postUser, users]);

  return (
    <>
      <div className="post">
        {postUser && (
          <div style={{ display: "flex" }}>
            <Link to={`/users/${postUser.id}`}>
              <img
                className="post__userPhoto"
                src={`https://picsum.photos/seed/${postUser.id}/100`}
                alt="user"
              />
            </Link>
            <Link to={`/users/${postUser.id}`}>
              <h3>Post by: {postUser.username}</h3>
            </Link>
          </div>
        )}
        <h2 className="post__title">Title: {post && post.title}</h2>
        <p className="post__body">
          Content:
          <br />
          {post && post.body}
        </p>
        <Button
          label={showComments ? "Hide comments" : "Show comments"}
          onClick={() => setShowComments(!showComments)}
        />
        {showComments && <Comments />}
      </div>
    </>
  );
};

export default Post;
