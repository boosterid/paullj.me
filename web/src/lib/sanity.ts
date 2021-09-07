import createClient from 'picosanity';
import { dev } from '$app/env';

const token = (dev ? import.meta.env?.VITE_SANITY_TOKEN as string : undefined);

const sanity =  createClient({
  projectId: 'ofdwptou',
  dataset: dev ? 'development' : 'production',
  withCredentials: true,
  token
});

export { sanity };
