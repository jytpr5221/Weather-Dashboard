 import "./item.css";

function Item({setFavCities,data}) {
 
  const city = data.city.name;
  const sunrise = data.city.sunrise;
  const sunset = data.city.sunset;
  const temp = (data.list[0].main.temp-273.15).toFixed(1);
  const date = data.list[0].dt;
  const desc = data.list[0].weather[0].main;
  const minTemp = (data.list[0].main.temp_min-273.15).toFixed(1);
  const maxTemp = (data.list[0].main.temp_max-273.15).toFixed(1);
  const humidity = data.list[0].main.humidity;
  const feels = (data.list[0].main.feels_like-273.15).toFixed(1);
  const id=data.city.id 
   
  function getImage(icon){
    console.log(icon)
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
     
  }
 
  const getDateAndTime = (date) => {
    let day = new Date(date*1000);
    return day.toLocaleString("en-US", { 
         
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true  
    });
  };

  const getTime = (date) => {
     let day = new Date(date*1000);
    return day.toLocaleString("en-US", { 
         
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true  
    });
  };

  const getDate = (date) => {
    let day = new Date(date*1000);
    const formattedDate = day.toLocaleDateString([], {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    }).replace(/, /g, ' ');
    return formattedDate;
  };
  console.log('data list',data.list)
  return (
     
      <div className="container2">
        <div className="top">
          <div className="left" style={{ color: 'rgb(246, 247, 221)' }}>
            <div className="up" style={{ width: '70%' }}>
              <h1>{city}</h1>
               
            </div>
            <div className="down">
              <div className="updated">Updated By :</div>
              <div className="date">
                {getDateAndTime(date)}
              </div>
            </div>
          </div>
          <div className="right">
            <img src={getImage(data.list[0].weather[0].icon)} alt="failed to load icon"></img>
            <h1 style={{marginBlockEnd:"4px",marginBlockStart:"4px"}}>{temp}°C</h1>
            <h3 style={{marginBlockEnd:"4px",marginBlockStart:"4px"}}>{desc}</h3>
          </div>
        </div>
        <div className="mid forecast">
          Today's Forecast
          <div className="first">
            <div className="content">
              <h1 style={{marginBlockEnd:"4px",marginBlockStart:"35px"}}>{maxTemp}°C</h1>
              <div>Max Temperature</div>
            </div>
            <div className="content">
              <h1 style={{marginBlockEnd:"4px",marginBlockStart:"35px"}}>{minTemp}°C</h1>
              <div>Min Temperature</div>
            </div>
            <div className="content">
              <h1 style={{marginBlockEnd:"4px",marginBlockStart:"35px"}}>{getTime(sunrise)}</h1>
              <div>Sunrise</div>
            </div>
          </div>
          <div className="second">
            <div className="content">
              <h1 style={{marginBlockEnd:"4px",marginBlockStart:"35px"}}>{getTime(sunset)}</h1>
              <div>Sunset</div>
            </div>
            <div className="content">
              <h1 style={{marginBlockEnd:"4px",marginBlockStart:"35px"}}>{feels}°C</h1>
              <div>Feels Like</div>
            </div>
            <div className="content">
              <h1 style={{marginBlockEnd:"4px",marginBlockStart:"35px"}}>{humidity}%</h1>
              <div> Humidity</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          {data.list.map((element, idx) => {
            if (idx === 0) return null;
            
            if((idx+1)%8 === 0) return (
              <div className="content1" key={idx}>
                 <img src={getImage(element.weather[0].icon)} alt="failed to load icon" className="image"></img>
                <h1 className="temp" >{(element.main.temp - 273.15).toFixed(0)}°C</h1>
                <div className="descript">{element.weather[0].description}</div>
                <h5 className="date" style={{color:'aliceblue' } }>{getDate(element.dt)}</h5>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="fav"
            onClick={()=>setFavCities(id,city )}
          >Add To Favorite</button>
        </div>
      </div>
     
  );
}

export default Item;
