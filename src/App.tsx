import React, { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IUserInfo } from "./models/IUserInfo";
import { MainStatistics } from "./components/RepositoryInfo/MainStatistics";

type GtHubData = {
  user: IUserInfo;
};

export function App() {
  const [login, setLogin] = useState<string>("");

  const [getDataInfo, { data }] = useLazyQuery<GtHubData>(userInfoQuery);

  useEffect(() => {
    getDataInfo({
      //пока так чтобы каждый раз не вбивать
      variables: { login: "AlexSm13" },
    });
  }, []);

  console.log(data);

  const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const getData = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    getDataInfo({
      variables: { login },
    });
  };

  return (
    <div className={"container"}>
      <Search
        width={"442px"}
        title={"Поисковик пользователей"}
        placeholder={"login Github"}
        getData={getData}
        value={login}
        valueChange={loginChange}
      />
      {data ? (
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
            name={data.user.name}
          />
        </>
      ) : null}
    </div>
  );
}
