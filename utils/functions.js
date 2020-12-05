import dictionary from '../dictionary.js';

export const checkDictionary = (dictionary, text) => {
  return dictionary.find((word) => text.toLowerCase().includes(word));
};

export const getRandom = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

export const parseWeather = ({ temp, feels_like, weather }) => {
  let weatherState;
  let icon;

  switch (weather) {
    case 'Fog':
      weatherState = 'mъгливо';
      icon = dictionary.emoticons.weather.fog;
      break;

    case 'Rain':
      weatherState = 'мокро и валежно';
      icon = dictionary.emoticons.weather.rain;
      break;

    case 'Snow':
      weatherState = 'снежно';
      icon = dictionary.emoticons.weather.snow;
      break;

    case 'Clear':
      weatherState = 'слънчево';
      icon = dictionary.emoticons.weather.sunny;
      break;
  }

  return `Времето на вън е ${weatherState} ${icon}, tемпературата е ${temp} градуса и се усеща като ${feels_like}`;
};
