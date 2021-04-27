import React, { useEffect, useState } from "react";
import { Commits as CommitsData } from "../../models/IRepository";
import { Bar, Line } from "react-chartjs-2";
import CountUp from "react-countup";

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
  };
};

export const Commits: React.FC<AllRepositoriesType> = ({ repos, login }) => {
  const [sortType, setSortType] = useState<TimeSpanType>(timeSpan.DAY);
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [totalCommitsCount, setTotalCommitsCount] = useState<number>(0);

  useEffect(() => {
    const commits = repos
      .reduce((acc: CommitData[], repository) => {
        repository.commits.nodes
          .filter((commit) => commit.author.user?.login === login)
          .forEach((commit) => {
            acc.push({
              repoName: repository.name,
              committedDate: commit.committedDate,
              message: commit.message,
            });
          });

        return acc;
      }, [])
      .sort(
        (a, b) =>
          new Date(a.committedDate).getTime() -
          new Date(b.committedDate).getTime()
      );

    setCommitData(commits);
    setTotalCommitsCount(commits.length);
  }, [repos, login]);

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
        };
      }

      return ourMap;
    }, {});
  };

  const getCommitStats = () => {
    if (!commitData.length) return "Подгружаем...";

    const sortCommits = getOurMap(commitData);

    const data = {
      labels: Object.keys(sortCommits),
      datasets: [
        {
          backgroundColor:
            sortType === timeSpan.DAY
              ? "rgba(0, 0, 0, .05)"
              : "rgba(33, 33, 33, .15)",
          label: "Количество коммитов",
          borderColor: "rgba(33, 33, 33, .32)",
          borderWidth: 3,
          data: Object.values(sortCommits).map((commit) => commit.count),
        },
      ],
    };

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
          Всего сделано коммитов:{" "}
          <CountUp end={totalCommitsCount} start={totalCommitsCount * 0.7} />
        </h3>
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
      {getCommitStats()}
    </div>
  );
};
