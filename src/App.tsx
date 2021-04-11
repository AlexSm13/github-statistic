import React, { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IUserInfo } from "./models/IUserInfo";
import { MainStatistics } from "./components/RepositoryInfo/MainStatistics";
import NotFound from "./components/NotFound/NotFound";

type GtHubData = {
  user: IUserInfo;
};

export function App() {
  const [login, setLogin] = useState<string>("");

  const [getDataInfo, { loading, error, data }] = useLazyQuery<GtHubData>(
    userInfoQuery
  );

  useEffect(() => {
    getDataInfo({
      //пока так чтобы каждый раз не вбивать
      variables: { login: "KuzmichAlexander" },
    });
  }, []);

  const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const getData = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    getDataInfo({
      variables: { login },
    });
  };

  console.log(data);

  return (
    <div className={"container"}>
      <Search
        maxWidth={"442px"}
        title={"Поисковик пользователей"}
        placeholder={"login Github"}
        getData={getData}
        value={login}
        valueChange={loginChange}
      />
      {loading ? (
        <>
          <div className={"spinner"}>
            <div className={"ball"} />
            <p>LOADING</p>
          </div>
        </>
      ) : null}
      {login && error ? <NotFound /> : null}

      {data && data.user ? (
        <>
          <UserInfo
            websiteUrl={data.user.websiteUrl}
            company={data.user.company}
            organization={data.user.organization}
            location={data.user.location}
            email={data.user.email}
            name={data.user.name}
            imgURL={data.user.avatarUrl}
            login={data.user.login}
          />
          <MainStatistics
            repositories={data.user.repositories.nodes}
            totalCount={data.user.repositories.totalCount}
            name={data.user.name}
          />
        </>
      ) : null}
    </div>
  );
}
