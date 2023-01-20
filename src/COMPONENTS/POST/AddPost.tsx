
import { useForm, SubmitHandler } from "react-hook-form";
import { postPost } from "../MISC/services";
import { PostType } from "../MISC/types";
import "./AddPost.scss";

type addPost = {
    setIsSubmitted: (isSubmitted: boolean) => void,
    update: (posts: PostType) => void,
    amount: number
}

const AddPost:React.FC<addPost> = ({
    setIsSubmitted,
    update,
    amount
}) =>{
    
    const { register, handleSubmit, reset, formState } = useForm<PostType>();

    const onSubmit: SubmitHandler<PostType> = async (data) => {
        try{
            
            const post = await postPost(data);
            amount++;
            post.data.id = amount.toString();

            reset();
            setIsSubmitted(false);
            update(post.data);

        } catch(error) {
            console.log(error)
        }
    }

    return(
        <>
            <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="postForm__input">
                <label htmlFor="UserId">UserId:</label>
                <input type='number' {...(register("userId", {required: true, max: {value: 10, message: 'Enter Id between 1 and 10'}, min: {value: 1, message: 'Enter Id between 1 and 10'}}))}/>
                <span style={{width: "20rem"}}>
                {formState.errors.userId?.message && (<span className="form__error">{formState.errors.userId?.message}</span>)}
                </span>
            </div>

            <div className="postForm__input">
                <label htmlFor="title">Title:</label>
                <input type='string' {...(register("title",
                {
                required: true,
                maxLength: {
                    value: 60,
                    message: 'Enter a title under 60 characters.'
                }
                }))}/>
                <span style={{width: "20rem"}}>
                {formState.errors.title?.message && (<span className="form__error">{formState.errors.title?.message}</span>)}
                </span>
            </div>

            <div className="postForm__input">
                <label htmlFor="body">Content:</label>
                <textarea className="postForm__body" rows={6} cols={20}  {...(register("body",
                {
                    required: true,
                    maxLength: {
                        value: 1000,
                        message: 'Enter a post body under 1000 characters.'
                    }
                    }
                ))}/>
                <span style={{width: "20rem"}}>
                {formState.errors.body?.message && (<span className="form__error">{formState.errors.body?.message}</span>)}
                </span>
            </div>

            <input className="submitButton" type="submit"/>

        </form>
        </>
    );
}

export default AddPost;