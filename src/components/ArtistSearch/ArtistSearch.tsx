import { useMemo, useState } from "react";
import ResultsDropDown from "./ResultsDropDown/ResultsDropDown";
import { useQuery } from "react-query";
import {
  Artist,
  ArtistDetails,
  Release,
  getArtist,
  getArtistReleases,
  searchArtists,
} from "../../api/discogs";
import { debounce } from "lodash";
import SearchBar from "./SearchBar/SearchBar";
import "./ArtistSearch.scss";
import ArtistInfo from "./ArtistInfo/ArtistInfo";
import ArtistReleases from "../ArtistRelease/ArtistReleases";

const ArtistSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>();
  const [showSearchDropDown, setShowSearchDropDown] = useState<boolean>(false);

  const { data: results } = useQuery<Artist[], Error>(
    ["search", searchValue],
    () => searchArtists(searchValue),
    {
      enabled: searchValue.length > 0,
    }
  );

  const { data: selectedArtist } = useQuery<ArtistDetails, Error>(
    ["selectedArtist", selectedArtistId],
    () => getArtist(selectedArtistId ?? ""),
    {
      enabled: !!selectedArtistId,
    }
  );

  const { data: selectedArtistReleases } = useQuery<Release[], Error>(
    ["selectedArtistReleases", selectedArtistId],
    () => getArtistReleases(selectedArtistId ?? ""),
    {
      enabled: !!selectedArtistId,
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
  // console.log(selectedArtistReleases);

  const handleSelectArtist = (artistId: string) => {
    setSelectedArtistId(artistId);
    setShowSearchDropDown(false);
  };

  return (
    <div className="artist-search">
      <div className="search">
        <SearchBar handleSearch={debouncedHandleSearch} />
        {showSearchDropDown && (
          <ResultsDropDown
            results={results || []}
            searchValue="searchValue"
            onSelect={(artistId) => handleSelectArtist(artistId)}
          />
        )}
      </div>
      {showSearchDropDown && (
        <button
          className="click-away-listener"
          onClick={() => setShowSearchDropDown(false)}
        ></button>
      )}
      {selectedArtist && <ArtistInfo artist={selectedArtist}></ArtistInfo>}
      {selectedArtistReleases && (
        <ArtistReleases releases={selectedArtistReleases}></ArtistReleases>
      )}
    </div>
  );
};
export default ArtistSearch;
