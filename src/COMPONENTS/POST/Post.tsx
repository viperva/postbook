import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost, getUser } from "../MISC/services";
import Header from "../MISC/Header";
import IsLoading from "../MISC/IsLoading";
import "./post.scss";
import Comments from "../COMMENT/Comments";
import { PostType, UserType } from "../MISC/types";
import { Link } from "react-router-dom";

const Post = () => {

    let params = useParams();
    const [post, setPost] = useState<PostType>();
    const [postUser, setPostUser] = useState<UserType>();
    const [showComments, setShowComments] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchPost = useCallback(async ()=> {
      setIsLoading(true);
      try{
        const post = await getPost(params.postId);
        const user = await getUser(post.userId.toString());
        setPost(post);
        setPostUser(user);
      } catch (error){
        console.log(error);
      }
      setIsLoading(false);
    },[params.postId]);

    useEffect(() => {
      fetchPost();  
    },[fetchPost]);

    return (
      <>
        <Header/>
        {isLoading ? <IsLoading/> :
        <>
        <div className="post">
          {postUser && 
          <div style={{display: "flex"}}>
            <Link to={`/users/${postUser.id}`}>
              <img className="post__userPhoto" src={`https://picsum.photos/seed/${postUser.id}/100`} alt='user'/>
            </Link>
            <Link to={`/users/${postUser.id}`}>
              <h3>Post by: {postUser.username}</h3>
            </Link>
          </div>
          }
          <h2 className="post__title">
            Title: {post && post.title}
          </h2>
          <p className="post__body">
            Content:<br/>
            {post && post.body}
          </p>
          <button onClick={() => setShowComments(!showComments)} className="post__commentsButton">
          {showComments ? "Hide comments" : "Show comments"}
          </button>
          {showComments && <Comments postId={params.postId}/>}
        </div>
        </>}
      </>
    );
  }

  export default Post;