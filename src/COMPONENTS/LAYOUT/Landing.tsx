import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./Layout.scss";

const Landing = () => {
  return (
    <div>
      <div className="background"></div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Landing;
