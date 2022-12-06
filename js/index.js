
const lampeURL = "https://lamprestapi.azurewebsites.net/api/Lamp"
Vue.createApp({
    data() {
        return {
           city: "",
           country: "",
           currentTime: "",
           temp: 0,
           sunrise: "",
           sunset: "",
           visibility: 0,
           weatherDescription: "",
           searchedCityName: "",
           error: null,
           sunriseImagePath: 'Billeder/Sunrise.png',
           sunsetImagePath: 'Billeder/Sunset.png',
           binoImagePath: 'Billeder/binoculars.png',
           moonImagePath:'Billeder/moon.png',
           sunImagePath:'Billeder/sun.png',
           stopwatchImagePath: 'Billeder/stopwatch.png',
           showWeatherBox: false

        }
    },  
    methods: {
        GetWeatherInfo(searchedCityName){
            console.log("In GetWeatherInfo method")
            searchedURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCityName + "&appid=08ee16c2dc794824ee9b4d2f71a7091d"
            console.log(searchedURL)
            axios.get(searchedURL)
            .then(response => {
                console.log("Status kode:" + response.status);
                this.city = response.data.name
                this.country = response.data.sys.country
                this.currentTime = new Date((response.data.dt + response.data.timezone) * 1000).toUTCString().slice(17,22)
                this.temp = Math.round(response.data.main.temp - 273.15)
                this.sunrise = new Date((response.data.sys.sunrise + response.data.timezone) * 1000).toUTCString().slice(17,22)
                this.sunset = new Date((response.data.sys.sunset + response.data.timezone) * 1000).toUTCString().slice(17,22)
                this.visibility = response.data.visibility / 1000
                this.weatherDescription = response.data.weather[0].description
                this.showWeatherBox = true
                this.error = null
            })
            .catch(error = (ex) => {
                if (searchedCityName == "") {
                    this.error = "Indtast venligst et bynavn i feltet for at finde vejrinfo!"
                    this.showWeatherBox = false   
                }
                else{
                    this.error = "Kunne ikke finde en by med dette navn! Prøv igen!"
                    this.showWeatherBox = false
                }
                console.log("Fejlkode:" + ex.message)
            })
        }
        
    }      
}).mount("#app")