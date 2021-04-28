import React, { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo/UserInfo";
import {
  getOthersRepositories,
  getOthersRepositoriesWithoutToken,
  userInfoQuery,
} from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";
import { IRepositories, IUserInfo } from "./models/IUserInfo";
import { MainStatistics } from "./components/RepositoryInfo/MainStatistics";
import NotFound from "./components/NotFound/NotFound";
import { IRepository } from "./models/IRepository";
import { UserSearch } from "./components/UserSearch/UserSearch";
// @ts-ignore
import { animateScroll as scroll } from "react-scroll";
import { AnimateBackground } from "./components/AnimateBackground/AnimateBackground";

type GitHubData = {
  user: IUserInfo;
};

type OthersReposes = {
  user: {
    repositories: IRepositories;
  };
};

type AppType = {
  setAccessToken: (token?: string) => void;
};

export const App: React.FC<AppType> = ({ setAccessToken }) => {
  const [login, setLogin] = useState<string>("");
  const [firstToken, setFirstToken] = useState<string>("");
  const [allRepos, setAllRepos] = useState<IRepository[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  let [getDataInfo, { loading, error, data }] = useLazyQuery<GitHubData>(
    userInfoQuery
  );

  const [
    getOtherDataInfo,
    { data: repData, loading: loadingRepos },
  ] = useLazyQuery<OthersReposes>(
    firstToken ? getOthersRepositories : getOthersRepositoriesWithoutToken
  );

  useEffect(() => {
    setAccessToken(firstToken);
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
  const [secondToken, setSecondToken] = useState<string>("");
  const [
    hasSecondUserDataInState,
    setHasSecondUserDataInState,
  ] = useState<boolean>(false);
  const [allSecondUserRepos, setSecondUserAllRepos] = useState<IRepository[]>(
    []
  );
  const [
    totalSecondUserRepCount,
    setSecondUserTotalRepCount,
  ] = useState<number>(0);

  let [
    getSecondUserDataInfo,
    { loading: sec_loading, error: sec_error, data: secondUserData },
  ] = useLazyQuery<GitHubData>(userInfoQuery);

  const [
    getSecondUserOtherDataInfo,
    { data: secondRepData, loading: secondLoadingRepos },
  ] = useLazyQuery<OthersReposes>(
    secondToken ? getOthersRepositories : getOthersRepositoriesWithoutToken
  );

  useEffect(() => {
    setAccessToken(secondToken);
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

  const getData = (
    login: string,
    token?: string,
    secondLogin?: string,
    secondToken?: string
  ) => {
    console.log(token, secondToken);
    resetData();

    setLogin(login);
    setAccessToken(token);
    token && setFirstToken(token);

    console.log(login, token, secondLogin, secondToken);

    setAllRepos([]);
    getDataInfo({
      variables: { login },
    });
    getOtherDataInfo({
      variables: { login, cursor: null },
    });

    if (secondLogin) {
      setHasSecondUserDataInState(true);
      setSecondLogin(secondLogin);
      setAccessToken(secondToken);

      secondToken && setSecondToken(secondToken);

      getSecondUserDataInfo({ variables: { login: secondLogin } });
      getSecondUserOtherDataInfo({
        variables: { login: secondLogin, cursor: null },
      });
    }
  };

  const resetData = () => {
    setHasSecondUserDataInState(false);
    setSecondLogin("");
    setSecondUserTotalRepCount(0);
    setSecondUserAllRepos([]);
    setSecondToken("");
  };

  useEffect(() => {
    if (data) {
      const scrollTo = window.pageYOffset + window.innerHeight - 550;
      setTimeout(() => scroll.scrollTo(scrollTo), 0);
    }
  }, [data]);

  console.log(allRepos, allSecondUserRepos);

  //console.log(data, repData, error);

  //У нас есть secondUserData и secondRepData, чтобы рисовать инфу для второго логина
  return (
    <>
      <AnimateBackground firstUserLogin={login} secondUserLogin={secondLogin} />
      <UserSearch
        classContainer={
          data
            ? "search-user-wrapper search-users-wrapper-withUserInfo"
            : "search-user-wrapper"
        }
        getUserInfo={getData}
      />
      <div
        style={{
          display: data ? "block" : "none",
          width: data && secondUserData && "90%",
        }}
        className={"container"}
      >
        {loading ? (
          <div className={"spinner"}>
            <div className={"ball"} />
            <p>LOADING</p>
          </div>
        ) : null}
        {login && error ? <NotFound /> : null}

        {data && data.user ? (
          <>
            <div
              className={
                secondUserData && hasSecondUserDataInState
                  ? "second-user-flex-container"
                  : ""
              }
            >
              <UserInfo
                data={data.user}
                hasSecondUser={hasSecondUserDataInState}
              />
              {secondUserData && hasSecondUserDataInState ? (
                <UserInfo
                  data={secondUserData.user}
                  hasSecondUser={hasSecondUserDataInState}
                />
              ) : null}
            </div>
            {loadingRepos ? (
              <div className={"spinner"}>
                <div className={"ball"} />
                <p>LOADING</p>
              </div>
            ) : null}
          </>
        ) : null}
        {data &&
        allRepos.length &&
        hasSecondUserDataInState &&
        secondUserData &&
        allSecondUserRepos ? (
          <MainStatistics
            login={data.user.login}
            repositories={allRepos}
            totalCount={totalCount}
            name={data.user.name}
            secondName={secondUserData.user.name}
            secondLogin={secondUserData.user.login}
            secondTotalCount={totalSecondUserRepCount}
            secondRepositories={allSecondUserRepos}
          />
        ) : data && allRepos.length ? (
          <MainStatistics
            login={data.user.login}
            repositories={allRepos}
            totalCount={totalCount}
            name={data.user.name}
          />
        ) : null}
      </div>
    </>
  );
};
