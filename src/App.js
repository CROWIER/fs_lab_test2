import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=61179ba18df0853b7047ebdc9415344b`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
      <div className="App">
        <div className="search">
          <input
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter Location'
              type="text" />
        </div>
        <div className="container">
          <div className="top">
            <div>
              <p>{data.name}</p>
            </div>
            <div >
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div>
              {data.weather ? <img height="75" width="75" src = {`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} /> : null}
            </div>
          </div>

          {data.name !== undefined &&
              <div className="bottom">
                <div>
                  {data.main ? <p className='info_text'>{data.main.feels_like.toFixed()}°C</p> : null}
                  <p>Feels Like</p>
                </div>
                <div>
                  {data.main ? <p className='info_text'>{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div >
                  {data.wind ? <p className='info_text'>{data.wind.speed.toFixed()} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
                <div>
                  {data.visibility ? <p className='info_text'>{data.visibility}m</p> : null}
                  <p>Visibility</p>
                </div>
              </div>
          }



        </div>
      </div>
  );
}

export default App;