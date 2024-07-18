import { Release } from "../../api/discogs";

interface ArtistReleasesProps {
  releases: Release[];
}
const ArtistReleases = (props: ArtistReleasesProps) => {
  return (
    <div>
      <p>Releases</p>
      {props.releases.map((release: Release) => (
        <p>{release.title}</p>
      ))}
    </div>
  );
};
export default ArtistReleases;
