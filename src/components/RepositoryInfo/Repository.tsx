import React, { useState } from "react";
import { IRepository } from "../../models/IRepository";
import starIcon from "../../images/star.svg";
import forkIcon from "../../images/fork.svg";
import copyIcon from "../../images/copy.svg";
import { Bar, Doughnut } from "react-chartjs-2";
import { infoParse } from "../UserInfo/UserInfo";
import { getBGColors } from "../../consts/consts";
import IssueAndPullStatistic from "./IssueAndPullStatistic";

type RepositoryInfoType = {
  info: IRepository;
};

export const Repository: React.FC<RepositoryInfoType> = ({ info }) => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const [isCloned, setIsCloned] = useState<boolean>(false);

  const modalToggle = () => {
    setMoreInfo(!moreInfo);
  };

  const copyToClipboard = (e: React.FormEvent<EventTarget>) => {
    e.stopPropagation();
    setIsCloned(true);
    setTimeout(() => setIsCloned(false), 2000);
    navigator.clipboard.writeText(info.sshUrl);
  };

  const getLanguages = () => {
    return (
      <>
        {info.languages.edges.map((data) => {
          return (
            <div className={"rep-info"}>
              <span className={"label"}>{data.node.name}</span>
              <span className={"data"}>
                {((data.size / info.languages.totalSize) * 100).toFixed(2)} %
              </span>
            </div>
          );
        })}
      </>
    );
  };

  const getGraph = () => {
    const labels = info.languages.edges.map((lan) => lan.node.name);
    const dataArr = info.languages.edges.map((lan) => lan.size);
    const backgroundColors = getBGColors(info.languages.edges.length);

    const data = {
      datasets: [
        {
          data: dataArr,
          backgroundColor: backgroundColors,
          label: "# of Votes",
        },
      ],
      labels: labels,
    };
    return <Doughnut data={data} />;
  };

  return (
    <>
      <div className={"repository"} onClick={modalToggle}>
        <div className={"info-container info-flex"}>
          <h3>{info.name}</h3>
          <div className={"copy-url-container"}>
            <img src={copyIcon} alt="Copy" onClick={copyToClipboard} />
            {isCloned ? (
              <span className={"copy-url"}>Склонированно&#10003;</span>
            ) : (
              <span className={"copy-url"}>Клонировать</span>
            )}
          </div>
        </div>
        <div className={"info-container"}>
          <img src={starIcon} alt="Star" />
          <span>{info.stargazerCount}</span>
        </div>
        <div className={"info-container"}>
          <img src={forkIcon} alt="fork" />
          <span>{info.forkCount}</span>
        </div>
        <div className={"info-container"}>
          <span className={"label"}>Создан:</span>
          <span>{new Date(info.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      {moreInfo ? (
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
                  <span className={"data"}>{info.pullRequests.totalCount}</span>
                </div>
                <div className={"rep-info"}>
                  <span className={"label"}>Всего issue:</span>
                  <span className={"data"}>{info.issues.totalCount}</span>
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
                {info.issues.totalCount > 0 ? (
                  <IssueAndPullStatistic
                    info={info.issues}
                    label={"issue"}
                    durationIn={"hour"}
                  />
                ) : null}
                {info.pullRequests.totalCount > 0 ? (
                  <IssueAndPullStatistic
                    info={info.pullRequests}
                    label={"pullRequest"}
                    durationIn={"minute"}
                  />
                ) : null}
              </div>
            </div>
            <hr />
            <h3>Описание </h3>
            <span className={"data"}>{infoParse(info.description)}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
