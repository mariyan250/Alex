export const checkWord = (dictionary, word) => {
  return dictionary.some((sentence) => word.includes(sentence));
};
