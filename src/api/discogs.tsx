// ? ideally we would have a backend to store the API key and secret
const API_KEY = import.meta.env.VITE_DISCOGS_KEY;
const API_SECRET = import.meta.env.VITE_DISCOGS_SECRET;

export interface Artist {
  id: number;
  title: string;
  thumb: string;
  cover_image: string;
  uri: string;
}

export interface ArtistDetails {
  id: number;
  name: string;
  profile: string;
}

export interface Release {
  id: number;
  title: string;
  year: number;
  // todo stats
}

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
  artistId: string
): Promise<Release[]> => {
  const response = await fetch(
    `https://api.discogs.com/artists/${artistId}/releases?page=1&per_page=5`
  );
  const data = await response.json();
  console.log("releases", data);
  return data.releases;
};
