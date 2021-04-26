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
};

export const MainStatistics: React.FC<RepositoryInfoData> = ({
  repositories,
  totalCount,
  name,
  login,
}) => {
  const [repoName, setRepoName] = useState<string>("");
  const [repPerPage] = useState<number>(18);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getRepositories = () => {
    const indexOfLastRep = currentPage * repPerPage;
    const indexOfFirstRep = indexOfLastRep - repPerPage;

    if (!repositories.length) {
      return <p>Подгружаем...</p>;
    }

    let sortRepositories = [...repositories]
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

  const paginate = (num: number) => {
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
      />
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
      />
      <Commits
        login={login}
        repos={repositories.map((rep) => ({
          name: rep.name,
          commits: rep.defaultBranchRef.target.history,
        }))}
      />
    </>
  );
};
