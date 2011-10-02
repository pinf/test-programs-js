
var JSGI = require("server/vendor/connect/middleware/jsgi"),
    JSGI_RELOAD = require("server/jsgi/reload"),
    PROGRAM_SERVER = require("pinf/program-server"),
    FILE = require("modules/file"),
    CONNECT_DISPATCH = require("connect-dispatch/dispatch");

var indexFileData = FILE.read(require.pkg(module.mappings["loader"]).id() + "/programs/program-exporter/resources/index.sample.html")

exports.main = function(options)
{
	var CONNECT = options.stacks.connect.instance;
    
    options.stacks.connect.start(

        CONNECT.createServer(
    		CONNECT_DISPATCH({

                "/exported/": function(request, response)
                {
                	response.end(indexFileData);
                },

                "/exported/.*": CONNECT.static(options.args[0], {
		            maxAge: 0
		        }),

		        "/main.*": JSGI.jsgi(
	                new PROGRAM_SERVER.JSGI({
	                    map: {
	                        "/main.js": {
	                            programPath: options.args[0] + "/program.json"
	                        }
	                    },
	                    trackRoutes: true
	                }).responder(null)            
	            ),

                "/": function(request, response)
                {
                	response.end(indexFileData);
                }
    		})
    	)
    );

	module.print("| Exported Program URL: \0) \0green(\0bold(" + "http://localhost:" + options.port + "/exported/" + "\0)\0) <-(static) " + options.args[0] + "/exported\n");
	module.print("| Development URL (save & refresh): \0) \0green(\0bold(" + "http://localhost:" + options.port + "/" + "\0)\0) <-(dynamic) " + options.args[0] + "/program.json\n");
}
