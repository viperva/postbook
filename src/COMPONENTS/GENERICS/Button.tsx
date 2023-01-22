import React from "react";
import { PostType } from "../MISC/types";

type ButtonProps = {
  label: string;
  onClick: (data?: any) => void;
};

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
