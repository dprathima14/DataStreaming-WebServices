/*
*	Description: Academic Project to understand REST.
*	This file demonstrates a simple webservice which can be queried using 'http://localhost:8088/api/?ticker=AMZN';
*
*/

var http = require('http');
var url = require('url');
var express = require('express');

var app = express();

var data = {
      stocks: [
          {
              ticker: "GOOGLE",
              price: 174.40,
              time: new Date()
          },
          {
              ticker: "AMZN",
              price: 1125.35,
              time: new Date()
          },
		  {
              ticker: "HULU",
              price: 120.09,
              time: new Date()
          },
          {
              ticker: "NFLX",
              price: 192.05,
              time: new Date()
          }
      ]
};


setInterval(function() {
	// Randomly changing data
	data.stocks.forEach(function(element){
	  if (element.ticker == 'HULU') { element.price *= 0.67;  } //price going down for HULU
	  else if (element.ticker == 'NFLX') { element.price *= 0.97;  } //price going down for NETFLIX
	  element.price *= 1.002;
	});
}, 3000); // every 3 seconds



app.get('/api',function (req, res) {

	var addrs = url.parse(req.url, true);

	/*The query property returns an object with all the querystring parameters as properties:*/
	var addrsData = addrs.query;
	console.log(addrsData);


	if(addrsData.ticker == 'GOOGLE'){
		// SEARCH IN ARRAY OF OBJECTS
		var temp = data.stocks.find(function (data) { 
					    return data.ticker === 'GOOGLE';
					});

	} else if(addrsData.ticker == 'AMZN'){
		var temp = data.stocks.find(function (data) { 
					    return data.ticker === 'AMZN';
					});

	} else if(addrsData.ticker == 'HULU'){
		var temp = data.stocks.find(function (data) { 
					    return data.ticker === 'HULU';
					});

	} else {
		var temp = data.stocks.find(function (data) { 
					    return data.ticker === 'NFLX';
					});
	}

	console.log(temp);

	res.send(JSON.stringify(temp));

});


app.listen(8088); //the server object listens on port 8088