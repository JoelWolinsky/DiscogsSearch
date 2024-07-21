import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ReleaseDetails, Track, getReleaseTracks } from "../../api/discogs";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Release = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const { data: releaseTracks, isFetching } = useQuery<ReleaseDetails, Error>(
    ["releaseTrack", location.state.id],
    () => getReleaseTracks(location.state.id),
    {
      enabled: !!location.state.id,
    }
  );

  const goBack = () => {
    navigate(-1);
  };
  console.log("location", location);
  return (
    <div>
      <button onClick={() => goBack()}>back</button>
      <p>Release</p>
      <p>{location.state.id}</p>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        releaseTracks?.tracklist &&
        releaseTracks.tracklist.map((track: Track) => (
          <button
            className="row"
            // onClick={() => navigateToReleases(release.id)}
          >
            <p>{track.title}</p>
          </button>
        ))
      )}
    </div>
  );
};
export default Release;
