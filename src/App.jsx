// App.jsx
import { useState } from 'react';

const API_KEY = 'ea9297f0c25f95d257709b245113e5a7';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found or network error.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8">
          <input
            type="text"
            className="border p-3 rounded-md w-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter city name"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-purple-600 transition duration-300 w-full">Get Weather</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <div className="text-gray-800 bg-gray-100 rounded-md p-6">
            <p className="text-2xl mb-4">Current Weather in {city}:</p>
            <div className="flex items-center mb-2">
              <img src="/humidity.svg" alt="Humidity Icon" className="w-12 h-12 mr-2" />
              <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
            </div>
            <div className="flex items-center">
              <img src="/wind.svg" alt="Wind Icon" className="w-12 h-12 mr-2" />
              <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
            <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
