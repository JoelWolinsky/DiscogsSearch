import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ReleaseDetails, Track, getReleaseTracks } from "../../api/discogs";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./ReleasePage.scss";

const ReleasePage = () => {
  const navigate = useNavigate();
  let { releaseId } = useParams();

  const { data: release, isFetching } = useQuery<ReleaseDetails, Error>(
    ["releaseTrack", releaseId],
    () => getReleaseTracks(Number(releaseId)),
    {
      enabled: !!releaseId,
    }
  );

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="release-page">
      <button onClick={() => goBack()}>back</button>
      {isFetching || !release ? (
        <LoadingSpinner />
      ) : (
        <>
          <p className="h1">{release.title}</p>
          <p className="h2">{release.artists_sort}</p>
          <p className="h3">{release.community.have} owned</p>

          <div className="track-list">
            {release.tracklist.map((track: Track) => (
              <div className="track">
                <p>{track.position}</p>

                <p>{track.title}</p>
                <p className="duration">{track.duration}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default ReleasePage;
