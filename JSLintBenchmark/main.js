
var JSLINT = require("jslint/jslint").JSLINT;

exports.main = function(env)
{
	var jslintSource = require("text!jslint/jslint");

	var startTime = new Date().getTime();

	module.print("Running JSLint Benchmark by running JSLint against itself ...\n");

	var result = JSLINT(jslintSource, {
		// @see http://af-design.com/blog/2011/01/04/automating-jslint-validation/
		'white':true,		// Strict whitespace (enabled in "good parts")
		'onevar':true,		// Allow one var statement per function (enabled in "good parts")
		'undef':true,		// Disallow undefined variables (enabled in "good parts")
		'nomen':true,		// Disallow dangling _ in identifiers (enabled in "good parts")
		'eqeqeq':true,		// Disallow == and != (enabled in "good parts")
		'plusplus':true,	// Disallow ++ and -- (enabled in "good parts")
		'bitwise':true,		// Disallow bitwise operators (enabled in "good parts")
		'regexp':true,		// Disallow insecure . and [^...] in /RegExp/ (enabled in "good parts")
		'newcap':true,		// Require Initial Caps for constructors (enabled in "good parts")
		'immed':true		// Require parens around immediate invocations (enabled in "good parts")
	});

	var endTime = new Date().getTime();
	
	if (!result)
		module.print("... done with errors\n");

	module.print("... took: " + ((endTime-startTime) / 1000) + " seconds\n");

	if (!result)
		console.log("JSLINT.errors", JSLINT.errors);
}
