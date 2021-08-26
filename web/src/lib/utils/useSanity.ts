import createClient from 'picosanity';
import { dev } from '$app/env';

export default createClient({
  useCdn: !dev,
  projectId: 'ofdwptou',
  dataset: dev ? 'development' : 'production',
  withCredentials: true,
  token: 'skhkwVwJifXEYLTJPhdQR6ygVdUVC5LM3ECCQNYImFmqDLQxQfkyAkXRqzpNdEAlRSeoe9XZGJOTFgvQj4g6WUZNL0x7Z8y7NTO9MAuXiFxYH4MholkqqGquKYgCf4B8gHaMFR80lvREwTlVScK9iVa3Qu6BFNB9mFFcbVrgLwVrFSD89KhY'
});
