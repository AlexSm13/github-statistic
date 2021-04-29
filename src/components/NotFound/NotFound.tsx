import notFoundImg from "../../images/404.png";
import React from "react";

const NotFound: React.FC = () => {
  console.log("zzzzz");
  return (
    <div className={"not-found-container"}>
      <h1 className={"title"}>Не нашли такой логин :(</h1>
      <img src={notFoundImg} alt="not found" />
    </div>
  );
};

export default NotFound;
