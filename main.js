
var FILE = require("modules/file"),
	ARGS = require("modules/args"),
	UTIL = require("modules/util"),
	SYSTEM = require("modules/system");

exports.main = function(env)
{
    var optParser = new ARGS.Parser(),
    	cliOptions;
	
	optParser.arg("ProgramName");
	optParser.help("Run a given demo program using the Demo Program Runner");
	optParser.option("--port").set().help("If specified serve program via HTTP port");
	optParser.option("-h", "--help").bool().help("Display usage information");
	
	cliOptions = optParser.parse(["./"].concat(env.args));
	
	if (cliOptions.help === true)
	{
	    optParser.printHelp(cliOptions);
	    return;
	}
	if (cliOptions.args.length === 0)
	{
	    optParser.print('\0red(\0bold(' + "Error: No ProgramName specified!" + '\0)\0)\n');
	    optParser.printHelp(cliOptions);
	    return;
	}

	var testProgramsPath = FILE.dirname(module.id),
		programPath = cliOptions.args[0].replace(/\/$/,""),
		programAbsolutePath = FILE.realpath(module.id.replace(/\/[^\/]*$/, "/" + programPath));


	module.print("\0cyan(|---\n");
	module.print("| You are running the '" + programPath + "' demo program via the Demo Program Runner included in the `test-programs-js` project.\n");
	module.print("|---\0)\n");

	
	runProgram(function()
	{
		if (cliOptions.port)
		{
			serveProgram();
		}
	});
	
	
	function runProgram(callback)
	{
		// Run program inline
		
		var command = "commonjs --platform " + require.platform + " " + programAbsolutePath;

		module.load({
			
		    "location": programAbsolutePath
		    
		}, function(id)
		{
			module.print("\0cyan(|---\n");
			module.print("| Running program (equivalent command):\0) \0magenta(" + command + "\0)\n");
			module.print("\0cyan(|--- Program stdout & stderr follows --->\0)\n");

			var sEnv = UTIL.deepCopy(env);
			
			sEnv.args.shift();

			sEnv.onDone = function()
			{
				callback();
			}
			if (require(id).main(sEnv) !== sEnv.onDone)
			{
				callback();
			}
		});
	}
	
	function serveProgram()
	{
		// Serve program via HTTP port

		var command = "commonjs --platform node --script export " + testProgramsPath + " " + programPath + " " + programPath + "/exported";

		module.print("\0cyan(|---\n");
		module.print("| Exporting program:\0) \0magenta(" + command + "\0)\n");
		module.print("\0cyan(|--->\0)\n");

		exportProgram();

		function exportProgram()
		{
			SYSTEM.exec(command, function(stdout, stderr)
			{
				module.print(stdout);
				module.print("\0red(" + stderr + "\0)");
				
				runServer();
			});
		}

		function runServer()
		{
			module.load({
				
			    "location": require.pkg(module.mappings["server"]).id()
			    
			}, function(id)
			{
				var sEnv = UTIL.deepCopy(env);
				
				sEnv.programPathResolver = function(path)
				{
					return testProgramsPath + "/server";
				}
				
				sEnv.args.unshift("--reloading");

				command = "commonjs --platform node --script serve " + sEnv.programPathResolver() + " --reloading --port " + cliOptions.port + " " + sEnv.programPathResolver() + " " + programAbsolutePath;
		
				module.print("\0cyan(|---\n");
				module.print("| Running server (equivalent command):\0) \0magenta(" + command + "\0)\n");
				module.print("\0cyan(|--- Server stdout & stderr follows --->\0)\n");
				
				sEnv.args.push(programAbsolutePath);
				
				require(id).main(sEnv);
			});
		}
	}
}
