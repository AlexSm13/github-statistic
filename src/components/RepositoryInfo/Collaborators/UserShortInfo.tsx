import React from "react";

type UserShortInfoType = {
  avatarUrl: string;
  userName: string;
  userLogin: string;
};

export const UserShortInfo: React.FC<UserShortInfoType> = ({
  userLogin,
  userName,
  avatarUrl,
}) => {
  return (
    <div className={"homie"} key={Math.random()}>
      <div className={"homie-avatar"}>
        <img src={avatarUrl} alt="картинка" />
      </div>
      <div className={"homie-description"}>
        <div className="homie-name">{userName}</div>
        <div className="homie-login">{userLogin}</div>
      </div>
    </div>
  );
};
