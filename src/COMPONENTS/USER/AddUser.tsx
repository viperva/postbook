import { SubmitHandler, useForm } from "react-hook-form";
import { postUser } from "../MISC/services";
import { UserType } from "../MISC/types";

type addUser = {
    setIsSubmitted: (isSubmitted: boolean) => void,
    update: (posts: UserType) => void,
    amount: number
}

const AddUser:React.FC<addUser> = ({
    setIsSubmitted,
    update,
    amount
}) =>{

    const { register, handleSubmit, reset, formState } = useForm<UserType>();

    const onSubmit: SubmitHandler<UserType> = async (data) => {
        try{
            
            const user = await postUser(data);
            amount++;
            user.data.id = amount;

            reset();
            setIsSubmitted(false);
            update(user.data);

        } catch(error) {
            console.log(error)
        }
    }

    return(
        <>
            <form className="userForm" onSubmit={handleSubmit(onSubmit)}>

            <div className="userForm__section">
                <div className="userForm__input">
                    <h3>Basic info: *required*</h3>
                    <label htmlFor="name">Name:</label>
                    <input type='string' {...(register("name", 
                    {
                        required: true,
                        maxLength: {
                            value: 30,
                            message: 'Enter a name under 30 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž ]+$/i,
                            message: 'Enter a valid name.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="username">Username:</label>
                    <input type='string' {...(register("username",
                    {
                        required: true,
                        maxLength: {
                            value: 40,
                            message: 'Enter a title under 40 characters.'
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+$/i,
                            message: 'Enter a valid username.'
                        }
                    }))}/>
                </div>


                <div className="userForm__input">
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

                <div className="userForm__input">
                    <label htmlFor="phone">Phone number:</label>
                    <input type='string' {...(register("phone", 
                    {
                        required: true,
                        maxLength: {
                            value: 25,
                            message: 'Enter a valid phone number.'
                        },
                        pattern: {
                            value: /^[0-9- ]+$/i,
                            message: 'Enter a valid phone number.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="website">Website: *not required*</label>
                    <input type='url' {...(register("website", 
                    {
                        required: false,
                        maxLength: {
                            value: 30,
                            message: 'Enter a valid website.'
                        },
                        pattern: {
                            value: /^[A-z0-9.-_/ ]+$/i,
                            message: 'Enter a valid website.'
                        }
                    }))}/>
                </div>

            </div>
            
            <div className="userForm__section">
                <h3>Address: *not required*</h3>

                <div className="userForm__input">
                    <label htmlFor="street">Street:</label>
                    <input type='string' {...(register("address.street", 
                    {
                        required: false,
                        maxLength: {
                            value: 40,
                            message: 'Enter a street name under 40 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž0-9 ]+$/i,
                            message: 'Enter a valid street name.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="suite">Suite:</label>
                    <input type='string' {...(register("address.suite", 
                    {
                        required: false,
                        maxLength: {
                            value: 40,
                            message: 'Enter a suite name under 40 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž.-0-9 ]+$/i,
                            message: 'Enter a valid suite name.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="city">City:</label>
                    <input type='string' {...(register("address.city", 
                    {
                        required: false,
                        maxLength: {
                            value: 40,
                            message: 'Enter a city name under 40 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž]+$/i,
                            message: 'Enter a valid city name.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="zipcode">Zip code:</label>
                    <input type='string' {...(register("address.zipcode", 
                    {
                        required: false,
                        maxLength: {
                            value: 15,
                            message: 'Enter a zipcode under 15 characters.'
                        },
                        pattern: {
                            value: /^[0-9-]+$/i,
                            message: 'Enter a valid zipcode.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="lat">Latitude:</label>
                    <input type='string' {...(register("address.geo.lat", 
                    {
                        required: false,
                        maxLength: {
                            value: 10,
                            message: 'Enter a valid latitude.'
                        },
                        pattern: {
                            value: /^[-0-9.]+$/i,
                            message: 'Enter a valid latitude.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="lng">Longitude:</label>
                    <input type='string' {...(register("address.geo.lng", 
                    {
                        required: false,
                        maxLength: {
                            value: 10,
                            message: 'Enter a valid longitude.'
                        },
                        pattern: {
                            value: /^[-0-9.]+$/i,
                            message: 'Enter a valid longitude.'
                        }
                    }))}/>
                </div>
            </div>

            <div className="userForm__section">
                <h3>Company: *not required*</h3>

                <div className="userForm__input">
                    <label htmlFor="companyName">Name:</label>
                    <input type='string' {...(register("company.name", 
                    {
                        required: false,
                        maxLength: {
                            value: 20,
                            message: 'Enter a company name under 20 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž ]+$/i,
                            message: 'Enter a valid company name.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="catchphrase">Catchphrase:</label>
                    <input type='string' {...(register("company.catchPhrase", 
                    {
                        required: false,
                        maxLength: {
                            value: 50,
                            message: 'Enter a catchphrase under 50 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž -.!]+$/i,
                            message: 'Enter a valid catchphrase.'
                        }
                    }))}/>
                </div>

                <div className="userForm__input">
                    <label htmlFor="bs">Bs:</label>
                    <input type='string' {...(register("company.bs", 
                    {
                        required: false,
                        maxLength: {
                            value: 50,
                            message: 'Enter a bs under 50 characters.'
                        },
                        pattern: {
                            value: /^[A-zÀ-ž -.!]+$/i,
                            message: 'Enter a valid bs.'
                        }
                    }))}/>
                </div>
            <input className="userSubmitButton" type="submit"/>
            </div>


        </form>
        </>
    );
}

export default AddUser;