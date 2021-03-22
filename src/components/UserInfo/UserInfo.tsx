import React from "react";

type userInfoType = {
  login: any;
  imgURL: string;
};

const UserInfo: React.FC<userInfoType> = ({ login, imgURL }) => {
  console.log(login);
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
          <p>{login}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Организация:</p>
          <p>{login}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Страна:</p>
          <p>{login}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Email:</p>
          <p>{login}</p>
        </label>
        <label>
          <p className={"user-info-description"}>Сайт:</p>
          <p>{login}</p>
        </label>
      </section>
    </div>
  );

  // if (!isLoaded) {
  //     return <div>Загрузка...</div>;
  // } else {
  //     return ();
  // }
};
//
export default UserInfo;
