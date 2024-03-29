const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { city, latitude, longitude, units } = JSON.parse(event.body);
  const apiKey = process.env.OPENWEATHER_API_KEY; // Access API key from environment variable
  const apiUrl = latitude && longitude
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching weather data' }),
    };
  }
};
