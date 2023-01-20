import ReactDOM from "react-dom/client";
import App from "./App";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import Users from "./COMPONENTS/USER/Users";
import Post from "./COMPONENTS/POST/Post";
import Posts from "./COMPONENTS/POST/Posts";
import Header from "./COMPONENTS/MISC/Header";
import User from "./COMPONENTS/USER/User";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="users" element={<Users />} />
      <Route path="posts" element={<Posts />} />
      <Route path="posts/:postId" element={<Post/>} />
      <Route path="users/:userId" element={<User/>} />
      <Route
      path="*"
      element={
        <>
          <Header/>
          <p className="wrongAddress">There's nothing here!</p>
        </>
      }
    /> 
    </Routes>
  </HashRouter>
);