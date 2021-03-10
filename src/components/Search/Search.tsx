import React, {FormEventHandler, useRef, useState} from "react";
import UserInfo from "../UserInfo/UserInfo";
import {getStartData} from "../../api/startInfo";

type searchType = {
    login: string;
    loginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getData: (event: React.FormEvent<EventTarget>) => void;
}

const Search: React.FC<searchType> = ({login, loginChange, getData}) => {
    return (
        <div className={'userinfo'}>
            <h2>Введите логин Github</h2>
            <form onSubmit={getData}>
                <input onChange={loginChange} value={login} type="text"/>
                <button type={'submit'}>Искать</button>
            </form>

            <div>

            </div>
        </div>
    );
}

export default Search;
