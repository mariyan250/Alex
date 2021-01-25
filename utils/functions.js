export const checkWord = (dictionary, word) => {
  let result;

  dictionary.map((x) => {
    if (word.includes(x)) {
      result = true;
    }
  });

  return result;
};
