import React from 'react';
import {Language} from "../../models/IRepository";
import {log} from "util";
import {Bar} from "react-chartjs-2";

type RepositoryInfoType = {
    name: string;
    langs: Language;
}

type AllRepositoriesType = {
    repos: RepositoryInfoType[];
}


type LangType = {
    name: string;
    count: number;
    repos: string[];
}

type ValuesType = {
    name: string;
    reposes: string[];
    count: number;
    langname: string;
}

export const Languages: React.FC<AllRepositoriesType> = ({repos}) => {

    const getGraphStats = () => {
        if (!repos.length) return 'Подгружаем...'

        const allLangs: {[id: string]: number} = {};

        repos.forEach(rep => {
            const repLangs: string[] = rep.langs.edges.map(repos => repos.node.name);

            repLangs.forEach(repLang => {
                if (allLangs[repLang]) {
                    allLangs[repLang] += 1;
                } else {
                    allLangs[repLang] = 1;
                }
            })

        });

        console.log(allLangs)

        const data = {
            labels: Object.keys(allLangs),
            datasets: [
                {
                    label: 'Языки',
                    data: Object.values(allLangs)
                }
            ]
        }

        return (
            <Bar data={data}/>
        )
    }

    const getNumbersStats = () => {
        if (!repos.length) return 'Подгружаем...';
        const languages = repos
            .map((repository) => {
                return {name: repository.name, languages: repository.langs.edges};
            })
            .reduce(
                (
                    ourMap: {
                        [id: string]: { count: number; size: number; repos: string[], langName: string };
                    },
                    current: {
                        name: string;
                        languages: { size: number; node: { name: string } }[];
                    }
                ) => {
                    current.languages.forEach((language) => {
                        if (ourMap[language.node.name]) {
                            ourMap[language.node.name].count += 1;
                            ourMap[language.node.name].size += language.size;
                            ourMap[language.node.name].repos.push(current.name);
                        } else {
                            ourMap[language.node.name] = {
                                count: 1,
                                size: language.size,
                                repos: [current.name],
                                langName: language.node.name
                            };
                        }
                    });

                    return ourMap;
                },
                {}
            );


        // @ts-ignore
        const values = Object.values(languages);
        return values.sort((a, b) => b.count - a.count).map(lang => {
            return (
                <div key={lang.langName} className={'languages-numbers-stats'}>
                    <div className={'languages-numbers-stats-name'}>{lang.langName}</div>
                    <div className={'languages-numbers-stats-count'}>{lang.count}</div>
                    <div className={'languages-repositories'}>
                        <p className={'font-weight-bold'}>Репозитории</p>
                        <hr/>
                        {lang.repos.map(rep =>
                            <p key={rep}>• {rep}</p>
                        )}
                    </div>
                </div>
            )
        })

    }

    // console.log(repos)

    return (
        <>
            <h3>Языки</h3>
            <div className={"languages-info-container"}>
                <div className="languages-numbers">
                    <div className={'languages-numbers-stats'}>
                        <div className={'languages-numbers-stats-header languages-numbers-stats-name'}>Язык</div>
                        <div className={'languages-numbers-stats-header languages-numbers-stats-count'}>Репозиториев
                        </div>
                    </div>
                    {getNumbersStats()}
                </div>
                <div className="languages-graph">
                    {getGraphStats()}
                </div>
            </div>
        </>
    )
};
