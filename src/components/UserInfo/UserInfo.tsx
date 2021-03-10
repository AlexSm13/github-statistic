import React, {useEffect, useState} from 'react';
//import Api from "../../api";


//const api = new Api();

type userInfoType = {
    login: string;
    imgURL: string;
}

const UserInfo: React.FC<userInfoType> = ({login, imgURL}) => {
   // const [userInfo, setUserInfo] = useState({});
    //const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // if (props.login) {
        //     setIsLoaded(false);
        // }
    }, [login])

    if (!login) {
        return <div>Нет данных</div>
    }
    return (
        <>
            <div>{login}</div>
            <img src={imgURL} alt=""/>
        </>

    )

    // if (!isLoaded) {
    //     return <div>Загрузка...</div>;
    // } else {
    //     return ();
    // }
}
//
 export default UserInfo;
