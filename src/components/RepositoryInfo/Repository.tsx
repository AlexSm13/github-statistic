import React, { useState } from "react";
import { IRepository } from "../../models/IRepository";
import starIcon from "../../images/star.svg";
import forkIcon from "../../images/fork.svg";
import copyIcon from "../../images/copy.svg";
import { Pie } from "react-chartjs-2";
import { infoParse } from "../UserInfo/UserInfo";

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
    setTimeout(() => setIsCloned(false), 2000)
    navigator.clipboard.writeText(info.sshUrl);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const getLanguages = () => {
    const labels = info.languages.edges.map((lan) => lan.node.name);
    const dataArr = info.languages.edges.map((lan) => lan.size);
    const backgroundColors = Array(dataArr.length)
      .fill(0)
      .map(() => getRandomColor());

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
        <Pie data={data} />
      </>
    );
  };

  return (
    <>
      <div className={"repository"} onClick={modalToggle}>
        <div className={"info-container info-flex"}>
          <h3>{info.name}</h3>
          <div className={'copy-url-container'}>
            <img src={copyIcon} alt="Copy" onClick={copyToClipboard} />
            {isCloned
                ? <span className={'copy-url'}>Склонированно&#10003;</span>
                : <span className={'copy-url'}>Клонировать</span>}
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
            <h1>Информация о репозитории {info.name}</h1>
            <div className={"repository-container"}>
              <div className={"repository-info"}>
                <h3>Информация</h3>
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
                  <span className={"label"}>Описание:</span>
                  <span className={"data"}>{infoParse(info.description)}</span>
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
              </div>
              <div className={"repository-statistic"}>
                <h3>Статистика</h3>
                {info.languages.totalCount > 0 ? (
                  getLanguages()
                ) : (
                  <span>Информации по языкам нету(((</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
