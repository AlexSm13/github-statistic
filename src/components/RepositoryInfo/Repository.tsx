import React from "react";
import { IRepository } from "../../models/IRepository";

type RepositoryInfoType = {
  info: IRepository;
};

export const Repository: React.FC<RepositoryInfoType> = ({ info }) => {
  return (
    <div className={'repository'}>
        {info.name}
    </div>
  );
};
