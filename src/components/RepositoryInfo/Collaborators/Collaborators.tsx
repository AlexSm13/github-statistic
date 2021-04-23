import React from "react";
import { Collaborator } from "../../../models/IRepository";
import {UserShortInfo} from "./UserShortInfo";

type CollaboratorsType = {
  collaborators: {
    edges: Collaborator[];
    repName: string;
  }[];
};

type FriendType = {
  userLogin: string;
  repNames: string[];
  count: number;
  userName: string;
  avatarUrl: string;
};

export const Collaborators: React.FC<CollaboratorsType> = ({
  collaborators,
}) => {
  if (!collaborators.length) {
    return <h3>Интроверт... что сказать</h3>;
  }

  const getHomies = () => {
    const allHomies = collaborators.reduce(
      (ourMap: { [id: string]: FriendType }, current) => {
        current.edges.forEach((collaborator) => {
          if (ourMap[collaborator.node.login]) {
            ourMap[collaborator.node.login].count += 1;
            ourMap[collaborator.node.login].repNames.push(current.repName);
          } else {
            ourMap[collaborator.node.login] = {
              count: 1,
              repNames: [current.repName],
              userName: collaborator.node.login,
              avatarUrl: collaborator.node.avatarUrl,
              userLogin: collaborator.node.name,
            };
          }
        });

        return ourMap;
      },
      {}
    );

    return Object.values(allHomies).map((homie) => {
      return (
       <UserShortInfo userLogin={homie.userLogin} userName={homie.userName} avatarUrl={homie.avatarUrl} />
      );
    });
  };

  return (
    <div className={'repositories-info'}>
      <button>Посмотреть на Homies</button>
      {/*<div className={"homies-container"}>{getHomies()}</div>*/}
    </div>
  );
};
