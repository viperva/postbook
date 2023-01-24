import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
// import { Provider } from "react-redux";
import Header from "./COMPONENTS/LAYOUT/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </>
);
