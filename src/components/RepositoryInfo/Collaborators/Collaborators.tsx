import React from "react";
import { Collaborator } from "../../../models/IRepository";

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
  avatarUrl?: string;
};

export const Collaborators: React.FC<CollaboratorsType> = ({
  collaborators,
}) => {
  if (!collaborators.length) {
    return <h3>Интроверт... что сказать</h3>;
  }

  const getHomies = () => {
    // const allHomies: { [id: string]: FriendType } = {};

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

    console.log(allHomies);
    return Object.values(allHomies).map((homie) => {
      return (
        <div className={"homie"}>
          <div className={"homie-avatar"}>
            <img src={homie.avatarUrl} alt="картинка" />
          </div>
          <div className={"homie-description"}>
            <div className="homie-name">{homie.userName}</div>
            <div className="homie-login">{homie.userLogin}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Часто работает с:</h3>
      <div className={"homies-container"}>{getHomies()}</div>
    </div>
  );
};
