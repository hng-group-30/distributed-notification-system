import dns from 'dns/promises';

export async function resolveHost(rawUrl: string): Promise<string> {
  try {
    const url = new URL(rawUrl);
    const { address } = await dns.lookup(url.hostname);
    url.hostname = address;
    return url.toString();
  } catch {
    return rawUrl;
  }
}
