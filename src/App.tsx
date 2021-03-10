import React, {useState} from 'react';
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import {getStartData} from "./api/startInfo";

function App() {
    const [login, setLogin] = useState<string>("");
    const [data, setData] = useState<any>("");

    const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const getData = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const data = await getStartData(login);
        setData(data);
    }

    return (

        <div className={'container'}>
            <Search getData={getData} login={login} loginChange={loginChange}/>
            {data ?
                <>
                    <UserInfo imgURL={data.avatar_url} login={data.login}/>
                </>
                :
                "Нет данный"
            }

        </div>
    )
}

export default App;
