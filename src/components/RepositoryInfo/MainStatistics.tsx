import React, { useState } from "react";
import { IRepository } from "../../models/IRepository";
import { Repository } from "./Repositories/Repository";
import { Languages } from "../LanguagesStats/Languages";
import RepositoriesSection from "./Repositories/RepositoriesSection";
import { Commits } from "../CommitStatistic/CommitStatistic";

type RepositoryInfoData = {
  repositories: IRepository[];
  totalCount: number;
  name: string;
  login: string;
  secondRepositories?: IRepository[];
  secondTotalCount?: number;
  secondName?: string;
  secondLogin?: string;
};

export const MainStatistics: React.FC<RepositoryInfoData> = ({
  repositories,
  totalCount,
  name,
  login,
  secondLogin,
  secondName,
  secondRepositories,
  secondTotalCount,
}) => {
  const [repoName, setRepoName] = useState<string>("");
  const [secondRepoName, setSecondRepoName] = useState<string>("");
  const [repPerPage] = useState<number>(18);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [secondCurrentPage, setSecondCurrentPage] = useState<number>(1);

  const getRepositories = (requestFromSecondUserSection: boolean) => {
    let sortRepositories = [];
    if (requestFromSecondUserSection) {
      const indexOfLastRep = secondCurrentPage * repPerPage;
      const indexOfFirstRep = indexOfLastRep - repPerPage;

      if (secondRepositories && !secondRepositories.length) {
        return <p>Подгружаем...</p>;
      }

      if (secondRepositories) {
        sortRepositories = [...secondRepositories]
          .sort((a, b) =>
            new Date(a.updatedAt) < new Date(b.updatedAt)
              ? 1
              : -1 || a.stargazerCount < b.stargazerCount
              ? 1
              : -1
          )
          .slice(indexOfFirstRep, indexOfLastRep);

        if (secondRepoName) {
          sortRepositories = [
            ...secondRepositories.filter((repos) => {
              return repos.name
                .toLowerCase()
                .includes(secondRepoName.toLowerCase());
            }),
          ];
        }
        return sortRepositories.map((repo) => {
          return (
            <Repository key={`${repo.createdAt}${repo.name}`} info={repo} />
          );
        });
      }
    }
    const indexOfLastRep = currentPage * repPerPage;
    const indexOfFirstRep = indexOfLastRep - repPerPage;

    if (!repositories.length) {
      return <p>Подгружаем...</p>;
    }

    sortRepositories = [...repositories]
      .sort((a, b) =>
        new Date(a.updatedAt) < new Date(b.updatedAt)
          ? 1
          : -1 || a.stargazerCount < b.stargazerCount
          ? 1
          : -1
      )
      .slice(indexOfFirstRep, indexOfLastRep);

    if (repoName) {
      sortRepositories = [
        ...repositories.filter((repos) => {
          return repos.name.toLowerCase().includes(repoName.toLowerCase());
        }),
      ];
    }
    return sortRepositories.map((repo) => {
      return <Repository key={`${repo.createdAt}${repo.name}`} info={repo} />;
    });
  };

  const paginate = (num: number, isSecond: boolean) => {
    if (isSecond) {
      setSecondCurrentPage(num);
      return;
    }
    setCurrentPage(num);
  };

  //
  return (
    <>
      <Languages
        login={login}
        repos={repositories.map((rep) => ({
          name: rep.name,
          langs: rep.languages,
        }))}
        secondLogin={secondLogin}
        secondRepos={
          secondRepositories &&
          secondRepositories.map((rep) => ({
            name: rep.name,
            langs: rep.languages,
          }))
        }
      />
      <div className={secondLogin ? "second-user-flex-container" : ""}>
        <RepositoriesSection
          repPerPage={repPerPage}
          paginate={paginate}
          currentPage={currentPage}
          repositories={repositories}
          login={login}
          totalCount={totalCount}
          repoName={repoName}
          setRepoName={setRepoName}
          getRepositories={getRepositories}
          loadedReposCount={repositories.length}
          secondSection={false}
        />
        {secondLogin && secondRepositories && secondTotalCount ? (
          <RepositoriesSection
            repPerPage={repPerPage}
            paginate={paginate}
            currentPage={secondCurrentPage}
            repositories={secondRepositories}
            login={secondLogin}
            totalCount={secondTotalCount}
            repoName={secondRepoName}
            setRepoName={setSecondRepoName}
            getRepositories={getRepositories}
            loadedReposCount={secondRepositories.length}
            secondSection={true}
          />
        ) : null}
      </div>
      <Commits
        login={login}
        repos={repositories.map((rep) => ({
          name: rep.name,
          commits: rep.defaultBranchRef.target.history,
        }))}
        secondLogin={secondLogin}
        secondRepos={
          secondRepositories &&
          secondRepositories.map((rep) => ({
            name: rep.name,
            commits: rep.defaultBranchRef.target.history,
          }))
        }
      />
    </>
  );
};
