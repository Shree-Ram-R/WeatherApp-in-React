import { useState,useRef, useEffect } from "react";
import "./App.css";
import Weather from "./Weather"
import { FaSearch } from "react-icons/fa";

import humidity from './assets/humidity.png'

import windy from './assets/windy.png'


function App() {
    const API_KEY="3872eff02b36119e083b5797fad43162"; 
    const [search,setSearch]=useState("");
    const [icon,setIcon]=useState("https://openweathermap.org/img/wn/10d@2x.png")
    const [temp,setTemp]=useState(40)
    const [city,setCity]=useState("Chennai")
    const [country,setCountry]=useState("IN")
    const [lat,setLat]=useState(0);
    const [long,setLong]=useState(0);
    const [humid,setHumid]=useState(0);
    const [wind,setWind]=useState(0);
    const [error,setError]=useState("");
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef();
    useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const url=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
                const data=await url.json();
                console.log(data.name);
                setLat(data.coord.lat)
                setLong(data.coord.lon)
                setCity((data.name).toUpperCase())
                setCountry(data.sys.country)
                setTemp(((data.main.temp)-273.15).toFixed(2))
                setHumid(data.main.humidity)
                setWind(data.wind.speed)
                setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                setError(null)
            }catch(error){
                setError("Location Not Found,U have entered an invalid City name")
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchdata();
       
    })

    return (
      <>
        <div className="container">
            <div className="input-container">
                <input 
                type="text"
                className="cityInput" 
                placeholder="Search City"
                ref={inputRef}
                valur={search} 
                onChange={(e)=>{setSearch(e.target.value)
                    e.preventDefault();
                }}
                
                />
                <div className="search-icon">
                <FaSearch
                role="button"
                tabIndex="0"
                onClick={() => {setCity(() => {
                    if(search.trim() === "") alert("Please Enter the City Name")
                    return search.trim() !== "" ? search.toUpperCase() : "CHENNAI"; 
                  });
                    inputRef.current.focus();
                    fetchdata();
                }}/>
                </div>
            </div>
            <div>
                {isLoading && <p className="load">Loading Please Wait...</p>}
            {!{city}==" "&&error && <p className="error">{`Error:${error}`}</p>}
            {!error && !isLoading && (<Weather 
            icon={icon} 
            temp={temp} 
            city={city}
            country={country}
            lat={lat}
            long={long}
            
            />)}
            
            {!error && !isLoading && (<div className="measure">
                <div className="humid">
                    <img src={humidity} alt="Humidity" />
                    <span>{humid}%</span>
                    <span>Humidity</span>
                </div>
                <div className="humid">
                    <img src={windy} alt="Humidity" />
                    <span>{wind}km/hr</span>
                    <span>Wind Speed</span>
                </div>
            </div>)}
            </div>
            <footer>
                <p>Designed by Shree Ram R</p>
                
            </footer>
        </div>
      </>
    )
  }
  
  export default App