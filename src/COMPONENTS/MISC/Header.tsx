import { Link } from "react-router-dom";

export default function Header() {
  return (
      <header className="app__header">
        <Link className="app__header__title" to="/">PostBook</Link>
        <nav className="app__nav">
          <Link to="/users">Users</Link> {" | "}
          <Link to="/posts">Posts</Link>
        </nav>
      </header>
  );
}