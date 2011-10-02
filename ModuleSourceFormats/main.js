
var Q = require("modules/q"),
	_UTIL = require("./lib/_util");


exports.main = function(env)
{
    module.print("Load modules in various formats:\n");

    Q.when(loadModules([
	    "amd-dependencies-exports",
	    "amd-dependencies-return",
	    "amd-dependencies-require-exports",
	    "amd-dependencies-require-return",
	    "amd-function-require-return",
	    "amd-function-require-exports",
	    "amd-commonjs-exports",
	    "amd-function",
	    "amd-object",
	    "amd-commonjs-compat-dependencies-exports",
	    "amd-commonjs-compat-dependencies-return",
	    "commonjs-modules1",
	    "commonjs-modules2",
	    "commonjs-modules2-dependencies",
	    "commonjs-modules2-dependencies-aliased"
	]), function()
	{
        module.print("Done!\n");

        if (typeof env.onDone === "function")
        {
        	env.onDone();
        }
	});

    if (typeof env.onDone === "function")
    {
    	return env.onDone;
    }
}


function loadModules(modules)
{
    var done = Q.ref();
    modules.forEach(function(moduleId)
	{
		done = Q.when(done, function()
		{
		    module.print("  Loading module '" + moduleId + "' ...");

			var result = Q.defer();

			try
			{
				module.load(require.id("./lib/" + moduleId, true), function(id)
				{
					var moduleExports = require(id);
					
					if (typeof moduleExports.main !== "function")
					{
					    module.print("\0red( ERROR: function `main` not found in `exports`!\0)\n");
					}
					else
					{
						if (moduleExports.main() === _UTIL.main())
						{
							module.print("\0green( OK!\0)\n");
						}
						else
						{
							module.print("\0red( ERROR: function `main` in `exports` did not return '" + _UTIL.main() + "'!\0)\n");
						}
					}
	
					result.resolve();
				});
			}
			catch(e)
			{
				console.error(e);
			}	
		    return result.promise;	
		});
	});
    return done;
}
