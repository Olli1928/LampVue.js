
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
           error: "",
           sunriseImagePath: './Billeder/Sunrise.png'
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
                this.currentTime = new Date(response.data.dt * 1000).toTimeString().slice(0,15)
                this.temp = Math.round(response.data.main.temp - 273.15)
                this.sunrise = new Date(response.data.sys.sunrise * 1000).toTimeString().slice(0,5)
                this.sunset = new Date(response.data.sys.sunset * 1000).toTimeString().slice(0,5)
                this.visibility = response.data.visibility / 1000
                this.weatherDescription = response.data.weather[0].description
            })
            .catch(error = (ex) => {
                this.error = ex.message
                console.log("Fejlkode:" + this.error)
            })
        }
        
    }      
}).mount("#app")