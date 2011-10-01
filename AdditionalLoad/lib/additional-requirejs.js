
define(function(require, exports) {

	var GREETINGS = require("common/greetings");

	exports.getGreeting = function(env)
	{
	    return GREETINGS.helloWorld();
	}

});
