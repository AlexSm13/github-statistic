import React from "react";
import { Bar } from "react-chartjs-2";
import { PullRequest, Issue } from "../../models/IRepository";

const MILLISECOND_TO_MINUTE = 1000 * 60;
const MILLISECOND_TO_HOUR = MILLISECOND_TO_MINUTE * 60;
const MILLISECOND_TO_DAY = MILLISECOND_TO_HOUR * 24;

enum convertDuration {
  "minute" = MILLISECOND_TO_MINUTE,
  "hour" = MILLISECOND_TO_HOUR,
  "day" = MILLISECOND_TO_DAY,
}

enum convertDurationToString {
  "minute" = "минут",
  "hour" = "часов",
  "day" = "дней",
}

type StatisticData = {
  info: PullRequest | Issue;
  label: string;
  durationIn: keyof typeof convertDuration;
};

const IssueAndPullStatistic: React.FC<StatisticData> = ({
  info,
  label,
  durationIn = "day",
}) => {
  const dataInfo = info.nodes.map((info) => {
    const duration = +(
      (new Date(info.closedAt).getTime() - new Date(info.createdAt).getTime()) /
      convertDuration[durationIn]
    ).toFixed(1);
    return {
      title: info.title,
      number: info.number,
      duration: duration,
    };
  });

  const closedInfo = dataInfo.filter((it) => it.duration >= 0);
  const openInfo = dataInfo.filter((it) => it.duration < 0);

  const average = (
    closedInfo.reduce((total, info) => total + info.duration, 0) /
    closedInfo.length
  ).toFixed(1);

  const data = {
    labels: closedInfo.map((it) => it.title),
    datasets: [
      {
        label: label,
        data: closedInfo.map((it) => it.duration),
      },
    ],
  };

  return (
    <div className={"statistic-container"}>
      <Bar data={data} />
      <div>
        Среднее время закрытия {label} - {average}{" "}
        {convertDurationToString[durationIn]}
      </div>
      {openInfo.length ? (
        <>
          <div>Открытые {label}:</div>
          {openInfo.map((info) => (
            <li>{info.title}</li>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default IssueAndPullStatistic;
