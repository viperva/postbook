import { useForm, SubmitHandler } from "react-hook-form";
import { postComment } from "../MISC/services";
import { CommentType } from "../MISC/types";
import './AddComment.scss';

type AddCommentType = {
    postId: string | undefined,
    update: (comments: CommentType) => void,
    amount: number
};

const AddComment:React.FC<AddCommentType> = ({
    postId,
    update,
    amount
}) =>{

    const { register, handleSubmit, reset, formState } = useForm<CommentType>();

    const onSubmit: SubmitHandler<CommentType> = async (data) => {
        try{
            
            const com = await postComment(postId, data);
            amount++;
            console.log(amount);
            com.data.id = amount.toString();
            com.data.postId = postId;

            console.log(com.data);

            update(com.data);

            reset();

        } catch(error) {
            console.log(error)
        }
    }

    return(
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input">
                <label htmlFor="name">Username:</label>
                <input type='string' {...(register("name", 
                {
                    required: true,
                    maxLength: {
                        value: 30,
                        message: 'Enter a username under 30 characters.'
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+$/i,
                        message: 'Enter a valid username.'
                    }
                    }))}/>
                    {formState.errors.name?.message && (<span className="form__error">{formState.errors.name?.message}</span>)}
            </div>

            <div className="form__input">
                <label htmlFor="email">Email:</label>
                <input type='string' {...(register("email", 
                {
                    required: true, 
                    maxLength: {
                        value: 40,
                        message: 'Enter an address under 40 characters.'
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Enter a valid email.'
                    }
                }))}/>
                {formState.errors.email?.message && (<span className="form__error">{formState.errors.email?.message}</span>)}
            </div>

            <div className="form__input">
                <label htmlFor="body">Comment:</label>
                <textarea className="form__body" rows={6} cols={20}  {...(register("body", 
                {
                    required: true, 
                    maxLength: {
                        value: 300,
                        message: 'Enter a message under 300 characters.'
                    },
                    }))}/>
            {formState.errors.body?.message && (<span className="form__error">{formState.errors.body?.message}</span>)}
            </div>

            <input className="submitButton" type="submit"/>

        </form>
    );
}

export default AddComment;