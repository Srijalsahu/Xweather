import React, { useState } from 'react';
import styles from './weather.module.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "a3efb1aa2cca4757927131717240304";

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading && <p className={styles.loading}>Loading data...</p>}
      
      {weatherData && (
        <div className={styles.weatherCards}>
          <div className={styles.weatherCard}>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
          <div className={styles.weatherCard}>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
          <div className={styles.weatherCard}>
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className={styles.weatherCard}>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
