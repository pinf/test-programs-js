
var JSON = require("modules/json");

exports.app = function(app)
{
	return function(env)
    {
		var data = {
			"Ruby": Math.floor(Math.random()*41),
	        "JavaScript": 0,
	        "Shell": 5,
	        "Python": Math.floor(Math.random()*11),
	        "PHP": 4,
	        "C": Math.floor(Math.random()*20),
	        "Perl": 3,
	        "C++": 2,
	        "Java": Math.floor(Math.random()*11),
	        "Objective-C": 2
	    };
		
		var total = 0;
		for (var label in data)
		{
			total += data[label];
		}
		data["JavaScript"] = 100 - total;

		return {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: [
                JSON.encode(data)
            ]
        };
    }
}
