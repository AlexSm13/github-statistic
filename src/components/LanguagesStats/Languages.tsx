import React, { useState } from "react";
import { Language } from "../../models/IRepository";
import { Bar } from "react-chartjs-2";
import firstPlace from "../../images/topLangs/medal-1.svg";
import secondPlace from "../../images/topLangs/medal-2.svg";
import thirdPlace from "../../images/topLangs/medal-3.svg";
import CountUp from "react-countup";
import { LanguageModal } from "./LanguageModal";
import { formatSizeUnits } from "../../consts/consts";

type RepositoryInfoType = {
  name: string;
  langs: Language;
};

type AllRepositoriesType = {
  repos: RepositoryInfoType[];
  login: string;
};

type OurMapType = {
  [id: string]: {
    count: number;
    size: number;
    repos: string[];
    langName: string;
  };
};

type CurrentRepType = {
  name: string;
  languages: MapLanguage[];
};

type MapLanguage = {
  size: number;
  node: { name: string };
};

const medals = [firstPlace, secondPlace, thirdPlace];

export const Languages: React.FC<AllRepositoriesType> = ({ repos, login }) => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);

  const getGraphStats = () => {
    if (!repos.length) return "Подгружаем...";

    const allLangs: { [id: string]: number } = {};

    repos.forEach((rep) => {
      const repLangs: string[] = rep.langs.edges.map(
        (repos) => repos.node.name
      );

      repLangs.forEach((repLang) => {
        if (allLangs[repLang]) {
          allLangs[repLang] += 1;
        } else {
          allLangs[repLang] = 1;
        }
      });
    });

    const data = {
      labels: Object.keys(allLangs),
      datasets: [
        {
          label: "Количество языков",
          data: Object.values(allLangs),
        },
      ],
    };

    return <Bar data={data} />;
  };

  const getNumbersStats = () => {
    if (!repos.length) return "Подгружаем...";
    const languages = repos
      .map((repository) => {
        return { name: repository.name, languages: repository.langs.edges };
      })
      .reduce((ourMap: OurMapType, currentRep: CurrentRepType) => {
        currentRep.languages.forEach((language) => {
          if (ourMap[language.node.name]) {
            ourMap[language.node.name].count += 1;
            ourMap[language.node.name].size += language.size;
            ourMap[language.node.name].repos.push(currentRep.name);
          } else {
            ourMap[language.node.name] = {
              count: 1,
              size: language.size,
              repos: [currentRep.name],
              langName: language.node.name,
            };
          }
        });

        return ourMap;
      }, {});
    const reposCount = repos.length;
    const values = Object.values(languages);
    return values
      .sort((a, b) => b.count - a.count)
      .map((lang, index) => {
        return (
          <div key={lang.langName} className={"languages-numbers-stats"}>
            <div className={"languages-numbers-stats-name lang-table-row"}>
              {index < 3 ? (
                <div className={"top-lang-medal"}>
                  <img src={medals[index]} alt={`${index + 1}`} />
                </div>
              ) : null}
              {lang.langName}
            </div>
            <div className={"lang-table-row"}>
              <CountUp start={lang.count / 10} end={lang.count} />
            </div>
            <div className={"lang-table-row"}>
              {Math.trunc((lang.count / reposCount) * 100)}
            </div>
            <div className={"lang-table-row"}>
              {formatSizeUnits(lang.size)
                .split(" ")
                .map((i, index) => {
                  if (!index) return <CountUp end={+i} />;
                  return " " + i;
                })}
            </div>
            <div className={"languages-repositories"}>
              <p className={"font-weight-bold"}>Репозитории</p>
              <hr />
              {lang.repos.map((rep, ind) => (
                <p key={ind}>
                  {ind + 1}. {rep}
                </p>
              ))}
            </div>
          </div>
        );
      });
  };

  const modalToggle = () => {
    const showModal = document.querySelector(".languages-numbers");
    const modalWrapper = document.querySelector(".more-info-wrapper");
    if (showModal && modalWrapper) {
      showModal.classList.remove("modal-show-animation");
      modalWrapper.classList.remove("modal-wrapper-animation");
    }
    setTimeout(() => setMoreInfo(!moreInfo), 100);
  };

  return (
    <>
      <section className={"user-statistic-container no-blur-section"}>
        <h1 className={"title"}>Статистика по языкам ({login})</h1>
        <div className={"languages-info-container"}>
          <div className="languages-graph">{getGraphStats()}</div>
        </div>
        <button className={"more-info-show-button"} onClick={modalToggle}>
          Подробнее
        </button>
      </section>
      {moreInfo ? (
        <LanguageModal
          getNumbersStats={getNumbersStats}
          modalToggle={modalToggle}
        />
      ) : null}
    </>
  );
};
