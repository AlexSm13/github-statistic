import React, { useState } from "react";
import { IRepository } from "../../models/IRepository";
import { Repository } from "./Repository";
import Search from "../Search/Search";

type RepositoryInfoData = {
  repositories: IRepository[];
  name: string;
};

export const MainStatistics: React.FC<RepositoryInfoData> = ({
  repositories,
  name,
}) => {
  const [repoName, setRepoName] = useState<string>("");

  const getRepositories = () => {
    if (name) {
      const sortRepositories = repositories.filter((repos) => {
        return repos.name.toLowerCase().includes(repoName.toLowerCase());
      });
      return sortRepositories.map((repo) => {
        return <Repository key={repo.createdAt} info={repo} />;
      });
    }
    return repositories.map((repo) => {
      return <Repository key={repo.createdAt} info={repo} />;
    });
  };

  return (
    <section>
      <h1 className={"title"}>Статистика пользователя:</h1>
      <div className={"statistic-info-container"}>
        <div className={"repositories-info"}>
          <h3>Всего репозиториев: {repositories.length}</h3>
          <code>(публичных)</code>
          <Search
            width={"100%"}
            placeholder={"Имя репозитория"}
            getData={getRepositories}
            value={repoName}
            valueChange={(e) => setRepoName(e.target.value)}
          />
        </div>
        <div className={"repositories"}>
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
