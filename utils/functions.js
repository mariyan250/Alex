export const checkWord = (dictionary, sentence) => {
  return dictionary.some((word) => sentence.includes(word));
};
