import type { ImageData, Query } from './types';

const API_BASE = 'https://api.nekosapi.com/v4/';

export async function getRandomImage(query?: Query): Promise<ImageData | null> {
  if (query === undefined) {
    query = { rating: 'safe', limit: '1' };
  }

  const url = new URL('images/random', API_BASE);
  const params = new URLSearchParams({ ...query });
  url.search = params.toString();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`${url} - ${response.status}`);
      return null;
    }

    const data = (await response.json()) as ImageData[];
    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
