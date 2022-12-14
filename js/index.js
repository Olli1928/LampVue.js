
const lampeBaseURL = 'https://gadelampenrest.azurewebsites.net/api/Lamps/'
const energyApiURL = 'https://api.statbank.dk/v1/data/ENEGEO/JSONSTAT?KOMK=265&Tid=2012&Tid=2014&Tid=2016&Tid=2018&Tid=2020'

Vue.createApp({
    created(){
        this.GetDeviceNames()
    },
    mounted(){
        const pages = document.querySelectorAll(".page");
        const translateAmount = 100; 
        let translate = 0;

        slide = (direction) => {
            direction === "next" ? translate -= translateAmount : translate += translateAmount;

            pages.forEach(
            pages => (pages.style.transform = `translateX(${translate}%)`)
            );
        }
    },
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
           specifikDeviceInfo: [],
           specifikDeviceName: "",
           specifikDeviceWatt: 0,
           specifikDeviceCity: "",
           specifikDeviceCountry: "",
           specifikDeviceTurnOnDuration: 0,
           specifikDevicekWh: 0,
           specifikDeviceTotalTime: 0,
           showLampBox: false,
           index: 0,

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
                    this.error = "Kunne ikke finde en by med dette navn! Pr??v igen!"
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
                this.specifikDeviceInfo = []
                this.specifikDeviceName = response.data[0].deviceName;
                this.specifikDeviceWatt = response.data[0].watt
                this.specifikDeviceCity = response.data[0].city
                this.specifikDeviceCountry = response.data[0].country
                this.specifikDeviceTurnOnDuration = response.data[0].turnOnDuration
                for (let index = 0; index < response.data.length; index++) {
                    const turnedOn = response.data[index].turnedOn;
                    let turnedOnTimeInDate = new Date(turnedOn).toString().slice(0,24)
                    this.specifikDeviceInfo.push(turnedOnTimeInDate)
                }
                console.log(this.specifikDeviceInfo)
                this.CalculateTotalTime()
                this.CalculatekWh()
                this.showLampBox = true
            })
            .catch(error = (ex) => {
                console.log("Fejlkode:" + ex.message)
                this.showLampBox = false
            })
        },
        GetDeviceNames(){
            console.log("In GetDeviceNames")
            axios.get(lampeBaseURL)
            .then(response => {
                console.log(response.status)
                for (let index = 0; index < response.data.length; index++) {
                    const element = response.data[index].deviceName;
                    if (!this.deviceList.includes(element)) {
                        this.deviceList.push(element)   
                    }
                }
                console.log(this.deviceList)
            })
            .catch(error = (ex) => {
                console.log(ex.message)
            })
        },
        CalculatekWh(){
            this.specifikDevicekWh = Math.round((this.specifikDeviceWatt / 1000) * (this.specifikDeviceTurnOnDuration * this.specifikDeviceInfo.length) * 100) / 100
        },
        CalculateTotalTime(){
            this.specifikDeviceTotalTime = new Date((this.specifikDeviceTurnOnDuration * this.specifikDeviceInfo.length) * 1000).toISOString().substr(11, 8)
        },
        CloseDropDown(d){
            const text = document.getElementById('text');
            const selectBtn = document.getElementById('select-btn')
            text.innerHTML = d
            selectBtn.classList.remove('active');
        },
        ToggleActive(){
            const selectBtn = document.getElementById('select-btn');
            selectBtn.classList.toggle('active')
            if (selectBtn.hasAttributes('active')) {
                this.showLampBox = false
            }
        }
    }      
}
).mount("#app")