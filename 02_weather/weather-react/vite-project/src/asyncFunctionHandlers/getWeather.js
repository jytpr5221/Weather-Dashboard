async function showWeather(city) {
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=19f3f065cb0e0b58e960ba9bf84da021`;
    console.log(url)

    try {
        const result = await fetch(url);
        const cityData = await result.json();
        console.log(cityData)
        if (result.ok) {
            return { cityFound: true, data: cityData }; 
        } else {
            return { cityFound: false, data: null };  
        }
    } catch (error) {
        console.log("Error occurred:", error);
        return { cityFound: false, data: null }; 
    }
}

export default showWeather;
