import {log} from "util";

type userInfoType = {
    login: any;
    imgURL: string;
}

const UserInfo: React.FC<userInfoType> = ({login, imgURL}) => {
    console.log(login)
    if (!login) {
        return <div>Нет данных</div>
    }

    return (
        <div className={'user-info__container'}>
            <div className={'login-avatar__container'}>
                <div className={'avatar'}>
                    <img src={imgURL} alt=""/>
                </div>
                <h1>{login}</h1>
            </div>
            <div className={'user-start-info'}>
                <label><p>Имя</p><p>{login}</p></label>
                <label><p>Организация</p><p>{login}</p></label>
                <label><p>Местоположение</p><p>{login}</p></label>
                <label><p>Email</p><p>{login}</p></label>
                <label><p>Сайт</p><p>{login}</p></label>
            </div>

        </div>

    )

    // if (!isLoaded) {
    //     return <div>Загрузка...</div>;
    // } else {
    //     return ();
    // }
}
//
 export default UserInfo;
