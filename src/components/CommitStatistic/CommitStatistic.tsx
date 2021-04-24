import React, { useEffect, useState } from "react";
import { Commits as CommitsData } from "../../models/IRepository";
import { Bar } from "react-chartjs-2";

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
  const [sortType, setSortType] = useState<string>("day");
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
      case "day":
        return new Date(date).toLocaleDateString();
      case "month":
        return (
          new Date(date).toLocaleString("default", { month: "long" }) +
          " " +
          new Date(date).getFullYear()
        );
      case "year":
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
          label: "Количество коммитов",
          borderWidth: 2,
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

    return (
      <div>
        <div>
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };

  const changeSortType = (type: string) => {
    setSortType(type);
  };

  return (
    <>
      <h3>Коммиты</h3>
      <div>Всего сделано коммитов: {totalCommitsCount}</div>
      <div>
        <button onClick={() => changeSortType("day")}>День</button>
        <button onClick={() => changeSortType("month")}>Месяц</button>
        <button onClick={() => changeSortType("year")}>Год</button>
      </div>
      {getCommitStats()}
    </>
  );
};
