require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/BA6A0DF9FE469BA68B149A2CF1308230@/lib/additional-requirejs'), ['common/greetings'], function (require, exports, module) {
({define:function(factory){var name, fExports = factory(require,exports); for(name in fExports) exports[name] = fExports[name]; }}).define(function(require, exports) {

	var GREETINGS = require("common/greetings");

	exports.getGreeting = function(env)
	{
	    return GREETINGS.helloWorld();
	}

});

});
require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/9D7CFD608F80B8F27F4D1C00FBE87895@/package.json'), [], function() { return {"uid":"http://github.com/pinf/test-packages-js/Common/","name":"Common","description":"CommonJS portable test packages for JavaScript.","homepage":"https://github.com/pinf/test-packages-js/Common/","repositories":[{"type":"git","url":"git://github.com/pinf/test-packages-js.git","path":"Common"}],"maintainers":[{"name":"Christoph Dorn","email":"christoph@christophdorn.com","web":"http://www.christophdorn.com/"}],"licenses":[{"scope":"code","type":"MIT"},{"scope":"docs","type":"CC-BY-NC-SA"}]}; });
require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/9D7CFD608F80B8F27F4D1C00FBE87895@/lib/greetings'), [], function (require, exports, module) {

exports.helloWorld = function()
{
    // TODO: Different strings based on default OS language via `require("system").lang`
    return "Hello World";
}

});
__bravojs_loaded_moduleIdentifier = bravojs.realpath(bravojs.mainModuleDir + '/BA6A0DF9FE469BA68B149A2CF1308230@/lib/additional-requirejs');