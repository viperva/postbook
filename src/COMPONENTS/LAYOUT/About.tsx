import React from "react";
import { Link } from "react-router-dom";
import "./Layout.scss";

const About = () => {
  return (
    <div className="about">
      <h1 className="about__welcome">Welcome to PostBook</h1>
      <h2 className="about__option">
        While you are here go ahead and browse posts:
      </h2>
      <Link className="about__link" to="posts">
        Posts
      </Link>
      <h2 className="about__option">or users:</h2>
      <Link className="about__link" to="users">
        Users
      </Link>
    </div>
  );
};

export default About;
