
exports.main = function(env)
{
	module.load({
		
	    "location": module.id.replace(/\/[^\/]*$/, "/" + env.args[0])
	    
	}, function(id)
	{
		env.args.shift();

		require(id).main(env);
	});
}
