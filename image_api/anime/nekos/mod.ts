import axios from 'axios';
import type { ImageData, Query } from './types';

const API_BASE = 'https://api.nekosapi.com/v4/';

export async function getNekosRandomImage(
  query: Query
): Promise<ImageData | null> {
  const url = new URL('images/random', API_BASE);
  const params = new URLSearchParams({ limit: '1', ...query });
  url.search = params.toString();

  try {
    const response = await axios.get<ImageData[]>(url.toString());

    if (!response.status) {
      console.error(`${url} - ${response.status}`);
      return null;
    }

    return response.data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
