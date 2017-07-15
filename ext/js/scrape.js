const Xray = require('x-ray');
const request = require('request');
const fs = require('fs');

const xray = new Xray();
const URL = 'https://www.airbnb.com/rooms/3489531?';

	xray(URL, 'title')(function(err, title){
 		
 		substr = title.substring(title.indexOf('Rent')); 
 		places = substr.substring(8);

 		console.log(places) // returns places of airbnb

 		fs.appendFile('airbnb.json', '\n' + places); // updates json



	
	});






