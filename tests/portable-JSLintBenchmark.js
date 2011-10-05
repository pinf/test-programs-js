
var SYSTEM = require("modules/system"),
	Q = require("modules/q");


exports.run = function(ASSERT, harness)
{
	return harness.runAll(exports);
}


var platforms = [
        "node",
// TODO: Switch off warnings as jsonlint.js has tons.
//        "gpsee",
        "v8cgi",
// NOTE: It takes WAY too long to parse the jsonlint.js file with the default (java) platform!
//        "narwhal",
// NOTE: It takes WAY too long to parse the jsonlint.js file!
//        "ringo",
    ];

for (var i=0 ; i<platforms.length ; i++)
{
	registerTest(platforms[i]);
}

function registerTest(platformAlias)
{
	exports["test run portable " + platformAlias] = function(ASSERT, harness)
	{
		if (!harness.global.platforms[platformAlias])
		{
			module.print("\0yellow(Skipping! Platform '" + platformAlias + "' not detected!\0)\n");
			return;
		}
	
		return harness.global.runPrograms(platformAlias, [
	        "JSLintBenchmark"
		]);
	}
}
