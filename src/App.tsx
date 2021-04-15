import React, { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { getOthersRepositories, userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IRepositories, IUserInfo } from "./models/IUserInfo";
import { MainStatistics } from "./components/RepositoryInfo/MainStatistics";
import NotFound from "./components/NotFound/NotFound";
import { IRepository } from "./models/IRepository";

type GitHubData = {
  user: IUserInfo;
};

type OthersReposes = {
  user: {
    repositories: IRepositories;
  };
};

const myLogin = "KuzmichAlexander";

export function App() {
  const [login, setLogin] = useState<string>("");
  const [allRepos, setAllRepos] = useState<IRepository[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [getDataInfo, { loading, error, data }] = useLazyQuery<GitHubData>(
    userInfoQuery
  );

  const [
    getOtherDataInfo,
    { data: repData, loading: loadingRepos },
  ] = useLazyQuery<OthersReposes>(getOthersRepositories);

  useEffect(() => {
    getDataInfo({
      //пока так чтобы каждый раз не вбивать
      variables: { login: myLogin },
    });
    getOtherDataInfo({
      variables: { login: myLogin, cursor: null },
    });
  }, []);

  useEffect(() => {
    console.log(repData);
    if (repData) {
      setTotalCount(repData.user.repositories.totalCount);
      setAllRepos((prev) => [...prev, ...repData.user.repositories.nodes]);
    }
    if (repData)
      if (repData.user.repositories.pageInfo.hasNextPage) {
        getOtherDataInfo({
          variables: {
            login: login,
            cursor: repData.user.repositories.pageInfo.endCursor,
          },
        });
      }
  }, [repData]);

  const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const getData = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setAllRepos([]);
    getDataInfo({
      variables: { login },
    });
    getOtherDataInfo({
      variables: { login: login, cursor: null },
    });
  };

  console.log(allRepos);
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
        <div className={"spinner"}>
          <div className={"ball"} />
          <p>LOADING</p>
        </div>
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
          {loadingRepos ? (
            <div className={"spinner"}>
              <div className={"ball"} />
              <p>LOADING</p>
            </div>
          ) : null}
          {allRepos.length ? (
            <MainStatistics
              repositories={allRepos}
              totalCount={totalCount}
              name={data.user.name}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
