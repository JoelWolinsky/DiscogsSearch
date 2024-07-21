import { useQuery } from "react-query";
import ResultsDropDown from "./ResultsDropDown/ResultsDropDown";
import SearchBar from "./SearchBar/SearchBar";
import { Artist, searchArtists } from "../../api/discogs";
import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import "./ArtistSearch.scss";

const ArtistSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchDropDown, setShowSearchDropDown] = useState<boolean>(false);

  const navigateToArtist = (artistId: number, coverImage: string) => {
    navigate(`/artist/${artistId}`, {
      state: { id: artistId, coverImage: coverImage },
    });
  };

  const { data: results } = useQuery<Artist[], Error>(
    ["search", searchValue],
    () => searchArtists(searchValue),
    {
      enabled: searchValue.length > 0,
    }
  );

  const debouncedHandleSearch = useMemo(
    () =>
      debounce((searchString: string) => {
        setShowSearchDropDown(true);
        setSearchValue(searchString);
      }, 300),
    []
  );

  return (
    <div className="artist-search">
      <div className="search">
        <SearchBar handleSearch={debouncedHandleSearch} />
        {showSearchDropDown && (
          <ResultsDropDown
            results={results || []}
            searchValue="searchValue"
            onSelect={(artistId, coverImage) => {
              navigateToArtist(artistId, coverImage);
              setShowSearchDropDown(false);
            }}
          />
        )}
      </div>
      {showSearchDropDown && (
        <button
          className="click-away-listener"
          onClick={() => setShowSearchDropDown(false)}
        ></button>
      )}
    </div>
  );
};
export default ArtistSearch;
