import fetch from 'node-fetch';

export const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&lang=bg&units=metric`;

  console.log(url);

  let temp, feels_like, weather;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // temp = Math.floor(data.main.temp);
      // feels_like = Math.floor(data.main.feels_like);
      // weather = data.weather[0].main;

      temp = 20;
      feels_like = 10;
      weather = 'Fog';

      return { temp, feels_like, weather };
    })
    .catch((error) => console.log(error));
};
