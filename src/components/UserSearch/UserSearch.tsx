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
  const [userLogin, setUserLogin] = useState<string>("KuzmichAlexander");
  const [secondUserLogin, setSecondUserLogin] = useState<string>("AlexSm13");
  const [userToken, setUserToken] = useState<string>(
    "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"
  );
  const [secondUserToken, setSecondUserToken] = useState<string>("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");
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
    <div
      className={`${classContainer} ${
        secondUserRequirement ? "search-two-users-wrapper" : ""
      }`}
    >
      <h1>GitHub-Statistic</h1>
      <p>
        Здесь можно посмотреть подробную статистику по любому аккаунту github-a,
        для этого просто вбей логин в поле ниже :)
      </p>
      <form onSubmit={formSubmit}>
        <div
          className={
            "search-user-container" + secondUserRequirement
              ? "search-two-users-container"
              : ""
          }
        >
          <div className={"search-container search-main-form"}>
            <div className={"search-form"}>
              <input
                placeholder={
                  secondUserRequirement ? "first-login" : "login Github"
                }
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
          {secondUserRequirement ? (
            <div className={"search-container"}>
              <div className={"search-form"}>
                <input
                  placeholder={"second-login"}
                  className={"user-search-input"}
                  onChange={(e) => setSecondUserLogin(e.target.value)}
                  value={secondUserLogin}
                  type="text"
                />
                <button type={"submit"}>
                  <img src={searchIcon} alt="Поиск" />
                </button>
              </div>
            </div>
          ) : null}

          {/*<Search*/}

          {/*    maxWidth={"442px"}*/}
          {/*    title={"Поисковик статистики"}*/}
          {/*    placeholder={"login Github"}*/}
          {/*    value={userLogin}*/}
          {/*    valueChange={(e) => setUserLogin(e.target.value)}*/}
          {/*/>*/}
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
        <div
          className={`more-options-info-wrapper ${
            moreOptions ? "more-options-info-wrapper-active" : ""
          }`}
        >
          <p>
            Чтобы получить информацию о приватных репозиториях, их участниках и активностях по аккаунту, вы можете
            вставить access-токен в поле ниже
          </p>
          <div className={"users-access-tokens-container"}>
            <input
              placeholder={"first-access-token"}
              className={`user-search-input ${
                secondUserRequirement
                  ? "two-users-access-token-input-width"
                  : ""
              }`}
              onChange={(e) => setUserToken(e.target.value)}
              value={userToken}
              type="text"
            />
            {secondUserRequirement ? (
              <input
                placeholder={"second-access-token"}
                className={
                  "user-search-input two-users-access-token-input-width"
                }
                onChange={(e) => setSecondUserToken(e.target.value)}
                value={secondUserToken}
                type="text"
              />
            ) : null}
          </div>

          <a target={"_blank"} href="https://github.com/settings/tokens/new">
            Получить токен можно по ссылке
          </a>
          <p>
            *введи свой пароль и проставь все галочки в полях
          </p>
        </div>
      </form>
    </div>
  );
};
