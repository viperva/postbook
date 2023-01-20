import { deleteComment, getComments } from "../MISC/services";
import { CommentType } from "../MISC/types";
import { useCallback, useEffect, useState } from "react";
import IsLoading from "../MISC/IsLoading";
import AddComment from "./AddComment";

interface CommentsType {
    postId: string | undefined,
}

const Comments: React.FC<CommentsType> = (
    {postId}
) => {

    const [comments, setComments] = useState<CommentType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddComment, setIsAddComment] = useState<boolean>(false);
    const [wasDeleted, setWasDeleted] = useState<boolean>(false);

    const update = (comment: CommentType) => {
      setComments((prev) => [...prev, comment]);
    }

    const deleteHandler = async (postId: number, commentId: number) => {
      const newComments = comments.filter((comment) => parseInt(comment.id) !== commentId);
      setComments(newComments);
      try{
        await deleteComment(postId, commentId);
        setWasDeleted(true);
        setTimeout(() => {setWasDeleted(false);}, 3500);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchComments = useCallback(async ()=> {
        setIsLoading(true);
        try{
          const comments = await getComments(postId);
          setComments(comments);
        } catch {
          console.error("Couldn't load comments.");
        }
        setIsLoading(false);
      },[postId]);
  
      useEffect(() => {
        fetchComments();
      },[fetchComments]);

    return(
        <div>
          <div style={{right: wasDeleted ? "1rem" : "-100%"}} className="delete">Comment was successfuly deleted!</div>
            {isLoading ? <IsLoading/> : (comments.length ? (comments.map((comment: CommentType) =>(
              <div className="post__comment" key={comment.id}>
                <img className="post__commentPhoto" src={`https://picsum.photos/seed/${comment.id}/30`} alt='user'/>
                <span className="post__comment__username">
                  Username: {comment.name}
                </span>
                {" - email: "}
                <span className="post__comment__email">
                  {comment.email}
                </span>
                {postId && <button onClick={() => deleteHandler(parseInt(postId), parseInt(comment.id))} className="post__comment__delete">
                  Delete comment
                </button>}
                <p className="post__comment__body">
                  Comment:<br/>{comment.body}
                </p>
              </div>
            )
            )) : <div style={{margin: "1rem 0 1rem 0"}}>No comments.</div>)}
            <button onClick={() => setIsAddComment(!isAddComment)}>
                {isAddComment ? 'Cancel' : 'Add Comment'}
            </button>
            {isAddComment && <AddComment postId={postId} update={update} amount={comments.length} />}
            
          </div>
    );
}

export default Comments;