import React from 'react';
import {Collaborator} from "../../../models/IRepository";
import {split} from "@apollo/client";

type CollaboratorsType = {
    collaborators: {
        edges: Collaborator[]
        repName: string
    }[]
}

type FrientType = { userLogin: string, repNames: string[], count: number, userName:string, avatarUrl?: string }

export const Collaborators: React.FC<CollaboratorsType> = ({collaborators}) => {
        if (!collaborators.length) {
            return <h3>Интроверт... что сказать</h3>
        }

        const getHomies = () => {
            const allHomies: { [id: string]: FrientType } = {};

            collaborators.forEach((rep) => {
                const repCollaborators: string[] = rep.edges.map(user => `${user.node.login}#$$|!**${user.node.avatarUrl}#$$|!**${user.node.name}`);

                repCollaborators.forEach((collabarator) => {
                    const [login, avatar, name] = collabarator.split('#$$|!**');
                    if (allHomies[login]) {
                        allHomies[login].count += 1;
                        allHomies[login].repNames = [...allHomies[login].repNames, rep.repName];
                    } else {
                        allHomies[login] = {count: 1,
                            repNames: [rep.repName],
                            userName: login,
                            avatarUrl: avatar,
                            userLogin: name
                        }
                    }
                });
            })
            console.log(allHomies)
            return Object.values(allHomies).map(homie => {
                return (<div className={'homie'}>
                    <div className={'homie-avatar'}>
                        <img src={homie.avatarUrl} alt="картинка"/>
                    </div>
                    <div className={'homie-description'}>
                        <div className="homie-name">{homie.userName}</div>
                        <div className="homie-login">{homie.userLogin}</div>
                    </div>
                </div>)
            })
        }
        return (
            <div>
                <h3>Часто работает с:</h3>
                <div className={'homies-container'}>
                    {getHomies()}
                </div>

            </div>
        );
    }
;
