import "./ArtistInfo.scss";

interface ArtistInfoProps {
  title: string;
  coverImage: string | null;
}

const ArtistInfo = (props: ArtistInfoProps) => {
  return (
    <div className="artist-info">
      {props.coverImage && (
        <img
          className="cover-image"
          src={props.coverImage}
          alt="Artist profile picture"
        />
      )}
      <p className="h1">{props.title}</p>
    </div>
  );
};
export default ArtistInfo;
