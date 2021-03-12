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
        <div className={'user-info-container'}>
            <div className={'loginAvatar-container'}>
                <div className={'avatar'}>
                    <img src={imgURL} alt=""/>
                </div>
                <h1>{login}</h1>
            </div>
            <div className={'user-start-info'}>
                <h1 className={'title'}>Основная информация</h1>

                <label><p className={'user-info-description'}>Имя:</p><p>{login}</p></label>
                <label><p className={'user-info-description'}>Организация:</p><p>{login}</p></label>
                <label><p className={'user-info-description'}>Страна:</p><p>{login}</p></label>
                <label><p className={'user-info-description'}>Email:</p><p>{login}</p></label>
                <label><p className={'user-info-description'}>Сайт:</p><p>{login}</p></label>
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
