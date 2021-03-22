import React from "react";
import { IRepository } from "../../models/IRepository";

type RepositoryInfoData = {
  data: IRepository;
};

const RepositoryInfo: React.FC<RepositoryInfoData> = ({ data }) => {
  console.log("d", data);
  if (!data) {
    return <div>Нет данных</div>;
  }

  return (
    <div className={"repository-info-container"}>
      <section>
        <h1>{data.name}</h1>
      </section>
    </div>
  );
};

export default RepositoryInfo;
