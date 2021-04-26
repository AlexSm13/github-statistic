import React from "react";

type UserInfoType = {
  login: any;
  imgURL: string;
  name: string;
  location: string;
  email: string;
  websiteUrl: string;
  organization: { name: string };
  company: string;
};

const UserInfo: React.FC<UserInfoType> = ({
  websiteUrl,
  login,
  imgURL,
  company,
  organization,
  name,
  email,
  location,
}) => {
  if (!login) {
    return <div>Нет данных</div>;
  }

  return (
    <div className={"user-info-container"}>
      <section className={"loginAvatar-container"}>
        <div className={"avatar"}>
          <img src={imgURL} alt="Avatar" />
        </div>
        <h1>{login}</h1>
      </section>
      <section className={"user-start-info"}>
        <h1 className={"title"}>Основная информация</h1>
        <label>
          <p className={"user-info-description"}>Имя:</p>
          <p>{infoParse(name)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Организация:</p>
          <p style={{ display: "flex" }}>
            {organization
              ? infoParse(organization.name)
              : company
              ? infoParse(company)
              : infoParse()}
          </p>
        </label>
        <label>
          <p className={"user-info-description"}>Местоположение:</p>
          <p>{infoParse(location)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Email:</p>
          <p>{infoParse(email)}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Сайт:</p>
          <p>{infoParse(websiteUrl)}</p>
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
