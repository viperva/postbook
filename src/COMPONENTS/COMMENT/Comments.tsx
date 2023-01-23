import { deleteComment, getComments } from "../MISC/services";
import { CommentType } from "../MISC/types";
import { useCallback, useEffect, useState } from "react";
import IsLoading from "../LAYOUT/IsLoading";
import AddComment from "./AddComment";
import Button from "../GENERICS/Button";
import { useParams } from "react-router-dom";

interface CommentsType {}

const Comments: React.FC<CommentsType> = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddComment, setIsAddComment] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const comments = await getComments(postId);
      setComments(comments);
    } catch {
      console.error("Couldn't load comments.");
    }
    setIsLoading(false);
  }, [postId]);

  const submitHandler = (data: CommentType) => {
    setComments([
      ...comments,
      { ...data, id: comments[comments.length - 1].id + 1 },
    ]);
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <div style={{ right: wasDeleted ? "1rem" : "-100%" }} className="delete">
        Comment was successfuly deleted!
      </div>
      {isLoading ? (
        <IsLoading />
      ) : comments.length ? (
        comments.map((comment: CommentType) => {
          console.log(comment.id);
          return (
            <div className="post__comment" key={comment.id}>
              <img
                className="post__commentPhoto"
                src={`https://picsum.photos/seed/${comment.id}/30`}
                alt="user"
              />
              <span className="post__comment__username">
                Username: {comment.username}
              </span>
              {" - email: "}
              <span className="post__comment__email">{comment.email}</span>

              <p className="post__comment__body">
                Comment:
                <br />
                {comment.body}
              </p>
            </div>
          );
        })
      ) : (
        <div style={{ margin: "1rem 0 1rem 0" }}>No comments.</div>
      )}
      <Button
        label={isAddComment ? "Cancel" : "Add Comment"}
        onClick={() => setIsAddComment(!isAddComment)}
      />

      {isAddComment && <AddComment submitHandler={submitHandler} />}
    </div>
  );
};

export default Comments;
