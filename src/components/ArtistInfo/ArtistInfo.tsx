import "./ArtistInfo.scss";

interface ArtistInfoProps {
  title: string;
  coverImage: string;
}

const ArtistInfo = (props: ArtistInfoProps) => {
  return (
    <div className="artist-info">
      <img
        className="cover-image"
        src={props.coverImage}
        alt="Artist profile picture"
      ></img>
      <p className="h1">{props.title}</p>
    </div>
  );
};
export default ArtistInfo;
