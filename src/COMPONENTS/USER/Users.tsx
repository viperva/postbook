import React, { useCallback, useEffect, useState } from 'react';
import Header from '../MISC/Header';
import IsLoading from '../MISC/IsLoading';
import { getUsers } from '../MISC/services';
import { Link } from 'react-router-dom';
import "./users.scss"
import AddUser from './AddUser';
import { UserType } from '../MISC/types';

const Users = () =>{

    const [people, setPeople] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddUser, setIsAddUser] = useState<boolean>(false);


    const update = (user: UserType) => {
        setPeople(prev => [user, ...prev]);
    }


    const fetchUsers = useCallback(async () =>{
        setIsLoading(true);
        try{
            const people = await getUsers();
            setPeople(people);
        } catch (error){
            console.log(error);
        }
        setIsLoading(false);
    },[]);

    useEffect(() => {
        fetchUsers();
    },[fetchUsers]);

    return(
        <>
            <Header/>
            {isLoading ? <IsLoading/> :
            <>
                <button onClick={() => setIsAddUser(!isAddUser)} className="addPost">
                    {isAddUser ? "Cancel" : "Add User"}
                </button>
                {isAddUser && <div className="addPost__form" ><AddUser amount={people.length} update={update} setIsSubmitted={setIsAddUser}/></div>}
                <div className='users'>
                    {people.map(user =>
                        <Link className='users__user'
                            to={`/users/${user.id}`}
                            key={user.id}>
                                <img className="users__photo" src={`https://picsum.photos/seed/${user.id}/50`} alt='user'/>
                                <div>
                                    {user.name}<br/>AKA: {user.username}
                                </div>
                        </Link>)
                    }
                </div>
            </>
            }
        </>
    );

}

export default Users;