import React from "react";
import { Language } from "../../models/IRepository";
import { Bar } from "react-chartjs-2";
import firstPlace from "../../images/topLangs/medal-1.svg";
import secondPlace from "../../images/topLangs/medal-2.svg";
import thirdPlace from "../../images/topLangs/medal-3.svg";

type RepositoryInfoType = {
  name: string;
  langs: Language;
};

type AllRepositoriesType = {
  repos: RepositoryInfoType[];
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

export const Languages: React.FC<AllRepositoriesType> = ({ repos }) => {
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
            <div className={"languages-numbers-stats-name"}>
              {index < 3 ? (
                <div className={"top-lang-medal"}>
                  <img src={medals[index]} alt={`${index + 1}`} />
                </div>
              ) : null}
              {lang.langName}
            </div>
            <div className={"languages-numbers-stats-count"}>{lang.count}</div>
            <div className={"languages-numbers-stats-percent"}>
              {Math.trunc((lang.count / reposCount) * 100)}
            </div>
            <div className={"languages-repositories"}>
              <p className={"font-weight-bold"}>Репозитории</p>
              <hr />
              {lang.repos.map((rep, ind) => (
                <p key={rep}>
                  {ind + 1}. {rep}
                </p>
              ))}
            </div>
          </div>
        );
      });
  };

  return (
    <>
      <h3>Языки</h3>
      <div className={"languages-info-container"}>
        <div className="languages-numbers">
          <div className={"languages-numbers-stats-header"}>
            <div className={"languages-numbers-stats-name-header"}>Язык</div>
            <div className={"languages-numbers-stats-count-header"}>Репо-в</div>
            <div className={"languages-numbers-stats-percent-header"}>%</div>
          </div>
          <hr />
          {getNumbersStats()}
        </div>
        <div className="languages-graph">{getGraphStats()}</div>
      </div>
    </>
  );
};
