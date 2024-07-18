import { Artist } from "../../../api/discogs";
import "./ResultsDropDown.scss";

interface ResultsDropDownProps {
  results: Artist[];
  searchValue: string;
  onSelect: (result: any) => void;
}

const ResultsDropDown = (props: ResultsDropDownProps) => {
  return (
    <div className="results-dropdown">
      {props.results.map((artist) => (
        <button
          key={artist.id}
          className="result"
          onClick={() => props.onSelect(artist.id)}
        >
          <p className="result-name">{artist.title}</p>
        </button>
      ))}
    </div>
  );
};
export default ResultsDropDown;
