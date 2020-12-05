export const getWeather = async (city) => {
  const url = `api.openweathermap.org/data/2.5/weather?q=${process.env.CURRENT_CITY}&appid=${process.env.WEATHER_API_KEY}&lang=bg&units=metrics`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = Math.floor(data.main.temp);
    const feels_like = Math.floor(data.main.feels_like);
    const weather = data.weather[0].main;

    return { temp, feels_like, weather };
  } catch (error) {
    return { error: true };
  }
};
