
const Weather = ({icon,temp,city,country,lat,long}) => {
  return (
    <div className="con">
    <div className="image">
       <img src={icon} alt="sun Thunder" className="img" />
    </div>
    <div className="temp">
       {temp}°C
    </div>
    <div className="location">
       {(city)}
    </div>
    <div className="country">
       {country}
       </div>
    <div className="cord">
        <div>
        <span className="lat">Latitude</span>
        <span>{lat}</span>
        </div>
       <div><span className="lat">Longitude</span>
       <span>{long}</span></div>
        
    </div>
    
    </div>
    
  )
}

export default Weather
