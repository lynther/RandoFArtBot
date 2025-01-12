import axios, { isAxiosError, type AxiosProxyConfig } from 'axios';
import type { Data, Post } from './types';

const userAgent = 'Harmless script v0.1 (Login: pheignind)';

export async function getE621RandomImage(
  tags: string,
  httpProxy?: string
): Promise<Post | null> {
  let proxy: AxiosProxyConfig | false = false;

  if (httpProxy !== undefined) {
    const proxyUrl = new URL(httpProxy);

    proxy = {
      protocol: proxyUrl.protocol,
      host: proxyUrl.hostname,
      port: parseInt(proxyUrl.port, 10),
    };
  }

  const url = `https://e621.net/posts.json?limit=1&tags=order:random ${tags}`;

  try {
    const {
      data: { posts },
    } = await axios.get<Data>(url, {
      timeout: 1000,
      headers: { 'User-Agent': userAgent },
      proxy,
    });
    return posts[0];
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(`${url} - ${error.message}`);
    }
    return null;
  }
}
