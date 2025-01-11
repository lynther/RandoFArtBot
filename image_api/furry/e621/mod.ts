import axios, { isAxiosError, type AxiosProxyConfig } from 'axios';
import type { Data, Post } from './types';

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0';

export async function getE621RandomImage(tags: string, httpProxy?: string): Promise<Post | null> {
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
