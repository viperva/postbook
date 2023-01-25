import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { useDispatch } from "react-redux";
import { setPosts, setUsers } from "../../store";
import { getPosts, getUsers } from "../MISC/services";

const Landing = () => {
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    const dataPosts = await getPosts();
    const dataUsers = await getUsers();
    if (dataPosts.length) {
      dispatch(setPosts(dataPosts));
    }
    if (dataUsers.length) {
      dispatch(setUsers(dataUsers));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div className="background"></div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Landing;
