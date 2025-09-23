import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./search.css";
import SearchIcon from "../../public/icons/search_12_32.svg";

export const Search = ({ search: initialSearch = "", handleSearch }) => {
  const [search, setSearch] = useState(
    initialSearch.charAt(0).toUpperCase() + initialSearch.slice(1)
  );

  useEffect(() => {
    setSearch(initialSearch.charAt(0).toUpperCase() + initialSearch.slice(1));
  }, [initialSearch]);

  const updateSearch = (event) => {
    const searchText = event.target.value.substr(0, 30).toLowerCase();
    setSearch(searchText);
    handleSearch(searchText);
  };

  const deleteSearch = () => {
    setSearch("");
    handleSearch("");
  };

  return (
    <div id="searchContainer" className="search-container">
      <div id="searchIcon" className="fa fa-search search-icon">
        <img
          src={SearchIcon}
          alt="Search Icon"
          width="24"
          height="24"
          className="search-icon"
        />
      </div>

      <form>
        <input
          id="searchInput"
          className="search-input"
          onChange={updateSearch}
          placeholder="Search"
          value={search}
        />
      </form>

      <i
        className={
          search
            ? "fas fa-times delete-icon show"
            : "fas fa-times delete-icon hide"
        }
        onClick={deleteSearch}
      />
    </div>
  );
};
Search.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.string,
};
