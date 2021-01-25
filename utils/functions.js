export const checkWord = (dictionary, sentence) => {
  return dictionary.some((word) =>
    sentence.toLowerCase().includes(word.toLowerCase())
  );
};
