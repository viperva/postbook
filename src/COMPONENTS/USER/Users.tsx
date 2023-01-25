import React, { useState } from "react";
import { postUser } from "../MISC/services";
import { Link } from "react-router-dom";
import "./users.scss";
import AddUser from "./AddUser";
import { UserType } from "../MISC/types";
import Button from "../GENERICS/Button";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUsers } from "../../store";

const Users = () => {
  const [isAddUser, setIsAddUser] = useState<boolean>(false);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const submitHandler = (data: UserType) => {
    dispatch(addUser(data));
    postUser(data);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "10%",
          translate: "-50%",
        }}
      >
        <Button
          label={isAddUser ? "Cancel" : "Add User"}
          onClick={() => setIsAddUser(!isAddUser)}
        />
      </div>
      {isAddUser && (
        <div className="addPost__form">
          <AddUser submitHandler={submitHandler} />
        </div>
      )}
      <div className="users">
        {users.map((user) => (
          <Link className="users__user" to={`/users/${user.id}`} key={user.id}>
            <img
              className="users__photo"
              src={`https://picsum.photos/seed/${user.id}/50`}
              alt="user"
            />
            <div>
              {user.name}
              <br />
              AKA: {user.username}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Users;
