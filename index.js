//keys

//open weathermap key for current weather
const weatherApiKey = "ef7577c3994a12e63531e2a76adaa7b7"

//Constant
Kelvin = 273;

//App data
const weather = {};
//object 
weather.temperature = {
    unit : "Celsius"
}
//allow location
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}


//user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}
//Ask the user to allow location
function showError(error){
    alert("Please allow location access.(If on phone, turn on GPS and refresh)");
}

//get weather
function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

    console.log(api);
    //get data with api
    fetch(api)
        .then(function(response){
        let data = response.json();
        return data;
        })
        //store the data from api
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.humidity = data.main.humidity;
            weather.city = data.name;
            weather.feels_like = Math.floor(data.main.feels_like - Kelvin);
            weather.country = data.sys.country;
        })
        //to display
        .then(function(){
            displayWeather();
        });
}
//updating the values of html to display
function displayWeather(){
    
    document.querySelector(".title p").innerHTML = `Weather in ${weather.city}`;
    document.querySelector(".temp-value p").innerHTML = `Temperature today ${weather.temperature.value}℃`;
    document.querySelector(".humid p").innerHTML = `Humidity ${weather.humidity}%`
    document.querySelector(".feels_like p").innerHTML = `Feels like ${weather.feels_like}℃`;
    document.querySelector(".temp-description p").innerHTML = weather.description;
    document.querySelector(".location p").innerHTML = `${weather.city}, ${weather.country}`;
}