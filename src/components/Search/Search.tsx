import searchIcon from "../../images/search.svg";
import React from "react";

type SearchType = {
  value: string;
  valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getData?: (event: React.FormEvent<EventTarget>) => void;
  title?: string;
  placeholder: string;
};

const Search: React.FC<SearchType> = ({
  value,
  valueChange,
  getData,
  title,
  placeholder,
}) => {
  return (
    <div className={"search-container"}>
      <h2>{title}</h2>
      <form className={"search-form"} onSubmit={getData}>
        <input
          placeholder={placeholder}
          className={"user-search-input"}
          onChange={valueChange}
          value={value}
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
