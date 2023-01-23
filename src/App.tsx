import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Posts from "./COMPONENTS/POST/Posts";
import Users from "./COMPONENTS/USER/Users";
import React from "react";
import Landing from "./COMPONENTS/LAYOUT/Landing";
import Header from "./COMPONENTS/LAYOUT/Header";
import About from "./COMPONENTS/LAYOUT/About";
import Post from "./COMPONENTS/POST/Post";
import User from "./COMPONENTS/USER/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:postId",
        element: <Post />,
      },
      {
        path: "users/:userId",
        element: <User />,
      },
    ],
  },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default App;
