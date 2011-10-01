
var FILE = require("modules/file");

exports.main = function(env)
{
	var programPath = env.args[0],
		programAbsolutePath = FILE.realpath(module.id.replace(/\/[^\/]*$/, "/" + programPath)),
		command = "commonjs --platform " + require.platform + " " + programAbsolutePath;

	module.load({
		
	    "location": programAbsolutePath
	    
	}, function(id)
	{
		module.print("\0cyan(|---\0)\n");
		module.print("\0cyan(| You are running the '" + programPath + "' demo program via the Demo Program Runner included in the `test-programs-js` project!\n");
		module.print("| Equivalent command:\0) \0magenta(" + command + "\0)\n");
		module.print("\0cyan(|--- Program stdout & stderr follows --->\0)\n");

		env.args.shift();

		require(id).main(env);
	});
}
