import notFoundImg from "../../images/404.png";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className={"not-found-container"}>
      <img src={notFoundImg} alt="not found" />
    </div>
  );
};

export default NotFound;
