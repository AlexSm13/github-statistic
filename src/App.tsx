import React, { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { getOthersRepositories, userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IRepositories, IUserInfo } from "./models/IUserInfo";
import { MainStatistics } from "./components/RepositoryInfo/MainStatistics";
import NotFound from "./components/NotFound/NotFound";
import { IRepository } from "./models/IRepository";
import { UserSearch } from "./components/UserSearch/UserSearch";
import { Token } from "graphql";
import { log } from "util";

type GitHubData = {
  user: IUserInfo;
};

type OthersReposes = {
  user: {
    repositories: IRepositories;
  };
};

const myLogin = "KuzmichAlexander";

type AppType = {
  setAccessToken: (t1?: string) => void;
};

export const App: React.FC<AppType> = ({ setAccessToken }) => {
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

  //---------Для второго юзера------------//
  const [secondLogin, setSecondLogin] = useState<string>("");
  const [allSecondUserRepos, setSecondUserAllRepos] = useState<IRepository[]>(
    []
  );
  const [
    totalSecondUserRepCount,
    setSecondUserTotalRepCount,
  ] = useState<number>(0);

  const [
    getSecondUserDataInfo,
    { loading: sec_loading, error: sec_error, data: secondUserData },
  ] = useLazyQuery<GitHubData>(userInfoQuery);

  const [
    getSecondUserOtherDataInfo,
    { data: secondRepData, loading: secondLoadingRepos },
  ] = useLazyQuery<OthersReposes>(getOthersRepositories);

  useEffect(() => {
    if (secondRepData) {
      setSecondUserTotalRepCount(secondRepData.user.repositories.totalCount);
      setSecondUserAllRepos((prev) => [
        ...prev,
        ...secondRepData.user.repositories.nodes,
      ]);
    }
    if (secondRepData)
      if (secondRepData.user.repositories.pageInfo.hasNextPage) {
        getSecondUserOtherDataInfo({
          variables: {
            login: secondLogin,
            cursor: secondRepData.user.repositories.pageInfo.endCursor,
          },
        });
      }
  }, [secondRepData]);

  //--------------------------------------//

  // useEffect(() => {
  //   getDataInfo({
  //     //пока так чтобы каждый раз не вбивать
  //     // этого в будущем не будет (ахаххахахах), поэтому норм
  //     variables: { login: myLogin },
  //   });
  //   getOtherDataInfo({
  //     variables: { login: myLogin, cursor: null },
  //   });
  // }, []);

  const getData = (
    login: string,
    token?: string,
    secondLogin?: string,
    secondToken?: string
  ) => {
    setLogin(login);
    token && setAccessToken(token);

    setAllRepos([]);
    getDataInfo({
      variables: { login },
    });
    getOtherDataInfo({
      variables: { login, cursor: null },
    });

    if (secondLogin) {
      setSecondLogin(secondLogin);
      secondToken && setAccessToken(secondToken);

      getSecondUserDataInfo({ variables: { login: secondLogin } });
      getSecondUserOtherDataInfo({
        variables: { login: secondLogin, cursor: null },
      });
    }
  };

  // console.log(secondUserData, secondRepData)
  console.log(data, repData, error);

  //У нас есть secondUserData и secondRepData, чтобы рисовать инфу для второго логина
  return (
    <div className={"bg-wrapper"}>
      <UserSearch
        classContainer={
          data
            ? "search-user-wrapper search-users-wrapper-withUserInfo"
            : "search-user-wrapper"
        }
        getUserInfo={getData}
      />
      <div style={{ display: data ? "block" : "none" }} className={"container"}>
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
                login={data.user.login}
                repositories={allRepos}
                totalCount={totalCount}
                name={data.user.name}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
