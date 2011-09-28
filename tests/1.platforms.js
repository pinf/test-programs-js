
var SYSTEM = require("modules/system"),
	Q = require("modules/q");


exports.run = function(ASSERT, harness)
{
	return harness.runAll(exports);
}


exports["test find platform node"] = function(ASSERT, harness)
{
	return runPlatformTest("NodeJS", "node", "node", harness);
}

exports["test find platform gpsee"] = function(ASSERT, harness)
{
	return runPlatformTest("GPSEE", "gsr", "gpsee", harness);
}

exports["test find platform v8cgi"] = function(ASSERT, harness)
{
	return runPlatformTest("v8cgi", "v8cgi", "v8cgi", harness);
}

exports["test find platform narwhal"] = function(ASSERT, harness)
{
	return runPlatformTest("Narwhal", "narwhal", "narwhal", harness);
}

exports["test find platform ringo"] = function(ASSERT, harness)
{
	return runPlatformTest("RingoJS", "ringo", "ringo", harness);
}


function runPlatformTest(label, binaryName, platformAlias, harness)
{
	var result = Q.defer();
	
	SYSTEM.exec("which " + binaryName, function(stdout, stderr)
	{
		if (stdout)
		{
			harness.global.platforms[platformAlias] = stdout.replace(/\n$/, "");
			module.print("\0green(" + label + " (" + binaryName +") found at: " + harness.global.platforms[platformAlias] + "\n\0)");
		}
		else
		{
			harness.global.platforms[platformAlias] = false;
			module.print("\0yellow(" + label + " (" + binaryName + ") not found!\0)\n");
		}
		result.resolve();
	});
	
	return result.promise
}
