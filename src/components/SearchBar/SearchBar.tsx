import { useState } from "react";
import ResultsDropDown from "./ResultsDropDown";
import { useQuery } from "react-query";
import { Artist, searchArtists } from "../../api/discogs";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery<Artist[], Error>(
    ["search", searchValue],
    () => searchArtists(searchValue),
    {
      enabled: searchValue.length > 0, // Only run the query when the searchValue is not empty
    }
  );

  console.log(results);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(value) => setSearchValue(value.target.value)}
        value={searchValue}
      />
      <ResultsDropDown
        results={results || []}
        searchValue="searchValue" // todo replace
        onSelect={(result) => console.log(result)}
      />
    </div>
  );
};
export default SearchBar;
