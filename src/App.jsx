import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5570330c315553043b910656389a9afe`

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className='container mx-auto md:max-w-6xl px-4'>
      <div className='flex justify-center my-10'>
      <input
        type="text"
        placeholder='Enter Location'
        className='px-4 py-2 rounded-full border-2 border-blue-950 hover:border-blue-900 hover:outline-none text-white text-center'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown ={searchLocation}
      />
      </div>
      <div className='flex flex-row items-center gap-4 justify-evenly mt-32'>
        <div className='flex flex-col'>
          <h1 className='font-serif text-lg text-white text-left'>{data.name}</h1>
          {data.main ? <p className='font-bold text-5xl text-white text-left'>{data.main.temp.toFixed()}&deg;F</p> : null}
        </div>
        {data.weather ? <p className='font-serif text-lg text-white'>{data.weather[0].main}</p> : null}
      </div>
      <div className='mt-32'>
        {data.name != undefined && <div className='max-w-sm mx-auto px-4 py-2 rounded-md bg-gray-50/50 shadow-md p-4'>
          <div className='flex flex-row items-center justify-between gap-4'>
            <div className='flex flex-col items-center'>
              {data.main ? <p className='font-bold text-gray-800'>{data.main.feels_like.toFixed()}&deg;F</p> : null}
              <p className='text-gray-800 font-serif'>Feels Like</p>
            </div>
            <div className='flex flex-col items-center'>
              {data.main ? <p className='font-bold text-gray-800'>{data.main.humidity}</p> : null}
              <p className='text-gray-800 font-serif'>Humidity</p>
            </div>
            <div className='flex flex-col items-center'>
              {data.wind ? <p className='font-bold text-gray-800'>{data.wind.speed.toFixed()}</p> : null}
              <p className='text-gray-800 font-serif'>Winds</p>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default App