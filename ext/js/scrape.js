const Xray = require('x-ray');
const request = require('request');
const fs = require('fs');

const xray = new Xray();
const URL = 'https://www.airbnb.com/rooms/157129?location=Tokyo%2C%20Japan&s=kiK-xDDx';

	xray(URL, 'title')(function(err, title){
 		
 		substr = title.substring(title.indexOf('Rent')); 
 		places = substr.substring(8);

 		console.log(places) // returns places of airbnb

 		fs.appendFile('airbnb.json', '\n' + places); // updates json



	
	});


