import axios from 'axios';
import { useState } from 'react';
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const API_KEY = "968008af43c256a32e28fa8ce9d95a08";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const [result, setResult] = useState({})
  
  
   const searchWeather = async (e) => {
     if (e.key === "Enter") {
       try {
         const data = await axios({
           method: "get",
           url: url,
         });
         console.log(data);
         setResult(data);
         
       } catch (err) {
         console.log(err);
       }
     }
   };

  return (
    <div className="App">
      <div className="contents">
        <input
          placeholder="city name"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchWeather}
        />
        {(Object.keys(result).length === 0 )|| (
          <div className="loadWeather">
            <div className="city">{result.data.name}</div>
            <img
              src={`http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <div className="temp">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
