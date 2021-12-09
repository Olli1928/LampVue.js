const baseUri = "https://webapicar20190326034339.azurewebsites.net/api/cars"
Vue.createApp({
    data() {
        return {
            nyliste:[],
            carslist: [],
            error: null,
            statuscode:null,
            getCarId: "",
            carId:8,
            carVendor:"Ford",
            carModel:"Mustang",
            carPrice:200000,
            deletecarId:1
        }
    },
     created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.getAllCars()
    },
    methods: {
        cleanList() {
            this.carslist = [];
            this.error = null;
            console.log("count cars : " + this.carslist.length);
        },
        //Read this for an example: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
         getAllCars() {
             //axios call that returns all the elements from the webservice
            axios.get(baseUri)
            .then(response => {
             var divtag = document.getElementById("content");

             console.log("in function getAllCars");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable carlists
             this.carslist = response.data;
             this.status = response.status;
              
             console.log("length of the carlist array " + this.carslist.length)


            })
            .catch(error = (ex) => {
              //resultElement.innerHTML = generateErrorHTMLOutput(error);
              this.carslist = []
               this.error = ex.message
              console.log("Error:" + this.error);
            })      
            
        },
        getByCarId(id){
            //axios call that returns the items from a specified user 
            uri = baseUri +"/"+id
            axios.get(uri)
            .then(response => {
            
            console.log("Uri: " + uri)

             console.log("in function getByUserId");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable posts
            //  this.carslist = response.data;
             this.carslist = [];
             this.carslist.push(response.data);
             this.status = response.status;
              
             console.log("length of the carlists array " + this.carslist.length)
            })
            .catch(error = (ex) => {
              this.carslist = []
              this.error = ex.message
              console.log("Error:" + this.error);
            })      
        },
        PostCar(){
            axios.post(baseUri,{"id":this.carId,"vendor":this.carVendor,"model":this.carModel,"price":this.carPrice})
            .then(response => {
            
            console.log("URI: ")

             console.log("in post cars");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable posts
             //this.carlists = response.data;
             this.status = response.status;
              
             console.log("length of cars array " + this.carlists.length)
            })
            .catch(error = (ex) => {
              this.carlists = []
              this.error = ex.message
              console.log("Error:" + this.error);
            })    
        },
        deleteByCarId(id){
            uri = baseUri +"/"+id
            //axios call that returns the items from a specified user 
            axios.delete(uri)
            .then(response => {
            
            console.log("Uri: " + uri)

             console.log("in function getByCarId");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable posts
             this.carslist = response.data;
             this.status = response.status;
              
             console.log("length of the carlists array " + this.carslist.length)
            })
            .catch(error = (ex) => {
              this.carslist = []
              this.error = ex.message
              console.log("Error:" + this.error);
            })      
        }
        
       
       
    }
}).mount("#app")