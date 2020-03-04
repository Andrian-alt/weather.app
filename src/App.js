import React, {useState} from 'react'
const api = {
  key: "f2b49fd84d28ec17682655d8ed898da6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDate()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].main === 'Rain') ? 'App rainy'
    :(weather.weather[0].main === 'Clear' || weather.main.temp > 16  ) ? 'App warm'
    :(weather.main.temp <= 0 || weather.weather[0].main === 'snow'   ) ? 'App cold'
    :(weather.weather[0].main === 'Clouds') ? 'App cloudly'
    : 'App')
     : 'App'}>
      <main className="main">
        <div className="search-box">
          <input onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} type="text" className="search-bar" placeholder="Search..."/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        </div>
        ) : (
          <h1>Please Enter your country</h1>
        )}



      </main>
    </div>
  );
}

export default App;
