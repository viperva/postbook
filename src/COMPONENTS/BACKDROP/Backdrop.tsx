import ReactDOM from "react-dom";
import styles from "./Backdrop.module.scss";
type BackdropProps = {
  children: JSX.Element;
};

const Backdrop: React.FC<BackdropProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.backdrop}>{children}</div>
    </>,
    document.body
  );
};
export default Backdrop;
