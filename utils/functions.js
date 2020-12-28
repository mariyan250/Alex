import { dictionary } from '../dictionary.js';

export const checkDictionary = (dictionary, text) => {
  return dictionary.find((word) => text.toLowerCase().includes(word));
};

export const getRandom = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

export const parseWeather = ({ temp, feels_like, weather }) => {
  let icon;

  return `The weather is ${weather} ${icon}\nThe temperature is ${temp} degrees and feels like ${feels_like}🌡.`;
};
