import searchIcon from "../../images/search.svg";
import React from "react";

type SearchType = {
  value: string;
  valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getData: (event: React.FormEvent<EventTarget>) => void;
  title?: string;
  placeholder: string;
  width?: string;
};

const Search: React.FC<SearchType> = ({
  value,
  width = "100%",
  valueChange,
  getData,
  title,
  placeholder,
}) => {
  return (
    <div className={"search-container"} style={{ width }}>
      <h2>{title}</h2>
      <form className={"search-form"} onSubmit={getData}>
        <input
          placeholder={placeholder}
          className={"search-form-input"}
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
