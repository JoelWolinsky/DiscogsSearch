import { Artist } from "../../../api/discogs";
import "./ResultsDropDown.scss";

interface ResultsDropDownProps {
  results: Artist[];
  searchValue: string;
  onSelect: (id: number, coverImage: string) => void;
}

const ResultsDropDown = (props: ResultsDropDownProps) => {
  return (
    props.results.length > 0 && (
      <div className="results-dropdown">
        {props.results.map((artist) => (
          <button
            key={artist.id}
            className="result"
            onClick={() => props.onSelect(artist.id, artist.cover_image)}
          >
            <p className="result-name">{artist.title}</p>
          </button>
        ))}
      </div>
    )
  );
};
export default ResultsDropDown;
