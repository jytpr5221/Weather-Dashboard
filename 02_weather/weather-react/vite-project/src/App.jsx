 
import Input from './component/input/Input';
import Favorite from './component/favorite/Favorite';
import { useEffect, useState } from 'react';
import './App.css'
function App() {
   
  
  let cities= JSON.parse(localStorage.getItem('favcity')) || [];
  let [favoriteCity,setFavCity] = useState(cities)

   function setFavCities( id,city ){
     console.log('setcity',city,id)
     let present=false
     favoriteCity.forEach(city => 
     {

      if(city.id === id) present = true
     }
     )
     
     if(!present){
     
     const cityId={id,city}
     const newArr=[...favoriteCity,cityId]
     setFavCity(newArr)
      }
    
   }

   function removeFavCity(id){

   const newArr = favoriteCity.filter((ele)=>ele.id !== id)
   console.log(newArr)
   setFavCity(newArr)
   }

   useEffect(()=>{

    localStorage.setItem('favcity',JSON.stringify(favoriteCity))
  },[favoriteCity])


  console.log('app',favoriteCity)
  return (
    
      <div className='div2'>
      <Input setFavCities={setFavCities} />
      <Favorite favs={favoriteCity} removeFavCity={removeFavCity}/>

      </div>
     
  )
}

export default App
