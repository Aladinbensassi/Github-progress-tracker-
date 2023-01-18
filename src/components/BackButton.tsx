import React from "react";
import { ReactComponent as ArrowBack } from "../assets/arrow-back.svg";
import { useNavigate } from "react-router-dom";

const BackButton: React.FunctionComponent = () => {
    const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="flex flex-row absolute top-0 left-0 gap-2"
    >
      <ArrowBack className="dark:fill-shade2-light fill-shade2-dark" />{" "}
    </button>
  );
};

export default BackButton;
