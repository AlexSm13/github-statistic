import React, { useState } from "react";
import searchIcon from "../../images/search.svg";

import Search from "../Search/Search";

type UserSeacrhType = {
  getUserInfo: (
    login: string,
    token?: string,
    secondLogin?: string,
    secondToken?: string
  ) => void;
  classContainer: string;
};

export const UserSearch: React.FC<UserSeacrhType> = ({
  getUserInfo,
  classContainer,
}) => {
  const [userLogin, setUserLogin] = useState<string>("");
  const [secondUserLogin, setSecondUserLogin] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const [secondUserToken, setSecondUserToken] = useState<string>("");
  const [secondUserRequirement, setSecondUserRequirement] = useState<boolean>(
    false
  );
  const [moreOptions, setMoreOptions] = useState<boolean>(false);

  const secondUserChange = () => {
    setSecondUserRequirement((prev) => !prev);
  };

  const formSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    getUserInfo(userLogin, userToken, secondUserLogin, secondUserToken);
  };

  return (
    <div className={classContainer}>
      <h1>GitHub-Statistic</h1>
      <p>
        Здесь можно посмотреть подробную статистику по любому аккаунту github-a,
        для этого просто вбей логин в поле ниже :)
      </p>
      <form onSubmit={formSubmit}>
        <div className={"search-users-container"}>
          <div className={"search-container"}>
            <div className={"search-form"}>
              <input
                placeholder={"login Github"}
                className={"user-search-input"}
                onChange={(e) => setUserLogin(e.target.value)}
                value={userLogin}
                type="text"
              />
              <button type={"submit"}>
                <img src={searchIcon} alt="Поиск" />
              </button>
            </div>
          </div>

          {/*<Search*/}
          {/*    maxWidth={"442px"}*/}
          {/*    title={"Поисковик статистики"}*/}
          {/*    placeholder={"login Github"}*/}
          {/*    value={userLogin}*/}
          {/*    valueChange={(e) => setUserLogin(e.target.value)}*/}
          {/*/>*/}
          {/*{secondUserRequirement ? <Search*/}
          {/*    maxWidth={"442px"}*/}
          {/*    title={"Второй пользователь"}*/}
          {/*    placeholder={"login Github"}*/}
          {/*    value={userLogin}*/}
          {/*    valueChange={(e) => setUserLogin(e.target.value)}*/}
          {/*/> : null}*/}
        </div>

        <input
          type="checkbox"
          className="custom-checkbox"
          id="secondUser"
          name="secondUser"
          value="yes"
        />
        <label
          onClick={secondUserChange}
          className={"custom-checkbox-label"}
          htmlFor="secondUser"
        >
          Будем сравнивать 2 людей
        </label>
        <div
          onClick={() => setMoreOptions((prev) => !prev)}
          className={"more-options-container"}
        >
          <div
            className={moreOptions ? "treangle-open" : "treangle-close"}
          ></div>
          <p className={"more-options-text"}>
            Расширенные настройки (premium status)
          </p>
        </div>
        {moreOptions ? (
          <div>
            <p>
              Чтобы получить дополнительную информацию по аккаунту, вы можете
              вставить access-токен в поле ниже
            </p>
            <input
              placeholder={"access-token"}
              className={"user-search-input"}
              onChange={(e) => setUserToken(e.target.value)}
              value={userToken}
              type="text"
            />
            <a target={"_blank"} href="https://github.com/settings/tokens/new">
              Получить токен можно по ссылке
            </a>
            <p>
              *проставь все галочки в полях, чтобы можно было получить приватные
              репозитории, участников репозиториев и активности
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
};
