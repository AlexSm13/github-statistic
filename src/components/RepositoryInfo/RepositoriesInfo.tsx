import React from "react";
import { IRepository } from "../../models/IRepository";
import { Repository } from "./Repository";

type RepositoryInfoData = {
  repositories: IRepository[];
  name: string;
};

export const RepositoriesInfo: React.FC<RepositoryInfoData> = ({
  repositories,
  name,
}) => {
  const getRepositories = () => {
    return repositories.map((repo) => {
      return <Repository key={repo.createdAt} info={repo} />;
    });
  };

  return (
    <div className={"repository-info-container"}>
      {repositories.length ? (
        <>
          <h1 className={"title"}>Репозитории пользователя:</h1>
          {getRepositories()}
        </>
      ) : (
        <h1 className={"title"}>
          Пользвователь {name} как-то выживет без репозиториев :(
        </h1>
      )}
    </div>
  );
};
