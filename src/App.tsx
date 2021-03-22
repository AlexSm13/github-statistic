import React, {useState} from 'react';
import Search from "./components/Search/Search";
import UserInfo from "./components/UserInfo/UserInfo";
import { userInfoQuery } from "./api/startInfo";
import { useLazyQuery } from "@apollo/client";

function App() {
    const [login, setLogin] = useState<string>("");

    const [
        getDataInfo,
        { data }
    ] = useLazyQuery(userInfoQuery);

    const loginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const getData = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        getDataInfo({
            variables: { login },
        })
    }

    return (
      <div className={'container'}>
          <Search getData={getData} login={login} loginChange={loginChange}/>
          {data ?
            <>
                <UserInfo imgURL={data.user.avatarUrl} login={data.user.login}/>
            </>
            :
            null
          }
      </div>
    )
}

export default App;
