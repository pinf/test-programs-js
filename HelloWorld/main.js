
var GREETINGS = require("common/greetings");

exports.main = function(env)
{
    module.print(GREETINGS.helloWorld() + "\n");
}
