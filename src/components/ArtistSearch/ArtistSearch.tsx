import { useMemo, useState } from "react";
import ResultsDropDown from "./ResultsDropDown/ResultsDropDown";
import { useQuery } from "react-query";
import { Artist, searchArtists } from "../../api/discogs";
import { debounce } from "lodash";
import SearchBar from "./SearchBar/SearchBar";
import "./ArtistSearch.scss";

const ArtistSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery<Artist[], Error>(
    ["search", searchValue],
    () => searchArtists(searchValue),
    {
      enabled: searchValue.length > 0,
    }
  );

  const debouncedHandleSearch = useMemo(
    () =>
      debounce((searchString: string) => {
        setSearchValue(searchString);
      }, 300),
    []
  );

  return (
    <div className="artist-search">
      <SearchBar handleSearch={debouncedHandleSearch} />
      <ResultsDropDown
        results={results || []}
        searchValue="searchValue"
        onSelect={(result) => console.log(result)} // todo replace
      />
    </div>
  );
};
export default ArtistSearch;
