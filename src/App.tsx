import React, { useState } from "react";
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IUserInfo } from "./models/IUserInfo";
import RepositoryInfo from "./components/RepositoryInfo/RepositoryInfo";

type GtHubData = {
  user: IUserInfo;
};

function App() {
  const [login, setLogin] = useState<string>("");

  const [getDataInfo, { data }] = useLazyQuery<GtHubData>(userInfoQuery);

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
          <UserInfo imgURL={data.user.avatarUrl} login={data.user.login} />
          {data.user.repositories.nodes.forEach((rep) => (
            <RepositoryInfo data={rep} />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default App;
