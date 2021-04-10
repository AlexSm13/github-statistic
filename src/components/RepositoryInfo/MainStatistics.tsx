import React, { useState } from "react";
import { IRepository } from "../../models/IRepository";
import { Repository } from "./Repository";
import Search from "../Search/Search";
import { Languages } from "../LanguagesStats/Languages";
import { Pagination } from "../Pagination/Pagination";
import { log } from "util";

type RepositoryInfoData = {
  repositories: IRepository[];
  totalCount: number;
  name: string;
};

export const MainStatistics: React.FC<RepositoryInfoData> = ({
  repositories,
  totalCount,
  name,
}) => {
  const [repoName, setRepoName] = useState<string>("");
  const [repPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getRepositories = () => {
    const indexOfLastRep = currentPage * repPerPage;
    const indexOfFirstRep = indexOfLastRep - repPerPage;

    //console.log(repositories.sort((a, b) => (a.stargazerCount < b.stargazerCount ? -1 : 1)))
    if (!repositories.length) {
      return <p>Подгружаем...</p>;
    }
    let sortRepositories = repositories.slice(indexOfFirstRep, indexOfLastRep);
    console.log(indexOfFirstRep, indexOfLastRep, sortRepositories);
    console.log(repoName, repositories);

    if (repoName) {
      sortRepositories = [
        ...repositories.filter((repos) => {
          return repos.name.toLowerCase().includes(repoName.toLowerCase());
        }),
      ];
    }
    return sortRepositories
      .sort((a, b) => (a.stargazerCount < b.stargazerCount ? 1 : -1))
      .map((repo) => {
        return <Repository key={repo.createdAt} info={repo} />;
      });
  };

  const paginate = (num: number) => {
    setCurrentPage(num);
  };

  return (
    <section>
      <h1 className={"title"}>Статистика пользователя:</h1>
      <Languages
        repos={repositories.map((rep) => ({
          name: rep.name,
          langs: rep.languages,
        }))}
      />

      <div className={"statistic-info-container"}>
        <div className={"repositories-info"}>
          <h3>Всего репозиториев: {totalCount}</h3>
          <code>(публичных)</code>
          <Search
            maxWidth={"100%"}
            placeholder={"Имя репозитория"}
            getData={getRepositories}
            value={repoName}
            valueChange={(e) => setRepoName(e.target.value)}
          />
        </div>
        <div className={"repositories"}>
          <Pagination
            totalRep={repositories.length}
            repPerPage={repPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
          {repositories.length ? (
            getRepositories()
          ) : (
            <h1 className={"title"}>
              Пользвователь {name} как-то выживет без репозиториев :(
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};
