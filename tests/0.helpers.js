
var SYSTEM = require("modules/system"),
	Q = require("modules/q"),
	UTIL = require("modules/util"),
	FILE = require("modules/file"),
	LOADER = require("pinf/loader");

var global;

exports.run = function(ASSERT, harness)
{
	global = harness.global;

	global.platforms = {};
	global.runProgram = exports.runProgram;
	global.runPrograms = exports.runPrograms;
}


exports.runPrograms = function(platformAlias, programNames)
{
	var done = Q.ref();
	programNames.forEach(function(programName)
	{
	    done = Q.when(done, function()
	    {
	    	return exports.runProgram(platformAlias, programName);
	    });
	});
	return done;
}

exports.runProgram = function(platformAlias, programName)
{
	var result = Q.defer();

	try
	{
		var command = global.platforms[platformAlias],
			loaderPath = LOADER.getAPI().ENV.loaderRoot + "/pinf-loader.js",
			programsPath = FILE.dirname(FILE.dirname(module.id));

		// TODO: Splice in '-v' when applicable.

		switch(platformAlias)
		{
			case "gpsee":
				command += " -f " + loaderPath + " --";
				break;
			default:
				command += " " + loaderPath;
				break;
		}

		command += " " + programsPath + "/";
		
		if (UTIL.isArrayLike(programName))
		{
			command += programName.join(" ");
		}
		else
		{
			command += programName;
		}

		module.print("\n\0magenta(=> Running program '\0bold(" + programName + "\0)' on platform '\0bold(" + platformAlias + "\0)' with command [" + command + "]:\0)\n");
		
		var time = new Date().getTime();

		SYSTEM.exec(command, function(stdout, stderr)
		{
			if (stderr)
			{
				// TODO: Reject promise so we can do test accounting
				module.print("\0red(Program ran with errors: " + stderr + "\0)");
			}

			module.print(stdout)

			module.print("\0magenta(<= Test took " + (((new Date().getTime()) - time)/1000) + " seconds.\0)\n\n");

			result.resolve();
		});
	}
	catch(e)
	{
		console.error(e);
	}
	
	return result.promise
}
