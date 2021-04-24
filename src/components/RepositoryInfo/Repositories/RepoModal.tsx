import React, { LegacyRef, RefObject, useEffect, useRef } from "react";
import { infoParse } from "../../UserInfo/UserInfo";
import IssueAndPullStatistic from "../IssueAndPullStatistic";
import { IRepository } from "../../../models/IRepository";
import CountUp from "react-countup";

type RepoModalType = {
  modalToggle: () => void;
  info: IRepository;
  getLanguages: () => JSX.Element;
  getGraph: () => JSX.Element;
};

export const RepoModal: React.FC<RepoModalType> = ({
  modalToggle,
  info,
  getLanguages,
  getGraph,
}) => {
  useEffect(() => {
    setTimeout(() => {
      const showModal = document.querySelector(".more-info");
      const modalWrapper = document.querySelector(".more-info-wrapper");
      if (showModal && modalWrapper) {
        showModal.classList.add("modal-show-animation");
        modalWrapper.classList.add("modal-wrapper-animation");
      }
    }, 0);
  });

  return (
    <div className={"more-info-wrapper"} onClick={modalToggle}>
      <div className={"more-info"} onClick={(e) => e.stopPropagation()}>
        <div className={"title-flex"}>
          <h3 className={"title-repos-name"}>Репозиторий {info.name}</h3>
          <div onClick={modalToggle} className={"title-exit"}>
            X
          </div>
        </div>
        <div className={"repository-container"}>
          <div className={"repository-info"}>
            <h3>Информация</h3>
            <div className={"rep-info"}>
              <span className={"label"}>Владелец:</span>
              <span className={"data"}>{info.owner.login}</span>
            </div>
            <div className={"rep-info"}>
              <span className={"label"}>Создан:</span>
              <span className={"data"}>
                {new Date(info.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={"rep-info"}>
              <span className={"label"}>Последнее обновление:</span>
              <span className={"data"}>
                {new Date(info.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className={"rep-info"}>
              <span className={"label"}>Является форком:</span>
              <span className={"data"}>{info.isFork ? "Да" : "Нет"}</span>
            </div>
            <div className={"rep-info"}>
              <span className={"label"}>Всего pull-request:</span>
              <span className={"data"}>
                <CountUp end={info.pullRequests.totalCount} />
              </span>
            </div>
            <div className={"rep-info"}>
              <span className={"label"}>Всего issue:</span>
              <span className={"data"}>
                <CountUp end={info.issues.totalCount} />
              </span>
            </div>
            <hr />
            <h3>Языки</h3>
            {info.languages.totalCount > 0 ? (
              getLanguages()
            ) : (
              <span>Информации по языкам нету(((</span>
            )}
          </div>
          <div className={"repository-statistic"}>
            {info.languages.totalCount > 0 ? (
              getGraph()
            ) : (
              <span>И с графиком тоже(((</span>
            )}
          </div>
        </div>
        <hr />
        <h3>Описание </h3>
        <span className={"data"}>{infoParse(info.description)}</span>
        {info.issues.totalCount > 0 ? (
          <>
            <hr />
            <IssueAndPullStatistic
              info={info.issues}
              label={"issue"}
              durationIn={"hour"}
            />
          </>
        ) : null}
        {info.pullRequests.totalCount > 0 ? (
          <>
            <hr />
            <IssueAndPullStatistic
              info={info.pullRequests}
              label={"pullRequest"}
              durationIn={"minute"}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
