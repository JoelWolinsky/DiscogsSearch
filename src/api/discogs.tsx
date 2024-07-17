const API_KEY = import.meta.env.VITE_DISCOGS_KEY;
const API_SECRET = import.meta.env.VITE_DISCOGS_SECRET;

export interface Artist {
  id: number;
  title: string;
  thumb: string;
  cover_image: string;
  uri: string;
}

export const searchArtists = async (
  searchString: string
): Promise<Artist[]> => {
  console.log("api key: ", API_KEY);
  const response = await fetch(
    `https://api.discogs.com/database/search?key=${API_KEY}&secret=${API_SECRET}&q=${searchString}&type=artist&page=1&per_page=10`
  );
  const data = await response.json();
  return data.results;
};
