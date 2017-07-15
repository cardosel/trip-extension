const Xray = require('x-ray');
const request = require('request');
const fs = require('fs');

const xray = new Xray();
const URL = 'https://www.airbnb.com/rooms/798483';

	xray(URL, 'title')(function(err, title){
 		
 		console.log(title) // returns title of airbnb

 		fs.appendFile('airbnb.json', '\n' + title); // updates json

	
	});




