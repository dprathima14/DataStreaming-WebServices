var SSE = require('sse'),
  http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*'
  });


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
	  if (element.ticker == 'HULU') { element.price *= 0.8997;  } //price going down for HULU
	  else if (element.ticker == 'NFLX') { element.price *= 0.9997;  } //price going down for NETFLIX
	  element.price *= 1.001;
    });

    res.write(JSON.stringify(data));
  }, 5000); // every 5 seconds
});


server.listen(8080, '127.0.0.1', function() {
  var sse = new SSE(server);
});