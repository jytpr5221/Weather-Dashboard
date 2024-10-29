import React, { useState,useEffect } from "react";
import "./favcity.css";
import showWeather from "../../asyncFunctionHandlers/getWeather";

function Favcity({ fav, removeFavCity }) {
  console.log(fav);
  let [data,setData]=useState({})
  
  

  useEffect(() => {
    console.log('inside useeffect')
    const getCityData = async () => {
      try {
        console.log("Fetching weather data for favorite city");
        const data = await showWeather(fav.city.toLowerCase());
        const weatherData=data.data
        setData(weatherData);
        console.log(weatherData,data)
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };

    getCityData();
    
    
  }, [fav.city]);
   
 
 
  return (
    <div className="favcity">
    <div className="left">
      <h2>{!data.city ? 'Loading...' : data.city.name}</h2>
    </div>
    
      {!data.city ? <div className="right">'Loading Weather Information...</div> :
     <div className="right"> 
      <div className="always">
       
      <h2 style={{ margin: "2px" }}>{(data.list[0].main.temp - 273.15).toFixed(1)}°C</h2>
      <h4 style={{ fontWeight: "500", margin: "5px" }}>{data.list[0].weather[0].description}</h4>
    </div>
    <div className="often">
      <button
        className="delete"
        onClick={() => removeFavCity(data.city.id)}
      >
        Remove
      </button>
    </div>
    </div>
      }
    </div>
  
  );
  
}

export default Favcity
