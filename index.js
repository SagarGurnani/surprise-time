var Chance = require('chance');
var chance=new Chance();

var twilio = require('twilio');
var fs = require('fs');

var message = fs.readFileSync('./message.json');
message = JSON.parse(message);
msgbodies = message.msgs;

var config = fs.readFileSync('./config.json');
config = JSON.parse(config);

var numbers = fs.readFileSync('./numbers.json')
numbers = JSON.parse(numbers);
var receivers = numbers.rec;
var twilioNo = numbers.twilio;

var client = twilio(config.account_id, config.access_token);
console.log(config.account_id, config.access_token);


var myMinute = chance.integer({min:1,max:59});
console.log('waiting for minute=',myMinute);

function minuteChecker(){

	var thisMinute = (new Date()).getMinutes();
	console.log(thisMinute,'vs',myMinute);
	if(myMinute == thisMinute){
		
		//send sms
		var msgno = chance.integer({min:0,max:4});

		console.log(myMinute,'|',thisMinute,'|',receivers,'|',receivers.length,'|',twilioNo,'|',msgbodies)

		for(i=0;i<receivers.length;i++){
			//console.log('inside for, i=',i,',rec=',receivers[i]);
			client.sendMessage( 
				{ 
					to: receivers[i], 
					from: twilioNo, 
					body: msgbodies[msgno] 
				}, 
				function( err, data ) {
					console.log(data);
					console.log('err=',err);
				}
			);
		}
		
		setTimeout(function(){process.exit(1);},7500);
	}
}


var polling = setInterval(minuteChecker,45000);


