import React, { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IUserInfo } from "./models/IUserInfo";
import { RepositoriesInfo } from "./components/RepositoryInfo/RepositoriesInfo";

type GtHubData = {
  user: IUserInfo;
};

export function App() {
  const [login, setLogin] = useState<string>("");

  const [getDataInfo, { data }] = useLazyQuery<GtHubData>(userInfoQuery);

  useEffect(() => {
    getDataInfo({
      //пока так чтобы каждый раз не вбивать
      variables: { login: "VladislavLavrov" },
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
      <Search getData={getData} login={login} loginChange={loginChange} />
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
          <RepositoriesInfo
            repositories={data.user.repositories.nodes}
            name={data.user.name}
          />
        </>
      ) : null}
    </div>
  );
}
