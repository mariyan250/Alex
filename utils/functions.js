export const checkWord = (dictionary, sentence) => {
  return dictionary.some((word) =>
    sentence.toLowerCase().includes(word.toLowerCase())
  );
};

export const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
