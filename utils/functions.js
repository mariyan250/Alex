import { dictionary } from '../dictionary.js';

export const checkDictionary = (dictionary, text) => {
  return dictionary.find((word) => text.toLowerCase().includes(word));
};

export const getRandom = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

export const parseWeather = ({ temp, feels_like, weather }) => {
  let icon;

  switch (weather) {
    case 'Fog':
    case 'Mist':
      icon = dictionary.emoticons.weather.fog;
      break;

    case 'Rain':
      icon = dictionary.emoticons.weather.rain;
      break;

    case 'Snow':
      icon = dictionary.emoticons.weather.snow;
      break;

    case 'Clear':
      icon = dictionary.emoticons.weather.sunny;
      break;

    case 'Clouds':
      icon = dictionary.emoticons.weather.fog;
      break;
  }

  return `The weather is ${weather.toLowerCase()} ${icon}\nTemperature is ${temp} degrees and feels like ${feels_like}🌡.`;
};
