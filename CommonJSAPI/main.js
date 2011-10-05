
var SYSTEM = require("commonjs/system");

exports.main = function(env)
{
    module.print("Some data from the CommonJS System module:\n");
    
	module.print("  args.length: \0green(" + SYSTEM.args.length + "\0)\n");
	module.print("  args: \0green(" + SYSTEM.args + "\0)\n");

	module.print("  Object.keys(env).length: \0green(" + Object.keys(SYSTEM.env).length + "\0)\n");
	module.print("  Object.keys(env): \0green(" + Object.keys(SYSTEM.env) + "\0)\n");
	module.print("  env.PWD: \0green(" + SYSTEM.env.PWD + "\0)\n");    
}
