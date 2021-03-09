import React, {useEffect, useState} from 'react';
import Api from "../../api";


const api = new Api();

function UserInfo(props: {login: string}) {
    const [userInfo, setUserInfo] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        if (props.login) {
            setIsLoaded(false);
            api.getUserInfo(props.login).then(
                (result) => {
                    console.log(result)
                    setUserInfo(result);
                    setIsLoaded(true);
                }
            )
        }
    }, [props.login])

    if (!props.login) {
        return <div>Нет данных</div>
    }

    if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (<div>{JSON.stringify(userInfo)}</div>);
    }
}

export default UserInfo;
