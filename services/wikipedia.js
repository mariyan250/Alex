import fetch from 'node-fetch';
import fetch from 'node-fetch';

export const getWikipedia = async (query) => {
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
