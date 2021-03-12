import searchIcon from "../../images/search.svg"

type searchType = {
    login: string;
    loginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getData: (event: React.FormEvent<EventTarget>) => void;
}

const Search: React.FC<searchType> = ({login, loginChange, getData}) => {
    return (
        <div className={'search__container'}>
            <h2>Поисковик пользователей </h2>
            <form className={'search__form'} onSubmit={getData}>
                <input placeholder={'login Github'} className={'search__form-input'} onChange={loginChange} value={login} type="text"/>
                <button type={'submit'}><img src={searchIcon} alt=""/></button>
            </form>
        </div>
    );
}

export default Search;
