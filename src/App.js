import React, { useState } from 'react';
import './App.css';


const api = {
  key:'b1b15e88fa797225412429c1c50c122a1',  // Replace with your real API key
  base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const SearchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if (result.cod === "404") {
          alert("City not found");
        } else {
          setWeather(result);
        }
      })
      .catch(error => {
        console.error("Error fetching the weather data: ", error);
      });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading">City Weather</h1>
        
        {/* SearchBox */}
        <div>
          <input 
            type="text" 
            placeholder="Enter city" 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>

        <button onClick={SearchPressed}>Search</button>
        
        {/* Conditional Rendering */}
        {weather.main && (
          <div className="weather-card">
            <h2>{weather.name}</h2>  {/* Location */}
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description} 
              width="100" 
            />
            <p className="temp">{weather.main.temp}°C</p>  {/* Temperature */}
            <p className="condition">{weather.weather[0].main}</p>  {/* Weather Condition */}
            <p>{weather.weather[0].description}</p>  {/* Weather Description */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;






