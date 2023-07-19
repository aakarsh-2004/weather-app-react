import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState("");
  const [testTime, setTestTime] = useState("");
  let greeting = '';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWeather("Loading...");
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e05b9b24caac5f3919a62a40c675fcf9&units=metric`)
    const data = response.data;
    setWeather(data);
    setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    console.log(data);
  }
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
    setDate(new Date().toLocaleDateString());
    setTestTime(new Date().getHours());
  }, 1000);
  if (testTime > 4 && testTime < 12) {
    greeting = "Good Morning!"
  } else if (testTime >= 12 && testTime < 16) {
    greeting = "Good Afternoon!"
  } else if (testTime >= 16 && testTime <= 3) {
    greeting = "Good Evening!"
  }
  return (
    <div className="main">
      <h1>{greeting}</h1>
      <div className='App'>
        <div className="first-content">
          <h3 className='time'>{time}</h3>
          <h3 className='date'>{date}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Search City' value={city} onChange={(e) => setCity(e.target.value)}/>
            <button type='submit'>Search</button>
          </form>
          {(typeof weather === 'object') ? 
          <div className="last-cont">
            <h3 className='city'>{weather.name}</h3>
            <div className="info">
              <img src={icon} alt="" />
              <h3 className='weather'>{weather.weather[0].main}</h3>
            </div>
          </div>
          : weather}
        </div>
        { (typeof weather === 'object') ? 
        <div className="cont">
          <div className="temp">
            <h3 className='first-head'>Temperature</h3>
            <h3>{Math.round(weather.main.temp)}&deg;C</h3>
          </div>
          <div className="wind">
            <h3 className='first-head'>Wind</h3>
            <h3>{weather.wind.speed} km/h</h3>
          </div>
          <div className="visibility">
            <h3 className='first-head'>Visibility</h3>
            <h3>{weather.visibility/1000} km</h3>
          </div>
          <div className="pressure">
            <h3 className='first-head'>Pressure</h3>
            <h3>{weather.main.pressure} h/pa</h3>
          </div>
        </div>
        : weather}
      </div>
    </div>
  );
};

export default App;
