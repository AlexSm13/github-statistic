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
  secondRepos?: RepositoryInfoType[];
  secondLogin?: string;
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

export const Languages: React.FC<AllRepositoriesType> = ({
  repos,
  login,
  secondRepos,
  secondLogin,
}) => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const [typeUser, setTypeUser] = useState<"first" | "second">("first");

  const getAllLangs = (rep: RepositoryInfoType[]): { [id: string]: number } => {
    const allLangs: { [id: string]: number } = {};
    rep.forEach((rep) => {
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

    return allLangs;
  };

  const getGraphStats = () => {
    if (!repos.length) return "Подгружаем...";

    const firstAllLangs = getAllLangs(repos);
    const secondAllLangs = secondRepos && getAllLangs(secondRepos);
    const labels: Set<string> = new Set([...Object.keys(firstAllLangs)]);

    const data = {
      labels: Array.from(labels),
      datasets: [
        {
          label: `Количество языков ${
            !secondRepos || !secondRepos.length ? "" : login
          }`,
          data: Object.keys(firstAllLangs).map((key) => {
            return { x: key, y: firstAllLangs[key] };
          }),
          borderColor: "rgba(33, 33, 33, .32)",
          backgroundColor: "rgba(33, 33, 33, .15)",
        },
      ],
    };

    if (secondAllLangs) {
      const newLabels = new Set([
        ...Object.keys(firstAllLangs),
        ...Object.keys(secondAllLangs),
      ]);

      data.labels = Array.from(newLabels);
      data.datasets.push({
        label: `Количество коммитов ${secondLogin}`,
        data: Object.keys(secondAllLangs).map((key) => {
          return { x: key, y: secondAllLangs[key] };
        }),
        borderColor: "rgba(255,123,0,0.32)",
        backgroundColor: "rgba(255,123,0,0.15)",
      });
    }

    return <Bar data={data} />;
  };

  const getNumbersStats = () => {
    const data =
      typeUser === "first" ? [...repos] : secondRepos ? [...secondRepos] : [];

    if (!data.length) return "Подгружаем...";
    const languages = data
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
    const reposCount = data.length;
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
                  if (!index) return <CountUp key={Math.random()} end={+i} />;
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

  const modalToggle = (type?: "first" | "second") => {
    const showModal = document.querySelector(".languages-numbers");
    const modalWrapper = document.querySelector(".more-info-wrapper");
    if (showModal && modalWrapper) {
      showModal.classList.remove("modal-show-animation");
      modalWrapper.classList.remove("modal-wrapper-animation");
    }
    setTimeout(() => setMoreInfo(!moreInfo), 100);
    type && setTypeUser(type);
  };

  return (
    <>
      <section className={"user-statistic-container no-blur-section"}>
        <h1 className={"title"}>
          Статистика по языкам ({login}{" "}
          {secondRepos && secondRepos.length ? " и " + secondLogin : ""})
        </h1>
        <div className={"languages-info-container"}>
          <div className="languages-graph">{getGraphStats()}</div>
        </div>
        <button
          className={"more-info-show-button"}
          onClick={() => modalToggle("first")}
        >
          Подробнее {!secondRepos || !secondRepos.length ? "" : login}
        </button>
        {secondRepos && secondRepos.length ? (
          <button
            className={"more-info-show-button"}
            onClick={() => modalToggle("second")}
          >
            Подробнее {secondLogin}
          </button>
        ) : null}
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
