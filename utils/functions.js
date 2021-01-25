export const checkWord = (dictionary, word) => {
  return dictionary.some((sentence) => word.include(sentence));
};
