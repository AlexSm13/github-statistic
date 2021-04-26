import React, {useEffect, useRef, useState} from "react";
import { IRepository } from "../../../models/IRepository";
import starIcon from "../../../images/star.svg";
import forkIcon from "../../../images/fork.svg";
import copyIcon from "../../../images/copy.svg";
import { Doughnut } from "react-chartjs-2";
import { getBGColors } from "../../../consts/consts";
import { RepoModal } from "./RepoModal";
import CountUp from "react-countup";

type RepositoryInfoType = {
  info: IRepository;
};

let TimeoutType: ReturnType<typeof setTimeout>;

export const Repository: React.FC<RepositoryInfoType> = ({ info }) => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const [isCloned, setIsCloned] = useState<boolean>(false);
  const showClonedDialog = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return (() => {
      if(showClonedDialog.current) {
        clearInterval(showClonedDialog.current)
      }
    })
  }, [])

  const modalToggle = () => {
    const showModal = document.querySelector(".more-info");
    const modalWrapper = document.querySelector(".more-info-wrapper");
    if (showModal && modalWrapper) {
      showModal.classList.remove("modal-show-animation");
      modalWrapper.classList.remove("modal-wrapper-animation");
    }
    setTimeout(() => setMoreInfo(prev => !prev), 100);
  };
  
  const copyToClipboard = (e: React.FormEvent<EventTarget>) => {
    e.stopPropagation();
    setIsCloned(true);
    showClonedDialog.current = setTimeout(() => setIsCloned(false), 1500);
    navigator.clipboard.writeText(info.sshUrl);
  };

  const getLanguages = () => {
    return (
      <>
        {info.languages.edges.map((data) => {
          const langPersent = parseFloat(
            ((data.size / info.languages.totalSize) * 100).toFixed(2)
          );
          if (langPersent < 1) return;
          return (
            <div key={data.node.name} className={"rep-info"}>
              <span className={"label"}>{data.node.name}</span>
              <span className={"data"}>
                <CountUp end={langPersent} decimals={2} />%
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
        <RepoModal
          getLanguages={getLanguages}
          getGraph={getGraph}
          info={info}
          modalToggle={modalToggle}
        />
      ) : null}
    </>
  );
};
