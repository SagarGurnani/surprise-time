var twilio = require('twilio');
var fs = require('fs');

var config = fs.readFileSync('./config.json');
config = JSON.parse(config);

var numbers = fs.readFileSync('./numbers.json')
numbers = JSON.parse(numbers);
var receivers = numbers.rec;
var twilioNo = numbers.twilio;

var client = twilio(config.account_id, config.access_token);

console.log(receivers,'|',twilioNo,'|',config.account_id,'|',config.access_token);

client.sendMessage( 
	{ 
		to: receivers[0], 
		from: twilioNo, 
		body:'Using Twilio with Node.js!' 
	}, 
	function( err, data ) {
		console.log(data);
		console.log('err=',err);
	}
);
