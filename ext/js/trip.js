var addr;
var fs = require('fs');
var googleMapsClient = require('@google/maps').createClient({
  		key: 'AIzaSyB6EM-2xMjuFuGOPE5Nj4geFFC0BrAoWwU' 
	});

function geocode(){
	fs.readFile('airbnb.json', function(err, data) {
    if(err) throw err;

    var airbnbs = data.toString().split("\n");
     for(i in airbnbs) {

    	addr = airbnbs[i];
		console.log(addr); // check if addresses are in array

			    	
			googleMapsClient.geocode({  
			  address: addr
			}, function(err, response) {
			  	if (!err) { // return coordinates if there is no error 
	
		  		console.log(response.json.results[0].geometry.location);

			  }
			});
        }
 });

};









