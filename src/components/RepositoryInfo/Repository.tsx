import React, { useState } from "react";
import { IRepository } from "../../models/IRepository";

type RepositoryInfoType = {
  info: IRepository;
};

export const Repository: React.FC<RepositoryInfoType> = ({ info }) => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);

  const modalToggle = () => {
    setMoreInfo(!moreInfo);
  };

  return (
    <>
      <div className={"repository"} onClick={modalToggle}>
        <h3>{info.name}</h3>
      </div>
      {moreInfo ? (
        <div className={"more-info-wrapper"} onClick={modalToggle}>
          <div className={"more-info"} onClick={(e) => e.stopPropagation()}>
            <h1>Инфа по типу языков форков контребьютеров для {info.name}</h1>
          </div>
        </div>
      ) : null}
    </>
  );
};
