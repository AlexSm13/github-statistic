import searchIcon from "../../images/search.svg";
import React from "react";

type SearchType = {
  login: string;
  loginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getData: (event: React.FormEvent<EventTarget>) => void;
};

const Search: React.FC<SearchType> = ({ login, loginChange, getData }) => {
  return (
    <div className={"search-container"}>
      <h2>Поисковик пользователей </h2>
      <form className={"search-form"} onSubmit={getData}>
        <input
          placeholder={"login Github"}
          className={"search-form-input"}
          onChange={loginChange}
          value={login}
          type="text"
        />
        <button type={"submit"}>
          <img src={searchIcon} alt="Поиск" />
        </button>
      </form>
    </div>
  );
};

export default Search;
