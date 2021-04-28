import React, { Dispatch, SetStateAction } from "react";
import Search from "../../Search/Search";
import { Collaborators } from "../Collaborators/Collaborators";
import { Pagination } from "../../Pagination/Pagination";
import { IRepository } from "../../../models/IRepository";
import CountUp from "react-countup";

type RepositoriesSectionType = {
  login: string;
  totalCount: number;
  repoName: string;
  setRepoName: Dispatch<SetStateAction<string>>;
  getRepositories: (
    requestFromSecondUserSection: boolean
  ) => JSX.Element | JSX.Element[];
  repositories: IRepository[];
  repPerPage: number;
  paginate: (n: number, flag: boolean) => void;
  currentPage: number;
  loadedReposCount: number;
  secondSection: boolean;
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
  loadedReposCount,
  secondSection,
}) => {
  return (
    <section
      style={{ flex: 1 }}
      className={"user-statistic-container no-blur-section"}
    >
      <h1 className={"title"}>Статистика по репозиториям ({login})</h1>
      <div className={"repositories-flex-container"}>
        <div className={"repositories-info"}>
          <h3>
            Подгружено репозиториев:
            <CountUp
              start={loadedReposCount * 0.7}
              end={loadedReposCount}
            /> из {totalCount}
          </h3>
          <Search
            placeholder={"Имя репозитория"}
            getData={getRepositories}
            value={repoName}
            valueChange={(e) => setRepoName(e.target.value)}
            secondSection={secondSection}
          />
        </div>

        <div className={"repositories-info"}>
          {repositories[0].collaborators ? (
            <Collaborators
              collaborators={repositories.map((rep) => ({
                edges: rep.collaborators.edges,
                repName: rep.name,
              }))}
            />
          ) : null}
        </div>
      </div>

      <div className={"repositories"}>
        {repositories.length ? (
          getRepositories(secondSection)
        ) : (
          <h1 className={"title"}>
            Пользователь {login} как-то выживет без репозиториев :(
          </h1>
        )}
      </div>
      <Pagination
        totalRep={repositories.length}
        repPerPage={repPerPage}
        paginate={paginate}
        currentPage={currentPage}
        secondSection={secondSection}
      />
    </section>
  );
};

export default RepositoriesSection;
