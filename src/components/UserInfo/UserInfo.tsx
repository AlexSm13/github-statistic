import React from "react";
import { IUserInfo } from "../../models/IUserInfo";

type UserInfoType = {
  data: IUserInfo;
};

const UserInfo: React.FC<UserInfoType> = ({ data }) => {
  if (!data.login) {
    return <div>Нет данных</div>;
  }

  return (
    <div className={"user-info-container"}>
      <section className={"loginAvatar-container"}>
        <div className={"avatar"}>
          <img src={data.avatarUrl} alt="Avatar" />
        </div>
        <h1>{data.login}</h1>
      </section>
      <section className={"user-start-info"}>
        <h1 className={"title"}>Основная информация</h1>
        <label>
          <p className={"user-info-description"}>Имя:</p>
          <p>{infoParse(data.name)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Организация:</p>
          <p style={{ display: "flex" }}>
            {data.organization
              ? infoParse(data.organization.name)
              : data.company
              ? infoParse(data.company)
              : infoParse()}
          </p>
        </label>
        <label>
          <p className={"user-info-description"}>Местоположение:</p>
          <p>{infoParse(data.location)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Email:</p>
          <p>{infoParse(data.email)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Сайт:</p>
          <p>{infoParse(data.websiteUrl)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Био:</p>
          <p>{infoParse(data.bio)}</p>
        </label>
      </section>
    </div>
  );
};

export default UserInfo;

export function infoParse(data: string = "Не указано") {
  if (!data) {
    return "Не указано";
  }
  return data;
}
