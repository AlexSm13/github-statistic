import searchIcon from "../../images/search.svg";
import React from "react";

type SearchType = {
  value: string;
  valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getData?: (ss: boolean) => void;
  title?: string;
  placeholder: string;
  secondSection: boolean
};

const Search: React.FC<SearchType> = ({
  value,
  valueChange,
  getData,
  title,
  placeholder,
                                        secondSection
}) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    getData(secondSection)
  }

  return (
    <div className={"search-container"}>
      <h2>{title}</h2>
      <form className={"search-form"} onSubmit={handleSubmit}>
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
