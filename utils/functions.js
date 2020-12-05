export const checkDictionary = (dictionary, text) => {
  return dictionary.find((word) => text.toLowerCase().includes(word));
};

export const getRandom = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};
