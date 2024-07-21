// ? ideally we would have a backend to store the API key and secret
const API_KEY = import.meta.env.VITE_DISCOGS_KEY;
const API_SECRET = import.meta.env.VITE_DISCOGS_SECRET;

export type Artist = {
  id: number;
  title: string;
  thumb: string;
  cover_image: string;
  uri: string;
};

export type ArtistDetails = {
  id: number;
  name: string;
  profile: string;
};

export type ReleasesResponse = {
  pagination: pagination;
  releases: Release[];
};
export type Release = {
  id: number;
  main_release: number;
  title: string;
  year: number;
  format: string;
};

export type pagination = {
  items: number;
  pages: number;
  page: number;
  per_page: number;
};

export type ReleaseDetails = {
  id: number;
  status: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: Artist[];
  artists_sort: string;
  title: string;
  country: string;
  tracklist: Track[];
  extraartists: Artist[];
  images: ReleaseImage[];
  thumb: string;
  community: Community;
};

export type Track = {
  position: string;
  type_: string;
  title: string;
  duration: string;
};

type ReleaseImage = {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
};

type Community = {
  have: number;
  want: number;
  rating: {
    count: number;
    average: number;
  };
  submitter: {
    username: string;
    resource_url: string;
  };
  contributors: {
    username: string;
    resource_url: string;
  }[];
  data_quality: string;
  status: string;
};

export const searchArtists = async (
  searchString: string
): Promise<Artist[]> => {
  const response = await fetch(
    `https://api.discogs.com/database/search?key=${API_KEY}&secret=${API_SECRET}&q=${searchString}&type=artist&page=1&per_page=15`
  );
  const data = await response.json();
  return data.results;
};

export const getArtist = async (artistId: string): Promise<ArtistDetails> => {
  const response = await fetch(`https://api.discogs.com/artists/${artistId}`);
  const data = await response.json();
  return data;
};

export const getArtistReleases = async (
  artistId: number,
  page: number
): Promise<ReleasesResponse> => {
  const response = await fetch(
    `https://api.discogs.com/artists/${artistId}/releases?page=${page}&per_page=5`
  );
  const data = await response.json();
  return data;
};

export const getReleaseTracks = async (
  releaseId: number
): Promise<ReleaseDetails> => {
  const response = await fetch(`https://api.discogs.com/releases/${releaseId}`);
  const data = await response.json();
  return data;
};
