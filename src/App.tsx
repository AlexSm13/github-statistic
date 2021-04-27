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
import { animateScroll as scroll } from 'react-scroll'


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

  const [offsetY, setOffsetY] = useState<number>(0)
  const handleScroll = () => {
    setOffsetY(window.pageYOffset)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const [getDataInfo, { loading, error, data }] = useLazyQuery<GitHubData>(
    userInfoQuery
  );

  const [
    getOtherDataInfo,
    { data: repData, loading: loadingRepos },
  ] = useLazyQuery<OthersReposes>(
    firstToken ? getOthersRepositories : getOthersRepositoriesWithoutToken
  );

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

  useEffect(() => {
    if (data) {
      const scrollTo = window.pageYOffset + window.innerHeight - 550;
      setTimeout(() => scroll.scrollTo(scrollTo), 0)
    }
  }, [data])

  //---------Для второго юзера------------//
  const [secondLogin, setSecondLogin] = useState<string>("");
  const [secondToken, setSecondToken] = useState<string>("");
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
  ] = useLazyQuery<OthersReposes>(
    secondToken ? getOthersRepositories : getOthersRepositoriesWithoutToken
  );

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

  const getData = (
    login: string,
    token?: string,
    secondLogin?: string,
    secondToken?: string
  ) => {
    setLogin(login);
    setAccessToken(token);
    token && setFirstToken(token);

    setAllRepos([]);
    getDataInfo({
      variables: { login },
    });
    getOtherDataInfo({
      variables: { login, cursor: null },
    });

    if (secondLogin) {
      setSecondLogin(secondLogin);
      setAccessToken(secondToken);

      secondToken && setSecondToken(secondToken);

      getSecondUserDataInfo({ variables: { login: secondLogin } });
      getSecondUserOtherDataInfo({
        variables: { login: secondLogin, cursor: null },
      });
    }
  };

  //console.log(allRepos, allSecondUserRepos)

  //console.log(data, repData, error);

  //У нас есть secondUserData и secondRepData, чтобы рисовать инфу для второго логина
  return (
      <>
      <div style={{transform: `translateY(${offsetY * 0.3 - 120}px)`}} className={"bg-wrapper"}></div>
      <UserSearch
        classContainer={
          data
            ? "search-user-wrapper search-users-wrapper-withUserInfo"
            : "search-user-wrapper"
        }
        getUserInfo={getData}
      />
      <div style={{ display: data ? "block" : "none", width: data && secondUserData && "95%" }} className={"container"}>
        {loading ? (
          <div className={"spinner"}>
            <div className={"ball"} />
            <p>LOADING</p>
          </div>
        ) : null}
        {login && error ? <NotFound /> : null}

        {data && data.user ? (
          <div className={secondUserData ? "second-user-flex-container" : ""}>
            <UserInfo
                data={data.user}
            />
            {secondUserData ?
                <UserInfo
                    data={secondUserData.user}
                /> : null}

            {loadingRepos ? (
              <div className={"spinner"}>
                <div className={"ball"} />
                <p>LOADING</p>
              </div>
            ) : null}
          </div>) : null }
        {data && allRepos.length && secondUserData && allSecondUserRepos ?
                  <MainStatistics
                      login={data.user.login}
                      repositories={allRepos}
                      totalCount={totalCount}
                      name={data.user.name}
                      secondName={secondUserData.user.name}
                      secondLogin={secondUserData.user.login}
                      secondTotalCount={totalSecondUserRepCount}
                      secondRepositories={allSecondUserRepos}
                  /> : data && allRepos.length ? <MainStatistics
                    login={data.user.login}
                    repositories={allRepos}
                    totalCount={totalCount}
                    name={data.user.name}
                /> : null }
      </div>
    </>
  );
};
