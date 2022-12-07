
const lampeBaseURL = 'https://gadelampenrest.azurewebsites.net/api/Lamps/'
Vue.createApp({
    data() {
        return {
            // Tredjeparts API kald data
           city: null,
           country: null,
           currentTime: null,
           temp: 0,
           sunrise: null,
           sunset: null,
           visibility: 0,
           weatherDescription: null,
           searchedCityName: null,
           error: null,
           sunriseImagePath: 'Billeder/Sunrise.png',
           sunsetImagePath: 'Billeder/Sunset.png',
           binoImagePath: 'Billeder/binoculars.png',
           moonImagePath:'Billeder/moon.png',
           sunImagePath:'Billeder/sun.png',
           stopwatchImagePath: 'Billeder/stopwatch.png',
           showWeatherBox: false,

           // Vores eget API kald data
           specifikChosenDevice: "",
           deviceList: [],
           specifikDeviceInfo: []
        }
    },  
    methods: {
        GetWeatherInfo(searchedCityName){
            console.log("In GetWeatherInfo method")
            weatherApiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCityName + "&appid=08ee16c2dc794824ee9b4d2f71a7091d"
            console.log(weatherApiURL)
            axios.get(weatherApiURL)
            .then(response => {
                console.log("Status kode:" + response.status)
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
        },
        GetDeviceInfo(specifikChosenDevice){
            console.log("In GetDeviceInfo method")
            lampApiURL = lampeBaseURL+"SearchLampInfoByDevicename/"+specifikChosenDevice
            console.log(lampApiURL)
            axios.get(lampApiURL)
            .then(response => {
                console.log("Status kode:" + response.status)
                console.log(response.data)
                this.specifikDeviceInfo = response.data
                console.log(specifikDeviceInfo)
            })
            .catch(error = (ex) => {
                console.log("Fejlkode:" + ex.message)
            })
        },
        GetDeviceNames(){
            console.log("I GetDeviceNames")
            axios.get(lampeBaseURL)
            .then(response => {
                console.log(response.status)
                console.log(response.data)
                this.deviceList = response.data
                console.log(this.deviceList)
            })
            .catch(error = (ex) => {
                console.log(ex.message)
            })
        }
    }      
}).mount("#app")