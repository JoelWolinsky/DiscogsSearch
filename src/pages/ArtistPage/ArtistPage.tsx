import ArtistInfo from "../../components/ArtistInfo/ArtistInfo";
import ArtistReleases from "../../components/ArtistReleases/ArtistReleases";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ArtistDetails, getArtist } from "../../api/discogs";

const ArtistPage = () => {
  let { artistId } = useParams();
  let { state } = useLocation();

  const { data: artist } = useQuery<ArtistDetails, Error>(
    ["releaseTrack", artistId],
    () => getArtist(artistId ?? ""),
    {
      enabled: !!artistId,
    }
  );
  return (
    <div>
      {artist && (
        <ArtistInfo
          title={artist.name}
          coverImage={state && state.coverImage}
        ></ArtistInfo>
      )}
      {artist && <ArtistReleases artistId={artist.id}></ArtistReleases>}
    </div>
  );
};
export default ArtistPage;
