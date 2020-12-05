import fetch from 'node-fetch';

export const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&lang=bg&units=metric`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const temp = Math.floor(data.main.temp);
      const feels_like = Math.floor(data.main.feels_like);
      const weather = data.weather[0].main;

      console.log(temp, feels_like, weather);
      return { temp, feels_like, weather };
    })
    .catch((error) => console.log(error));
};
