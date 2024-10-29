import React, { useState } from "react";
import "./input.css";
import Item from "../item/item";
import showWeather from "../../asyncFunctionHandlers/getWeather";

function Input({setFavCities}) {
    let [city, setCity] = useState("");
    let [data, setData] = useState({});
    let [cityFound, setCityFound] = useState(true);
    
    async function getWeather(city) {
        try {
            console.log('fetching weather data',city);

            const { cityFound, data } = await showWeather(city);  
            setData(data);
            setCityFound(cityFound);  
        } catch (error) {
            console.log('Error while fetching', error);
            setCityFound(false);  
        }
    }
    
     

    return (
        <div  >
            <div className="container">
                <h1>Weather App</h1>
                <div className="input-container">
                    <input
                        type="text"
                        id="city-input"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <button id="get-weather-btn" onClick={()=>getWeather(city)}>
                        Get Weather
                    </button>
                </div>
            </div>

            { cityFound && Object.keys(data).length !== 0 ? (
                <div id="weather-info">
                    <Item data={data} setFavCities={setFavCities} />
                </div>
            ) : (
                !cityFound && (
                    <p id="error-message">
                        City not found. Please try again.
                    </p>
                )
            )}
        </div>
    );
}

export default Input;
