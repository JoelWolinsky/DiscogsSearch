import { useQuery } from "react-query";
import {
  Release,
  ReleasesResponse,
  getArtistReleases,
} from "../../api/discogs";
import "./ArtistReleases.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ArtistReleasesProps {
  artistId: number;
}

const ArtistReleases = (props: ArtistReleasesProps) => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const navigateToReleases = (releaseId: number) => {
    navigate(`/release/${releaseId}`, { state: { id: releaseId } });
  };

  const { data: releasesResponse, isFetching } = useQuery<
    ReleasesResponse,
    Error
  >(
    ["selectedArtistReleases", props.artistId, page],
    () => getArtistReleases(props.artistId, page),
    {
      enabled: !!props.artistId,
    }
  );

  const nextPage = () => {
    if (releasesResponse) {
      if (page < releasesResponse?.pagination.pages) {
        setPage((prevPage) => prevPage + 1);
      } else {
        setPage(1);
      }
    }
  };

  const previousPage = () => {
    if (releasesResponse) {
      if (page === 1) {
        setPage(releasesResponse?.pagination.pages);
      } else {
        setPage((prevPage) => prevPage - 1);
      }
    }
  };

  return (
    <div className="artist-releases">
      <p className="h2">Releases</p>
      <div className="release-table">
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          releasesResponse?.releases &&
          releasesResponse.releases.map((release: Release) => (
            <button
              className="row"
              onClick={() => navigateToReleases(release.main_release)}
              key={release.id}
            >
              <p>{release.title}</p>
            </button>
          ))
        )}
        <div className="pagination">
          <button className="back-button" onClick={() => previousPage()}>
            Back
          </button>
          <button className="forward-button" onClick={() => nextPage()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArtistReleases;
