import { useState } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  handleSearch: (searchString: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    props.handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleChange}
      placeholder="Search for an artist"
      className="search-input"
    />
  );
};
export default SearchBar;
