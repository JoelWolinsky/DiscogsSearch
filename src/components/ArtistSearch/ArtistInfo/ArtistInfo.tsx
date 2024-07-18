import { ArtistDetails } from "../../../api/discogs";

interface ArtistInfoProps {
  artist: ArtistDetails;
}
const ArtistInfo = (props: ArtistInfoProps) => {
  return (
    <div>
      <p>{props.artist.name}</p>
      <p>{props.artist.profile}</p>
    </div>
  );
};
export default ArtistInfo;
