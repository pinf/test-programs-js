
var SYSTEM = require("modules/system"),
	Q = require("modules/q");


exports.run = function(ASSERT, harness)
{
	return harness.runAll(exports);
}


exports["test run portable node"] = function(ASSERT, harness)
{
	if (!harness.global.platforms.node)
	{
		module.print("\0yellow(Skipping! Platform not detected!\0)\n");
		return;
	}

	return harness.global.runPrograms("node", [
        "HelloWorld",
        ["SimpleCLI", "http://www.google.com/"]
	]);
}

exports["test run portable gpsee"] = function(ASSERT, harness)
{
	if (!harness.global.platforms.gpsee)
	{
		module.print("\0yellow(Skipping! Platform not detected!\0)\n");
		return;
	}
	
	return harness.global.runPrograms("gpsee", [
        "HelloWorld",
//        ["SimpleCLI", "http://www.google.com/"]
   	]);
}

exports["test run portable ringo"] = function(ASSERT, harness)
{
	if (!harness.global.platforms.ringo)
	{
		module.print("\0yellow(Skipping! Platform not detected!\0)\n");
		return;
	}

	return harness.global.runPrograms("ringo", [
        "HelloWorld",
//        ["SimpleCLI", "http://www.google.com/"]
   	]);
}
