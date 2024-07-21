import ArtistInfo from "../../components/ArtistInfo/ArtistInfo";
import ArtistReleases from "../../components/ArtistRelease/ArtistReleases";
import "./ArtistPage.scss";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ArtistDetails, getArtist } from "../../api/discogs";

const ArtistPage = () => {
  let location = useLocation();

  const { data: artist } = useQuery<ArtistDetails, Error>(
    ["releaseTrack", location.state.id],
    () => getArtist(location.state.id),
    {
      enabled: !!location.state.id,
    }
  );
  return (
    <div className="">
      {artist && (
        <ArtistInfo
          title={artist.name}
          coverImage={location.state.coverImage}
        ></ArtistInfo>
      )}
      {artist && <ArtistReleases artistId={artist.id}></ArtistReleases>}
    </div>
  );
};
export default ArtistPage;
