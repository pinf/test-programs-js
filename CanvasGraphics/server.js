
var JSGI = require("server/vendor/connect/middleware/jsgi"),
    JSGI_RELOAD = require("server/jsgi/reload"),
    PROGRAM_SERVER = require("pinf/program-server"),
    FILE = require("modules/file"),
    CONNECT_DISPATCH = require("connect-dispatch/dispatch");

exports.main = function(options)
{
    var CONNECT = options.stacks.connect.instance;

    options.stacks.connect.start(

        CONNECT.createServer(
    		CONNECT_DISPATCH({

		        "/programs/ui.*": JSGI.jsgi(
	                new PROGRAM_SERVER.JSGI({
	                    map: {
	                        "/programs/ui.js": {
	                            programPath: FILE.dirname(module.id) + "/programs/BrowserFrontend/program.json"
	                        }
	                    },
	                    trackRoutes: true
	                }).responder(null)            
	            ),

	            "/data": JSGI.jsgi(JSGI_RELOAD.app([
                    require.id("backend/app", true),
                    null,   // next jsgi app
                    {       // jsgi options
                    }
                ])),

                "/.*": CONNECT.static(FILE.dirname(module.id) + "/www", {
		            maxAge: 0
		        })
    		})
    	)
    );
}
