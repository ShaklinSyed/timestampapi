var express = require('express');
var bodyparser = require('body-parser');
var timelib = require('moment');

var app = new express();
app.use(bodyparser.urlencoded({extended: false}))

var responseObject = {
	"unix" : null,
	"natural" : null
};

console.log('Server loaded ... ');

app.get('/', function(req,res){
	res.end('Timestring API');
});

app.get('/:timeString', function(req, res){
	if(timelib(Number(req.params.timeString)).valueOf() == Number(req.params.timeString)){
		var timeString = timelib(Number(req.params.timeString));

		responseObject.unix = timeString.valueOf();
		responseObject.natural = timeString.format('MMMM DD, YYYY');
	}else{
		var timeString = timelib(req.params.timeString);
		responseObject.unix = timeString.valueOf();
		responseObject.natural = timeString.format('MMMM DD, YYYY');
	}
	res.writeHead(200, {
  		'Content-Type': 'application/json',
	});
	res.end(JSON.stringify(responseObject));
});

app.listen(1111);