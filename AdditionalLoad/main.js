
exports.main = function(env)
{
    module.print("Load extra modules:\n");
    
    loadAdditional(function()
    {
        loadAdditionalRequirejs(function()
	    {
            module.print("Done!\n");
            
            if (typeof env.onDone === "function")
            {
            	env.onDone();
            }
	    });
    });

    if (typeof env.onDone === "function")
    {
    	return env.onDone;
    }
}

function loadAdditional(callback)
{
    module.print("  Loading module 'additional' ...");
    
    module.load(require.id("./lib/additional", true), function(id)
    {
        var ADDITIONAL = require(id);
        
        testGreeting(ADDITIONAL.getGreeting());
        
        callback();
    });
}

function loadAdditionalRequirejs(callback)
{
    module.print("  Loading module 'additional-requirejs' ...");

    require(["./lib/additional-requirejs"], function(ADDITIONAL)
    {
        testGreeting(ADDITIONAL.getGreeting());

        callback();
    });
}

function testGreeting(greeting)
{
    if (greeting === "Hello World")
    {
		module.print("\0green( OK!\0)\n");
	}
	else
	{
		module.print("\0red( ERROR: `getGreeting` in `exports` did not return 'Hello World'!\0)\n");
    }
}


/*    
// TODO: This does not work yet when exporting program

module.print("Load extra module from external package ..." + "\n");
module.load("common/greetings", function(id)
{
    module.print("... extra module from external package loaded!" + "\n");
});
*/
