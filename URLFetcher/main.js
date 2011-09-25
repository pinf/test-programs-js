
var ARGS = require("modules/args"),
	HTTP_CLIENT = require("modules/http-client"),
	URI = require("modules/uri");

const TRIM_BODY_TO = 500;

exports.main = function(env)
{
    var optParser = new ARGS.Parser(),
    	cliOptions;

	optParser.arg("URL");
	optParser.help("Request a given URL and display result");
	optParser.option("-v", "--verbose").bool().help("Enable debug output and progress messages");
	optParser.option("--show-headers").bool().help("Show the response headers");
	// TODO: Need way to set default
	optParser.option("--trim-body-to").set().help("Length of body to show (characters)");
	optParser.option("-h", "--help").bool().help("Display usage information");
	
	cliOptions = optParser.parse(["script"].concat(env.args));
	
	if (cliOptions.help === true)
	{
	    optParser.printHelp(cliOptions);
	    return;
	}
	if (cliOptions.args.length === 0)
	{
	    optParser.print('\0red(\0bold(' + "Error: No URL specified!" + '\0)\0)\n');
	    optParser.printHelp(cliOptions);
	    return;
	}
	
	cliOptions["trim-body-to"] = cliOptions["trim-body-to"] || TRIM_BODY_TO;

	var url = cliOptions.args[0];

		if (cliOptions.verbose)
		{
		    module.print("\0cyan(URL:\0) \0yellow(" + url + "\0)\n");
		    module.print("\0cyan(Parsed Arguments:\0) ");
		    console.log(cliOptions);
		}

	var urlParts = URI.parse(url);

		if (cliOptions.verbose)
		{
		    module.print("\0cyan(URL Parts:\0) ");
		    console.log(urlParts);
		    module.print("Sending request ...");
		}

	HTTP_CLIENT.request({
		host: urlParts.authority,
	    port: urlParts.port || 80,
	    path: urlParts.path + ((urlParts.query)?"?"+urlParts.query:""),
	    method: "GET"
	}, function success(response)
	{
			if (cliOptions.verbose)
			{
			    module.print(" got response!\n");
			}

	    module.print("\0green(Status:\0) " + response.status + "\n");
	    
	    if (cliOptions.verbose || cliOptions["show-headers"])
	    {
		    module.print("\0green(Headers:\0) ");
		    console.log(response.headers);
	    }
	    
	    module.print("\0green(Body (" + response.data.length + " characters):\0)\n");

	    console.log(response.data.substring(0, cliOptions["trim-body-to"]) + "\n");
	    
	    if (response.data.length > cliOptions["trim-body-to"])
	    {
		    module.print("<trimmed to " + cliOptions["trim-body-to"] + " characters>\n");
	    }

	    module.print("\0green(DONE\0)\n");

	}, function error(e)
	{
	    module.print("\0red(ERROR: " + "Sending request to: " + url  + "\0)\n");
	    console.log(e);
	});
}
