import { Artist } from "../../../api/discogs";

interface ResultsDropDownProps {
  results: Artist[];
  searchValue: string;
  onSelect: (result: any) => void;
}

const ResultsDropDown = (props: ResultsDropDownProps) => {
  return (
    <div className="results-dropdown">
      {props.results.map((result) => (
        <div
          key={result.id}
          className="result"
          onClick={() => props.onSelect(result)}
        >
          {result.title}
        </div>
      ))}
    </div>
  );
};
export default ResultsDropDown;
