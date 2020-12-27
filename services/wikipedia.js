import fetch from 'node-fetch';

export const getWikipedia = async (query) => {
  const url = `https://bg.wikipedia.org/w/api.php?action=opensearch&explaintext&search=${query}&format=json`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
