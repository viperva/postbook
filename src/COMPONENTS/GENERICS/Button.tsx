import React from "react";
import "./Generics.scss";

type ButtonProps = {
  label: string;
  onClick: any;
};

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
