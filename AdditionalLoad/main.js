
exports.main = function(env)
{
    module.print("Hello World from AdditionalLoad" + "\n");

    
    module.print("Load extra module from our package ..." + "\n");

    module.load(require.id("./additional", true), function(id)
    {
        module.print("... extra module from our package loaded!" + "\n");

        var ADDITIONAL = require(id);

        module.print("Greeting from extra module from our package: " + ADDITIONAL.getGreeting() + "\n");
    });

    
/*    
    // TODO: This does not work yet when exporting program

    module.print("Load extra module from external package ..." + "\n");
    module.load("common/greetings", function(id)
    {
        module.print("... extra module from external package loaded!" + "\n");
    });
*/

}
