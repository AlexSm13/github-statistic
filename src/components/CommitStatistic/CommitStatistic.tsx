import React, { useEffect, useState } from "react";
import { Commits as CommitsData } from "../../models/IRepository";
import { Bar, Line, Scatter } from "react-chartjs-2";
import CountUp from "react-countup";
import { MONTHS } from "../../consts/consts";

enum timeSpan {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

type TimeSpanType = keyof typeof timeSpan;

type RepositoryInfoType = {
  name: string;
  commits: CommitsData;
};

type AllRepositoriesType = {
  repos: RepositoryInfoType[];
  login: string;
  secondLogin?: string;
  secondRepos?: RepositoryInfoType[];
};

type CommitData = {
  repoName: string;
  committedDate: string;
  message: string;
};

type OurMapType = {
  [id: string]: {
    count: number;
    commits: string[];
    repos: Set<string>;
    date: string;
  };
};

export const Commits: React.FC<AllRepositoriesType> = ({
  repos,
  login,
  secondRepos,
  secondLogin,
}) => {
  const [sortType, setSortType] = useState<TimeSpanType>(timeSpan.DAY);
  const [firstCommitData, setFirstCommitData] = useState<CommitData[]>([]);
  const [secondCommitData, setSecondCommitData] = useState<CommitData[]>([]);
  const [totalFirstCommitsCount, setTotalFirstCommitsCount] = useState<number>(
    0
  );
  const [changeMonth, setChangeMonth] = useState<number>(new Date().getMonth());
  const [allYears, setAllYears] = useState<number[]>([]);
  const [changeYear, setChangeYear] = useState<number>(
    new Date().getFullYear()
  );

  const [showAllCommits, setShowAllCommits] = useState<boolean>(false);

  const [
    totalSecondCommitsCount,
    setTotalSecondCommitsCount,
  ] = useState<number>(0);

  const getAllCommitsData = (
    reps: RepositoryInfoType[],
    searchLogin: string
  ): CommitData[] => {
    let currYears = new Set<number>();
    return reps
      .reduce((acc: CommitData[], repository) => {
        repository.commits.nodes
          .filter((commit) => commit.author.user?.login === searchLogin)
          .forEach((commit) => {
            currYears.add(new Date(commit.committedDate).getFullYear());
            acc.push({
              repoName: repository.name,
              committedDate: commit.committedDate,
              message: commit.message,
            });
          });
        setAllYears(Array.from(currYears).sort());

        return acc;
      }, [])
      .sort(
        (a, b) =>
          new Date(a.committedDate).getTime() -
          new Date(b.committedDate).getTime()
      );
  };

  useEffect(() => {
    const commits = getAllCommitsData(repos, login);

    setFirstCommitData(commits);
    setTotalFirstCommitsCount(commits.length);
  }, [repos, login]);

  useEffect(() => {
    const commits =
      secondRepos && secondLogin
        ? getAllCommitsData(secondRepos, secondLogin)
        : [];

    setSecondCommitData(commits);
    setTotalSecondCommitsCount(commits.length);
  }, [secondRepos, secondLogin]);

  const getCorrectDateKey = (date: string): string => {
    switch (sortType) {
      case timeSpan.DAY:
        return new Date(date).toLocaleDateString();
      case timeSpan.MONTH:
        return (
          new Date(date).toLocaleString("default", { month: "long" }) +
          " " +
          new Date(date).getFullYear()
        );
      case timeSpan.YEAR:
        return new Date(date).getFullYear().toString();
      default:
        return date;
    }
  };

  const getOurMap = (commits: CommitData[]) => {
    return commits.reduce((ourMap: OurMapType, commit) => {
      const date = getCorrectDateKey(commit.committedDate);
      if (ourMap[date]) {
        ourMap[date].count += 1;
        ourMap[date].commits.push(commit.message);
        ourMap[date].repos.add(commit.repoName);
      } else {
        ourMap[date] = {
          count: 1,
          commits: [commit.message],
          repos: new Set([commit.repoName]),
          date: commit.committedDate,
        };
      }

      return ourMap;
    }, {});
  };

  const sortLabels = (labels: string[]): string[] => {
    labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const data = labels.map((label) => getCorrectDateKey(label));
    return Array.from(new Set([...data]));
  };

  const getSortCommitsForDate = (commitsData: OurMapType): OurMapType => {
    return Object.keys(commitsData)
      .filter((key) => {
        const date = new Date(commitsData[key].date);
        return (
          date.getFullYear() === changeYear && date.getMonth() === changeMonth
        );
      })
      .reduce((obj: OurMapType, key) => {
        obj[key] = commitsData[key];
        return obj;
      }, {});
  };

  const getCommitStats = () => {
    if (!firstCommitData.length) return "Подгружаем...";
    if (secondRepos && !secondCommitData.length) return "Подгружаем...";

    let sortFirstCommits = getOurMap(firstCommitData);
    let sortSecondCommits = getOurMap(secondCommitData);

    if (sortType === timeSpan.DAY && !showAllCommits) {
      sortFirstCommits = getSortCommitsForDate(sortFirstCommits);
      sortSecondCommits = getSortCommitsForDate(sortSecondCommits);
    }

    const labels: Set<string> = new Set([...Object.keys(sortFirstCommits)]);

    const data = {
      labels: Array.from(labels),
      datasets: [
        {
          tension: 0,
          backgroundColor:
            sortType === timeSpan.DAY ? "transparent" : "rgba(33, 33, 33, .15)",
          label: `Количество коммитов ${
            !secondRepos || !secondRepos.length ? "" : login
          }`,
          borderColor: "rgba(27, 141, 203, .7)",
          borderWidth: 3,
          data: Object.keys(sortFirstCommits).map((key) => {
            return { x: key, y: sortFirstCommits[key].count };
          }),
        },
      ],
    };

    if (secondCommitData.length) {
      const newLabels = new Set([
        ...Object.values(sortFirstCommits).map((commit) => commit.date),
        ...Object.values(sortSecondCommits).map((commit) => commit.date),
      ]);

      data.labels = sortLabels(Array.from(newLabels));
      data.datasets.push({
        tension: 0,
        backgroundColor:
          sortType === timeSpan.DAY ? "transparent" : "rgba(255,123,0,0.15)",
        label: `Количество коммитов ${secondLogin}`,
        borderColor: "rgba(255, 123, 0, .7)",
        borderWidth: 3,
        data: Object.keys(sortSecondCommits).map((key) => {
          return { x: key, y: sortSecondCommits[key].count };
        }),
      });
    }

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    if (sortType === timeSpan.DAY) {
      return <Line data={data} options={options} />;
    }
    return <Bar data={data} options={options} />;
  };

  const changeSortType = (type: TimeSpanType) => {
    setSortType(type);
  };

  return (
    <div className={"user-statistic-container"}>
      <h1 className={"title"}>Активности</h1>
      <div className={"chart-flex-container"}>
        <h3>
          Всего сделано коммитов{" "}
          {!secondRepos || !secondRepos.length ? "" : login}:{" "}
          <CountUp
            end={totalFirstCommitsCount}
            start={totalFirstCommitsCount * 0.7}
          />
        </h3>
        {secondRepos && secondRepos.length ? (
          <h3>
            Всего сделано коммитов {secondLogin}:{" "}
            <CountUp
              end={totalSecondCommitsCount}
              start={totalSecondCommitsCount * 0.7}
            />
          </h3>
        ) : null}
        <div className={"buttons-flex-container"}>
          <button
            className={"more-info-show-button timespan-change-button"}
            onClick={() => changeSortType(timeSpan.DAY)}
            disabled={sortType === timeSpan.DAY}
          >
            День
          </button>
          <button
            className={"more-info-show-button timespan-change-button"}
            onClick={() => changeSortType(timeSpan.MONTH)}
            disabled={sortType === timeSpan.MONTH}
          >
            Месяц
          </button>
          <button
            className={"more-info-show-button timespan-change-button"}
            onClick={() => changeSortType(timeSpan.YEAR)}
            disabled={sortType === timeSpan.YEAR}
          >
            Год
          </button>
        </div>
      </div>
      {sortType === timeSpan.DAY ? (
        <>
          <div className={"select-flex-container"}>
            <select
              value={changeMonth}
              onChange={(e) => setChangeMonth(+e.target.value)}
            >
              {MONTHS.map((month, index) => {
                return <option value={index}>{month}</option>;
              })}
            </select>
            <select
              value={changeYear}
              onChange={(e) => setChangeYear(+e.target.value)}
            >
              {allYears.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
          </div>
          <div className={"chart-checkbox"}>
            <input
              type="checkbox"
              className="custom-checkbox"
              id="allData"
              name="allData"
            />
            <label
              onClick={() => setShowAllCommits((prev) => !prev)}
              className={"custom-checkbox-label"}
              htmlFor="allData"
            >
              Показать все коммиты
            </label>
          </div>
        </>
      ) : null}
      {getCommitStats()}
    </div>
  );
};
