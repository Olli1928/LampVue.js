const baseUri = "https://localhost:7116/api/Lamp"
Vue.createApp({
    data() {
        return {
            nyliste:[],
            Lamplist: [],
            error: null,
            statuscode:null,
            getLampId:""
        }
    },
     created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.getAlllamps()
    },
    methods: {
        cleanList() {
            this.Lamplist = [];
            this.error = null;
            console.log("count cars : " + this.Lamplist.length);
        },
        
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
              
             console.log("length of the Lamplist array " + this.Lamplist.length)


            })
            .catch(error = (ex) => {
              //resultElement.innerHTML = generateErrorHTMLOutput(error);
              this.Lamplist = []
               this.error = ex.message
              console.log("Error:" + this.error);
            })      
            
        },
        getByLampId(id){
            //axios call that returns the items from a specified user 
            uri = baseUri +/id/+id
            axios.get(uri)
            .then(response => {
            
            console.log("Uri: " + uri)

             console.log("in function getByUserId");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable posts
            //  this.Lamplist = response.data;
             this.Lamplist = [];
             this.Lamplist.push(response.data);
             this.status = response.status;
              
             console.log("length of the Lamplists array " + this.Lamplist.length)
            })
            .catch(error = (ex) => {
              this.carslist = []
              this.error = ex.message
              console.log("Error:" + this.error);
            })      
        },
           
       
       
    }
}).mount("#app")