
const field=document.querySelector('#city-input')
const btn=document.querySelector('#get-weather-btn')
let city=document.querySelector('#city-name')
let temperature=document.querySelector('#temperature')
let desc=document.querySelector('#description')
const API_KEY='19f3f065cb0e0b58e960ba9bf84da021'
const mainContainer=document.querySelector('#weather-info')
const errorMsg=document.querySelector('#error-message')
const favorites=document.querySelector('.favorite')
let favs=JSON.parse(localStorage.getItem('favcities')) || []
const favbtn=document.querySelector('#fav')

// if (favs.length() > 0) favorites.classList.remove('hidden')
favs.forEach(fav => {
  
   console.log(fav)
   render(fav)
});

btn.addEventListener('click',async()=>{
     
  const city=field.value
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=19f3f065cb0e0b58e960ba9bf84da021`
  console.log(city)
  console.log(url)
     try {
       const result=await fetch(url)
       const data=await result.json()
       console.log(data)
       const temp=Number(data.list[0].main.temp)-273.15
       console.log(temp)
       mainContainer.classList.remove('hidden')
       errorMsg.classList.add('hidden')
       getCity(data)
       getTemp(temp)
       getDesc(data)

         
     } catch (error) {
      mainContainer.classList.add('hidden')
      errorMsg.classList.remove('hidden')
      console.log(error)

     }


})

     
favbtn.addEventListener('click',async (e)=>{

  e.preventDefault()
 
  const parent=e.target.parentElement
 
  const first=parent.children
  const city=String(first[0].innerText).toLowerCase()
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=19f3f065cb0e0b58e960ba9bf84da021`;
  try {
    const result=await fetch(url)
    const data =await result.json()
    const cityname=data.name
    const temp=(Number(data.main.temp)-273.15).toFixed(2)
    const desc=data.weather[0].main

    const id=data.id
    console.log( data.id)
    
      const cityObj={
        cityname,
        temp,
        desc,
        id

      }
      
  let present=false
  favs.forEach((ele)=>{
    if(ele.id === id)present = true
  })

  if(!present){

    favs.push(cityObj)
    render(cityObj)
    localStorage.setItem('favcities',JSON.stringify(favs))
  }

 
  } catch (error) {

    console.log('error in adding favs....',error)
  
  }

})


function getCity(data){
  console.log(data.city.name)
  city.innerText=data.city.name
}

function getTemp(temp){

  temperature.innerText=`Temperature: ${temp.toFixed(2)}°C `
}

function getDesc(data){
  desc.innerText=`Weather: ${data.list[0].weather[0].main}`
}


 function render(city){
 
    const cityname=city.cityname
    const temp=(Number(city.temp)).toFixed(2)
    const desc=city.desc
 
    const newdiv=document.createElement('div')

    newdiv.innerHTML=`
     <div class="box">
        <h2 id="city-name1">${cityname}</h2>
        <p id="temperature1">Temperature: ${temp}°C</p>
        <p id="description1">Weather: ${desc}</p>
      </div>
    `
    favorites.append(newdiv)


 
    

}
