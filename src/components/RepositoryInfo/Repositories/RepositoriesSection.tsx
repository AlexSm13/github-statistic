import React, { Dispatch, SetStateAction } from "react";
import Search from "../../Search/Search";
import { Collaborators } from "../Collaborators/Collaborators";
import { Pagination } from "../../Pagination/Pagination";
import { IRepository } from "../../../models/IRepository";

type RepositoriesSectionType = {
  login: string;
  totalCount: number;
  repoName: string;
  setRepoName: Dispatch<SetStateAction<string>>;
  getRepositories: () => JSX.Element | JSX.Element[];
  repositories: IRepository[];
  repPerPage: number;
  paginate: (n: number) => void;
  currentPage: number;
};

const RepositoriesSection: React.FC<RepositoriesSectionType> = ({
  repositories,
  login,
  totalCount,
  repoName,
  setRepoName,
  getRepositories,
  repPerPage,
  currentPage,
  paginate,
}) => {
  return (
    <section className={"user-statistic-container no-blur-section"}>
      <h1 className={"title"}>Статистика по репозиториям ({login})</h1>
      <div className={"repositories-flex-container"}>
        <div className={"repositories-info"}>
          <h3>Всего репозиториев: {totalCount}</h3>
          <Search
            placeholder={"Имя репозитория"}
            getData={getRepositories}
            value={repoName}
            valueChange={(e) => setRepoName(e.target.value)}
          />
        </div>

        <div className={"repositories-info"}>
          {repositories[0].collaborators.edges ? (
            <Collaborators
              collaborators={repositories.map((rep) => ({
                edges: rep.collaborators.edges,
                repName: rep.name,
              }))}
            />
          ) : null}
        </div>
      </div>

      <Pagination
        totalRep={repositories.length}
        repPerPage={repPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div className={"repositories"}>
        {repositories.length ? (
          getRepositories()
        ) : (
          <h1 className={"title"}>
            Пользователь {login} как-то выживет без репозиториев :(
          </h1>
        )}
      </div>
    </section>
  );
};

export default RepositoriesSection;
