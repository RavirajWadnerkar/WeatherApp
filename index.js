//keys
//Google place api key
const placeApiKey = "AIzaSyAJJ4tYjHK5olN2eJnC-nUAb2lz8f0yggQ";
//open weathermap key for current weather
const weatherApiKey = "ef7577c3994a12e63531e2a76adaa7b7"

//App data
const weather = {};
//object to 
weather.temperature = {
    unit : "Kelvin"
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
    alert("Please allow location");
}

//get weather
function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

    //console.log(api);
    //get data with api
    fetch(api)
        .then(function(response){
        let data = response.json();
        return data;
        })
        //store the data from api
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        //to display
        .then(function(){
            displayWeather();
        });
}
//updating the values of html to display
function displayWeather(){
    
    document.querySelector(".temp-value p").innerHTML = `${weather.temperature.value}°K`;
    document.querySelector(".temp-description p").innerHTML = weather.description;
    document.querySelector(".location p").innerHTML = `${weather.city}, ${weather.country}`;
}