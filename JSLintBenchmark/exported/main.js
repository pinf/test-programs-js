if (typeof bravojs == 'undefined') { bravojs = {}; }
if (typeof window != 'undefined' && typeof bravojs.url == 'undefined') {
bravojs.url = window.location.protocol + '//' + window.location.host + '/main.js';
} else if(typeof importScripts != 'undefined' && typeof bravojs.url == 'undefined') {
bravojs.url = location;
}
bravojs.mainModuleDir = /^(https?|resource):\/(.*?)\.js$/.exec(bravojs.url)[2];
bravojs.mainContext = bravojs.mainModuleDir + '/887BE3DFB4516B3595DAB5B68B91EF7E';
bravojs.platform = 'browser';
function dump() { (bravojs.dump || bravojs.print).apply(null, arguments); };

// -- kriskowal Kris Kowal Copyright (C) 2009-2010 MIT License
// -- tlrobinson Tom Robinson
// dantman Daniel Friesen

/*!
    Copyright (c) 2009, 280 North Inc. http://280north.com/
    MIT License. http://github.com/280north/narwhal/blob/master/README.md
*/

// Brings an environment as close to ECMAScript 5 compliance
// as is possible with the facilities of erstwhile engines.

// ES5 Draft
// http://www.ecma-international.org/publications/files/drafts/tc39-2009-050.pdf

// NOTE: this is a draft, and as such, the URL is subject to change.  If the
// link is broken, check in the parent directory for the latest TC39 PDF.
// http://www.ecma-international.org/publications/files/drafts/

// Previous ES5 Draft
// http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
// This is a broken link to the previous draft of ES5 on which most of the
// numbered specification references and quotes herein were taken.  Updating
// these references and quotes to reflect the new document would be a welcome
// volunteer project.

//
// Array
// =====
//

// ES5 15.4.3.2 
if (!Array.isArray) {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    };
}

// ES5 15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach =  function(block, thisObject) {
        var len = this.length >>> 0;
        for (var i = 0; i < len; i++) {
            if (i in this) {
                block.call(thisObject, this[i], i, this);
            }
        }
    };
}

// ES5 15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function(fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
          throw new TypeError();

        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this)
                res[i] = fun.call(thisp, this[i], i, this);
        }

        return res;
    };
}

// ES5 15.4.4.20
if (!Array.prototype.filter) {
    Array.prototype.filter = function (block /*, thisp */) {
        var values = [];
        var thisp = arguments[1];
        for (var i = 0; i < this.length; i++)
            if (block.call(thisp, this[i]))
                values.push(this[i]);
        return values;
    };
}

// ES5 15.4.4.16
if (!Array.prototype.every) {
    Array.prototype.every = function (block /*, thisp */) {
        var thisp = arguments[1];
        for (var i = 0; i < this.length; i++)
            if (!block.call(thisp, this[i]))
                return false;
        return true;
    };
}

// ES5 15.4.4.17
if (!Array.prototype.some) {
    Array.prototype.some = function (block /*, thisp */) {
        var thisp = arguments[1];
        for (var i = 0; i < this.length; i++)
            if (block.call(thisp, this[i]))
                return true;
        return false;
    };
}

// ES5 15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(fun /*, initial*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        // no value to return if no initial value and an empty array
        if (len == 0 && arguments.length == 1)
            throw new TypeError();

        var i = 0;
        if (arguments.length >= 2) {
            var rv = arguments[1];
        } else {
            do {
                if (i in this) {
                    rv = this[i++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++i >= len)
                    throw new TypeError();
            } while (true);
        }

        for (; i < len; i++) {
            if (i in this)
                rv = fun.call(null, rv, this[i], i, this);
        }

        return rv;
    };
}

// ES5 15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function(fun /*, initial*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        // no value to return if no initial value, empty array
        if (len == 0 && arguments.length == 1)
            throw new TypeError();

        var i = len - 1;
        if (arguments.length >= 2) {
            var rv = arguments[1];
        } else {
            do {
                if (i in this) {
                    rv = this[i--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--i < 0)
                    throw new TypeError();
            } while (true);
        }

        for (; i >= 0; i--) {
            if (i in this)
                rv = fun.call(null, rv, this[i], i, this);
        }

        return rv;
    };
}

// ES5 15.4.4.14
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (value /*, fromIndex */ ) {
        var length = this.length;
        if (!length)
            return -1;
        var i = arguments[1] || 0;
        if (i >= length)
            return -1;
        if (i < 0)
            i += length;
        for (; i < length; i++) {
            if (!Object.prototype.hasOwnProperty.call(this, i))
                continue;
            if (value === this[i])
                return i;
        }
        return -1;
    };
}

// ES5 15.4.4.15
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (value /*, fromIndex */) {
        var length = this.length;
        if (!length)
            return -1;
        var i = arguments[1] || length;
        if (i < 0)
            i += length;
        i = Math.min(i, length - 1);
        for (; i >= 0; i--) {
            if (!Object.prototype.hasOwnProperty.call(this, i))
                continue;
            if (value === this[i])
                return i;
        }
        return -1;
    };
}

//
// Object
// ======
// 

// ES5 15.2.3.2
if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function (object) {
        return object.__proto__;
        // or undefined if not available in this engine
    };
}

// ES5 15.2.3.3
if (!Object.getOwnPropertyDescriptor) {
    Object.getOwnPropertyDescriptor = function (object) {
        return {}; // XXX
    };
}

// ES5 15.2.3.4
if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function (object) {
        return Object.keys(object);
    };
}

// ES5 15.2.3.5 
if (!Object.create) {
    Object.create = function(prototype, properties) {
        if (typeof prototype != "object" || prototype === null)
            throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
        function Type() {};
        Type.prototype = prototype;
        var object = new Type();
        if (typeof properties !== "undefined")
            Object.defineProperties(object, properties);
        return object;
    };
}

// ES5 15.2.3.6
if (!Object.defineProperty) {
    Object.defineProperty = function(object, property, descriptor) {
        var has = Object.prototype.hasOwnProperty;
        if (typeof descriptor == "object" && object.__defineGetter__) {
            if (has.call(descriptor, "value")) {
                if (!object.__lookupGetter__(property) && !object.__lookupSetter__(property))
                    // data property defined and no pre-existing accessors
                    object[property] = descriptor.value;
                if (has.call(descriptor, "get") || has.call(descriptor, "set"))
                    // descriptor has a value property but accessor already exists
                    throw new TypeError("Object doesn't support this action");
            }
            // fail silently if "writable", "enumerable", or "configurable"
            // are requested but not supported
            /*
            // alternate approach:
            if ( // can't implement these features; allow false but not true
                !(has.call(descriptor, "writable") ? descriptor.writable : true) ||
                !(has.call(descriptor, "enumerable") ? descriptor.enumerable : true) ||
                !(has.call(descriptor, "configurable") ? descriptor.configurable : true)
            )
                throw new RangeError(
                    "This implementation of Object.defineProperty does not " +
                    "support configurable, enumerable, or writable."
                );
            */
            else if (typeof descriptor.get == "function")
                object.__defineGetter__(property, descriptor.get);
            if (typeof descriptor.set == "function")
                object.__defineSetter__(property, descriptor.set);
        }
        return object;
    };
}

// ES5 15.2.3.7
if (!Object.defineProperties) {
    Object.defineProperties = function(object, properties) {
        for (var property in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, property))
                Object.defineProperty(object, property, properties[property]);
        }
        return object;
    };
}

// ES5 15.2.3.8
if (!Object.seal) {
    Object.seal = function (object) {
        return object;
    };
}

// ES5 15.2.3.9
if (!Object.freeze) {
    Object.freeze = function (object) {
        return object;
    };
}

// ES5 15.2.3.10
if (!Object.preventExtensions) {
    Object.preventExtensions = function (object) {
        return object;
    };
}

// ES5 15.2.3.11
if (!Object.isSealed) {
    Object.isSealed = function (object) {
        return false;
    };
}

// ES5 15.2.3.12
if (!Object.isFrozen) {
    Object.isFrozen = function (object) {
        return false;
    };
}

// ES5 15.2.3.13
if (!Object.isExtensible) {
    Object.isExtensible = function (object) {
        return true;
    };
}

// ES5 15.2.3.14
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}

//
// Date
// ====
//

// ES5 15.9.5.43
// Format a Date object as a string according to a subset of the ISO-8601 standard.
// Useful in Atom, among other things.
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
        return (
            this.getFullYear() + "-" +
            (this.getMonth() + 1) + "-" +
            this.getDate() + "T" +
            this.getHours() + ":" +
            this.getMinutes() + ":" +
            this.getSeconds() + "Z"
        ); 
    }
}

// ES5 15.9.4.4
if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    };
}

// ES5 15.9.5.44
if (!Date.prototype.toJSON) {
    Date.prototype.toJSON = function (key) {
        // This function provides a String representation of a Date object for
        // use by JSON.stringify (15.12.3). When the toJSON method is called
        // with argument key, the following steps are taken:

        // 1.  Let O be the result of calling ToObject, giving it the this
        // value as its argument.
        // 2. Let tv be ToPrimitive(O, hint Number).
        // 3. If tv is a Number and is not finite, return null.
        // XXX
        // 4. Let toISO be the result of calling the [[Get]] internal method of
        // O with argument "toISOString".
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.
        if (typeof this.toISOString != "function")
            throw new TypeError();
        // 6. Return the result of calling the [[Call]] internal method of
        // toISO with O as the this value and an empty argument list.
        return this.toISOString();

        // NOTE 1 The argument is ignored.

        // NOTE 2 The toJSON function is intentionally generic; it does not
        // require that its this value be a Date object. Therefore, it can be
        // transferred to other kinds of objects for use as a method. However,
        // it does require that any such object have a toISOString method. An
        // object is free to use the argument key to filter its
        // stringification.
    };
}

// 15.9.4.2 Date.parse (string)
// 15.9.1.15 Date Time String Format
// Date.parse
// based on work shared by Daniel Friesen (dantman)
// http://gist.github.com/303249
if (isNaN(Date.parse("T00:00"))) {
    // XXX global assignment won't work in embeddings that use
    // an alternate object for the context.
    Date = (function(NativeDate) {

        // Date.length === 7
        var Date = function(Y, M, D, h, m, s, ms) {
            var length = arguments.length;
            if (this instanceof NativeDate) {
                var date = length === 1 && String(Y) === Y ? // isString(Y)
                    // We explicitly pass it through parse:
                    new NativeDate(Date.parse(Y)) :
                    // We have to manually make calls depending on argument
                    // length here
                    length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :
                    length >= 4 ? new NativeDate(Y, M, D, h) :
                    length >= 3 ? new NativeDate(Y, M, D) :
                    length >= 2 ? new NativeDate(Y, M) :
                    length >= 1 ? new NativeDate(Y) :
                                  new NativeDate();
                // Prevent mixups with unfixed Date object
                date.constructor = Date;
                return date;
            }
            return NativeDate.apply(this, arguments);
        };

        // 15.9.1.15 Date Time String Format
        var isoDateExpression = new RegExp("^" +
            "(?:" + // optional year-month-day
                "(" + // year capture
                    "(?:[+-]\\d\\d)?" + // 15.9.1.15.1 Extended years
                    "\\d\\d\\d\\d" + // four-digit year
                ")" +
                "(?:-" + // optional month-day
                    "(\\d\\d)" + // month capture
                    "(?:-" + // optional day
                        "(\\d\\d)" + // day capture
                    ")?" +
                ")?" +
            ")?" + 
            "(?:T" + // hour:minute:second.subsecond
                "(\\d\\d)" + // hour capture
                ":(\\d\\d)" + // minute capture
                "(?::" + // optional :second.subsecond
                    "(\\d\\d)" + // second capture
                    "(?:\\.(\\d\\d\\d))?" + // milisecond capture
                ")?" +
            ")?" +
            "(?:" + // time zone
                "Z|" + // UTC capture
                "([+-])(\\d\\d):(\\d\\d)" + // timezone offset
                // capture sign, hour, minute
            ")?" +
        "$");

        // Copy any custom methods a 3rd party library may have added
        for (var key in NativeDate)
            Date[key] = NativeDate[key];

        // Copy "native" methods explicitly; they may be non-enumerable
        Date.now = NativeDate.now;
        Date.UTC = NativeDate.UTC;
        Date.prototype = NativeDate.prototype;
        Date.prototype.constructor = Date;

        // Upgrade Date.parse to handle the ISO dates we use
        // TODO review specification to ascertain whether it is
        // necessary to implement partial ISO date strings.
        Date.parse = function(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                match.shift(); // kill match[0], the full match
                // recognize times without dates before normalizing the
                // numeric values, for later use
                var timeOnly = match[0] === undefined;
                // parse numerics
                for (var i = 0; i < 10; i++) {
                    // skip + or - for the timezone offset
                    if (i === 7)
                        continue;
                    // Note: parseInt would read 0-prefix numbers as
                    // octal.  Number constructor or unary + work better
                    // here:
                    match[i] = +(match[i] || (i < 3 ? 1 : 0));
                    // match[1] is the month. Months are 0-11 in JavaScript
                    // Date objects, but 1-12 in ISO notation, so we
                    // decrement.
                    if (i === 1)
                        match[i]--;
                }
                // if no year-month-date is provided, return a milisecond
                // quantity instead of a UTC date number value.
                if (timeOnly)
                    return ((match[3] * 60 + match[4]) * 60 + match[5]) * 1000 + match[6];

                // account for an explicit time zone offset if provided
                var offset = (match[8] * 60 + match[9]) * 60 * 1000;
                if (match[6] === "-")
                    offset = -offset;

                return NativeDate.UTC.apply(this, match.slice(0, 7)) + offset;
            }
            return NativeDate.parse.apply(this, arguments);
        };

        return Date;
    })(Date);
}

// 
// Function
// ========
// 

// ES-5 15.3.4.5
// http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
var slice = Array.prototype.slice;
if (!Function.prototype.bind) {
    Function.prototype.bind = function (that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        // XXX this gets pretty close, for all intents and purposes, letting 
        // some duck-types slide
        if (typeof target.apply != "function" || typeof target.call != "function")
            return new TypeError();
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        var args = slice.call(arguments);
        // 4. Let F be a new native ECMAScript object.
        // 9. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 10. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 11. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 12. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        // 13. The [[Scope]] internal property of F is unused and need not
        //   exist.
        var bound = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.

                var self = Object.create(target.prototype);
                target.apply(self, args.concat(slice.call(arguments)));
                return self;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the list
                //   boundArgs in the same order followed by the same values as
                //   the list ExtraArgs in the same order. 5.  Return the
                //   result of calling the [[Call]] internal method of target
                //   providing boundThis as the this value and providing args
                //   as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.call.apply(
                    target,
                    args.concat(slice.call(arguments))
                );

            }

        };
        // 5. Set the [[TargetFunction]] internal property of F to Target.
        // extra:
        bound.bound = target;
        // 6. Set the [[BoundThis]] internal property of F to the value of
        // thisArg.
        // extra:
        bound.boundTo = that;
        // 7. Set the [[BoundArgs]] internal property of F to A.
        // extra:
        bound.boundArgs = args;
        bound.length = (
            // 14. If the [[Class]] internal property of Target is "Function", then
            typeof target == "function" ?
            // a. Let L be the length property of Target minus the length of A.
            // b. Set the length own property of F to either 0 or L, whichever is larger.
            Math.max(target.length - args.length, 0) :
            // 15. Else set the length own property of F to 0.
            0
        )
        // 16. The length own property of F is given attributes as specified in
        //   15.3.5.1.
        // TODO
        // 17. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 18. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Value]]: null,
        //   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
        //   false}, and false.
        // TODO
        // 19. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Value]]: null,
        //   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
        //   false}, and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property.
        // XXX can't delete it in pure-js.
        return bound;
    };
}

//
// String
// ======
//

// ES5 15.5.4.20
if (!String.prototype.trim) {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    var trimBeginRegexp = /^\s\s*/;
    var trimEndRegexp = /\s\s*$/;
    String.prototype.trim = function () {
        return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
    };
}


/**
 *  This file implements BravoJS, a CommonJS Modules/2.0 environment.
 *
 *  Copyright (c) 2010, PageMail, Inc.
 *  Wes Garland, wes@page.ca
 *  MIT License
 *
 *    - Initial implementation
 *
 *  Copyright (c) 2011, Christoph Dorn
 *  Christoph Dorn, christoph@christophdorn.com
 *  MIT License
 *
 *    - Added package and mappings support
 *    - Various tweaks
 *
 */

function bravojs_init(bravojs,    /**< Namespace object for this implementation */
                      window)
{
try {

bravojs.window = window;

if (!bravojs.hasOwnProperty("errorReporter"))
{
  bravojs.errorReporter = function bravojs_defaultDrrorReporter(e)
  {
    if (typeof alert != "undefined")
        alert(" * BravoJS: " + e + "\n" + e.stack);
    throw(e);
  }
}

/** Reset the environment so that a new main module can be loaded */
bravojs.reset = function bravojs_reset(mainModuleDir, plugins)
{
  if (!mainModuleDir)
  {
    if (typeof bravojs.mainModuleDir != "undefined")
      mainModuleDir = bravojs.mainModuleDir;
    else
      mainModuleDir = bravojs.dirname(bravojs.URL_toId(window.location.href + ".js", true));
  }

  bravojs.requireMemo 			= {};	/**< Module exports, indexed by canonical name */
  bravojs.pendingModuleDeclarations	= {};	/**< Module.declare arguments, indexed by canonical name */
  bravojs.mainModuleDir 		= mainModuleDir;
  bravojs.plugins = plugins || [];
  bravojs.contexts = {};
  bravojs.activeContexts = [];

  delete bravojs.Module.prototype.main;
  delete bravojs.scriptTagMemo;
  delete bravojs.scriptTagMemoIE;

  /* The default context. Needed before bravojs.Module() can be called. */
  bravojs.makeContext("_");

  /** Extra-module environment */
  bravojs.module = window.module = new bravojs.Module('', []);
  bravojs.require = window.require = bravojs.requireFactory(bravojs.mainModuleDir, [], bravojs.module);

  /* Module.declare function which handles main modules inline SCRIPT tags.
   * This function gets deleted as soon as it runs, allowing the module.declare
   * from the prototype take over. Modules created from this function have
   * the empty string as module.id.
   */
  bravojs.module.declare = function main_module_declare(dependencies, moduleFactory)
  {
    if (typeof dependencies === "function")
    {
      moduleFactory = dependencies;
      dependencies = [];
    }

    bravojs.initializeMainModule(dependencies, moduleFactory, '');
  }
}

/** Print to text to stdout */
function bravojs_print()
{
  var output="";
  var i;
  var stdout;

  for (i=0; i < arguments.length; i++)
    output += arguments[i] + (i===arguments.length - 1 ? "" : " ");
  output.replace(/\t/, "        ");

  if (typeof window.document != "undefined" && (stdout = window.document.getElementById('stdout')))
  {
    output += "\n";

    if (typeof stdout.value !== "undefined")
    {
      stdout.value += output;
      if (stdout.focus)
        stdout.focus();

      if (stdout.tagName === "TEXTAREA")
        stdout.scrollTop = stdout.scrollHeight;
    }
    else
    {
      if (typeof stdout.innerText !== "undefined")
      {
        stdout.innerText = stdout.innerText.slice(0,-1) + output + " "; 	/* IE normalizes trailing newlines away */
      }
      else
        stdout.textContent += output;
    }
  }
  else if (typeof console === "object" && console.print)
  {
    console.print(output);
  }
  else if (typeof console === "object" && console.log)
  {
    console.log(output);
  }
  // WebWorker
  else if (typeof importScripts === "function" && typeof postMessage === "function")
  {
      postMessage({type: "log", data: output});
  }
  else
    alert(" * BravoJS stdout: " + output);
}
if (typeof bravojs.print === "undefined")
    bravojs.print = bravojs_print;

bravojs.registerPlugin = function(plugin)
{
    plugin.bravojs = bravojs;
    bravojs.plugins.push(plugin);
    if (typeof plugin.init == "function")
      plugin.init();
}

bravojs.callPlugins = function(method, args)
{
  var i, ret;
  for (i = 0 ; i < bravojs.plugins.length ; i++ )
  {
    if (typeof bravojs.plugins[i][method] != "undefined" &&
        typeof (ret = bravojs.plugins[i][method].apply(bravojs.plugins[i], args)) != "undefined")
        break;
  }
  return ret;
}

/** Canonicalize path, compacting slashes and dots per basic UNIX rules.
 *  Treats paths with trailing slashes as though they end with INDEX instead.
 *  Not rigorous.
 */
bravojs.realpath = function bravojs_realpath(path, index)
{
  if (typeof index === "undefined")
    index = "INDEX";
  if (typeof path !== "string")
    path = path.toString();

  var oldPath = path.split('/');
  var newPath = [];
  var i;

  if (path.charAt(path.length - 1) === '/' && index)
    oldPath.push(index);

  for (i = 0; i < oldPath.length; i++)
  {
    if (oldPath[i] == '.' || !oldPath[i].length)
      continue;
    if (oldPath[i] == '..')
    {
      if (!newPath.length)
	throw new Error("Invalid module path: " + path);
      newPath.pop();
      continue;
    }
    newPath.push(oldPath[i]);
  }

  newPath.unshift('');
  return newPath.join('/');
}

/** Extract the non-directory portion of a path */
bravojs.basename = function bravojs_basename(path)
{
  if (typeof path !== "string")
    path = path.toString();

  var s = path.split('/').slice(-1).join('/');
  if (!s)
    return path;
  return s;
}

/** Extract the directory portion of a path */
bravojs.dirname = function bravojs_dirname(path)
{
  if (typeof path !== "string")
    path = path.toString();

  if (path.charAt(path.length - 1) === '/')
    return path.slice(0,-1);

  var s = path.split('/').slice(0,-1).join('/');
  if (!s)
    return ".";

  return s;
}

/** Turn a module identifier and module directory into a canonical
 *  module.id.
 */
bravojs.makeModuleId = function makeModuleId(relativeModuleDir, moduleIdentifier)
{
  return bravojs.contextForId(relativeModuleDir, true).resolveId(moduleIdentifier, relativeModuleDir);
}

/** Turn a script URL into a canonical module.id */
bravojs.URL_toId = function URL_toId(moduleURL, relaxValidation)
{
  var i;

  /* Treat the whole web as our module repository.
   * 'http://www.page.ca/a/b/module.js' has id '/www.page.ca/a/b/module'. 
   */
  i = moduleURL.indexOf("://");
  if (i == -1)
    throw new Error("Invalid module URL: " + moduleURL);
  id = moduleURL.slice(i + 2);

  id = bravojs.realpath(id);
  if ((i = id.indexOf('?')) != -1)
    id = id.slice(0, i);
  if ((i = id.indexOf('#')) != -1)
    id = id.slice(0, i);

  if (!relaxValidation && (id.slice(-3) != ".js"))
    throw new Error("Invalid module URL: " + moduleURL);
  id = id.slice(0,-3);

  return id;
}

/** Normalize a dependency array so that only unique and previously unprovided 
 *  dependencies appear in the output list. The output list also canonicalizes
 *  the module names relative to the current require. Labeled dependencies are
 *  unboxed.
 *  If relativeModuleDir is set it is used to resolve relative dependencies.
 */
bravojs.normalizeDependencyArray = function bravojs_normalizeDependencyArray(dependencies, relativeModuleDir)
{
  var normalizedDependencies = [];
  var i, label;

  function addNormal(moduleIdentifier)
  {
    var id = moduleIdentifier;

    if (typeof id != "string" || id.charAt(0) != "/")
      id = bravojs.contextForId(relativeModuleDir, true).resolveId(id, relativeModuleDir);

    if (id === null)
      return;

    if (bravojs.requireMemo[id] || bravojs.pendingModuleDeclarations[id])
      return;

    normalizedDependencies.push(id);
  }

  for (i=0; i < dependencies.length; i++)
  {
    if (dependencies[i])
    {
      switch(typeof dependencies[i])
      {
        case "object":
          for (label in dependencies[i])
          {
            if (dependencies[i].hasOwnProperty(label))
              addNormal(dependencies[i][label]);
          }
          break;

        case "string":
          addNormal(dependencies[i]);
          break;

        default:
          throw new Error("Invalid dependency array value at position " + (i+1));
      }
    }
  }

  return normalizedDependencies;
}

/** Get a context for a given module ID used to resolve the ID.
 * Plugins should override this function to provide additional contexts.
 */
bravojs.contextForId = function bravojs_contextForId(id, onlyCreateIfDelimited)
{
  return bravojs.contexts["_"];
}

/** Make a new context used to resolve module IDs. */
bravojs.makeContext = function bravojs_makeContext(id)
{
  return bravojs.contexts[id] = new bravojs.Context(id);
}

/** A Context object used to resolve IDs. */
bravojs.Context = function bravojs_Context(id)
{
  this.id = id;
}

bravojs.Context.prototype.resolveId = function bravojs_Context_resolveId(moduleIdentifier, relativeModuleDir)
{
  var id;

  if (moduleIdentifier === '')  /* Special case for main module */
    return '';

  if (typeof moduleIdentifier !== "string")
    throw new Error("Invalid module identifier: " + moduleIdentifier);

  if (moduleIdentifier.charAt(0) === '/')
  {
    /* Absolute path. Not required by CommonJS but it makes dependency list optimization easier */
    id = moduleIdentifier;
  }
  else
  if ((moduleIdentifier.indexOf("./") == 0) || (moduleIdentifier.indexOf("../") == 0))
  {
    /* Relative module path -- relative to relativeModuleDir */
    id = relativeModuleDir + "/" + moduleIdentifier;
  }
  else
  {
    /* Top-level module. Since we don't implement require.paths,
     *  make it relative to the main module.
     */
    id = bravojs.mainModuleDir + "/" + moduleIdentifier;
  }

  return bravojs.realpath(id);
}

/** Provide a module to the environment 
 *  @param	dependencies		A dependency array
 *  @param	moduleFactoryFunction	The function which will eventually be invoked
 *					to decorate the module's exports. If not specified,
 *					we assume the factory has already been memoized in
 *					the bravojs.pendingModuleDeclarations object.
 *  @param	id			The module.id of the module we're providing
 *  @param	callback		Optional function to run after the module has been
 *					provided to the environment
 */
bravojs.provideModule = function bravojs_provideModule(dependencies, moduleFactory, 
						       id, callback)
{
  /* Memoize the the factory, satistfy the dependencies, and invoke the callback */
  if (moduleFactory)
    bravojs.require.memoize(id, dependencies, moduleFactory);

  if (dependencies)
  {
    bravojs.module.provide(bravojs.normalizeDependencyArray(dependencies, id?bravojs.dirname(id):bravojs.mainModuleDir), callback);
  }
  else
  {
    if (callback)
      callback();
  }
}

/** Initialize a module. This makes the exports object available to require(),
 *  runs the module factory function, and removes the factory function from
 *  the pendingModuleDeclarations object.
 */
bravojs.initializeModule = function bravojs_initializeModule(id)
{
  var moduleDir     = id ? bravojs.dirname(id) : bravojs.mainModuleDir;
  var moduleFactory = bravojs.pendingModuleDeclarations[id].moduleFactory;
  var dependencies  = bravojs.pendingModuleDeclarations[id].dependencies;
  var require, exports, module;

  delete bravojs.pendingModuleDeclarations[id];

  exports = bravojs.requireMemo[id] = {};
  module  = new bravojs.Module(id, dependencies);

  if (typeof module.augment == "function")
    module.augment();

  require = bravojs.requireFactory(moduleDir, dependencies, module);

  moduleFactory(require, exports, module);
}

/** Search the module memo and return the correct module's exports, or throw.
 *  Searching the module memo will initialize a matching pending module factory.
 */
bravojs.requireModule = function bravojs_requireModule(parentModuleDir, moduleIdentifier)
{
  /* Remove all active contexts as they are not needed any more (load cycle complete) */
  bravojs.activeContexts = [];

  var id = bravojs.makeModuleId(parentModuleDir, moduleIdentifier);

  var exports = bravojs.callPlugins("requireModule", [id]);
  if (typeof exports != "undefined")
  {
    if (exports === true)
      return bravojs.requireMemo[id];
    return bravojs.requireMemo[id] = exports;
  }

  /* If id is false the module is not available */
  if (id === false)
    return null;

  if (!bravojs.requireMemo[id] && bravojs.pendingModuleDeclarations[id])
    bravojs.initializeModule(id);

  if (id === null || !bravojs.requireMemo[id])
    throw new Error("Module " + id + " is not available.");

  return bravojs.requireMemo[id];
}

/** Create a new require function, closing over it's path so that relative
 *  modules work as expected.
 */
bravojs.requireFactory = function bravojs_requireFactory(moduleDir, dependencies, module)
{
  var deps, i, label;

  function getContextSensitiveModuleDir()
  {
    var contextId;
    if (bravojs.activeContexts.length > 0)
      contextId = bravojs.activeContexts[bravojs.activeContexts.length-1].id;
    if (typeof contextId == "undefined" || !contextId)
      contextId = moduleDir;
    else
    if (contextId == "_")
      contextId = bravojs.mainModuleDir;
    return contextId;
  }

  function addLabeledDep(moduleIdentifier)
  {
    deps[label] = function bravojs_labeled_dependency() 
    { 
      return bravojs.requireModule(getContextSensitiveModuleDir(), moduleIdentifier);
    }
  }

  if (dependencies)
  {
    for (i=0; i < dependencies.length; i++)
    {
      if (typeof dependencies[i] !== "object")
	continue;

      for (label in dependencies[i])
      {
	if (dependencies[i].hasOwnProperty(label))
	{
	  if (!deps)
	    deps = {};
	  addLabeledDep(dependencies[i][label]);
	}
      }
    }
  }

  var newRequire = function require(moduleIdentifier) 
  {
    if (deps && deps[moduleIdentifier])
      return deps[moduleIdentifier]();
    return bravojs.requireModule(getContextSensitiveModuleDir(), moduleIdentifier);
  };

  var ret = bravojs.callPlugins("newRequire", [{
      module: module,
      deps: deps,
      getContextSensitiveModuleDir: getContextSensitiveModuleDir
  }]);
  if (typeof ret != "undefined")
    newRequire = ret;

  newRequire.paths = [bravojs.mainModuleDir];

  if (typeof bravojs.platform != "undefined")
      newRequire.platform = bravojs.platform;

  newRequire.id = function require_id(moduleIdentifier, unsanitized)
  {
    var contextId = getContextSensitiveModuleDir(),
        context = bravojs.contextForId(contextId, true),
        id = context.resolveId(moduleIdentifier, contextId);
    if (unsanitized)
      return id;
    return bravojs.callPlugins("sanitizeId", [id]) || id;
  }

  newRequire.uri = function require_uri(moduleIdentifierPath)
  {
    var basename = bravojs.basename(moduleIdentifierPath),
        parts = basename.split(".");
    var uri = window.location.protocol + "/" + newRequire.id(moduleIdentifierPath, true);
    if (parts.length > 1)
        uri += "." + parts.slice(1).join(".");
    return uri;
  }

  newRequire.canonicalize = function require_canonicalize(moduleIdentifier)
  {
    var id = bravojs.makeModuleId(getContextSensitiveModuleDir(), moduleIdentifier);

    if (id === '')
      throw new Error("Cannot canonically name the resource bearing this main module");

    return window.location.protocol + "/" + id + ".js";
  }

  newRequire.memoize = function require_memoize(id, dependencies, moduleFactory)
  {
    bravojs.pendingModuleDeclarations[id] = { moduleFactory: moduleFactory, dependencies: dependencies };
  }

  newRequire.isMemoized = function require_isMemoized(id)
  {
    return (bravojs.pendingModuleDeclarations[id] || bravojs.requireMemo[id]) ? true : false;
  }

  newRequire.getMemoized = function require_getMemoized(id)
  {
    return bravojs.pendingModuleDeclarations[id] || bravojs.requireMemo[id];
  }

  bravojs.callPlugins("augmentNewRequire", [newRequire, {
      module: module,
      getContextSensitiveModuleDir: getContextSensitiveModuleDir
  }]);

  return newRequire;
}

/** Module object constructor 
 *
 *  @param	id		The canonical module id
 *  @param	dependencies	The dependency list passed to module.declare
 */
bravojs.Module = function bravojs_Module(id, dependencies)
{
  this._id       = id;
  this.id        = bravojs.callPlugins("sanitizeId", [id]) || id;
  this["protected"] = void 0;
  this.dependencies = dependencies;
  this.print = bravojs.print;

  var i, label;

  /* Create module.deps array */
  this.deps = {};

  for (i=0; i < dependencies.length; i++)
  {
    if (typeof dependencies[i] === "string")
      continue;

    if (typeof dependencies[i] !== "object")
      throw new Error("Invalid " + typeof dependencies[i] + " element in dependency array at position " + i);

    /* Labeled dependency object */
    for (label in dependencies[i])
    {
      if (dependencies[i].hasOwnProperty(label))
      {
        this.deps[label] = function bravojs_lambda_module_deps() 
        {
          bravojs.requireModule(bravojs.dirname(id), dependencies[i][label]);
        };
      }
    }
  }
}

/** A module.declare suitable for use during DOM SCRIPT-tag insertion.
 * 
 *  The general technique described below was invented by Kris Zyp.
 *
 *  In non-IE browsers, the script's onload event fires as soon as the 
 *  script finishes running, so we just memoize the declaration without
 *  doing anything. After the script is loaded, we do the "real" work
 *  as the onload event also supplies the script's URI, which we use
 *  to generate the canonical module id.
 * 
 *  In IE browsers, the event can fire when the tag is being inserted
 *  in the DOM, or sometime thereafter. In the first case, we read a 
 *  memo we left behind when we started inserting the tag; in the latter,
 *  we look for interactive scripts.
 *
 *  Event			Action		
 *  -------------------------   ------------------------------------------------------------------------------------
 *  Inject Script Tag		onload event populated with URI
 *				scriptTagMemo populated with URI
 *  IE pulls from cache		cname derived in module.declare from scriptTagMemo, invoke provideModule
 *  IE pulls from http		cname derived in module.declare from script.src, invoke provideModule
 *  Non-IE loads script		onload event triggered, most recent incomplete module.declare is completed, 
 *				deriving the cname from the onload event.
 */
bravojs.Module.prototype.declare = function bravojs_Module_declare(dependencies, moduleFactory)
{
  var stm;

  if (typeof dependencies === "function")
  {
    moduleFactory = dependencies;
    dependencies = [];
  }

  stm = bravojs.scriptTagMemo;
  if (stm && stm.id === '')		/* Static HTML module */
  {
    delete bravojs.scriptTagMemo;
    bravojs.provideModule(dependencies, moduleFactory, stm.id, stm.callback);    
    return;
  }

  if (stm)
    throw new Error("Bug");

  if (document.addEventListener)	/* non-IE, defer work to script's onload event which will happen immediately */
  {
    bravojs.scriptTagMemo = { dependencies: dependencies, moduleFactory: moduleFactory };
    return;
  }

  stm = bravojs.scriptTagMemoIE;
  delete bravojs.scriptTagMemoIE;

  if (stm && stm.id) 			/* IE, pulling from cache */
  {
    bravojs.provideModule(dependencies, moduleFactory, stm.id, stm.callback);
    return;
  }

  /* Assume IE fetching from remote */
  var scripts = document.getElementsByTagName("SCRIPT");
  var i;

  for (i = 0; i < scripts.length; i++)
  {
    if (scripts[i].readyState === "interactive")
    {
      bravojs.provideModule(dependencies, moduleFactory, bravojs.URL_toId(scripts[i].src), stm.callback);
      return;
    }
  }

  throw new Error("Could not determine module's canonical name from script-tag loader");
}

/** A module.provide suitable for a generic web-server back end.  Loads one module at
 *  a time in continuation-passing style, eventually invoking the passed callback.
 * 
 *  A more effecient function could be written to take advantage of a web server
 *  which might aggregate and transport more than one module per HTTP request.
 *
 *  @param	dependencies	A dependency array
 *  @param	callback	The callback to invoke once all dependencies have been
 *				provided to the environment. Optional.
 */
bravojs.Module.prototype.provide = function bravojs_Module_provide(dependencies, callback)
{
  var self = arguments.callee;

  if ((typeof dependencies !== "object") || (dependencies.length !== 0 && !dependencies.length))
    throw new Error("Invalid dependency array: " + dependencies.toString());

  dependencies = bravojs.normalizeDependencyArray(dependencies, (this._id)?this._id:bravojs.mainModuleDir);

  if (dependencies.length === 0)
  {
    if (callback)
      callback();
    return;
  }

  bravojs.activeContexts.push(bravojs.contextForId(dependencies[0], true));

  bravojs.module.load(dependencies[0], function bravojs_lambda_provideNextDep() { self(dependencies.slice(1), callback) });

  bravojs.activeContexts.pop();
}

/** A module.load suitable for a generic web-server back end. The module is
 *  loaded by injecting a SCRIPT tag into the DOM.
 *
 *  @param	moduleIdentifier	Module to load
 *  @param	callback		Callback to invoke when the module has loaded.
 *
 *  @see	bravojs_Module_declare
 */
bravojs.Module.prototype.load = function bravojs_Module_load(moduleIdentifier, callback)
{
  if (window.module.hasOwnProperty("declare"))
    delete window.module.declare;

  var script = document.createElement('SCRIPT');
  script.setAttribute("type","text/javascript");
  script.setAttribute("src", bravojs.require.canonicalize(moduleIdentifier) + "?1");

  if (document.addEventListener)	/* Non-IE; see bravojs_Module_declare */
  {
    script.onload = function bravojs_lambda_script_onload()
    {
      /* stm contains info from recently-run module.declare() */
      var stm = bravojs.scriptTagMemo;
      if (typeof stm === "undefined")
        throw new Error("Module '" + moduleIdentifier + "' did not invoke module.declare!");

      delete bravojs.scriptTagMemo;

      if (typeof moduleIdentifier == "object")
      {
        /* The id is a mapping locator and needs to be resolved. */
        moduleIdentifier = bravojs.makeModuleId(bravojs.mainModuleDir, moduleIdentifier);
      }

      bravojs.activeContexts.push(bravojs.contextForId(moduleIdentifier, true));

      bravojs.provideModule(stm.dependencies, stm.moduleFactory, bravojs.require.id(moduleIdentifier, true), function()
      {
        callback(moduleIdentifier);
      });

      bravojs.activeContexts.pop();
    }

    script.onerror = function bravojs_lambda_script_onerror() 
    { 
      var id = bravojs.require.id(moduleIdentifier, true);
      bravojs.pendingModuleDeclarations[id] = null;	/* Mark null so we don't try to run, but also don't try to reload */
      callback();
    }
  }
  else
  {
    bravojs.scriptTagMemoIE = { moduleIdentifier: moduleIdentifier, callback: callback };

    script.onreadystatechange = function bravojs_lambda_script_onreadystatechange()
    {
      if (this.readyState != "loaded")
        return;

      /* failed load below */
      var id = bravojs.require.id(moduleIdentifier, true);

      if (!bravojs.pendingModuleDeclarations[id] && !bravojs.requireMemo[id] && id === bravojs.scriptTagMemoIE.moduleIdentifier)
      {
        bravojs.pendingModuleDeclarations[id] = null;	/* Mark null so we don't try to run, but also don't try to reload */
        callback();
      }
    }
  }

  document.getElementsByTagName("HEAD")[0].appendChild(script);
}

bravojs.Module.prototype.eventually = function(cb) { cb(); };

/** Shim the environment to have CommonJS ES-5 requirements (if needed),
 *  the execute the callback
 */
bravojs.es5_shim_then = function bravojs_es5_shim_then(callback)
{
  if (!Array.prototype.indexOf)
  {
    /* Load ES-5 shim into the environment before executing the main module */
    var script = document.createElement('SCRIPT');
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", bravojs.dirname(bravojs.url) + "/global-es5.js?1");

    if (document.addEventListener)
      script.onload = callback;
    else
    {
      script.onreadystatechange = function() 
      {
	if (this.readyState === "loaded")
	  callback();
      }
    }

    document.getElementsByTagName("HEAD")[0].appendChild(script);
  }
  else
  {
    callback();
  }
}

/** Reload a module, violating the CommonJS singleton paradigm and
 *  potentially introducing bugs in to the program using this function --
 *  as references to the previous instance of the module may still be
 *  held by the application program.
 */
bravojs.reloadModule = function(id, callback)
{
  delete bravojs.pendingModuleDeclarations[id];
  delete bravojs.requireMemo[id];
  bravojs.module.provide([id], callback);
}

/** Main module bootstrap */
bravojs.initializeMainModule = function bravojs_initializeMainModule(dependencies, moduleFactory, moduleIdentifier)
{
  if (bravojs.module.hasOwnProperty("declare"))		/* special extra-module environment bootstrap declare needs to go */
    delete bravojs.module.declare;

  if (bravojs.module.constructor.prototype.main)
    throw new Error("Main module has already been initialized!");

  bravojs.es5_shim_then
  (
    (function() 
     {
       bravojs.provideModule(dependencies, moduleFactory, moduleIdentifier, function bravojs_lambda_requireMain() { bravojs.module.constructor.prototype.main = bravojs.require(moduleIdentifier); })
     })
  ); 
}

/** Run a module which is not declared in the HTML document and make it the program module.
 *  @param	dependencies		[optional]	A list of dependencies to sastify before running the mdoule
 *  @param	moduleIdentifier	moduleIdentifier, relative to dirname(window.location.href). This function
 *					adjusts the module path such that the program module's directory is the
 *					top-level module directory before the dependencies are resolved.
 *  @param	callback		[optional]	Callback to invoke once the main module has been initialized
 */
bravojs.runExternalMainModule = function bravojs_runExternalProgram(dependencies, moduleIdentifier, callback)
{
  if (arguments.length === 1 || typeof moduleIdentifier === "function")
  {
    callback = moduleIdentifier;
    moduleIdentifier = dependencies;
    dependencies = [];
  }

  delete bravojs.module.declare;

  if (moduleIdentifier.charAt(0) === '/')
    bravojs.mainModuleDir = bravojs.dirname(moduleIdentifier);
  else
    bravojs.mainModuleDir = bravojs.dirname(bravojs.URL_toId(window.location.href + ".js"), true) + "/" + bravojs.dirname(moduleIdentifier);

  moduleIdentifier = bravojs.basename(moduleIdentifier);

  bravojs.es5_shim_then(
      function() {
	bravojs.module.provide(dependencies.concat([moduleIdentifier]), 
		       function bravojs_runMainModule() {
			 bravojs.initializeMainModule(dependencies, '', moduleIdentifier);
			 if (callback)
			   callback(); 
		       })
	    });
}

bravojs.reset();

if (typeof bravojs.url === "undefined")
{
/** Set the BravoJS URL, so that BravoJS can load components
 *  relative to its install dir.  The HTML script element that
 *  loads BravoJS must either have the ID BravoJS, or be the
 *  very first script in the document.
 */ 
(function bravojs_setURL()
{
  var i;
  var checkBasename = false;
  var script;

  script = document.getElementById("BravoJS");
  if (!script)
  {
    checkBasename = true;
    script = document.getElementsByTagName("SCRIPT")[0];
  }

  bravojs.url = script.src;
  i = bravojs.url.indexOf("?");
  if (i !== -1)
    bravojs.url = bravojs.url.slice(0,i);
  i = bravojs.url.indexOf("#");
  if (i !== -1)
    bravojs.url = bravojs.url.slice(0,i);

  if (checkBasename && bravojs.basename(bravojs.url) !== "bravo.js")
    throw new Error("Could not determine BravoJS URL. BravoJS must be the first script, or have id='BravoJS'");
})();
}

/** Diagnostic Aids */
var print   = bravojs.print;
if (!window.onerror)
{
  window.onerror = function window_onerror(message, url, line) 
  { 
    var scripts, i;

    print("\n * Error: " + message + "\n" + 
          "      in: " + url + "\n" + 
          "    line: " + line);  
  }
}

} catch(e) { bravojs.errorReporter(e); }

}

if (typeof exports !== "undefined")
{
    exports.BravoJS = function(context)
    {
        context = context || {};

        var window = {
            location: {
                protocol: "memory:",
                href: "memory:/" + ((typeof context.mainModuleDir != "undefined")?context.mainModuleDir:"/bravojs/")
            }
        };

        var bravojs = {
            mainModuleDir: context.mainModuleDir || void 0,
            platform: context.platform || void 0,
            url: window.location.href,
            print: (context.api && context.api.system && context.api.system.print) || void 0,
            errorReporter: (context.api && context.api.errorReporter) || void 0,
            XMLHttpRequest: (context.api && context.api.XMLHttpRequest) || void 0,
            DEBUG: context.DEBUG || void 0
        };

        bravojs_init(bravojs, window);

        context.bravojs = bravojs;
    }
}
else
{
    if (typeof bravojs === "undefined")
      bravojs = {};
    bravojs_init(bravojs, (typeof window != "undefined")?window:this);
}

/**
 *  This file implements a bravojs core plugin to add
 *  package and package mappings support.
 *
 *  Copyright (c) 2011, Christoph Dorn
 *  Christoph Dorn, christoph@christophdorn.com
 *  MIT License
 *
 *  To use: Load BravoJS, then layer this plugin in
 *  by loading it into the extra-module environment.
 */

(function packages() {

var calcMD5 = function() {
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */
/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  var str = "";
  for(var j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}
/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  var nblk = ((str.length + 8) >> 6) + 1;
  var blks = new Array(nblk * 16);
  for(var i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(var i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}
/*
 * Take a string and return the hex representation of its MD5.
 */
return function calcMD5(str)
{
  var x = str2blks_MD5(str);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
	var olda = a;
	var oldb = b;
	var oldc = c;
	var oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
}();

//@see http://www.webtoolkit.info/javascript-base64.html
var Base64 = {
	 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
			Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = Base64._keyStr.indexOf(input.charAt(i++));
			enc2 = Base64._keyStr.indexOf(input.charAt(i++));
			enc3 = Base64._keyStr.indexOf(input.charAt(i++));
			enc4 = Base64._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

var Plugin = function()
{
}

Plugin.prototype.init = function()
{
    var bravojs = this.bravojs;

    /** Get a context for a given module ID used to resolve the ID. If a package
     *  prefix is found a context specific to the package is returned, otherwise
     *  the default context is returned.
     */
    bravojs.contextForId = function packages_bravojs_contextForId(id, onlyCreateIfDelimited)
    {
        if (typeof id == "undefined")
            return bravojs.contexts["_"];

        id = id.replace(/^\w*!/, "");

        var parts = id.split("@/");
        
        id = parts[0];

        if (/@$/.test(id))
            id = id.substring(0, id.length-1);

        var ret = bravojs.callPlugins("contextForId", [id]);
        if (typeof ret != "undefined")
            id = ret;

        if (parts.length == 1 && typeof bravojs.contexts[id] != "undefined")
            return bravojs.contexts[id];

        if (typeof bravojs.contexts[id] == "undefined")
        {
            if (onlyCreateIfDelimited === true && parts.length == 1)
                return bravojs.contexts["_"];

            bravojs.makeContext(id);
        }

        return bravojs.contexts[id];
    };

    bravojs.hasContextForId = function packages_bravojs_hasContext(id)
    {
        id = id.replace(/^\w*!/, "");
        var parts = id.split("@/");
        if (parts.length == 2)
            id = parts[0];
        if (/@$/.test(id))
            id = id.substring(0, id.length-1);
        return (typeof bravojs.contexts[id] != "undefined");
    }

    bravojs.makeContext = function packages_bravojs_makeContext(id)
    {
        id = id.replace(/^\w*!/, "");
        bravojs.contexts[id] = new bravojs.Context(id);
        /* The id so far is path-based. If the context/package descriptor specifies a UID we map
         * the same context to the UID as well.
         */
        if (typeof bravojs.contexts[id].uid != "undefined")
           bravojs.contexts[bravojs.contexts[id].uid] = bravojs.contexts[id];
        return bravojs.contexts[id];
    }

    bravojs.Context = function packages_bravojs_Context(id)
    {
        this.id = id;

        // We do not need to do anything for the default context
        if (this.id == "_")
            return;

        id = this.id + "@/package.json";

        if (bravojs.require.isMemoized(id))
        {
            this.descriptor = bravojs.require.getMemoized(id).moduleFactory();
        }
        else
        {
            this.descriptor = bravojs.callPlugins("loadPackageDescriptor", [id]);
            var self = this;
            bravojs.require.memoize(id, [], function()
            {
                return self.descriptor;
            });
        }

        this.libDir = this.descriptor.directories && this.descriptor.directories.lib;
        if (typeof this.libDir != "string")
            this.libDir = "lib";
    
        this.uid = this.descriptor.uid || void 0;
        if (typeof this.uid != "undefined")
        {
            var m = this.uid.match(/^\w*:\/\/(.*)$/);
            if (!m)
                throw new Error("uid property '" + this.uid + "' must be a non-resolving or resolving URL with http or https protocol in: " + id);
            this.uid = m[1];  // strip the protocol prefix
        }
    }

    /** Get a map where labels point to package IDs for all declared mappings */
    bravojs.Context.prototype.getNormalizedMappings = function packages_bravojs_Context_getNormalizedMappings()
    {
        if (this.id == "_")
            throw new Error("Cannot get mappings for default context");
    
        if (typeof this.normalizedMappings != "undefined")
            return this.normalizedMappings;

        this.normalizedMappings = {};

        if (typeof this.descriptor.mappings != "undefined")
        {
            for (var label in this.descriptor.mappings)
            {
                var locator = bravojs.callPlugins("normalizeLocator", [this.descriptor.mappings[label], this]);
                this.normalizedMappings[label] = locator.uid || locator.location;
            }
        }
        return this.normalizedMappings;
    }

    bravojs.Context.prototype.resolveId = function packages_bravojs_Context_resolveId(moduleIdentifier, relativeModuleDir, descriptor)
    {
        // Pull out plugin if applicable
        var plugin;
        if (typeof moduleIdentifier == "string")
        {
            var m = moduleIdentifier.match(/^(\w*)!(.*)$/);
            if (m)
            {
                plugin = m[1];
                moduleIdentifier = m[2];
            }
        }

        try {
            var ret = bravojs.callPlugins("normalizeModuleIdentifier", [moduleIdentifier, relativeModuleDir, descriptor, this]);
            
            // happens if mapping is ignored
            if (ret === false)
                return false;
            
            if (typeof ret != "undefined")
                moduleIdentifier = ret;
        }
        catch(e)
        {
            var mappings = (typeof this.descriptor != "undefined" && typeof this.descriptor.mappings != "undefined")?JSON.stringify(this.descriptor.mappings):"{}";            
            throw new Error(e + " => " + e.stack + "\nUnable to resolve moduleIdentifier '" + JSON.stringify(moduleIdentifier) + "' against context '" + this.id + "' (mappings: " + mappings + ") and relativeModuleDir '" + relativeModuleDir + "'.");
        }

        if (moduleIdentifier === null || moduleIdentifier === "")
            return moduleIdentifier;

        if (moduleIdentifier.charAt(0) == "/")
            return ((typeof plugin != "undefined")?plugin+"!":"") + moduleIdentifier;

        if (moduleIdentifier.charAt(0) == ".")
            return ((typeof plugin != "undefined")?plugin+"!":"") + bravojs.realpath(relativeModuleDir + "/" + moduleIdentifier);

        if (this.id == "_")
            return ((typeof plugin != "undefined")?plugin+"!":"") + bravojs.realpath(bravojs.mainModuleDir + "/" + moduleIdentifier);

        return ((typeof plugin != "undefined")?plugin+"!":"") + bravojs.realpath(relativeModuleDir + "/" + moduleIdentifier);
    }

    /** Run just before providing Module to moduleFactory function in bravojs.initializeModule() */
    bravojs.Module.prototype.augment = function bravojs_Module_augment()
    {
        if (this._id === "")
            return;
    
        var context = bravojs.contextForId(this._id, true);
        /* Only add extra module properties if context represents a package (i.e. not default '_' context) */
        if (context.id == "_")
            return;

        /* If context supplies a UID use it over the path-based ID for the package ID */
        if (typeof context.descriptor !== "undefined" && typeof context.descriptor.uid !== "undefined") {
            this.pkgId = context.descriptor.uid.replace(/^\w*:\/\//, "");
            // TODO: If known registry found as prefix strip it from uid
        } else {
            this.pkgId = context.id;
        }

        /* Normalized mappings are simply a map where labels point to package IDs */
        this.mappings = context.getNormalizedMappings();

        this.hashId = calcMD5(this.id);
    }
    
    bravojs.base64encode = Base64.encode;
    bravojs.base64decode = Base64.decode;

    // We need to reset bravojs to use the Context object from above (but keep registered plugins)
    bravojs.reset(null, bravojs.plugins);
}

Plugin.prototype.requireModule = function(id)
{
    if (!id)
        return undefined;
    
    // The text plugins need special handeling
    if (id.match(/^text!/))
    {
        if (!this.bravojs.requireMemo[id] && this.bravojs.pendingModuleDeclarations[id])
        {
            this.bravojs.requireMemo[id] = this.bravojs.pendingModuleDeclarations[id].moduleFactory();
        }
        if (!this.bravojs.requireMemo[id]) {
            throw new Error("Module " + id + " is not available.");
        }
        return true;
    }
    return undefined;
}

Plugin.prototype.newRequire = function(helpers)
{
    var bravojs = this.bravojs;

    var newRequire = function packages_require(moduleIdentifier) 
    {
        // RequireJS compatibility. Convert require([], callback) to module.load([], callback).
        if (Object.prototype.toString.call(moduleIdentifier) == "[object Array]" && arguments.length == 2)
        {
            if (moduleIdentifier.length > 1)
               throw new Error("require([], callback) with more than one module in [] is not supported yet!");
            if (typeof bravojs.mainContext == "undefined")
                throw new Error("Cannot resolve ID for ASYNC require. bravojs.mainContext used to resolve ID not set!");
            // Load IDs are resolved against the default context. To resolve against a different
            // context use module.load([], callback).
            moduleIdentifier = bravojs.contextForId(bravojs.mainContext).resolveId(moduleIdentifier[0], helpers.getContextSensitiveModuleDir());
            var callback = arguments[1];
            bravojs.module.load(moduleIdentifier, function(id)
            {
                callback(newRequire(id));
            });
            return undefined;
        }
        if (helpers.deps && helpers.deps[moduleIdentifier])
            return helpers.deps[moduleIdentifier]();
        return bravojs.requireModule(helpers.getContextSensitiveModuleDir(), moduleIdentifier);
    };
    return newRequire;
}

Plugin.prototype.augmentNewRequire = function(newRequire, helpers)
{
    var bravojs = this.bravojs;

    newRequire.pkg = function packages_require_pkg(packageIdentifierPath)
    {
        if (typeof helpers.module != "undefined" && typeof helpers.module.mappings != "undefined")
        {
            if (typeof helpers.module.mappings[packageIdentifierPath] != "undefined")
                packageIdentifierPath = helpers.module.mappings[packageIdentifierPath];
        }
        var context = bravojs.contextForId(packageIdentifierPath);
        return {
            id: function(moduleIdentifier, unsanitized)
            {
                if (typeof moduleIdentifier === "undefined" || !moduleIdentifier)
                {
                	// NOTE: The code below will likely go. pkg().id() should always return the path ID
                	//		 of the package and not the UID. Will need separate function to get UID.
//                    if (unsanitized)
//                       return context.id;
//                    return context.uid || context.id;
					return context.id;
                }
                else
                {
                    var id = context.resolveId(moduleIdentifier, helpers.getContextSensitiveModuleDir());
                    if (unsanitized)
                        return id;
                    return bravojs.callPlugins("sanitizeId", [id]) || id;
                }
            }
        }
    }

    newRequire.canonicalize = function packages_require_canonicalize(moduleIdentifier)
    {
        var id = bravojs.makeModuleId(helpers.getContextSensitiveModuleDir(), moduleIdentifier);

        if (id === '')
            throw new Error("Cannot canonically name the resource bearing this main module");

        /* Remove package/module ID delimiter */
        id = bravojs.callPlugins("sanitizeId", [id]) || id;

        /* Some IDs may refer to non-js files */
        if (bravojs.basename(id).indexOf(".") == -1)
            id += ".js";

        return bravojs.window.location.protocol + "/" + id;
    }

    newRequire.nameToUrl = function(moduleIdentifier)
    {
        if (arguments.length >= 2 && arguments[1] !== null)
            throw new Error("NYI - Second argument to require.nameToUrl() must be 'null'!");
        else
        if (arguments.length >= 3 && arguments[2] != "_")
            throw new Error("NYI - Third argument to require.nameToUrl() must be '_'!");
        throw new Error("NYI - require.nameToUrl()");
/*
        var parts = moduleIdentifier.split("/");
        if (parts.length == 0)
        {
        }
        else
        {
        }
*/
    }
}

Plugin.prototype.sanitizeId = function(id)
{
    return id.replace(/@\//, "/").replace(/@$/, "");
}

/**
 * Load a package descriptor from the server.
 * 
 * NOTE: This function will block until the server returns the response!
 *       Package descriptors should be memoized before booting the program
 *       for better loading performance.
 */
Plugin.prototype.loadPackageDescriptor = function(id)
{
    // NOTE: Do NOT use require.canonicalize(id) here as it will cause an infinite loop!
    var URL = window.location.protocol + "/" + bravojs.realpath(id.replace(/@\/+/g, "\/"));

    // TODO: Get this working in other browsers
    var req = new (this.bravojs.XMLHttpRequest || XMLHttpRequest)();
    req.open("GET", URL, false);
    req.send(null);
    if(req.status == 200)
    {
        try
        {
            return JSON.parse(req.responseText);
        }
        catch(e)
        {
            throw new Error("Error parsing package descriptor from URL '" + URL + "': " + e);
        }
    }
    else
        throw new Error("Error loading package descriptor from URL: " + URL);
}

/**
 * Given a mappings locator normalize it according to it's context by
 * setting an absolute path-based location property.
 */
Plugin.prototype.normalizeLocator = function(locator, context)
{
    if (typeof locator.provider != "undefined")
    {
        // do nothing
//        locator.location = locator.provider;
    }
    else
    if (typeof locator.location != "undefined")
    {
        if ((locator.location.indexOf("./") == 0) || (locator.location.indexOf("../") == 0))
        {
            locator.location = this.bravojs.realpath(((context.id!="_")?context.id:this.bravojs.mainModuleDir) + "/" + locator.location, false) + "/";
        }
    }
    else
    if (typeof locator.id != "undefined")
    {
        if (locator.id.charAt(0) != "/")
            locator.id = this.bravojs.mainModuleDir + "/" + locator.id;
    }
    else
    if (typeof locator.catalog != "undefined" || typeof locator.archive != "undefined")
    {
        if (typeof locator.catalog != "undefined" && typeof locator.name == "undefined")
            throw new Error("Catalog-based mappings locator does not specify 'name' property: " + locator);

        var ret = this.bravojs.callPlugins("resolveLocator", [locator]);
        if (typeof ret == "undefined")
            throw new Error("Unable to resolve package locator: " + JSON.stringify(locator));

        locator.location = ret;

        if (typeof id == "undefined")
            throw new Error("Mappings locator could not be resolved by plugins: " + locator);
    }

    if (typeof locator.location != "undefined" && locator.location.charAt(locator.location.length-1) == "/")
        locator.location = locator.location.substring(0, locator.location.length -1);

    if (typeof locator.location != "undefined") {
        var newContext = this.bravojs.contextForId(locator.location);
        if(newContext && newContext.uid) {
            locator.uid = newContext.uid;
        }
    }

    return locator;
}

/**
 * Given a moduleIdentifier convert it to a top-level ID
 */
Plugin.prototype.normalizeModuleIdentifier = function(moduleIdentifier, relativeModuleDir, descriptor, context)
{
    if (moduleIdentifier === '')  /* Special case for main module */
        return '';

    var self = this,
        bravojs = this.bravojs,
        originalModuleIdentifier = moduleIdentifier;

    function finalNormalization(moduleIdentifier)
    {
        moduleIdentifier = moduleIdentifier.replace(/{platform}/g, bravojs.require.platform);

        var parts = moduleIdentifier.replace(/\.js$/, "").split("@/");

        if (parts.length == 1)
            return moduleIdentifier;

        var context = bravojs.contextForId(parts[0]);
        // Resolve mapped modules
        if (typeof context.descriptor.modules != "undefined" && typeof context.descriptor.modules["/" + parts[1]] != "undefined")
        {
            var locator = self.normalizeLocator(context.descriptor.modules["/" + parts[1]], context);
            if (typeof locator.available != "undefined" && locator.available === false)
                return null;

            if (typeof locator.module != "undefined")
                moduleIdentifier = bravojs.contextForId(locator.location).resolveId("./" + locator.module);
        }

        // Give opportunity to verify resolved ID to discover missing mappings for example
        var ret = bravojs.callPlugins("verifyModuleIdentifier", [moduleIdentifier, {
            moduleIdentifier: originalModuleIdentifier,
            relativeModuleDir: relativeModuleDir,
            context: context
        }]);
        if (typeof ret != "undefined")
            moduleIdentifier = ret;
        if (/\.js$/.test(moduleIdentifier))
            moduleIdentifier = moduleIdentifier.substring(0, moduleIdentifier.length-3);
        return moduleIdentifier;
    }

    if (moduleIdentifier === null)
    {
        if (typeof context.descriptor == "undefined" || typeof context.descriptor.main == "undefined")
            throw new Error("'main' property not set in package descriptor for: " + this.id);
        return finalNormalization(context.id + "@/" + context.descriptor.main);
    }
    else
    if (typeof moduleIdentifier === "object")
    {
        // We have a mappings locator object
        moduleIdentifier = this.normalizeLocator(moduleIdentifier, context);

        var id;
        if (typeof moduleIdentifier.location != "undefined")
        {
            id = moduleIdentifier.location;
        }
        else
        if (typeof moduleIdentifier.id != "undefined")
        {
            id = moduleIdentifier.id;
        }
        else
            throw new Error("Invalid mapping: " + moduleIdentifier);

        if (typeof moduleIdentifier.descriptor != "undefined" && typeof moduleIdentifier.descriptor.main != "undefined")
            return finalNormalization(this.bravojs.realpath(id + "@/" + moduleIdentifier.descriptor.main, false));

        var newContext = this.bravojs.contextForId(id);

        if (typeof moduleIdentifier.module !== "undefined")
        {
            return finalNormalization(this.bravojs.realpath(newContext.id + "@/" + moduleIdentifier.module, false));
        }
        else
        {
            if (typeof newContext.descriptor == "undefined" || typeof newContext.descriptor.main == "undefined")
                throw new Error("'main' property not set in package descriptor for: " + newContext.id);

            return finalNormalization(this.bravojs.realpath(newContext.id + "@/" + newContext.descriptor.main, false));
        }
    }

    // See if moduleIdentifier matches a mapping alias exactly
    if (typeof context.descriptor != "undefined" &&
        typeof context.descriptor.mappings != "undefined" &&
        typeof context.descriptor.mappings[moduleIdentifier] != "undefined")
    {
        if (typeof context.descriptor.mappings[moduleIdentifier].available != "undefined" && context.descriptor.mappings[moduleIdentifier].available === false)
        {
            // If mapping is not available we return a null ID
            return null;
        }
        else
        if (typeof context.descriptor.mappings[moduleIdentifier].module != "undefined")
        {
            var mappedContextId = this.normalizeLocator(context.descriptor.mappings[moduleIdentifier], context).location,
                mappedContext = this.bravojs.contextForId(mappedContextId),
                mappedModule = context.descriptor.mappings[moduleIdentifier].module;

            mappedModule = mappedModule.replace(/^\./, "");

            if (mappedModule.charAt(0) == "/")
            {
                return finalNormalization(mappedContext.id + "@" + mappedModule);
            }
            else
            {
                return mappedContext.resolveId("./" + context.descriptor.mappings[moduleIdentifier].module, null);
            }
        }
        else
        {
            var mappedContextId = this.normalizeLocator(context.descriptor.mappings[moduleIdentifier], context).location,
            	mappedContext = this.bravojs.contextForId(mappedContextId);
            if (mappedContext.descriptor && mappedContext.descriptor.main)
            {
            	return mappedContext.resolveId(null, null);
            }
            throw new Error("Unable to resolve ID '" + moduleIdentifier + "' for matching mapping as 'module' property not defined in mapping locator and 'main' property not defined in package descriptor!");
        }
    }

    var moduleIdentifierParts = moduleIdentifier.split("@/");

    // If module ID is absolute we get appropriate context
    if (moduleIdentifierParts.length == 2)
        context = this.bravojs.contextForId(moduleIdentifierParts[0]);

    // NOTE: relativeModuleDir is checked here so we can skip this if we want a module from the package
    if (typeof context.descriptor != "undefined" &&
        typeof context.descriptor["native"] != "undefined" &&
        context.descriptor["native"] === true &&
        relativeModuleDir)
    {
        return finalNormalization(moduleIdentifierParts.pop());
    }
    else
    if (moduleIdentifier.charAt(0) == "/")
        return finalNormalization(moduleIdentifier);

    // From now on we only deal with the relative (relative to context) ID
    moduleIdentifier = moduleIdentifierParts.pop();

    if (moduleIdentifier.charAt(0) == "." && relativeModuleDir)
        return finalNormalization(this.bravojs.realpath(relativeModuleDir + "/" + moduleIdentifier, false));
    else
    if (context && context.id == "_")
        return finalNormalization(this.bravojs.realpath(this.bravojs.mainModuleDir + "/" + moduleIdentifier, false));

    var parts;
    if (typeof context.descriptor != "undefined" &&
        typeof context.descriptor.mappings != "undefined" &&
        (parts = moduleIdentifier.split("/")).length > 1 &&
        typeof context.descriptor.mappings[parts[0]] != "undefined")
    {
        var normalizedLocator = this.normalizeLocator(context.descriptor.mappings[parts[0]], context),
            mappedContextId;

        if (normalizedLocator.available === false)
            return false;

        if (typeof normalizedLocator.provider != "undefined")
            mappedContextId = normalizedLocator.id;
        else
            mappedContextId = normalizedLocator.location;

        var mappedContext = this.bravojs.contextForId(mappedContextId),
            mappedDescriptor = void 0;

        if (typeof context.descriptor.mappings[parts[0]].descriptor != "undefined")
            mappedDescriptor = context.descriptor.mappings[parts[0]].descriptor;

        // Make ID relative and do not pass relativeModuleDir so ID is resolved against root of package without checking mappings
        parts[0] = ".";
        return mappedContext.resolveId(parts.join("/"), null, mappedDescriptor);
    }

    var libDir = context.libDir;
    if (typeof descriptor != "undefined" && typeof descriptor.directories != "undefined" && typeof descriptor.directories.lib != "undefined")
    {
        libDir = descriptor.directories.lib;
    }
    if (libDir && moduleIdentifier.substring(0, libDir.length + 1) == libDir + "/") {
        libDir = false;
    }

    return finalNormalization(this.bravojs.realpath(context.id + "@/" + ((libDir)?libDir+"/":"") + moduleIdentifier, false));
}

if (typeof bravojs != "undefined")
{
    // In Browser
    bravojs.registerPlugin(new Plugin());
}
else
if (typeof exports != "undefined")
{
    // On Server
    exports.Plugin = Plugin;
}

})();

/**
 *  This file implements a bravojs core plugin to add
 *  dynamic module and package loading support where the server
 *  given a module or package ID will return the requested
 *  module (main module for package) and all dependencies
 *  in a single file.
 *
 *  Copyright (c) 2011, Christoph Dorn
 *  Christoph Dorn, christoph@christophdorn.com
 *  MIT License
 *
 *  To use: Load BravoJS, then layer this plugin in
 *  by loading it into the extra-module environment.
 */

(function packages_loader() {

bravojs.module.constructor.prototype.load = function packages_loader_load(moduleIdentifier, callback)
{
    var uri;
    
    if (typeof moduleIdentifier == "object")
    {
        if (typeof moduleIdentifier.id != "undefined")
        {
            var pkg = bravojs.contextForId(moduleIdentifier.id);
            uri = pkg.resolveId(null);
        }
        else
        if (typeof moduleIdentifier.location != "undefined")
        {
            uri = bravojs.mainModuleDir + moduleIdentifier.location.substring(bravojs.mainModuleDir.length);
        }
        else
            throw new Error("NYI");
    }
    else
    if (moduleIdentifier.charAt(0) != "/")
    {
        if (moduleIdentifier.charAt(0) != ".")
        {
            // resolve mapped ID
            uri = bravojs.contextForId(this._id).resolveId(moduleIdentifier).replace(bravojs.mainModuleDir, bravojs.mainModuleDir);
        }
        else
            throw new Error("Cannot load module by relative ID: " + moduleIdentifier);
    }
    else
    {
        uri = bravojs.mainModuleDir + moduleIdentifier.substring(bravojs.mainModuleDir.length);
    }

    var lookupURI = uri;
    if (/\.js$/.test(lookupURI))
        lookupURI = lookupURI.substring(0, lookupURI.length-3);

    if (bravojs.require.isMemoized(lookupURI))
    {
        callback(lookupURI);
        return;
    }

    if (!/\.js$/.test(uri) && !/\/$/.test(uri))
        uri += ".js";

    // Encode ../ as we need to preserve them (servers/browsers will automatically normalize these directory up path segments)
    uri = uri.replace(/\.{2}\//g, "__/");

    // WebWorker
    if (typeof importScripts === "function")
    {
        // Remove hostname
        uri = uri.replace(/^\/[^\/]*\//, "/");

        importScripts(uri);
        
        if (typeof __bravojs_loaded_moduleIdentifier == "undefined")
            throw new Error("__bravojs_loaded_moduleIdentifier not set by server!");

        var id = __bravojs_loaded_moduleIdentifier;

        delete __bravojs_loaded_moduleIdentifierl

        // all modules are memoized now so we can continue
        callback(id);
        return;
    }

    var URL = window.location.protocol + "/" + uri;

    // We expect a bunch of modules wrapped with:
    //  require.memoize('ID', [], function (require, exports, module) { ... });

    var script = document.createElement('SCRIPT');
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", URL);

    /* Fake script.onload for IE6-8 */
    script.onreadystatechange = function()
    {
        var cb;        
        if (this.readyState === "loaded")
        {
            cb = this.onload;
            this.onload = null;
            setTimeout(cb,0);
        }
    }

    script.onload = function packages_loader_onload()
    {
        this.onreadystatechange = null;
        
        if (typeof window.__bravojs_loaded_moduleIdentifier == "undefined")
            throw new Error("__bravojs_loaded_moduleIdentifier not set by server!");
        
        var id = window.__bravojs_loaded_moduleIdentifier;
        
        delete window.__bravojs_loaded_moduleIdentifier;

        // all modules are memoized now so we can continue
        callback(id);
    }
    
    /* Supply errors on browsers that can */
    script.onerror = function fastload_script_error()
    {
        if (typeof console != "undefined")
            console.error("Error contacting server URL = " + script.src);
        else
            alert("Error contacting server\nURL=" + script.src);
    }

    document.getElementsByTagName("HEAD")[0].appendChild(script);
};

})();

require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/887BE3DFB4516B3595DAB5B68B91EF7E@/package.json'), [], function() { return {"uid":"http://github.com/pinf/test-programs-js/JSLintBenchmark/","main":"main.js","mappings":{"jslint":{"location":"" + bravojs.mainModuleDir + "/3A028CD0C5137FCCEC43D052C2635D16","uid":"github.com/cadorn/JSLint/"}}}; });
require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/887BE3DFB4516B3595DAB5B68B91EF7E@/main'), ['jslint/jslint','text!jslint/jslint'], function (require, exports, module) {

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

});
require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/3A028CD0C5137FCCEC43D052C2635D16@/package.json'), [], function() { return {"uid":"http://github.com/cadorn/JSLint/","directories":{"lib":""}}; });
require.memoize(bravojs.realpath(bravojs.mainModuleDir + '/3A028CD0C5137FCCEC43D052C2635D16@/jslint'), [], function (require, exports, module) {
// jslint.js
// 2011-09-29

// Copyright (c) 2002 Douglas Crockford  (www.JSLint.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// The Software shall be used for Good, not Evil.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// WARNING: JSLint will hurt your feelings.

// JSLINT is a global function. It takes two parameters.

//     var myResult = JSLINT(source, option);

// The first parameter is either a string or an array of strings. If it is a
// string, it will be split on '\n' or '\r'. If it is an array of strings, it
// is assumed that each string represents one line. The source can be a
// JavaScript text, or HTML text, or a JSON text, or a CSS text.

// The second parameter is an optional object of options that control the
// operation of JSLINT. Most of the options are booleans: They are all
// optional and have a default value of false. One of the options, predef,
// can be an array of names, which will be used to declare global variables,
// or an object whose keys are used as global names, with a boolean value
// that determines if they are assignable.

// If it checks out, JSLINT returns true. Otherwise, it returns false.

// If false, you can inspect JSLINT.errors to find out the problems.
// JSLINT.errors is an array of objects containing these properties:

//  {
//      line      : The line (relative to 0) at which the lint was found
//      character : The character (relative to 0) at which the lint was found
//      reason    : The problem
//      evidence  : The text line in which the problem occurred
//      raw       : The raw message before the details were inserted
//      a         : The first detail
//      b         : The second detail
//      c         : The third detail
//      d         : The fourth detail
//  }

// If a stopping error was found, a null will be the last element of the
// JSLINT.errors array. A stopping error means that JSLint was not confident
// enough to continue. It does not necessarily mean that the error was
// especially heinous.

// You can request a Function Report, which shows all of the functions
// and the parameters and vars that they use. This can be used to find
// implied global variables and other problems. The report is in HTML and
// can be inserted in an HTML <body>.

//     var myReport = JSLINT.report(errors_only);

// If errors_only is true, then the report will be limited to only errors.

// You can request a data structure that contains JSLint's results.

//     var myData = JSLINT.data();

// It returns a structure with this form:

//     {
//         errors: [
//             {
//                 line: NUMBER,
//                 character: NUMBER,
//                 reason: STRING,
//                 evidence: STRING
//             }
//         ],
//         functions: [
//             {
//                 name: STRING,
//                 line: NUMBER,
//                 last: NUMBER,
//                 params: [
//                     {
//                         string: STRING
//                     }
//                 ],
//                 closure: [
//                     STRING
//                 ],
//                 var: [
//                     STRING
//                 ],
//                 exception: [
//                     STRING
//                 ],
//                 outer: [
//                     STRING
//                 ],
//                 unused: [
//                     STRING
//                 ],
//                 undef: [
//                     STRING
//                 ],
//                 global: [
//                     STRING
//                 ],
//                 label: [
//                     STRING
//                 ]
//             }
//         ],
//         globals: [
//             STRING
//         ],
//         member: {
//             STRING: NUMBER
//         },
//         urls: [
//             STRING
//         ],
//         json: BOOLEAN
//     }

// Empty arrays will not be included.

// You can obtain the parse tree that JSLint constructed while parsing. The
// latest tree is kept in JSLINT.tree. A nice stringication can be produced
// with

//     JSON.stringify(JSLINT.tree, [
//         'string',  'arity', 'name',  'first',
//         'second', 'third', 'block', 'else'
//     ], 4));

// JSLint provides three directives. They look like slashstar comments, and
// allow for setting options, declaring global variables, and establishing a
// set of allowed property names.

// These directives respect function scope.

// The jslint directive is a special comment that can set one or more options.
// The current option set is

//     adsafe     true, if ADsafe rules should be enforced
//     bitwise    true, if bitwise operators should be allowed
//     browser    true, if the standard browser globals should be predefined
//     commonjs   true, if the standard commonjs globals should be predefined
//     cap        true, if upper case HTML should be allowed
//     confusion  true, if types can be used inconsistently
//     'continue' true, if the continuation statement should be tolerated
//     css        true, if CSS workarounds should be tolerated
//     debug      true, if debugger statements should be allowed
//     devel      true, if logging should be allowed (console, alert, etc.)
//     eqeq       true, if == should be allowed
//     es5        true, if ES5 syntax should be allowed
//     evil       true, if eval should be allowed
//     forin      true, if for in statements need not filter
//     fragment   true, if HTML fragments should be allowed
//     indent     the indentation factor
//     maxerr     the maximum number of errors to allow
//     maxlen     the maximum length of a source line
//     newcap     true, if constructor names capitalization is ignored
//     node       true, if Node.js globals should be predefined
//     nomen      true, if names may have dangling _
//     on         true, if HTML event handlers should be allowed
//     passfail   true, if the scan should stop on first error
//     plusplus   true, if increment/decrement should be allowed
//     properties true, if all property names must be declared with /*properties*/
//     regexp     true, if the . should be allowed in regexp literals
//     rhino      true, if the Rhino environment globals should be predefined
//     undef      true, if variables can be declared out of order
//     unparam    true, if unused parameters should be tolerated
//     safe       true, if use of some browser features should be restricted
//     sloppy     true, if the 'use strict'; pragma is optional
//     sub        true, if all forms of subscript notation are tolerated
//     vars       true, if multiple var statements per function should be allowed
//     white      true, if sloppy whitespace is tolerated
//     widget     true  if the Yahoo Widgets globals should be predefined
//     windows    true, if MS Windows-specific globals should be predefined

// For example:

/*jslint
    evil: true, nomen: true, regexp: true, commonjs: true
*/

// The properties directive declares an exclusive list of property names.
// Any properties named in the program that are not in the list will
// produce a warning.

// For example:

/*properties
    '\b': string, '\t': string, '\n': string, '\f': string, '\r': string,
    '!=': boolean, '!==': boolean, '"': string, '%': boolean, '\'': string,
    '(begin)', '(breakage)': number, '(complexity)', '(confusion)': boolean,
    '(context)': object, '(error)', '(identifier)', '(line)': number,
    '(loopage)': number, '(name)', '(old_property_type)', '(params)',
    '(scope)': object, '(token)', '(vars)', '(verb)', '*': boolean,
    '+': boolean, '-': boolean, '/': *, '<': boolean, '<=': boolean,
    '==': boolean, '===': boolean, '>': boolean, '>=': boolean,
    ADSAFE: boolean, Array, Date, E: string, Function, LN10: string,
    LN2: string, LOG10E: string, LOG2E: string, MAX_VALUE: string,
    MIN_VALUE: string, NEGATIVE_INFINITY: string, Object, PI: string,
    POSITIVE_INFINITY: string, SQRT1_2: string, SQRT2: string, '\\': string,
    a: object, a_label: string, a_not_allowed: string, a_not_defined: string,
    a_scope: string, abbr: object, acronym: object, address: object, adsafe,
    adsafe_a: string, adsafe_autocomplete: string, adsafe_bad_id: string,
    adsafe_div: string, adsafe_fragment: string, adsafe_go: string,
    adsafe_html: string, adsafe_id: string, adsafe_id_go: string,
    adsafe_lib: string, adsafe_lib_second: string, adsafe_missing_id: string,
    adsafe_name_a: string, adsafe_placement: string, adsafe_prefix_a: string,
    adsafe_script: string, adsafe_source: string, adsafe_subscript_a: string,
    adsafe_tag: string, all: boolean, already_defined: string, and: string,
    applet: object, apply: string, approved: array, area: object,
    arity: string, article: object, aside: object, assign: boolean,
    assign_exception: string, assignment_function_expression: string,
    at: number, attribute_case_a: string, audio: object, autocomplete: string,
    avoid_a: string, b: *, background: array, 'background-attachment': array,
    'background-color': array, 'background-image': array,
    'background-position': array, 'background-repeat': array,
    bad_assignment: string, bad_color_a: string, bad_constructor: string,
    bad_entity: string, bad_html: string, bad_id_a: string, bad_in_a: string,
    bad_invocation: string, bad_name_a: string, bad_new: string,
    bad_number: string, bad_operand: string, bad_style: string,
    bad_type: string, bad_url_a: string, bad_wrap: string, base: object,
    bdo: object, big: object, bind: string, bitwise: boolean, block: array,
    blockquote: object, body: object, border: array, 'border-bottom': array,
    'border-bottom-color', 'border-bottom-left-radius',
    'border-bottom-right-radius', 'border-bottom-style': array,
    'border-bottom-width', 'border-collapse': array, 'border-color': array,
    'border-left': array, 'border-left-color', 'border-left-style': array,
    'border-left-width', 'border-radius', 'border-right': array,
    'border-right-color', 'border-right-style': array, 'border-right-width',
    'border-spacing': array, 'border-style': array, 'border-top': array,
    'border-top-color', 'border-top-left-radius', 'border-top-right-radius',
    'border-top-style': array, 'border-top-width', 'border-width': array,
    bottom: array, br: object, braille: boolean, browser: boolean,
    button: object, c, call: string, canvas: object, cap, caption: object,
    'caption-side': array, ceil: string, center: object, charAt: *,
    charCodeAt: *, character, cite: object, clear: array, clip: array, closure,
    cm: boolean, code: object, col: object, colgroup: object, color,
    combine_var: string, command: object, commonjs: boolean, concat: string,
    conditional_assignment: string, confusing_a: string,
    confusing_regexp: string, confusion: boolean, constructor: string,
    constructor_name_a: string, content: array, continue, control_a: string,
    'counter-increment': array, 'counter-reset': array, create: *, css: string,
    cursor: array, d, dangerous_comment: string, dangling_a: string,
    data: function object, datalist: object, dd: object, debug,
    defineProperties: string, defineProperty: string, del: object,
    deleted: string, details: object, devel: boolean, dfn: object,
    dialog: object, dir: object, direction: array, display: array,
    disrupt: boolean, div: object, dl: object, dt: object, duplicate_a: string,
    edge: string, edition: string, else, em: *, embed: object,
    embossed: boolean, empty: boolean, 'empty-cells': array,
    empty_block: string, empty_case: string, empty_class: string,
    entityify: function, eqeq, errors: array, es5: string, eval, every: string,
    evidence, evil: string, ex: boolean, exception, exec: *,
    expected_a: string, expected_a_at_b_c: string, expected_a_b: string,
    expected_a_b_from_c_d: string, expected_at_a: string,
    expected_attribute_a: string, expected_attribute_value_a: string,
    expected_class_a: string, expected_fraction_a: string,
    expected_id_a: string, expected_identifier_a: string,
    expected_identifier_a_reserved: string, expected_lang_a: string,
    expected_linear_a: string, expected_media_a: string,
    expected_name_a: string, expected_nonstandard_style_attribute: string,
    expected_number_a: string, expected_operator_a: string,
    expected_percent_a: string, expected_positive_a: string,
    expected_pseudo_a: string, expected_selector_a: string,
    expected_small_a: string, expected_space_a_b: string,
    expected_string_a: string, expected_style_attribute: string,
    expected_style_pattern: string, expected_tagname_a: string,
    expected_type_a: string, f: string, fieldset: object, figure: object,
    filter: *, first: *, float: array, floor: *, font: *, 'font-family',
    'font-size': array, 'font-size-adjust': array, 'font-stretch': array,
    'font-style': array, 'font-variant': array, 'font-weight': array,
    footer: object, for, forEach: *, for_if: string, forin, form: object,
    fragment, frame: object, frameset: object, freeze: string, from: number,
    fromCharCode: function, fud: function, funct: object, function,
    function_block: string, function_eval: string, function_loop: string,
    function_statement: string, function_strict: string, functions: array,
    getDate: string, getDay: string, getFullYear: string, getHours: string,
    getMilliseconds: string, getMinutes: string, getMonth: string,
    getOwnPropertyDescriptor: string, getOwnPropertyNames: string,
    getPrototypeOf: string, getSeconds: string, getTime: string,
    getTimezoneOffset: string, getUTCDate: string, getUTCDay: string,
    getUTCFullYear: string, getUTCHours: string, getUTCMilliseconds: string,
    getUTCMinutes: string, getUTCMonth: string, getUTCSeconds: string,
    getYear: string, global, globals, h1: object, h2: object, h3: object,
    h4: object, h5: object, h6: object, handheld: boolean, hasOwnProperty: *,
    head: object, header: object, height: array, hgroup: object, hr: object,
    'hta:application': object, html: *, html_confusion_a: string,
    html_handlers: string, i: object, id: string, identifier: boolean,
    identifier_function: string, iframe: object, img: object, immed: boolean,
    implied_evil: string, in, indent: number, indexOf: *, infix_in: string,
    init: function, input: object, ins: object, insecure_a: string,
    isAlpha: function, isArray: function boolean, isDigit: function,
    isExtensible: string, isFrozen: string, isNaN: string,
    isPrototypeOf: string, isSealed: string, join: *, jslint: function boolean,
    JSLINT: function boolean,
    json: boolean, kbd: object, keygen: object, keys: *, label: object,
    label_a_b: string, labeled: boolean, lang: string, lastIndex: string,
    lastIndexOf: *, lbp: number, leading_decimal_a: string, led: function,
    left: array, legend: object, length: *, 'letter-spacing': array,
    li: object, lib: boolean, line: number, 'line-height': array, link: object,
    'list-style': array, 'list-style-image': array,
    'list-style-position': array, 'list-style-type': array, map: *,
    margin: array, 'margin-bottom', 'margin-left', 'margin-right',
    'margin-top', mark: object, 'marker-offset': array, match: function,
    'max-height': array, 'max-width': array, maxerr: number,
    maxlen: number, member: object, menu: object, message, meta: object,
    meter: object, 'min-height': function, 'min-width': function,
    missing_a: string, missing_a_after_b: string, missing_option: string,
    missing_property: string, missing_space_a_b: string, missing_url: string,
    missing_use_strict: string, mixed: string, mm: boolean, mode: string,
    move_invocation: string, move_var: string, n: string, name: string,
    name_function: string, nav: object, nested_comment: string,
    newcap: boolean, node: boolean, noframes: object, nomen, noscript: object,
    not: string, not_a_constructor: string, not_a_defined: string,
    not_a_function: string, not_a_label: string, not_a_scope: string,
    not_greater: string, now: string, nud: function, number: number,
    object: object, ol: object, on, opacity, open: boolean, optgroup: object,
    option: object, outer: regexp, outline: array, 'outline-color': array,
    'outline-style': array, 'outline-width', output: object, overflow: array,
    'overflow-x': array, 'overflow-y': array, p: object, padding: array,
    'padding-bottom': function, 'padding-left': function,
    'padding-right': function, 'padding-top': function,
    'page-break-after': array, 'page-break-before': array, param: object,
    parameter_a_get_b: string, parameter_set_a: string, params: array,
    paren: boolean, parent: string, parse: string, passfail, pc: boolean,
    plusplus, pop: *, position: array, postscript: boolean, pre: object,
    predef, preventExtensions: string, print: boolean, progress: object,
    projection: boolean, properties: boolean, propertyIsEnumerable: string,
    prototype: string, pt: boolean, push: *, px: boolean, q: object, quote,
    quotes: array, r: string, radix: string, range: function, raw,
    read_only: string, reason, redefinition_a: string, reduce: string,
    reduceRight: string, regexp, replace: function, report: function,
    reserved: boolean, reserved_a: string, reverse: string, rhino: boolean,
    right: array, rp: object, rt: object, ruby: object, safe: boolean,
    samp: object, scanned_a_b: string, screen: boolean, script: object,
    seal: string, search: function, second: *, section: object, select: object,
    setDate: string, setDay: string, setFullYear: string, setHours: string,
    setMilliseconds: string, setMinutes: string, setMonth: string,
    setSeconds: string, setTime: string, setTimezoneOffset: string,
    setUTCDate: string, setUTCDay: string, setUTCFullYear: string,
    setUTCHours: string, setUTCMilliseconds: string, setUTCMinutes: string,
    setUTCMonth: string, setUTCSeconds: string, setYear: string, shift: *,
    slash_equal: string, slice: string, sloppy, small: object, some: string,
    sort: *, source: object, span: object, speech: boolean, splice: string,
    split: function, src, statement_block: string, stopping: string,
    strange_loop: string, strict: string, string: string, stringify: string,
    strong: object, style: *, styleproperty: regexp, sub: object,
    subscript: string, substr: *, substring: string, sup: object,
    supplant: function, t: string, table: object, 'table-layout': array,
    tag_a_in_b: string, tbody: object, td: object, test: *,
    'text-align': array, 'text-decoration': array, 'text-indent': function,
    'text-shadow': array, 'text-transform': array, textarea: object,
    tfoot: object, th: object, thead: object, third: array, thru: number,
    time: object, title: object, toDateString: string, toExponential: string,
    toFixed: string, toISOString: string, toJSON: string,
    toLocaleDateString: string, toLocaleLowerCase: string,
    toLocaleString: string, toLocaleTimeString: string,
    toLocaleUpperCase: string, toLowerCase: *, toPrecision: string,
    toString: function, toTimeString: string, toUTCString: string,
    toUpperCase: *, token: function, too_long: string, too_many: string,
    top: array, tr: object, trailing_decimal_a: string, tree: string,
    trim: string, tt: object, tty: boolean, tv: boolean, type: string,
    type_confusion_a_b: string, u: object, ul: object, unclosed: string,
    unclosed_comment: string, unclosed_regexp: string, undef: boolean,
    undefined, unescaped_a: string, unexpected_a: string,
    unexpected_char_a_b: string, unexpected_comment: string,
    unexpected_property_a: string, unexpected_space_a_b: string,
    'unicode-bidi': array, unnecessary_initialize: string,
    unnecessary_use: string, unparam, unreachable_a_b: string,
    unrecognized_style_attribute_a: string, unrecognized_tag_a: string,
    unsafe: string, unshift: string, unused: array, url: string, urls: array,
    use_array: string, use_braces: string, use_charAt: string,
    use_object: string, use_or: string, use_param: string,
    used_before_a: string, valueOf: string, var: object, var_a_not: string,
    vars, 'vertical-align': array, video: object, visibility: array,
    warn: boolean, was: object, weird_assignment: string,
    weird_condition: string, weird_new: string, weird_program: string,
    weird_relation: string, weird_ternary: string, white: boolean,
    'white-space': array, widget: boolean, width: array, windows: boolean,
    'word-spacing': array, 'word-wrap': array, wrap: boolean,
    wrap_immediate: string, wrap_regexp: string, write_is_wrong: string,
    writeable: boolean, 'z-index': array
*/

// The global directive is used to declare global variables that can
// be accessed by the program. If a declaration is true, then the variable
// is writeable. Otherwise, it is read-only.

// We build the application inside a function so that we produce only a single
// global variable. That function will be invoked immediately, and its return
// value is the JSLINT function itself. That function is also an object that
// can contain data and other functions.

var JSLINT = (function () {
    'use strict';

    function array_to_object(array, value) {
        var i, object = {};
        for (i = 0; i < array.length; i += 1) {
            object[array[i]] = value;
        }
        return object;
    }


    var adsafe_id,      // The widget's ADsafe id.
        adsafe_may,     // The widget may load approved scripts.
        adsafe_top,     // At the top of the widget script.
        adsafe_went,    // ADSAFE.go has been called.
        anonname,       // The guessed name for anonymous functions.
        approved,       // ADsafe approved urls.

// These are operators that should not be used with the ! operator.

        bang = {
            '<'  : true,
            '<=' : true,
            '==' : true,
            '===': true,
            '!==': true,
            '!=' : true,
            '>'  : true,
            '>=' : true,
            '+'  : true,
            '-'  : true,
            '*'  : true,
            '/'  : true,
            '%'  : true
        },

// These are property names that should not be permitted in the safe subset.

        banned = array_to_object([
            'arguments', 'callee', 'caller', 'constructor', 'eval', 'prototype',
            'stack', 'unwatch', 'valueOf', 'watch'
        ], true),
        begin,          // The root token

// browser contains a set of global names that are commonly provided by a
// web browser environment.

        browser = array_to_object([
            'clearInterval', 'clearTimeout', 'document', 'event', 'frames',
            'history', 'Image', 'localStorage', 'location', 'name', 'navigator',
            'Option', 'parent', 'screen', 'sessionStorage', 'setInterval',
            'setTimeout', 'Storage', 'window', 'XMLHttpRequest'
        ], false),

// commonjs contains a set of global names that are commonly provided by a
// CommonJS environment.

        commonjs = array_to_object([
            'require', 'module', 'exports'
        ], false),

// bundle contains the text messages.

        bundle = {
            a_label: "'{a}' is a statement label.",
            a_not_allowed: "'{a}' is not allowed.",
            a_not_defined: "'{a}' is not defined.",
            a_scope: "'{a}' used out of scope.",
            adsafe_a: "ADsafe violation: '{a}'.",
            adsafe_autocomplete: "ADsafe autocomplete violation.",
            adsafe_bad_id: "ADSAFE violation: bad id.",
            adsafe_div: "ADsafe violation: Wrap the widget in a div.",
            adsafe_fragment: "ADSAFE: Use the fragment option.",
            adsafe_go: "ADsafe violation: Misformed ADSAFE.go.",
            adsafe_html: "Currently, ADsafe does not operate on whole HTML " +
                "documents. It operates on <div> fragments and .js files.",
            adsafe_id: "ADsafe violation: id does not match.",
            adsafe_id_go: "ADsafe violation: Missing ADSAFE.id or ADSAFE.go.",
            adsafe_lib: "ADsafe lib violation.",
            adsafe_lib_second: "ADsafe: The second argument to lib must be a function.",
            adsafe_missing_id: "ADSAFE violation: missing ID_.",
            adsafe_name_a: "ADsafe name violation: '{a}'.",
            adsafe_placement: "ADsafe script placement violation.",
            adsafe_prefix_a: "ADsafe violation: An id must have a '{a}' prefix",
            adsafe_script: "ADsafe script violation.",
            adsafe_source: "ADsafe unapproved script source.",
            adsafe_subscript_a: "ADsafe subscript '{a}'.",
            adsafe_tag: "ADsafe violation: Disallowed tag '{a}'.",
            already_defined: "'{a}' is already defined.",
            and: "The '&&' subexpression should be wrapped in parens.",
            assign_exception: "Do not assign to the exception parameter.",
            assignment_function_expression: "Expected an assignment or " +
                "function call and instead saw an expression.",
            attribute_case_a: "Attribute '{a}' not all lower case.",
            avoid_a: "Avoid '{a}'.",
            bad_assignment: "Bad assignment.",
            bad_color_a: "Bad hex color '{a}'.",
            bad_constructor: "Bad constructor.",
            bad_entity: "Bad entity.",
            bad_html: "Bad HTML string",
            bad_id_a: "Bad id: '{a}'.",
            bad_in_a: "Bad for in variable '{a}'.",
            bad_invocation: "Bad invocation.",
            bad_name_a: "Bad name: '{a}'.",
            bad_new: "Do not use 'new' for side effects.",
            bad_number: "Bad number '{a}'.",
            bad_operand: "Bad operand.",
            bad_style: "Bad style.",
            bad_type: "Bad type.",
            bad_url_a: "Bad url '{a}'.",
            bad_wrap: "Do not wrap function literals in parens unless they " +
                "are to be immediately invoked.",
            combine_var: "Combine this with the previous 'var' statement.",
            conditional_assignment: "Expected a conditional expression and " +
                "instead saw an assignment.",
            confusing_a: "Confusing use of '{a}'.",
            confusing_regexp: "Confusing regular expression.",
            constructor_name_a: "A constructor name '{a}' should start with " +
                "an uppercase letter.",
            control_a: "Unexpected control character '{a}'.",
            css: "A css file should begin with @charset 'UTF-8';",
            dangling_a: "Unexpected dangling '_' in '{a}'.",
            dangerous_comment: "Dangerous comment.",
            deleted: "Only properties should be deleted.",
            duplicate_a: "Duplicate '{a}'.",
            empty_block: "Empty block.",
            empty_case: "Empty case.",
            empty_class: "Empty class.",
            es5: "This is an ES5 feature.",
            evil: "eval is evil.",
            expected_a: "Expected '{a}'.",
            expected_a_b: "Expected '{a}' and instead saw '{b}'.",
            expected_a_b_from_c_d: "Expected '{a}' to match '{b}' from line " +
                "{c} and instead saw '{d}'.",
            expected_at_a: "Expected an at-rule, and instead saw @{a}.",
            expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
            expected_attribute_a: "Expected an attribute, and instead saw [{a}].",
            expected_attribute_value_a: "Expected an attribute value and " +
                "instead saw '{a}'.",
            expected_class_a: "Expected a class, and instead saw .{a}.",
            expected_fraction_a: "Expected a number between 0 and 1 and " +
                "instead saw '{a}'",
            expected_id_a: "Expected an id, and instead saw #{a}.",
            expected_identifier_a: "Expected an identifier and instead saw '{a}'.",
            expected_identifier_a_reserved: "Expected an identifier and " +
                "instead saw '{a}' (a reserved word).",
            expected_linear_a: "Expected a linear unit and instead saw '{a}'.",
            expected_lang_a: "Expected a lang code, and instead saw :{a}.",
            expected_media_a: "Expected a CSS media type, and instead saw '{a}'.",
            expected_name_a: "Expected a name and instead saw '{a}'.",
            expected_nonstandard_style_attribute: "Expected a non-standard " +
                "style attribute and instead saw '{a}'.",
            expected_number_a: "Expected a number and instead saw '{a}'.",
            expected_operator_a: "Expected an operator and instead saw '{a}'.",
            expected_percent_a: "Expected a percentage and instead saw '{a}'",
            expected_positive_a: "Expected a positive number and instead saw '{a}'",
            expected_pseudo_a: "Expected a pseudo, and instead saw :{a}.",
            expected_selector_a: "Expected a CSS selector, and instead saw {a}.",
            expected_small_a: "Expected a small positive integer and instead saw '{a}'",
            expected_space_a_b: "Expected exactly one space between '{a}' and '{b}'.",
            expected_string_a: "Expected a string and instead saw {a}.",
            expected_style_attribute: "Excepted a style attribute, and instead saw '{a}'.",
            expected_style_pattern: "Expected a style pattern, and instead saw '{a}'.",
            expected_tagname_a: "Expected a tagName, and instead saw {a}.",
            expected_type_a: "Expected a type, and instead saw {a}.",
            for_if: "The body of a for in should be wrapped in an if " +
                "statement to filter unwanted properties from the prototype.",
            function_block: "Function statements should not be placed in blocks. " +
                "Use a function expression or move the statement to the top of " +
                "the outer function.",
            function_eval: "The Function constructor is eval.",
            function_loop: "Don't make functions within a loop.",
            function_statement: "Function statements are not invocable. " +
                "Wrap the whole function invocation in parens.",
            function_strict: "Use the function form of 'use strict'.",
            html_confusion_a: "HTML confusion in regular expression '<{a}'.",
            html_handlers: "Avoid HTML event handlers.",
            identifier_function: "Expected an identifier in an assignment " +
                "and instead saw a function invocation.",
            implied_evil: "Implied eval is evil. Pass a function instead of a string.",
            infix_in: "Unexpected 'in'. Compare with undefined, or use the " +
                "hasOwnProperty method instead.",
            insecure_a: "Insecure '{a}'.",
            isNaN: "Use the isNaN function to compare with NaN.",
            label_a_b: "Label '{a}' on '{b}' statement.",
            lang: "lang is deprecated.",
            leading_decimal_a: "A leading decimal point can be confused with a dot: '.{a}'.",
            missing_a: "Missing '{a}'.",
            missing_a_after_b: "Missing '{a}' after '{b}'.",
            missing_option: "Missing option value.",
            missing_property: "Missing property name.",
            missing_space_a_b: "Missing space between '{a}' and '{b}'.",
            missing_url: "Missing url.",
            missing_use_strict: "Missing 'use strict' statement.",
            mixed: "Mixed spaces and tabs.",
            move_invocation: "Move the invocation into the parens that " +
                "contain the function.",
            move_var: "Move 'var' declarations to the top of the function.",
            name_function: "Missing name in function statement.",
            nested_comment: "Nested comment.",
            not: "Nested not.",
            not_a_constructor: "Do not use {a} as a constructor.",
            not_a_defined: "'{a}' has not been fully defined yet.",
            not_a_function: "'{a}' is not a function.",
            not_a_label: "'{a}' is not a label.",
            not_a_scope: "'{a}' is out of scope.",
            not_greater: "'{a}' should not be greater than '{b}'.",
            parameter_a_get_b: "Unexpected parameter '{a}' in get {b} function.",
            parameter_set_a: "Expected parameter (value) in set {a} function.",
            radix: "Missing radix parameter.",
            read_only: "Read only.",
            redefinition_a: "Redefinition of '{a}'.",
            reserved_a: "Reserved name '{a}'.",
            scanned_a_b: "{a} ({b}% scanned).",
            slash_equal: "A regular expression literal can be confused with '/='.",
            statement_block: "Expected to see a statement and instead saw a block.",
            stopping: "Stopping. ",
            strange_loop: "Strange loop.",
            strict: "Strict violation.",
            subscript: "['{a}'] is better written in dot notation.",
            tag_a_in_b: "A '<{a}>' must be within '<{b}>'.",
            too_long: "Line too long.",
            too_many: "Too many errors.",
            trailing_decimal_a: "A trailing decimal point can be confused " +
                "with a dot: '.{a}'.",
            type: "type is unnecessary.",
            type_confusion_a_b: "Type confusion: {a} and {b}.",
            unclosed: "Unclosed string.",
            unclosed_comment: "Unclosed comment.",
            unclosed_regexp: "Unclosed regular expression.",
            unescaped_a: "Unescaped '{a}'.",
            unexpected_a: "Unexpected '{a}'.",
            unexpected_char_a_b: "Unexpected character '{a}' in {b}.",
            unexpected_comment: "Unexpected comment.",
            unexpected_property_a: "Unexpected /*property*/ '{a}'.",
            unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
            unnecessary_initialize: "It is not necessary to initialize '{a}' " +
                "to 'undefined'.",
            unnecessary_use: "Unnecessary 'use strict'.",
            unreachable_a_b: "Unreachable '{a}' after '{b}'.",
            unrecognized_style_attribute_a: "Unrecognized style attribute '{a}'.",
            unrecognized_tag_a: "Unrecognized tag '<{a}>'.",
            unsafe: "Unsafe character.",
            url: "JavaScript URL.",
            use_array: "Use the array literal notation [].",
            use_braces: "Spaces are hard to count. Use {{a}}.",
            use_charAt: "Use the charAt method.",
            use_object: "Use the object literal notation {}.",
            use_or: "Use the || operator.",
            use_param: "Use a named parameter.",
            used_before_a: "'{a}' was used before it was defined.",
            var_a_not: "Variable {a} was not declared correctly.",
            weird_assignment: "Weird assignment.",
            weird_condition: "Weird condition.",
            weird_new: "Weird construction. Delete 'new'.",
            weird_program: "Weird program.",
            weird_relation: "Weird relation.",
            weird_ternary: "Weird ternary.",
            wrap_immediate: "Wrap an immediate function invocation in parentheses " +
                "to assist the reader in understanding that the expression " +
                "is the result of a function, and not the function itself.",
            wrap_regexp: "Wrap the /regexp/ literal in parens to " +
                "disambiguate the slash operator.",
            write_is_wrong: "document.write can be a form of eval."
        },
        comments_off,
        css_attribute_data,
        css_any,

        css_colorData = array_to_object([
            "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
            "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
            "burlywood", "cadetblue", "chartreuse", "chocolate", "coral",
            "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue",
            "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki",
            "darkmagenta", "darkolivegreen", "darkorange", "darkorchid",
            "darkred", "darksalmon", "darkseagreen", "darkslateblue",
            "darkslategray", "darkturquoise", "darkviolet", "deeppink",
            "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite",
            "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold",
            "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink",
            "indianred", "indigo", "ivory", "khaki", "lavender",
            "lavenderblush", "lawngreen", "lemonchiffon", "lightblue",
            "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen",
            "lightpink", "lightsalmon", "lightseagreen", "lightskyblue",
            "lightslategray", "lightsteelblue", "lightyellow", "lime",
            "limegreen", "linen", "magenta", "maroon", "mediumaquamarine",
            "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
            "mediumslateblue", "mediumspringgreen", "mediumturquoise",
            "mediumvioletred", "midnightblue", "mintcream", "mistyrose",
            "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab",
            "orange", "orangered", "orchid", "palegoldenrod", "palegreen",
            "paleturquoise", "palevioletred", "papayawhip", "peachpuff",
            "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown",
            "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen",
            "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray",
            "snow", "springgreen", "steelblue", "tan", "teal", "thistle",
            "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke",
            "yellow", "yellowgreen",

            "activeborder", "activecaption", "appworkspace", "background",
            "buttonface", "buttonhighlight", "buttonshadow", "buttontext",
            "captiontext", "graytext", "highlight", "highlighttext",
            "inactiveborder", "inactivecaption", "inactivecaptiontext",
            "infobackground", "infotext", "menu", "menutext", "scrollbar",
            "threeddarkshadow", "threedface", "threedhighlight",
            "threedlightshadow", "threedshadow", "window", "windowframe",
            "windowtext"
        ], true),

        css_border_style,
        css_break,

        css_lengthData = {
            '%': true,
            'cm': true,
            'em': true,
            'ex': true,
            'in': true,
            'mm': true,
            'pc': true,
            'pt': true,
            'px': true
        },

        css_media,
        css_overflow,

        descapes = {
            'b': '\b',
            't': '\t',
            'n': '\n',
            'f': '\f',
            'r': '\r',
            '"': '"',
            '/': '/',
            '\\': '\\'
        },

        devel = array_to_object([
            'alert', 'confirm', 'console', 'Debug', 'opera', 'prompt', 'WSH'
        ], false),
        directive,
        escapes = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '\'': '\\\'',
            '"' : '\\"',
            '/' : '\\/',
            '\\': '\\\\'
        },

        funct,          // The current function, including the labels used in
                        // the function, as well as (breakage), (complexity),
                        // (context), (loopage), (name), (params), (token),
                        // (vars), (verb)

        functionicity = [
            'closure', 'exception', 'global', 'label', 'outer', 'undef',
            'unused', 'var'
        ],

        functions,      // All of the functions
        global_funct,   // The global body
        global_scope,   // The global scope
        html_tag = {
            a:        {},
            abbr:     {},
            acronym:  {},
            address:  {},
            applet:   {},
            area:     {empty: true, parent: ' map '},
            article:  {},
            aside:    {},
            audio:    {},
            b:        {},
            base:     {empty: true, parent: ' head '},
            bdo:      {},
            big:      {},
            blockquote: {},
            body:     {parent: ' html noframes '},
            br:       {empty: true},
            button:   {},
            canvas:   {parent: ' body p div th td '},
            caption:  {parent: ' table '},
            center:   {},
            cite:     {},
            code:     {},
            col:      {empty: true, parent: ' table colgroup '},
            colgroup: {parent: ' table '},
            command:  {parent: ' menu '},
            datalist: {},
            dd:       {parent: ' dl '},
            del:      {},
            details:  {},
            dialog:   {},
            dfn:      {},
            dir:      {},
            div:      {},
            dl:       {},
            dt:       {parent: ' dl '},
            em:       {},
            embed:    {},
            fieldset: {},
            figure:   {},
            font:     {},
            footer:   {},
            form:     {},
            frame:    {empty: true, parent: ' frameset '},
            frameset: {parent: ' html frameset '},
            h1:       {},
            h2:       {},
            h3:       {},
            h4:       {},
            h5:       {},
            h6:       {},
            head:     {parent: ' html '},
            header:   {},
            hgroup:   {},
            hr:       {empty: true},
            'hta:application':
                      {empty: true, parent: ' head '},
            html:     {parent: '*'},
            i:        {},
            iframe:   {},
            img:      {empty: true},
            input:    {empty: true},
            ins:      {},
            kbd:      {},
            keygen:   {},
            label:    {},
            legend:   {parent: ' details fieldset figure '},
            li:       {parent: ' dir menu ol ul '},
            link:     {empty: true, parent: ' head '},
            map:      {},
            mark:     {},
            menu:     {},
            meta:     {empty: true, parent: ' head noframes noscript '},
            meter:    {},
            nav:      {},
            noframes: {parent: ' html body '},
            noscript: {parent: ' body head noframes '},
            object:   {},
            ol:       {},
            optgroup: {parent: ' select '},
            option:   {parent: ' optgroup select '},
            output:   {},
            p:        {},
            param:    {empty: true, parent: ' applet object '},
            pre:      {},
            progress: {},
            q:        {},
            rp:       {},
            rt:       {},
            ruby:     {},
            samp:     {},
            script:   {empty: true, parent: ' body div frame head iframe p pre span '},
            section:  {},
            select:   {},
            small:    {},
            span:     {},
            source:   {},
            strong:   {},
            style:    {parent: ' head ', empty: true},
            sub:      {},
            sup:      {},
            table:    {},
            tbody:    {parent: ' table '},
            td:       {parent: ' tr '},
            textarea: {},
            tfoot:    {parent: ' table '},
            th:       {parent: ' tr '},
            thead:    {parent: ' table '},
            time:     {},
            title:    {parent: ' head '},
            tr:       {parent: ' table tbody thead tfoot '},
            tt:       {},
            u:        {},
            ul:       {},
            'var':    {},
            video:    {}
        },

        ids,            // HTML ids
        in_block,
        indent,
//         infer_statement,// Inference rules for statements
        is_type = array_to_object([
            '*', 'array', 'boolean', 'function', 'number', 'object',
            'regexp', 'string'
        ], true),
        itself,         // JSLint itself
        jslint_limit = {
            indent: 10,
            maxerr: 1000,
            maxlen: 256
        },
        json_mode,
        lex,            // the tokenizer
        lines,
        lookahead,
        member,
        node = array_to_object([
            'Buffer', 'clearInterval', 'clearTimeout', 'console', 'exports',
            'global', 'module', 'process', 'querystring', 'require',
            'setInterval', 'setTimeout', '__dirname', '__filename'
        ], false),
        node_js,
        numbery = array_to_object(['indexOf', 'lastIndexOf', 'search'], true),
        next_token,
        option,
        predefined,     // Global variables defined by option
        prereg,
        prev_token,
        property_type,
        regexp_flag = array_to_object(['g', 'i', 'm'], true),
        return_this = function return_this() {
            return this;
        },
        rhino = array_to_object([
            'defineClass', 'deserialize', 'gc', 'help', 'load', 'loadClass',
            'print', 'quit', 'readFile', 'readUrl', 'runCommand', 'seal',
            'serialize', 'spawn', 'sync', 'toint32', 'version'
        ], false),

        scope,      // An object containing an object for each variable in scope
        semicolon_coda = array_to_object([';', '"', '\'', ')'], true),
        src,
        stack,

// standard contains the global names that are provided by the
// ECMAScript standard.

        standard = array_to_object([
            'Array', 'Boolean', 'Date', 'decodeURI', 'decodeURIComponent',
            'encodeURI', 'encodeURIComponent', 'Error', 'eval', 'EvalError',
            'Function', 'isFinite', 'isNaN', 'JSON', 'Math', 'Number', 'Object',
            'parseInt', 'parseFloat', 'RangeError', 'ReferenceError', 'RegExp',
            'String', 'SyntaxError', 'TypeError', 'URIError'
        ], false),

        standard_property_type = {
            E                   : 'number',
            LN2                 : 'number',
            LN10                : 'number',
            LOG2E               : 'number',
            LOG10E              : 'number',
            MAX_VALUE           : 'number',
            MIN_VALUE           : 'number',
            NEGATIVE_INFINITY   : 'number',
            PI                  : 'number',
            POSITIVE_INFINITY   : 'number',
            SQRT1_2             : 'number',
            SQRT2               : 'number',
            apply               : 'function',
            bind                : 'function function',
            call                : 'function',
            ceil                : 'function number',
            charAt              : 'function string',
            concat              : 'function',
            constructor         : 'function object',
            create              : 'function object',
            defineProperty      : 'function object',
            defineProperties    : 'function object',
            every               : 'function boolean',
            exec                : 'function array',
            filter              : 'function array',
            floor               : 'function number',
            forEach             : 'function',
            freeze              : 'function object',
            getDate             : 'function number',
            getDay              : 'function number',
            getFullYear         : 'function number',
            getHours            : 'function number',
            getMilliseconds     : 'function number',
            getMinutes          : 'function number',
            getMonth            : 'function number',
            getOwnPropertyDescriptor
                                : 'function object',
            getOwnPropertyNames : 'function array',
            getPrototypeOf      : 'function object',
            getSeconds          : 'function number',
            getTime             : 'function number',
            getTimezoneOffset   : 'function number',
            getUTCDate          : 'function number',
            getUTCDay           : 'function number',
            getUTCFullYear      : 'function number',
            getUTCHours         : 'function number',
            getUTCMilliseconds  : 'function number',
            getUTCMinutes       : 'function number',
            getUTCMonth         : 'function number',
            getUTCSeconds       : 'function number',
            getYear             : 'function number',
            hasOwnProperty      : 'function boolean',
            indexOf             : 'function number',
            isExtensible        : 'function boolean',
            isFrozen            : 'function boolean',
            isPrototypeOf       : 'function boolean',
            isSealed            : 'function boolean',
            join                : 'function string',
            keys                : 'function array',
            lastIndexOf         : 'function number',
            lastIndex           : 'number',
            length              : 'number',
            map                 : 'function array',
            now                 : 'function number',
            parse               : 'function',
            pop                 : 'function',
            preventExtensions   : 'function object',
            propertyIsEnumerable: 'function boolean',
            prototype           : 'object',
            push                : 'function number',
            reduce              : 'function',
            reduceRight         : 'function',
            reverse             : 'function',
            seal                : 'function object',
            setDate             : 'function',
            setDay              : 'function',
            setFullYear         : 'function',
            setHours            : 'function',
            setMilliseconds     : 'function',
            setMinutes          : 'function',
            setMonth            : 'function',
            setSeconds          : 'function',
            setTime             : 'function',
            setTimezoneOffset   : 'function',
            setUTCDate          : 'function',
            setUTCDay           : 'function',
            setUTCFullYear      : 'function',
            setUTCHours         : 'function',
            setUTCMilliseconds  : 'function',
            setUTCMinutes       : 'function',
            setUTCMonth         : 'function',
            setUTCSeconds       : 'function',
            setYear             : 'function',
            shift               : 'function',
            slice               : 'function',
            some                : 'function boolean',
            sort                : 'function',
            splice              : 'function',
            stringify           : 'function string',
            substr              : 'function string',
            substring           : 'function string',
            test                : 'function boolean',
            toDateString        : 'function string',
            toExponential       : 'function string',
            toFixed             : 'function string',
            toJSON              : 'function',
            toISOString         : 'function string',
            toLocaleDateString  : 'function string',
            toLocaleLowerCase   : 'function string',
            toLocaleUpperCase   : 'function string',
            toLocaleString      : 'function string',
            toLocaleTimeString  : 'function string',
            toLowerCase         : 'function string',
            toPrecision         : 'function string',
            toTimeString        : 'function string',
            toUpperCase         : 'function string',
            toUTCString         : 'function string',
            trim                : 'function string',
            unshift             : 'function number',
            valueOf             : 'function'
        },

        strict_mode,
        syntax = {},
        tab,
        token,
//         type_state_change,
        urls,
        var_mode,
        warnings,

// widget contains the global names which are provided to a Yahoo
// (fna Konfabulator) widget.

        widget = array_to_object([
            'alert', 'animator', 'appleScript', 'beep', 'bytesToUIString',
            'Canvas', 'chooseColor', 'chooseFile', 'chooseFolder',
            'closeWidget', 'COM', 'convertPathToHFS', 'convertPathToPlatform',
            'CustomAnimation', 'escape', 'FadeAnimation', 'filesystem', 'Flash',
            'focusWidget', 'form', 'FormField', 'Frame', 'HotKey', 'Image',
            'include', 'isApplicationRunning', 'iTunes', 'konfabulatorVersion',
            'log', 'md5', 'MenuItem', 'MoveAnimation', 'openURL', 'play',
            'Point', 'popupMenu', 'preferenceGroups', 'preferences', 'print',
            'prompt', 'random', 'Rectangle', 'reloadWidget', 'ResizeAnimation',
            'resolvePath', 'resumeUpdates', 'RotateAnimation', 'runCommand',
            'runCommandInBg', 'saveAs', 'savePreferences', 'screen',
            'ScrollBar', 'showWidgetPreferences', 'sleep', 'speak', 'Style',
            'suppressUpdates', 'system', 'tellWidget', 'Text', 'TextArea',
            'Timer', 'unescape', 'updateNow', 'URL', 'Web', 'widget', 'Window',
            'XMLDOM', 'XMLHttpRequest', 'yahooCheckLogin', 'yahooLogin',
            'yahooLogout'
        ], true),

        windows = array_to_object([
            'ActiveXObject', 'CScript', 'Debug', 'Enumerator', 'System',
            'VBArray', 'WScript', 'WSH'
        ], false),

//  xmode is used to adapt to the exceptions in html parsing.
//  It can have these states:
//      ''      .js script file
//      'html'
//      'outer'
//      'script'
//      'style'
//      'scriptstring'
//      'styleproperty'

        xmode,
        xquote,

// Regular expressions. Some of these are stupidly long.

// unsafe comment or string
        ax = /@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i,
// carriage return, or carriage return linefeed
        crx = /\r/g,
        crlfx = /\r\n/g,
// unsafe characters that are silently deleted by one or more browsers
        cx = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,
// query characters for ids
        dx = /[\[\]\/\\"'*<>.&:(){}+=#]/,
// html token
        hx = /^\s*(['"=>\/&#]|<(?:\/|\!(?:--)?)?|[a-zA-Z][a-zA-Z0-9_\-:]*|[0-9]+|--)/,
// identifier
        ix = /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,
// javascript url
        jx = /^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i,
// star slash
        lx = /\*\/|\/\*/,
// characters in strings that need escapement
        nx = /[\u0000-\u001f'\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
// outer html token
        ox = /[>&]|<[\/!]?|--/,
// attributes characters
        qx = /[^a-zA-Z0-9+\-_\/ ]/,
// style
        sx = /^\s*([{}:#%.=,>+\[\]@()"';]|\*=?|\$=|\|=|\^=|~=|[a-zA-Z_][a-zA-Z0-9_\-]*|[0-9]+|<\/|\/\*)/,
        ssx = /^\s*([@#!"'};:\-%.=,+\[\]()*_]|[a-zA-Z][a-zA-Z0-9._\-]*|\/\*?|\d+(?:\.\d+)?|<\/)/,
// token
        tx = /^\s*([(){}\[.,:;'"~\?\]#@]|==?=?|\/(\*(jslint|properties|property|members?|globals?)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|%=?|&[&=]?|\|[|=]?|>>?>?=?|<([\/=!]|\!(\[|--)?|<=?)?|\^=?|\!=?=?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+([xX][0-9a-fA-F]+|\.[0-9]*)?([eE][+\-]?[0-9]+)?)/,
// url badness
        ux = /&|\+|\u00AD|\.\.|\/\*|%[^;]|base64|url|expression|data|mailto|script/i,

        rx = {
            outer: hx,
            html: hx,
            style: sx,
            styleproperty: ssx
        };


    function F() {}     // Used by Object.create

// Provide critical ES5 functions to ES3.

    if (typeof Array.prototype.filter !== 'function') {
        Array.prototype.filter = function (f) {
            var i, length = this.length, result = [], value;
            for (i = 0; i < length; i += 1) {
                try {
                    value = this[i];
                    if (f(value)) {
                        result.push(value);
                    }
                } catch (ignore) {
                }
            }
            return result;
        };
    }

    if (typeof Array.prototype.forEach !== 'function') {
        Array.prototype.forEach = function (f) {
            var i, length = this.length;
            for (i = 0; i < length; i += 1) {
                try {
                    f(this[i]);
                } catch (ignore) {
                }
            }
        };
    }

    if (typeof Array.isArray !== 'function') {
        Array.isArray = function (o) {
            return Object.prototype.toString.apply(o) === '[object Array]';
        };
    }

    if (!Object.prototype.hasOwnProperty.call(Object, 'create')) {
        Object.create = function (o) {
            F.prototype = o;
            return new F();
        };
    }

    if (typeof Object.keys !== 'function') {
        Object.keys = function (o) {
            var array = [], key;
            for (key in o) {
                if (Object.prototype.hasOwnProperty.call(o, key)) {
                    array.push(key);
                }
            }
            return array;
        };
    }

    if (typeof String.prototype.entityify !== 'function') {
        String.prototype.entityify = function () {
            return this
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };
    }

    if (typeof String.prototype.isAlpha !== 'function') {
        String.prototype.isAlpha = function () {
            return (this >= 'a' && this <= 'z\uffff') ||
                (this >= 'A' && this <= 'Z\uffff');
        };
    }

    if (typeof String.prototype.isDigit !== 'function') {
        String.prototype.isDigit = function () {
            return (this >= '0' && this <= '9');
        };
    }

    if (typeof String.prototype.supplant !== 'function') {
        String.prototype.supplant = function (o) {
            return this.replace(/\{([^{}]*)\}/g, function (a, b) {
                var replacement = o[b];
                return typeof replacement === 'string' ||
                    typeof replacement === 'number' ? replacement : a;
            });
        };
    }


    function sanitize(a) {

//  Escapify a troublesome character.

        return escapes[a] ||
            '\\u' + ('0000' + a.charCodeAt().toString(16)).slice(-4);
    }


    function add_to_predefined(group) {
        Object.keys(group).forEach(function (name) {
            predefined[name] = group[name];
        });
    }


    function assume() {
        if (!option.safe) {
            if (option.rhino) {
                add_to_predefined(rhino);
                option.rhino = false;
            }
            if (option.devel) {
                add_to_predefined(devel);
                option.devel = false;
            }
            if (option.browser) {
                add_to_predefined(browser);
                option.browser = false;
            }
            if (option.commonjs) {
                add_to_predefined(commonjs);
                option.commonjs = false;
            }
            if (option.windows) {
                add_to_predefined(windows);
                option.windows = false;
            }
            if (option.node) {
                add_to_predefined(node);
                option.node = false;
                node_js = true;
            }
            if (option.widget) {
                add_to_predefined(widget);
                option.widget = false;
            }
        }
        if (option.type) {
            option.confusion = true;
        }
    }


// Produce an error warning.

    function artifact(tok) {
        if (!tok) {
            tok = next_token;
        }
        return tok.number || tok.string;
    }

    function quit(message, line, character) {
        throw {
            name: 'JSLintError',
            line: line,
            character: character,
            message: bundle.scanned_a_b.supplant({
                a: message,
                b: Math.floor((line / lines.length) * 100)
            })
        };
    }

    function warn(message, offender, a, b, c, d) {
        var character, line, warning;
        offender = offender || next_token;  // `~
        line = offender.line || 0;
        character = offender.from || 0;
        warning = {
            id: '(error)',
            raw: bundle[message] || message,
            evidence: lines[line - 1] || '',
            line: line,
            character: character,
            a: a || (offender.id === '(number)'
                ? String(offender.number)
                : offender.string),
            b: b,
            c: c,
            d: d
        };
        warning.reason = warning.raw.supplant(warning);
        JSLINT.errors.push(warning);
        if (option.passfail) {
            quit(bundle.stopping, line, character);
        }
        warnings += 1;
        if (warnings >= option.maxerr) {
            quit(bundle.too_many, line, character);
        }
        return warning;
    }

    function warn_at(message, line, character, a, b, c, d) {
        return warn(message, {
            line: line,
            from: character
        }, a, b, c, d);
    }

    function stop(message, offender, a, b, c, d) {
        var warning = warn(message, offender, a, b, c, d);
        quit(bundle.stopping, warning.line, warning.character);
    }

    function stop_at(message, line, character, a, b, c, d) {
        return stop(message, {
            line: line,
            from: character
        }, a, b, c, d);
    }

    function expected_at(at) {
        if (!option.white && next_token.from !== at) {
            warn('expected_a_at_b_c', next_token, '', at,
                next_token.from);
        }
    }

    function aint(it, name, expected) {
        if (it[name] !== expected) {
            warn('expected_a_b', it, expected, it[name]);
            return true;
        } else {
            return false;
        }
    }


// lexical analysis and token construction

    lex = (function lex() {
        var character, c, from, length, line, pos, source_row;

// Private lex methods

        function next_line() {
            var at;
            if (line >= lines.length) {
                return false;
            }
            character = 1;
            source_row = lines[line];
            line += 1;
            at = source_row.search(/ \t/);
            if (at >= 0) {
                warn_at('mixed', line, at + 1);
            }
            source_row = source_row.replace(/\t/g, tab);
            at = source_row.search(cx);
            if (at >= 0) {
                warn_at('unsafe', line, at);
            }
            if (option.maxlen && option.maxlen < source_row.length) {
                warn_at('too_long', line, source_row.length);
            }
            return true;
        }

// Produce a token object.  The token inherits from a syntax symbol.

        function it(type, value, quote) {
            var id, the_token;
            if (type === '(string)' || type === '(range)') {
                if (jx.test(value)) {
                    warn_at('url', line, from);
                }
            }
            the_token = Object.create(syntax[(
                type === '(punctuator)' || (type === '(identifier)' &&
                        Object.prototype.hasOwnProperty.call(syntax, value))
                    ? value
                    : type
            )] || syntax['(error)']);
            if (type === '(identifier)') {
                the_token.identifier = true;
                if (value === '__iterator__' || value === '__proto__') {
                    stop_at('reserved_a', line, from, value);
                } else if (!option.nomen &&
                        (value.charAt(0) === '_' ||
                        value.charAt(value.length - 1) === '_')) {
                    warn_at('dangling_a', line, from, value);
                }
            }
            if (type === '(number)') {
                the_token.number = +value;
            } else if (value !== undefined) {
                the_token.string = String(value);
            }
            if (quote) {
                the_token.quote = quote;
            }
            the_token.line = line;
            the_token.from = from;
            the_token.thru = character;
            id = the_token.id;
            prereg = id && (
                ('(,=:[!&|?{};'.indexOf(id.charAt(id.length - 1)) >= 0) ||
                id === 'return' || id === 'case'
            );
            return the_token;
        }

        function match(x) {
            var exec = x.exec(source_row), first;
            if (exec) {
                length = exec[0].length;
                first = exec[1];
                c = first.charAt(0);
                source_row = source_row.slice(length);
                from = character + length - first.length;
                character += length;
                return first;
            }
        }

        function string(x) {
            var c, pos = 0, r = '';

            function hex(n) {
                var i = parseInt(source_row.substr(pos + 1, n), 16);
                pos += n;
                if (i >= 32 && i <= 126 &&
                        i !== 34 && i !== 92 && i !== 39) {
                    warn_at('unexpected_a', line, character, '\\');
                }
                character += n;
                c = String.fromCharCode(i);
            }

            if (json_mode && x !== '"') {
                warn_at('expected_a', line, character, '"');
            }

            if (xquote === x || (xmode === 'scriptstring' && !xquote)) {
                return it('(punctuator)', x);
            }

            for (;;) {
                while (pos >= source_row.length) {
                    pos = 0;
                    if (xmode !== 'html' || !next_line()) {
                        stop_at('unclosed', line, from);
                    }
                }
                c = source_row.charAt(pos);
                if (c === x) {
                    character += 1;
                    source_row = source_row.slice(pos + 1);
                    return it('(string)', r, x);
                }
                if (c < ' ') {
                    if (c === '\n' || c === '\r') {
                        break;
                    }
                    warn_at('control_a',
                        line, character + pos, source_row.slice(0, pos));
                } else if (c === xquote) {
                    warn_at('bad_html', line, character + pos);
                } else if (c === '<') {
                    if (option.safe && xmode === 'html') {
                        warn_at('adsafe_a', line, character + pos, c);
                    } else if (source_row.charAt(pos + 1) === '/' && (xmode || option.safe)) {
                        warn_at('expected_a_b', line, character,
                            '<\\/', '</');
                    } else if (source_row.charAt(pos + 1) === '!' && (xmode || option.safe)) {
                        warn_at('unexpected_a', line, character, '<!');
                    }
                } else if (c === '\\') {
                    if (xmode === 'html') {
                        if (option.safe) {
                            warn_at('adsafe_a', line, character + pos, c);
                        }
                    } else if (xmode === 'styleproperty') {
                        pos += 1;
                        character += 1;
                        c = source_row.charAt(pos);
                        if (c !== x) {
                            warn_at('unexpected_a', line, character, '\\');
                        }
                    } else {
                        pos += 1;
                        character += 1;
                        c = source_row.charAt(pos);
                        switch (c) {
                        case '':
                            if (!option.es5) {
                                warn_at('es5', line, character);
                            }
                            next_line();
                            pos = -1;
                            break;
                        case xquote:
                            warn_at('bad_html', line, character + pos);
                            break;
                        case '\'':
                            if (json_mode) {
                                warn_at('unexpected_a', line, character, '\\\'');
                            }
                            break;
                        case 'u':
                            hex(4);
                            break;
                        case 'v':
                            if (json_mode) {
                                warn_at('unexpected_a', line, character, '\\v');
                            }
                            c = '\v';
                            break;
                        case 'x':
                            if (json_mode) {
                                warn_at('unexpected_a', line, character, '\\x');
                            }
                            hex(2);
                            break;
                        default:
                            c = descapes[c];
                            if (typeof c !== 'string') {
                                warn_at('unexpected_a', line, character, '\\');
                            }
                        }
                    }
                }
                r += c;
                character += 1;
                pos += 1;
            }
        }

        function number(snippet) {
            var digit;
            if (xmode !== 'style' && xmode !== 'styleproperty' &&
                    source_row.charAt(0).isAlpha()) {
                warn_at('expected_space_a_b',
                    line, character, c, source_row.charAt(0));
            }
            if (c === '0') {
                digit = snippet.charAt(1);
                if (digit.isDigit()) {
                    if (token.id !== '.' && xmode !== 'styleproperty') {
                        warn_at('unexpected_a', line, character, snippet);
                    }
                } else if (json_mode && (digit === 'x' || digit === 'X')) {
                    warn_at('unexpected_a', line, character, '0x');
                }
            }
            if (snippet.slice(snippet.length - 1) === '.') {
                warn_at('trailing_decimal_a', line, character, snippet);
            }
            if (xmode !== 'style') {
                digit = +snippet;
                if (!isFinite(digit)) {
                    warn_at('bad_number', line, character, snippet);
                }
                snippet = digit;
            }
            return it('(number)', snippet);
        }

        function comment(snippet) {
            if (comments_off || src || (xmode && xmode !== 'script' &&
                    xmode !== 'style' && xmode !== 'styleproperty')) {
                warn_at('unexpected_comment', line, character);
            } else if (xmode === 'script' && /<\//i.test(source_row)) {
                warn_at('unexpected_a', line, character, '<\/');
            } else if (option.safe && ax.test(snippet)) {
                warn_at('dangerous_comment', line, character);
            }
        }

        function regexp() {
            var b,
                bit,
                captures = 0,
                depth = 0,
                flag,
                high,
                length = 0,
                low,
                quote;
            for (;;) {
                b = true;
                c = source_row.charAt(length);
                length += 1;
                switch (c) {
                case '':
                    stop_at('unclosed_regexp', line, from);
                    return;
                case '/':
                    if (depth > 0) {
                        warn_at('unescaped_a',
                            line, from + length, '/');
                    }
                    c = source_row.slice(0, length - 1);
                    flag = Object.create(regexp_flag);
                    while (flag[source_row.charAt(length)] === true) {
                        flag[source_row.charAt(length)] = false;
                        length += 1;
                    }
                    if (source_row.charAt(length).isAlpha()) {
                        stop_at('unexpected_a',
                            line, from, source_row.charAt(length));
                    }
                    character += length;
                    source_row = source_row.slice(length);
                    quote = source_row.charAt(0);
                    if (quote === '/' || quote === '*') {
                        stop_at('confusing_regexp',
                            line, from);
                    }
                    return it('(regexp)', c);
                case '\\':
                    c = source_row.charAt(length);
                    if (c < ' ') {
                        warn_at('control_a',
                            line, from + length, String(c));
                    } else if (c === '<') {
                        warn_at(
                            bundle.unexpected_a,
                            line,
                            from + length,
                            '\\'
                        );
                    }
                    length += 1;
                    break;
                case '(':
                    depth += 1;
                    b = false;
                    if (source_row.charAt(length) === '?') {
                        length += 1;
                        switch (source_row.charAt(length)) {
                        case ':':
                        case '=':
                        case '!':
                            length += 1;
                            break;
                        default:
                            warn_at(
                                bundle.expected_a_b,
                                line,
                                from + length,
                                ':',
                                source_row.charAt(length)
                            );
                        }
                    } else {
                        captures += 1;
                    }
                    break;
                case '|':
                    b = false;
                    break;
                case ')':
                    if (depth === 0) {
                        warn_at('unescaped_a',
                            line, from + length, ')');
                    } else {
                        depth -= 1;
                    }
                    break;
                case ' ':
                    pos = 1;
                    while (source_row.charAt(length) === ' ') {
                        length += 1;
                        pos += 1;
                    }
                    if (pos > 1) {
                        warn_at('use_braces',
                            line, from + length, pos);
                    }
                    break;
                case '[':
                    c = source_row.charAt(length);
                    if (c === '^') {
                        length += 1;
                        if (!option.regexp) {
                            warn_at('insecure_a',
                                line, from + length, c);
                        } else if (source_row.charAt(length) === ']') {
                            stop_at('unescaped_a',
                                line, from + length, '^');
                        }
                    }
                    bit = false;
                    if (c === ']') {
                        warn_at('empty_class', line,
                            from + length - 1);
                        bit = true;
                    }
klass:              do {
                        c = source_row.charAt(length);
                        length += 1;
                        switch (c) {
                        case '[':
                        case '^':
                            warn_at('unescaped_a',
                                line, from + length, c);
                            bit = true;
                            break;
                        case '-':
                            if (bit) {
                                bit = false;
                            } else {
                                warn_at('unescaped_a',
                                    line, from + length, '-');
                                bit = true;
                            }
                            break;
                        case ']':
                            if (!bit) {
                                warn_at('unescaped_a',
                                    line, from + length - 1, '-');
                            }
                            break klass;
                        case '\\':
                            c = source_row.charAt(length);
                            if (c < ' ') {
                                warn_at(
                                    bundle.control_a,
                                    line,
                                    from + length,
                                    String(c)
                                );
                            } else if (c === '<') {
                                warn_at(
                                    bundle.unexpected_a,
                                    line,
                                    from + length,
                                    '\\'
                                );
                            }
                            length += 1;
                            bit = true;
                            break;
                        case '/':
                            warn_at('unescaped_a',
                                line, from + length - 1, '/');
                            bit = true;
                            break;
                        case '<':
                            if (xmode === 'script') {
                                c = source_row.charAt(length);
                                if (c === '!' || c === '/') {
                                    warn_at(
                                        bundle.html_confusion_a,
                                        line,
                                        from + length,
                                        c
                                    );
                                }
                            }
                            bit = true;
                            break;
                        default:
                            bit = true;
                        }
                    } while (c);
                    break;
                case '.':
                    if (!option.regexp) {
                        warn_at('insecure_a', line,
                            from + length, c);
                    }
                    break;
                case ']':
                case '?':
                case '{':
                case '}':
                case '+':
                case '*':
                    warn_at('unescaped_a', line,
                        from + length, c);
                    break;
                case '<':
                    if (xmode === 'script') {
                        c = source_row.charAt(length);
                        if (c === '!' || c === '/') {
                            warn_at(
                                bundle.html_confusion_a,
                                line,
                                from + length,
                                c
                            );
                        }
                    }
                    break;
                }
                if (b) {
                    switch (source_row.charAt(length)) {
                    case '?':
                    case '+':
                    case '*':
                        length += 1;
                        if (source_row.charAt(length) === '?') {
                            length += 1;
                        }
                        break;
                    case '{':
                        length += 1;
                        c = source_row.charAt(length);
                        if (c < '0' || c > '9') {
                            warn_at(
                                bundle.expected_number_a,
                                line,
                                from + length,
                                c
                            );
                        }
                        length += 1;
                        low = +c;
                        for (;;) {
                            c = source_row.charAt(length);
                            if (c < '0' || c > '9') {
                                break;
                            }
                            length += 1;
                            low = +c + (low * 10);
                        }
                        high = low;
                        if (c === ',') {
                            length += 1;
                            high = Infinity;
                            c = source_row.charAt(length);
                            if (c >= '0' && c <= '9') {
                                length += 1;
                                high = +c;
                                for (;;) {
                                    c = source_row.charAt(length);
                                    if (c < '0' || c > '9') {
                                        break;
                                    }
                                    length += 1;
                                    high = +c + (high * 10);
                                }
                            }
                        }
                        if (source_row.charAt(length) !== '}') {
                            warn_at(
                                bundle.expected_a_b,
                                line,
                                from + length,
                                '}',
                                c
                            );
                        } else {
                            length += 1;
                        }
                        if (source_row.charAt(length) === '?') {
                            length += 1;
                        }
                        if (low > high) {
                            warn_at(
                                bundle.not_greater,
                                line,
                                from + length,
                                low,
                                high
                            );
                        }
                        break;
                    }
                }
            }
            c = source_row.slice(0, length - 1);
            character += length;
            source_row = source_row.slice(length);
            return it('(regexp)', c);
        }

// Public lex methods

        return {
            init: function (source) {
                if (typeof source === 'string') {
                    lines = source
                        .replace(crlfx, '\n')
                        .replace(crx, '\n')
                        .split('\n');
                } else {
                    lines = source;
                }
                line = 0;
                next_line();
                from = 1;
            },

            range: function (begin, end) {
                var c, value = '';
                from = character;
                if (source_row.charAt(0) !== begin) {
                    stop_at('expected_a_b', line, character, begin,
                        source_row.charAt(0));
                }
                for (;;) {
                    source_row = source_row.slice(1);
                    character += 1;
                    c = source_row.charAt(0);
                    switch (c) {
                    case '':
                        stop_at('missing_a', line, character, c);
                        break;
                    case end:
                        source_row = source_row.slice(1);
                        character += 1;
                        return it('(range)', value);
                    case xquote:
                    case '\\':
                        warn_at('unexpected_a', line, character, c);
                        break;
                    }
                    value += c;
                }
            },

// token -- this is called by advance to get the next token.

            token: function () {
                var c, i, snippet;

                for (;;) {
                    while (!source_row) {
                        if (!next_line()) {
                            return it('(end)');
                        }
                    }
                    while (xmode === 'outer') {
                        i = source_row.search(ox);
                        if (i === 0) {
                            break;
                        } else if (i > 0) {
                            character += 1;
                            source_row = source_row.slice(i);
                            break;
                        } else {
                            if (!next_line()) {
                                return it('(end)', '');
                            }
                        }
                    }
                    snippet = match(rx[xmode] || tx);
                    if (!snippet) {
                        if (source_row) {
                            if (source_row.charAt(0) === ' ') {
                                warn_at('unexpected_a', line, character, ' ');
                                character += 1;
                                source_row = '';
                            } else {
                                stop_at('unexpected_a', line, character,
                                    source_row.charAt(0));
                            }
                        }
                    } else {

//      identifier

                        c = snippet.charAt(0);
                        if (c.isAlpha() || c === '_' || c === '$') {
                            return it('(identifier)', snippet);
                        }

//      number

                        if (c.isDigit()) {
                            return number(snippet);
                        }
                        switch (snippet) {

//      string

                        case '"':
                        case "'":
                            return string(snippet);

//      // comment

                        case '//':
                            comment(source_row);
                            source_row = '';
                            break;

//      /* comment

                        case '/*':
                            for (;;) {
                                i = source_row.search(lx);
                                if (i >= 0) {
                                    break;
                                }
                                comment(source_row);
                                if (!next_line()) {
                                    stop_at('unclosed_comment', line, character);
                                }
                            }
                            comment(source_row.slice(0, i));
                            character += i + 2;
                            if (source_row.charAt(i) === '/') {
                                stop_at('nested_comment', line, character);
                            }
                            source_row = source_row.slice(i + 2);
                            break;

                        case '':
                            break;
//      /
                        case '/':
                            if (token.id === '/=') {
                                stop_at(
                                    bundle.slash_equal,
                                    line,
                                    from
                                );
                            }
                            return prereg
                                ? regexp()
                                : it('(punctuator)', snippet);

//      punctuator

                        case '<!--':
                            length = line;
//                            c = character;
                            for (;;) {
                                i = source_row.indexOf('--');
                                if (i >= 0) {
                                    break;
                                }
                                i = source_row.indexOf('<!');
                                if (i >= 0) {
                                    stop_at('nested_comment',
                                        line, character + i);
                                }
                                if (!next_line()) {
                                    stop_at('unclosed_comment', length, c);
                                }
                            }
                            length = source_row.indexOf('<!');
                            if (length >= 0 && length < i) {
                                stop_at('nested_comment',
                                    line, character + length);
                            }
                            character += i;
                            if (source_row.charAt(i + 2) !== '>') {
                                stop_at('expected_a', line, character, '-->');
                            }
                            character += 3;
                            source_row = source_row.slice(i + 3);
                            break;
                        case '#':
                            if (xmode === 'html' || xmode === 'styleproperty') {
                                for (;;) {
                                    c = source_row.charAt(0);
                                    if ((c < '0' || c > '9') &&
                                            (c < 'a' || c > 'f') &&
                                            (c < 'A' || c > 'F')) {
                                        break;
                                    }
                                    character += 1;
                                    source_row = source_row.slice(1);
                                    snippet += c;
                                }
                                if (snippet.length !== 4 && snippet.length !== 7) {
                                    warn_at('bad_color_a', line,
                                        from + length, snippet);
                                }
                                return it('(color)', snippet);
                            }
                            return it('(punctuator)', snippet);

                        default:
                            if (xmode === 'outer' && c === '&') {
                                character += 1;
                                source_row = source_row.slice(1);
                                for (;;) {
                                    c = source_row.charAt(0);
                                    character += 1;
                                    source_row = source_row.slice(1);
                                    if (c === ';') {
                                        break;
                                    }
                                    if (!((c >= '0' && c <= '9') ||
                                            (c >= 'a' && c <= 'z') ||
                                            c === '#')) {
                                        stop_at('bad_entity', line, from + length,
                                            character);
                                    }
                                }
                                break;
                            }
                            return it('(punctuator)', snippet);
                        }
                    }
                }
            }
        };
    }());


    function add_label(token, kind, name) {

// Define the symbol in the current function in the current scope.

        name = name || token.string;

// Global variables cannot be created in the safe subset. If a global variable
// already exists, do nothing. If it is predefined, define it.

        if (funct === global_funct) {
            if (option.safe) {
                warn('adsafe_a', token, name);
            }
            if (typeof global_funct[name] !== 'string') {
                token.writeable = typeof predefined[name] === 'boolean'
                    ? predefined[name]
                    : true;
                token.funct = funct;
                global_scope[name] = token;
            }
            if (kind === 'becoming') {
                kind = 'var';
            }

// Ordinary variables.

        } else {

// Warn if the variable already exists.

            if (typeof funct[name] === 'string') {
                if (funct[name] === 'undef') {
                    if (!option.undef) {
                        warn('used_before_a', token, name);
                    }
                    kind = 'var';
                } else {
                    warn('already_defined', token, name);
                }
            } else {

// Add the symbol to the current function.

                token.funct = funct;
                token.writeable = true;
                scope[name] = token;
            }
        }
        funct[name] = kind;
    }


    function peek(distance) {

// Peek ahead to a future token. The distance is how far ahead to look. The
// default is the next token.

        var found, slot = 0;

        distance = distance || 0;
        while (slot <= distance) {
            found = lookahead[slot];
            if (!found) {
                found = lookahead[slot] = lex.token();
            }
            slot += 1;
        }
        return found;
    }


    function advance(id, match) {

// Produce the next token, also looking for programming errors.

        if (indent) {

// If indentation checking was requested, then inspect all of the line breakings.
// The var statement is tricky because the names might be aligned or not. We
// look at the first line break after the var to determine the programmer's
// intention.

            if (var_mode && next_token.line !== token.line) {
                if ((var_mode !== indent || !next_token.edge) &&
                        next_token.from === indent.at -
                        (next_token.edge ? option.indent : 0)) {
                    var dent = indent;
                    for (;;) {
                        dent.at -= option.indent;
                        if (dent === var_mode) {
                            break;
                        }
                        dent = dent.was;
                    }
                    dent.open = false;
                }
                var_mode = null;
            }
            if (next_token.id === '?' && indent.mode === ':' &&
                    token.line !== next_token.line) {
                indent.at -= option.indent;
            }
            if (indent.open) {

// If the token is an edge.

                if (next_token.edge) {
                    if (next_token.edge === 'label') {
                        expected_at(1);
                    } else if (next_token.edge === 'case') {
                        expected_at(indent.at - option.indent);
                    } else if (indent.mode !== 'array' || next_token.line !== token.line) {
                        expected_at(indent.at);
                    }

// If the token is not an edge, but is the first token on the line.

                } else if (next_token.line !== token.line) {
                    if (next_token.from < indent.at + (indent.mode ===
                            'expression' ? 0 : option.indent)) {
                        expected_at(indent.at + option.indent);
                    }
                    indent.wrap = true;
                }
            } else if (next_token.line !== token.line) {
                if (next_token.edge) {
                    expected_at(indent.at);
                } else {
                    indent.wrap = true;
                    if (indent.mode === 'statement' || indent.mode === 'var') {
                        expected_at(indent.at + option.indent);
                    } else if (next_token.from < indent.at + (indent.mode ===
                            'expression' ? 0 : option.indent)) {
                        expected_at(indent.at + option.indent);
                    }
                }
            }
        }

        switch (token.id) {
        case '(number)':
            if (next_token.id === '.') {
                warn('trailing_decimal_a');
            }
            break;
        case '-':
            if (next_token.id === '-' || next_token.id === '--') {
                warn('confusing_a');
            }
            break;
        case '+':
            if (next_token.id === '+' || next_token.id === '++') {
                warn('confusing_a');
            }
            break;
        }
        if (token.id === '(string)' || token.identifier) {
            anonname = token.string;
        }

        if (id && next_token.id !== id) {
            if (match) {
                warn('expected_a_b_from_c_d', next_token, id,
                    match.id, match.line, artifact());
            } else if (!next_token.identifier || next_token.string !== id) {
                warn('expected_a_b', next_token, id, artifact());
            }
        }
        prev_token = token;
        token = next_token;
        next_token = lookahead.shift() || lex.token();
    }


    function advance_identifier(string) {
        if (next_token.identifier && next_token.string === string) {
            advance();
        } else {
            warn('expected_a_b', next_token, string, artifact());
        }
    }


    function do_safe() {
        if (option.adsafe) {
            option.safe = true;
        }
        if (option.safe) {
            option.browser     =
                option['continue'] =
                option.css     =
                option.debug   =
                option.devel   =
                option.evil    =
                option.forin   =
                option.newcap  =
                option.nomen   =
                option.on      =
                option.rhino   =
                option.sloppy  =
                option.sub     =
                option.undef   =
                option.widget  =
                option.windows = false;


            delete predefined.Array;
            delete predefined.Date;
            delete predefined.Function;
            delete predefined.Object;
            delete predefined['eval'];

            add_to_predefined({
                ADSAFE: false,
                lib: false
            });
        }
    }


    function do_globals() {
        var name, writeable;
        for (;;) {
            if (next_token.id !== '(string)' && !next_token.identifier) {
                return;
            }
            name = next_token.string;
            advance();
            writeable = false;
            if (next_token.id === ':') {
                advance(':');
                switch (next_token.id) {
                case 'true':
                    writeable = predefined[name] !== false;
                    advance('true');
                    break;
                case 'false':
                    advance('false');
                    break;
                default:
                    stop('unexpected_a');
                }
            }
            predefined[name] = writeable;
            if (next_token.id !== ',') {
                return;
            }
            advance(',');
        }
    }


    function do_jslint() {
        var name, value;
        while (next_token.id === '(string)' || next_token.identifier) {
            name = next_token.string;
            advance();
            if (next_token.id !== ':') {
                stop('expected_a_b', next_token, ':', artifact());
            }
            advance(':');
            if (typeof jslint_limit[name] === 'number') {
                value = next_token.number;
                if (value > jslint_limit[name] || value <= 0 ||
                        Math.floor(value) !== value) {
                    stop('expected_small_a');
                }
                option[name] = value;
            } else {
                if (next_token.id === 'true') {
                    option[name] = true;
                } else if (next_token.id === 'false') {
                    option[name] = false;
                } else {
                    stop('unexpected_a');
                }
                switch (name) {
                case 'adsafe':
                    option.safe = true;
                    do_safe();
                    break;
                case 'safe':
                    do_safe();
                    break;
                }
            }
            advance();
            if (next_token.id === ',') {
                advance(',');
            }
        }
        assume();
    }


    function do_properties() {
        var name, type;
        option.properties = true;
        if (!funct['(old_property_type)']) {
            funct['(old_property_type)'] = property_type;
            property_type = Object.create(property_type);
        }
        for (;;) {
            if (next_token.id !== '(string)' && !next_token.identifier) {
                return;
            }
            name = next_token.string;
            type = '';
            advance();
            if (next_token.id === ':') {
                advance(':');
                if (next_token.id === 'function') {
                    advance('function');
                    if (is_type[next_token.string] === true) {
                        type = 'function ' + next_token.string;
                        advance();
                    } else {
                        type = 'function';
                    }
                } else {
                    type = next_token.string;
                    if (is_type[type] !== true) {
                        warn('expected_type_a', next_token);
                        type = '';
                    }
                    advance();
                }
            }
            property_type[name] = type;
            if (next_token.id !== ',') {
                return;
            }
            advance(',');
        }
    }


    directive = function directive() {
        var command = this.id,
            old_comments_off = comments_off,
            old_indent = indent;
        comments_off = true;
        indent = null;
        if (next_token.line === token.line && next_token.from === token.thru) {
            warn('missing_space_a_b', next_token, artifact(token), artifact());
        }
        if (lookahead.length > 0) {
            warn('unexpected_a', this);
        }
        switch (command) {
        case '/*properties':
        case '/*property':
        case '/*members':
        case '/*member':
            do_properties();
            break;
        case '/*jslint':
            if (option.safe) {
                warn('adsafe_a', this);
            }
            do_jslint();
            break;
        case '/*globals':
        case '/*global':
            if (option.safe) {
                warn('adsafe_a', this);
            }
            do_globals();
            break;
        default:
            stop('unexpected_a', this);
        }
        comments_off = old_comments_off;
        advance('*/');
        indent = old_indent;
    };


// Indentation intention

    function edge(mode) {
        next_token.edge = indent ? indent.open && (mode || 'edge') : '';
    }


    function step_in(mode) {
        var open;
        if (typeof mode === 'number') {
            indent = {
                at: +mode,
                open: true,
                was: indent
            };
        } else if (!indent) {
            indent = {
                at: 1,
                mode: 'statement',
                open: true
            };
        } else {
            open = mode === 'var' ||
                (next_token.line !== token.line && mode !== 'statement');
            indent = {
                at: (open || mode === 'control'
                    ? indent.at + option.indent
                    : indent.at) + (indent.wrap ? option.indent : 0),
                mode: mode,
                open: open,
                was: indent
            };
            if (mode === 'var' && open) {
                var_mode = indent;
            }
        }
    }

    function step_out(id, symbol) {
        if (id) {
            if (indent && indent.open) {
                indent.at -= option.indent;
                edge();
            }
            advance(id, symbol);
        }
        if (indent) {
            indent = indent.was;
        }
    }

// Functions for conformance of whitespace.

    function one_space(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && !option.white &&
                (token.line !== right.line ||
                token.thru + 1 !== right.from)) {
            warn('expected_space_a_b', right, artifact(token), artifact(right));
        }
    }

    function one_space_only(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && (left.line !== right.line ||
                (!option.white && left.thru + 1 !== right.from))) {
            warn('expected_space_a_b', right, artifact(left), artifact(right));
        }
    }

    function no_space(left, right) {
        left = left || token;
        right = right || next_token;
        if ((!option.white || xmode === 'styleproperty' || xmode === 'style') &&
                left.thru !== right.from && left.line === right.line) {
            warn('unexpected_space_a_b', right, artifact(left), artifact(right));
        }
    }

    function no_space_only(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && (left.line !== right.line ||
                (!option.white && left.thru !== right.from))) {
            warn('unexpected_space_a_b', right, artifact(left), artifact(right));
        }
    }

    function spaces(left, right) {
        if (!option.white) {
            left = left || token;
            right = right || next_token;
            if (left.thru === right.from && left.line === right.line) {
                warn('missing_space_a_b', right, artifact(left), artifact(right));
            }
        }
    }

    function comma() {
        if (next_token.id !== ',') {
            warn_at('expected_a_b', token.line, token.thru, ',', artifact());
        } else {
            if (!option.white) {
                no_space_only();
            }
            advance(',');
            spaces();
        }
    }


    function semicolon() {
        if (next_token.id !== ';') {
            warn_at('expected_a_b', token.line, token.thru, ';', artifact());
        } else {
            if (!option.white) {
                no_space_only();
            }
            advance(';');
            if (semicolon_coda[next_token.id] !== true) {
                spaces();
            }
        }
    }

    function use_strict() {
        if (next_token.string === 'use strict') {
            if (strict_mode) {
                warn('unnecessary_use');
            }
            edge();
            advance();
            semicolon();
            strict_mode = true;
            option.newcap = false;
            option.undef = false;
            return true;
        } else {
            return false;
        }
    }


    function are_similar(a, b) {
        if (a === b) {
            return true;
        }
        if (Array.isArray(a)) {
            if (Array.isArray(b) && a.length === b.length) {
                var i;
                for (i = 0; i < a.length; i += 1) {
                    if (!are_similar(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        if (Array.isArray(b)) {
            return false;
        }
        if (a.id === '(number)' && b.id === '(number)') {
            return a.number === b.number;
        }
        if (a.arity === b.arity && a.string === b.string) {
            switch (a.arity) {
            case 'prefix':
            case 'suffix':
            case undefined:
                return a.id === b.id && are_similar(a.first, b.first);
            case 'infix':
                return are_similar(a.first, b.first) &&
                    are_similar(a.second, b.second);
            case 'ternary':
                return are_similar(a.first, b.first) &&
                    are_similar(a.second, b.second) &&
                    are_similar(a.third, b.third);
            case 'function':
            case 'regexp':
                return false;
            default:
                return true;
            }
        } else {
            if (a.id === '.' && b.id === '[' && b.arity === 'infix') {
                return a.second.string === b.second.string && b.second.id === '(string)';
            } else if (a.id === '[' && a.arity === 'infix' && b.id === '.') {
                return a.second.string === b.second.string && a.second.id === '(string)';
            }
        }
        return false;
    }


// This is the heart of JSLINT, the Pratt parser. In addition to parsing, it
// is looking for ad hoc lint patterns. We add .fud to Pratt's model, which is
// like .nud except that it is only used on the first token of a statement.
// Having .fud makes it much easier to define statement-oriented languages like
// JavaScript. I retained Pratt's nomenclature.

// .nud     Null denotation
// .fud     First null denotation
// .led     Left denotation
//  lbp     Left binding power
//  rbp     Right binding power

// They are elements of the parsing method called Top Down Operator Precedence.

    function expression(rbp, initial) {

// rbp is the right binding power.
// initial indicates that this is the first expression of a statement.

        var left;
        if (next_token.id === '(end)') {
            stop('unexpected_a', token, next_token.id);
        }
        advance();
        if (option.safe && scope[token.string] &&
                scope[token.string] === global_scope[token.string] &&
                (next_token.id !== '(' && next_token.id !== '.')) {
            warn('adsafe_a', token);
        }
        if (initial) {
            anonname = 'anonymous';
            funct['(verb)'] = token.string;
        }
        if (initial === true && token.fud) {
            left = token.fud();
        } else {
            if (token.nud) {
                left = token.nud();
            } else {
                if (next_token.id === '(number)' && token.id === '.') {
                    warn('leading_decimal_a', token, artifact());
                    advance();
                    return token;
                } else {
                    stop('expected_identifier_a', token, token.id);
                }
            }
            while (rbp < next_token.lbp) {
                advance();
                if (token.led) {
                    left = token.led(left);
                } else {
                    stop('expected_operator_a', token, token.id);
                }
            }
        }
        return left;
    }


// Functional constructors for making the symbols that will be inherited by
// tokens.

    function symbol(s, p) {
        var x = syntax[s];
        if (!x || typeof x !== 'object') {
            syntax[s] = x = {
                id: s,
                lbp: p || 0,
                string: s
            };
        }
        return x;
    }

    function postscript(x) {
        x.postscript = true;
        return x;
    }

    function ultimate(s) {
        var x = symbol(s, 0);
        x.from = 1;
        x.thru = 1;
        x.line = 0;
        x.edge = 'edge';
        s.string = s;
        return postscript(x);
    }


    function stmt(s, f) {
        var x = symbol(s);
        x.identifier = x.reserved = true;
        x.fud = f;
        return x;
    }

    function labeled_stmt(s, f) {
        var x = stmt(s, f);
        x.labeled = true;
    }

    function disrupt_stmt(s, f) {
        var x = stmt(s, f);
        x.disrupt = true;
    }


    function reserve_name(x) {
        var c = x.id.charAt(0);
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            x.identifier = x.reserved = true;
        }
        return x;
    }


    function prefix(s, f, type) {
        var x = symbol(s, 150);
        reserve_name(x);
        x.nud = typeof f === 'function'
            ? f
            : function () {
                if (s === 'typeof') {
                    one_space();
                } else {
                    no_space_only();
                }
                this.first = expression(150);
                this.arity = 'prefix';
                if (this.id === '++' || this.id === '--') {
                    if (!option.plusplus) {
                        warn('unexpected_a', this);
                    } else if ((!this.first.identifier || this.first.reserved) &&
                            this.first.id !== '.' && this.first.id !== '[') {
                        warn('bad_operand', this);
                    }
                }
                this.type = type;
                return this;
            };
        return x;
    }


    function type(s, t, nud) {
        var x = symbol(s);
        x.arity = x.type = t;
        if (nud) {
            x.nud = nud;
        }
        return x;
    }


    function reserve(s, f) {
        var x = symbol(s);
        x.identifier = x.reserved = true;
        if (typeof f === 'function') {
            x.nud = f;
        }
        return x;
    }


    function constant(name, type) {
        var x = reserve(name);
        x.type = type;
        x.string = name;
        x.nud = return_this;
        return x;
    }


    function reservevar(s, v) {
        return reserve(s, function () {
            if (typeof v === 'function') {
                v(this);
            }
            return this;
        });
    }


    function infix(s, p, f, type, w) {
        var x = symbol(s, p);
        reserve_name(x);
        x.led = function (left) {
            this.arity = 'infix';
            if (!w) {
                spaces(prev_token, token);
                spaces();
            }
            if (!option.bitwise && this.bitwise) {
                warn('unexpected_a', this);
            }
            if (typeof f === 'function') {
                return f(left, this);
            } else {
                this.first = left;
                this.second = expression(p);
                return this;
            }
        };
        if (type) {
            x.type = type;
        }
        return x;
    }

    function expected_relation(node, message) {
        if (node.assign) {
            warn(message || bundle.conditional_assignment, node);
        }
        return node;
    }

    function expected_condition(node, message) {
        switch (node.id) {
        case '[':
        case '-':
            if (node.arity !== 'infix') {
                warn(message || bundle.weird_condition, node);
            }
            break;
        case 'false':
        case 'function':
        case 'Infinity':
        case 'NaN':
        case 'null':
        case 'true':
        case 'undefined':
        case 'void':
        case '(number)':
        case '(regexp)':
        case '(string)':
        case '{':
            warn(message || bundle.weird_condition, node);
            break;
        case '(':
            if (node.first.id === '.' && numbery[node.first.second.string] === true) {
                warn(message || bundle.weird_condition, node);
            }
            break;
        }
        return node;
    }

    function check_relation(node) {
        switch (node.arity) {
        case 'prefix':
            switch (node.id) {
            case '{':
            case '[':
                warn('unexpected_a', node);
                break;
            case '!':
                warn('confusing_a', node);
                break;
            }
            break;
        case 'function':
        case 'regexp':
            warn('unexpected_a', node);
            break;
        default:
            if (node.id  === 'NaN') {
                warn('isnan', node);
            }
        }
        return node;
    }


    function relation(s, eqeq) {
        return infix(s, 100, function (left, that) {
            check_relation(left);
            if (eqeq && !option.eqeq) {
                warn('expected_a_b', that, eqeq, that.id);
            }
            var right = expression(100);
            if (are_similar(left, right) ||
                    ((left.id === '(string)' || left.id === '(number)') &&
                    (right.id === '(string)' || right.id === '(number)'))) {
                warn('weird_relation', that);
            }
            that.first = left;
            that.second = check_relation(right);
            return that;
        }, 'boolean');
    }


    function assignop(s, op) {
        var x = infix(s, 20, function (left, that) {
            var l;
            that.first = left;
            if (left.identifier) {
                if (scope[left.string]) {
                    if (scope[left.string].writeable === false) {
                        warn('read_only', left);
                    }
                } else {
                    stop('read_only');
                }
            } else if (option.safe) {
                l = left;
                do {
                    if (typeof predefined[l.string] === 'boolean') {
                        warn('adsafe_a', l);
                    }
                    l = l.first;
                } while (l);
            }
            if (left === syntax['function']) {
                warn('identifier_function', token);
            }
            if (left.id === '.' || left.id === '[') {
                if (!left.first || left.first.string === 'arguments') {
                    warn('bad_assignment', that);
                }
            } else if (left.identifier && !left.reserved) {
                if (funct[left.string] === 'exception') {
                    warn('assign_exception', left);
                }
            }
            that.second = expression(19);
            if (that.id === '=' && are_similar(that.first, that.second)) {
                warn('weird_assignment', that);
            }
            return that;
        });
        x.assign = true;
        if (op) {
            if (syntax[op].type) {
                x.type = syntax[op].type;
            }
            if (syntax[op].bitwise) {
                x.bitwise = true;
            }
        }
        return x;
    }


    function bitwise(s, p) {
        var x = infix(s, p, 'number');
        x.bitwise = true;
        return x;
    }


    function suffix(s) {
        var x = symbol(s, 150);
        x.led = function (left) {
            no_space_only(prev_token, token);
            if (!option.plusplus) {
                warn('unexpected_a', this);
            } else if ((!left.identifier || left.reserved) &&
                    left.id !== '.' && left.id !== '[') {
                warn('bad_operand', this);
            }
            this.first = left;
            this.arity = 'suffix';
            return this;
        };
        return x;
    }


    function optional_identifier() {
        if (next_token.identifier) {
            advance();
            if (option.safe && banned[token.string]) {
                warn('adsafe_a', token);
            } else if (token.reserved && !option.es5) {
                warn('expected_identifier_a_reserved', token);
            }
            return token.string;
        }
    }


    function identifier() {
        var i = optional_identifier();
        if (!i) {
            stop(token.id === 'function' && next_token.id === '('
                ? 'name_function'
                : 'expected_identifier_a');
        }
        return i;
    }


    function statement() {

        var label, old_scope = scope, the_statement;

// We don't like the empty statement.

        if (next_token.id === ';') {
            warn('unexpected_a');
            semicolon();
            return;
        }

// Is this a labeled statement?

        if (next_token.identifier && !next_token.reserved && peek().id === ':') {
            edge('label');
            label = next_token;
            advance();
            advance(':');
            scope = Object.create(old_scope);
            add_label(label, 'label');
            if (next_token.labeled !== true) {
                warn('label_a_b', next_token, label.string, artifact());
            } else if (jx.test(label.string + ':')) {
                warn('url', label);
            } else if (funct === global_funct) {
                stop('unexpected_a', token);
            }
            next_token.label = label;
        }

// Parse the statement.

        edge();
        step_in('statement');
        the_statement = expression(0, true);
        if (the_statement) {

// Look for the final semicolon.

            if (the_statement.arity === 'statement') {
                if (the_statement.id === 'switch' ||
                        (the_statement.block && the_statement.id !== 'do')) {
                    spaces();
                } else {
                    semicolon();
                }
            } else {

// If this is an expression statement, determine if it is acceptable.
// We do not like
//      new Blah();
// statments. If it is to be used at all, new should only be used to make
// objects, not side effects. The expression statements we do like do
// assignment or invocation or delete.

                if (the_statement.id === '(') {
                    if (the_statement.first.id === 'new') {
                        warn('bad_new');
                    }
                } else if (!the_statement.assign &&
                        the_statement.id !== 'delete' &&
                        the_statement.id !== '++' &&
                        the_statement.id !== '--') {
                    warn('assignment_function_expression', token);
                }
                semicolon();
            }
        }
        step_out();
        scope = old_scope;
        return the_statement;
    }


    function statements() {
        var array = [], disruptor, the_statement;

// A disrupt statement may not be followed by any other statement.
// If the last statement is disrupt, then the sequence is disrupt.

        while (next_token.postscript !== true) {
            if (next_token.id === ';') {
                warn('unexpected_a', next_token);
                semicolon();
            } else {
                if (next_token.string === 'use strict') {
                    if ((!node_js && xmode !== 'script') || funct !== global_funct || array.length > 0) {
                        warn('function_strict');
                    }
                    use_strict();
                }
                if (disruptor) {
                    warn('unreachable_a_b', next_token, next_token.string,
                        disruptor.string);
                    disruptor = null;
                }
                the_statement = statement();
                if (the_statement) {
                    array.push(the_statement);
                    if (the_statement.disrupt) {
                        disruptor = the_statement;
                        array.disrupt = true;
                    }
                }
            }
        }
        return array;
    }


    function block(ordinary) {

// array block is array sequence of statements wrapped in braces.
// ordinary is false for function bodies and try blocks.
// ordinary is true for if statements, while, etc.

        var array,
            curly = next_token,
            old_in_block = in_block,
            old_scope = scope,
            old_strict_mode = strict_mode;

        in_block = ordinary;
        scope = Object.create(scope);
        spaces();
        if (next_token.id === '{') {
            advance('{');
            step_in();
            if (!ordinary && !use_strict() && !old_strict_mode &&
                    !option.sloppy && funct['(context)'] === global_funct) {
                warn('missing_use_strict');
            }
            array = statements();
            strict_mode = old_strict_mode;
            step_out('}', curly);
        } else if (!ordinary) {
            stop('expected_a_b', next_token, '{', artifact());
        } else {
            warn('expected_a_b', next_token, '{', artifact());
            array = [statement()];
            array.disrupt = array[0].disrupt;
        }
        funct['(verb)'] = null;
        scope = old_scope;
        in_block = old_in_block;
        if (ordinary && array.length === 0) {
            warn('empty_block');
        }
        return array;
    }


    function tally_property(name) {
        if (option.properties && typeof property_type[name] !== 'string') {
            warn('unexpected_property_a', token, name);
        }
        if (typeof member[name] === 'number') {
            member[name] += 1;
        } else {
            member[name] = 1;
        }
    }


// ECMAScript parser

    syntax['(identifier)'] = {
        id: '(identifier)',
        lbp: 0,
        identifier: true,
        nud: function () {
            var name = this.string,
                variable = scope[name],
                site,
                writeable;

// If the variable is not in scope, then we may have an undeclared variable.
// Check the predefined list. If it was predefined, create the global
// variable.

            if (typeof variable !== 'object') {
                writeable = predefined[name];
                if (typeof writeable === 'boolean') {
                    global_scope[name] = variable = {
                        string:    name,
                        writeable: writeable,
                        funct:     global_funct
                    };
                    global_funct[name] = 'var';

// But if the variable is not in scope, and is not predefined, and if we are not
// in the global scope, then we have an undefined variable error.

                } else {
                    if (!option.undef) {
                        warn('used_before_a', token);
                    }
                    scope[name] = variable = {
                        string: name,
                        writeable: true,
                        funct: funct
                    };
                    funct[name] = 'undef';
                }

            }
            site = variable.funct;

// The name is in scope and defined in the current function.

            if (funct === site) {

//      Change 'unused' to 'var', and reject labels.

                switch (funct[name]) {
                case 'becoming':
                    warn('unexpected_a', token);
                    funct[name] = 'var';
                    break;
                case 'unused':
                    funct[name] = 'var';
                    break;
                case 'unparam':
                    funct[name] = 'parameter';
                    break;
                case 'unction':
                    funct[name] = 'function';
                    break;
                case 'label':
                    warn('a_label', token, name);
                    break;
                }

// If the name is already defined in the current
// function, but not as outer, then there is a scope error.

            } else {
                switch (funct[name]) {
                case 'closure':
                case 'function':
                case 'var':
                case 'unused':
                    warn('a_scope', token, name);
                    break;
                case 'label':
                    warn('a_label', token, name);
                    break;
                case 'outer':
                case 'global':
                    break;
                default:

// If the name is defined in an outer function, make an outer entry, and if
// it was unused, make it var.

                    switch (site[name]) {
                    case 'becoming':
                    case 'closure':
                    case 'function':
                    case 'parameter':
                    case 'unction':
                    case 'unused':
                    case 'var':
                        site[name] = 'closure';
                        funct[name] = site === global_funct
                            ? 'global'
                            : 'outer';
                        break;
                    case 'unparam':
                        site[name] = 'parameter';
                        funct[name] = 'outer';
                        break;
                    case 'undef':
                        funct[name] = 'undef';
                        break;
                    case 'label':
                        warn('a_label', token, name);
                        break;
                    }
                }
            }
            return this;
        },
        led: function () {
            stop('expected_operator_a');
        }
    };

// Build the syntax table by declaring the syntactic elements.

    type('(array)', 'array');
    type('(color)', 'color');
    type('(function)', 'function');
    type('(number)', 'number', return_this);
    type('(object)', 'object');
    type('(string)', 'string', return_this);
    type('(boolean)', 'boolean', return_this);
    type('(range)', 'range');
    type('(regexp)', 'regexp', return_this);

    ultimate('(begin)');
    ultimate('(end)');
    ultimate('(error)');
    postscript(symbol('</'));
    symbol('<!');
    symbol('<!--');
    symbol('-->');
    postscript(symbol('}'));
    symbol(')');
    symbol(']');
    postscript(symbol('"'));
    postscript(symbol('\''));
    symbol(';');
    symbol(':');
    symbol(',');
    symbol('#');
    symbol('@');
    symbol('*/');
    postscript(reserve('case'));
    reserve('catch');
    postscript(reserve('default'));
    reserve('else');
    reserve('finally');

    reservevar('arguments', function (x) {
        if (strict_mode && funct === global_funct) {
            warn('strict', x);
        } else if (option.safe) {
            warn('adsafe_a', x);
        }
    });
    reservevar('eval', function (x) {
        if (option.safe) {
            warn('adsafe_a', x);
        }
    });
    constant('false', 'boolean');
    constant('Infinity', 'number');
    constant('NaN', 'number');
    constant('null', '');
    reservevar('this', function (x) {
        if (option.safe) {
            warn('adsafe_a', x);
        } else if (strict_mode && funct['(token)'].arity === 'statement' &&
                funct['(name)'].charAt(0) > 'Z') {
            warn('strict', x);
        }
    });
    constant('true', 'boolean');
    constant('undefined', '');

    infix('?', 30, function (left, that) {
        step_in('?');
        that.first = expected_condition(expected_relation(left));
        that.second = expression(0);
        spaces();
        step_out();
        var colon = next_token;
        advance(':');
        step_in(':');
        spaces();
        that.third = expression(10);
        that.arity = 'ternary';
        if (are_similar(that.second, that.third)) {
            warn('weird_ternary', colon);
        } else if (are_similar(that.first, that.second)) {
            warn('use_or', that);
        }
        step_out();
        return that;
    });

    infix('||', 40, function (left, that) {
        function paren_check(that) {
            if (that.id === '&&' && !that.paren) {
                warn('and', that);
            }
            return that;
        }

        that.first = paren_check(expected_condition(expected_relation(left)));
        that.second = paren_check(expected_relation(expression(40)));
        if (are_similar(that.first, that.second)) {
            warn('weird_condition', that);
        }
        return that;
    });

    infix('&&', 50, function (left, that) {
        that.first = expected_condition(expected_relation(left));
        that.second = expected_relation(expression(50));
        if (are_similar(that.first, that.second)) {
            warn('weird_condition', that);
        }
        return that;
    });

    prefix('void', function () {
        this.first = expression(0);
        this.arity = 'prefix';
        if (option.es5) {
            warn('expected_a_b', this, 'undefined', 'void');
        } else if (this.first.number !== 0) {
            warn('expected_a_b', this.first, '0', artifact(this.first));
        }
        this.type = 'undefined';
        return this;
    });

    bitwise('|', 70);
    bitwise('^', 80);
    bitwise('&', 90);

    relation('==', '===');
    relation('===');
    relation('!=', '!==');
    relation('!==');
    relation('<');
    relation('>');
    relation('<=');
    relation('>=');

    bitwise('<<', 120);
    bitwise('>>', 120);
    bitwise('>>>', 120);

    infix('in', 120, function (left, that) {
        warn('infix_in', that);
        that.left = left;
        that.right = expression(130);
        return that;
    }, 'boolean');
    infix('instanceof', 120, null, 'boolean');
    infix('+', 130, function (left, that) {
        if (left.id === '(number)') {
            if (left.number === 0) {
                warn('unexpected_a', left, '0');
            }
        } else if (left.id === '(string)') {
            if (left.string === '') {
                warn('expected_a_b', left, 'String', '\'\'');
            }
        }
        var right = expression(130);
        if (right.id === '(number)') {
            if (right.number === 0) {
                warn('unexpected_a', right, '0');
            }
        } else if (right.id === '(string)') {
            if (right.string === '') {
                warn('expected_a_b', right, 'String', '\'\'');
            }
        }
        if (left.id === right.id) {
            if (left.id === '(string)' || left.id === '(number)') {
                if (left.id === '(string)') {
                    left.string += right.string;
                    if (jx.test(left.string)) {
                        warn('url', left);
                    }
                } else {
                    left.number += right.number;
                }
                left.thru = right.thru;
                return left;
            }
        }
        that.first = left;
        that.second = right;
        return that;
    });
    prefix('+', 'num');
    prefix('+++', function () {
        warn('confusing_a', token);
        this.first = expression(150);
        this.arity = 'prefix';
        return this;
    });
    infix('+++', 130, function (left) {
        warn('confusing_a', token);
        this.first = left;
        this.second = expression(130);
        return this;
    });
    infix('-', 130, function (left, that) {
        if ((left.id === '(number)' && left.number === 0) || left.id === '(string)') {
            warn('unexpected_a', left);
        }
        var right = expression(130);
        if ((right.id === '(number)' && right.number === 0) || right.id === '(string)') {
            warn('unexpected_a', left);
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number -= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    }, 'number');
    prefix('-');
    prefix('---', function () {
        warn('confusing_a', token);
        this.first = expression(150);
        this.arity = 'prefix';
        return this;
    });
    infix('---', 130, function (left) {
        warn('confusing_a', token);
        this.first = left;
        this.second = expression(130);
        return this;
    });
    infix('*', 140, function (left, that) {
        if ((left.id === '(number)' && (left.number === 0 || left.number === 1)) || left.id === '(string)') {
            warn('unexpected_a', left);
        }
        var right = expression(140);
        if ((right.id === '(number)' && (right.number === 0 || right.number === 1)) || right.id === '(string)') {
            warn('unexpected_a', right);
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number *= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    }, 'number');
    infix('/', 140, function (left, that) {
        if ((left.id === '(number)' && left.number === 0) || left.id === '(string)') {
            warn('unexpected_a', left);
        }
        var right = expression(140);
        if ((right.id === '(number)' && (right.number === 0 || right.number === 1)) || right.id === '(string)') {
            warn('unexpected_a', right);
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number /= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    }, 'number');
    infix('%', 140, function (left, that) {
        if ((left.id === '(number)' && (left.number === 0 || left.number === 1)) || left.id === '(string)') {
            warn('unexpected_a', left);
        }
        var right = expression(140);
        if ((right.id === '(number)' && right.number === 0) || right.id === '(string)') {
            warn('unexpected_a', right);
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number %= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    }, 'number');

    suffix('++');
    prefix('++');

    suffix('--');
    prefix('--');
    prefix('delete', function () {
        one_space();
        var p = expression(0);
        if (!p || (p.id !== '.' && p.id !== '[')) {
            warn('deleted');
        }
        this.first = p;
        return this;
    });


    prefix('~', function () {
        no_space_only();
        if (!option.bitwise) {
            warn('unexpected_a', this);
        }
        expression(150);
        return this;
    }, 'number');
    prefix('!', function () {
        no_space_only();
        this.first = expected_condition(expression(150));
        this.arity = 'prefix';
        if (bang[this.first.id] === true) {
            warn('confusing_a', this);
        }
        return this;
    }, 'boolean');
    prefix('typeof', null, 'string');
    prefix('new', function () {
        one_space();
        var c = expression(160), n, p, v;
        this.first = c;
        if (c.id !== 'function') {
            if (c.identifier) {
                switch (c.string) {
                case 'Object':
                    warn('use_object', token);
                    break;
                case 'Array':
                    if (next_token.id === '(') {
                        p = next_token;
                        p.first = this;
                        advance('(');
                        if (next_token.id !== ')') {
                            n = expression(0);
                            p.second = [n];
                            if (n.type !== 'number' || next_token.id === ',') {
                                warn('use_array', p);
                            }
                            while (next_token.id === ',') {
                                advance(',');
                                p.second.push(expression(0));
                            }
                        } else {
                            warn('use_array', token);
                        }
                        advance(')', p);
                        return p;
                    }
                    warn('use_array', token);
                    break;
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Math':
                case 'JSON':
                    warn('not_a_constructor', c);
                    break;
                case 'Function':
                    if (!option.evil) {
                        warn('function_eval');
                    }
                    break;
                case 'Date':
                case 'RegExp':
                    break;
                default:
                    if (c.id !== 'function') {
                        v = c.string.charAt(0);
                        if (!option.newcap && (v < 'A' || v > 'Z')) {
                            warn('constructor_name_a', token);
                        }
                    }
                }
            } else {
                if (c.id !== '.' && c.id !== '[' && c.id !== '(') {
                    warn('bad_constructor', token);
                }
            }
        } else {
            warn('weird_new', this);
        }
        if (next_token.id !== '(') {
            warn('missing_a', next_token, '()');
        }
        return this;
    });

    infix('(', 160, function (left, that) {
        var p;
        if (indent && indent.mode === 'expression') {
            no_space(prev_token, token);
        } else {
            no_space_only(prev_token, token);
        }
        if (!left.immed && left.id === 'function') {
            warn('wrap_immediate');
        }
        p = [];
        if (left.identifier) {
            if (left.string.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)) {
                if (left.string !== 'Number' && left.string !== 'String' &&
                        left.string !== 'Boolean' && left.string !== 'Date') {
                    if (left.string === 'Math' || left.string === 'JSON') {
                        warn('not_a_function', left);
                    } else if (left.string === 'Object') {
                        warn('use_object', token);
                    } else if (left.string === 'Array' || !option.newcap) {
                        warn('missing_a', left, 'new');
                    }
                }
            }
        } else if (left.id === '.') {
            if (option.safe && left.first.string === 'Math' &&
                    left.second === 'random') {
                warn('adsafe_a', left);
            } else if (left.second.string === 'split' &&
                    left.first.id === '(string)') {
                warn('use_array', left.second);
            }
        }
        step_in();
        if (next_token.id !== ')') {
            no_space();
            for (;;) {
                edge();
                p.push(expression(10));
                if (next_token.id !== ',') {
                    break;
                }
                comma();
            }
        }
        no_space();
        step_out(')', that);
        if (typeof left === 'object') {
            if (left.string === 'parseInt' && p.length === 1) {
                warn('radix', left);
            }
            if (!option.evil) {
                if (left.string === 'eval' || left.string === 'Function' ||
                        left.string === 'execScript') {
                    warn('evil', left);
                } else if (p[0] && p[0].id === '(string)' &&
                        (left.string === 'setTimeout' ||
                        left.string === 'setInterval')) {
                    warn('implied_evil', left);
                }
            }
            if (!left.identifier && left.id !== '.' && left.id !== '[' &&
                    left.id !== '(' && left.id !== '&&' && left.id !== '||' &&
                    left.id !== '?') {
                warn('bad_invocation', left);
            }
        }
        that.first = left;
        that.second = p;
        return that;
    }, '', true);

    prefix('(', function () {
        step_in('expression');
        no_space();
        edge();
        if (next_token.id === 'function') {
            next_token.immed = true;
        }
        var value = expression(0);
        value.paren = true;
        no_space();
        step_out(')', this);
        if (value.id === 'function') {
            if (next_token.id === '(') {
                warn('move_invocation');
            } else {
                warn('bad_wrap', this);
            }
        }
        return value;
    });

    infix('.', 170, function (left, that) {
        no_space(prev_token, token);
        no_space();
        var name = identifier(), type;
        if (typeof name === 'string') {
            tally_property(name);
        }
        that.first = left;
        that.second = token;
        if (left && left.string === 'arguments' &&
                (name === 'callee' || name === 'caller')) {
            warn('avoid_a', left, 'arguments.' + name);
        } else if (!option.evil && left && left.string === 'document' &&
                (name === 'write' || name === 'writeln')) {
            warn('write_is_wrong', left);
        } else if (option.adsafe) {
            if (!adsafe_top && left.string === 'ADSAFE') {
                if (name === 'id' || name === 'lib') {
                    warn('adsafe_a', that);
                } else if (name === 'go') {
                    if (xmode !== 'script') {
                        warn('adsafe_a', that);
                    } else if (adsafe_went || next_token.id !== '(' ||
                            peek(0).id !== '(string)' ||
                            peek(0).string !== adsafe_id ||
                            peek(1).id !== ',') {
                        stop('adsafe_a', that, 'go');
                    }
                    adsafe_went = true;
                    adsafe_may = false;
                }
            }
            adsafe_top = false;
        }
        if (!option.evil && (name === 'eval' || name === 'execScript')) {
            warn('evil');
        } else if (option.safe) {
            for (;;) {
                if (banned[name] === true) {
                    warn('adsafe_a', token, name);
                }
                if (typeof predefined[left.string] !== 'boolean' ||    //// check for writeable
                        next_token.id === '(') {
                    break;
                }
                if (next_token.id !== '.') {
                    warn('adsafe_a', that);
                    break;
                }
                advance('.');
                token.first = that;
                token.second = name;
                that = token;
                name = identifier();
                if (typeof name === 'string') {
                    tally_property(name);
                }
            }
        }
        type = property_type[name];
        if (type && typeof type === 'string' && type !== '*') {
            that.type = type;
        }
        return that;
    }, '', true);

    infix('[', 170, function (left, that) {
        var e, s;
        no_space_only(prev_token, token);
        no_space();
        step_in();
        edge();
        e = expression(0);
        switch (e.type) {
        case 'number':
            if (e.id === '(number)' && left.id === 'arguments') {
                warn('use_param', left);
            }
            break;
        case 'string':
            if (e.id === '(string)') {
                if (option.safe && (banned[e.string] ||
                        e.string.charAt(0) === '_' || e.string.slice(-1) === '_')) {
                    warn('adsafe_subscript_a', e);
                } else if (!option.evil &&
                        (e.string === 'eval' || e.string === 'execScript')) {
                    warn('evil', e);
                } else if (!option.sub && ix.test(e.string)) {
                    s = syntax[e.string];
                    if (!s || !s.reserved) {
                        warn('subscript', e);
                    }
                }
                tally_property(e.string);
            } else if (option.safe && e.id !== 'typeof') {
                warn('adsafe_subscript_a', e);
            }
            break;
        case undefined:
            if (option.safe) {
                warn('adsafe_subscript_a', e);
            }
            break;
        default:
            if (option.safe) {
                warn('adsafe_subscript_a', e);
            }
        }
        step_out(']', that);
        no_space(prev_token, token);
        that.first = left;
        that.second = e;
        return that;
    }, '', true);

    prefix('[', function () {
        this.arity = 'prefix';
        this.first = [];
        step_in('array');
        while (next_token.id !== '(end)') {
            while (next_token.id === ',') {
                warn('unexpected_a', next_token);
                advance(',');
            }
            if (next_token.id === ']') {
                break;
            }
            indent.wrap = false;
            edge();
            this.first.push(expression(10));
            if (next_token.id === ',') {
                comma();
                if (next_token.id === ']' && !option.es5) {
                    warn('unexpected_a', token);
                    break;
                }
            } else {
                break;
            }
        }
        step_out(']', this);
        return this;
    }, 170);


    function property_name() {
        var id = optional_identifier(true);
        if (!id) {
            if (next_token.id === '(string)') {
                id = next_token.string;
                if (option.safe) {
                    if (banned[id]) {
                        warn('adsafe_a');
                    } else if (id.charAt(0) === '_' ||
                            id.charAt(id.length - 1) === '_') {
                        warn('dangling_a');
                    }
                }
                advance();
            } else if (next_token.id === '(number)') {
                id = next_token.number.toString();
                advance();
            }
        }
        return id;
    }


    function function_params() {
        var id, paren = next_token, params = [];
        advance('(');
        step_in();
        no_space();
        if (next_token.id === ')') {
            no_space();
            step_out(')', paren);
            return;
        }
        for (;;) {
            edge();
            id = identifier();
            params.push(token);
            add_label(token, option.unparam ? 'parameter' : 'unparam');
            if (next_token.id === ',') {
                comma();
            } else {
                no_space();
                step_out(')', paren);
                return params;
            }
        }
    }


    function complexity(exp) {
        var score = 0;
        if (exp) {
            if (Array.isArray(exp)) {
                exp.forEach(function (tok) {
                    score += complexity(tok);
                });
            } else {
                switch (exp.arity) {
                case 'statement':
                    switch (exp.id) {
                    case 'if':
                        score += complexity(exp.first) + complexity(exp.block) +
                            complexity(exp['else']) + 1;
                        break;
                    case 'while':
                    case 'do':
                        if (exp.first.id !== 'true' && exp.first.number !== 1) {
                            score += 1;
                        }
                        score += complexity(exp.first) + complexity(exp.block);
                        break;
                    case 'for':
                        if (exp.second !== undefined &&
                                exp.second.id !== 'true' &&
                                exp.second.number !== 1) {
                            score += 1;
                        }
                        score += complexity(exp.first) + complexity(exp.second) +
                            complexity(exp.third) + complexity(exp.block);
                        break;
                    case 'switch':
                        score += complexity(exp.first) +
                            complexity(exp.second) + exp.second.length;
                        if (exp.second[exp.second.length - 1].id === 'default') {
                            score -= 1;
                        }
                        break;
                    case 'try':
                        if (exp.second) {
                            score += 1;
                        }
                        if (exp.third) {
                            score += 1;
                        }
                        score += complexity(exp.first) + complexity(exp.second) +
                            complexity(exp.third) + complexity(exp.block);
                        break;
                    }
                    break;
                case 'prefix':
                    score += complexity(exp.first);
                    break;
                case 'case':
                case 'infix':
                    score += complexity(exp.first) + complexity(exp.second);
                    if (exp.id === '&&' || exp.id === '||') {
                        score += 1;
                    }
                    break;
                case 'ternary':
                    score += complexity(exp.first) + complexity(exp.second) + complexity(exp.third);
                    break;
                }
            }
        }
        return score;
    }


    function do_function(func, name) {
        var old_funct      = funct,
            old_option     = option,
            old_scope      = scope;
        funct = {
            '(name)'     : name || '\'' + (anonname || '').replace(nx, sanitize) + '\'',
            '(line)'     : next_token.line,
            '(context)'  : old_funct,
            '(breakage)' : 0,
            '(loopage)'  : 0,
            '(scope)'    : scope,
            '(token)'    : func
        };
        option = Object.create(old_option);
        scope = Object.create(old_scope);
        functions.push(funct);
        func.name = name;
        if (name) {
            add_label(func, 'function', name);
        }
        func.writeable = false;
        func.first = funct['(params)'] = function_params();
        one_space();
        func.block = block(false);
        if (funct['(old_property_type)']) {
            property_type = funct['(old_property_type)'];
            delete funct['(old_property_type)'];
        }
        funct['(complexity)'] = complexity(func.block) + 1;
        if (option.confusion) {
            funct['(confusion)'] = true;
        }
        funct      = old_funct;
        option     = old_option;
        scope      = old_scope;
    }


    assignop('=');
    assignop('+=', '+');
    assignop('-=', '-');
    assignop('*=', '*');
    assignop('/=', '/').nud = function () {
        stop('slash_equal');
    };
    assignop('%=', '%');
    assignop('&=', '&');
    assignop('|=', '|');
    assignop('^=', '^');
    assignop('<<=', '<<');
    assignop('>>=', '>>');
    assignop('>>>=', '>>>');


    prefix('{', function () {
        var get, i, j, name, p, set, seen = {};
        this.arity = 'prefix';
        this.first = [];
        step_in();
        while (next_token.id !== '}') {
            indent.wrap = false;

// JSLint recognizes the ES5 extension for get/set in object literals,
// but requires that they be used in pairs.

            edge();
            if (next_token.string === 'get' && peek().id !== ':') {
                if (!option.es5) {
                    warn('es5');
                }
                get = next_token;
                advance('get');
                one_space_only();
                name = next_token;
                i = property_name();
                if (!i) {
                    stop('missing_property');
                }
                get.string = '';
                do_function(get);
                if (funct['(loopage)']) {
                    warn('function_loop', get);
                }
                p = get.first;
                if (p) {
                    warn('parameter_a_get_b', p[0], p[0].string, i);
                }
                comma();
                set = next_token;
                set.string = '';
                spaces();
                edge();
                advance('set');
                one_space_only();
                j = property_name();
                if (i !== j) {
                    stop('expected_a_b', token, i, j || next_token.string);
                }
                do_function(set);
                p = set.first;
                if (!p || p.length !== 1) {
                    stop('parameter_set_a', set, 'value');
                } else if (p[0].string !== 'value') {
                    stop('expected_a_b', p[0], 'value', p[0].string);
                }
                name.first = [get, set];
            } else {
                name = next_token;
                i = property_name();
                if (typeof i !== 'string') {
                    stop('missing_property');
                }
                advance(':');
                spaces();
                name.first = expression(10);
            }
            this.first.push(name);
            if (seen[i] === true) {
                warn('duplicate_a', next_token, i);
            }
            seen[i] = true;
            tally_property(i);
            if (next_token.id !== ',') {
                break;
            }
            for (;;) {
                comma();
                if (next_token.id !== ',') {
                    break;
                }
                warn('unexpected_a', next_token);
            }
            if (next_token.id === '}' && !option.es5) {
                warn('unexpected_a', token);
            }
        }
        step_out('}', this);
        return this;
    });

    stmt('{', function () {
        warn('statement_block');
        this.arity = 'statement';
        this.block = statements();
        this.disrupt = this.block.disrupt;
        advance('}', this);
        return this;
    });

    stmt('/*global', directive);
    stmt('/*globals', directive);
    stmt('/*jslint', directive);
    stmt('/*member', directive);
    stmt('/*members', directive);
    stmt('/*property', directive);
    stmt('/*properties', directive);

    stmt('var', function () {

// JavaScript does not have block scope. It only has function scope. So,
// declaring a variable in a block can have unexpected consequences.

// var.first will contain an array, the array containing name tokens
// and assignment tokens.

        var assign, id, name;

        if (funct['(vars)'] && !option.vars) {
            warn('combine_var');
        } else if (funct !== global_funct) {
            funct['(vars)'] = true;
        }
        this.arity = 'statement';
        this.first = [];
        step_in('var');
        for (;;) {
            name = next_token;
            id = identifier();
            add_label(name, 'becoming');

            if (next_token.id === '=') {
                assign = next_token;
                assign.first = name;
                spaces();
                advance('=');
                spaces();
                if (next_token.id === 'undefined') {
                    warn('unnecessary_initialize', token, id);
                }
                if (peek(0).id === '=' && next_token.identifier) {
                    stop('var_a_not');
                }
                assign.second = expression(0);
                assign.arity = 'infix';
                this.first.push(assign);
            } else {
                this.first.push(name);
            }
            if (funct[id] === 'becoming') {
                funct[id] = 'unused';
            }
            if (next_token.id !== ',') {
                break;
            }
            comma();
            indent.wrap = false;
            if (var_mode && next_token.line === token.line &&
                    this.first.length === 1) {
                var_mode = null;
                indent.open = false;
                indent.at -= option.indent;
            }
            spaces();
            edge();
        }
        var_mode = null;
        step_out();
        return this;
    });

    stmt('function', function () {
        one_space();
        if (in_block) {
            warn('function_block', token);
        }
        var name = next_token, id = identifier();
        add_label(name, 'unction');
        no_space();
        this.arity = 'statement';
        do_function(this, id);
        if (next_token.id === '(' && next_token.line === token.line) {
            stop('function_statement');
        }
        return this;
    });

    prefix('function', function () {
        one_space();
        var id = optional_identifier();
        if (id) {
            no_space();
        } else {
            id = '';
        }
        do_function(this, id);
        if (funct['(loopage)']) {
            warn('function_loop');
        }
        this.arity = 'function';
        return this;
    });

    stmt('if', function () {
        var paren = next_token;
        one_space();
        advance('(');
        step_in('control');
        no_space();
        edge();
        this.arity = 'statement';
        this.first = expected_condition(expected_relation(expression(0)));
        no_space();
        step_out(')', paren);
        one_space();
        this.block = block(true);
        if (next_token.id === 'else') {
            one_space();
            advance('else');
            one_space();
            this['else'] = next_token.id === 'if' || next_token.id === 'switch'
                ? statement(true)
                : block(true);
            if (this['else'].disrupt && this.block.disrupt) {
                this.disrupt = true;
            }
        }
        return this;
    });

    stmt('try', function () {

// try.first    The catch variable
// try.second   The catch clause
// try.third    The finally clause
// try.block    The try block

        var exception_variable, old_scope, paren;
        if (option.adsafe) {
            warn('adsafe_a', this);
        }
        one_space();
        this.arity = 'statement';
        this.block = block(false);
        if (next_token.id === 'catch') {
            one_space();
            advance('catch');
            one_space();
            paren = next_token;
            advance('(');
            step_in('control');
            no_space();
            edge();
            old_scope = scope;
            scope = Object.create(old_scope);
            exception_variable = next_token.string;
            this.first = exception_variable;
            if (!next_token.identifier) {
                warn('expected_identifier_a', next_token);
            } else {
                add_label(next_token, 'exception');
            }
            advance();
            no_space();
            step_out(')', paren);
            one_space();
            this.second = block(false);
            scope = old_scope;
        }
        if (next_token.id === 'finally') {
            one_space();
            advance('finally');
            one_space();
            this.third = block(false);
        } else if (!this.second) {
            stop('expected_a_b', next_token, 'catch', artifact());
        }
        return this;
    });

    labeled_stmt('while', function () {
        one_space();
        var paren = next_token;
        funct['(breakage)'] += 1;
        funct['(loopage)'] += 1;
        advance('(');
        step_in('control');
        no_space();
        edge();
        this.arity = 'statement';
        this.first = expected_relation(expression(0));
        if (this.first.id !== 'true') {
            expected_condition(this.first, bundle.unexpected_a);
        }
        no_space();
        step_out(')', paren);
        one_space();
        this.block = block(true);
        if (this.block.disrupt) {
            warn('strange_loop', prev_token);
        }
        funct['(breakage)'] -= 1;
        funct['(loopage)'] -= 1;
        return this;
    });

    reserve('with');

    labeled_stmt('switch', function () {

// switch.first         the switch expression
// switch.second        the array of cases. A case is 'case' or 'default' token:
//    case.first        the array of case expressions
//    case.second       the array of statements
// If all of the arrays of statements are disrupt, then the switch is disrupt.

        var cases = [],
            old_in_block = in_block,
            particular,
            the_case = next_token,
            unbroken = true;

        function find_duplicate_case(value) {
            if (are_similar(particular, value)) {
                warn('duplicate_a', value);
            }
        }

        funct['(breakage)'] += 1;
        one_space();
        advance('(');
        no_space();
        step_in();
        this.arity = 'statement';
        this.first = expected_condition(expected_relation(expression(0)));
        no_space();
        step_out(')', the_case);
        one_space();
        advance('{');
        step_in();
        in_block = true;
        this.second = [];
        while (next_token.id === 'case') {
            the_case = next_token;
            cases.forEach(find_duplicate_case);
            the_case.first = [];
            the_case.arity = 'case';
            spaces();
            edge('case');
            advance('case');
            for (;;) {
                one_space();
                particular = expression(0);
                cases.forEach(find_duplicate_case);
                cases.push(particular);
                the_case.first.push(particular);
                if (particular.id === 'NaN') {
                    warn('unexpected_a', particular);
                }
                no_space_only();
                advance(':');
                if (next_token.id !== 'case') {
                    break;
                }
                spaces();
                edge('case');
                advance('case');
            }
            spaces();
            the_case.second = statements();
            if (the_case.second && the_case.second.length > 0) {
                particular = the_case.second[the_case.second.length - 1];
                if (particular.disrupt) {
                    if (particular.id === 'break') {
                        unbroken = false;
                    }
                } else {
                    warn('missing_a_after_b', next_token, 'break', 'case');
                }
            } else {
                warn('empty_case');
            }
            this.second.push(the_case);
        }
        if (this.second.length === 0) {
            warn('missing_a', next_token, 'case');
        }
        if (next_token.id === 'default') {
            spaces();
            the_case = next_token;
            the_case.arity = 'case';
            edge('case');
            advance('default');
            no_space_only();
            advance(':');
            spaces();
            the_case.second = statements();
            if (the_case.second && the_case.second.length > 0) {
                particular = the_case.second[the_case.second.length - 1];
                if (unbroken && particular.disrupt && particular.id !== 'break') {
                    this.disrupt = true;
                }
            }
            this.second.push(the_case);
        }
        funct['(breakage)'] -= 1;
        spaces();
        step_out('}', this);
        in_block = old_in_block;
        return this;
    });

    stmt('debugger', function () {
        if (!option.debug) {
            warn('unexpected_a', this);
        }
        this.arity = 'statement';
        return this;
    });

    labeled_stmt('do', function () {
        funct['(breakage)'] += 1;
        funct['(loopage)'] += 1;
        one_space();
        this.arity = 'statement';
        this.block = block(true);
        if (this.block.disrupt) {
            warn('strange_loop', prev_token);
        }
        one_space();
        advance('while');
        var paren = next_token;
        one_space();
        advance('(');
        step_in();
        no_space();
        edge();
        this.first = expected_condition(expected_relation(expression(0)), bundle.unexpected_a);
        no_space();
        step_out(')', paren);
        funct['(breakage)'] -= 1;
        funct['(loopage)'] -= 1;
        return this;
    });

    labeled_stmt('for', function () {

        var blok, filter, ok = false, paren = next_token, value;
        this.arity = 'statement';
        funct['(breakage)'] += 1;
        funct['(loopage)'] += 1;
        advance('(');
        step_in('control');
        spaces(this, paren);
        no_space();
        if (next_token.id === 'var') {
            stop('move_var');
        }
        edge();
        if (peek(0).id === 'in') {
            this.forin = true;
            value = next_token;
            switch (funct[value.string]) {
            case 'unused':
                funct[value.string] = 'var';
                break;
            case 'closure':
            case 'var':
                break;
            default:
                warn('bad_in_a', value);
            }
            advance();
            advance('in');
            this.first = value;
            this.second = expression(20);
            step_out(')', paren);
            blok = block(true);
            if (!option.forin) {
                if (blok.length === 1 && typeof blok[0] === 'object' &&
                        blok[0].string === 'if' && !blok[0]['else']) {
                    filter = blok[0].first;
                    while (filter.id === '&&') {
                        filter = filter.first;
                    }
                    switch (filter.id) {
                    case '===':
                    case '!==':
                        ok = filter.first.id === '['
                            ? filter.first.first.string === this.second.string &&
                                filter.first.second.string === this.first.string
                            : filter.first.id === 'typeof' &&
                                filter.first.first.id === '[' &&
                                filter.first.first.first.string === this.second.string &&
                                filter.first.first.second.string === this.first.string;
                        break;
                    case '(':
                        ok = filter.first.id === '.' && ((
                            filter.first.first.string === this.second.string &&
                            filter.first.second.string === 'hasOwnProperty' &&
                            filter.second[0].string === this.first.string
                        ) || (
                            filter.first.first.string === 'ADSAFE' &&
                            filter.first.second.string === 'has' &&
                            filter.second[0].string === this.second.string &&
                            filter.second[1].string === this.first.string
                        ) || (
                            filter.first.first.id === '.' &&
                            filter.first.first.first.id === '.' &&
                            filter.first.first.first.first.string === 'Object' &&
                            filter.first.first.first.second.string === 'prototype' &&
                            filter.first.first.second.string === 'hasOwnProperty' &&
                            filter.first.second.string === 'call' &&
                            filter.second[0].string === this.second.string &&
                            filter.second[1].string === this.first.string
                        ));
                        break;
                    }
                }
                if (!ok) {
                    warn('for_if', this);
                }
            }
        } else {
            if (next_token.id !== ';') {
                edge();
                this.first = [];
                for (;;) {
                    this.first.push(expression(0, 'for'));
                    if (next_token.id !== ',') {
                        break;
                    }
                    comma();
                }
            }
            semicolon();
            if (next_token.id !== ';') {
                edge();
                this.second = expected_relation(expression(0));
                if (this.second.id !== 'true') {
                    expected_condition(this.second, bundle.unexpected_a);
                }
            }
            semicolon(token);
            if (next_token.id === ';') {
                stop('expected_a_b', next_token, ')', ';');
            }
            if (next_token.id !== ')') {
                this.third = [];
                edge();
                for (;;) {
                    this.third.push(expression(0, 'for'));
                    if (next_token.id !== ',') {
                        break;
                    }
                    comma();
                }
            }
            no_space();
            step_out(')', paren);
            one_space();
            blok = block(true);
        }
        if (blok.disrupt) {
            warn('strange_loop', prev_token);
        }
        this.block = blok;
        funct['(breakage)'] -= 1;
        funct['(loopage)'] -= 1;
        return this;
    });

    disrupt_stmt('break', function () {
        var label = next_token.string;
        this.arity = 'statement';
        if (funct['(breakage)'] === 0) {
            warn('unexpected_a', this);
        }
        if (next_token.identifier && token.line === next_token.line) {
            one_space_only();
            if (funct[label] !== 'label') {
                warn('not_a_label', next_token);
            } else if (scope[label].funct !== funct) {
                warn('not_a_scope', next_token);
            }
            this.first = next_token;
            advance();
        }
        return this;
    });

    disrupt_stmt('continue', function () {
        if (!option['continue']) {
            warn('unexpected_a', this);
        }
        var label = next_token.string;
        this.arity = 'statement';
        if (funct['(breakage)'] === 0) {
            warn('unexpected_a', this);
        }
        if (next_token.identifier && token.line === next_token.line) {
            one_space_only();
            if (funct[label] !== 'label') {
                warn('not_a_label', next_token);
            } else if (scope[label].funct !== funct) {
                warn('not_a_scope', next_token);
            }
            this.first = next_token;
            advance();
        }
        return this;
    });

    disrupt_stmt('return', function () {
        if (funct === global_funct) {
            warn('unexpected_a', this);
        }
        this.arity = 'statement';
        if (next_token.id !== ';' && next_token.line === token.line) {
            one_space_only();
            if (next_token.id === '/' || next_token.id === '(regexp)') {
                warn('wrap_regexp');
            }
            this.first = expression(20);
        }
        return this;
    });

    disrupt_stmt('throw', function () {
        this.arity = 'statement';
        one_space_only();
        this.first = expression(20);
        return this;
    });


//  Superfluous reserved words

    reserve('class');
    reserve('const');
    reserve('enum');
    reserve('export');
    reserve('extends');
    reserve('import');
    reserve('super');

// Harmony reserved words

    reserve('implements');
    reserve('interface');
    reserve('let');
    reserve('package');
    reserve('private');
    reserve('protected');
    reserve('public');
    reserve('static');
    reserve('yield');


// Type inference

//     function get_type(one) {
//         var type;
//         if (typeof one === 'string') {
//             return one;
//         } else if (one.type) {
//             return one.type;
//         } else if (one.id === '.') {
//             type = property_type[one.second.string];
//             return typeof type === 'string' ? type : '';
//         } else {
//             return ((one.identifier && scope[one.string]) || one).type;
//         }
//     }


//     function match_type(one_type, two_type, one, two) {
//         if (one_type === two_type) {
//             return true;
//         } else {
//             if (!funct.confusion && !two.warn) {
//                 if (typeof one !== 'string') {
//                     if (one.id === '.') {
//                         one_type = '.' + one.second.string + ': ' + one_type;
//                     } else {
//                         one_type = one.string + ': ' + one_type;
//                     }
//                 }
//                 if (two.id === '.') {
//                     two_type = '.' + two.second.string + ': ' + one_type;
//                 } else {
//                     two_type = two.string + ': ' + one_type;
//                 }
//                 warn('type_confusion_a_b', two, one_type, two_type);
//                 two.warn = true;
//             }
//             return false;
//         }
//     }


//     function conform(one, two) {
//
// // The conform function takes a type string and a token, or two tokens.
//
//         var one_type = typeof one === 'string' ? one : one.type,
//             two_type = two.type,
//             two_thing;
//
// // If both tokens already have a type, and if they match, then we are done.
// // Once a token has a type, it is locked. Neither token will change, but if
// // they do not match, there will be a warning.
//
//         if (one_type) {
//             if (two_type) {
//                 match_type(one_type, two_type, one, two);
//             } else {
//
// // two does not have a type, so look deeper. If two is a variable or property,
// // then use its type if it has one, and make the deep type one's type if it
// // doesn't. If the type was *, or if there was a mismatch, don't change the
// // deep type.
//
//                 two_thing = two.id === '(identifier)'
//                     ? scope[two.string]
//                     : two.id === '.'
//                     ? property_type[two.second.string]
//                     : null;
//                 if (two_thing) {
//                     two_type = two_thing.type;
//                     if (two_type) {
//                         if (two_type !== '*') {
//                             if (!match_type(one_type, two_type, one, two)) {
//                                 return '';
//                             }
//                         }
//                     } else {
//                         two_thing.type = one_type;
//                     }
//                 }
//
// // In any case, we give two a type.
//
//                 two.type = one_type;
//                 type_state_change = true;
//                 return one_type;
//             }
//
// // one does not have a type, but two does, so do the old switcheroo.
//
//         } else {
//             if (two_type) {
//                 return conform(two, one);
//
// // Neither token has a type yet. So we have to look deeper to see if either
// // is a variable or property.
//
//             } else {
//                 if (one.id === '(identifier)') {
//                     one_type = scope[one.string].type;
//                     if (one_type && one_type !== '*') {
//                         one.type = one_type;
//                         return conform(one, two);
//                     }
//                 } else if (one.id === '.') {
//                     one_type = property_type[one.second.string];
//                     if (one_type && one_type !== '*') {
//                         one.type = scope[one.string].type;
//                         return conform(one, two);
//                     }
//                 }
//                 if (two.id === '(identifier)') {
//                     two_type = scope[two.string].type;
//                     if (two_type && two_type !== '*') {
//                         two.type = two_type;
//                         return conform(two, one);
//                     }
//                 } else if (two.id === '.') {
//                     two_type = property_type[two.second.string];
//                     if (two_type && two_type !== '*') {
//                         two.type = scope[two.string].type;
//                         return conform(two, one);
//                     }
//                 }
//             }
//         }
//
// // Return a falsy string if we were unable to determine the type of either token.
//
//         return '';
//     }

//     function conform_array(type, array) {
//         array.forEach(function (item) {
//             return conform(type, item);
//         }, type);
//     }


//     function infer(node) {
//         if (Array.isArray(node)) {
//             node.forEach(infer);
//         } else {
//             switch (node.arity) {
//             case 'statement':
//                 infer_statement[node.id](node);
//                 break;
//             case 'infix':
//                 infer(node.first);
//                 infer(node.second);
//                 switch (node.id) {
//                 case '(':
//                     conform('function', node.first);
//                     break;
//                 default:
//                     stop('unfinished');
//                 }
//                 break;
//             case 'number':
//             case 'string':
//             case 'boolean':
//                 break;
//             default:
//                 stop('unfinished');
//             }
//         }
//     }


//     infer_statement = {
//         'var': function (node) {
//             var i, item, list = node.first;
//             for (i = 0; i < list.length; i += 1) {
//                 item = list[i];
//                 if (item.id === '=') {
//                     infer(item.second);
//                     conform(item.first, item.second);
//                     conform(item.first, item);
//                 }
//             }
//         },
//         'for': function (node) {
//             infer(node.first);
//             infer(node.second);
//             if (node.forin) {
//                 conform('string', node.first);
//                 conform('object', node.second);
//             } else {
//                 infer(node.third);
//                 conform_array('number', node.first);
//                 conform('boolean', node.second);
//                 conform_array('number', node.third);
//             }
//             infer(node.block);
//         }
//     };


//     function infer_types(node) {
//         do {
//             funct = global_funct;
//             scope = global_scope;
//             type_state_change = false;
//             infer(node);
//         } while (type_state_change);
//     }


// Parse JSON

    function json_value() {

        function json_object() {
            var brace = next_token, object = {};
            advance('{');
            if (next_token.id !== '}') {
                while (next_token.id !== '(end)') {
                    while (next_token.id === ',') {
                        warn('unexpected_a', next_token);
                        advance(',');
                    }
                    if (next_token.id !== '(string)') {
                        warn('expected_string_a');
                    }
                    if (object[next_token.string] === true) {
                        warn('duplicate_a');
                    } else if (next_token.string === '__proto__') {
                        warn('dangling_a');
                    } else {
                        object[next_token.string] = true;
                    }
                    advance();
                    advance(':');
                    json_value();
                    if (next_token.id !== ',') {
                        break;
                    }
                    advance(',');
                    if (next_token.id === '}') {
                        warn('unexpected_a', token);
                        break;
                    }
                }
            }
            advance('}', brace);
        }

        function json_array() {
            var bracket = next_token;
            advance('[');
            if (next_token.id !== ']') {
                while (next_token.id !== '(end)') {
                    while (next_token.id === ',') {
                        warn('unexpected_a', next_token);
                        advance(',');
                    }
                    json_value();
                    if (next_token.id !== ',') {
                        break;
                    }
                    advance(',');
                    if (next_token.id === ']') {
                        warn('unexpected_a', token);
                        break;
                    }
                }
            }
            advance(']', bracket);
        }

        switch (next_token.id) {
        case '{':
            json_object();
            break;
        case '[':
            json_array();
            break;
        case 'true':
        case 'false':
        case 'null':
        case '(number)':
        case '(string)':
            advance();
            break;
        case '-':
            advance('-');
            no_space_only();
            advance('(number)');
            break;
        default:
            stop('unexpected_a');
        }
    }


// CSS parsing.

    function css_name() {
        if (next_token.identifier) {
            advance();
            return true;
        }
    }


    function css_number() {
        if (next_token.id === '-') {
            advance('-');
            no_space_only();
        }
        if (next_token.id === '(number)') {
            advance('(number)');
            return true;
        }
    }


    function css_string() {
        if (next_token.id === '(string)') {
            advance();
            return true;
        }
    }

    function css_color() {
        var i, number, paren, value;
        if (next_token.identifier) {
            value = next_token.string;
            if (value === 'rgb' || value === 'rgba') {
                advance();
                paren = next_token;
                advance('(');
                for (i = 0; i < 3; i += 1) {
                    if (i) {
                        comma();
                    }
                    number = next_token.number;
                    if (next_token.id !== '(string)' || number < 0) {
                        warn('expected_positive_a', next_token);
                        advance();
                    } else {
                        advance();
                        if (next_token.id === '%') {
                            advance('%');
                            if (number > 100) {
                                warn('expected_percent_a', token, number);
                            }
                        } else {
                            if (number > 255) {
                                warn('expected_small_a', token, number);
                            }
                        }
                    }
                }
                if (value === 'rgba') {
                    comma();
                    number = next_token.number;
                    if (next_token.id !== '(string)' || number < 0 || number > 1) {
                        warn('expected_fraction_a', next_token);
                    }
                    advance();
                    if (next_token.id === '%') {
                        warn('unexpected_a');
                        advance('%');
                    }
                }
                advance(')', paren);
                return true;
            } else if (css_colorData[next_token.string] === true) {
                advance();
                return true;
            }
        } else if (next_token.id === '(color)') {
            advance();
            return true;
        }
        return false;
    }


    function css_length() {
        if (next_token.id === '-') {
            advance('-');
            no_space_only();
        }
        if (next_token.id === '(number)') {
            advance();
            if (next_token.id !== '(string)' &&
                    css_lengthData[next_token.string] === true) {
                no_space_only();
                advance();
            } else if (+token.number !== 0) {
                warn('expected_linear_a');
            }
            return true;
        }
        return false;
    }


    function css_line_height() {
        if (next_token.id === '-') {
            advance('-');
            no_space_only();
        }
        if (next_token.id === '(number)') {
            advance();
            if (next_token.id !== '(string)' &&
                    css_lengthData[next_token.string] === true) {
                no_space_only();
                advance();
            }
            return true;
        }
        return false;
    }


    function css_width() {
        if (next_token.identifier) {
            switch (next_token.string) {
            case 'thin':
            case 'medium':
            case 'thick':
                advance();
                return true;
            }
        } else {
            return css_length();
        }
    }


    function css_margin() {
        if (next_token.identifier) {
            if (next_token.string === 'auto') {
                advance();
                return true;
            }
        } else {
            return css_length();
        }
    }

    function css_attr() {
        if (next_token.identifier && next_token.string === 'attr') {
            advance();
            advance('(');
            if (!next_token.identifier) {
                warn('expected_name_a');
            }
            advance();
            advance(')');
            return true;
        }
        return false;
    }


    function css_comma_list() {
        while (next_token.id !== ';') {
            if (!css_name() && !css_string()) {
                warn('expected_name_a');
            }
            if (next_token.id !== ',') {
                return true;
            }
            comma();
        }
    }


    function css_counter() {
        if (next_token.identifier && next_token.string === 'counter') {
            advance();
            advance('(');
            advance();
            if (next_token.id === ',') {
                comma();
                if (next_token.id !== '(string)') {
                    warn('expected_string_a');
                }
                advance();
            }
            advance(')');
            return true;
        }
        if (next_token.identifier && next_token.string === 'counters') {
            advance();
            advance('(');
            if (!next_token.identifier) {
                warn('expected_name_a');
            }
            advance();
            if (next_token.id === ',') {
                comma();
                if (next_token.id !== '(string)') {
                    warn('expected_string_a');
                }
                advance();
            }
            if (next_token.id === ',') {
                comma();
                if (next_token.id !== '(string)') {
                    warn('expected_string_a');
                }
                advance();
            }
            advance(')');
            return true;
        }
        return false;
    }


    function css_radius() {
        return css_length() && (next_token.id !== '(number)' || css_length());
    }


    function css_shape() {
        var i;
        if (next_token.identifier && next_token.string === 'rect') {
            advance();
            advance('(');
            for (i = 0; i < 4; i += 1) {
                if (!css_length()) {
                    warn('expected_number_a');
                    break;
                }
            }
            advance(')');
            return true;
        }
        return false;
    }


    function css_url() {
        var c, url;
        if (next_token.identifier && next_token.string === 'url') {
            next_token = lex.range('(', ')');
            url = next_token.string;
            c = url.charAt(0);
            if (c === '"' || c === '\'') {
                if (url.slice(-1) !== c) {
                    warn('bad_url_a');
                } else {
                    url = url.slice(1, -1);
                    if (url.indexOf(c) >= 0) {
                        warn('bad_url_a');
                    }
                }
            }
            if (!url) {
                warn('missing_url');
            }
            if (ux.test(url)) {
                stop('bad_url_a');
            }
            urls.push(url);
            advance();
            return true;
        }
        return false;
    }


    css_any = [css_url, function () {
        for (;;) {
            if (next_token.identifier) {
                switch (next_token.string.toLowerCase()) {
                case 'url':
                    css_url();
                    break;
                case 'expression':
                    warn('unexpected_a');
                    advance();
                    break;
                default:
                    advance();
                }
            } else {
                if (next_token.id === ';' || next_token.id === '!'  ||
                        next_token.id === '(end)' || next_token.id === '}') {
                    return true;
                }
                advance();
            }
        }
    }];


    function font_face() {
        advance_identifier('font-family');
        advance(':');
        if (!css_name() && !css_string()) {
            stop('expected_name_a');
        }
        semicolon();
        advance_identifier('src');
        advance(':');
        while (true) {
            if (next_token.string === 'local') {
                advance_identifier('local');
                advance('(');
                if (ux.test(next_token.string)) {
                    stop('bad_url_a');
                }

                if (!css_name() && !css_string()) {
                    stop('expected_name_a');
                }
                advance(')');
            } else if (!css_url()) {
                stop('expected_a_b', next_token, 'url', artifact());
            }
            if (next_token.id !== ',') {
                break;
            }
            comma();
        }
        semicolon();
    }


    css_border_style = [
        'none', 'dashed', 'dotted', 'double', 'groove',
        'hidden', 'inset', 'outset', 'ridge', 'solid'
    ];

    css_break = [
        'auto', 'always', 'avoid', 'left', 'right'
    ];

    css_media = {
        'all': true,
        'braille': true,
        'embossed': true,
        'handheld': true,
        'print': true,
        'projection': true,
        'screen': true,
        'speech': true,
        'tty': true,
        'tv': true
    };

    css_overflow = [
        'auto', 'hidden', 'scroll', 'visible'
    ];

    css_attribute_data = {
        background: [
            true, 'background-attachment', 'background-color',
            'background-image', 'background-position', 'background-repeat'
        ],
        'background-attachment': ['scroll', 'fixed'],
        'background-color': ['transparent', css_color],
        'background-image': ['none', css_url],
        'background-position': [
            2, [css_length, 'top', 'bottom', 'left', 'right', 'center']
        ],
        'background-repeat': [
            'repeat', 'repeat-x', 'repeat-y', 'no-repeat'
        ],
        'border': [true, 'border-color', 'border-style', 'border-width'],
        'border-bottom': [
            true, 'border-bottom-color', 'border-bottom-style',
            'border-bottom-width'
        ],
        'border-bottom-color': css_color,
        'border-bottom-left-radius': css_radius,
        'border-bottom-right-radius': css_radius,
        'border-bottom-style': css_border_style,
        'border-bottom-width': css_width,
        'border-collapse': ['collapse', 'separate'],
        'border-color': ['transparent', 4, css_color],
        'border-left': [
            true, 'border-left-color', 'border-left-style', 'border-left-width'
        ],
        'border-left-color': css_color,
        'border-left-style': css_border_style,
        'border-left-width': css_width,
        'border-radius': function () {
            function count(separator) {
                var n = 1;
                if (separator) {
                    advance(separator);
                }
                if (!css_length()) {
                    return false;
                }
                while (next_token.id === '(number)') {
                    if (!css_length()) {
                        return false;
                    }
                    n += 1;
                }
                if (n > 4) {
                    warn('bad_style');
                }
                return true;
            }

            return count() && (next_token.id !== '/' || count('/'));
        },
        'border-right': [
            true, 'border-right-color', 'border-right-style',
            'border-right-width'
        ],
        'border-right-color': css_color,
        'border-right-style': css_border_style,
        'border-right-width': css_width,
        'border-spacing': [2, css_length],
        'border-style': [4, css_border_style],
        'border-top': [
            true, 'border-top-color', 'border-top-style', 'border-top-width'
        ],
        'border-top-color': css_color,
        'border-top-left-radius': css_radius,
        'border-top-right-radius': css_radius,
        'border-top-style': css_border_style,
        'border-top-width': css_width,
        'border-width': [4, css_width],
        bottom: [css_length, 'auto'],
        'caption-side' : ['bottom', 'left', 'right', 'top'],
        clear: ['both', 'left', 'none', 'right'],
        clip: [css_shape, 'auto'],
        color: css_color,
        content: [
            'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote',
            css_string, css_url, css_counter, css_attr
        ],
        'counter-increment': [
            css_name, 'none'
        ],
        'counter-reset': [
            css_name, 'none'
        ],
        cursor: [
            css_url, 'auto', 'crosshair', 'default', 'e-resize', 'help', 'move',
            'n-resize', 'ne-resize', 'nw-resize', 'pointer', 's-resize',
            'se-resize', 'sw-resize', 'w-resize', 'text', 'wait'
        ],
        direction: ['ltr', 'rtl'],
        display: [
            'block', 'compact', 'inline', 'inline-block', 'inline-table',
            'list-item', 'marker', 'none', 'run-in', 'table', 'table-caption',
            'table-cell', 'table-column', 'table-column-group',
            'table-footer-group', 'table-header-group', 'table-row',
            'table-row-group'
        ],
        'empty-cells': ['show', 'hide'],
        'float': ['left', 'none', 'right'],
        font: [
            'caption', 'icon', 'menu', 'message-box', 'small-caption',
            'status-bar', true, 'font-size', 'font-style', 'font-weight',
            'font-family'
        ],
        'font-family': css_comma_list,
        'font-size': [
            'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large',
            'xx-large', 'larger', 'smaller', css_length
        ],
        'font-size-adjust': ['none', css_number],
        'font-stretch': [
            'normal', 'wider', 'narrower', 'ultra-condensed',
            'extra-condensed', 'condensed', 'semi-condensed',
            'semi-expanded', 'expanded', 'extra-expanded'
        ],
        'font-style': [
            'normal', 'italic', 'oblique'
        ],
        'font-variant': [
            'normal', 'small-caps'
        ],
        'font-weight': [
            'normal', 'bold', 'bolder', 'lighter', css_number
        ],
        height: [css_length, 'auto'],
        left: [css_length, 'auto'],
        'letter-spacing': ['normal', css_length],
        'line-height': ['normal', css_line_height],
        'list-style': [
            true, 'list-style-image', 'list-style-position', 'list-style-type'
        ],
        'list-style-image': ['none', css_url],
        'list-style-position': ['inside', 'outside'],
        'list-style-type': [
            'circle', 'disc', 'square', 'decimal', 'decimal-leading-zero',
            'lower-roman', 'upper-roman', 'lower-greek', 'lower-alpha',
            'lower-latin', 'upper-alpha', 'upper-latin', 'hebrew', 'katakana',
            'hiragana-iroha', 'katakana-oroha', 'none'
        ],
        margin: [4, css_margin],
        'margin-bottom': css_margin,
        'margin-left': css_margin,
        'margin-right': css_margin,
        'margin-top': css_margin,
        'marker-offset': [css_length, 'auto'],
        'max-height': [css_length, 'none'],
        'max-width': [css_length, 'none'],
        'min-height': css_length,
        'min-width': css_length,
        opacity: css_number,
        outline: [true, 'outline-color', 'outline-style', 'outline-width'],
        'outline-color': ['invert', css_color],
        'outline-style': [
            'dashed', 'dotted', 'double', 'groove', 'inset', 'none',
            'outset', 'ridge', 'solid'
        ],
        'outline-width': css_width,
        overflow: css_overflow,
        'overflow-x': css_overflow,
        'overflow-y': css_overflow,
        padding: [4, css_length],
        'padding-bottom': css_length,
        'padding-left': css_length,
        'padding-right': css_length,
        'padding-top': css_length,
        'page-break-after': css_break,
        'page-break-before': css_break,
        position: ['absolute', 'fixed', 'relative', 'static'],
        quotes: [8, css_string],
        right: [css_length, 'auto'],
        'table-layout': ['auto', 'fixed'],
        'text-align': ['center', 'justify', 'left', 'right'],
        'text-decoration': [
            'none', 'underline', 'overline', 'line-through', 'blink'
        ],
        'text-indent': css_length,
        'text-shadow': ['none', 4, [css_color, css_length]],
        'text-transform': ['capitalize', 'uppercase', 'lowercase', 'none'],
        top: [css_length, 'auto'],
        'unicode-bidi': ['normal', 'embed', 'bidi-override'],
        'vertical-align': [
            'baseline', 'bottom', 'sub', 'super', 'top', 'text-top', 'middle',
            'text-bottom', css_length
        ],
        visibility: ['visible', 'hidden', 'collapse'],
        'white-space': [
            'normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'inherit'
        ],
        width: [css_length, 'auto'],
        'word-spacing': ['normal', css_length],
        'word-wrap': ['break-word', 'normal'],
        'z-index': ['auto', css_number]
    };

    function style_attribute() {
        var v;
        while (next_token.id === '*' || next_token.id === '#' ||
                next_token.string === '_') {
            if (!option.css) {
                warn('unexpected_a');
            }
            advance();
        }
        if (next_token.id === '-') {
            if (!option.css) {
                warn('unexpected_a');
            }
            advance('-');
            if (!next_token.identifier) {
                warn('expected_nonstandard_style_attribute');
            }
            advance();
            return css_any;
        } else {
            if (!next_token.identifier) {
                warn('expected_style_attribute');
            } else {
                if (Object.prototype.hasOwnProperty.call(css_attribute_data,
                        next_token.string)) {
                    v = css_attribute_data[next_token.string];
                } else {
                    v = css_any;
                    if (!option.css) {
                        warn('unrecognized_style_attribute_a');
                    }
                }
            }
            advance();
            return v;
        }
    }


    function style_value(v) {

        /*jslint confusion: true */

        var i = 0,
            n,
            once,
            match,
            round,
            start = 0,
            vi;
        switch (typeof v) {
        case 'function':
            return v();
        case 'string':
            if (next_token.identifier && next_token.string === v) {
                advance();
                return true;
            }
            return false;
        }
        for (;;) {
            if (i >= v.length) {
                return false;
            }
            vi = v[i];
            i += 1;
            if (typeof vi === 'boolean') {
                break;
            } else if (typeof vi === 'number') {
                n = vi;
                vi = v[i];
                i += 1;
            } else {
                n = 1;
            }
            match = false;
            while (n > 0) {
                if (style_value(vi)) {
                    match = true;
                    n -= 1;
                } else {
                    break;
                }
            }
            if (match) {
                return true;
            }
        }
        start = i;
        once = [];
        for (;;) {
            round = false;
            for (i = start; i < v.length; i += 1) {
                if (!once[i]) {
                    if (style_value(css_attribute_data[v[i]])) {
                        match = true;
                        round = true;
                        once[i] = true;
                        break;
                    }
                }
            }
            if (!round) {
                return match;
            }
        }
    }

    function style_child() {
        if (next_token.id === '(number)') {
            advance();
            if (next_token.string === 'n' && next_token.identifier) {
                no_space_only();
                advance();
                if (next_token.id === '+') {
                    no_space_only();
                    advance('+');
                    no_space_only();
                    advance('(number)');
                }
            }
            return;
        } else {
            if (next_token.identifier &&
                    (next_token.string === 'odd' || next_token.string === 'even')) {
                advance();
                return;
            }
        }
        warn('unexpected_a');
    }

    function substyle() {
        var v;
        for (;;) {
            if (next_token.id === '}' || next_token.id === '(end)' ||
                    (xquote && next_token.id === xquote)) {
                return;
            }
            v = style_attribute();
            advance(':');
            if (next_token.identifier && next_token.string === 'inherit') {
                advance();
            } else {
                if (!style_value(v)) {
                    warn('unexpected_a');
                    advance();
                }
            }
            if (next_token.id === '!') {
                advance('!');
                no_space_only();
                if (next_token.identifier && next_token.string === 'important') {
                    advance();
                } else {
                    warn('expected_a_b',
                        next_token, 'important', artifact());
                }
            }
            if (next_token.id === '}' || next_token.id === xquote) {
                warn('expected_a_b', next_token, ';', artifact());
            } else {
                semicolon();
            }
        }
    }

    function style_selector() {
        if (next_token.identifier) {
            if (!Object.prototype.hasOwnProperty.call(html_tag, option.cap
                    ? next_token.string.toLowerCase()
                    : next_token.string)) {
                warn('expected_tagname_a');
            }
            advance();
        } else {
            switch (next_token.id) {
            case '>':
            case '+':
                advance();
                style_selector();
                break;
            case ':':
                advance(':');
                switch (next_token.string) {
                case 'active':
                case 'after':
                case 'before':
                case 'checked':
                case 'disabled':
                case 'empty':
                case 'enabled':
                case 'first-child':
                case 'first-letter':
                case 'first-line':
                case 'first-of-type':
                case 'focus':
                case 'hover':
                case 'last-child':
                case 'last-of-type':
                case 'link':
                case 'only-of-type':
                case 'root':
                case 'target':
                case 'visited':
                    advance_identifier(next_token.string);
                    break;
                case 'lang':
                    advance_identifier('lang');
                    advance('(');
                    if (!next_token.identifier) {
                        warn('expected_lang_a');
                    }
                    advance(')');
                    break;
                case 'nth-child':
                case 'nth-last-child':
                case 'nth-last-of-type':
                case 'nth-of-type':
                    advance_identifier(next_token.string);
                    advance('(');
                    style_child();
                    advance(')');
                    break;
                case 'not':
                    advance_identifier('not');
                    advance('(');
                    if (next_token.id === ':' && peek(0).string === 'not') {
                        warn('not');
                    }
                    style_selector();
                    advance(')');
                    break;
                default:
                    warn('expected_pseudo_a');
                }
                break;
            case '#':
                advance('#');
                if (!next_token.identifier) {
                    warn('expected_id_a');
                }
                advance();
                break;
            case '*':
                advance('*');
                break;
            case '.':
                advance('.');
                if (!next_token.identifier) {
                    warn('expected_class_a');
                }
                advance();
                break;
            case '[':
                advance('[');
                if (!next_token.identifier) {
                    warn('expected_attribute_a');
                }
                advance();
                if (next_token.id === '=' || next_token.string === '~=' ||
                        next_token.string === '$=' ||
                        next_token.string === '|=' ||
                        next_token.id === '*=' ||
                        next_token.id === '^=') {
                    advance();
                    if (next_token.id !== '(string)') {
                        warn('expected_string_a');
                    }
                    advance();
                }
                advance(']');
                break;
            default:
                stop('expected_selector_a');
            }
        }
    }

    function style_pattern() {
        if (next_token.id === '{') {
            warn('expected_style_pattern');
        }
        for (;;) {
            style_selector();
            if (next_token.id === '</' || next_token.id === '{' ||
                    next_token.id === '}' || next_token.id === '(end)') {
                return '';
            }
            if (next_token.id === ',') {
                comma();
            }
        }
    }

    function style_list() {
        while (next_token.id !== '}' && next_token.id !== '</' &&
                next_token.id !== '(end)') {
            style_pattern();
            xmode = 'styleproperty';
            if (next_token.id === ';') {
                semicolon();
            } else {
                advance('{');
                substyle();
                xmode = 'style';
                advance('}');
            }
        }
    }

    function styles() {
        var i;
        while (next_token.id === '@') {
            i = peek();
            advance('@');
            switch (next_token.string) {
            case 'import':
                advance_identifier('import');
                if (!css_url()) {
                    warn('expected_a_b',
                        next_token, 'url', artifact());
                    advance();
                }
                semicolon();
                break;
            case 'media':
                advance_identifier('media');
                for (;;) {
                    if (!next_token.identifier || css_media[next_token.string] !== true) {
                        stop('expected_media_a');
                    }
                    advance();
                    if (next_token.id !== ',') {
                        break;
                    }
                    comma();
                }
                advance('{');
                style_list();
                advance('}');
                break;
            case 'font-face':
                advance_identifier('font-face');
                advance('{');
                font_face();
                advance('}');
                break;
            default:
                stop('expected_at_a');
            }
        }
        style_list();
    }


// Parse HTML

    function do_begin(n) {
        if (n !== 'html' && !option.fragment) {
            if (n === 'div' && option.adsafe) {
                stop('adsafe_fragment');
            } else {
                stop('expected_a_b', token, 'html', n);
            }
        }
        if (option.adsafe) {
            if (n === 'html') {
                stop('adsafe_html', token);
            }
            if (option.fragment) {
                if (n !== 'div') {
                    stop('adsafe_div', token);
                }
            } else {
                stop('adsafe_fragment', token);
            }
        }
        option.browser = true;
    }

    function do_attribute(a, v) {
        var u, x;
        if (a === 'id') {
            u = typeof v === 'string' ? v.toUpperCase() : '';
            if (ids[u] === true) {
                warn('duplicate_a', next_token, v);
            }
            if (!/^[A-Za-z][A-Za-z0-9._:\-]*$/.test(v)) {
                warn('bad_id_a', next_token, v);
            } else if (option.adsafe) {
                if (adsafe_id) {
                    if (v.slice(0, adsafe_id.length) !== adsafe_id) {
                        warn('adsafe_prefix_a', next_token, adsafe_id);
                    } else if (!/^[A-Z]+_[A-Z]+$/.test(v)) {
                        warn('adsafe_bad_id');
                    }
                } else {
                    adsafe_id = v;
                    if (!/^[A-Z]+_$/.test(v)) {
                        warn('adsafe_bad_id');
                    }
                }
            }
            x = v.search(dx);
            if (x >= 0) {
                warn('unexpected_char_a_b', token, v.charAt(x), a);
            }
            ids[u] = true;
        } else if (a === 'class' || a === 'type' || a === 'name') {
            x = v.search(qx);
            if (x >= 0) {
                warn('unexpected_char_a_b', token, v.charAt(x), a);
            }
            ids[u] = true;
        } else if (a === 'href' || a === 'background' ||
                a === 'content' || a === 'data' ||
                a.indexOf('src') >= 0 || a.indexOf('url') >= 0) {
            if (option.safe && ux.test(v)) {
                stop('bad_url_a', next_token, v);
            }
            urls.push(v);
        } else if (a === 'for') {
            if (option.adsafe) {
                if (adsafe_id) {
                    if (v.slice(0, adsafe_id.length) !== adsafe_id) {
                        warn('adsafe_prefix_a', next_token, adsafe_id);
                    } else if (!/^[A-Z]+_[A-Z]+$/.test(v)) {
                        warn('adsafe_bad_id');
                    }
                } else {
                    warn('adsafe_bad_id');
                }
            }
        } else if (a === 'name') {
            if (option.adsafe && v.indexOf('_') >= 0) {
                warn('adsafe_name_a', next_token, v);
            }
        }
    }

    function do_tag(name, attribute) {
        var i, tag = html_tag[name], script, x;
        src = false;
        if (!tag) {
            stop(
                bundle.unrecognized_tag_a,
                next_token,
                name === name.toLowerCase()
                    ? name
                    : name + ' (capitalization error)'
            );
        }
        if (stack.length > 0) {
            if (name === 'html') {
                stop('unexpected_a', token, name);
            }
            x = tag.parent;
            if (x) {
                if (x.indexOf(' ' + stack[stack.length - 1].name + ' ') < 0) {
                    stop('tag_a_in_b', token, name, x);
                }
            } else if (!option.adsafe && !option.fragment) {
                i = stack.length;
                do {
                    if (i <= 0) {
                        stop('tag_a_in_b', token, name, 'body');
                    }
                    i -= 1;
                } while (stack[i].name !== 'body');
            }
        }
        switch (name) {
        case 'div':
            if (option.adsafe && stack.length === 1 && !adsafe_id) {
                warn('adsafe_missing_id');
            }
            break;
        case 'script':
            xmode = 'script';
            advance('>');
            if (attribute.lang) {
                warn('lang', token);
            }
            if (option.adsafe && stack.length !== 1) {
                warn('adsafe_placement', token);
            }
            if (attribute.src) {
                if (option.adsafe && (!adsafe_may || !approved[attribute.src])) {
                    warn('adsafe_source', token);
                }
                if (attribute.type) {
                    warn('type', token);
                }
            } else {
                step_in(next_token.from);
                edge();
                use_strict();
                adsafe_top = true;
                script = statements();

// JSLint is also the static analyzer for ADsafe. See www.ADsafe.org.

                if (option.adsafe) {
                    if (adsafe_went) {
                        stop('adsafe_script', token);
                    }
                    if (script.length !== 1 ||
                            aint(script[0],             'id',     '(') ||
                            aint(script[0].first,       'id',     '.') ||
                            aint(script[0].first.first, 'string', 'ADSAFE') ||
                            aint(script[0].second[0],   'string', adsafe_id)) {
                        stop('adsafe_id_go');
                    }
                    switch (script[0].first.second.string) {
                    case 'id':
                        if (adsafe_may || adsafe_went ||
                                script[0].second.length !== 1) {
                            stop('adsafe_id', next_token);
                        }
                        adsafe_may = true;
                        break;
                    case 'go':
                        if (adsafe_went) {
                            stop('adsafe_go');
                        }
                        if (script[0].second.length !== 2 ||
                                aint(script[0].second[1], 'id', 'function') ||
                                !script[0].second[1].first ||
                                script[0].second[1].first.length !== 2 ||
                                aint(script[0].second[1].first[0], 'string', 'dom') ||
                                aint(script[0].second[1].first[1], 'string', 'lib')) {
                            stop('adsafe_go', next_token);
                        }
                        adsafe_went = true;
                        break;
                    default:
                        stop('adsafe_id_go');
                    }
                }
                indent = null;
            }
            xmode = 'html';
            advance('</');
            advance_identifier('script');
            xmode = 'outer';
            break;
        case 'style':
            xmode = 'style';
            advance('>');
            styles();
            xmode = 'html';
            advance('</');
            advance_identifier('style');
            break;
        case 'input':
            switch (attribute.type) {
            case 'button':
            case 'checkbox':
            case 'radio':
            case 'reset':
            case 'submit':
                break;
            case 'file':
            case 'hidden':
            case 'image':
            case 'password':
            case 'text':
                if (option.adsafe && attribute.autocomplete !== 'off') {
                    warn('adsafe_autocomplete');
                }
                break;
            default:
                warn('bad_type');
            }
            break;
        case 'applet':
        case 'body':
        case 'embed':
        case 'frame':
        case 'frameset':
        case 'head':
        case 'iframe':
        case 'noembed':
        case 'noframes':
        case 'object':
        case 'param':
            if (option.adsafe) {
                warn('adsafe_tag', next_token, name);
            }
            break;
        }
    }


    function closetag(name) {
        return '</' + name + '>';
    }

    function html() {

        /*jslint confusion: true */

        var attribute, attributes, is_empty, name, old_white = option.white,
            quote, tag_name, tag, wmode;
        xmode = 'html';
        xquote = '';
        stack = null;
        for (;;) {
            switch (next_token.string) {
            case '<':
                xmode = 'html';
                advance('<');
                attributes = {};
                tag_name = next_token;
                name = tag_name.string;
                advance_identifier(name);
                if (option.cap) {
                    name = name.toLowerCase();
                }
                tag_name.name = name;
                if (!stack) {
                    stack = [];
                    do_begin(name);
                }
                tag = html_tag[name];
                if (typeof tag !== 'object') {
                    stop('unrecognized_tag_a', tag_name, name);
                }
                is_empty = tag.empty;
                tag_name.type = name;
                for (;;) {
                    if (next_token.id === '/') {
                        advance('/');
                        if (next_token.id !== '>') {
                            warn('expected_a_b', next_token, '>', artifact());
                        }
                        break;
                    }
                    if (next_token.id && next_token.id.charAt(0) === '>') {
                        break;
                    }
                    if (!next_token.identifier) {
                        if (next_token.id === '(end)' || next_token.id === '(error)') {
                            warn('expected_a_b', next_token, '>', artifact());
                        }
                        warn('bad_name_a');
                    }
                    option.white = false;
                    spaces();
                    attribute = next_token.string;
                    option.white = old_white;
                    advance();
                    if (!option.cap && attribute !== attribute.toLowerCase()) {
                        warn('attribute_case_a', token);
                    }
                    attribute = attribute.toLowerCase();
                    xquote = '';
                    if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
                        warn('duplicate_a', token, attribute);
                    }
                    if (attribute.slice(0, 2) === 'on') {
                        if (!option.on) {
                            warn('html_handlers');
                        }
                        xmode = 'scriptstring';
                        advance('=');
                        quote = next_token.id;
                        if (quote !== '"' && quote !== '\'') {
                            stop('expected_a_b', next_token, '"', artifact());
                        }
                        xquote = quote;
                        wmode = option.white;
                        option.white = true;
                        advance(quote);
                        use_strict();
                        statements();
                        option.white = wmode;
                        if (next_token.id !== quote) {
                            stop('expected_a_b', next_token, quote, artifact());
                        }
                        xmode = 'html';
                        xquote = '';
                        advance(quote);
                        tag = false;
                    } else if (attribute === 'style') {
                        xmode = 'scriptstring';
                        advance('=');
                        quote = next_token.id;
                        if (quote !== '"' && quote !== '\'') {
                            stop('expected_a_b', next_token, '"', artifact());
                        }
                        xmode = 'styleproperty';
                        xquote = quote;
                        advance(quote);
                        substyle();
                        xmode = 'html';
                        xquote = '';
                        advance(quote);
                        tag = false;
                    } else {
                        if (next_token.id === '=') {
                            advance('=');
                            tag = next_token.string;
                            if (!next_token.identifier &&
                                    next_token.id !== '"' &&
                                    next_token.id !== '\'' &&
                                    next_token.id !== '(string)' &&
                                    next_token.id !== '(string)' &&
                                    next_token.id !== '(color)') {
                                warn('expected_attribute_value_a', token, attribute);
                            }
                            advance();
                        } else {
                            tag = true;
                        }
                    }
                    attributes[attribute] = tag;
                    do_attribute(attribute, tag);
                }
                do_tag(name, attributes);
                if (!is_empty) {
                    stack.push(tag_name);
                }
                xmode = 'outer';
                advance('>');
                break;
            case '</':
                xmode = 'html';
                advance('</');
                if (!next_token.identifier) {
                    warn('bad_name_a');
                }
                name = next_token.string;
                if (option.cap) {
                    name = name.toLowerCase();
                }
                advance();
                if (!stack) {
                    stop('unexpected_a', next_token, closetag(name));
                }
                tag_name = stack.pop();
                if (!tag_name) {
                    stop('unexpected_a', next_token, closetag(name));
                }
                if (tag_name.name !== name) {
                    stop('expected_a_b',
                        next_token, closetag(tag_name.name), closetag(name));
                }
                if (next_token.id !== '>') {
                    stop('expected_a_b', next_token, '>', artifact());
                }
                xmode = 'outer';
                advance('>');
                break;
            case '<!':
                if (option.safe) {
                    warn('adsafe_a');
                }
                xmode = 'html';
                for (;;) {
                    advance();
                    if (next_token.id === '>' || next_token.id === '(end)') {
                        break;
                    }
                    if (next_token.string.indexOf('--') >= 0) {
                        stop('unexpected_a', next_token, '--');
                    }
                    if (next_token.string.indexOf('<') >= 0) {
                        stop('unexpected_a', next_token, '<');
                    }
                    if (next_token.string.indexOf('>') >= 0) {
                        stop('unexpected_a', next_token, '>');
                    }
                }
                xmode = 'outer';
                advance('>');
                break;
            case '(end)':
                return;
            default:
                if (next_token.id === '(end)') {
                    stop('missing_a', next_token,
                        '</' + stack[stack.length - 1].string + '>');
                } else {
                    advance();
                }
            }
            if (stack && stack.length === 0 && (option.adsafe ||
                    !option.fragment || next_token.id === '(end)')) {
                break;
            }
        }
        if (next_token.id !== '(end)') {
            stop('unexpected_a');
        }
    }


// The actual JSLINT function itself.

    itself = function JSLint(the_source, the_option) {

        var i, predef, tree;
        JSLINT.errors = [];
        JSLINT.tree = '';
        begin = prev_token = token = next_token =
            Object.create(syntax['(begin)']);
        predefined = {};
        add_to_predefined(standard);
        property_type = Object.create(standard_property_type);
        if (the_option) {
            option = Object.create(the_option);
            predef = option.predef;
            if (predef) {
                if (Array.isArray(predef)) {
                    for (i = 0; i < predef.length; i += 1) {
                        predefined[predef[i]] = true;
                    }
                } else if (typeof predef === 'object') {
                    add_to_predefined(predef);
                }
            }
            do_safe();
        } else {
            option = {};
        }
        option.indent = +option.indent || 4;
        option.maxerr = +option.maxerr || 50;
        adsafe_id = '';
        adsafe_may = adsafe_top = adsafe_went = false;
        approved = {};
        if (option.approved) {
            for (i = 0; i < option.approved.length; i += 1) {
                approved[option.approved[i]] = option.approved[i];
            }
        } else {
            approved.test = 'test';
        }
        tab = '';
        for (i = 0; i < option.indent; i += 1) {
            tab += ' ';
        }
        global_scope = scope = {};
        global_funct = funct = {
            '(scope)': scope,
            '(breakage)': 0,
            '(loopage)': 0
        };
        functions = [funct];

        comments_off = false;
        ids = {};
        in_block = false;
        indent = null;
        json_mode = false;
        lookahead = [];
        member = {};
        node_js = false;
        prereg = true;
        src = false;
        stack = null;
        strict_mode = false;
        urls = [];
        var_mode = null;
        warnings = 0;
        xmode = '';
        lex.init(the_source);

        assume();

        try {
            advance();
            if (next_token.id === '(number)') {
                stop('unexpected_a');
            } else if (next_token.string.charAt(0) === '<') {
                html();
                if (option.adsafe && !adsafe_went) {
                    warn('adsafe_go', this);
                }
            } else {
                switch (next_token.id) {
                case '{':
                case '[':
                    json_mode = true;
                    json_value();
                    break;
                case '@':
                case '*':
                case '#':
                case '.':
                case ':':
                    xmode = 'style';
                    advance();
                    if (token.id !== '@' || !next_token.identifier ||
                            next_token.string !== 'charset' || token.line !== 1 ||
                            token.from !== 1) {
                        stop('css');
                    }
                    advance();
                    if (next_token.id !== '(string)' &&
                            next_token.string !== 'UTF-8') {
                        stop('css');
                    }
                    advance();
                    semicolon();
                    styles();
                    break;

                default:
                    if (option.adsafe && option.fragment) {
                        stop('expected_a_b',
                            next_token, '<div>', artifact());
                    }

// If the first token is a semicolon, ignore it. This is sometimes used when
// files are intended to be appended to files that may be sloppy. A sloppy
// file may be depending on semicolon insertion on its last line.

                    step_in(1);
                    if (next_token.id === ';' && !node_js) {
                        semicolon();
                    }
                    adsafe_top = true;
                    tree = statements();
                    begin.first = tree;
                    JSLINT.tree = begin;
                    // infer_types(tree);
                    if (option.adsafe && (tree.length !== 1 ||
                            aint(tree[0], 'id', '(') ||
                            aint(tree[0].first, 'id', '.') ||
                            aint(tree[0].first.first, 'string', 'ADSAFE') ||
                            aint(tree[0].first.second, 'string', 'lib') ||
                            tree[0].second.length !== 2 ||
                            tree[0].second[0].id !== '(string)' ||
                            aint(tree[0].second[1], 'id', 'function'))) {
                        stop('adsafe_lib');
                    }
                    if (tree.disrupt) {
                        warn('weird_program', prev_token);
                    }
                }
            }
            indent = null;
            advance('(end)');
        } catch (e) {
            if (e) {        // `~
                JSLINT.errors.push({
                    reason    : e.message,
                    line      : e.line || next_token.line,
                    character : e.character || next_token.from
                }, null);
            }
        }
        return JSLINT.errors.length === 0;
    };


// Data summary.

    itself.data = function () {
        var data = {functions: []},
            function_data,
            globals,
            i,
            j,
            kind,
            members = [],
            name,
            the_function,
            undef = [],
            unused = [];
        if (itself.errors.length) {
            data.errors = itself.errors;
        }

        if (json_mode) {
            data.json = true;
        }

        if (urls.length > 0) {
            data.urls = urls;
        }

        globals = Object.keys(global_scope).filter(function (value) {
            return value.charAt(0) !== '(' && typeof standard[value] !== 'boolean';
        });
        if (globals.length > 0) {
            data.globals = globals;
        }

        for (i = 1; i < functions.length; i += 1) {
            the_function = functions[i];
            function_data = {};
            for (j = 0; j < functionicity.length; j += 1) {
                function_data[functionicity[j]] = [];
            }
            for (name in the_function) {
                if (Object.prototype.hasOwnProperty.call(the_function, name)) {
                    if (name.charAt(0) !== '(') {
                        kind = the_function[name];
                        if (kind === 'unction' || kind === 'unparam') {
                            kind = 'unused';
                        }
                        if (Array.isArray(function_data[kind])) {
                            function_data[kind].push(name);
                            if (kind === 'unused') {
                                unused.push({
                                    name: name,
                                    line: the_function['(line)'],
                                    'function': the_function['(name)']
                                });
                            } else if (kind === 'undef') {
                                undef.push({
                                    name: name,
                                    line: the_function['(line)'],
                                    'function': the_function['(name)']
                                });
                            }
                        }
                    }
                }
            }
            for (j = 0; j < functionicity.length; j += 1) {
                if (function_data[functionicity[j]].length === 0) {
                    delete function_data[functionicity[j]];
                }
            }
            function_data.name = the_function['(name)'];
            function_data.params = the_function['(params)'];
            function_data.line = the_function['(line)'];
            function_data['(complexity)'] = the_function['(complexity)'];
            data.functions.push(function_data);
        }

        if (unused.length > 0) {
            data.unused = unused;
        }
        if (undef.length > 0) {
            data['undefined'] = undef;
        }

        members = [];
        for (name in member) {
            if (typeof member[name] === 'number') {
                data.member = member;
                break;
            }
        }

        return data;
    };


    itself.report = function (errors_only) {
        var data = itself.data(), err, evidence, i, italics, j, key, keys, length,
            mem = '', name, names, output = [], snippets, the_function, type,
            warning;

        function detail(h, value) {
            var comma_needed, singularity;
            if (Array.isArray(value)) {
                output.push('<div><i>' + h + '</i> ');
                value.sort().forEach(function (item) {
                    if (item !== singularity) {
                        singularity = item;
                        output.push((comma_needed ? ', ' : '') + singularity);
                        comma_needed = true;
                    }
                });
                output.push('</div>');
            } else if (value) {
                output.push('<div><i>' + h + '</i> ' + value + '</div>');
            }
        }

        if (data.errors || data.unused || data['undefined']) {
            err = true;
            output.push('<div id=errors><i>Error:</i>');
            if (data.errors) {
                for (i = 0; i < data.errors.length; i += 1) {
                    warning = data.errors[i];
                    if (warning) {
                        evidence = warning.evidence || '';
                        output.push('<p>Problem' + (isFinite(warning.line)
                            ? ' at line ' + String(warning.line) +
                                ' character ' + String(warning.character)
                            : '') +
                            ': ' + warning.reason.entityify() +
                            '</p><p class=evidence>' +
                            (evidence && (evidence.length > 80
                                ? evidence.slice(0, 77) + '...'
                                : evidence).entityify()) + '</p>');
                    }
                }
            }

            if (data['undefined']) {
                snippets = [];
                for (i = 0; i < data['undefined'].length; i += 1) {
                    snippets[i] = '<code><u>' + data['undefined'][i].name + '</u></code>&nbsp;<i>' +
                        String(data['undefined'][i].line) + ' </i> <small>' +
                        data['undefined'][i]['function'] + '</small>';
                }
                output.push('<p><i>Undefined variable:</i> ' + snippets.join(', ') + '</p>');
            }
            if (data.unused) {
                snippets = [];
                for (i = 0; i < data.unused.length; i += 1) {
                    snippets[i] = '<code><u>' + data.unused[i].name + '</u></code>&nbsp;<i>' +
                        String(data.unused[i].line) + ' </i> <small>' +
                        data.unused[i]['function'] + '</small>';
                }
                output.push('<p><i>Unused variable:</i> ' + snippets.join(', ') + '</p>');
            }
            if (data.json) {
                output.push('<p>JSON: bad.</p>');
            }
            output.push('</div>');
        }

        if (!errors_only) {

            output.push('<br><div id=functions>');

            if (data.urls) {
                detail("URLs<br>", data.urls, '<br>');
            }

            if (xmode === 'style') {
                output.push('<p>CSS.</p>');
            } else if (data.json && !err) {
                output.push('<p>JSON: good.</p>');
            } else if (data.globals) {
                output.push('<div><i>Global</i> ' +
                    data.globals.sort().join(', ') + '</div>');
            } else {
                output.push('<div><i>No new global variables introduced.</i></div>');
            }

            for (i = 0; i < data.functions.length; i += 1) {
                the_function = data.functions[i];
                names = [];
                if (the_function.params) {
                    for (j = 0; j < the_function.params.length; j += 1) {
                        names[j] = the_function.params[j].string;
                    }
                }
                output.push('<br><div class=function><i>' +
                    String(the_function.line) + '</i> ' +
                    the_function.name.entityify() +
                    '(' + names.join(', ') + ')</div>');
                detail('<big><b>Undefined</b></big>', the_function['undefined']);
                detail('<big><b>Unused</b></big>', the_function.unused);
                detail('Closure', the_function.closure);
                detail('Variable', the_function['var']);
                detail('Exception', the_function.exception);
                detail('Outer', the_function.outer);
                detail('Global', the_function.global);
                detail('Label', the_function.label);
                detail('Complexity', the_function['(complexity)']);
            }

            if (data.member) {
                keys = Object.keys(data.member);
                if (keys.length) {
                    keys = keys.sort();
                    output.push('<br><pre id=properties>/*properties<br>');
                    mem = '    ';
                    italics = 0;
                    j = 0;
                    if (option.confusion) {
                        for (i = 0; i < keys.length; i += 1) {
                            key = keys[i];
                            if (typeof standard_property_type[key] !== 'string') {
                                name = ix.test(key)
                                    ? key
                                    : '\'' + key.entityify().replace(nx, sanitize) + '\'';
                                if (data.member[key] === 1) {
                                    name = '<i>' + name + '</i>';
                                    italics += 1;
                                    j = 1;
                                }
                                if (i < keys.length - 1) {
                                    name += ', ';
                                }
                                if (mem.length + name.length - (italics * 7) > 80) {
                                    output.push(mem + '<br>');
                                    mem = '    ';
                                    italics = j;
                                }
                                mem += name;
                                j = 0;
                            }
                        }
                    } else {
                        for (i = 0; i < keys.length; i += 1) {
                            key = keys[i];
                            type = property_type[key];
                            if (typeof type !== 'string') {
                                type = '';
                            }
                            if (standard_property_type[key] !== type) {
                                name = ix.test(key)
                                    ? key
                                    : '\'' + key.entityify().replace(nx, sanitize) + '\'';
                                length += name.length + 2;
                                if (data.member[key] === 1) {
                                    name = '<i>' + name + '</i>';
                                    italics += 1;
                                    j = 1;
                                }
                                if (type) {
                                    name += ': ' + type;
                                }
                                if (i < keys.length - 1) {
                                    name += ', ';
                                }
                                if (mem.length + name.length - (italics * 7) > 80) {
                                    output.push(mem + '<br>');
                                    mem = '    ';
                                    italics = j;
                                }
                                mem += name;
                                j = 0;
                            }
                        }
                    }
                    output.push(mem + '<br>*/</pre>');
                }
                output.push('</div>');
            }
        }
        return output.join('');
    };
    itself.jslint = itself;

    // CommonJS module export
    if (typeof exports !== "undefined") {
        exports.JSLINT = itself;
    }

    itself.edition = '2011-09-29';

    return itself;

}());
});
require.memoize('text!'+bravojs.realpath(bravojs.mainModuleDir + '/3A028CD0C5137FCCEC43D052C2635D16@/jslint'), [], function () {
return ((typeof bravojs !== "undefined")?bravojs:loader.bravojs).base64decode("Ly8ganNsaW50LmpzCi8vIDIwMTEtMDktMjkKCi8vIENvcHlyaWdodCAoYykgMjAwMiBEb3VnbGFzIENyb2NrZm9yZCAgKHd3dy5KU0xpbnQuY29tKQoKLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weQovLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbAovLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzCi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwKLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzCi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6CgovLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbgovLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS4KCi8vIFRoZSBTb2Z0d2FyZSBzaGFsbCBiZSB1c2VkIGZvciBHb29kLCBub3QgRXZpbC4KCi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAiQVMgSVMiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SCi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLAovLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUKLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUgovLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLAovLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRQovLyBTT0ZUV0FSRS4KCi8vIFdBUk5JTkc6IEpTTGludCB3aWxsIGh1cnQgeW91ciBmZWVsaW5ncy4KCi8vIEpTTElOVCBpcyBhIGdsb2JhbCBmdW5jdGlvbi4gSXQgdGFrZXMgdHdvIHBhcmFtZXRlcnMuCgovLyAgICAgdmFyIG15UmVzdWx0ID0gSlNMSU5UKHNvdXJjZSwgb3B0aW9uKTsKCi8vIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MuIElmIGl0IGlzIGEKLy8gc3RyaW5nLCBpdCB3aWxsIGJlIHNwbGl0IG9uICdcbicgb3IgJ1xyJy4gSWYgaXQgaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncywgaXQKLy8gaXMgYXNzdW1lZCB0aGF0IGVhY2ggc3RyaW5nIHJlcHJlc2VudHMgb25lIGxpbmUuIFRoZSBzb3VyY2UgY2FuIGJlIGEKLy8gSmF2YVNjcmlwdCB0ZXh0LCBvciBIVE1MIHRleHQsIG9yIGEgSlNPTiB0ZXh0LCBvciBhIENTUyB0ZXh0LgoKLy8gVGhlIHNlY29uZCBwYXJhbWV0ZXIgaXMgYW4gb3B0aW9uYWwgb2JqZWN0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9sIHRoZQovLyBvcGVyYXRpb24gb2YgSlNMSU5ULiBNb3N0IG9mIHRoZSBvcHRpb25zIGFyZSBib29sZWFuczogVGhleSBhcmUgYWxsCi8vIG9wdGlvbmFsIGFuZCBoYXZlIGEgZGVmYXVsdCB2YWx1ZSBvZiBmYWxzZS4gT25lIG9mIHRoZSBvcHRpb25zLCBwcmVkZWYsCi8vIGNhbiBiZSBhbiBhcnJheSBvZiBuYW1lcywgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGRlY2xhcmUgZ2xvYmFsIHZhcmlhYmxlcywKLy8gb3IgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIHVzZWQgYXMgZ2xvYmFsIG5hbWVzLCB3aXRoIGEgYm9vbGVhbiB2YWx1ZQovLyB0aGF0IGRldGVybWluZXMgaWYgdGhleSBhcmUgYXNzaWduYWJsZS4KCi8vIElmIGl0IGNoZWNrcyBvdXQsIEpTTElOVCByZXR1cm5zIHRydWUuIE90aGVyd2lzZSwgaXQgcmV0dXJucyBmYWxzZS4KCi8vIElmIGZhbHNlLCB5b3UgY2FuIGluc3BlY3QgSlNMSU5ULmVycm9ycyB0byBmaW5kIG91dCB0aGUgcHJvYmxlbXMuCi8vIEpTTElOVC5lcnJvcnMgaXMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRoZXNlIHByb3BlcnRpZXM6CgovLyAgewovLyAgICAgIGxpbmUgICAgICA6IFRoZSBsaW5lIChyZWxhdGl2ZSB0byAwKSBhdCB3aGljaCB0aGUgbGludCB3YXMgZm91bmQKLy8gICAgICBjaGFyYWN0ZXIgOiBUaGUgY2hhcmFjdGVyIChyZWxhdGl2ZSB0byAwKSBhdCB3aGljaCB0aGUgbGludCB3YXMgZm91bmQKLy8gICAgICByZWFzb24gICAgOiBUaGUgcHJvYmxlbQovLyAgICAgIGV2aWRlbmNlICA6IFRoZSB0ZXh0IGxpbmUgaW4gd2hpY2ggdGhlIHByb2JsZW0gb2NjdXJyZWQKLy8gICAgICByYXcgICAgICAgOiBUaGUgcmF3IG1lc3NhZ2UgYmVmb3JlIHRoZSBkZXRhaWxzIHdlcmUgaW5zZXJ0ZWQKLy8gICAgICBhICAgICAgICAgOiBUaGUgZmlyc3QgZGV0YWlsCi8vICAgICAgYiAgICAgICAgIDogVGhlIHNlY29uZCBkZXRhaWwKLy8gICAgICBjICAgICAgICAgOiBUaGUgdGhpcmQgZGV0YWlsCi8vICAgICAgZCAgICAgICAgIDogVGhlIGZvdXJ0aCBkZXRhaWwKLy8gIH0KCi8vIElmIGEgc3RvcHBpbmcgZXJyb3Igd2FzIGZvdW5kLCBhIG51bGwgd2lsbCBiZSB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZQovLyBKU0xJTlQuZXJyb3JzIGFycmF5LiBBIHN0b3BwaW5nIGVycm9yIG1lYW5zIHRoYXQgSlNMaW50IHdhcyBub3QgY29uZmlkZW50Ci8vIGVub3VnaCB0byBjb250aW51ZS4gSXQgZG9lcyBub3QgbmVjZXNzYXJpbHkgbWVhbiB0aGF0IHRoZSBlcnJvciB3YXMKLy8gZXNwZWNpYWxseSBoZWlub3VzLgoKLy8gWW91IGNhbiByZXF1ZXN0IGEgRnVuY3Rpb24gUmVwb3J0LCB3aGljaCBzaG93cyBhbGwgb2YgdGhlIGZ1bmN0aW9ucwovLyBhbmQgdGhlIHBhcmFtZXRlcnMgYW5kIHZhcnMgdGhhdCB0aGV5IHVzZS4gVGhpcyBjYW4gYmUgdXNlZCB0byBmaW5kCi8vIGltcGxpZWQgZ2xvYmFsIHZhcmlhYmxlcyBhbmQgb3RoZXIgcHJvYmxlbXMuIFRoZSByZXBvcnQgaXMgaW4gSFRNTCBhbmQKLy8gY2FuIGJlIGluc2VydGVkIGluIGFuIEhUTUwgPGJvZHk+LgoKLy8gICAgIHZhciBteVJlcG9ydCA9IEpTTElOVC5yZXBvcnQoZXJyb3JzX29ubHkpOwoKLy8gSWYgZXJyb3JzX29ubHkgaXMgdHJ1ZSwgdGhlbiB0aGUgcmVwb3J0IHdpbGwgYmUgbGltaXRlZCB0byBvbmx5IGVycm9ycy4KCi8vIFlvdSBjYW4gcmVxdWVzdCBhIGRhdGEgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgSlNMaW50J3MgcmVzdWx0cy4KCi8vICAgICB2YXIgbXlEYXRhID0gSlNMSU5ULmRhdGEoKTsKCi8vIEl0IHJldHVybnMgYSBzdHJ1Y3R1cmUgd2l0aCB0aGlzIGZvcm06CgovLyAgICAgewovLyAgICAgICAgIGVycm9yczogWwovLyAgICAgICAgICAgICB7Ci8vICAgICAgICAgICAgICAgICBsaW5lOiBOVU1CRVIsCi8vICAgICAgICAgICAgICAgICBjaGFyYWN0ZXI6IE5VTUJFUiwKLy8gICAgICAgICAgICAgICAgIHJlYXNvbjogU1RSSU5HLAovLyAgICAgICAgICAgICAgICAgZXZpZGVuY2U6IFNUUklORwovLyAgICAgICAgICAgICB9Ci8vICAgICAgICAgXSwKLy8gICAgICAgICBmdW5jdGlvbnM6IFsKLy8gICAgICAgICAgICAgewovLyAgICAgICAgICAgICAgICAgbmFtZTogU1RSSU5HLAovLyAgICAgICAgICAgICAgICAgbGluZTogTlVNQkVSLAovLyAgICAgICAgICAgICAgICAgbGFzdDogTlVNQkVSLAovLyAgICAgICAgICAgICAgICAgcGFyYW1zOiBbCi8vICAgICAgICAgICAgICAgICAgICAgewovLyAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmc6IFNUUklORwovLyAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIF0sCi8vICAgICAgICAgICAgICAgICBjbG9zdXJlOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdLAovLyAgICAgICAgICAgICAgICAgdmFyOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdLAovLyAgICAgICAgICAgICAgICAgZXhjZXB0aW9uOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdLAovLyAgICAgICAgICAgICAgICAgb3V0ZXI6IFsKLy8gICAgICAgICAgICAgICAgICAgICBTVFJJTkcKLy8gICAgICAgICAgICAgICAgIF0sCi8vICAgICAgICAgICAgICAgICB1bnVzZWQ6IFsKLy8gICAgICAgICAgICAgICAgICAgICBTVFJJTkcKLy8gICAgICAgICAgICAgICAgIF0sCi8vICAgICAgICAgICAgICAgICB1bmRlZjogWwovLyAgICAgICAgICAgICAgICAgICAgIFNUUklORwovLyAgICAgICAgICAgICAgICAgXSwKLy8gICAgICAgICAgICAgICAgIGdsb2JhbDogWwovLyAgICAgICAgICAgICAgICAgICAgIFNUUklORwovLyAgICAgICAgICAgICAgICAgXSwKLy8gICAgICAgICAgICAgICAgIGxhYmVsOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdCi8vICAgICAgICAgICAgIH0KLy8gICAgICAgICBdLAovLyAgICAgICAgIGdsb2JhbHM6IFsKLy8gICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgXSwKLy8gICAgICAgICBtZW1iZXI6IHsKLy8gICAgICAgICAgICAgU1RSSU5HOiBOVU1CRVIKLy8gICAgICAgICB9LAovLyAgICAgICAgIHVybHM6IFsKLy8gICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgXSwKLy8gICAgICAgICBqc29uOiBCT09MRUFOCi8vICAgICB9CgovLyBFbXB0eSBhcnJheXMgd2lsbCBub3QgYmUgaW5jbHVkZWQuCgovLyBZb3UgY2FuIG9idGFpbiB0aGUgcGFyc2UgdHJlZSB0aGF0IEpTTGludCBjb25zdHJ1Y3RlZCB3aGlsZSBwYXJzaW5nLiBUaGUKLy8gbGF0ZXN0IHRyZWUgaXMga2VwdCBpbiBKU0xJTlQudHJlZS4gQSBuaWNlIHN0cmluZ2ljYXRpb24gY2FuIGJlIHByb2R1Y2VkCi8vIHdpdGgKCi8vICAgICBKU09OLnN0cmluZ2lmeShKU0xJTlQudHJlZSwgWwovLyAgICAgICAgICdzdHJpbmcnLCAgJ2FyaXR5JywgJ25hbWUnLCAgJ2ZpcnN0JywKLy8gICAgICAgICAnc2Vjb25kJywgJ3RoaXJkJywgJ2Jsb2NrJywgJ2Vsc2UnCi8vICAgICBdLCA0KSk7CgovLyBKU0xpbnQgcHJvdmlkZXMgdGhyZWUgZGlyZWN0aXZlcy4gVGhleSBsb29rIGxpa2Ugc2xhc2hzdGFyIGNvbW1lbnRzLCBhbmQKLy8gYWxsb3cgZm9yIHNldHRpbmcgb3B0aW9ucywgZGVjbGFyaW5nIGdsb2JhbCB2YXJpYWJsZXMsIGFuZCBlc3RhYmxpc2hpbmcgYQovLyBzZXQgb2YgYWxsb3dlZCBwcm9wZXJ0eSBuYW1lcy4KCi8vIFRoZXNlIGRpcmVjdGl2ZXMgcmVzcGVjdCBmdW5jdGlvbiBzY29wZS4KCi8vIFRoZSBqc2xpbnQgZGlyZWN0aXZlIGlzIGEgc3BlY2lhbCBjb21tZW50IHRoYXQgY2FuIHNldCBvbmUgb3IgbW9yZSBvcHRpb25zLgovLyBUaGUgY3VycmVudCBvcHRpb24gc2V0IGlzCgovLyAgICAgYWRzYWZlICAgICB0cnVlLCBpZiBBRHNhZmUgcnVsZXMgc2hvdWxkIGJlIGVuZm9yY2VkCi8vICAgICBiaXR3aXNlICAgIHRydWUsIGlmIGJpdHdpc2Ugb3BlcmF0b3JzIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBicm93c2VyICAgIHRydWUsIGlmIHRoZSBzdGFuZGFyZCBicm93c2VyIGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIGNvbW1vbmpzICAgdHJ1ZSwgaWYgdGhlIHN0YW5kYXJkIGNvbW1vbmpzIGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIGNhcCAgICAgICAgdHJ1ZSwgaWYgdXBwZXIgY2FzZSBIVE1MIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBjb25mdXNpb24gIHRydWUsIGlmIHR5cGVzIGNhbiBiZSB1c2VkIGluY29uc2lzdGVudGx5Ci8vICAgICAnY29udGludWUnIHRydWUsIGlmIHRoZSBjb250aW51YXRpb24gc3RhdGVtZW50IHNob3VsZCBiZSB0b2xlcmF0ZWQKLy8gICAgIGNzcyAgICAgICAgdHJ1ZSwgaWYgQ1NTIHdvcmthcm91bmRzIHNob3VsZCBiZSB0b2xlcmF0ZWQKLy8gICAgIGRlYnVnICAgICAgdHJ1ZSwgaWYgZGVidWdnZXIgc3RhdGVtZW50cyBzaG91bGQgYmUgYWxsb3dlZAovLyAgICAgZGV2ZWwgICAgICB0cnVlLCBpZiBsb2dnaW5nIHNob3VsZCBiZSBhbGxvd2VkIChjb25zb2xlLCBhbGVydCwgZXRjLikKLy8gICAgIGVxZXEgICAgICAgdHJ1ZSwgaWYgPT0gc2hvdWxkIGJlIGFsbG93ZWQKLy8gICAgIGVzNSAgICAgICAgdHJ1ZSwgaWYgRVM1IHN5bnRheCBzaG91bGQgYmUgYWxsb3dlZAovLyAgICAgZXZpbCAgICAgICB0cnVlLCBpZiBldmFsIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBmb3JpbiAgICAgIHRydWUsIGlmIGZvciBpbiBzdGF0ZW1lbnRzIG5lZWQgbm90IGZpbHRlcgovLyAgICAgZnJhZ21lbnQgICB0cnVlLCBpZiBIVE1MIGZyYWdtZW50cyBzaG91bGQgYmUgYWxsb3dlZAovLyAgICAgaW5kZW50ICAgICB0aGUgaW5kZW50YXRpb24gZmFjdG9yCi8vICAgICBtYXhlcnIgICAgIHRoZSBtYXhpbXVtIG51bWJlciBvZiBlcnJvcnMgdG8gYWxsb3cKLy8gICAgIG1heGxlbiAgICAgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGEgc291cmNlIGxpbmUKLy8gICAgIG5ld2NhcCAgICAgdHJ1ZSwgaWYgY29uc3RydWN0b3IgbmFtZXMgY2FwaXRhbGl6YXRpb24gaXMgaWdub3JlZAovLyAgICAgbm9kZSAgICAgICB0cnVlLCBpZiBOb2RlLmpzIGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIG5vbWVuICAgICAgdHJ1ZSwgaWYgbmFtZXMgbWF5IGhhdmUgZGFuZ2xpbmcgXwovLyAgICAgb24gICAgICAgICB0cnVlLCBpZiBIVE1MIGV2ZW50IGhhbmRsZXJzIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBwYXNzZmFpbCAgIHRydWUsIGlmIHRoZSBzY2FuIHNob3VsZCBzdG9wIG9uIGZpcnN0IGVycm9yCi8vICAgICBwbHVzcGx1cyAgIHRydWUsIGlmIGluY3JlbWVudC9kZWNyZW1lbnQgc2hvdWxkIGJlIGFsbG93ZWQKLy8gICAgIHByb3BlcnRpZXMgdHJ1ZSwgaWYgYWxsIHByb3BlcnR5IG5hbWVzIG11c3QgYmUgZGVjbGFyZWQgd2l0aCAvKnByb3BlcnRpZXMqLwovLyAgICAgcmVnZXhwICAgICB0cnVlLCBpZiB0aGUgLiBzaG91bGQgYmUgYWxsb3dlZCBpbiByZWdleHAgbGl0ZXJhbHMKLy8gICAgIHJoaW5vICAgICAgdHJ1ZSwgaWYgdGhlIFJoaW5vIGVudmlyb25tZW50IGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIHVuZGVmICAgICAgdHJ1ZSwgaWYgdmFyaWFibGVzIGNhbiBiZSBkZWNsYXJlZCBvdXQgb2Ygb3JkZXIKLy8gICAgIHVucGFyYW0gICAgdHJ1ZSwgaWYgdW51c2VkIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHRvbGVyYXRlZAovLyAgICAgc2FmZSAgICAgICB0cnVlLCBpZiB1c2Ugb2Ygc29tZSBicm93c2VyIGZlYXR1cmVzIHNob3VsZCBiZSByZXN0cmljdGVkCi8vICAgICBzbG9wcHkgICAgIHRydWUsIGlmIHRoZSAndXNlIHN0cmljdCc7IHByYWdtYSBpcyBvcHRpb25hbAovLyAgICAgc3ViICAgICAgICB0cnVlLCBpZiBhbGwgZm9ybXMgb2Ygc3Vic2NyaXB0IG5vdGF0aW9uIGFyZSB0b2xlcmF0ZWQKLy8gICAgIHZhcnMgICAgICAgdHJ1ZSwgaWYgbXVsdGlwbGUgdmFyIHN0YXRlbWVudHMgcGVyIGZ1bmN0aW9uIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICB3aGl0ZSAgICAgIHRydWUsIGlmIHNsb3BweSB3aGl0ZXNwYWNlIGlzIHRvbGVyYXRlZAovLyAgICAgd2lkZ2V0ICAgICB0cnVlICBpZiB0aGUgWWFob28gV2lkZ2V0cyBnbG9iYWxzIHNob3VsZCBiZSBwcmVkZWZpbmVkCi8vICAgICB3aW5kb3dzICAgIHRydWUsIGlmIE1TIFdpbmRvd3Mtc3BlY2lmaWMgZ2xvYmFscyBzaG91bGQgYmUgcHJlZGVmaW5lZAoKLy8gRm9yIGV4YW1wbGU6CgovKmpzbGludAogICAgZXZpbDogdHJ1ZSwgbm9tZW46IHRydWUsIHJlZ2V4cDogdHJ1ZSwgY29tbW9uanM6IHRydWUKKi8KCi8vIFRoZSBwcm9wZXJ0aWVzIGRpcmVjdGl2ZSBkZWNsYXJlcyBhbiBleGNsdXNpdmUgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcy4KLy8gQW55IHByb3BlcnRpZXMgbmFtZWQgaW4gdGhlIHByb2dyYW0gdGhhdCBhcmUgbm90IGluIHRoZSBsaXN0IHdpbGwKLy8gcHJvZHVjZSBhIHdhcm5pbmcuCgovLyBGb3IgZXhhbXBsZToKCi8qcHJvcGVydGllcwogICAgJ1xiJzogc3RyaW5nLCAnXHQnOiBzdHJpbmcsICdcbic6IHN0cmluZywgJ1xmJzogc3RyaW5nLCAnXHInOiBzdHJpbmcsCiAgICAnIT0nOiBib29sZWFuLCAnIT09JzogYm9vbGVhbiwgJyInOiBzdHJpbmcsICclJzogYm9vbGVhbiwgJ1wnJzogc3RyaW5nLAogICAgJyhiZWdpbiknLCAnKGJyZWFrYWdlKSc6IG51bWJlciwgJyhjb21wbGV4aXR5KScsICcoY29uZnVzaW9uKSc6IGJvb2xlYW4sCiAgICAnKGNvbnRleHQpJzogb2JqZWN0LCAnKGVycm9yKScsICcoaWRlbnRpZmllciknLCAnKGxpbmUpJzogbnVtYmVyLAogICAgJyhsb29wYWdlKSc6IG51bWJlciwgJyhuYW1lKScsICcob2xkX3Byb3BlcnR5X3R5cGUpJywgJyhwYXJhbXMpJywKICAgICcoc2NvcGUpJzogb2JqZWN0LCAnKHRva2VuKScsICcodmFycyknLCAnKHZlcmIpJywgJyonOiBib29sZWFuLAogICAgJysnOiBib29sZWFuLCAnLSc6IGJvb2xlYW4sICcvJzogKiwgJzwnOiBib29sZWFuLCAnPD0nOiBib29sZWFuLAogICAgJz09JzogYm9vbGVhbiwgJz09PSc6IGJvb2xlYW4sICc+JzogYm9vbGVhbiwgJz49JzogYm9vbGVhbiwKICAgIEFEU0FGRTogYm9vbGVhbiwgQXJyYXksIERhdGUsIEU6IHN0cmluZywgRnVuY3Rpb24sIExOMTA6IHN0cmluZywKICAgIExOMjogc3RyaW5nLCBMT0cxMEU6IHN0cmluZywgTE9HMkU6IHN0cmluZywgTUFYX1ZBTFVFOiBzdHJpbmcsCiAgICBNSU5fVkFMVUU6IHN0cmluZywgTkVHQVRJVkVfSU5GSU5JVFk6IHN0cmluZywgT2JqZWN0LCBQSTogc3RyaW5nLAogICAgUE9TSVRJVkVfSU5GSU5JVFk6IHN0cmluZywgU1FSVDFfMjogc3RyaW5nLCBTUVJUMjogc3RyaW5nLCAnXFwnOiBzdHJpbmcsCiAgICBhOiBvYmplY3QsIGFfbGFiZWw6IHN0cmluZywgYV9ub3RfYWxsb3dlZDogc3RyaW5nLCBhX25vdF9kZWZpbmVkOiBzdHJpbmcsCiAgICBhX3Njb3BlOiBzdHJpbmcsIGFiYnI6IG9iamVjdCwgYWNyb255bTogb2JqZWN0LCBhZGRyZXNzOiBvYmplY3QsIGFkc2FmZSwKICAgIGFkc2FmZV9hOiBzdHJpbmcsIGFkc2FmZV9hdXRvY29tcGxldGU6IHN0cmluZywgYWRzYWZlX2JhZF9pZDogc3RyaW5nLAogICAgYWRzYWZlX2Rpdjogc3RyaW5nLCBhZHNhZmVfZnJhZ21lbnQ6IHN0cmluZywgYWRzYWZlX2dvOiBzdHJpbmcsCiAgICBhZHNhZmVfaHRtbDogc3RyaW5nLCBhZHNhZmVfaWQ6IHN0cmluZywgYWRzYWZlX2lkX2dvOiBzdHJpbmcsCiAgICBhZHNhZmVfbGliOiBzdHJpbmcsIGFkc2FmZV9saWJfc2Vjb25kOiBzdHJpbmcsIGFkc2FmZV9taXNzaW5nX2lkOiBzdHJpbmcsCiAgICBhZHNhZmVfbmFtZV9hOiBzdHJpbmcsIGFkc2FmZV9wbGFjZW1lbnQ6IHN0cmluZywgYWRzYWZlX3ByZWZpeF9hOiBzdHJpbmcsCiAgICBhZHNhZmVfc2NyaXB0OiBzdHJpbmcsIGFkc2FmZV9zb3VyY2U6IHN0cmluZywgYWRzYWZlX3N1YnNjcmlwdF9hOiBzdHJpbmcsCiAgICBhZHNhZmVfdGFnOiBzdHJpbmcsIGFsbDogYm9vbGVhbiwgYWxyZWFkeV9kZWZpbmVkOiBzdHJpbmcsIGFuZDogc3RyaW5nLAogICAgYXBwbGV0OiBvYmplY3QsIGFwcGx5OiBzdHJpbmcsIGFwcHJvdmVkOiBhcnJheSwgYXJlYTogb2JqZWN0LAogICAgYXJpdHk6IHN0cmluZywgYXJ0aWNsZTogb2JqZWN0LCBhc2lkZTogb2JqZWN0LCBhc3NpZ246IGJvb2xlYW4sCiAgICBhc3NpZ25fZXhjZXB0aW9uOiBzdHJpbmcsIGFzc2lnbm1lbnRfZnVuY3Rpb25fZXhwcmVzc2lvbjogc3RyaW5nLAogICAgYXQ6IG51bWJlciwgYXR0cmlidXRlX2Nhc2VfYTogc3RyaW5nLCBhdWRpbzogb2JqZWN0LCBhdXRvY29tcGxldGU6IHN0cmluZywKICAgIGF2b2lkX2E6IHN0cmluZywgYjogKiwgYmFja2dyb3VuZDogYXJyYXksICdiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnOiBhcnJheSwKICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYXJyYXksICdiYWNrZ3JvdW5kLWltYWdlJzogYXJyYXksCiAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IGFycmF5LCAnYmFja2dyb3VuZC1yZXBlYXQnOiBhcnJheSwKICAgIGJhZF9hc3NpZ25tZW50OiBzdHJpbmcsIGJhZF9jb2xvcl9hOiBzdHJpbmcsIGJhZF9jb25zdHJ1Y3Rvcjogc3RyaW5nLAogICAgYmFkX2VudGl0eTogc3RyaW5nLCBiYWRfaHRtbDogc3RyaW5nLCBiYWRfaWRfYTogc3RyaW5nLCBiYWRfaW5fYTogc3RyaW5nLAogICAgYmFkX2ludm9jYXRpb246IHN0cmluZywgYmFkX25hbWVfYTogc3RyaW5nLCBiYWRfbmV3OiBzdHJpbmcsCiAgICBiYWRfbnVtYmVyOiBzdHJpbmcsIGJhZF9vcGVyYW5kOiBzdHJpbmcsIGJhZF9zdHlsZTogc3RyaW5nLAogICAgYmFkX3R5cGU6IHN0cmluZywgYmFkX3VybF9hOiBzdHJpbmcsIGJhZF93cmFwOiBzdHJpbmcsIGJhc2U6IG9iamVjdCwKICAgIGJkbzogb2JqZWN0LCBiaWc6IG9iamVjdCwgYmluZDogc3RyaW5nLCBiaXR3aXNlOiBib29sZWFuLCBibG9jazogYXJyYXksCiAgICBibG9ja3F1b3RlOiBvYmplY3QsIGJvZHk6IG9iamVjdCwgYm9yZGVyOiBhcnJheSwgJ2JvcmRlci1ib3R0b20nOiBhcnJheSwKICAgICdib3JkZXItYm90dG9tLWNvbG9yJywgJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnLAogICAgJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJywgJ2JvcmRlci1ib3R0b20tc3R5bGUnOiBhcnJheSwKICAgICdib3JkZXItYm90dG9tLXdpZHRoJywgJ2JvcmRlci1jb2xsYXBzZSc6IGFycmF5LCAnYm9yZGVyLWNvbG9yJzogYXJyYXksCiAgICAnYm9yZGVyLWxlZnQnOiBhcnJheSwgJ2JvcmRlci1sZWZ0LWNvbG9yJywgJ2JvcmRlci1sZWZ0LXN0eWxlJzogYXJyYXksCiAgICAnYm9yZGVyLWxlZnQtd2lkdGgnLCAnYm9yZGVyLXJhZGl1cycsICdib3JkZXItcmlnaHQnOiBhcnJheSwKICAgICdib3JkZXItcmlnaHQtY29sb3InLCAnYm9yZGVyLXJpZ2h0LXN0eWxlJzogYXJyYXksICdib3JkZXItcmlnaHQtd2lkdGgnLAogICAgJ2JvcmRlci1zcGFjaW5nJzogYXJyYXksICdib3JkZXItc3R5bGUnOiBhcnJheSwgJ2JvcmRlci10b3AnOiBhcnJheSwKICAgICdib3JkZXItdG9wLWNvbG9yJywgJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnLCAnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnLAogICAgJ2JvcmRlci10b3Atc3R5bGUnOiBhcnJheSwgJ2JvcmRlci10b3Atd2lkdGgnLCAnYm9yZGVyLXdpZHRoJzogYXJyYXksCiAgICBib3R0b206IGFycmF5LCBicjogb2JqZWN0LCBicmFpbGxlOiBib29sZWFuLCBicm93c2VyOiBib29sZWFuLAogICAgYnV0dG9uOiBvYmplY3QsIGMsIGNhbGw6IHN0cmluZywgY2FudmFzOiBvYmplY3QsIGNhcCwgY2FwdGlvbjogb2JqZWN0LAogICAgJ2NhcHRpb24tc2lkZSc6IGFycmF5LCBjZWlsOiBzdHJpbmcsIGNlbnRlcjogb2JqZWN0LCBjaGFyQXQ6ICosCiAgICBjaGFyQ29kZUF0OiAqLCBjaGFyYWN0ZXIsIGNpdGU6IG9iamVjdCwgY2xlYXI6IGFycmF5LCBjbGlwOiBhcnJheSwgY2xvc3VyZSwKICAgIGNtOiBib29sZWFuLCBjb2RlOiBvYmplY3QsIGNvbDogb2JqZWN0LCBjb2xncm91cDogb2JqZWN0LCBjb2xvciwKICAgIGNvbWJpbmVfdmFyOiBzdHJpbmcsIGNvbW1hbmQ6IG9iamVjdCwgY29tbW9uanM6IGJvb2xlYW4sIGNvbmNhdDogc3RyaW5nLAogICAgY29uZGl0aW9uYWxfYXNzaWdubWVudDogc3RyaW5nLCBjb25mdXNpbmdfYTogc3RyaW5nLAogICAgY29uZnVzaW5nX3JlZ2V4cDogc3RyaW5nLCBjb25mdXNpb246IGJvb2xlYW4sIGNvbnN0cnVjdG9yOiBzdHJpbmcsCiAgICBjb25zdHJ1Y3Rvcl9uYW1lX2E6IHN0cmluZywgY29udGVudDogYXJyYXksIGNvbnRpbnVlLCBjb250cm9sX2E6IHN0cmluZywKICAgICdjb3VudGVyLWluY3JlbWVudCc6IGFycmF5LCAnY291bnRlci1yZXNldCc6IGFycmF5LCBjcmVhdGU6ICosIGNzczogc3RyaW5nLAogICAgY3Vyc29yOiBhcnJheSwgZCwgZGFuZ2Vyb3VzX2NvbW1lbnQ6IHN0cmluZywgZGFuZ2xpbmdfYTogc3RyaW5nLAogICAgZGF0YTogZnVuY3Rpb24gb2JqZWN0LCBkYXRhbGlzdDogb2JqZWN0LCBkZDogb2JqZWN0LCBkZWJ1ZywKICAgIGRlZmluZVByb3BlcnRpZXM6IHN0cmluZywgZGVmaW5lUHJvcGVydHk6IHN0cmluZywgZGVsOiBvYmplY3QsCiAgICBkZWxldGVkOiBzdHJpbmcsIGRldGFpbHM6IG9iamVjdCwgZGV2ZWw6IGJvb2xlYW4sIGRmbjogb2JqZWN0LAogICAgZGlhbG9nOiBvYmplY3QsIGRpcjogb2JqZWN0LCBkaXJlY3Rpb246IGFycmF5LCBkaXNwbGF5OiBhcnJheSwKICAgIGRpc3J1cHQ6IGJvb2xlYW4sIGRpdjogb2JqZWN0LCBkbDogb2JqZWN0LCBkdDogb2JqZWN0LCBkdXBsaWNhdGVfYTogc3RyaW5nLAogICAgZWRnZTogc3RyaW5nLCBlZGl0aW9uOiBzdHJpbmcsIGVsc2UsIGVtOiAqLCBlbWJlZDogb2JqZWN0LAogICAgZW1ib3NzZWQ6IGJvb2xlYW4sIGVtcHR5OiBib29sZWFuLCAnZW1wdHktY2VsbHMnOiBhcnJheSwKICAgIGVtcHR5X2Jsb2NrOiBzdHJpbmcsIGVtcHR5X2Nhc2U6IHN0cmluZywgZW1wdHlfY2xhc3M6IHN0cmluZywKICAgIGVudGl0eWlmeTogZnVuY3Rpb24sIGVxZXEsIGVycm9yczogYXJyYXksIGVzNTogc3RyaW5nLCBldmFsLCBldmVyeTogc3RyaW5nLAogICAgZXZpZGVuY2UsIGV2aWw6IHN0cmluZywgZXg6IGJvb2xlYW4sIGV4Y2VwdGlvbiwgZXhlYzogKiwKICAgIGV4cGVjdGVkX2E6IHN0cmluZywgZXhwZWN0ZWRfYV9hdF9iX2M6IHN0cmluZywgZXhwZWN0ZWRfYV9iOiBzdHJpbmcsCiAgICBleHBlY3RlZF9hX2JfZnJvbV9jX2Q6IHN0cmluZywgZXhwZWN0ZWRfYXRfYTogc3RyaW5nLAogICAgZXhwZWN0ZWRfYXR0cmlidXRlX2E6IHN0cmluZywgZXhwZWN0ZWRfYXR0cmlidXRlX3ZhbHVlX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX2NsYXNzX2E6IHN0cmluZywgZXhwZWN0ZWRfZnJhY3Rpb25fYTogc3RyaW5nLAogICAgZXhwZWN0ZWRfaWRfYTogc3RyaW5nLCBleHBlY3RlZF9pZGVudGlmaWVyX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX2lkZW50aWZpZXJfYV9yZXNlcnZlZDogc3RyaW5nLCBleHBlY3RlZF9sYW5nX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX2xpbmVhcl9hOiBzdHJpbmcsIGV4cGVjdGVkX21lZGlhX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX25hbWVfYTogc3RyaW5nLCBleHBlY3RlZF9ub25zdGFuZGFyZF9zdHlsZV9hdHRyaWJ1dGU6IHN0cmluZywKICAgIGV4cGVjdGVkX251bWJlcl9hOiBzdHJpbmcsIGV4cGVjdGVkX29wZXJhdG9yX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX3BlcmNlbnRfYTogc3RyaW5nLCBleHBlY3RlZF9wb3NpdGl2ZV9hOiBzdHJpbmcsCiAgICBleHBlY3RlZF9wc2V1ZG9fYTogc3RyaW5nLCBleHBlY3RlZF9zZWxlY3Rvcl9hOiBzdHJpbmcsCiAgICBleHBlY3RlZF9zbWFsbF9hOiBzdHJpbmcsIGV4cGVjdGVkX3NwYWNlX2FfYjogc3RyaW5nLAogICAgZXhwZWN0ZWRfc3RyaW5nX2E6IHN0cmluZywgZXhwZWN0ZWRfc3R5bGVfYXR0cmlidXRlOiBzdHJpbmcsCiAgICBleHBlY3RlZF9zdHlsZV9wYXR0ZXJuOiBzdHJpbmcsIGV4cGVjdGVkX3RhZ25hbWVfYTogc3RyaW5nLAogICAgZXhwZWN0ZWRfdHlwZV9hOiBzdHJpbmcsIGY6IHN0cmluZywgZmllbGRzZXQ6IG9iamVjdCwgZmlndXJlOiBvYmplY3QsCiAgICBmaWx0ZXI6ICosIGZpcnN0OiAqLCBmbG9hdDogYXJyYXksIGZsb29yOiAqLCBmb250OiAqLCAnZm9udC1mYW1pbHknLAogICAgJ2ZvbnQtc2l6ZSc6IGFycmF5LCAnZm9udC1zaXplLWFkanVzdCc6IGFycmF5LCAnZm9udC1zdHJldGNoJzogYXJyYXksCiAgICAnZm9udC1zdHlsZSc6IGFycmF5LCAnZm9udC12YXJpYW50JzogYXJyYXksICdmb250LXdlaWdodCc6IGFycmF5LAogICAgZm9vdGVyOiBvYmplY3QsIGZvciwgZm9yRWFjaDogKiwgZm9yX2lmOiBzdHJpbmcsIGZvcmluLCBmb3JtOiBvYmplY3QsCiAgICBmcmFnbWVudCwgZnJhbWU6IG9iamVjdCwgZnJhbWVzZXQ6IG9iamVjdCwgZnJlZXplOiBzdHJpbmcsIGZyb206IG51bWJlciwKICAgIGZyb21DaGFyQ29kZTogZnVuY3Rpb24sIGZ1ZDogZnVuY3Rpb24sIGZ1bmN0OiBvYmplY3QsIGZ1bmN0aW9uLAogICAgZnVuY3Rpb25fYmxvY2s6IHN0cmluZywgZnVuY3Rpb25fZXZhbDogc3RyaW5nLCBmdW5jdGlvbl9sb29wOiBzdHJpbmcsCiAgICBmdW5jdGlvbl9zdGF0ZW1lbnQ6IHN0cmluZywgZnVuY3Rpb25fc3RyaWN0OiBzdHJpbmcsIGZ1bmN0aW9uczogYXJyYXksCiAgICBnZXREYXRlOiBzdHJpbmcsIGdldERheTogc3RyaW5nLCBnZXRGdWxsWWVhcjogc3RyaW5nLCBnZXRIb3Vyczogc3RyaW5nLAogICAgZ2V0TWlsbGlzZWNvbmRzOiBzdHJpbmcsIGdldE1pbnV0ZXM6IHN0cmluZywgZ2V0TW9udGg6IHN0cmluZywKICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogc3RyaW5nLCBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBzdHJpbmcsCiAgICBnZXRQcm90b3R5cGVPZjogc3RyaW5nLCBnZXRTZWNvbmRzOiBzdHJpbmcsIGdldFRpbWU6IHN0cmluZywKICAgIGdldFRpbWV6b25lT2Zmc2V0OiBzdHJpbmcsIGdldFVUQ0RhdGU6IHN0cmluZywgZ2V0VVRDRGF5OiBzdHJpbmcsCiAgICBnZXRVVENGdWxsWWVhcjogc3RyaW5nLCBnZXRVVENIb3Vyczogc3RyaW5nLCBnZXRVVENNaWxsaXNlY29uZHM6IHN0cmluZywKICAgIGdldFVUQ01pbnV0ZXM6IHN0cmluZywgZ2V0VVRDTW9udGg6IHN0cmluZywgZ2V0VVRDU2Vjb25kczogc3RyaW5nLAogICAgZ2V0WWVhcjogc3RyaW5nLCBnbG9iYWwsIGdsb2JhbHMsIGgxOiBvYmplY3QsIGgyOiBvYmplY3QsIGgzOiBvYmplY3QsCiAgICBoNDogb2JqZWN0LCBoNTogb2JqZWN0LCBoNjogb2JqZWN0LCBoYW5kaGVsZDogYm9vbGVhbiwgaGFzT3duUHJvcGVydHk6ICosCiAgICBoZWFkOiBvYmplY3QsIGhlYWRlcjogb2JqZWN0LCBoZWlnaHQ6IGFycmF5LCBoZ3JvdXA6IG9iamVjdCwgaHI6IG9iamVjdCwKICAgICdodGE6YXBwbGljYXRpb24nOiBvYmplY3QsIGh0bWw6ICosIGh0bWxfY29uZnVzaW9uX2E6IHN0cmluZywKICAgIGh0bWxfaGFuZGxlcnM6IHN0cmluZywgaTogb2JqZWN0LCBpZDogc3RyaW5nLCBpZGVudGlmaWVyOiBib29sZWFuLAogICAgaWRlbnRpZmllcl9mdW5jdGlvbjogc3RyaW5nLCBpZnJhbWU6IG9iamVjdCwgaW1nOiBvYmplY3QsIGltbWVkOiBib29sZWFuLAogICAgaW1wbGllZF9ldmlsOiBzdHJpbmcsIGluLCBpbmRlbnQ6IG51bWJlciwgaW5kZXhPZjogKiwgaW5maXhfaW46IHN0cmluZywKICAgIGluaXQ6IGZ1bmN0aW9uLCBpbnB1dDogb2JqZWN0LCBpbnM6IG9iamVjdCwgaW5zZWN1cmVfYTogc3RyaW5nLAogICAgaXNBbHBoYTogZnVuY3Rpb24sIGlzQXJyYXk6IGZ1bmN0aW9uIGJvb2xlYW4sIGlzRGlnaXQ6IGZ1bmN0aW9uLAogICAgaXNFeHRlbnNpYmxlOiBzdHJpbmcsIGlzRnJvemVuOiBzdHJpbmcsIGlzTmFOOiBzdHJpbmcsCiAgICBpc1Byb3RvdHlwZU9mOiBzdHJpbmcsIGlzU2VhbGVkOiBzdHJpbmcsIGpvaW46ICosIGpzbGludDogZnVuY3Rpb24gYm9vbGVhbiwKICAgIEpTTElOVDogZnVuY3Rpb24gYm9vbGVhbiwKICAgIGpzb246IGJvb2xlYW4sIGtiZDogb2JqZWN0LCBrZXlnZW46IG9iamVjdCwga2V5czogKiwgbGFiZWw6IG9iamVjdCwKICAgIGxhYmVsX2FfYjogc3RyaW5nLCBsYWJlbGVkOiBib29sZWFuLCBsYW5nOiBzdHJpbmcsIGxhc3RJbmRleDogc3RyaW5nLAogICAgbGFzdEluZGV4T2Y6ICosIGxicDogbnVtYmVyLCBsZWFkaW5nX2RlY2ltYWxfYTogc3RyaW5nLCBsZWQ6IGZ1bmN0aW9uLAogICAgbGVmdDogYXJyYXksIGxlZ2VuZDogb2JqZWN0LCBsZW5ndGg6ICosICdsZXR0ZXItc3BhY2luZyc6IGFycmF5LAogICAgbGk6IG9iamVjdCwgbGliOiBib29sZWFuLCBsaW5lOiBudW1iZXIsICdsaW5lLWhlaWdodCc6IGFycmF5LCBsaW5rOiBvYmplY3QsCiAgICAnbGlzdC1zdHlsZSc6IGFycmF5LCAnbGlzdC1zdHlsZS1pbWFnZSc6IGFycmF5LAogICAgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nOiBhcnJheSwgJ2xpc3Qtc3R5bGUtdHlwZSc6IGFycmF5LCBtYXA6ICosCiAgICBtYXJnaW46IGFycmF5LCAnbWFyZ2luLWJvdHRvbScsICdtYXJnaW4tbGVmdCcsICdtYXJnaW4tcmlnaHQnLAogICAgJ21hcmdpbi10b3AnLCBtYXJrOiBvYmplY3QsICdtYXJrZXItb2Zmc2V0JzogYXJyYXksIG1hdGNoOiBmdW5jdGlvbiwKICAgICdtYXgtaGVpZ2h0JzogYXJyYXksICdtYXgtd2lkdGgnOiBhcnJheSwgbWF4ZXJyOiBudW1iZXIsCiAgICBtYXhsZW46IG51bWJlciwgbWVtYmVyOiBvYmplY3QsIG1lbnU6IG9iamVjdCwgbWVzc2FnZSwgbWV0YTogb2JqZWN0LAogICAgbWV0ZXI6IG9iamVjdCwgJ21pbi1oZWlnaHQnOiBmdW5jdGlvbiwgJ21pbi13aWR0aCc6IGZ1bmN0aW9uLAogICAgbWlzc2luZ19hOiBzdHJpbmcsIG1pc3NpbmdfYV9hZnRlcl9iOiBzdHJpbmcsIG1pc3Npbmdfb3B0aW9uOiBzdHJpbmcsCiAgICBtaXNzaW5nX3Byb3BlcnR5OiBzdHJpbmcsIG1pc3Npbmdfc3BhY2VfYV9iOiBzdHJpbmcsIG1pc3NpbmdfdXJsOiBzdHJpbmcsCiAgICBtaXNzaW5nX3VzZV9zdHJpY3Q6IHN0cmluZywgbWl4ZWQ6IHN0cmluZywgbW06IGJvb2xlYW4sIG1vZGU6IHN0cmluZywKICAgIG1vdmVfaW52b2NhdGlvbjogc3RyaW5nLCBtb3ZlX3Zhcjogc3RyaW5nLCBuOiBzdHJpbmcsIG5hbWU6IHN0cmluZywKICAgIG5hbWVfZnVuY3Rpb246IHN0cmluZywgbmF2OiBvYmplY3QsIG5lc3RlZF9jb21tZW50OiBzdHJpbmcsCiAgICBuZXdjYXA6IGJvb2xlYW4sIG5vZGU6IGJvb2xlYW4sIG5vZnJhbWVzOiBvYmplY3QsIG5vbWVuLCBub3NjcmlwdDogb2JqZWN0LAogICAgbm90OiBzdHJpbmcsIG5vdF9hX2NvbnN0cnVjdG9yOiBzdHJpbmcsIG5vdF9hX2RlZmluZWQ6IHN0cmluZywKICAgIG5vdF9hX2Z1bmN0aW9uOiBzdHJpbmcsIG5vdF9hX2xhYmVsOiBzdHJpbmcsIG5vdF9hX3Njb3BlOiBzdHJpbmcsCiAgICBub3RfZ3JlYXRlcjogc3RyaW5nLCBub3c6IHN0cmluZywgbnVkOiBmdW5jdGlvbiwgbnVtYmVyOiBudW1iZXIsCiAgICBvYmplY3Q6IG9iamVjdCwgb2w6IG9iamVjdCwgb24sIG9wYWNpdHksIG9wZW46IGJvb2xlYW4sIG9wdGdyb3VwOiBvYmplY3QsCiAgICBvcHRpb246IG9iamVjdCwgb3V0ZXI6IHJlZ2V4cCwgb3V0bGluZTogYXJyYXksICdvdXRsaW5lLWNvbG9yJzogYXJyYXksCiAgICAnb3V0bGluZS1zdHlsZSc6IGFycmF5LCAnb3V0bGluZS13aWR0aCcsIG91dHB1dDogb2JqZWN0LCBvdmVyZmxvdzogYXJyYXksCiAgICAnb3ZlcmZsb3cteCc6IGFycmF5LCAnb3ZlcmZsb3cteSc6IGFycmF5LCBwOiBvYmplY3QsIHBhZGRpbmc6IGFycmF5LAogICAgJ3BhZGRpbmctYm90dG9tJzogZnVuY3Rpb24sICdwYWRkaW5nLWxlZnQnOiBmdW5jdGlvbiwKICAgICdwYWRkaW5nLXJpZ2h0JzogZnVuY3Rpb24sICdwYWRkaW5nLXRvcCc6IGZ1bmN0aW9uLAogICAgJ3BhZ2UtYnJlYWstYWZ0ZXInOiBhcnJheSwgJ3BhZ2UtYnJlYWstYmVmb3JlJzogYXJyYXksIHBhcmFtOiBvYmplY3QsCiAgICBwYXJhbWV0ZXJfYV9nZXRfYjogc3RyaW5nLCBwYXJhbWV0ZXJfc2V0X2E6IHN0cmluZywgcGFyYW1zOiBhcnJheSwKICAgIHBhcmVuOiBib29sZWFuLCBwYXJlbnQ6IHN0cmluZywgcGFyc2U6IHN0cmluZywgcGFzc2ZhaWwsIHBjOiBib29sZWFuLAogICAgcGx1c3BsdXMsIHBvcDogKiwgcG9zaXRpb246IGFycmF5LCBwb3N0c2NyaXB0OiBib29sZWFuLCBwcmU6IG9iamVjdCwKICAgIHByZWRlZiwgcHJldmVudEV4dGVuc2lvbnM6IHN0cmluZywgcHJpbnQ6IGJvb2xlYW4sIHByb2dyZXNzOiBvYmplY3QsCiAgICBwcm9qZWN0aW9uOiBib29sZWFuLCBwcm9wZXJ0aWVzOiBib29sZWFuLCBwcm9wZXJ0eUlzRW51bWVyYWJsZTogc3RyaW5nLAogICAgcHJvdG90eXBlOiBzdHJpbmcsIHB0OiBib29sZWFuLCBwdXNoOiAqLCBweDogYm9vbGVhbiwgcTogb2JqZWN0LCBxdW90ZSwKICAgIHF1b3RlczogYXJyYXksIHI6IHN0cmluZywgcmFkaXg6IHN0cmluZywgcmFuZ2U6IGZ1bmN0aW9uLCByYXcsCiAgICByZWFkX29ubHk6IHN0cmluZywgcmVhc29uLCByZWRlZmluaXRpb25fYTogc3RyaW5nLCByZWR1Y2U6IHN0cmluZywKICAgIHJlZHVjZVJpZ2h0OiBzdHJpbmcsIHJlZ2V4cCwgcmVwbGFjZTogZnVuY3Rpb24sIHJlcG9ydDogZnVuY3Rpb24sCiAgICByZXNlcnZlZDogYm9vbGVhbiwgcmVzZXJ2ZWRfYTogc3RyaW5nLCByZXZlcnNlOiBzdHJpbmcsIHJoaW5vOiBib29sZWFuLAogICAgcmlnaHQ6IGFycmF5LCBycDogb2JqZWN0LCBydDogb2JqZWN0LCBydWJ5OiBvYmplY3QsIHNhZmU6IGJvb2xlYW4sCiAgICBzYW1wOiBvYmplY3QsIHNjYW5uZWRfYV9iOiBzdHJpbmcsIHNjcmVlbjogYm9vbGVhbiwgc2NyaXB0OiBvYmplY3QsCiAgICBzZWFsOiBzdHJpbmcsIHNlYXJjaDogZnVuY3Rpb24sIHNlY29uZDogKiwgc2VjdGlvbjogb2JqZWN0LCBzZWxlY3Q6IG9iamVjdCwKICAgIHNldERhdGU6IHN0cmluZywgc2V0RGF5OiBzdHJpbmcsIHNldEZ1bGxZZWFyOiBzdHJpbmcsIHNldEhvdXJzOiBzdHJpbmcsCiAgICBzZXRNaWxsaXNlY29uZHM6IHN0cmluZywgc2V0TWludXRlczogc3RyaW5nLCBzZXRNb250aDogc3RyaW5nLAogICAgc2V0U2Vjb25kczogc3RyaW5nLCBzZXRUaW1lOiBzdHJpbmcsIHNldFRpbWV6b25lT2Zmc2V0OiBzdHJpbmcsCiAgICBzZXRVVENEYXRlOiBzdHJpbmcsIHNldFVUQ0RheTogc3RyaW5nLCBzZXRVVENGdWxsWWVhcjogc3RyaW5nLAogICAgc2V0VVRDSG91cnM6IHN0cmluZywgc2V0VVRDTWlsbGlzZWNvbmRzOiBzdHJpbmcsIHNldFVUQ01pbnV0ZXM6IHN0cmluZywKICAgIHNldFVUQ01vbnRoOiBzdHJpbmcsIHNldFVUQ1NlY29uZHM6IHN0cmluZywgc2V0WWVhcjogc3RyaW5nLCBzaGlmdDogKiwKICAgIHNsYXNoX2VxdWFsOiBzdHJpbmcsIHNsaWNlOiBzdHJpbmcsIHNsb3BweSwgc21hbGw6IG9iamVjdCwgc29tZTogc3RyaW5nLAogICAgc29ydDogKiwgc291cmNlOiBvYmplY3QsIHNwYW46IG9iamVjdCwgc3BlZWNoOiBib29sZWFuLCBzcGxpY2U6IHN0cmluZywKICAgIHNwbGl0OiBmdW5jdGlvbiwgc3JjLCBzdGF0ZW1lbnRfYmxvY2s6IHN0cmluZywgc3RvcHBpbmc6IHN0cmluZywKICAgIHN0cmFuZ2VfbG9vcDogc3RyaW5nLCBzdHJpY3Q6IHN0cmluZywgc3RyaW5nOiBzdHJpbmcsIHN0cmluZ2lmeTogc3RyaW5nLAogICAgc3Ryb25nOiBvYmplY3QsIHN0eWxlOiAqLCBzdHlsZXByb3BlcnR5OiByZWdleHAsIHN1Yjogb2JqZWN0LAogICAgc3Vic2NyaXB0OiBzdHJpbmcsIHN1YnN0cjogKiwgc3Vic3RyaW5nOiBzdHJpbmcsIHN1cDogb2JqZWN0LAogICAgc3VwcGxhbnQ6IGZ1bmN0aW9uLCB0OiBzdHJpbmcsIHRhYmxlOiBvYmplY3QsICd0YWJsZS1sYXlvdXQnOiBhcnJheSwKICAgIHRhZ19hX2luX2I6IHN0cmluZywgdGJvZHk6IG9iamVjdCwgdGQ6IG9iamVjdCwgdGVzdDogKiwKICAgICd0ZXh0LWFsaWduJzogYXJyYXksICd0ZXh0LWRlY29yYXRpb24nOiBhcnJheSwgJ3RleHQtaW5kZW50JzogZnVuY3Rpb24sCiAgICAndGV4dC1zaGFkb3cnOiBhcnJheSwgJ3RleHQtdHJhbnNmb3JtJzogYXJyYXksIHRleHRhcmVhOiBvYmplY3QsCiAgICB0Zm9vdDogb2JqZWN0LCB0aDogb2JqZWN0LCB0aGVhZDogb2JqZWN0LCB0aGlyZDogYXJyYXksIHRocnU6IG51bWJlciwKICAgIHRpbWU6IG9iamVjdCwgdGl0bGU6IG9iamVjdCwgdG9EYXRlU3RyaW5nOiBzdHJpbmcsIHRvRXhwb25lbnRpYWw6IHN0cmluZywKICAgIHRvRml4ZWQ6IHN0cmluZywgdG9JU09TdHJpbmc6IHN0cmluZywgdG9KU09OOiBzdHJpbmcsCiAgICB0b0xvY2FsZURhdGVTdHJpbmc6IHN0cmluZywgdG9Mb2NhbGVMb3dlckNhc2U6IHN0cmluZywKICAgIHRvTG9jYWxlU3RyaW5nOiBzdHJpbmcsIHRvTG9jYWxlVGltZVN0cmluZzogc3RyaW5nLAogICAgdG9Mb2NhbGVVcHBlckNhc2U6IHN0cmluZywgdG9Mb3dlckNhc2U6ICosIHRvUHJlY2lzaW9uOiBzdHJpbmcsCiAgICB0b1N0cmluZzogZnVuY3Rpb24sIHRvVGltZVN0cmluZzogc3RyaW5nLCB0b1VUQ1N0cmluZzogc3RyaW5nLAogICAgdG9VcHBlckNhc2U6ICosIHRva2VuOiBmdW5jdGlvbiwgdG9vX2xvbmc6IHN0cmluZywgdG9vX21hbnk6IHN0cmluZywKICAgIHRvcDogYXJyYXksIHRyOiBvYmplY3QsIHRyYWlsaW5nX2RlY2ltYWxfYTogc3RyaW5nLCB0cmVlOiBzdHJpbmcsCiAgICB0cmltOiBzdHJpbmcsIHR0OiBvYmplY3QsIHR0eTogYm9vbGVhbiwgdHY6IGJvb2xlYW4sIHR5cGU6IHN0cmluZywKICAgIHR5cGVfY29uZnVzaW9uX2FfYjogc3RyaW5nLCB1OiBvYmplY3QsIHVsOiBvYmplY3QsIHVuY2xvc2VkOiBzdHJpbmcsCiAgICB1bmNsb3NlZF9jb21tZW50OiBzdHJpbmcsIHVuY2xvc2VkX3JlZ2V4cDogc3RyaW5nLCB1bmRlZjogYm9vbGVhbiwKICAgIHVuZGVmaW5lZCwgdW5lc2NhcGVkX2E6IHN0cmluZywgdW5leHBlY3RlZF9hOiBzdHJpbmcsCiAgICB1bmV4cGVjdGVkX2NoYXJfYV9iOiBzdHJpbmcsIHVuZXhwZWN0ZWRfY29tbWVudDogc3RyaW5nLAogICAgdW5leHBlY3RlZF9wcm9wZXJ0eV9hOiBzdHJpbmcsIHVuZXhwZWN0ZWRfc3BhY2VfYV9iOiBzdHJpbmcsCiAgICAndW5pY29kZS1iaWRpJzogYXJyYXksIHVubmVjZXNzYXJ5X2luaXRpYWxpemU6IHN0cmluZywKICAgIHVubmVjZXNzYXJ5X3VzZTogc3RyaW5nLCB1bnBhcmFtLCB1bnJlYWNoYWJsZV9hX2I6IHN0cmluZywKICAgIHVucmVjb2duaXplZF9zdHlsZV9hdHRyaWJ1dGVfYTogc3RyaW5nLCB1bnJlY29nbml6ZWRfdGFnX2E6IHN0cmluZywKICAgIHVuc2FmZTogc3RyaW5nLCB1bnNoaWZ0OiBzdHJpbmcsIHVudXNlZDogYXJyYXksIHVybDogc3RyaW5nLCB1cmxzOiBhcnJheSwKICAgIHVzZV9hcnJheTogc3RyaW5nLCB1c2VfYnJhY2VzOiBzdHJpbmcsIHVzZV9jaGFyQXQ6IHN0cmluZywKICAgIHVzZV9vYmplY3Q6IHN0cmluZywgdXNlX29yOiBzdHJpbmcsIHVzZV9wYXJhbTogc3RyaW5nLAogICAgdXNlZF9iZWZvcmVfYTogc3RyaW5nLCB2YWx1ZU9mOiBzdHJpbmcsIHZhcjogb2JqZWN0LCB2YXJfYV9ub3Q6IHN0cmluZywKICAgIHZhcnMsICd2ZXJ0aWNhbC1hbGlnbic6IGFycmF5LCB2aWRlbzogb2JqZWN0LCB2aXNpYmlsaXR5OiBhcnJheSwKICAgIHdhcm46IGJvb2xlYW4sIHdhczogb2JqZWN0LCB3ZWlyZF9hc3NpZ25tZW50OiBzdHJpbmcsCiAgICB3ZWlyZF9jb25kaXRpb246IHN0cmluZywgd2VpcmRfbmV3OiBzdHJpbmcsIHdlaXJkX3Byb2dyYW06IHN0cmluZywKICAgIHdlaXJkX3JlbGF0aW9uOiBzdHJpbmcsIHdlaXJkX3Rlcm5hcnk6IHN0cmluZywgd2hpdGU6IGJvb2xlYW4sCiAgICAnd2hpdGUtc3BhY2UnOiBhcnJheSwgd2lkZ2V0OiBib29sZWFuLCB3aWR0aDogYXJyYXksIHdpbmRvd3M6IGJvb2xlYW4sCiAgICAnd29yZC1zcGFjaW5nJzogYXJyYXksICd3b3JkLXdyYXAnOiBhcnJheSwgd3JhcDogYm9vbGVhbiwKICAgIHdyYXBfaW1tZWRpYXRlOiBzdHJpbmcsIHdyYXBfcmVnZXhwOiBzdHJpbmcsIHdyaXRlX2lzX3dyb25nOiBzdHJpbmcsCiAgICB3cml0ZWFibGU6IGJvb2xlYW4sICd6LWluZGV4JzogYXJyYXkKKi8KCi8vIFRoZSBnbG9iYWwgZGlyZWN0aXZlIGlzIHVzZWQgdG8gZGVjbGFyZSBnbG9iYWwgdmFyaWFibGVzIHRoYXQgY2FuCi8vIGJlIGFjY2Vzc2VkIGJ5IHRoZSBwcm9ncmFtLiBJZiBhIGRlY2xhcmF0aW9uIGlzIHRydWUsIHRoZW4gdGhlIHZhcmlhYmxlCi8vIGlzIHdyaXRlYWJsZS4gT3RoZXJ3aXNlLCBpdCBpcyByZWFkLW9ubHkuCgovLyBXZSBidWlsZCB0aGUgYXBwbGljYXRpb24gaW5zaWRlIGEgZnVuY3Rpb24gc28gdGhhdCB3ZSBwcm9kdWNlIG9ubHkgYSBzaW5nbGUKLy8gZ2xvYmFsIHZhcmlhYmxlLiBUaGF0IGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCBpbW1lZGlhdGVseSwgYW5kIGl0cyByZXR1cm4KLy8gdmFsdWUgaXMgdGhlIEpTTElOVCBmdW5jdGlvbiBpdHNlbGYuIFRoYXQgZnVuY3Rpb24gaXMgYWxzbyBhbiBvYmplY3QgdGhhdAovLyBjYW4gY29udGFpbiBkYXRhIGFuZCBvdGhlciBmdW5jdGlvbnMuCgp2YXIgSlNMSU5UID0gKGZ1bmN0aW9uICgpIHsKICAgICd1c2Ugc3RyaWN0JzsKCiAgICBmdW5jdGlvbiBhcnJheV90b19vYmplY3QoYXJyYXksIHZhbHVlKSB7CiAgICAgICAgdmFyIGksIG9iamVjdCA9IHt9OwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICBvYmplY3RbYXJyYXlbaV1dID0gdmFsdWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiBvYmplY3Q7CiAgICB9CgoKICAgIHZhciBhZHNhZmVfaWQsICAgICAgLy8gVGhlIHdpZGdldCdzIEFEc2FmZSBpZC4KICAgICAgICBhZHNhZmVfbWF5LCAgICAgLy8gVGhlIHdpZGdldCBtYXkgbG9hZCBhcHByb3ZlZCBzY3JpcHRzLgogICAgICAgIGFkc2FmZV90b3AsICAgICAvLyBBdCB0aGUgdG9wIG9mIHRoZSB3aWRnZXQgc2NyaXB0LgogICAgICAgIGFkc2FmZV93ZW50LCAgICAvLyBBRFNBRkUuZ28gaGFzIGJlZW4gY2FsbGVkLgogICAgICAgIGFub25uYW1lLCAgICAgICAvLyBUaGUgZ3Vlc3NlZCBuYW1lIGZvciBhbm9ueW1vdXMgZnVuY3Rpb25zLgogICAgICAgIGFwcHJvdmVkLCAgICAgICAvLyBBRHNhZmUgYXBwcm92ZWQgdXJscy4KCi8vIFRoZXNlIGFyZSBvcGVyYXRvcnMgdGhhdCBzaG91bGQgbm90IGJlIHVzZWQgd2l0aCB0aGUgISBvcGVyYXRvci4KCiAgICAgICAgYmFuZyA9IHsKICAgICAgICAgICAgJzwnICA6IHRydWUsCiAgICAgICAgICAgICc8PScgOiB0cnVlLAogICAgICAgICAgICAnPT0nIDogdHJ1ZSwKICAgICAgICAgICAgJz09PSc6IHRydWUsCiAgICAgICAgICAgICchPT0nOiB0cnVlLAogICAgICAgICAgICAnIT0nIDogdHJ1ZSwKICAgICAgICAgICAgJz4nICA6IHRydWUsCiAgICAgICAgICAgICc+PScgOiB0cnVlLAogICAgICAgICAgICAnKycgIDogdHJ1ZSwKICAgICAgICAgICAgJy0nICA6IHRydWUsCiAgICAgICAgICAgICcqJyAgOiB0cnVlLAogICAgICAgICAgICAnLycgIDogdHJ1ZSwKICAgICAgICAgICAgJyUnICA6IHRydWUKICAgICAgICB9LAoKLy8gVGhlc2UgYXJlIHByb3BlcnR5IG5hbWVzIHRoYXQgc2hvdWxkIG5vdCBiZSBwZXJtaXR0ZWQgaW4gdGhlIHNhZmUgc3Vic2V0LgoKICAgICAgICBiYW5uZWQgPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAnYXJndW1lbnRzJywgJ2NhbGxlZScsICdjYWxsZXInLCAnY29uc3RydWN0b3InLCAnZXZhbCcsICdwcm90b3R5cGUnLAogICAgICAgICAgICAnc3RhY2snLCAndW53YXRjaCcsICd2YWx1ZU9mJywgJ3dhdGNoJwogICAgICAgIF0sIHRydWUpLAogICAgICAgIGJlZ2luLCAgICAgICAgICAvLyBUaGUgcm9vdCB0b2tlbgoKLy8gYnJvd3NlciBjb250YWlucyBhIHNldCBvZiBnbG9iYWwgbmFtZXMgdGhhdCBhcmUgY29tbW9ubHkgcHJvdmlkZWQgYnkgYQovLyB3ZWIgYnJvd3NlciBlbnZpcm9ubWVudC4KCiAgICAgICAgYnJvd3NlciA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICdjbGVhckludGVydmFsJywgJ2NsZWFyVGltZW91dCcsICdkb2N1bWVudCcsICdldmVudCcsICdmcmFtZXMnLAogICAgICAgICAgICAnaGlzdG9yeScsICdJbWFnZScsICdsb2NhbFN0b3JhZ2UnLCAnbG9jYXRpb24nLCAnbmFtZScsICduYXZpZ2F0b3InLAogICAgICAgICAgICAnT3B0aW9uJywgJ3BhcmVudCcsICdzY3JlZW4nLCAnc2Vzc2lvblN0b3JhZ2UnLCAnc2V0SW50ZXJ2YWwnLAogICAgICAgICAgICAnc2V0VGltZW91dCcsICdTdG9yYWdlJywgJ3dpbmRvdycsICdYTUxIdHRwUmVxdWVzdCcKICAgICAgICBdLCBmYWxzZSksCgovLyBjb21tb25qcyBjb250YWlucyBhIHNldCBvZiBnbG9iYWwgbmFtZXMgdGhhdCBhcmUgY29tbW9ubHkgcHJvdmlkZWQgYnkgYQovLyBDb21tb25KUyBlbnZpcm9ubWVudC4KCiAgICAgICAgY29tbW9uanMgPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAncmVxdWlyZScsICdtb2R1bGUnLCAnZXhwb3J0cycKICAgICAgICBdLCBmYWxzZSksCgovLyBidW5kbGUgY29udGFpbnMgdGhlIHRleHQgbWVzc2FnZXMuCgogICAgICAgIGJ1bmRsZSA9IHsKICAgICAgICAgICAgYV9sYWJlbDogIid7YX0nIGlzIGEgc3RhdGVtZW50IGxhYmVsLiIsCiAgICAgICAgICAgIGFfbm90X2FsbG93ZWQ6ICIne2F9JyBpcyBub3QgYWxsb3dlZC4iLAogICAgICAgICAgICBhX25vdF9kZWZpbmVkOiAiJ3thfScgaXMgbm90IGRlZmluZWQuIiwKICAgICAgICAgICAgYV9zY29wZTogIid7YX0nIHVzZWQgb3V0IG9mIHNjb3BlLiIsCiAgICAgICAgICAgIGFkc2FmZV9hOiAiQURzYWZlIHZpb2xhdGlvbjogJ3thfScuIiwKICAgICAgICAgICAgYWRzYWZlX2F1dG9jb21wbGV0ZTogIkFEc2FmZSBhdXRvY29tcGxldGUgdmlvbGF0aW9uLiIsCiAgICAgICAgICAgIGFkc2FmZV9iYWRfaWQ6ICJBRFNBRkUgdmlvbGF0aW9uOiBiYWQgaWQuIiwKICAgICAgICAgICAgYWRzYWZlX2RpdjogIkFEc2FmZSB2aW9sYXRpb246IFdyYXAgdGhlIHdpZGdldCBpbiBhIGRpdi4iLAogICAgICAgICAgICBhZHNhZmVfZnJhZ21lbnQ6ICJBRFNBRkU6IFVzZSB0aGUgZnJhZ21lbnQgb3B0aW9uLiIsCiAgICAgICAgICAgIGFkc2FmZV9nbzogIkFEc2FmZSB2aW9sYXRpb246IE1pc2Zvcm1lZCBBRFNBRkUuZ28uIiwKICAgICAgICAgICAgYWRzYWZlX2h0bWw6ICJDdXJyZW50bHksIEFEc2FmZSBkb2VzIG5vdCBvcGVyYXRlIG9uIHdob2xlIEhUTUwgIiArCiAgICAgICAgICAgICAgICAiZG9jdW1lbnRzLiBJdCBvcGVyYXRlcyBvbiA8ZGl2PiBmcmFnbWVudHMgYW5kIC5qcyBmaWxlcy4iLAogICAgICAgICAgICBhZHNhZmVfaWQ6ICJBRHNhZmUgdmlvbGF0aW9uOiBpZCBkb2VzIG5vdCBtYXRjaC4iLAogICAgICAgICAgICBhZHNhZmVfaWRfZ286ICJBRHNhZmUgdmlvbGF0aW9uOiBNaXNzaW5nIEFEU0FGRS5pZCBvciBBRFNBRkUuZ28uIiwKICAgICAgICAgICAgYWRzYWZlX2xpYjogIkFEc2FmZSBsaWIgdmlvbGF0aW9uLiIsCiAgICAgICAgICAgIGFkc2FmZV9saWJfc2Vjb25kOiAiQURzYWZlOiBUaGUgc2Vjb25kIGFyZ3VtZW50IHRvIGxpYiBtdXN0IGJlIGEgZnVuY3Rpb24uIiwKICAgICAgICAgICAgYWRzYWZlX21pc3NpbmdfaWQ6ICJBRFNBRkUgdmlvbGF0aW9uOiBtaXNzaW5nIElEXy4iLAogICAgICAgICAgICBhZHNhZmVfbmFtZV9hOiAiQURzYWZlIG5hbWUgdmlvbGF0aW9uOiAne2F9Jy4iLAogICAgICAgICAgICBhZHNhZmVfcGxhY2VtZW50OiAiQURzYWZlIHNjcmlwdCBwbGFjZW1lbnQgdmlvbGF0aW9uLiIsCiAgICAgICAgICAgIGFkc2FmZV9wcmVmaXhfYTogIkFEc2FmZSB2aW9sYXRpb246IEFuIGlkIG11c3QgaGF2ZSBhICd7YX0nIHByZWZpeCIsCiAgICAgICAgICAgIGFkc2FmZV9zY3JpcHQ6ICJBRHNhZmUgc2NyaXB0IHZpb2xhdGlvbi4iLAogICAgICAgICAgICBhZHNhZmVfc291cmNlOiAiQURzYWZlIHVuYXBwcm92ZWQgc2NyaXB0IHNvdXJjZS4iLAogICAgICAgICAgICBhZHNhZmVfc3Vic2NyaXB0X2E6ICJBRHNhZmUgc3Vic2NyaXB0ICd7YX0nLiIsCiAgICAgICAgICAgIGFkc2FmZV90YWc6ICJBRHNhZmUgdmlvbGF0aW9uOiBEaXNhbGxvd2VkIHRhZyAne2F9Jy4iLAogICAgICAgICAgICBhbHJlYWR5X2RlZmluZWQ6ICIne2F9JyBpcyBhbHJlYWR5IGRlZmluZWQuIiwKICAgICAgICAgICAgYW5kOiAiVGhlICcmJicgc3ViZXhwcmVzc2lvbiBzaG91bGQgYmUgd3JhcHBlZCBpbiBwYXJlbnMuIiwKICAgICAgICAgICAgYXNzaWduX2V4Y2VwdGlvbjogIkRvIG5vdCBhc3NpZ24gdG8gdGhlIGV4Y2VwdGlvbiBwYXJhbWV0ZXIuIiwKICAgICAgICAgICAgYXNzaWdubWVudF9mdW5jdGlvbl9leHByZXNzaW9uOiAiRXhwZWN0ZWQgYW4gYXNzaWdubWVudCBvciAiICsKICAgICAgICAgICAgICAgICJmdW5jdGlvbiBjYWxsIGFuZCBpbnN0ZWFkIHNhdyBhbiBleHByZXNzaW9uLiIsCiAgICAgICAgICAgIGF0dHJpYnV0ZV9jYXNlX2E6ICJBdHRyaWJ1dGUgJ3thfScgbm90IGFsbCBsb3dlciBjYXNlLiIsCiAgICAgICAgICAgIGF2b2lkX2E6ICJBdm9pZCAne2F9Jy4iLAogICAgICAgICAgICBiYWRfYXNzaWdubWVudDogIkJhZCBhc3NpZ25tZW50LiIsCiAgICAgICAgICAgIGJhZF9jb2xvcl9hOiAiQmFkIGhleCBjb2xvciAne2F9Jy4iLAogICAgICAgICAgICBiYWRfY29uc3RydWN0b3I6ICJCYWQgY29uc3RydWN0b3IuIiwKICAgICAgICAgICAgYmFkX2VudGl0eTogIkJhZCBlbnRpdHkuIiwKICAgICAgICAgICAgYmFkX2h0bWw6ICJCYWQgSFRNTCBzdHJpbmciLAogICAgICAgICAgICBiYWRfaWRfYTogIkJhZCBpZDogJ3thfScuIiwKICAgICAgICAgICAgYmFkX2luX2E6ICJCYWQgZm9yIGluIHZhcmlhYmxlICd7YX0nLiIsCiAgICAgICAgICAgIGJhZF9pbnZvY2F0aW9uOiAiQmFkIGludm9jYXRpb24uIiwKICAgICAgICAgICAgYmFkX25hbWVfYTogIkJhZCBuYW1lOiAne2F9Jy4iLAogICAgICAgICAgICBiYWRfbmV3OiAiRG8gbm90IHVzZSAnbmV3JyBmb3Igc2lkZSBlZmZlY3RzLiIsCiAgICAgICAgICAgIGJhZF9udW1iZXI6ICJCYWQgbnVtYmVyICd7YX0nLiIsCiAgICAgICAgICAgIGJhZF9vcGVyYW5kOiAiQmFkIG9wZXJhbmQuIiwKICAgICAgICAgICAgYmFkX3N0eWxlOiAiQmFkIHN0eWxlLiIsCiAgICAgICAgICAgIGJhZF90eXBlOiAiQmFkIHR5cGUuIiwKICAgICAgICAgICAgYmFkX3VybF9hOiAiQmFkIHVybCAne2F9Jy4iLAogICAgICAgICAgICBiYWRfd3JhcDogIkRvIG5vdCB3cmFwIGZ1bmN0aW9uIGxpdGVyYWxzIGluIHBhcmVucyB1bmxlc3MgdGhleSAiICsKICAgICAgICAgICAgICAgICJhcmUgdG8gYmUgaW1tZWRpYXRlbHkgaW52b2tlZC4iLAogICAgICAgICAgICBjb21iaW5lX3ZhcjogIkNvbWJpbmUgdGhpcyB3aXRoIHRoZSBwcmV2aW91cyAndmFyJyBzdGF0ZW1lbnQuIiwKICAgICAgICAgICAgY29uZGl0aW9uYWxfYXNzaWdubWVudDogIkV4cGVjdGVkIGEgY29uZGl0aW9uYWwgZXhwcmVzc2lvbiBhbmQgIiArCiAgICAgICAgICAgICAgICAiaW5zdGVhZCBzYXcgYW4gYXNzaWdubWVudC4iLAogICAgICAgICAgICBjb25mdXNpbmdfYTogIkNvbmZ1c2luZyB1c2Ugb2YgJ3thfScuIiwKICAgICAgICAgICAgY29uZnVzaW5nX3JlZ2V4cDogIkNvbmZ1c2luZyByZWd1bGFyIGV4cHJlc3Npb24uIiwKICAgICAgICAgICAgY29uc3RydWN0b3JfbmFtZV9hOiAiQSBjb25zdHJ1Y3RvciBuYW1lICd7YX0nIHNob3VsZCBzdGFydCB3aXRoICIgKwogICAgICAgICAgICAgICAgImFuIHVwcGVyY2FzZSBsZXR0ZXIuIiwKICAgICAgICAgICAgY29udHJvbF9hOiAiVW5leHBlY3RlZCBjb250cm9sIGNoYXJhY3RlciAne2F9Jy4iLAogICAgICAgICAgICBjc3M6ICJBIGNzcyBmaWxlIHNob3VsZCBiZWdpbiB3aXRoIEBjaGFyc2V0ICdVVEYtOCc7IiwKICAgICAgICAgICAgZGFuZ2xpbmdfYTogIlVuZXhwZWN0ZWQgZGFuZ2xpbmcgJ18nIGluICd7YX0nLiIsCiAgICAgICAgICAgIGRhbmdlcm91c19jb21tZW50OiAiRGFuZ2Vyb3VzIGNvbW1lbnQuIiwKICAgICAgICAgICAgZGVsZXRlZDogIk9ubHkgcHJvcGVydGllcyBzaG91bGQgYmUgZGVsZXRlZC4iLAogICAgICAgICAgICBkdXBsaWNhdGVfYTogIkR1cGxpY2F0ZSAne2F9Jy4iLAogICAgICAgICAgICBlbXB0eV9ibG9jazogIkVtcHR5IGJsb2NrLiIsCiAgICAgICAgICAgIGVtcHR5X2Nhc2U6ICJFbXB0eSBjYXNlLiIsCiAgICAgICAgICAgIGVtcHR5X2NsYXNzOiAiRW1wdHkgY2xhc3MuIiwKICAgICAgICAgICAgZXM1OiAiVGhpcyBpcyBhbiBFUzUgZmVhdHVyZS4iLAogICAgICAgICAgICBldmlsOiAiZXZhbCBpcyBldmlsLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2E6ICJFeHBlY3RlZCAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9hX2I6ICJFeHBlY3RlZCAne2F9JyBhbmQgaW5zdGVhZCBzYXcgJ3tifScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfYV9iX2Zyb21fY19kOiAiRXhwZWN0ZWQgJ3thfScgdG8gbWF0Y2ggJ3tifScgZnJvbSBsaW5lICIgKwogICAgICAgICAgICAgICAgIntjfSBhbmQgaW5zdGVhZCBzYXcgJ3tkfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfYXRfYTogIkV4cGVjdGVkIGFuIGF0LXJ1bGUsIGFuZCBpbnN0ZWFkIHNhdyBAe2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2FfYXRfYl9jOiAiRXhwZWN0ZWQgJ3thfScgYXQgY29sdW1uIHtifSwgbm90IGNvbHVtbiB7Y30uIiwKICAgICAgICAgICAgZXhwZWN0ZWRfYXR0cmlidXRlX2E6ICJFeHBlY3RlZCBhbiBhdHRyaWJ1dGUsIGFuZCBpbnN0ZWFkIHNhdyBbe2F9XS4iLAogICAgICAgICAgICBleHBlY3RlZF9hdHRyaWJ1dGVfdmFsdWVfYTogIkV4cGVjdGVkIGFuIGF0dHJpYnV0ZSB2YWx1ZSBhbmQgIiArCiAgICAgICAgICAgICAgICAiaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfY2xhc3NfYTogIkV4cGVjdGVkIGEgY2xhc3MsIGFuZCBpbnN0ZWFkIHNhdyAue2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2ZyYWN0aW9uX2E6ICJFeHBlY3RlZCBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEgYW5kICIgKwogICAgICAgICAgICAgICAgImluc3RlYWQgc2F3ICd7YX0nIiwKICAgICAgICAgICAgZXhwZWN0ZWRfaWRfYTogIkV4cGVjdGVkIGFuIGlkLCBhbmQgaW5zdGVhZCBzYXcgI3thfS4iLAogICAgICAgICAgICBleHBlY3RlZF9pZGVudGlmaWVyX2E6ICJFeHBlY3RlZCBhbiBpZGVudGlmaWVyIGFuZCBpbnN0ZWFkIHNhdyAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9pZGVudGlmaWVyX2FfcmVzZXJ2ZWQ6ICJFeHBlY3RlZCBhbiBpZGVudGlmaWVyIGFuZCAiICsKICAgICAgICAgICAgICAgICJpbnN0ZWFkIHNhdyAne2F9JyAoYSByZXNlcnZlZCB3b3JkKS4iLAogICAgICAgICAgICBleHBlY3RlZF9saW5lYXJfYTogIkV4cGVjdGVkIGEgbGluZWFyIHVuaXQgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2xhbmdfYTogIkV4cGVjdGVkIGEgbGFuZyBjb2RlLCBhbmQgaW5zdGVhZCBzYXcgOnthfS4iLAogICAgICAgICAgICBleHBlY3RlZF9tZWRpYV9hOiAiRXhwZWN0ZWQgYSBDU1MgbWVkaWEgdHlwZSwgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX25hbWVfYTogIkV4cGVjdGVkIGEgbmFtZSBhbmQgaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfbm9uc3RhbmRhcmRfc3R5bGVfYXR0cmlidXRlOiAiRXhwZWN0ZWQgYSBub24tc3RhbmRhcmQgIiArCiAgICAgICAgICAgICAgICAic3R5bGUgYXR0cmlidXRlIGFuZCBpbnN0ZWFkIHNhdyAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9udW1iZXJfYTogIkV4cGVjdGVkIGEgbnVtYmVyIGFuZCBpbnN0ZWFkIHNhdyAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9vcGVyYXRvcl9hOiAiRXhwZWN0ZWQgYW4gb3BlcmF0b3IgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX3BlcmNlbnRfYTogIkV4cGVjdGVkIGEgcGVyY2VudGFnZSBhbmQgaW5zdGVhZCBzYXcgJ3thfSciLAogICAgICAgICAgICBleHBlY3RlZF9wb3NpdGl2ZV9hOiAiRXhwZWN0ZWQgYSBwb3NpdGl2ZSBudW1iZXIgYW5kIGluc3RlYWQgc2F3ICd7YX0nIiwKICAgICAgICAgICAgZXhwZWN0ZWRfcHNldWRvX2E6ICJFeHBlY3RlZCBhIHBzZXVkbywgYW5kIGluc3RlYWQgc2F3IDp7YX0uIiwKICAgICAgICAgICAgZXhwZWN0ZWRfc2VsZWN0b3JfYTogIkV4cGVjdGVkIGEgQ1NTIHNlbGVjdG9yLCBhbmQgaW5zdGVhZCBzYXcge2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX3NtYWxsX2E6ICJFeHBlY3RlZCBhIHNtYWxsIHBvc2l0aXZlIGludGVnZXIgYW5kIGluc3RlYWQgc2F3ICd7YX0nIiwKICAgICAgICAgICAgZXhwZWN0ZWRfc3BhY2VfYV9iOiAiRXhwZWN0ZWQgZXhhY3RseSBvbmUgc3BhY2UgYmV0d2VlbiAne2F9JyBhbmQgJ3tifScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfc3RyaW5nX2E6ICJFeHBlY3RlZCBhIHN0cmluZyBhbmQgaW5zdGVhZCBzYXcge2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX3N0eWxlX2F0dHJpYnV0ZTogIkV4Y2VwdGVkIGEgc3R5bGUgYXR0cmlidXRlLCBhbmQgaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfc3R5bGVfcGF0dGVybjogIkV4cGVjdGVkIGEgc3R5bGUgcGF0dGVybiwgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX3RhZ25hbWVfYTogIkV4cGVjdGVkIGEgdGFnTmFtZSwgYW5kIGluc3RlYWQgc2F3IHthfS4iLAogICAgICAgICAgICBleHBlY3RlZF90eXBlX2E6ICJFeHBlY3RlZCBhIHR5cGUsIGFuZCBpbnN0ZWFkIHNhdyB7YX0uIiwKICAgICAgICAgICAgZm9yX2lmOiAiVGhlIGJvZHkgb2YgYSBmb3IgaW4gc2hvdWxkIGJlIHdyYXBwZWQgaW4gYW4gaWYgIiArCiAgICAgICAgICAgICAgICAic3RhdGVtZW50IHRvIGZpbHRlciB1bndhbnRlZCBwcm9wZXJ0aWVzIGZyb20gdGhlIHByb3RvdHlwZS4iLAogICAgICAgICAgICBmdW5jdGlvbl9ibG9jazogIkZ1bmN0aW9uIHN0YXRlbWVudHMgc2hvdWxkIG5vdCBiZSBwbGFjZWQgaW4gYmxvY2tzLiAiICsKICAgICAgICAgICAgICAgICJVc2UgYSBmdW5jdGlvbiBleHByZXNzaW9uIG9yIG1vdmUgdGhlIHN0YXRlbWVudCB0byB0aGUgdG9wIG9mICIgKwogICAgICAgICAgICAgICAgInRoZSBvdXRlciBmdW5jdGlvbi4iLAogICAgICAgICAgICBmdW5jdGlvbl9ldmFsOiAiVGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlzIGV2YWwuIiwKICAgICAgICAgICAgZnVuY3Rpb25fbG9vcDogIkRvbid0IG1ha2UgZnVuY3Rpb25zIHdpdGhpbiBhIGxvb3AuIiwKICAgICAgICAgICAgZnVuY3Rpb25fc3RhdGVtZW50OiAiRnVuY3Rpb24gc3RhdGVtZW50cyBhcmUgbm90IGludm9jYWJsZS4gIiArCiAgICAgICAgICAgICAgICAiV3JhcCB0aGUgd2hvbGUgZnVuY3Rpb24gaW52b2NhdGlvbiBpbiBwYXJlbnMuIiwKICAgICAgICAgICAgZnVuY3Rpb25fc3RyaWN0OiAiVXNlIHRoZSBmdW5jdGlvbiBmb3JtIG9mICd1c2Ugc3RyaWN0Jy4iLAogICAgICAgICAgICBodG1sX2NvbmZ1c2lvbl9hOiAiSFRNTCBjb25mdXNpb24gaW4gcmVndWxhciBleHByZXNzaW9uICc8e2F9Jy4iLAogICAgICAgICAgICBodG1sX2hhbmRsZXJzOiAiQXZvaWQgSFRNTCBldmVudCBoYW5kbGVycy4iLAogICAgICAgICAgICBpZGVudGlmaWVyX2Z1bmN0aW9uOiAiRXhwZWN0ZWQgYW4gaWRlbnRpZmllciBpbiBhbiBhc3NpZ25tZW50ICIgKwogICAgICAgICAgICAgICAgImFuZCBpbnN0ZWFkIHNhdyBhIGZ1bmN0aW9uIGludm9jYXRpb24uIiwKICAgICAgICAgICAgaW1wbGllZF9ldmlsOiAiSW1wbGllZCBldmFsIGlzIGV2aWwuIFBhc3MgYSBmdW5jdGlvbiBpbnN0ZWFkIG9mIGEgc3RyaW5nLiIsCiAgICAgICAgICAgIGluZml4X2luOiAiVW5leHBlY3RlZCAnaW4nLiBDb21wYXJlIHdpdGggdW5kZWZpbmVkLCBvciB1c2UgdGhlICIgKwogICAgICAgICAgICAgICAgImhhc093blByb3BlcnR5IG1ldGhvZCBpbnN0ZWFkLiIsCiAgICAgICAgICAgIGluc2VjdXJlX2E6ICJJbnNlY3VyZSAne2F9Jy4iLAogICAgICAgICAgICBpc05hTjogIlVzZSB0aGUgaXNOYU4gZnVuY3Rpb24gdG8gY29tcGFyZSB3aXRoIE5hTi4iLAogICAgICAgICAgICBsYWJlbF9hX2I6ICJMYWJlbCAne2F9JyBvbiAne2J9JyBzdGF0ZW1lbnQuIiwKICAgICAgICAgICAgbGFuZzogImxhbmcgaXMgZGVwcmVjYXRlZC4iLAogICAgICAgICAgICBsZWFkaW5nX2RlY2ltYWxfYTogIkEgbGVhZGluZyBkZWNpbWFsIHBvaW50IGNhbiBiZSBjb25mdXNlZCB3aXRoIGEgZG90OiAnLnthfScuIiwKICAgICAgICAgICAgbWlzc2luZ19hOiAiTWlzc2luZyAne2F9Jy4iLAogICAgICAgICAgICBtaXNzaW5nX2FfYWZ0ZXJfYjogIk1pc3NpbmcgJ3thfScgYWZ0ZXIgJ3tifScuIiwKICAgICAgICAgICAgbWlzc2luZ19vcHRpb246ICJNaXNzaW5nIG9wdGlvbiB2YWx1ZS4iLAogICAgICAgICAgICBtaXNzaW5nX3Byb3BlcnR5OiAiTWlzc2luZyBwcm9wZXJ0eSBuYW1lLiIsCiAgICAgICAgICAgIG1pc3Npbmdfc3BhY2VfYV9iOiAiTWlzc2luZyBzcGFjZSBiZXR3ZWVuICd7YX0nIGFuZCAne2J9Jy4iLAogICAgICAgICAgICBtaXNzaW5nX3VybDogIk1pc3NpbmcgdXJsLiIsCiAgICAgICAgICAgIG1pc3NpbmdfdXNlX3N0cmljdDogIk1pc3NpbmcgJ3VzZSBzdHJpY3QnIHN0YXRlbWVudC4iLAogICAgICAgICAgICBtaXhlZDogIk1peGVkIHNwYWNlcyBhbmQgdGFicy4iLAogICAgICAgICAgICBtb3ZlX2ludm9jYXRpb246ICJNb3ZlIHRoZSBpbnZvY2F0aW9uIGludG8gdGhlIHBhcmVucyB0aGF0ICIgKwogICAgICAgICAgICAgICAgImNvbnRhaW4gdGhlIGZ1bmN0aW9uLiIsCiAgICAgICAgICAgIG1vdmVfdmFyOiAiTW92ZSAndmFyJyBkZWNsYXJhdGlvbnMgdG8gdGhlIHRvcCBvZiB0aGUgZnVuY3Rpb24uIiwKICAgICAgICAgICAgbmFtZV9mdW5jdGlvbjogIk1pc3NpbmcgbmFtZSBpbiBmdW5jdGlvbiBzdGF0ZW1lbnQuIiwKICAgICAgICAgICAgbmVzdGVkX2NvbW1lbnQ6ICJOZXN0ZWQgY29tbWVudC4iLAogICAgICAgICAgICBub3Q6ICJOZXN0ZWQgbm90LiIsCiAgICAgICAgICAgIG5vdF9hX2NvbnN0cnVjdG9yOiAiRG8gbm90IHVzZSB7YX0gYXMgYSBjb25zdHJ1Y3Rvci4iLAogICAgICAgICAgICBub3RfYV9kZWZpbmVkOiAiJ3thfScgaGFzIG5vdCBiZWVuIGZ1bGx5IGRlZmluZWQgeWV0LiIsCiAgICAgICAgICAgIG5vdF9hX2Z1bmN0aW9uOiAiJ3thfScgaXMgbm90IGEgZnVuY3Rpb24uIiwKICAgICAgICAgICAgbm90X2FfbGFiZWw6ICIne2F9JyBpcyBub3QgYSBsYWJlbC4iLAogICAgICAgICAgICBub3RfYV9zY29wZTogIid7YX0nIGlzIG91dCBvZiBzY29wZS4iLAogICAgICAgICAgICBub3RfZ3JlYXRlcjogIid7YX0nIHNob3VsZCBub3QgYmUgZ3JlYXRlciB0aGFuICd7Yn0nLiIsCiAgICAgICAgICAgIHBhcmFtZXRlcl9hX2dldF9iOiAiVW5leHBlY3RlZCBwYXJhbWV0ZXIgJ3thfScgaW4gZ2V0IHtifSBmdW5jdGlvbi4iLAogICAgICAgICAgICBwYXJhbWV0ZXJfc2V0X2E6ICJFeHBlY3RlZCBwYXJhbWV0ZXIgKHZhbHVlKSBpbiBzZXQge2F9IGZ1bmN0aW9uLiIsCiAgICAgICAgICAgIHJhZGl4OiAiTWlzc2luZyByYWRpeCBwYXJhbWV0ZXIuIiwKICAgICAgICAgICAgcmVhZF9vbmx5OiAiUmVhZCBvbmx5LiIsCiAgICAgICAgICAgIHJlZGVmaW5pdGlvbl9hOiAiUmVkZWZpbml0aW9uIG9mICd7YX0nLiIsCiAgICAgICAgICAgIHJlc2VydmVkX2E6ICJSZXNlcnZlZCBuYW1lICd7YX0nLiIsCiAgICAgICAgICAgIHNjYW5uZWRfYV9iOiAie2F9ICh7Yn0lIHNjYW5uZWQpLiIsCiAgICAgICAgICAgIHNsYXNoX2VxdWFsOiAiQSByZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbCBjYW4gYmUgY29uZnVzZWQgd2l0aCAnLz0nLiIsCiAgICAgICAgICAgIHN0YXRlbWVudF9ibG9jazogIkV4cGVjdGVkIHRvIHNlZSBhIHN0YXRlbWVudCBhbmQgaW5zdGVhZCBzYXcgYSBibG9jay4iLAogICAgICAgICAgICBzdG9wcGluZzogIlN0b3BwaW5nLiAiLAogICAgICAgICAgICBzdHJhbmdlX2xvb3A6ICJTdHJhbmdlIGxvb3AuIiwKICAgICAgICAgICAgc3RyaWN0OiAiU3RyaWN0IHZpb2xhdGlvbi4iLAogICAgICAgICAgICBzdWJzY3JpcHQ6ICJbJ3thfSddIGlzIGJldHRlciB3cml0dGVuIGluIGRvdCBub3RhdGlvbi4iLAogICAgICAgICAgICB0YWdfYV9pbl9iOiAiQSAnPHthfT4nIG11c3QgYmUgd2l0aGluICc8e2J9PicuIiwKICAgICAgICAgICAgdG9vX2xvbmc6ICJMaW5lIHRvbyBsb25nLiIsCiAgICAgICAgICAgIHRvb19tYW55OiAiVG9vIG1hbnkgZXJyb3JzLiIsCiAgICAgICAgICAgIHRyYWlsaW5nX2RlY2ltYWxfYTogIkEgdHJhaWxpbmcgZGVjaW1hbCBwb2ludCBjYW4gYmUgY29uZnVzZWQgIiArCiAgICAgICAgICAgICAgICAid2l0aCBhIGRvdDogJy57YX0nLiIsCiAgICAgICAgICAgIHR5cGU6ICJ0eXBlIGlzIHVubmVjZXNzYXJ5LiIsCiAgICAgICAgICAgIHR5cGVfY29uZnVzaW9uX2FfYjogIlR5cGUgY29uZnVzaW9uOiB7YX0gYW5kIHtifS4iLAogICAgICAgICAgICB1bmNsb3NlZDogIlVuY2xvc2VkIHN0cmluZy4iLAogICAgICAgICAgICB1bmNsb3NlZF9jb21tZW50OiAiVW5jbG9zZWQgY29tbWVudC4iLAogICAgICAgICAgICB1bmNsb3NlZF9yZWdleHA6ICJVbmNsb3NlZCByZWd1bGFyIGV4cHJlc3Npb24uIiwKICAgICAgICAgICAgdW5lc2NhcGVkX2E6ICJVbmVzY2FwZWQgJ3thfScuIiwKICAgICAgICAgICAgdW5leHBlY3RlZF9hOiAiVW5leHBlY3RlZCAne2F9Jy4iLAogICAgICAgICAgICB1bmV4cGVjdGVkX2NoYXJfYV9iOiAiVW5leHBlY3RlZCBjaGFyYWN0ZXIgJ3thfScgaW4ge2J9LiIsCiAgICAgICAgICAgIHVuZXhwZWN0ZWRfY29tbWVudDogIlVuZXhwZWN0ZWQgY29tbWVudC4iLAogICAgICAgICAgICB1bmV4cGVjdGVkX3Byb3BlcnR5X2E6ICJVbmV4cGVjdGVkIC8qcHJvcGVydHkqLyAne2F9Jy4iLAogICAgICAgICAgICB1bmV4cGVjdGVkX3NwYWNlX2FfYjogIlVuZXhwZWN0ZWQgc3BhY2UgYmV0d2VlbiAne2F9JyBhbmQgJ3tifScuIiwKICAgICAgICAgICAgdW5uZWNlc3NhcnlfaW5pdGlhbGl6ZTogIkl0IGlzIG5vdCBuZWNlc3NhcnkgdG8gaW5pdGlhbGl6ZSAne2F9JyAiICsKICAgICAgICAgICAgICAgICJ0byAndW5kZWZpbmVkJy4iLAogICAgICAgICAgICB1bm5lY2Vzc2FyeV91c2U6ICJVbm5lY2Vzc2FyeSAndXNlIHN0cmljdCcuIiwKICAgICAgICAgICAgdW5yZWFjaGFibGVfYV9iOiAiVW5yZWFjaGFibGUgJ3thfScgYWZ0ZXIgJ3tifScuIiwKICAgICAgICAgICAgdW5yZWNvZ25pemVkX3N0eWxlX2F0dHJpYnV0ZV9hOiAiVW5yZWNvZ25pemVkIHN0eWxlIGF0dHJpYnV0ZSAne2F9Jy4iLAogICAgICAgICAgICB1bnJlY29nbml6ZWRfdGFnX2E6ICJVbnJlY29nbml6ZWQgdGFnICc8e2F9PicuIiwKICAgICAgICAgICAgdW5zYWZlOiAiVW5zYWZlIGNoYXJhY3Rlci4iLAogICAgICAgICAgICB1cmw6ICJKYXZhU2NyaXB0IFVSTC4iLAogICAgICAgICAgICB1c2VfYXJyYXk6ICJVc2UgdGhlIGFycmF5IGxpdGVyYWwgbm90YXRpb24gW10uIiwKICAgICAgICAgICAgdXNlX2JyYWNlczogIlNwYWNlcyBhcmUgaGFyZCB0byBjb3VudC4gVXNlIHt7YX19LiIsCiAgICAgICAgICAgIHVzZV9jaGFyQXQ6ICJVc2UgdGhlIGNoYXJBdCBtZXRob2QuIiwKICAgICAgICAgICAgdXNlX29iamVjdDogIlVzZSB0aGUgb2JqZWN0IGxpdGVyYWwgbm90YXRpb24ge30uIiwKICAgICAgICAgICAgdXNlX29yOiAiVXNlIHRoZSB8fCBvcGVyYXRvci4iLAogICAgICAgICAgICB1c2VfcGFyYW06ICJVc2UgYSBuYW1lZCBwYXJhbWV0ZXIuIiwKICAgICAgICAgICAgdXNlZF9iZWZvcmVfYTogIid7YX0nIHdhcyB1c2VkIGJlZm9yZSBpdCB3YXMgZGVmaW5lZC4iLAogICAgICAgICAgICB2YXJfYV9ub3Q6ICJWYXJpYWJsZSB7YX0gd2FzIG5vdCBkZWNsYXJlZCBjb3JyZWN0bHkuIiwKICAgICAgICAgICAgd2VpcmRfYXNzaWdubWVudDogIldlaXJkIGFzc2lnbm1lbnQuIiwKICAgICAgICAgICAgd2VpcmRfY29uZGl0aW9uOiAiV2VpcmQgY29uZGl0aW9uLiIsCiAgICAgICAgICAgIHdlaXJkX25ldzogIldlaXJkIGNvbnN0cnVjdGlvbi4gRGVsZXRlICduZXcnLiIsCiAgICAgICAgICAgIHdlaXJkX3Byb2dyYW06ICJXZWlyZCBwcm9ncmFtLiIsCiAgICAgICAgICAgIHdlaXJkX3JlbGF0aW9uOiAiV2VpcmQgcmVsYXRpb24uIiwKICAgICAgICAgICAgd2VpcmRfdGVybmFyeTogIldlaXJkIHRlcm5hcnkuIiwKICAgICAgICAgICAgd3JhcF9pbW1lZGlhdGU6ICJXcmFwIGFuIGltbWVkaWF0ZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGluIHBhcmVudGhlc2VzICIgKwogICAgICAgICAgICAgICAgInRvIGFzc2lzdCB0aGUgcmVhZGVyIGluIHVuZGVyc3RhbmRpbmcgdGhhdCB0aGUgZXhwcmVzc2lvbiAiICsKICAgICAgICAgICAgICAgICJpcyB0aGUgcmVzdWx0IG9mIGEgZnVuY3Rpb24sIGFuZCBub3QgdGhlIGZ1bmN0aW9uIGl0c2VsZi4iLAogICAgICAgICAgICB3cmFwX3JlZ2V4cDogIldyYXAgdGhlIC9yZWdleHAvIGxpdGVyYWwgaW4gcGFyZW5zIHRvICIgKwogICAgICAgICAgICAgICAgImRpc2FtYmlndWF0ZSB0aGUgc2xhc2ggb3BlcmF0b3IuIiwKICAgICAgICAgICAgd3JpdGVfaXNfd3Jvbmc6ICJkb2N1bWVudC53cml0ZSBjYW4gYmUgYSBmb3JtIG9mIGV2YWwuIgogICAgICAgIH0sCiAgICAgICAgY29tbWVudHNfb2ZmLAogICAgICAgIGNzc19hdHRyaWJ1dGVfZGF0YSwKICAgICAgICBjc3NfYW55LAoKICAgICAgICBjc3NfY29sb3JEYXRhID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgImFsaWNlYmx1ZSIsICJhbnRpcXVld2hpdGUiLCAiYXF1YSIsICJhcXVhbWFyaW5lIiwgImF6dXJlIiwgImJlaWdlIiwKICAgICAgICAgICAgImJpc3F1ZSIsICJibGFjayIsICJibGFuY2hlZGFsbW9uZCIsICJibHVlIiwgImJsdWV2aW9sZXQiLCAiYnJvd24iLAogICAgICAgICAgICAiYnVybHl3b29kIiwgImNhZGV0Ymx1ZSIsICJjaGFydHJldXNlIiwgImNob2NvbGF0ZSIsICJjb3JhbCIsCiAgICAgICAgICAgICJjb3JuZmxvd2VyYmx1ZSIsICJjb3Juc2lsayIsICJjcmltc29uIiwgImN5YW4iLCAiZGFya2JsdWUiLAogICAgICAgICAgICAiZGFya2N5YW4iLCAiZGFya2dvbGRlbnJvZCIsICJkYXJrZ3JheSIsICJkYXJrZ3JlZW4iLCAiZGFya2toYWtpIiwKICAgICAgICAgICAgImRhcmttYWdlbnRhIiwgImRhcmtvbGl2ZWdyZWVuIiwgImRhcmtvcmFuZ2UiLCAiZGFya29yY2hpZCIsCiAgICAgICAgICAgICJkYXJrcmVkIiwgImRhcmtzYWxtb24iLCAiZGFya3NlYWdyZWVuIiwgImRhcmtzbGF0ZWJsdWUiLAogICAgICAgICAgICAiZGFya3NsYXRlZ3JheSIsICJkYXJrdHVycXVvaXNlIiwgImRhcmt2aW9sZXQiLCAiZGVlcHBpbmsiLAogICAgICAgICAgICAiZGVlcHNreWJsdWUiLCAiZGltZ3JheSIsICJkb2RnZXJibHVlIiwgImZpcmVicmljayIsICJmbG9yYWx3aGl0ZSIsCiAgICAgICAgICAgICJmb3Jlc3RncmVlbiIsICJmdWNoc2lhIiwgImdhaW5zYm9ybyIsICJnaG9zdHdoaXRlIiwgImdvbGQiLAogICAgICAgICAgICAiZ29sZGVucm9kIiwgImdyYXkiLCAiZ3JlZW4iLCAiZ3JlZW55ZWxsb3ciLCAiaG9uZXlkZXciLCAiaG90cGluayIsCiAgICAgICAgICAgICJpbmRpYW5yZWQiLCAiaW5kaWdvIiwgIml2b3J5IiwgImtoYWtpIiwgImxhdmVuZGVyIiwKICAgICAgICAgICAgImxhdmVuZGVyYmx1c2giLCAibGF3bmdyZWVuIiwgImxlbW9uY2hpZmZvbiIsICJsaWdodGJsdWUiLAogICAgICAgICAgICAibGlnaHRjb3JhbCIsICJsaWdodGN5YW4iLCAibGlnaHRnb2xkZW5yb2R5ZWxsb3ciLCAibGlnaHRncmVlbiIsCiAgICAgICAgICAgICJsaWdodHBpbmsiLCAibGlnaHRzYWxtb24iLCAibGlnaHRzZWFncmVlbiIsICJsaWdodHNreWJsdWUiLAogICAgICAgICAgICAibGlnaHRzbGF0ZWdyYXkiLCAibGlnaHRzdGVlbGJsdWUiLCAibGlnaHR5ZWxsb3ciLCAibGltZSIsCiAgICAgICAgICAgICJsaW1lZ3JlZW4iLCAibGluZW4iLCAibWFnZW50YSIsICJtYXJvb24iLCAibWVkaXVtYXF1YW1hcmluZSIsCiAgICAgICAgICAgICJtZWRpdW1ibHVlIiwgIm1lZGl1bW9yY2hpZCIsICJtZWRpdW1wdXJwbGUiLCAibWVkaXVtc2VhZ3JlZW4iLAogICAgICAgICAgICAibWVkaXVtc2xhdGVibHVlIiwgIm1lZGl1bXNwcmluZ2dyZWVuIiwgIm1lZGl1bXR1cnF1b2lzZSIsCiAgICAgICAgICAgICJtZWRpdW12aW9sZXRyZWQiLCAibWlkbmlnaHRibHVlIiwgIm1pbnRjcmVhbSIsICJtaXN0eXJvc2UiLAogICAgICAgICAgICAibW9jY2FzaW4iLCAibmF2YWpvd2hpdGUiLCAibmF2eSIsICJvbGRsYWNlIiwgIm9saXZlIiwgIm9saXZlZHJhYiIsCiAgICAgICAgICAgICJvcmFuZ2UiLCAib3JhbmdlcmVkIiwgIm9yY2hpZCIsICJwYWxlZ29sZGVucm9kIiwgInBhbGVncmVlbiIsCiAgICAgICAgICAgICJwYWxldHVycXVvaXNlIiwgInBhbGV2aW9sZXRyZWQiLCAicGFwYXlhd2hpcCIsICJwZWFjaHB1ZmYiLAogICAgICAgICAgICAicGVydSIsICJwaW5rIiwgInBsdW0iLCAicG93ZGVyYmx1ZSIsICJwdXJwbGUiLCAicmVkIiwgInJvc3licm93biIsCiAgICAgICAgICAgICJyb3lhbGJsdWUiLCAic2FkZGxlYnJvd24iLCAic2FsbW9uIiwgInNhbmR5YnJvd24iLCAic2VhZ3JlZW4iLAogICAgICAgICAgICAic2Vhc2hlbGwiLCAic2llbm5hIiwgInNpbHZlciIsICJza3libHVlIiwgInNsYXRlYmx1ZSIsICJzbGF0ZWdyYXkiLAogICAgICAgICAgICAic25vdyIsICJzcHJpbmdncmVlbiIsICJzdGVlbGJsdWUiLCAidGFuIiwgInRlYWwiLCAidGhpc3RsZSIsCiAgICAgICAgICAgICJ0b21hdG8iLCAidHVycXVvaXNlIiwgInZpb2xldCIsICJ3aGVhdCIsICJ3aGl0ZSIsICJ3aGl0ZXNtb2tlIiwKICAgICAgICAgICAgInllbGxvdyIsICJ5ZWxsb3dncmVlbiIsCgogICAgICAgICAgICAiYWN0aXZlYm9yZGVyIiwgImFjdGl2ZWNhcHRpb24iLCAiYXBwd29ya3NwYWNlIiwgImJhY2tncm91bmQiLAogICAgICAgICAgICAiYnV0dG9uZmFjZSIsICJidXR0b25oaWdobGlnaHQiLCAiYnV0dG9uc2hhZG93IiwgImJ1dHRvbnRleHQiLAogICAgICAgICAgICAiY2FwdGlvbnRleHQiLCAiZ3JheXRleHQiLCAiaGlnaGxpZ2h0IiwgImhpZ2hsaWdodHRleHQiLAogICAgICAgICAgICAiaW5hY3RpdmVib3JkZXIiLCAiaW5hY3RpdmVjYXB0aW9uIiwgImluYWN0aXZlY2FwdGlvbnRleHQiLAogICAgICAgICAgICAiaW5mb2JhY2tncm91bmQiLCAiaW5mb3RleHQiLCAibWVudSIsICJtZW51dGV4dCIsICJzY3JvbGxiYXIiLAogICAgICAgICAgICAidGhyZWVkZGFya3NoYWRvdyIsICJ0aHJlZWRmYWNlIiwgInRocmVlZGhpZ2hsaWdodCIsCiAgICAgICAgICAgICJ0aHJlZWRsaWdodHNoYWRvdyIsICJ0aHJlZWRzaGFkb3ciLCAid2luZG93IiwgIndpbmRvd2ZyYW1lIiwKICAgICAgICAgICAgIndpbmRvd3RleHQiCiAgICAgICAgXSwgdHJ1ZSksCgogICAgICAgIGNzc19ib3JkZXJfc3R5bGUsCiAgICAgICAgY3NzX2JyZWFrLAoKICAgICAgICBjc3NfbGVuZ3RoRGF0YSA9IHsKICAgICAgICAgICAgJyUnOiB0cnVlLAogICAgICAgICAgICAnY20nOiB0cnVlLAogICAgICAgICAgICAnZW0nOiB0cnVlLAogICAgICAgICAgICAnZXgnOiB0cnVlLAogICAgICAgICAgICAnaW4nOiB0cnVlLAogICAgICAgICAgICAnbW0nOiB0cnVlLAogICAgICAgICAgICAncGMnOiB0cnVlLAogICAgICAgICAgICAncHQnOiB0cnVlLAogICAgICAgICAgICAncHgnOiB0cnVlCiAgICAgICAgfSwKCiAgICAgICAgY3NzX21lZGlhLAogICAgICAgIGNzc19vdmVyZmxvdywKCiAgICAgICAgZGVzY2FwZXMgPSB7CiAgICAgICAgICAgICdiJzogJ1xiJywKICAgICAgICAgICAgJ3QnOiAnXHQnLAogICAgICAgICAgICAnbic6ICdcbicsCiAgICAgICAgICAgICdmJzogJ1xmJywKICAgICAgICAgICAgJ3InOiAnXHInLAogICAgICAgICAgICAnIic6ICciJywKICAgICAgICAgICAgJy8nOiAnLycsCiAgICAgICAgICAgICdcXCc6ICdcXCcKICAgICAgICB9LAoKICAgICAgICBkZXZlbCA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICdhbGVydCcsICdjb25maXJtJywgJ2NvbnNvbGUnLCAnRGVidWcnLCAnb3BlcmEnLCAncHJvbXB0JywgJ1dTSCcKICAgICAgICBdLCBmYWxzZSksCiAgICAgICAgZGlyZWN0aXZlLAogICAgICAgIGVzY2FwZXMgPSB7CiAgICAgICAgICAgICdcYic6ICdcXGInLAogICAgICAgICAgICAnXHQnOiAnXFx0JywKICAgICAgICAgICAgJ1xuJzogJ1xcbicsCiAgICAgICAgICAgICdcZic6ICdcXGYnLAogICAgICAgICAgICAnXHInOiAnXFxyJywKICAgICAgICAgICAgJ1wnJzogJ1xcXCcnLAogICAgICAgICAgICAnIicgOiAnXFwiJywKICAgICAgICAgICAgJy8nIDogJ1xcLycsCiAgICAgICAgICAgICdcXCc6ICdcXFxcJwogICAgICAgIH0sCgogICAgICAgIGZ1bmN0LCAgICAgICAgICAvLyBUaGUgY3VycmVudCBmdW5jdGlvbiwgaW5jbHVkaW5nIHRoZSBsYWJlbHMgdXNlZCBpbgogICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZnVuY3Rpb24sIGFzIHdlbGwgYXMgKGJyZWFrYWdlKSwgKGNvbXBsZXhpdHkpLAogICAgICAgICAgICAgICAgICAgICAgICAvLyAoY29udGV4dCksIChsb29wYWdlKSwgKG5hbWUpLCAocGFyYW1zKSwgKHRva2VuKSwKICAgICAgICAgICAgICAgICAgICAgICAgLy8gKHZhcnMpLCAodmVyYikKCiAgICAgICAgZnVuY3Rpb25pY2l0eSA9IFsKICAgICAgICAgICAgJ2Nsb3N1cmUnLCAnZXhjZXB0aW9uJywgJ2dsb2JhbCcsICdsYWJlbCcsICdvdXRlcicsICd1bmRlZicsCiAgICAgICAgICAgICd1bnVzZWQnLCAndmFyJwogICAgICAgIF0sCgogICAgICAgIGZ1bmN0aW9ucywgICAgICAvLyBBbGwgb2YgdGhlIGZ1bmN0aW9ucwogICAgICAgIGdsb2JhbF9mdW5jdCwgICAvLyBUaGUgZ2xvYmFsIGJvZHkKICAgICAgICBnbG9iYWxfc2NvcGUsICAgLy8gVGhlIGdsb2JhbCBzY29wZQogICAgICAgIGh0bWxfdGFnID0gewogICAgICAgICAgICBhOiAgICAgICAge30sCiAgICAgICAgICAgIGFiYnI6ICAgICB7fSwKICAgICAgICAgICAgYWNyb255bTogIHt9LAogICAgICAgICAgICBhZGRyZXNzOiAge30sCiAgICAgICAgICAgIGFwcGxldDogICB7fSwKICAgICAgICAgICAgYXJlYTogICAgIHtlbXB0eTogdHJ1ZSwgcGFyZW50OiAnIG1hcCAnfSwKICAgICAgICAgICAgYXJ0aWNsZTogIHt9LAogICAgICAgICAgICBhc2lkZTogICAge30sCiAgICAgICAgICAgIGF1ZGlvOiAgICB7fSwKICAgICAgICAgICAgYjogICAgICAgIHt9LAogICAgICAgICAgICBiYXNlOiAgICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgaGVhZCAnfSwKICAgICAgICAgICAgYmRvOiAgICAgIHt9LAogICAgICAgICAgICBiaWc6ICAgICAge30sCiAgICAgICAgICAgIGJsb2NrcXVvdGU6IHt9LAogICAgICAgICAgICBib2R5OiAgICAge3BhcmVudDogJyBodG1sIG5vZnJhbWVzICd9LAogICAgICAgICAgICBicjogICAgICAge2VtcHR5OiB0cnVlfSwKICAgICAgICAgICAgYnV0dG9uOiAgIHt9LAogICAgICAgICAgICBjYW52YXM6ICAge3BhcmVudDogJyBib2R5IHAgZGl2IHRoIHRkICd9LAogICAgICAgICAgICBjYXB0aW9uOiAge3BhcmVudDogJyB0YWJsZSAnfSwKICAgICAgICAgICAgY2VudGVyOiAgIHt9LAogICAgICAgICAgICBjaXRlOiAgICAge30sCiAgICAgICAgICAgIGNvZGU6ICAgICB7fSwKICAgICAgICAgICAgY29sOiAgICAgIHtlbXB0eTogdHJ1ZSwgcGFyZW50OiAnIHRhYmxlIGNvbGdyb3VwICd9LAogICAgICAgICAgICBjb2xncm91cDoge3BhcmVudDogJyB0YWJsZSAnfSwKICAgICAgICAgICAgY29tbWFuZDogIHtwYXJlbnQ6ICcgbWVudSAnfSwKICAgICAgICAgICAgZGF0YWxpc3Q6IHt9LAogICAgICAgICAgICBkZDogICAgICAge3BhcmVudDogJyBkbCAnfSwKICAgICAgICAgICAgZGVsOiAgICAgIHt9LAogICAgICAgICAgICBkZXRhaWxzOiAge30sCiAgICAgICAgICAgIGRpYWxvZzogICB7fSwKICAgICAgICAgICAgZGZuOiAgICAgIHt9LAogICAgICAgICAgICBkaXI6ICAgICAge30sCiAgICAgICAgICAgIGRpdjogICAgICB7fSwKICAgICAgICAgICAgZGw6ICAgICAgIHt9LAogICAgICAgICAgICBkdDogICAgICAge3BhcmVudDogJyBkbCAnfSwKICAgICAgICAgICAgZW06ICAgICAgIHt9LAogICAgICAgICAgICBlbWJlZDogICAge30sCiAgICAgICAgICAgIGZpZWxkc2V0OiB7fSwKICAgICAgICAgICAgZmlndXJlOiAgIHt9LAogICAgICAgICAgICBmb250OiAgICAge30sCiAgICAgICAgICAgIGZvb3RlcjogICB7fSwKICAgICAgICAgICAgZm9ybTogICAgIHt9LAogICAgICAgICAgICBmcmFtZTogICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgZnJhbWVzZXQgJ30sCiAgICAgICAgICAgIGZyYW1lc2V0OiB7cGFyZW50OiAnIGh0bWwgZnJhbWVzZXQgJ30sCiAgICAgICAgICAgIGgxOiAgICAgICB7fSwKICAgICAgICAgICAgaDI6ICAgICAgIHt9LAogICAgICAgICAgICBoMzogICAgICAge30sCiAgICAgICAgICAgIGg0OiAgICAgICB7fSwKICAgICAgICAgICAgaDU6ICAgICAgIHt9LAogICAgICAgICAgICBoNjogICAgICAge30sCiAgICAgICAgICAgIGhlYWQ6ICAgICB7cGFyZW50OiAnIGh0bWwgJ30sCiAgICAgICAgICAgIGhlYWRlcjogICB7fSwKICAgICAgICAgICAgaGdyb3VwOiAgIHt9LAogICAgICAgICAgICBocjogICAgICAge2VtcHR5OiB0cnVlfSwKICAgICAgICAgICAgJ2h0YTphcHBsaWNhdGlvbic6CiAgICAgICAgICAgICAgICAgICAgICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBoZWFkICd9LAogICAgICAgICAgICBodG1sOiAgICAge3BhcmVudDogJyonfSwKICAgICAgICAgICAgaTogICAgICAgIHt9LAogICAgICAgICAgICBpZnJhbWU6ICAge30sCiAgICAgICAgICAgIGltZzogICAgICB7ZW1wdHk6IHRydWV9LAogICAgICAgICAgICBpbnB1dDogICAge2VtcHR5OiB0cnVlfSwKICAgICAgICAgICAgaW5zOiAgICAgIHt9LAogICAgICAgICAgICBrYmQ6ICAgICAge30sCiAgICAgICAgICAgIGtleWdlbjogICB7fSwKICAgICAgICAgICAgbGFiZWw6ICAgIHt9LAogICAgICAgICAgICBsZWdlbmQ6ICAge3BhcmVudDogJyBkZXRhaWxzIGZpZWxkc2V0IGZpZ3VyZSAnfSwKICAgICAgICAgICAgbGk6ICAgICAgIHtwYXJlbnQ6ICcgZGlyIG1lbnUgb2wgdWwgJ30sCiAgICAgICAgICAgIGxpbms6ICAgICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBoZWFkICd9LAogICAgICAgICAgICBtYXA6ICAgICAge30sCiAgICAgICAgICAgIG1hcms6ICAgICB7fSwKICAgICAgICAgICAgbWVudTogICAgIHt9LAogICAgICAgICAgICBtZXRhOiAgICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgaGVhZCBub2ZyYW1lcyBub3NjcmlwdCAnfSwKICAgICAgICAgICAgbWV0ZXI6ICAgIHt9LAogICAgICAgICAgICBuYXY6ICAgICAge30sCiAgICAgICAgICAgIG5vZnJhbWVzOiB7cGFyZW50OiAnIGh0bWwgYm9keSAnfSwKICAgICAgICAgICAgbm9zY3JpcHQ6IHtwYXJlbnQ6ICcgYm9keSBoZWFkIG5vZnJhbWVzICd9LAogICAgICAgICAgICBvYmplY3Q6ICAge30sCiAgICAgICAgICAgIG9sOiAgICAgICB7fSwKICAgICAgICAgICAgb3B0Z3JvdXA6IHtwYXJlbnQ6ICcgc2VsZWN0ICd9LAogICAgICAgICAgICBvcHRpb246ICAge3BhcmVudDogJyBvcHRncm91cCBzZWxlY3QgJ30sCiAgICAgICAgICAgIG91dHB1dDogICB7fSwKICAgICAgICAgICAgcDogICAgICAgIHt9LAogICAgICAgICAgICBwYXJhbTogICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgYXBwbGV0IG9iamVjdCAnfSwKICAgICAgICAgICAgcHJlOiAgICAgIHt9LAogICAgICAgICAgICBwcm9ncmVzczoge30sCiAgICAgICAgICAgIHE6ICAgICAgICB7fSwKICAgICAgICAgICAgcnA6ICAgICAgIHt9LAogICAgICAgICAgICBydDogICAgICAge30sCiAgICAgICAgICAgIHJ1Ynk6ICAgICB7fSwKICAgICAgICAgICAgc2FtcDogICAgIHt9LAogICAgICAgICAgICBzY3JpcHQ6ICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgYm9keSBkaXYgZnJhbWUgaGVhZCBpZnJhbWUgcCBwcmUgc3BhbiAnfSwKICAgICAgICAgICAgc2VjdGlvbjogIHt9LAogICAgICAgICAgICBzZWxlY3Q6ICAge30sCiAgICAgICAgICAgIHNtYWxsOiAgICB7fSwKICAgICAgICAgICAgc3BhbjogICAgIHt9LAogICAgICAgICAgICBzb3VyY2U6ICAge30sCiAgICAgICAgICAgIHN0cm9uZzogICB7fSwKICAgICAgICAgICAgc3R5bGU6ICAgIHtwYXJlbnQ6ICcgaGVhZCAnLCBlbXB0eTogdHJ1ZX0sCiAgICAgICAgICAgIHN1YjogICAgICB7fSwKICAgICAgICAgICAgc3VwOiAgICAgIHt9LAogICAgICAgICAgICB0YWJsZTogICAge30sCiAgICAgICAgICAgIHRib2R5OiAgICB7cGFyZW50OiAnIHRhYmxlICd9LAogICAgICAgICAgICB0ZDogICAgICAge3BhcmVudDogJyB0ciAnfSwKICAgICAgICAgICAgdGV4dGFyZWE6IHt9LAogICAgICAgICAgICB0Zm9vdDogICAge3BhcmVudDogJyB0YWJsZSAnfSwKICAgICAgICAgICAgdGg6ICAgICAgIHtwYXJlbnQ6ICcgdHIgJ30sCiAgICAgICAgICAgIHRoZWFkOiAgICB7cGFyZW50OiAnIHRhYmxlICd9LAogICAgICAgICAgICB0aW1lOiAgICAge30sCiAgICAgICAgICAgIHRpdGxlOiAgICB7cGFyZW50OiAnIGhlYWQgJ30sCiAgICAgICAgICAgIHRyOiAgICAgICB7cGFyZW50OiAnIHRhYmxlIHRib2R5IHRoZWFkIHRmb290ICd9LAogICAgICAgICAgICB0dDogICAgICAge30sCiAgICAgICAgICAgIHU6ICAgICAgICB7fSwKICAgICAgICAgICAgdWw6ICAgICAgIHt9LAogICAgICAgICAgICAndmFyJzogICAge30sCiAgICAgICAgICAgIHZpZGVvOiAgICB7fQogICAgICAgIH0sCgogICAgICAgIGlkcywgICAgICAgICAgICAvLyBIVE1MIGlkcwogICAgICAgIGluX2Jsb2NrLAogICAgICAgIGluZGVudCwKLy8gICAgICAgICBpbmZlcl9zdGF0ZW1lbnQsLy8gSW5mZXJlbmNlIHJ1bGVzIGZvciBzdGF0ZW1lbnRzCiAgICAgICAgaXNfdHlwZSA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICcqJywgJ2FycmF5JywgJ2Jvb2xlYW4nLCAnZnVuY3Rpb24nLCAnbnVtYmVyJywgJ29iamVjdCcsCiAgICAgICAgICAgICdyZWdleHAnLCAnc3RyaW5nJwogICAgICAgIF0sIHRydWUpLAogICAgICAgIGl0c2VsZiwgICAgICAgICAvLyBKU0xpbnQgaXRzZWxmCiAgICAgICAganNsaW50X2xpbWl0ID0gewogICAgICAgICAgICBpbmRlbnQ6IDEwLAogICAgICAgICAgICBtYXhlcnI6IDEwMDAsCiAgICAgICAgICAgIG1heGxlbjogMjU2CiAgICAgICAgfSwKICAgICAgICBqc29uX21vZGUsCiAgICAgICAgbGV4LCAgICAgICAgICAgIC8vIHRoZSB0b2tlbml6ZXIKICAgICAgICBsaW5lcywKICAgICAgICBsb29rYWhlYWQsCiAgICAgICAgbWVtYmVyLAogICAgICAgIG5vZGUgPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAnQnVmZmVyJywgJ2NsZWFySW50ZXJ2YWwnLCAnY2xlYXJUaW1lb3V0JywgJ2NvbnNvbGUnLCAnZXhwb3J0cycsCiAgICAgICAgICAgICdnbG9iYWwnLCAnbW9kdWxlJywgJ3Byb2Nlc3MnLCAncXVlcnlzdHJpbmcnLCAncmVxdWlyZScsCiAgICAgICAgICAgICdzZXRJbnRlcnZhbCcsICdzZXRUaW1lb3V0JywgJ19fZGlybmFtZScsICdfX2ZpbGVuYW1lJwogICAgICAgIF0sIGZhbHNlKSwKICAgICAgICBub2RlX2pzLAogICAgICAgIG51bWJlcnkgPSBhcnJheV90b19vYmplY3QoWydpbmRleE9mJywgJ2xhc3RJbmRleE9mJywgJ3NlYXJjaCddLCB0cnVlKSwKICAgICAgICBuZXh0X3Rva2VuLAogICAgICAgIG9wdGlvbiwKICAgICAgICBwcmVkZWZpbmVkLCAgICAgLy8gR2xvYmFsIHZhcmlhYmxlcyBkZWZpbmVkIGJ5IG9wdGlvbgogICAgICAgIHByZXJlZywKICAgICAgICBwcmV2X3Rva2VuLAogICAgICAgIHByb3BlcnR5X3R5cGUsCiAgICAgICAgcmVnZXhwX2ZsYWcgPSBhcnJheV90b19vYmplY3QoWydnJywgJ2knLCAnbSddLCB0cnVlKSwKICAgICAgICByZXR1cm5fdGhpcyA9IGZ1bmN0aW9uIHJldHVybl90aGlzKCkgewogICAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICB9LAogICAgICAgIHJoaW5vID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgJ2RlZmluZUNsYXNzJywgJ2Rlc2VyaWFsaXplJywgJ2djJywgJ2hlbHAnLCAnbG9hZCcsICdsb2FkQ2xhc3MnLAogICAgICAgICAgICAncHJpbnQnLCAncXVpdCcsICdyZWFkRmlsZScsICdyZWFkVXJsJywgJ3J1bkNvbW1hbmQnLCAnc2VhbCcsCiAgICAgICAgICAgICdzZXJpYWxpemUnLCAnc3Bhd24nLCAnc3luYycsICd0b2ludDMyJywgJ3ZlcnNpb24nCiAgICAgICAgXSwgZmFsc2UpLAoKICAgICAgICBzY29wZSwgICAgICAvLyBBbiBvYmplY3QgY29udGFpbmluZyBhbiBvYmplY3QgZm9yIGVhY2ggdmFyaWFibGUgaW4gc2NvcGUKICAgICAgICBzZW1pY29sb25fY29kYSA9IGFycmF5X3RvX29iamVjdChbJzsnLCAnIicsICdcJycsICcpJ10sIHRydWUpLAogICAgICAgIHNyYywKICAgICAgICBzdGFjaywKCi8vIHN0YW5kYXJkIGNvbnRhaW5zIHRoZSBnbG9iYWwgbmFtZXMgdGhhdCBhcmUgcHJvdmlkZWQgYnkgdGhlCi8vIEVDTUFTY3JpcHQgc3RhbmRhcmQuCgogICAgICAgIHN0YW5kYXJkID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgJ0FycmF5JywgJ0Jvb2xlYW4nLCAnRGF0ZScsICdkZWNvZGVVUkknLCAnZGVjb2RlVVJJQ29tcG9uZW50JywKICAgICAgICAgICAgJ2VuY29kZVVSSScsICdlbmNvZGVVUklDb21wb25lbnQnLCAnRXJyb3InLCAnZXZhbCcsICdFdmFsRXJyb3InLAogICAgICAgICAgICAnRnVuY3Rpb24nLCAnaXNGaW5pdGUnLCAnaXNOYU4nLCAnSlNPTicsICdNYXRoJywgJ051bWJlcicsICdPYmplY3QnLAogICAgICAgICAgICAncGFyc2VJbnQnLCAncGFyc2VGbG9hdCcsICdSYW5nZUVycm9yJywgJ1JlZmVyZW5jZUVycm9yJywgJ1JlZ0V4cCcsCiAgICAgICAgICAgICdTdHJpbmcnLCAnU3ludGF4RXJyb3InLCAnVHlwZUVycm9yJywgJ1VSSUVycm9yJwogICAgICAgIF0sIGZhbHNlKSwKCiAgICAgICAgc3RhbmRhcmRfcHJvcGVydHlfdHlwZSA9IHsKICAgICAgICAgICAgRSAgICAgICAgICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBMTjIgICAgICAgICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIExOMTAgICAgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgTE9HMkUgICAgICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBMT0cxMEUgICAgICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIE1BWF9WQUxVRSAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgTUlOX1ZBTFVFICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBORUdBVElWRV9JTkZJTklUWSAgIDogJ251bWJlcicsCiAgICAgICAgICAgIFBJICAgICAgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgUE9TSVRJVkVfSU5GSU5JVFkgICA6ICdudW1iZXInLAogICAgICAgICAgICBTUVJUMV8yICAgICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIFNRUlQyICAgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgYXBwbHkgICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIGJpbmQgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gZnVuY3Rpb24nLAogICAgICAgICAgICBjYWxsICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgY2VpbCAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBjaGFyQXQgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIGNvbmNhdCAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBjb25zdHJ1Y3RvciAgICAgICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIGNyZWF0ZSAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkgICAgICA6ICdmdW5jdGlvbiBvYmplY3QnLAogICAgICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIGV2ZXJ5ICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gYm9vbGVhbicsCiAgICAgICAgICAgIGV4ZWMgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gYXJyYXknLAogICAgICAgICAgICBmaWx0ZXIgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIGFycmF5JywKICAgICAgICAgICAgZmxvb3IgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBmb3JFYWNoICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgZnJlZXplICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBvYmplY3QnLAogICAgICAgICAgICBnZXREYXRlICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldERheSAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0RnVsbFllYXIgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRIb3VycyAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldE1pbGxpc2Vjb25kcyAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0TWludXRlcyAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRNb250aCAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIGdldE93blByb3BlcnR5TmFtZXMgOiAnZnVuY3Rpb24gYXJyYXknLAogICAgICAgICAgICBnZXRQcm90b3R5cGVPZiAgICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIGdldFNlY29uZHMgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VGltZSAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRUaW1lem9uZU9mZnNldCAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFVUQ0RhdGUgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VVRDRGF5ICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRVVENGdWxsWWVhciAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFVUQ0hvdXJzICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VVRDTWlsbGlzZWNvbmRzICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRVVENNaW51dGVzICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFVUQ01vbnRoICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VVRDU2Vjb25kcyAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRZZWFyICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGhhc093blByb3BlcnR5ICAgICAgOiAnZnVuY3Rpb24gYm9vbGVhbicsCiAgICAgICAgICAgIGluZGV4T2YgICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgaXNFeHRlbnNpYmxlICAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgaXNGcm96ZW4gICAgICAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgaXNQcm90b3R5cGVPZiAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgaXNTZWFsZWQgICAgICAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgam9pbiAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICBrZXlzICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIGFycmF5JywKICAgICAgICAgICAgbGFzdEluZGV4T2YgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBsYXN0SW5kZXggICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIGxlbmd0aCAgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgbWFwICAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBhcnJheScsCiAgICAgICAgICAgIG5vdyAgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgcGFyc2UgICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHBvcCAgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBwcmV2ZW50RXh0ZW5zaW9ucyAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlOiAnZnVuY3Rpb24gYm9vbGVhbicsCiAgICAgICAgICAgIHByb3RvdHlwZSAgICAgICAgICAgOiAnb2JqZWN0JywKICAgICAgICAgICAgcHVzaCAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICByZWR1Y2UgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgcmVkdWNlUmlnaHQgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHJldmVyc2UgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZWFsICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIHNldERhdGUgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXREYXkgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0RnVsbFllYXIgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldEhvdXJzICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRNaWxsaXNlY29uZHMgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0TWludXRlcyAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldE1vbnRoICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRTZWNvbmRzICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VGltZSAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFRpbWV6b25lT2Zmc2V0ICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRVVENEYXRlICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VVRDRGF5ICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFVUQ0Z1bGxZZWFyICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRVVENIb3VycyAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VVRDTWlsbGlzZWNvbmRzICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFVUQ01pbnV0ZXMgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRVVENNb250aCAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VVRDU2Vjb25kcyAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFllYXIgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzaGlmdCAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2xpY2UgICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNvbWUgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gYm9vbGVhbicsCiAgICAgICAgICAgIHNvcnQgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzcGxpY2UgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc3RyaW5naWZ5ICAgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICBzdWJzdHIgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHN1YnN0cmluZyAgICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdGVzdCAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgdG9EYXRlU3RyaW5nICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b0V4cG9uZW50aWFsICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvRml4ZWQgICAgICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9KU09OICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHRvSVNPU3RyaW5nICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9Mb2NhbGVEYXRlU3RyaW5nICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b0xvY2FsZUxvd2VyQ2FzZSAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvTG9jYWxlVXBwZXJDYXNlICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9Mb2NhbGVTdHJpbmcgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b0xvY2FsZVRpbWVTdHJpbmcgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvTG93ZXJDYXNlICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9QcmVjaXNpb24gICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b1RpbWVTdHJpbmcgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvVXBwZXJDYXNlICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9VVENTdHJpbmcgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0cmltICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHVuc2hpZnQgICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgdmFsdWVPZiAgICAgICAgICAgICA6ICdmdW5jdGlvbicKICAgICAgICB9LAoKICAgICAgICBzdHJpY3RfbW9kZSwKICAgICAgICBzeW50YXggPSB7fSwKICAgICAgICB0YWIsCiAgICAgICAgdG9rZW4sCi8vICAgICAgICAgdHlwZV9zdGF0ZV9jaGFuZ2UsCiAgICAgICAgdXJscywKICAgICAgICB2YXJfbW9kZSwKICAgICAgICB3YXJuaW5ncywKCi8vIHdpZGdldCBjb250YWlucyB0aGUgZ2xvYmFsIG5hbWVzIHdoaWNoIGFyZSBwcm92aWRlZCB0byBhIFlhaG9vCi8vIChmbmEgS29uZmFidWxhdG9yKSB3aWRnZXQuCgogICAgICAgIHdpZGdldCA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICdhbGVydCcsICdhbmltYXRvcicsICdhcHBsZVNjcmlwdCcsICdiZWVwJywgJ2J5dGVzVG9VSVN0cmluZycsCiAgICAgICAgICAgICdDYW52YXMnLCAnY2hvb3NlQ29sb3InLCAnY2hvb3NlRmlsZScsICdjaG9vc2VGb2xkZXInLAogICAgICAgICAgICAnY2xvc2VXaWRnZXQnLCAnQ09NJywgJ2NvbnZlcnRQYXRoVG9IRlMnLCAnY29udmVydFBhdGhUb1BsYXRmb3JtJywKICAgICAgICAgICAgJ0N1c3RvbUFuaW1hdGlvbicsICdlc2NhcGUnLCAnRmFkZUFuaW1hdGlvbicsICdmaWxlc3lzdGVtJywgJ0ZsYXNoJywKICAgICAgICAgICAgJ2ZvY3VzV2lkZ2V0JywgJ2Zvcm0nLCAnRm9ybUZpZWxkJywgJ0ZyYW1lJywgJ0hvdEtleScsICdJbWFnZScsCiAgICAgICAgICAgICdpbmNsdWRlJywgJ2lzQXBwbGljYXRpb25SdW5uaW5nJywgJ2lUdW5lcycsICdrb25mYWJ1bGF0b3JWZXJzaW9uJywKICAgICAgICAgICAgJ2xvZycsICdtZDUnLCAnTWVudUl0ZW0nLCAnTW92ZUFuaW1hdGlvbicsICdvcGVuVVJMJywgJ3BsYXknLAogICAgICAgICAgICAnUG9pbnQnLCAncG9wdXBNZW51JywgJ3ByZWZlcmVuY2VHcm91cHMnLCAncHJlZmVyZW5jZXMnLCAncHJpbnQnLAogICAgICAgICAgICAncHJvbXB0JywgJ3JhbmRvbScsICdSZWN0YW5nbGUnLCAncmVsb2FkV2lkZ2V0JywgJ1Jlc2l6ZUFuaW1hdGlvbicsCiAgICAgICAgICAgICdyZXNvbHZlUGF0aCcsICdyZXN1bWVVcGRhdGVzJywgJ1JvdGF0ZUFuaW1hdGlvbicsICdydW5Db21tYW5kJywKICAgICAgICAgICAgJ3J1bkNvbW1hbmRJbkJnJywgJ3NhdmVBcycsICdzYXZlUHJlZmVyZW5jZXMnLCAnc2NyZWVuJywKICAgICAgICAgICAgJ1Njcm9sbEJhcicsICdzaG93V2lkZ2V0UHJlZmVyZW5jZXMnLCAnc2xlZXAnLCAnc3BlYWsnLCAnU3R5bGUnLAogICAgICAgICAgICAnc3VwcHJlc3NVcGRhdGVzJywgJ3N5c3RlbScsICd0ZWxsV2lkZ2V0JywgJ1RleHQnLCAnVGV4dEFyZWEnLAogICAgICAgICAgICAnVGltZXInLCAndW5lc2NhcGUnLCAndXBkYXRlTm93JywgJ1VSTCcsICdXZWInLCAnd2lkZ2V0JywgJ1dpbmRvdycsCiAgICAgICAgICAgICdYTUxET00nLCAnWE1MSHR0cFJlcXVlc3QnLCAneWFob29DaGVja0xvZ2luJywgJ3lhaG9vTG9naW4nLAogICAgICAgICAgICAneWFob29Mb2dvdXQnCiAgICAgICAgXSwgdHJ1ZSksCgogICAgICAgIHdpbmRvd3MgPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAnQWN0aXZlWE9iamVjdCcsICdDU2NyaXB0JywgJ0RlYnVnJywgJ0VudW1lcmF0b3InLCAnU3lzdGVtJywKICAgICAgICAgICAgJ1ZCQXJyYXknLCAnV1NjcmlwdCcsICdXU0gnCiAgICAgICAgXSwgZmFsc2UpLAoKLy8gIHhtb2RlIGlzIHVzZWQgdG8gYWRhcHQgdG8gdGhlIGV4Y2VwdGlvbnMgaW4gaHRtbCBwYXJzaW5nLgovLyAgSXQgY2FuIGhhdmUgdGhlc2Ugc3RhdGVzOgovLyAgICAgICcnICAgICAgLmpzIHNjcmlwdCBmaWxlCi8vICAgICAgJ2h0bWwnCi8vICAgICAgJ291dGVyJwovLyAgICAgICdzY3JpcHQnCi8vICAgICAgJ3N0eWxlJwovLyAgICAgICdzY3JpcHRzdHJpbmcnCi8vICAgICAgJ3N0eWxlcHJvcGVydHknCgogICAgICAgIHhtb2RlLAogICAgICAgIHhxdW90ZSwKCi8vIFJlZ3VsYXIgZXhwcmVzc2lvbnMuIFNvbWUgb2YgdGhlc2UgYXJlIHN0dXBpZGx5IGxvbmcuCgovLyB1bnNhZmUgY29tbWVudCBvciBzdHJpbmcKICAgICAgICBheCA9IC9AY2N8PFwvP3xzY3JpcHR8XF1ccypcXXw8XHMqIXwmbHQvaSwKLy8gY2FycmlhZ2UgcmV0dXJuLCBvciBjYXJyaWFnZSByZXR1cm4gbGluZWZlZWQKICAgICAgICBjcnggPSAvXHIvZywKICAgICAgICBjcmxmeCA9IC9cclxuL2csCi8vIHVuc2FmZSBjaGFyYWN0ZXJzIHRoYXQgYXJlIHNpbGVudGx5IGRlbGV0ZWQgYnkgb25lIG9yIG1vcmUgYnJvd3NlcnMKICAgICAgICBjeCA9IC9bXHUwMDAwLVx1MDAxZlx1MDA3Zi1cdTAwOWZcdTAwYWRcdTA2MDAtXHUwNjA0XHUwNzBmXHUxN2I0XHUxN2I1XHUyMDBjLVx1MjAwZlx1MjAyOC1cdTIwMmZcdTIwNjAtXHUyMDZmXHVmZWZmXHVmZmYwLVx1ZmZmZl0vLAovLyBxdWVyeSBjaGFyYWN0ZXJzIGZvciBpZHMKICAgICAgICBkeCA9IC9bXFtcXVwvXFwiJyo8Pi4mOigpe30rPSNdLywKLy8gaHRtbCB0b2tlbgogICAgICAgIGh4ID0gL15ccyooWyciPT5cLyYjXXw8KD86XC98XCEoPzotLSk/KT98W2EtekEtWl1bYS16QS1aMC05X1wtOl0qfFswLTldK3wtLSkvLAovLyBpZGVudGlmaWVyCiAgICAgICAgaXggPSAvXihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopJC8sCi8vIGphdmFzY3JpcHQgdXJsCiAgICAgICAganggPSAvXig/OmphdmFzY3JpcHR8anNjcmlwdHxlY21hc2NyaXB0fHZic2NyaXB0fG1vY2hhfGxpdmVzY3JpcHQpXHMqOi9pLAovLyBzdGFyIHNsYXNoCiAgICAgICAgbHggPSAvXCpcL3xcL1wqLywKLy8gY2hhcmFjdGVycyBpbiBzdHJpbmdzIHRoYXQgbmVlZCBlc2NhcGVtZW50CiAgICAgICAgbnggPSAvW1x1MDAwMC1cdTAwMWYnXFxcdTAwN2YtXHUwMDlmXHUwMGFkXHUwNjAwLVx1MDYwNFx1MDcwZlx1MTdiNFx1MTdiNVx1MjAwYy1cdTIwMGZcdTIwMjgtXHUyMDJmXHUyMDYwLVx1MjA2Zlx1ZmVmZlx1ZmZmMC1cdWZmZmZdL2csCi8vIG91dGVyIGh0bWwgdG9rZW4KICAgICAgICBveCA9IC9bPiZdfDxbXC8hXT98LS0vLAovLyBhdHRyaWJ1dGVzIGNoYXJhY3RlcnMKICAgICAgICBxeCA9IC9bXmEtekEtWjAtOStcLV9cLyBdLywKLy8gc3R5bGUKICAgICAgICBzeCA9IC9eXHMqKFt7fTojJS49LD4rXFtcXUAoKSInO118XCo9P3xcJD18XHw9fFxePXx+PXxbYS16QS1aX11bYS16QS1aMC05X1wtXSp8WzAtOV0rfDxcL3xcL1wqKS8sCiAgICAgICAgc3N4ID0gL15ccyooW0AjISInfTs6XC0lLj0sK1xbXF0oKSpfXXxbYS16QS1aXVthLXpBLVowLTkuX1wtXSp8XC9cKj98XGQrKD86XC5cZCspP3w8XC8pLywKLy8gdG9rZW4KICAgICAgICB0eCA9IC9eXHMqKFsoKXt9XFsuLDo7JyJ+XD9cXSNAXXw9PT89P3xcLyhcKihqc2xpbnR8cHJvcGVydGllc3xwcm9wZXJ0eXxtZW1iZXJzP3xnbG9iYWxzPyk/fD18XC8pP3xcKltcLz1dP3xcKyg/Oj18XCsrKT98LSg/Oj18LSspP3wlPT98JlsmPV0/fFx8W3w9XT98Pj4/Pj89P3w8KFtcLz0hXXxcIShcW3wtLSk/fDw9Pyk/fFxePT98XCE9Pz0/fFthLXpBLVpfJF1bYS16QS1aMC05XyRdKnxbMC05XSsoW3hYXVswLTlhLWZBLUZdK3xcLlswLTldKik/KFtlRV1bK1wtXT9bMC05XSspPykvLAovLyB1cmwgYmFkbmVzcwogICAgICAgIHV4ID0gLyZ8XCt8XHUwMEFEfFwuXC58XC9cKnwlW147XXxiYXNlNjR8dXJsfGV4cHJlc3Npb258ZGF0YXxtYWlsdG98c2NyaXB0L2ksCgogICAgICAgIHJ4ID0gewogICAgICAgICAgICBvdXRlcjogaHgsCiAgICAgICAgICAgIGh0bWw6IGh4LAogICAgICAgICAgICBzdHlsZTogc3gsCiAgICAgICAgICAgIHN0eWxlcHJvcGVydHk6IHNzeAogICAgICAgIH07CgoKICAgIGZ1bmN0aW9uIEYoKSB7fSAgICAgLy8gVXNlZCBieSBPYmplY3QuY3JlYXRlCgovLyBQcm92aWRlIGNyaXRpY2FsIEVTNSBmdW5jdGlvbnMgdG8gRVMzLgoKICAgIGlmICh0eXBlb2YgQXJyYXkucHJvdG90eXBlLmZpbHRlciAhPT0gJ2Z1bmN0aW9uJykgewogICAgICAgIEFycmF5LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZikgewogICAgICAgICAgICB2YXIgaSwgbGVuZ3RoID0gdGhpcy5sZW5ndGgsIHJlc3VsdCA9IFtdLCB2YWx1ZTsKICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpc1tpXTsKICAgICAgICAgICAgICAgICAgICBpZiAoZih2YWx1ZSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkgewogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7CiAgICAgICAgfTsKICAgIH0KCiAgICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZikgewogICAgICAgICAgICB2YXIgaSwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7CiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgICAgICBmKHRoaXNbaV0pOwogICAgICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9OwogICAgfQoKICAgIGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSAhPT0gJ2Z1bmN0aW9uJykgewogICAgICAgIEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbiAobykgewogICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShvKSA9PT0gJ1tvYmplY3QgQXJyYXldJzsKICAgICAgICB9OwogICAgfQoKICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKE9iamVjdCwgJ2NyZWF0ZScpKSB7CiAgICAgICAgT2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChvKSB7CiAgICAgICAgICAgIEYucHJvdG90eXBlID0gbzsKICAgICAgICAgICAgcmV0dXJuIG5ldyBGKCk7CiAgICAgICAgfTsKICAgIH0KCiAgICBpZiAodHlwZW9mIE9iamVjdC5rZXlzICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgT2JqZWN0LmtleXMgPSBmdW5jdGlvbiAobykgewogICAgICAgICAgICB2YXIgYXJyYXkgPSBbXSwga2V5OwogICAgICAgICAgICBmb3IgKGtleSBpbiBvKSB7CiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGtleSkpIHsKICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGtleSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIGFycmF5OwogICAgICAgIH07CiAgICB9CgogICAgaWYgKHR5cGVvZiBTdHJpbmcucHJvdG90eXBlLmVudGl0eWlmeSAhPT0gJ2Z1bmN0aW9uJykgewogICAgICAgIFN0cmluZy5wcm90b3R5cGUuZW50aXR5aWZ5ID0gZnVuY3Rpb24gKCkgewogICAgICAgICAgICByZXR1cm4gdGhpcwogICAgICAgICAgICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JykKICAgICAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JykKICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7CiAgICAgICAgfTsKICAgIH0KCiAgICBpZiAodHlwZW9mIFN0cmluZy5wcm90b3R5cGUuaXNBbHBoYSAhPT0gJ2Z1bmN0aW9uJykgewogICAgICAgIFN0cmluZy5wcm90b3R5cGUuaXNBbHBoYSA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgcmV0dXJuICh0aGlzID49ICdhJyAmJiB0aGlzIDw9ICd6XHVmZmZmJykgfHwKICAgICAgICAgICAgICAgICh0aGlzID49ICdBJyAmJiB0aGlzIDw9ICdaXHVmZmZmJyk7CiAgICAgICAgfTsKICAgIH0KCiAgICBpZiAodHlwZW9mIFN0cmluZy5wcm90b3R5cGUuaXNEaWdpdCAhPT0gJ2Z1bmN0aW9uJykgewogICAgICAgIFN0cmluZy5wcm90b3R5cGUuaXNEaWdpdCA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgcmV0dXJuICh0aGlzID49ICcwJyAmJiB0aGlzIDw9ICc5Jyk7CiAgICAgICAgfTsKICAgIH0KCiAgICBpZiAodHlwZW9mIFN0cmluZy5wcm90b3R5cGUuc3VwcGxhbnQgIT09ICdmdW5jdGlvbicpIHsKICAgICAgICBTdHJpbmcucHJvdG90eXBlLnN1cHBsYW50ID0gZnVuY3Rpb24gKG8pIHsKICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXHsoW157fV0qKVx9L2csIGZ1bmN0aW9uIChhLCBiKSB7CiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBvW2JdOwogICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXBsYWNlbWVudCA9PT0gJ3N0cmluZycgfHwKICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcmVwbGFjZW1lbnQgPT09ICdudW1iZXInID8gcmVwbGFjZW1lbnQgOiBhOwogICAgICAgICAgICB9KTsKICAgICAgICB9OwogICAgfQoKCiAgICBmdW5jdGlvbiBzYW5pdGl6ZShhKSB7CgovLyAgRXNjYXBpZnkgYSB0cm91Ymxlc29tZSBjaGFyYWN0ZXIuCgogICAgICAgIHJldHVybiBlc2NhcGVzW2FdIHx8CiAgICAgICAgICAgICdcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpOwogICAgfQoKCiAgICBmdW5jdGlvbiBhZGRfdG9fcHJlZGVmaW5lZChncm91cCkgewogICAgICAgIE9iamVjdC5rZXlzKGdyb3VwKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7CiAgICAgICAgICAgIHByZWRlZmluZWRbbmFtZV0gPSBncm91cFtuYW1lXTsKICAgICAgICB9KTsKICAgIH0KCgogICAgZnVuY3Rpb24gYXNzdW1lKCkgewogICAgICAgIGlmICghb3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgaWYgKG9wdGlvbi5yaGlubykgewogICAgICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQocmhpbm8pOwogICAgICAgICAgICAgICAgb3B0aW9uLnJoaW5vID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG9wdGlvbi5kZXZlbCkgewogICAgICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQoZGV2ZWwpOwogICAgICAgICAgICAgICAgb3B0aW9uLmRldmVsID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG9wdGlvbi5icm93c2VyKSB7CiAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZChicm93c2VyKTsKICAgICAgICAgICAgICAgIG9wdGlvbi5icm93c2VyID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG9wdGlvbi5jb21tb25qcykgewogICAgICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQoY29tbW9uanMpOwogICAgICAgICAgICAgICAgb3B0aW9uLmNvbW1vbmpzID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG9wdGlvbi53aW5kb3dzKSB7CiAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZCh3aW5kb3dzKTsKICAgICAgICAgICAgICAgIG9wdGlvbi53aW5kb3dzID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG9wdGlvbi5ub2RlKSB7CiAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZChub2RlKTsKICAgICAgICAgICAgICAgIG9wdGlvbi5ub2RlID0gZmFsc2U7CiAgICAgICAgICAgICAgICBub2RlX2pzID0gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAob3B0aW9uLndpZGdldCkgewogICAgICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQod2lkZ2V0KTsKICAgICAgICAgICAgICAgIG9wdGlvbi53aWRnZXQgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBpZiAob3B0aW9uLnR5cGUpIHsKICAgICAgICAgICAgb3B0aW9uLmNvbmZ1c2lvbiA9IHRydWU7CiAgICAgICAgfQogICAgfQoKCi8vIFByb2R1Y2UgYW4gZXJyb3Igd2FybmluZy4KCiAgICBmdW5jdGlvbiBhcnRpZmFjdCh0b2spIHsKICAgICAgICBpZiAoIXRvaykgewogICAgICAgICAgICB0b2sgPSBuZXh0X3Rva2VuOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdG9rLm51bWJlciB8fCB0b2suc3RyaW5nOwogICAgfQoKICAgIGZ1bmN0aW9uIHF1aXQobWVzc2FnZSwgbGluZSwgY2hhcmFjdGVyKSB7CiAgICAgICAgdGhyb3cgewogICAgICAgICAgICBuYW1lOiAnSlNMaW50RXJyb3InLAogICAgICAgICAgICBsaW5lOiBsaW5lLAogICAgICAgICAgICBjaGFyYWN0ZXI6IGNoYXJhY3RlciwKICAgICAgICAgICAgbWVzc2FnZTogYnVuZGxlLnNjYW5uZWRfYV9iLnN1cHBsYW50KHsKICAgICAgICAgICAgICAgIGE6IG1lc3NhZ2UsCiAgICAgICAgICAgICAgICBiOiBNYXRoLmZsb29yKChsaW5lIC8gbGluZXMubGVuZ3RoKSAqIDEwMCkKICAgICAgICAgICAgfSkKICAgICAgICB9OwogICAgfQoKICAgIGZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgb2ZmZW5kZXIsIGEsIGIsIGMsIGQpIHsKICAgICAgICB2YXIgY2hhcmFjdGVyLCBsaW5lLCB3YXJuaW5nOwogICAgICAgIG9mZmVuZGVyID0gb2ZmZW5kZXIgfHwgbmV4dF90b2tlbjsgIC8vIGB+CiAgICAgICAgbGluZSA9IG9mZmVuZGVyLmxpbmUgfHwgMDsKICAgICAgICBjaGFyYWN0ZXIgPSBvZmZlbmRlci5mcm9tIHx8IDA7CiAgICAgICAgd2FybmluZyA9IHsKICAgICAgICAgICAgaWQ6ICcoZXJyb3IpJywKICAgICAgICAgICAgcmF3OiBidW5kbGVbbWVzc2FnZV0gfHwgbWVzc2FnZSwKICAgICAgICAgICAgZXZpZGVuY2U6IGxpbmVzW2xpbmUgLSAxXSB8fCAnJywKICAgICAgICAgICAgbGluZTogbGluZSwKICAgICAgICAgICAgY2hhcmFjdGVyOiBjaGFyYWN0ZXIsCiAgICAgICAgICAgIGE6IGEgfHwgKG9mZmVuZGVyLmlkID09PSAnKG51bWJlciknCiAgICAgICAgICAgICAgICA/IFN0cmluZyhvZmZlbmRlci5udW1iZXIpCiAgICAgICAgICAgICAgICA6IG9mZmVuZGVyLnN0cmluZyksCiAgICAgICAgICAgIGI6IGIsCiAgICAgICAgICAgIGM6IGMsCiAgICAgICAgICAgIGQ6IGQKICAgICAgICB9OwogICAgICAgIHdhcm5pbmcucmVhc29uID0gd2FybmluZy5yYXcuc3VwcGxhbnQod2FybmluZyk7CiAgICAgICAgSlNMSU5ULmVycm9ycy5wdXNoKHdhcm5pbmcpOwogICAgICAgIGlmIChvcHRpb24ucGFzc2ZhaWwpIHsKICAgICAgICAgICAgcXVpdChidW5kbGUuc3RvcHBpbmcsIGxpbmUsIGNoYXJhY3Rlcik7CiAgICAgICAgfQogICAgICAgIHdhcm5pbmdzICs9IDE7CiAgICAgICAgaWYgKHdhcm5pbmdzID49IG9wdGlvbi5tYXhlcnIpIHsKICAgICAgICAgICAgcXVpdChidW5kbGUudG9vX21hbnksIGxpbmUsIGNoYXJhY3Rlcik7CiAgICAgICAgfQogICAgICAgIHJldHVybiB3YXJuaW5nOwogICAgfQoKICAgIGZ1bmN0aW9uIHdhcm5fYXQobWVzc2FnZSwgbGluZSwgY2hhcmFjdGVyLCBhLCBiLCBjLCBkKSB7CiAgICAgICAgcmV0dXJuIHdhcm4obWVzc2FnZSwgewogICAgICAgICAgICBsaW5lOiBsaW5lLAogICAgICAgICAgICBmcm9tOiBjaGFyYWN0ZXIKICAgICAgICB9LCBhLCBiLCBjLCBkKTsKICAgIH0KCiAgICBmdW5jdGlvbiBzdG9wKG1lc3NhZ2UsIG9mZmVuZGVyLCBhLCBiLCBjLCBkKSB7CiAgICAgICAgdmFyIHdhcm5pbmcgPSB3YXJuKG1lc3NhZ2UsIG9mZmVuZGVyLCBhLCBiLCBjLCBkKTsKICAgICAgICBxdWl0KGJ1bmRsZS5zdG9wcGluZywgd2FybmluZy5saW5lLCB3YXJuaW5nLmNoYXJhY3Rlcik7CiAgICB9CgogICAgZnVuY3Rpb24gc3RvcF9hdChtZXNzYWdlLCBsaW5lLCBjaGFyYWN0ZXIsIGEsIGIsIGMsIGQpIHsKICAgICAgICByZXR1cm4gc3RvcChtZXNzYWdlLCB7CiAgICAgICAgICAgIGxpbmU6IGxpbmUsCiAgICAgICAgICAgIGZyb206IGNoYXJhY3RlcgogICAgICAgIH0sIGEsIGIsIGMsIGQpOwogICAgfQoKICAgIGZ1bmN0aW9uIGV4cGVjdGVkX2F0KGF0KSB7CiAgICAgICAgaWYgKCFvcHRpb24ud2hpdGUgJiYgbmV4dF90b2tlbi5mcm9tICE9PSBhdCkgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2F0X2JfYycsIG5leHRfdG9rZW4sICcnLCBhdCwKICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uZnJvbSk7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIGFpbnQoaXQsIG5hbWUsIGV4cGVjdGVkKSB7CiAgICAgICAgaWYgKGl0W25hbWVdICE9PSBleHBlY3RlZCkgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCBpdCwgZXhwZWN0ZWQsIGl0W25hbWVdKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIH0KICAgIH0KCgovLyBsZXhpY2FsIGFuYWx5c2lzIGFuZCB0b2tlbiBjb25zdHJ1Y3Rpb24KCiAgICBsZXggPSAoZnVuY3Rpb24gbGV4KCkgewogICAgICAgIHZhciBjaGFyYWN0ZXIsIGMsIGZyb20sIGxlbmd0aCwgbGluZSwgcG9zLCBzb3VyY2Vfcm93OwoKLy8gUHJpdmF0ZSBsZXggbWV0aG9kcwoKICAgICAgICBmdW5jdGlvbiBuZXh0X2xpbmUoKSB7CiAgICAgICAgICAgIHZhciBhdDsKICAgICAgICAgICAgaWYgKGxpbmUgPj0gbGluZXMubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY2hhcmFjdGVyID0gMTsKICAgICAgICAgICAgc291cmNlX3JvdyA9IGxpbmVzW2xpbmVdOwogICAgICAgICAgICBsaW5lICs9IDE7CiAgICAgICAgICAgIGF0ID0gc291cmNlX3Jvdy5zZWFyY2goLyBcdC8pOwogICAgICAgICAgICBpZiAoYXQgPj0gMCkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgnbWl4ZWQnLCBsaW5lLCBhdCArIDEpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnJlcGxhY2UoL1x0L2csIHRhYik7CiAgICAgICAgICAgIGF0ID0gc291cmNlX3Jvdy5zZWFyY2goY3gpOwogICAgICAgICAgICBpZiAoYXQgPj0gMCkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgndW5zYWZlJywgbGluZSwgYXQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChvcHRpb24ubWF4bGVuICYmIG9wdGlvbi5tYXhsZW4gPCBzb3VyY2Vfcm93Lmxlbmd0aCkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgndG9vX2xvbmcnLCBsaW5lLCBzb3VyY2Vfcm93Lmxlbmd0aCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQoKLy8gUHJvZHVjZSBhIHRva2VuIG9iamVjdC4gIFRoZSB0b2tlbiBpbmhlcml0cyBmcm9tIGEgc3ludGF4IHN5bWJvbC4KCiAgICAgICAgZnVuY3Rpb24gaXQodHlwZSwgdmFsdWUsIHF1b3RlKSB7CiAgICAgICAgICAgIHZhciBpZCwgdGhlX3Rva2VuOwogICAgICAgICAgICBpZiAodHlwZSA9PT0gJyhzdHJpbmcpJyB8fCB0eXBlID09PSAnKHJhbmdlKScpIHsKICAgICAgICAgICAgICAgIGlmIChqeC50ZXN0KHZhbHVlKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VybCcsIGxpbmUsIGZyb20pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoZV90b2tlbiA9IE9iamVjdC5jcmVhdGUoc3ludGF4WygKICAgICAgICAgICAgICAgIHR5cGUgPT09ICcocHVuY3R1YXRvciknIHx8ICh0eXBlID09PSAnKGlkZW50aWZpZXIpJyAmJgogICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3ludGF4LCB2YWx1ZSkpCiAgICAgICAgICAgICAgICAgICAgPyB2YWx1ZQogICAgICAgICAgICAgICAgICAgIDogdHlwZQogICAgICAgICAgICApXSB8fCBzeW50YXhbJyhlcnJvciknXSk7CiAgICAgICAgICAgIGlmICh0eXBlID09PSAnKGlkZW50aWZpZXIpJykgewogICAgICAgICAgICAgICAgdGhlX3Rva2VuLmlkZW50aWZpZXIgPSB0cnVlOwogICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnX19pdGVyYXRvcl9fJyB8fCB2YWx1ZSA9PT0gJ19fcHJvdG9fXycpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCdyZXNlcnZlZF9hJywgbGluZSwgZnJvbSwgdmFsdWUpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uLm5vbWVuICYmCiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZS5jaGFyQXQoMCkgPT09ICdfJyB8fAogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGFyQXQodmFsdWUubGVuZ3RoIC0gMSkgPT09ICdfJykpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdkYW5nbGluZ19hJywgbGluZSwgZnJvbSwgdmFsdWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgICAgICB0aGVfdG9rZW4ubnVtYmVyID0gK3ZhbHVlOwogICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgICAgIHRoZV90b2tlbi5zdHJpbmcgPSBTdHJpbmcodmFsdWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChxdW90ZSkgewogICAgICAgICAgICAgICAgdGhlX3Rva2VuLnF1b3RlID0gcXVvdGU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhlX3Rva2VuLmxpbmUgPSBsaW5lOwogICAgICAgICAgICB0aGVfdG9rZW4uZnJvbSA9IGZyb207CiAgICAgICAgICAgIHRoZV90b2tlbi50aHJ1ID0gY2hhcmFjdGVyOwogICAgICAgICAgICBpZCA9IHRoZV90b2tlbi5pZDsKICAgICAgICAgICAgcHJlcmVnID0gaWQgJiYgKAogICAgICAgICAgICAgICAgKCcoLD06WyEmfD97fTsnLmluZGV4T2YoaWQuY2hhckF0KGlkLmxlbmd0aCAtIDEpKSA+PSAwKSB8fAogICAgICAgICAgICAgICAgaWQgPT09ICdyZXR1cm4nIHx8IGlkID09PSAnY2FzZScKICAgICAgICAgICAgKTsKICAgICAgICAgICAgcmV0dXJuIHRoZV90b2tlbjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIG1hdGNoKHgpIHsKICAgICAgICAgICAgdmFyIGV4ZWMgPSB4LmV4ZWMoc291cmNlX3JvdyksIGZpcnN0OwogICAgICAgICAgICBpZiAoZXhlYykgewogICAgICAgICAgICAgICAgbGVuZ3RoID0gZXhlY1swXS5sZW5ndGg7CiAgICAgICAgICAgICAgICBmaXJzdCA9IGV4ZWNbMV07CiAgICAgICAgICAgICAgICBjID0gZmlyc3QuY2hhckF0KDApOwogICAgICAgICAgICAgICAgc291cmNlX3JvdyA9IHNvdXJjZV9yb3cuc2xpY2UobGVuZ3RoKTsKICAgICAgICAgICAgICAgIGZyb20gPSBjaGFyYWN0ZXIgKyBsZW5ndGggLSBmaXJzdC5sZW5ndGg7CiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gbGVuZ3RoOwogICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0OwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzdHJpbmcoeCkgewogICAgICAgICAgICB2YXIgYywgcG9zID0gMCwgciA9ICcnOwoKICAgICAgICAgICAgZnVuY3Rpb24gaGV4KG4pIHsKICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoc291cmNlX3Jvdy5zdWJzdHIocG9zICsgMSwgbiksIDE2KTsKICAgICAgICAgICAgICAgIHBvcyArPSBuOwogICAgICAgICAgICAgICAgaWYgKGkgPj0gMzIgJiYgaSA8PSAxMjYgJiYKICAgICAgICAgICAgICAgICAgICAgICAgaSAhPT0gMzQgJiYgaSAhPT0gOTIgJiYgaSAhPT0gMzkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICdcXCcpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IG47CiAgICAgICAgICAgICAgICBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgaWYgKGpzb25fbW9kZSAmJiB4ICE9PSAnIicpIHsKICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2V4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICciJyk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGlmICh4cXVvdGUgPT09IHggfHwgKHhtb2RlID09PSAnc2NyaXB0c3RyaW5nJyAmJiAheHF1b3RlKSkgewogICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcocHVuY3R1YXRvciknLCB4KTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA+PSBzb3VyY2Vfcm93Lmxlbmd0aCkgewogICAgICAgICAgICAgICAgICAgIHBvcyA9IDA7CiAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlICE9PSAnaHRtbCcgfHwgIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ3VuY2xvc2VkJywgbGluZSwgZnJvbSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuY2hhckF0KHBvcyk7CiAgICAgICAgICAgICAgICBpZiAoYyA9PT0geCkgewogICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxOwogICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKHBvcyArIDEpOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBpdCgnKHN0cmluZyknLCByLCB4KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChjIDwgJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICdcbicgfHwgYyA9PT0gJ1xyJykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgnY29udHJvbF9hJywKICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgY2hhcmFjdGVyICsgcG9zLCBzb3VyY2Vfcm93LnNsaWNlKDAsIHBvcykpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSB4cXVvdGUpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdiYWRfaHRtbCcsIGxpbmUsIGNoYXJhY3RlciArIHBvcyk7CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc8JykgewogICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiB4bW9kZSA9PT0gJ2h0bWwnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2Fkc2FmZV9hJywgbGluZSwgY2hhcmFjdGVyICsgcG9zLCBjKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZV9yb3cuY2hhckF0KHBvcyArIDEpID09PSAnLycgJiYgKHhtb2RlIHx8IG9wdGlvbi5zYWZlKSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdleHBlY3RlZF9hX2InLCBsaW5lLCBjaGFyYWN0ZXIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPFxcLycsICc8LycpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlX3Jvdy5jaGFyQXQocG9zICsgMSkgPT09ICchJyAmJiAoeG1vZGUgfHwgb3B0aW9uLnNhZmUpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXhwZWN0ZWRfYScsIGxpbmUsIGNoYXJhY3RlciwgJzwhJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnXFwnKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnaHRtbCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdhZHNhZmVfYScsIGxpbmUsIGNoYXJhY3RlciArIHBvcywgYyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhtb2RlID09PSAnc3R5bGVwcm9wZXJ0eScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcG9zICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQocG9zKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgIT09IHgpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXhwZWN0ZWRfYScsIGxpbmUsIGNoYXJhY3RlciwgJ1xcJyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdChwb3MpOwogICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmVzNSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2VzNScsIGxpbmUsIGNoYXJhY3Rlcik7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X2xpbmUoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IC0xOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgeHF1b3RlOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgnYmFkX2h0bWwnLCBsaW5lLCBjaGFyYWN0ZXIgKyBwb3MpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1wnJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uX21vZGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICdcXFwnJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndSc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXgoNCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoanNvbl9tb2RlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnXFx2Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gJ1x2JzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uX21vZGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICdcXHgnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleCgyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGRlc2NhcGVzW2NdOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXhwZWN0ZWRfYScsIGxpbmUsIGNoYXJhY3RlciwgJ1xcJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICByICs9IGM7CiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgIHBvcyArPSAxOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBudW1iZXIoc25pcHBldCkgewogICAgICAgICAgICB2YXIgZGlnaXQ7CiAgICAgICAgICAgIGlmICh4bW9kZSAhPT0gJ3N0eWxlJyAmJiB4bW9kZSAhPT0gJ3N0eWxlcHJvcGVydHknICYmCiAgICAgICAgICAgICAgICAgICAgc291cmNlX3Jvdy5jaGFyQXQoMCkuaXNBbHBoYSgpKSB7CiAgICAgICAgICAgICAgICB3YXJuX2F0KCdleHBlY3RlZF9zcGFjZV9hX2InLAogICAgICAgICAgICAgICAgICAgIGxpbmUsIGNoYXJhY3RlciwgYywgc291cmNlX3Jvdy5jaGFyQXQoMCkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChjID09PSAnMCcpIHsKICAgICAgICAgICAgICAgIGRpZ2l0ID0gc25pcHBldC5jaGFyQXQoMSk7CiAgICAgICAgICAgICAgICBpZiAoZGlnaXQuaXNEaWdpdCgpKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLmlkICE9PSAnLicgJiYgeG1vZGUgIT09ICdzdHlsZXByb3BlcnR5JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsIHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoanNvbl9tb2RlICYmIChkaWdpdCA9PT0gJ3gnIHx8IGRpZ2l0ID09PSAnWCcpKSB7CiAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnMHgnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoc25pcHBldC5zbGljZShzbmlwcGV0Lmxlbmd0aCAtIDEpID09PSAnLicpIHsKICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3RyYWlsaW5nX2RlY2ltYWxfYScsIGxpbmUsIGNoYXJhY3Rlciwgc25pcHBldCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHhtb2RlICE9PSAnc3R5bGUnKSB7CiAgICAgICAgICAgICAgICBkaWdpdCA9ICtzbmlwcGV0OwogICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShkaWdpdCkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdiYWRfbnVtYmVyJywgbGluZSwgY2hhcmFjdGVyLCBzbmlwcGV0KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHNuaXBwZXQgPSBkaWdpdDsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gaXQoJyhudW1iZXIpJywgc25pcHBldCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBjb21tZW50KHNuaXBwZXQpIHsKICAgICAgICAgICAgaWYgKGNvbW1lbnRzX29mZiB8fCBzcmMgfHwgKHhtb2RlICYmIHhtb2RlICE9PSAnc2NyaXB0JyAmJgogICAgICAgICAgICAgICAgICAgIHhtb2RlICE9PSAnc3R5bGUnICYmIHhtb2RlICE9PSAnc3R5bGVwcm9wZXJ0eScpKSB7CiAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2NvbW1lbnQnLCBsaW5lLCBjaGFyYWN0ZXIpOwogICAgICAgICAgICB9IGVsc2UgaWYgKHhtb2RlID09PSAnc2NyaXB0JyAmJiAvPFwvL2kudGVzdChzb3VyY2Vfcm93KSkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnPFwvJyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnNhZmUgJiYgYXgudGVzdChzbmlwcGV0KSkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgnZGFuZ2Vyb3VzX2NvbW1lbnQnLCBsaW5lLCBjaGFyYWN0ZXIpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZWdleHAoKSB7CiAgICAgICAgICAgIHZhciBiLAogICAgICAgICAgICAgICAgYml0LAogICAgICAgICAgICAgICAgY2FwdHVyZXMgPSAwLAogICAgICAgICAgICAgICAgZGVwdGggPSAwLAogICAgICAgICAgICAgICAgZmxhZywKICAgICAgICAgICAgICAgIGhpZ2gsCiAgICAgICAgICAgICAgICBsZW5ndGggPSAwLAogICAgICAgICAgICAgICAgbG93LAogICAgICAgICAgICAgICAgcXVvdGU7CiAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgIGIgPSB0cnVlOwogICAgICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCk7CiAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgIHN3aXRjaCAoYykgewogICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCd1bmNsb3NlZF9yZWdleHAnLCBsaW5lLCBmcm9tKTsKICAgICAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgICAgICBjYXNlICcvJzoKICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPiAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXNjYXBlZF9hJywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGZyb20gKyBsZW5ndGgsICcvJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LnNsaWNlKDAsIGxlbmd0aCAtIDEpOwogICAgICAgICAgICAgICAgICAgIGZsYWcgPSBPYmplY3QuY3JlYXRlKHJlZ2V4cF9mbGFnKTsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZmxhZ1tzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgICAgICAgICBmbGFnW3NvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCldID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKS5pc0FscGhhKCkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgndW5leHBlY3RlZF9hJywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGZyb20sIHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gbGVuZ3RoOwogICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGxlbmd0aCk7CiAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBzb3VyY2Vfcm93LmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICBpZiAocXVvdGUgPT09ICcvJyB8fCBxdW90ZSA9PT0gJyonKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ2NvbmZ1c2luZ19yZWdleHAnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHJldHVybiBpdCgnKHJlZ2V4cCknLCBjKTsKICAgICAgICAgICAgICAgIGNhc2UgJ1xcJzoKICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICBpZiAoYyA8ICcgJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdjb250cm9sX2EnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgU3RyaW5nKGMpKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc8JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLnVuZXhwZWN0ZWRfYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcJwogICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJygnOgogICAgICAgICAgICAgICAgICAgIGRlcHRoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgYiA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpID09PSAnPycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSkgewogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICc6JzoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnPSc6CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyEnOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmV4cGVjdGVkX2FfYiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGgsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzonLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlcyArPSAxOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ3wnOgogICAgICAgICAgICAgICAgICAgIGIgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJyknOgogICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PT0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBmcm9tICsgbGVuZ3RoLCAnKScpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoIC09IDE7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnICc6CiAgICAgICAgICAgICAgICAgICAgcG9zID0gMTsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSA9PT0gJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA+IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndXNlX2JyYWNlcycsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBmcm9tICsgbGVuZ3RoLCBwb3MpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ1snOgogICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpOwogICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnXicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLnJlZ2V4cCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgnaW5zZWN1cmVfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgYyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSA9PT0gJ10nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgJ14nKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBiaXQgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJ10nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2VtcHR5X2NsYXNzJywgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGggLSAxKTsKICAgICAgICAgICAgICAgICAgICAgICAgYml0ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICB9CmtsYXNzOiAgICAgICAgICAgICAgZG8gewogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYykgewogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdbJzoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnXic6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgYyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy0nOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpdCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGZyb20gKyBsZW5ndGgsICctJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICddJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYml0KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5lc2NhcGVkX2EnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBmcm9tICsgbGVuZ3RoIC0gMSwgJy0nKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGtsYXNzOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdcXCc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjIDwgJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmNvbnRyb2xfYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArIGxlbmd0aCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGMpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJzwnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLnVuZXhwZWN0ZWRfYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArIGxlbmd0aCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcJwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCAtIDEsICcvJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJzwnOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnc2NyaXB0JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnIScgfHwgYyA9PT0gJy8nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUuaHRtbF9jb25mdXNpb25fYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChjKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJy4nOgogICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLnJlZ2V4cCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdpbnNlY3VyZV9hJywgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGgsIGMpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ10nOgogICAgICAgICAgICAgICAgY2FzZSAnPyc6CiAgICAgICAgICAgICAgICBjYXNlICd7JzoKICAgICAgICAgICAgICAgIGNhc2UgJ30nOgogICAgICAgICAgICAgICAgY2FzZSAnKyc6CiAgICAgICAgICAgICAgICBjYXNlICcqJzoKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGgsIGMpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnPCc6CiAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnc2NyaXB0JykgewogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICchJyB8fCBjID09PSAnLycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmh0bWxfY29uZnVzaW9uX2EsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMKICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoYikgewogICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgJz8nOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJysnOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJyonOgogICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkgPT09ICc/JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6CiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPCAnMCcgfHwgYyA+ICc5JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUuZXhwZWN0ZWRfbnVtYmVyX2EsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMKICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGxvdyA9ICtjOwogICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjIDwgJzAnIHx8IGMgPiAnOScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ID0gK2MgKyAobG93ICogMTApOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2ggPSBsb3c7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaCA9IEluZmluaXR5OwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoID0gK2M7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPCAnMCcgfHwgYyA+ICc5JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2ggPSArYyArIChoaWdoICogMTApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSAhPT0gJ30nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bmRsZS5leHBlY3RlZF9hX2IsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JywKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjCiAgICAgICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkgPT09ICc/JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvdyA+IGhpZ2gpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLm5vdF9ncmVhdGVyLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArIGxlbmd0aCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3csCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaAogICAgICAgICAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuc2xpY2UoMCwgbGVuZ3RoIC0gMSk7CiAgICAgICAgICAgIGNoYXJhY3RlciArPSBsZW5ndGg7CiAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGxlbmd0aCk7CiAgICAgICAgICAgIHJldHVybiBpdCgnKHJlZ2V4cCknLCBjKTsKICAgICAgICB9CgovLyBQdWJsaWMgbGV4IG1ldGhvZHMKCiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHNvdXJjZSkgewogICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICAgICAgbGluZXMgPSBzb3VyY2UKICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoY3JsZngsICdcbicpCiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKGNyeCwgJ1xuJykKICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdcbicpOwogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICBsaW5lcyA9IHNvdXJjZTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGxpbmUgPSAwOwogICAgICAgICAgICAgICAgbmV4dF9saW5lKCk7CiAgICAgICAgICAgICAgICBmcm9tID0gMTsKICAgICAgICAgICAgfSwKCiAgICAgICAgICAgIHJhbmdlOiBmdW5jdGlvbiAoYmVnaW4sIGVuZCkgewogICAgICAgICAgICAgICAgdmFyIGMsIHZhbHVlID0gJyc7CiAgICAgICAgICAgICAgICBmcm9tID0gY2hhcmFjdGVyOwogICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cuY2hhckF0KDApICE9PSBiZWdpbikgewogICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ2V4cGVjdGVkX2FfYicsIGxpbmUsIGNoYXJhY3RlciwgYmVnaW4sCiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cuY2hhckF0KDApKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93ID0gc291cmNlX3Jvdy5zbGljZSgxKTsKICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQoMCk7CiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgnbWlzc2luZ19hJywgbGluZSwgY2hhcmFjdGVyLCBjKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSBlbmQ6CiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKDEpOwogICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcocmFuZ2UpJywgdmFsdWUpOwogICAgICAgICAgICAgICAgICAgIGNhc2UgeHF1b3RlOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xcJzoKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCBjKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGM7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCgovLyB0b2tlbiAtLSB0aGlzIGlzIGNhbGxlZCBieSBhZHZhbmNlIHRvIGdldCB0aGUgbmV4dCB0b2tlbi4KCiAgICAgICAgICAgIHRva2VuOiBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgICAgICB2YXIgYywgaSwgc25pcHBldDsKCiAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzb3VyY2Vfcm93KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV4dF9saW5lKCkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdCgnKGVuZCknKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB3aGlsZSAoeG1vZGUgPT09ICdvdXRlcicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHNvdXJjZV9yb3cuc2VhcmNoKG94KTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGkpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcoZW5kKScsICcnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBzbmlwcGV0ID0gbWF0Y2gocnhbeG1vZGVdIHx8IHR4KTsKICAgICAgICAgICAgICAgICAgICBpZiAoIXNuaXBwZXQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2Vfcm93LmNoYXJBdCgwKSA9PT0gJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnICcpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSAnJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93LmNoYXJBdCgwKSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewoKLy8gICAgICBpZGVudGlmaWVyCgogICAgICAgICAgICAgICAgICAgICAgICBjID0gc25pcHBldC5jaGFyQXQoMCk7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjLmlzQWxwaGEoKSB8fCBjID09PSAnXycgfHwgYyA9PT0gJyQnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQoJyhpZGVudGlmaWVyKScsIHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgICAgICB9CgovLyAgICAgIG51bWJlcgoKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMuaXNEaWdpdCgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyKHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc25pcHBldCkgewoKLy8gICAgICBzdHJpbmcKCiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyInOgogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICInIjoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcoc25pcHBldCk7CgovLyAgICAgIC8vIGNvbW1lbnQKCiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy8vJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQoc291cmNlX3Jvdyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93ID0gJyc7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKCi8vICAgICAgLyogY29tbWVudAoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyonOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBzb3VyY2Vfcm93LnNlYXJjaChseCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudChzb3VyY2Vfcm93KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ3VuY2xvc2VkX2NvbW1lbnQnLCBsaW5lLCBjaGFyYWN0ZXIpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQoc291cmNlX3Jvdy5zbGljZSgwLCBpKSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gaSArIDI7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQoaSkgPT09ICcvJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ25lc3RlZF9jb21tZW50JywgbGluZSwgY2hhcmFjdGVyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGkgKyAyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwovLyAgICAgIC8KICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4uaWQgPT09ICcvPScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUuc2xhc2hfZXF1YWwsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXJlZwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcmVnZXhwKCkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGl0KCcocHVuY3R1YXRvciknLCBzbmlwcGV0KTsKCi8vICAgICAgcHVuY3R1YXRvcgoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnPCEtLSc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBsaW5lOwovLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gY2hhcmFjdGVyOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBzb3VyY2Vfcm93LmluZGV4T2YoJy0tJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHNvdXJjZV9yb3cuaW5kZXhPZignPCEnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ25lc3RlZF9jb21tZW50JywKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGNoYXJhY3RlciArIGkpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ3VuY2xvc2VkX2NvbW1lbnQnLCBsZW5ndGgsIGMpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IHNvdXJjZV9yb3cuaW5kZXhPZignPCEnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPj0gMCAmJiBsZW5ndGggPCBpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgnbmVzdGVkX2NvbW1lbnQnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBjaGFyYWN0ZXIgKyBsZW5ndGgpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IGk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQoaSArIDIpICE9PSAnPicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCdleHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnLS0+Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGkgKyAzKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcjJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4bW9kZSA9PT0gJ2h0bWwnIHx8IHhtb2RlID09PSAnc3R5bGVwcm9wZXJ0eScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjIDwgJzAnIHx8IGMgPiAnOScpICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGMgPCAnYScgfHwgYyA+ICdmJykgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYyA8ICdBJyB8fCBjID4gJ0YnKSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKDEpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmlwcGV0ICs9IGM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbmlwcGV0Lmxlbmd0aCAhPT0gNCAmJiBzbmlwcGV0Lmxlbmd0aCAhPT0gNykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdiYWRfY29sb3JfYScsIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLCBzbmlwcGV0KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcoY29sb3IpJywgc25pcHBldCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQoJyhwdW5jdHVhdG9yKScsIHNuaXBwZXQpOwoKICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4bW9kZSA9PT0gJ291dGVyJyAmJiBjID09PSAnJicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93ID0gc291cmNlX3Jvdy5zbGljZSgxKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKDEpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJzsnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGMgPj0gJ2EnICYmIGMgPD0gJ3onKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPT09ICcjJykpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ2JhZF9lbnRpdHknLCBsaW5lLCBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcik7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQoJyhwdW5jdHVhdG9yKScsIHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfTsKICAgIH0oKSk7CgoKICAgIGZ1bmN0aW9uIGFkZF9sYWJlbCh0b2tlbiwga2luZCwgbmFtZSkgewoKLy8gRGVmaW5lIHRoZSBzeW1ib2wgaW4gdGhlIGN1cnJlbnQgZnVuY3Rpb24gaW4gdGhlIGN1cnJlbnQgc2NvcGUuCgogICAgICAgIG5hbWUgPSBuYW1lIHx8IHRva2VuLnN0cmluZzsKCi8vIEdsb2JhbCB2YXJpYWJsZXMgY2Fubm90IGJlIGNyZWF0ZWQgaW4gdGhlIHNhZmUgc3Vic2V0LiBJZiBhIGdsb2JhbCB2YXJpYWJsZQovLyBhbHJlYWR5IGV4aXN0cywgZG8gbm90aGluZy4gSWYgaXQgaXMgcHJlZGVmaW5lZCwgZGVmaW5lIGl0LgoKICAgICAgICBpZiAoZnVuY3QgPT09IGdsb2JhbF9mdW5jdCkgewogICAgICAgICAgICBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdG9rZW4sIG5hbWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsX2Z1bmN0W25hbWVdICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgdG9rZW4ud3JpdGVhYmxlID0gdHlwZW9mIHByZWRlZmluZWRbbmFtZV0gPT09ICdib29sZWFuJwogICAgICAgICAgICAgICAgICAgID8gcHJlZGVmaW5lZFtuYW1lXQogICAgICAgICAgICAgICAgICAgIDogdHJ1ZTsKICAgICAgICAgICAgICAgIHRva2VuLmZ1bmN0ID0gZnVuY3Q7CiAgICAgICAgICAgICAgICBnbG9iYWxfc2NvcGVbbmFtZV0gPSB0b2tlbjsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoa2luZCA9PT0gJ2JlY29taW5nJykgewogICAgICAgICAgICAgICAga2luZCA9ICd2YXInOwogICAgICAgICAgICB9CgovLyBPcmRpbmFyeSB2YXJpYWJsZXMuCgogICAgICAgIH0gZWxzZSB7CgovLyBXYXJuIGlmIHRoZSB2YXJpYWJsZSBhbHJlYWR5IGV4aXN0cy4KCiAgICAgICAgICAgIGlmICh0eXBlb2YgZnVuY3RbbmFtZV0gPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICBpZiAoZnVuY3RbbmFtZV0gPT09ICd1bmRlZicpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi51bmRlZikgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2VkX2JlZm9yZV9hJywgdG9rZW4sIG5hbWUpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBraW5kID0gJ3Zhcic7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2FscmVhZHlfZGVmaW5lZCcsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKCi8vIEFkZCB0aGUgc3ltYm9sIHRvIHRoZSBjdXJyZW50IGZ1bmN0aW9uLgoKICAgICAgICAgICAgICAgIHRva2VuLmZ1bmN0ID0gZnVuY3Q7CiAgICAgICAgICAgICAgICB0b2tlbi53cml0ZWFibGUgPSB0cnVlOwogICAgICAgICAgICAgICAgc2NvcGVbbmFtZV0gPSB0b2tlbjsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBmdW5jdFtuYW1lXSA9IGtpbmQ7CiAgICB9CgoKICAgIGZ1bmN0aW9uIHBlZWsoZGlzdGFuY2UpIHsKCi8vIFBlZWsgYWhlYWQgdG8gYSBmdXR1cmUgdG9rZW4uIFRoZSBkaXN0YW5jZSBpcyBob3cgZmFyIGFoZWFkIHRvIGxvb2suIFRoZQovLyBkZWZhdWx0IGlzIHRoZSBuZXh0IHRva2VuLgoKICAgICAgICB2YXIgZm91bmQsIHNsb3QgPSAwOwoKICAgICAgICBkaXN0YW5jZSA9IGRpc3RhbmNlIHx8IDA7CiAgICAgICAgd2hpbGUgKHNsb3QgPD0gZGlzdGFuY2UpIHsKICAgICAgICAgICAgZm91bmQgPSBsb29rYWhlYWRbc2xvdF07CiAgICAgICAgICAgIGlmICghZm91bmQpIHsKICAgICAgICAgICAgICAgIGZvdW5kID0gbG9va2FoZWFkW3Nsb3RdID0gbGV4LnRva2VuKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc2xvdCArPSAxOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZm91bmQ7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGFkdmFuY2UoaWQsIG1hdGNoKSB7CgovLyBQcm9kdWNlIHRoZSBuZXh0IHRva2VuLCBhbHNvIGxvb2tpbmcgZm9yIHByb2dyYW1taW5nIGVycm9ycy4KCiAgICAgICAgaWYgKGluZGVudCkgewoKLy8gSWYgaW5kZW50YXRpb24gY2hlY2tpbmcgd2FzIHJlcXVlc3RlZCwgdGhlbiBpbnNwZWN0IGFsbCBvZiB0aGUgbGluZSBicmVha2luZ3MuCi8vIFRoZSB2YXIgc3RhdGVtZW50IGlzIHRyaWNreSBiZWNhdXNlIHRoZSBuYW1lcyBtaWdodCBiZSBhbGlnbmVkIG9yIG5vdC4gV2UKLy8gbG9vayBhdCB0aGUgZmlyc3QgbGluZSBicmVhayBhZnRlciB0aGUgdmFyIHRvIGRldGVybWluZSB0aGUgcHJvZ3JhbW1lcidzCi8vIGludGVudGlvbi4KCiAgICAgICAgICAgIGlmICh2YXJfbW9kZSAmJiBuZXh0X3Rva2VuLmxpbmUgIT09IHRva2VuLmxpbmUpIHsKICAgICAgICAgICAgICAgIGlmICgodmFyX21vZGUgIT09IGluZGVudCB8fCAhbmV4dF90b2tlbi5lZGdlKSAmJgogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmZyb20gPT09IGluZGVudC5hdCAtCiAgICAgICAgICAgICAgICAgICAgICAgIChuZXh0X3Rva2VuLmVkZ2UgPyBvcHRpb24uaW5kZW50IDogMCkpIHsKICAgICAgICAgICAgICAgICAgICB2YXIgZGVudCA9IGluZGVudDsKICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGRlbnQuYXQgLT0gb3B0aW9uLmluZGVudDsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbnQgPT09IHZhcl9tb2RlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBkZW50ID0gZGVudC53YXM7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGRlbnQub3BlbiA9IGZhbHNlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdmFyX21vZGUgPSBudWxsOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnPycgJiYgaW5kZW50Lm1vZGUgPT09ICc6JyAmJgogICAgICAgICAgICAgICAgICAgIHRva2VuLmxpbmUgIT09IG5leHRfdG9rZW4ubGluZSkgewogICAgICAgICAgICAgICAgaW5kZW50LmF0IC09IG9wdGlvbi5pbmRlbnQ7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGluZGVudC5vcGVuKSB7CgovLyBJZiB0aGUgdG9rZW4gaXMgYW4gZWRnZS4KCiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5lZGdlKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uZWRnZSA9PT0gJ2xhYmVsJykgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdCgxKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uZWRnZSA9PT0gJ2Nhc2UnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2F0KGluZGVudC5hdCAtIG9wdGlvbi5pbmRlbnQpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZW50Lm1vZGUgIT09ICdhcnJheScgfHwgbmV4dF90b2tlbi5saW5lICE9PSB0b2tlbi5saW5lKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2F0KGluZGVudC5hdCk7CiAgICAgICAgICAgICAgICAgICAgfQoKLy8gSWYgdGhlIHRva2VuIGlzIG5vdCBhbiBlZGdlLCBidXQgaXMgdGhlIGZpcnN0IHRva2VuIG9uIHRoZSBsaW5lLgoKICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dF90b2tlbi5saW5lICE9PSB0b2tlbi5saW5lKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uZnJvbSA8IGluZGVudC5hdCArIChpbmRlbnQubW9kZSA9PT0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleHByZXNzaW9uJyA/IDAgOiBvcHRpb24uaW5kZW50KSkgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdChpbmRlbnQuYXQgKyBvcHRpb24uaW5kZW50KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaW5kZW50LndyYXAgPSB0cnVlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4ubGluZSAhPT0gdG9rZW4ubGluZSkgewogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uZWRnZSkgewogICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2F0KGluZGVudC5hdCk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGluZGVudC53cmFwID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZW50Lm1vZGUgPT09ICdzdGF0ZW1lbnQnIHx8IGluZGVudC5tb2RlID09PSAndmFyJykgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdChpbmRlbnQuYXQgKyBvcHRpb24uaW5kZW50KTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uZnJvbSA8IGluZGVudC5hdCArIChpbmRlbnQubW9kZSA9PT0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleHByZXNzaW9uJyA/IDAgOiBvcHRpb24uaW5kZW50KSkgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdChpbmRlbnQuYXQgKyBvcHRpb24uaW5kZW50KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIHN3aXRjaCAodG9rZW4uaWQpIHsKICAgICAgICBjYXNlICcobnVtYmVyKSc6CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLicpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3RyYWlsaW5nX2RlY2ltYWxfYScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJy0nOgogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy0nIHx8IG5leHRfdG9rZW4uaWQgPT09ICctLScpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnKyc6CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKycgfHwgbmV4dF90b2tlbi5pZCA9PT0gJysrJykgewogICAgICAgICAgICAgICAgd2FybignY29uZnVzaW5nX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgaWYgKHRva2VuLmlkID09PSAnKHN0cmluZyknIHx8IHRva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgYW5vbm5hbWUgPSB0b2tlbi5zdHJpbmc7CiAgICAgICAgfQoKICAgICAgICBpZiAoaWQgJiYgbmV4dF90b2tlbi5pZCAhPT0gaWQpIHsKICAgICAgICAgICAgaWYgKG1hdGNoKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2JfZnJvbV9jX2QnLCBuZXh0X3Rva2VuLCBpZCwKICAgICAgICAgICAgICAgICAgICBtYXRjaC5pZCwgbWF0Y2gubGluZSwgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllciB8fCBuZXh0X3Rva2VuLnN0cmluZyAhPT0gaWQpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sIGlkLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBwcmV2X3Rva2VuID0gdG9rZW47CiAgICAgICAgdG9rZW4gPSBuZXh0X3Rva2VuOwogICAgICAgIG5leHRfdG9rZW4gPSBsb29rYWhlYWQuc2hpZnQoKSB8fCBsZXgudG9rZW4oKTsKICAgIH0KCgogICAgZnVuY3Rpb24gYWR2YW5jZV9pZGVudGlmaWVyKHN0cmluZykgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09IHN0cmluZykgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgc3RyaW5nLCBhcnRpZmFjdCgpKTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGRvX3NhZmUoKSB7CiAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgb3B0aW9uLnNhZmUgPSB0cnVlOwogICAgICAgIH0KICAgICAgICBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgb3B0aW9uLmJyb3dzZXIgICAgID0KICAgICAgICAgICAgICAgIG9wdGlvblsnY29udGludWUnXSA9CiAgICAgICAgICAgICAgICBvcHRpb24uY3NzICAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZGVidWcgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZGV2ZWwgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZXZpbCAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZm9yaW4gICA9CiAgICAgICAgICAgICAgICBvcHRpb24ubmV3Y2FwICA9CiAgICAgICAgICAgICAgICBvcHRpb24ubm9tZW4gICA9CiAgICAgICAgICAgICAgICBvcHRpb24ub24gICAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24ucmhpbm8gICA9CiAgICAgICAgICAgICAgICBvcHRpb24uc2xvcHB5ICA9CiAgICAgICAgICAgICAgICBvcHRpb24uc3ViICAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24udW5kZWYgICA9CiAgICAgICAgICAgICAgICBvcHRpb24ud2lkZ2V0ICA9CiAgICAgICAgICAgICAgICBvcHRpb24ud2luZG93cyA9IGZhbHNlOwoKCiAgICAgICAgICAgIGRlbGV0ZSBwcmVkZWZpbmVkLkFycmF5OwogICAgICAgICAgICBkZWxldGUgcHJlZGVmaW5lZC5EYXRlOwogICAgICAgICAgICBkZWxldGUgcHJlZGVmaW5lZC5GdW5jdGlvbjsKICAgICAgICAgICAgZGVsZXRlIHByZWRlZmluZWQuT2JqZWN0OwogICAgICAgICAgICBkZWxldGUgcHJlZGVmaW5lZFsnZXZhbCddOwoKICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQoewogICAgICAgICAgICAgICAgQURTQUZFOiBmYWxzZSwKICAgICAgICAgICAgICAgIGxpYjogZmFsc2UKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBkb19nbG9iYWxzKCkgewogICAgICAgIHZhciBuYW1lLCB3cml0ZWFibGU7CiAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyAmJiAhbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIHdyaXRlYWJsZSA9IGZhbHNlOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzonKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uaWQpIHsKICAgICAgICAgICAgICAgIGNhc2UgJ3RydWUnOgogICAgICAgICAgICAgICAgICAgIHdyaXRlYWJsZSA9IHByZWRlZmluZWRbbmFtZV0gIT09IGZhbHNlOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJ3RydWUnKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzoKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCdmYWxzZScpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBwcmVkZWZpbmVkW25hbWVdID0gd3JpdGVhYmxlOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgIH0KICAgIH0KCgogICAgZnVuY3Rpb24gZG9fanNsaW50KCkgewogICAgICAgIHZhciBuYW1lLCB2YWx1ZTsKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJyhzdHJpbmcpJyB8fCBuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnOicpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICc6JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICBpZiAodHlwZW9mIGpzbGludF9saW1pdFtuYW1lXSA9PT0gJ251bWJlcicpIHsKICAgICAgICAgICAgICAgIHZhbHVlID0gbmV4dF90b2tlbi5udW1iZXI7CiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiBqc2xpbnRfbGltaXRbbmFtZV0gfHwgdmFsdWUgPD0gMCB8fAogICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9zbWFsbF9hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBvcHRpb25bbmFtZV0gPSB2YWx1ZTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAndHJ1ZScpIHsKICAgICAgICAgICAgICAgICAgICBvcHRpb25bbmFtZV0gPSB0cnVlOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0X3Rva2VuLmlkID09PSAnZmFsc2UnKSB7CiAgICAgICAgICAgICAgICAgICAgb3B0aW9uW25hbWVdID0gZmFsc2U7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7CiAgICAgICAgICAgICAgICBjYXNlICdhZHNhZmUnOgogICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zYWZlID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBkb19zYWZlKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdzYWZlJzoKICAgICAgICAgICAgICAgICAgICBkb19zYWZlKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgYXNzdW1lKCk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGRvX3Byb3BlcnRpZXMoKSB7CiAgICAgICAgdmFyIG5hbWUsIHR5cGU7CiAgICAgICAgb3B0aW9uLnByb3BlcnRpZXMgPSB0cnVlOwogICAgICAgIGlmICghZnVuY3RbJyhvbGRfcHJvcGVydHlfdHlwZSknXSkgewogICAgICAgICAgICBmdW5jdFsnKG9sZF9wcm9wZXJ0eV90eXBlKSddID0gcHJvcGVydHlfdHlwZTsKICAgICAgICAgICAgcHJvcGVydHlfdHlwZSA9IE9iamVjdC5jcmVhdGUocHJvcGVydHlfdHlwZSk7CiAgICAgICAgfQogICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScgJiYgIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIG5hbWUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgdHlwZSA9ICcnOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOicpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJzonKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnZnVuY3Rpb24nKTsKICAgICAgICAgICAgICAgICAgICBpZiAoaXNfdHlwZVtuZXh0X3Rva2VuLnN0cmluZ10gPT09IHRydWUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdmdW5jdGlvbiAnICsgbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ2Z1bmN0aW9uJzsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHR5cGUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgICAgICAgICBpZiAoaXNfdHlwZVt0eXBlXSAhPT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF90eXBlX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICcnOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcHJvcGVydHlfdHlwZVtuYW1lXSA9IHR5cGU7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgfQogICAgfQoKCiAgICBkaXJlY3RpdmUgPSBmdW5jdGlvbiBkaXJlY3RpdmUoKSB7CiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmlkLAogICAgICAgICAgICBvbGRfY29tbWVudHNfb2ZmID0gY29tbWVudHNfb2ZmLAogICAgICAgICAgICBvbGRfaW5kZW50ID0gaW5kZW50OwogICAgICAgIGNvbW1lbnRzX29mZiA9IHRydWU7CiAgICAgICAgaW5kZW50ID0gbnVsbDsKICAgICAgICBpZiAobmV4dF90b2tlbi5saW5lID09PSB0b2tlbi5saW5lICYmIG5leHRfdG9rZW4uZnJvbSA9PT0gdG9rZW4udGhydSkgewogICAgICAgICAgICB3YXJuKCdtaXNzaW5nX3NwYWNlX2FfYicsIG5leHRfdG9rZW4sIGFydGlmYWN0KHRva2VuKSwgYXJ0aWZhY3QoKSk7CiAgICAgICAgfQogICAgICAgIGlmIChsb29rYWhlYWQubGVuZ3RoID4gMCkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7CiAgICAgICAgY2FzZSAnLypwcm9wZXJ0aWVzJzoKICAgICAgICBjYXNlICcvKnByb3BlcnR5JzoKICAgICAgICBjYXNlICcvKm1lbWJlcnMnOgogICAgICAgIGNhc2UgJy8qbWVtYmVyJzoKICAgICAgICAgICAgZG9fcHJvcGVydGllcygpOwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICcvKmpzbGludCc6CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGlzKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBkb19qc2xpbnQoKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnLypnbG9iYWxzJzoKICAgICAgICBjYXNlICcvKmdsb2JhbCc6CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGlzKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBkb19nbG9iYWxzKCk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIHRoaXMpOwogICAgICAgIH0KICAgICAgICBjb21tZW50c19vZmYgPSBvbGRfY29tbWVudHNfb2ZmOwogICAgICAgIGFkdmFuY2UoJyovJyk7CiAgICAgICAgaW5kZW50ID0gb2xkX2luZGVudDsKICAgIH07CgoKLy8gSW5kZW50YXRpb24gaW50ZW50aW9uCgogICAgZnVuY3Rpb24gZWRnZShtb2RlKSB7CiAgICAgICAgbmV4dF90b2tlbi5lZGdlID0gaW5kZW50ID8gaW5kZW50Lm9wZW4gJiYgKG1vZGUgfHwgJ2VkZ2UnKSA6ICcnOwogICAgfQoKCiAgICBmdW5jdGlvbiBzdGVwX2luKG1vZGUpIHsKICAgICAgICB2YXIgb3BlbjsKICAgICAgICBpZiAodHlwZW9mIG1vZGUgPT09ICdudW1iZXInKSB7CiAgICAgICAgICAgIGluZGVudCA9IHsKICAgICAgICAgICAgICAgIGF0OiArbW9kZSwKICAgICAgICAgICAgICAgIG9wZW46IHRydWUsCiAgICAgICAgICAgICAgICB3YXM6IGluZGVudAogICAgICAgICAgICB9OwogICAgICAgIH0gZWxzZSBpZiAoIWluZGVudCkgewogICAgICAgICAgICBpbmRlbnQgPSB7CiAgICAgICAgICAgICAgICBhdDogMSwKICAgICAgICAgICAgICAgIG1vZGU6ICdzdGF0ZW1lbnQnLAogICAgICAgICAgICAgICAgb3BlbjogdHJ1ZQogICAgICAgICAgICB9OwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIG9wZW4gPSBtb2RlID09PSAndmFyJyB8fAogICAgICAgICAgICAgICAgKG5leHRfdG9rZW4ubGluZSAhPT0gdG9rZW4ubGluZSAmJiBtb2RlICE9PSAnc3RhdGVtZW50Jyk7CiAgICAgICAgICAgIGluZGVudCA9IHsKICAgICAgICAgICAgICAgIGF0OiAob3BlbiB8fCBtb2RlID09PSAnY29udHJvbCcKICAgICAgICAgICAgICAgICAgICA/IGluZGVudC5hdCArIG9wdGlvbi5pbmRlbnQKICAgICAgICAgICAgICAgICAgICA6IGluZGVudC5hdCkgKyAoaW5kZW50LndyYXAgPyBvcHRpb24uaW5kZW50IDogMCksCiAgICAgICAgICAgICAgICBtb2RlOiBtb2RlLAogICAgICAgICAgICAgICAgb3Blbjogb3BlbiwKICAgICAgICAgICAgICAgIHdhczogaW5kZW50CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIGlmIChtb2RlID09PSAndmFyJyAmJiBvcGVuKSB7CiAgICAgICAgICAgICAgICB2YXJfbW9kZSA9IGluZGVudDsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzdGVwX291dChpZCwgc3ltYm9sKSB7CiAgICAgICAgaWYgKGlkKSB7CiAgICAgICAgICAgIGlmIChpbmRlbnQgJiYgaW5kZW50Lm9wZW4pIHsKICAgICAgICAgICAgICAgIGluZGVudC5hdCAtPSBvcHRpb24uaW5kZW50OwogICAgICAgICAgICAgICAgZWRnZSgpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoaWQsIHN5bWJvbCk7CiAgICAgICAgfQogICAgICAgIGlmIChpbmRlbnQpIHsKICAgICAgICAgICAgaW5kZW50ID0gaW5kZW50LndhczsKICAgICAgICB9CiAgICB9CgovLyBGdW5jdGlvbnMgZm9yIGNvbmZvcm1hbmNlIG9mIHdoaXRlc3BhY2UuCgogICAgZnVuY3Rpb24gb25lX3NwYWNlKGxlZnQsIHJpZ2h0KSB7CiAgICAgICAgbGVmdCA9IGxlZnQgfHwgdG9rZW47CiAgICAgICAgcmlnaHQgPSByaWdodCB8fCBuZXh0X3Rva2VuOwogICAgICAgIGlmIChyaWdodC5pZCAhPT0gJyhlbmQpJyAmJiAhb3B0aW9uLndoaXRlICYmCiAgICAgICAgICAgICAgICAodG9rZW4ubGluZSAhPT0gcmlnaHQubGluZSB8fAogICAgICAgICAgICAgICAgdG9rZW4udGhydSArIDEgIT09IHJpZ2h0LmZyb20pKSB7CiAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3NwYWNlX2FfYicsIHJpZ2h0LCBhcnRpZmFjdCh0b2tlbiksIGFydGlmYWN0KHJpZ2h0KSk7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIG9uZV9zcGFjZV9vbmx5KGxlZnQsIHJpZ2h0KSB7CiAgICAgICAgbGVmdCA9IGxlZnQgfHwgdG9rZW47CiAgICAgICAgcmlnaHQgPSByaWdodCB8fCBuZXh0X3Rva2VuOwogICAgICAgIGlmIChyaWdodC5pZCAhPT0gJyhlbmQpJyAmJiAobGVmdC5saW5lICE9PSByaWdodC5saW5lIHx8CiAgICAgICAgICAgICAgICAoIW9wdGlvbi53aGl0ZSAmJiBsZWZ0LnRocnUgKyAxICE9PSByaWdodC5mcm9tKSkpIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3BhY2VfYV9iJywgcmlnaHQsIGFydGlmYWN0KGxlZnQpLCBhcnRpZmFjdChyaWdodCkpOwogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBub19zcGFjZShsZWZ0LCByaWdodCkgewogICAgICAgIGxlZnQgPSBsZWZ0IHx8IHRva2VuOwogICAgICAgIHJpZ2h0ID0gcmlnaHQgfHwgbmV4dF90b2tlbjsKICAgICAgICBpZiAoKCFvcHRpb24ud2hpdGUgfHwgeG1vZGUgPT09ICdzdHlsZXByb3BlcnR5JyB8fCB4bW9kZSA9PT0gJ3N0eWxlJykgJiYKICAgICAgICAgICAgICAgIGxlZnQudGhydSAhPT0gcmlnaHQuZnJvbSAmJiBsZWZ0LmxpbmUgPT09IHJpZ2h0LmxpbmUpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9zcGFjZV9hX2InLCByaWdodCwgYXJ0aWZhY3QobGVmdCksIGFydGlmYWN0KHJpZ2h0KSk7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIG5vX3NwYWNlX29ubHkobGVmdCwgcmlnaHQpIHsKICAgICAgICBsZWZ0ID0gbGVmdCB8fCB0b2tlbjsKICAgICAgICByaWdodCA9IHJpZ2h0IHx8IG5leHRfdG9rZW47CiAgICAgICAgaWYgKHJpZ2h0LmlkICE9PSAnKGVuZCknICYmIChsZWZ0LmxpbmUgIT09IHJpZ2h0LmxpbmUgfHwKICAgICAgICAgICAgICAgICghb3B0aW9uLndoaXRlICYmIGxlZnQudGhydSAhPT0gcmlnaHQuZnJvbSkpKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfc3BhY2VfYV9iJywgcmlnaHQsIGFydGlmYWN0KGxlZnQpLCBhcnRpZmFjdChyaWdodCkpOwogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzcGFjZXMobGVmdCwgcmlnaHQpIHsKICAgICAgICBpZiAoIW9wdGlvbi53aGl0ZSkgewogICAgICAgICAgICBsZWZ0ID0gbGVmdCB8fCB0b2tlbjsKICAgICAgICAgICAgcmlnaHQgPSByaWdodCB8fCBuZXh0X3Rva2VuOwogICAgICAgICAgICBpZiAobGVmdC50aHJ1ID09PSByaWdodC5mcm9tICYmIGxlZnQubGluZSA9PT0gcmlnaHQubGluZSkgewogICAgICAgICAgICAgICAgd2FybignbWlzc2luZ19zcGFjZV9hX2InLCByaWdodCwgYXJ0aWZhY3QobGVmdCksIGFydGlmYWN0KHJpZ2h0KSk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gY29tbWEoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICB3YXJuX2F0KCdleHBlY3RlZF9hX2InLCB0b2tlbi5saW5lLCB0b2tlbi50aHJ1LCAnLCcsIGFydGlmYWN0KCkpOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIGlmICghb3B0aW9uLndoaXRlKSB7CiAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIHNlbWljb2xvbigpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJzsnKSB7CiAgICAgICAgICAgIHdhcm5fYXQoJ2V4cGVjdGVkX2FfYicsIHRva2VuLmxpbmUsIHRva2VuLnRocnUsICc7JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKCFvcHRpb24ud2hpdGUpIHsKICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCc7Jyk7CiAgICAgICAgICAgIGlmIChzZW1pY29sb25fY29kYVtuZXh0X3Rva2VuLmlkXSAhPT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gdXNlX3N0cmljdCgpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcgPT09ICd1c2Ugc3RyaWN0JykgewogICAgICAgICAgICBpZiAoc3RyaWN0X21vZGUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VubmVjZXNzYXJ5X3VzZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgc3RyaWN0X21vZGUgPSB0cnVlOwogICAgICAgICAgICBvcHRpb24ubmV3Y2FwID0gZmFsc2U7CiAgICAgICAgICAgIG9wdGlvbi51bmRlZiA9IGZhbHNlOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBhcmVfc2ltaWxhcihhLCBiKSB7CiAgICAgICAgaWYgKGEgPT09IGIpIHsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7CiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGIpICYmIGEubGVuZ3RoID09PSBiLmxlbmd0aCkgewogICAgICAgICAgICAgICAgdmFyIGk7CiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgIGlmICghYXJlX3NpbWlsYXIoYVtpXSwgYltpXSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICB9CiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYikpIHsKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIH0KICAgICAgICBpZiAoYS5pZCA9PT0gJyhudW1iZXIpJyAmJiBiLmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgIHJldHVybiBhLm51bWJlciA9PT0gYi5udW1iZXI7CiAgICAgICAgfQogICAgICAgIGlmIChhLmFyaXR5ID09PSBiLmFyaXR5ICYmIGEuc3RyaW5nID09PSBiLnN0cmluZykgewogICAgICAgICAgICBzd2l0Y2ggKGEuYXJpdHkpIHsKICAgICAgICAgICAgY2FzZSAncHJlZml4JzoKICAgICAgICAgICAgY2FzZSAnc3VmZml4JzoKICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6CiAgICAgICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYi5pZCAmJiBhcmVfc2ltaWxhcihhLmZpcnN0LCBiLmZpcnN0KTsKICAgICAgICAgICAgY2FzZSAnaW5maXgnOgogICAgICAgICAgICAgICAgcmV0dXJuIGFyZV9zaW1pbGFyKGEuZmlyc3QsIGIuZmlyc3QpICYmCiAgICAgICAgICAgICAgICAgICAgYXJlX3NpbWlsYXIoYS5zZWNvbmQsIGIuc2Vjb25kKTsKICAgICAgICAgICAgY2FzZSAndGVybmFyeSc6CiAgICAgICAgICAgICAgICByZXR1cm4gYXJlX3NpbWlsYXIoYS5maXJzdCwgYi5maXJzdCkgJiYKICAgICAgICAgICAgICAgICAgICBhcmVfc2ltaWxhcihhLnNlY29uZCwgYi5zZWNvbmQpICYmCiAgICAgICAgICAgICAgICAgICAgYXJlX3NpbWlsYXIoYS50aGlyZCwgYi50aGlyZCk7CiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICAgICAgY2FzZSAncmVnZXhwJzoKICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKGEuaWQgPT09ICcuJyAmJiBiLmlkID09PSAnWycgJiYgYi5hcml0eSA9PT0gJ2luZml4JykgewogICAgICAgICAgICAgICAgcmV0dXJuIGEuc2Vjb25kLnN0cmluZyA9PT0gYi5zZWNvbmQuc3RyaW5nICYmIGIuc2Vjb25kLmlkID09PSAnKHN0cmluZyknOwogICAgICAgICAgICB9IGVsc2UgaWYgKGEuaWQgPT09ICdbJyAmJiBhLmFyaXR5ID09PSAnaW5maXgnICYmIGIuaWQgPT09ICcuJykgewogICAgICAgICAgICAgICAgcmV0dXJuIGEuc2Vjb25kLnN0cmluZyA9PT0gYi5zZWNvbmQuc3RyaW5nICYmIGEuc2Vjb25kLmlkID09PSAnKHN0cmluZyknOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgovLyBUaGlzIGlzIHRoZSBoZWFydCBvZiBKU0xJTlQsIHRoZSBQcmF0dCBwYXJzZXIuIEluIGFkZGl0aW9uIHRvIHBhcnNpbmcsIGl0Ci8vIGlzIGxvb2tpbmcgZm9yIGFkIGhvYyBsaW50IHBhdHRlcm5zLiBXZSBhZGQgLmZ1ZCB0byBQcmF0dCdzIG1vZGVsLCB3aGljaCBpcwovLyBsaWtlIC5udWQgZXhjZXB0IHRoYXQgaXQgaXMgb25seSB1c2VkIG9uIHRoZSBmaXJzdCB0b2tlbiBvZiBhIHN0YXRlbWVudC4KLy8gSGF2aW5nIC5mdWQgbWFrZXMgaXQgbXVjaCBlYXNpZXIgdG8gZGVmaW5lIHN0YXRlbWVudC1vcmllbnRlZCBsYW5ndWFnZXMgbGlrZQovLyBKYXZhU2NyaXB0LiBJIHJldGFpbmVkIFByYXR0J3Mgbm9tZW5jbGF0dXJlLgoKLy8gLm51ZCAgICAgTnVsbCBkZW5vdGF0aW9uCi8vIC5mdWQgICAgIEZpcnN0IG51bGwgZGVub3RhdGlvbgovLyAubGVkICAgICBMZWZ0IGRlbm90YXRpb24KLy8gIGxicCAgICAgTGVmdCBiaW5kaW5nIHBvd2VyCi8vICByYnAgICAgIFJpZ2h0IGJpbmRpbmcgcG93ZXIKCi8vIFRoZXkgYXJlIGVsZW1lbnRzIG9mIHRoZSBwYXJzaW5nIG1ldGhvZCBjYWxsZWQgVG9wIERvd24gT3BlcmF0b3IgUHJlY2VkZW5jZS4KCiAgICBmdW5jdGlvbiBleHByZXNzaW9uKHJicCwgaW5pdGlhbCkgewoKLy8gcmJwIGlzIHRoZSByaWdodCBiaW5kaW5nIHBvd2VyLgovLyBpbml0aWFsIGluZGljYXRlcyB0aGF0IHRoaXMgaXMgdGhlIGZpcnN0IGV4cHJlc3Npb24gb2YgYSBzdGF0ZW1lbnQuCgogICAgICAgIHZhciBsZWZ0OwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknKSB7CiAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIHRva2VuLCBuZXh0X3Rva2VuLmlkKTsKICAgICAgICB9CiAgICAgICAgYWR2YW5jZSgpOwogICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiBzY29wZVt0b2tlbi5zdHJpbmddICYmCiAgICAgICAgICAgICAgICBzY29wZVt0b2tlbi5zdHJpbmddID09PSBnbG9iYWxfc2NvcGVbdG9rZW4uc3RyaW5nXSAmJgogICAgICAgICAgICAgICAgKG5leHRfdG9rZW4uaWQgIT09ICcoJyAmJiBuZXh0X3Rva2VuLmlkICE9PSAnLicpKSB7CiAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdG9rZW4pOwogICAgICAgIH0KICAgICAgICBpZiAoaW5pdGlhbCkgewogICAgICAgICAgICBhbm9ubmFtZSA9ICdhbm9ueW1vdXMnOwogICAgICAgICAgICBmdW5jdFsnKHZlcmIpJ10gPSB0b2tlbi5zdHJpbmc7CiAgICAgICAgfQogICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlICYmIHRva2VuLmZ1ZCkgewogICAgICAgICAgICBsZWZ0ID0gdG9rZW4uZnVkKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKHRva2VuLm51ZCkgewogICAgICAgICAgICAgICAgbGVmdCA9IHRva2VuLm51ZCgpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScgJiYgdG9rZW4uaWQgPT09ICcuJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2xlYWRpbmdfZGVjaW1hbF9hJywgdG9rZW4sIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2lkZW50aWZpZXJfYScsIHRva2VuLCB0b2tlbi5pZCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgd2hpbGUgKHJicCA8IG5leHRfdG9rZW4ubGJwKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVkKSB7CiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHRva2VuLmxlZChsZWZ0KTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfb3BlcmF0b3JfYScsIHRva2VuLCB0b2tlbi5pZCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIGxlZnQ7CiAgICB9CgoKLy8gRnVuY3Rpb25hbCBjb25zdHJ1Y3RvcnMgZm9yIG1ha2luZyB0aGUgc3ltYm9scyB0aGF0IHdpbGwgYmUgaW5oZXJpdGVkIGJ5Ci8vIHRva2Vucy4KCiAgICBmdW5jdGlvbiBzeW1ib2wocywgcCkgewogICAgICAgIHZhciB4ID0gc3ludGF4W3NdOwogICAgICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsKICAgICAgICAgICAgc3ludGF4W3NdID0geCA9IHsKICAgICAgICAgICAgICAgIGlkOiBzLAogICAgICAgICAgICAgICAgbGJwOiBwIHx8IDAsCiAgICAgICAgICAgICAgICBzdHJpbmc6IHMKICAgICAgICAgICAgfTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgogICAgZnVuY3Rpb24gcG9zdHNjcmlwdCh4KSB7CiAgICAgICAgeC5wb3N0c2NyaXB0ID0gdHJ1ZTsKICAgICAgICByZXR1cm4geDsKICAgIH0KCiAgICBmdW5jdGlvbiB1bHRpbWF0ZShzKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocywgMCk7CiAgICAgICAgeC5mcm9tID0gMTsKICAgICAgICB4LnRocnUgPSAxOwogICAgICAgIHgubGluZSA9IDA7CiAgICAgICAgeC5lZGdlID0gJ2VkZ2UnOwogICAgICAgIHMuc3RyaW5nID0gczsKICAgICAgICByZXR1cm4gcG9zdHNjcmlwdCh4KTsKICAgIH0KCgogICAgZnVuY3Rpb24gc3RtdChzLCBmKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocyk7CiAgICAgICAgeC5pZGVudGlmaWVyID0geC5yZXNlcnZlZCA9IHRydWU7CiAgICAgICAgeC5mdWQgPSBmOwogICAgICAgIHJldHVybiB4OwogICAgfQoKICAgIGZ1bmN0aW9uIGxhYmVsZWRfc3RtdChzLCBmKSB7CiAgICAgICAgdmFyIHggPSBzdG10KHMsIGYpOwogICAgICAgIHgubGFiZWxlZCA9IHRydWU7CiAgICB9CgogICAgZnVuY3Rpb24gZGlzcnVwdF9zdG10KHMsIGYpIHsKICAgICAgICB2YXIgeCA9IHN0bXQocywgZik7CiAgICAgICAgeC5kaXNydXB0ID0gdHJ1ZTsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVzZXJ2ZV9uYW1lKHgpIHsKICAgICAgICB2YXIgYyA9IHguaWQuY2hhckF0KDApOwogICAgICAgIGlmICgoYyA+PSAnYScgJiYgYyA8PSAneicpIHx8IChjID49ICdBJyAmJiBjIDw9ICdaJykpIHsKICAgICAgICAgICAgeC5pZGVudGlmaWVyID0geC5yZXNlcnZlZCA9IHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiB4OwogICAgfQoKCiAgICBmdW5jdGlvbiBwcmVmaXgocywgZiwgdHlwZSkgewogICAgICAgIHZhciB4ID0gc3ltYm9sKHMsIDE1MCk7CiAgICAgICAgcmVzZXJ2ZV9uYW1lKHgpOwogICAgICAgIHgubnVkID0gdHlwZW9mIGYgPT09ICdmdW5jdGlvbicKICAgICAgICAgICAgPyBmCiAgICAgICAgICAgIDogZnVuY3Rpb24gKCkgewogICAgICAgICAgICAgICAgaWYgKHMgPT09ICd0eXBlb2YnKSB7CiAgICAgICAgICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBleHByZXNzaW9uKDE1MCk7CiAgICAgICAgICAgICAgICB0aGlzLmFyaXR5ID0gJ3ByZWZpeCc7CiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gJysrJyB8fCB0aGlzLmlkID09PSAnLS0nKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb24ucGx1c3BsdXMpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoIXRoaXMuZmlyc3QuaWRlbnRpZmllciB8fCB0aGlzLmZpcnN0LnJlc2VydmVkKSAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdC5pZCAhPT0gJy4nICYmIHRoaXMuZmlyc3QuaWQgIT09ICdbJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfb3BlcmFuZCcsIHRoaXMpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7CiAgICAgICAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICAgICAgfTsKICAgICAgICByZXR1cm4geDsKICAgIH0KCgogICAgZnVuY3Rpb24gdHlwZShzLCB0LCBudWQpIHsKICAgICAgICB2YXIgeCA9IHN5bWJvbChzKTsKICAgICAgICB4LmFyaXR5ID0geC50eXBlID0gdDsKICAgICAgICBpZiAobnVkKSB7CiAgICAgICAgICAgIHgubnVkID0gbnVkOwogICAgICAgIH0KICAgICAgICByZXR1cm4geDsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVzZXJ2ZShzLCBmKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocyk7CiAgICAgICAgeC5pZGVudGlmaWVyID0geC5yZXNlcnZlZCA9IHRydWU7CiAgICAgICAgaWYgKHR5cGVvZiBmID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgIHgubnVkID0gZjsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNvbnN0YW50KG5hbWUsIHR5cGUpIHsKICAgICAgICB2YXIgeCA9IHJlc2VydmUobmFtZSk7CiAgICAgICAgeC50eXBlID0gdHlwZTsKICAgICAgICB4LnN0cmluZyA9IG5hbWU7CiAgICAgICAgeC5udWQgPSByZXR1cm5fdGhpczsKICAgICAgICByZXR1cm4geDsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVzZXJ2ZXZhcihzLCB2KSB7CiAgICAgICAgcmV0dXJuIHJlc2VydmUocywgZnVuY3Rpb24gKCkgewogICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgICAgIHYodGhpcyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRoaXM7CiAgICAgICAgfSk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGluZml4KHMsIHAsIGYsIHR5cGUsIHcpIHsKICAgICAgICB2YXIgeCA9IHN5bWJvbChzLCBwKTsKICAgICAgICByZXNlcnZlX25hbWUoeCk7CiAgICAgICAgeC5sZWQgPSBmdW5jdGlvbiAobGVmdCkgewogICAgICAgICAgICB0aGlzLmFyaXR5ID0gJ2luZml4JzsKICAgICAgICAgICAgaWYgKCF3KSB7CiAgICAgICAgICAgICAgICBzcGFjZXMocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCFvcHRpb24uYml0d2lzZSAmJiB0aGlzLmJpdHdpc2UpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHRoaXMpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJykgewogICAgICAgICAgICAgICAgcmV0dXJuIGYobGVmdCwgdGhpcyk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gbGVmdDsKICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gZXhwcmVzc2lvbihwKTsKICAgICAgICAgICAgICAgIHJldHVybiB0aGlzOwogICAgICAgICAgICB9CiAgICAgICAgfTsKICAgICAgICBpZiAodHlwZSkgewogICAgICAgICAgICB4LnR5cGUgPSB0eXBlOwogICAgICAgIH0KICAgICAgICByZXR1cm4geDsKICAgIH0KCiAgICBmdW5jdGlvbiBleHBlY3RlZF9yZWxhdGlvbihub2RlLCBtZXNzYWdlKSB7CiAgICAgICAgaWYgKG5vZGUuYXNzaWduKSB7CiAgICAgICAgICAgIHdhcm4obWVzc2FnZSB8fCBidW5kbGUuY29uZGl0aW9uYWxfYXNzaWdubWVudCwgbm9kZSk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBub2RlOwogICAgfQoKICAgIGZ1bmN0aW9uIGV4cGVjdGVkX2NvbmRpdGlvbihub2RlLCBtZXNzYWdlKSB7CiAgICAgICAgc3dpdGNoIChub2RlLmlkKSB7CiAgICAgICAgY2FzZSAnWyc6CiAgICAgICAgY2FzZSAnLSc6CiAgICAgICAgICAgIGlmIChub2RlLmFyaXR5ICE9PSAnaW5maXgnKSB7CiAgICAgICAgICAgICAgICB3YXJuKG1lc3NhZ2UgfHwgYnVuZGxlLndlaXJkX2NvbmRpdGlvbiwgbm9kZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnZmFsc2UnOgogICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICBjYXNlICdJbmZpbml0eSc6CiAgICAgICAgY2FzZSAnTmFOJzoKICAgICAgICBjYXNlICdudWxsJzoKICAgICAgICBjYXNlICd0cnVlJzoKICAgICAgICBjYXNlICd1bmRlZmluZWQnOgogICAgICAgIGNhc2UgJ3ZvaWQnOgogICAgICAgIGNhc2UgJyhudW1iZXIpJzoKICAgICAgICBjYXNlICcocmVnZXhwKSc6CiAgICAgICAgY2FzZSAnKHN0cmluZyknOgogICAgICAgIGNhc2UgJ3snOgogICAgICAgICAgICB3YXJuKG1lc3NhZ2UgfHwgYnVuZGxlLndlaXJkX2NvbmRpdGlvbiwgbm9kZSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJygnOgogICAgICAgICAgICBpZiAobm9kZS5maXJzdC5pZCA9PT0gJy4nICYmIG51bWJlcnlbbm9kZS5maXJzdC5zZWNvbmQuc3RyaW5nXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgd2FybihtZXNzYWdlIHx8IGJ1bmRsZS53ZWlyZF9jb25kaXRpb24sIG5vZGUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbm9kZTsKICAgIH0KCiAgICBmdW5jdGlvbiBjaGVja19yZWxhdGlvbihub2RlKSB7CiAgICAgICAgc3dpdGNoIChub2RlLmFyaXR5KSB7CiAgICAgICAgY2FzZSAncHJlZml4JzoKICAgICAgICAgICAgc3dpdGNoIChub2RlLmlkKSB7CiAgICAgICAgICAgIGNhc2UgJ3snOgogICAgICAgICAgICBjYXNlICdbJzoKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5vZGUpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJyEnOgogICAgICAgICAgICAgICAgd2FybignY29uZnVzaW5nX2EnLCBub2RlKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICBjYXNlICdyZWdleHAnOgogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBub2RlKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgaWYgKG5vZGUuaWQgID09PSAnTmFOJykgewogICAgICAgICAgICAgICAgd2FybignaXNuYW4nLCBub2RlKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gbm9kZTsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVsYXRpb24ocywgZXFlcSkgewogICAgICAgIHJldHVybiBpbmZpeChzLCAxMDAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgICAgIGNoZWNrX3JlbGF0aW9uKGxlZnQpOwogICAgICAgICAgICBpZiAoZXFlcSAmJiAhb3B0aW9uLmVxZXEpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIHRoYXQsIGVxZXEsIHRoYXQuaWQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTAwKTsKICAgICAgICAgICAgaWYgKGFyZV9zaW1pbGFyKGxlZnQsIHJpZ2h0KSB8fAogICAgICAgICAgICAgICAgICAgICgobGVmdC5pZCA9PT0gJyhzdHJpbmcpJyB8fCBsZWZ0LmlkID09PSAnKG51bWJlciknKSAmJgogICAgICAgICAgICAgICAgICAgIChyaWdodC5pZCA9PT0gJyhzdHJpbmcpJyB8fCByaWdodC5pZCA9PT0gJyhudW1iZXIpJykpKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd3ZWlyZF9yZWxhdGlvbicsIHRoYXQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgICAgICB0aGF0LnNlY29uZCA9IGNoZWNrX3JlbGF0aW9uKHJpZ2h0KTsKICAgICAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICAgICAgfSwgJ2Jvb2xlYW4nKTsKICAgIH0KCgogICAgZnVuY3Rpb24gYXNzaWdub3Aocywgb3ApIHsKICAgICAgICB2YXIgeCA9IGluZml4KHMsIDIwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgICAgICB2YXIgbDsKICAgICAgICAgICAgdGhhdC5maXJzdCA9IGxlZnQ7CiAgICAgICAgICAgIGlmIChsZWZ0LmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIGlmIChzY29wZVtsZWZ0LnN0cmluZ10pIHsKICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGVbbGVmdC5zdHJpbmddLndyaXRlYWJsZSA9PT0gZmFsc2UpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigncmVhZF9vbmx5JywgbGVmdCk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdyZWFkX29ubHknKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgbCA9IGxlZnQ7CiAgICAgICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVkZWZpbmVkW2wuc3RyaW5nXSA9PT0gJ2Jvb2xlYW4nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgbCk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGwgPSBsLmZpcnN0OwogICAgICAgICAgICAgICAgfSB3aGlsZSAobCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGxlZnQgPT09IHN5bnRheFsnZnVuY3Rpb24nXSkgewogICAgICAgICAgICAgICAgd2FybignaWRlbnRpZmllcl9mdW5jdGlvbicsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobGVmdC5pZCA9PT0gJy4nIHx8IGxlZnQuaWQgPT09ICdbJykgewogICAgICAgICAgICAgICAgaWYgKCFsZWZ0LmZpcnN0IHx8IGxlZnQuZmlyc3Quc3RyaW5nID09PSAnYXJndW1lbnRzJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF9hc3NpZ25tZW50JywgdGhhdCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdC5pZGVudGlmaWVyICYmICFsZWZ0LnJlc2VydmVkKSB7CiAgICAgICAgICAgICAgICBpZiAoZnVuY3RbbGVmdC5zdHJpbmddID09PSAnZXhjZXB0aW9uJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fzc2lnbl9leGNlcHRpb24nLCBsZWZ0KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICB0aGF0LnNlY29uZCA9IGV4cHJlc3Npb24oMTkpOwogICAgICAgICAgICBpZiAodGhhdC5pZCA9PT0gJz0nICYmIGFyZV9zaW1pbGFyKHRoYXQuZmlyc3QsIHRoYXQuc2Vjb25kKSkgewogICAgICAgICAgICAgICAgd2Fybignd2VpcmRfYXNzaWdubWVudCcsIHRoYXQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiB0aGF0OwogICAgICAgIH0pOwogICAgICAgIHguYXNzaWduID0gdHJ1ZTsKICAgICAgICBpZiAob3ApIHsKICAgICAgICAgICAgaWYgKHN5bnRheFtvcF0udHlwZSkgewogICAgICAgICAgICAgICAgeC50eXBlID0gc3ludGF4W29wXS50eXBlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChzeW50YXhbb3BdLmJpdHdpc2UpIHsKICAgICAgICAgICAgICAgIHguYml0d2lzZSA9IHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGJpdHdpc2UocywgcCkgewogICAgICAgIHZhciB4ID0gaW5maXgocywgcCwgJ251bWJlcicpOwogICAgICAgIHguYml0d2lzZSA9IHRydWU7CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgoKICAgIGZ1bmN0aW9uIHN1ZmZpeChzKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocywgMTUwKTsKICAgICAgICB4LmxlZCA9IGZ1bmN0aW9uIChsZWZ0KSB7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgICAgICBpZiAoIW9wdGlvbi5wbHVzcGx1cykgewogICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoKCFsZWZ0LmlkZW50aWZpZXIgfHwgbGVmdC5yZXNlcnZlZCkgJiYKICAgICAgICAgICAgICAgICAgICBsZWZ0LmlkICE9PSAnLicgJiYgbGVmdC5pZCAhPT0gJ1snKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdiYWRfb3BlcmFuZCcsIHRoaXMpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBsZWZ0OwogICAgICAgICAgICB0aGlzLmFyaXR5ID0gJ3N1ZmZpeCc7CiAgICAgICAgICAgIHJldHVybiB0aGlzOwogICAgICAgIH07CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgoKICAgIGZ1bmN0aW9uIG9wdGlvbmFsX2lkZW50aWZpZXIoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiBiYW5uZWRbdG9rZW4uc3RyaW5nXSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0b2tlbik7CiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4ucmVzZXJ2ZWQgJiYgIW9wdGlvbi5lczUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2lkZW50aWZpZXJfYV9yZXNlcnZlZCcsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdG9rZW4uc3RyaW5nOwogICAgICAgIH0KICAgIH0KCgogICAgZnVuY3Rpb24gaWRlbnRpZmllcigpIHsKICAgICAgICB2YXIgaSA9IG9wdGlvbmFsX2lkZW50aWZpZXIoKTsKICAgICAgICBpZiAoIWkpIHsKICAgICAgICAgICAgc3RvcCh0b2tlbi5pZCA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXh0X3Rva2VuLmlkID09PSAnKCcKICAgICAgICAgICAgICAgID8gJ25hbWVfZnVuY3Rpb24nCiAgICAgICAgICAgICAgICA6ICdleHBlY3RlZF9pZGVudGlmaWVyX2EnKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIHN0YXRlbWVudCgpIHsKCiAgICAgICAgdmFyIGxhYmVsLCBvbGRfc2NvcGUgPSBzY29wZSwgdGhlX3N0YXRlbWVudDsKCi8vIFdlIGRvbid0IGxpa2UgdGhlIGVtcHR5IHN0YXRlbWVudC4KCiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICc7JykgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB9CgovLyBJcyB0aGlzIGEgbGFiZWxlZCBzdGF0ZW1lbnQ/CgogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgIW5leHRfdG9rZW4ucmVzZXJ2ZWQgJiYgcGVlaygpLmlkID09PSAnOicpIHsKICAgICAgICAgICAgZWRnZSgnbGFiZWwnKTsKICAgICAgICAgICAgbGFiZWwgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGFkdmFuY2UoJzonKTsKICAgICAgICAgICAgc2NvcGUgPSBPYmplY3QuY3JlYXRlKG9sZF9zY29wZSk7CiAgICAgICAgICAgIGFkZF9sYWJlbChsYWJlbCwgJ2xhYmVsJyk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmxhYmVsZWQgIT09IHRydWUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2xhYmVsX2FfYicsIG5leHRfdG9rZW4sIGxhYmVsLnN0cmluZywgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoangudGVzdChsYWJlbC5zdHJpbmcgKyAnOicpKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1cmwnLCBsYWJlbCk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoZnVuY3QgPT09IGdsb2JhbF9mdW5jdCkgewogICAgICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJywgdG9rZW4pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIG5leHRfdG9rZW4ubGFiZWwgPSBsYWJlbDsKICAgICAgICB9CgovLyBQYXJzZSB0aGUgc3RhdGVtZW50LgoKICAgICAgICBlZGdlKCk7CiAgICAgICAgc3RlcF9pbignc3RhdGVtZW50Jyk7CiAgICAgICAgdGhlX3N0YXRlbWVudCA9IGV4cHJlc3Npb24oMCwgdHJ1ZSk7CiAgICAgICAgaWYgKHRoZV9zdGF0ZW1lbnQpIHsKCi8vIExvb2sgZm9yIHRoZSBmaW5hbCBzZW1pY29sb24uCgogICAgICAgICAgICBpZiAodGhlX3N0YXRlbWVudC5hcml0eSA9PT0gJ3N0YXRlbWVudCcpIHsKICAgICAgICAgICAgICAgIGlmICh0aGVfc3RhdGVtZW50LmlkID09PSAnc3dpdGNoJyB8fAogICAgICAgICAgICAgICAgICAgICAgICAodGhlX3N0YXRlbWVudC5ibG9jayAmJiB0aGVfc3RhdGVtZW50LmlkICE9PSAnZG8nKSkgewogICAgICAgICAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKCi8vIElmIHRoaXMgaXMgYW4gZXhwcmVzc2lvbiBzdGF0ZW1lbnQsIGRldGVybWluZSBpZiBpdCBpcyBhY2NlcHRhYmxlLgovLyBXZSBkbyBub3QgbGlrZQovLyAgICAgIG5ldyBCbGFoKCk7Ci8vIHN0YXRtZW50cy4gSWYgaXQgaXMgdG8gYmUgdXNlZCBhdCBhbGwsIG5ldyBzaG91bGQgb25seSBiZSB1c2VkIHRvIG1ha2UKLy8gb2JqZWN0cywgbm90IHNpZGUgZWZmZWN0cy4gVGhlIGV4cHJlc3Npb24gc3RhdGVtZW50cyB3ZSBkbyBsaWtlIGRvCi8vIGFzc2lnbm1lbnQgb3IgaW52b2NhdGlvbiBvciBkZWxldGUuCgogICAgICAgICAgICAgICAgaWYgKHRoZV9zdGF0ZW1lbnQuaWQgPT09ICcoJykgewogICAgICAgICAgICAgICAgICAgIGlmICh0aGVfc3RhdGVtZW50LmZpcnN0LmlkID09PSAnbmV3JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfbmV3Jyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhlX3N0YXRlbWVudC5hc3NpZ24gJiYKICAgICAgICAgICAgICAgICAgICAgICAgdGhlX3N0YXRlbWVudC5pZCAhPT0gJ2RlbGV0ZScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgdGhlX3N0YXRlbWVudC5pZCAhPT0gJysrJyAmJgogICAgICAgICAgICAgICAgICAgICAgICB0aGVfc3RhdGVtZW50LmlkICE9PSAnLS0nKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYXNzaWdubWVudF9mdW5jdGlvbl9leHByZXNzaW9uJywgdG9rZW4pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgc3RlcF9vdXQoKTsKICAgICAgICBzY29wZSA9IG9sZF9zY29wZTsKICAgICAgICByZXR1cm4gdGhlX3N0YXRlbWVudDsKICAgIH0KCgogICAgZnVuY3Rpb24gc3RhdGVtZW50cygpIHsKICAgICAgICB2YXIgYXJyYXkgPSBbXSwgZGlzcnVwdG9yLCB0aGVfc3RhdGVtZW50OwoKLy8gQSBkaXNydXB0IHN0YXRlbWVudCBtYXkgbm90IGJlIGZvbGxvd2VkIGJ5IGFueSBvdGhlciBzdGF0ZW1lbnQuCi8vIElmIHRoZSBsYXN0IHN0YXRlbWVudCBpcyBkaXNydXB0LCB0aGVuIHRoZSBzZXF1ZW5jZSBpcyBkaXNydXB0LgoKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5wb3N0c2NyaXB0ICE9PSB0cnVlKSB7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOycpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcgPT09ICd1c2Ugc3RyaWN0JykgewogICAgICAgICAgICAgICAgICAgIGlmICgoIW5vZGVfanMgJiYgeG1vZGUgIT09ICdzY3JpcHQnKSB8fCBmdW5jdCAhPT0gZ2xvYmFsX2Z1bmN0IHx8IGFycmF5Lmxlbmd0aCA+IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZnVuY3Rpb25fc3RyaWN0Jyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHVzZV9zdHJpY3QoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChkaXNydXB0b3IpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bnJlYWNoYWJsZV9hX2InLCBuZXh0X3Rva2VuLCBuZXh0X3Rva2VuLnN0cmluZywKICAgICAgICAgICAgICAgICAgICAgICAgZGlzcnVwdG9yLnN0cmluZyk7CiAgICAgICAgICAgICAgICAgICAgZGlzcnVwdG9yID0gbnVsbDsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRoZV9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnQoKTsKICAgICAgICAgICAgICAgIGlmICh0aGVfc3RhdGVtZW50KSB7CiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaCh0aGVfc3RhdGVtZW50KTsKICAgICAgICAgICAgICAgICAgICBpZiAodGhlX3N0YXRlbWVudC5kaXNydXB0KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3J1cHRvciA9IHRoZV9zdGF0ZW1lbnQ7CiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LmRpc3J1cHQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gYXJyYXk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGJsb2NrKG9yZGluYXJ5KSB7CgovLyBhcnJheSBibG9jayBpcyBhcnJheSBzZXF1ZW5jZSBvZiBzdGF0ZW1lbnRzIHdyYXBwZWQgaW4gYnJhY2VzLgovLyBvcmRpbmFyeSBpcyBmYWxzZSBmb3IgZnVuY3Rpb24gYm9kaWVzIGFuZCB0cnkgYmxvY2tzLgovLyBvcmRpbmFyeSBpcyB0cnVlIGZvciBpZiBzdGF0ZW1lbnRzLCB3aGlsZSwgZXRjLgoKICAgICAgICB2YXIgYXJyYXksCiAgICAgICAgICAgIGN1cmx5ID0gbmV4dF90b2tlbiwKICAgICAgICAgICAgb2xkX2luX2Jsb2NrID0gaW5fYmxvY2ssCiAgICAgICAgICAgIG9sZF9zY29wZSA9IHNjb3BlLAogICAgICAgICAgICBvbGRfc3RyaWN0X21vZGUgPSBzdHJpY3RfbW9kZTsKCiAgICAgICAgaW5fYmxvY2sgPSBvcmRpbmFyeTsKICAgICAgICBzY29wZSA9IE9iamVjdC5jcmVhdGUoc2NvcGUpOwogICAgICAgIHNwYWNlcygpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAneycpIHsKICAgICAgICAgICAgYWR2YW5jZSgneycpOwogICAgICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgICAgIGlmICghb3JkaW5hcnkgJiYgIXVzZV9zdHJpY3QoKSAmJiAhb2xkX3N0cmljdF9tb2RlICYmCiAgICAgICAgICAgICAgICAgICAgIW9wdGlvbi5zbG9wcHkgJiYgZnVuY3RbJyhjb250ZXh0KSddID09PSBnbG9iYWxfZnVuY3QpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ21pc3NpbmdfdXNlX3N0cmljdCcpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFycmF5ID0gc3RhdGVtZW50cygpOwogICAgICAgICAgICBzdHJpY3RfbW9kZSA9IG9sZF9zdHJpY3RfbW9kZTsKICAgICAgICAgICAgc3RlcF9vdXQoJ30nLCBjdXJseSk7CiAgICAgICAgfSBlbHNlIGlmICghb3JkaW5hcnkpIHsKICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJ3snLCBhcnRpZmFjdCgpKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAneycsIGFydGlmYWN0KCkpOwogICAgICAgICAgICBhcnJheSA9IFtzdGF0ZW1lbnQoKV07CiAgICAgICAgICAgIGFycmF5LmRpc3J1cHQgPSBhcnJheVswXS5kaXNydXB0OwogICAgICAgIH0KICAgICAgICBmdW5jdFsnKHZlcmIpJ10gPSBudWxsOwogICAgICAgIHNjb3BlID0gb2xkX3Njb3BlOwogICAgICAgIGluX2Jsb2NrID0gb2xkX2luX2Jsb2NrOwogICAgICAgIGlmIChvcmRpbmFyeSAmJiBhcnJheS5sZW5ndGggPT09IDApIHsKICAgICAgICAgICAgd2FybignZW1wdHlfYmxvY2snKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGFycmF5OwogICAgfQoKCiAgICBmdW5jdGlvbiB0YWxseV9wcm9wZXJ0eShuYW1lKSB7CiAgICAgICAgaWYgKG9wdGlvbi5wcm9wZXJ0aWVzICYmIHR5cGVvZiBwcm9wZXJ0eV90eXBlW25hbWVdICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX3Byb3BlcnR5X2EnLCB0b2tlbiwgbmFtZSk7CiAgICAgICAgfQogICAgICAgIGlmICh0eXBlb2YgbWVtYmVyW25hbWVdID09PSAnbnVtYmVyJykgewogICAgICAgICAgICBtZW1iZXJbbmFtZV0gKz0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBtZW1iZXJbbmFtZV0gPSAxOwogICAgICAgIH0KICAgIH0KCgovLyBFQ01BU2NyaXB0IHBhcnNlcgoKICAgIHN5bnRheFsnKGlkZW50aWZpZXIpJ10gPSB7CiAgICAgICAgaWQ6ICcoaWRlbnRpZmllciknLAogICAgICAgIGxicDogMCwKICAgICAgICBpZGVudGlmaWVyOiB0cnVlLAogICAgICAgIG51ZDogZnVuY3Rpb24gKCkgewogICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMuc3RyaW5nLAogICAgICAgICAgICAgICAgdmFyaWFibGUgPSBzY29wZVtuYW1lXSwKICAgICAgICAgICAgICAgIHNpdGUsCiAgICAgICAgICAgICAgICB3cml0ZWFibGU7CgovLyBJZiB0aGUgdmFyaWFibGUgaXMgbm90IGluIHNjb3BlLCB0aGVuIHdlIG1heSBoYXZlIGFuIHVuZGVjbGFyZWQgdmFyaWFibGUuCi8vIENoZWNrIHRoZSBwcmVkZWZpbmVkIGxpc3QuIElmIGl0IHdhcyBwcmVkZWZpbmVkLCBjcmVhdGUgdGhlIGdsb2JhbAovLyB2YXJpYWJsZS4KCiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFyaWFibGUgIT09ICdvYmplY3QnKSB7CiAgICAgICAgICAgICAgICB3cml0ZWFibGUgPSBwcmVkZWZpbmVkW25hbWVdOwogICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cml0ZWFibGUgPT09ICdib29sZWFuJykgewogICAgICAgICAgICAgICAgICAgIGdsb2JhbF9zY29wZVtuYW1lXSA9IHZhcmlhYmxlID0gewogICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmc6ICAgIG5hbWUsCiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlYWJsZTogd3JpdGVhYmxlLAogICAgICAgICAgICAgICAgICAgICAgICBmdW5jdDogICAgIGdsb2JhbF9mdW5jdAogICAgICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsX2Z1bmN0W25hbWVdID0gJ3Zhcic7CgovLyBCdXQgaWYgdGhlIHZhcmlhYmxlIGlzIG5vdCBpbiBzY29wZSwgYW5kIGlzIG5vdCBwcmVkZWZpbmVkLCBhbmQgaWYgd2UgYXJlIG5vdAovLyBpbiB0aGUgZ2xvYmFsIHNjb3BlLCB0aGVuIHdlIGhhdmUgYW4gdW5kZWZpbmVkIHZhcmlhYmxlIGVycm9yLgoKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb24udW5kZWYpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndXNlZF9iZWZvcmVfYScsIHRva2VuKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgc2NvcGVbbmFtZV0gPSB2YXJpYWJsZSA9IHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiBuYW1lLAogICAgICAgICAgICAgICAgICAgICAgICB3cml0ZWFibGU6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0OiBmdW5jdAogICAgICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgICAgICAgICAgZnVuY3RbbmFtZV0gPSAndW5kZWYnOwogICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgfQogICAgICAgICAgICBzaXRlID0gdmFyaWFibGUuZnVuY3Q7CgovLyBUaGUgbmFtZSBpcyBpbiBzY29wZSBhbmQgZGVmaW5lZCBpbiB0aGUgY3VycmVudCBmdW5jdGlvbi4KCiAgICAgICAgICAgIGlmIChmdW5jdCA9PT0gc2l0ZSkgewoKLy8gICAgICBDaGFuZ2UgJ3VudXNlZCcgdG8gJ3ZhcicsIGFuZCByZWplY3QgbGFiZWxzLgoKICAgICAgICAgICAgICAgIHN3aXRjaCAoZnVuY3RbbmFtZV0pIHsKICAgICAgICAgICAgICAgIGNhc2UgJ2JlY29taW5nJzoKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgZnVuY3RbbmFtZV0gPSAndmFyJzsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ3VudXNlZCc6CiAgICAgICAgICAgICAgICAgICAgZnVuY3RbbmFtZV0gPSAndmFyJzsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ3VucGFyYW0nOgogICAgICAgICAgICAgICAgICAgIGZ1bmN0W25hbWVdID0gJ3BhcmFtZXRlcic7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICd1bmN0aW9uJzoKICAgICAgICAgICAgICAgICAgICBmdW5jdFtuYW1lXSA9ICdmdW5jdGlvbic7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdsYWJlbCc6CiAgICAgICAgICAgICAgICAgICAgd2FybignYV9sYWJlbCcsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KCi8vIElmIHRoZSBuYW1lIGlzIGFscmVhZHkgZGVmaW5lZCBpbiB0aGUgY3VycmVudAovLyBmdW5jdGlvbiwgYnV0IG5vdCBhcyBvdXRlciwgdGhlbiB0aGVyZSBpcyBhIHNjb3BlIGVycm9yLgoKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHN3aXRjaCAoZnVuY3RbbmFtZV0pIHsKICAgICAgICAgICAgICAgIGNhc2UgJ2Nsb3N1cmUnOgogICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOgogICAgICAgICAgICAgICAgY2FzZSAndmFyJzoKICAgICAgICAgICAgICAgIGNhc2UgJ3VudXNlZCc6CiAgICAgICAgICAgICAgICAgICAgd2FybignYV9zY29wZScsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ2xhYmVsJzoKICAgICAgICAgICAgICAgICAgICB3YXJuKCdhX2xhYmVsJywgdG9rZW4sIG5hbWUpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnb3V0ZXInOgogICAgICAgICAgICAgICAgY2FzZSAnZ2xvYmFsJzoKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CgovLyBJZiB0aGUgbmFtZSBpcyBkZWZpbmVkIGluIGFuIG91dGVyIGZ1bmN0aW9uLCBtYWtlIGFuIG91dGVyIGVudHJ5LCBhbmQgaWYKLy8gaXQgd2FzIHVudXNlZCwgbWFrZSBpdCB2YXIuCgogICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2l0ZVtuYW1lXSkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JlY29taW5nJzoKICAgICAgICAgICAgICAgICAgICBjYXNlICdjbG9zdXJlJzoKICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFyYW1ldGVyJzoKICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmN0aW9uJzoKICAgICAgICAgICAgICAgICAgICBjYXNlICd1bnVzZWQnOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Zhcic6CiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVbbmFtZV0gPSAnY2xvc3VyZSc7CiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0W25hbWVdID0gc2l0ZSA9PT0gZ2xvYmFsX2Z1bmN0CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdnbG9iYWwnCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdvdXRlcic7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VucGFyYW0nOgogICAgICAgICAgICAgICAgICAgICAgICBzaXRlW25hbWVdID0gJ3BhcmFtZXRlcic7CiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0W25hbWVdID0gJ291dGVyJzsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5kZWYnOgogICAgICAgICAgICAgICAgICAgICAgICBmdW5jdFtuYW1lXSA9ICd1bmRlZic7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhYmVsJzoKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYV9sYWJlbCcsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiB0aGlzOwogICAgICAgIH0sCiAgICAgICAgbGVkOiBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX29wZXJhdG9yX2EnKTsKICAgICAgICB9CiAgICB9OwoKLy8gQnVpbGQgdGhlIHN5bnRheCB0YWJsZSBieSBkZWNsYXJpbmcgdGhlIHN5bnRhY3RpYyBlbGVtZW50cy4KCiAgICB0eXBlKCcoYXJyYXkpJywgJ2FycmF5Jyk7CiAgICB0eXBlKCcoY29sb3IpJywgJ2NvbG9yJyk7CiAgICB0eXBlKCcoZnVuY3Rpb24pJywgJ2Z1bmN0aW9uJyk7CiAgICB0eXBlKCcobnVtYmVyKScsICdudW1iZXInLCByZXR1cm5fdGhpcyk7CiAgICB0eXBlKCcob2JqZWN0KScsICdvYmplY3QnKTsKICAgIHR5cGUoJyhzdHJpbmcpJywgJ3N0cmluZycsIHJldHVybl90aGlzKTsKICAgIHR5cGUoJyhib29sZWFuKScsICdib29sZWFuJywgcmV0dXJuX3RoaXMpOwogICAgdHlwZSgnKHJhbmdlKScsICdyYW5nZScpOwogICAgdHlwZSgnKHJlZ2V4cCknLCAncmVnZXhwJywgcmV0dXJuX3RoaXMpOwoKICAgIHVsdGltYXRlKCcoYmVnaW4pJyk7CiAgICB1bHRpbWF0ZSgnKGVuZCknKTsKICAgIHVsdGltYXRlKCcoZXJyb3IpJyk7CiAgICBwb3N0c2NyaXB0KHN5bWJvbCgnPC8nKSk7CiAgICBzeW1ib2woJzwhJyk7CiAgICBzeW1ib2woJzwhLS0nKTsKICAgIHN5bWJvbCgnLS0+Jyk7CiAgICBwb3N0c2NyaXB0KHN5bWJvbCgnfScpKTsKICAgIHN5bWJvbCgnKScpOwogICAgc3ltYm9sKCddJyk7CiAgICBwb3N0c2NyaXB0KHN5bWJvbCgnIicpKTsKICAgIHBvc3RzY3JpcHQoc3ltYm9sKCdcJycpKTsKICAgIHN5bWJvbCgnOycpOwogICAgc3ltYm9sKCc6Jyk7CiAgICBzeW1ib2woJywnKTsKICAgIHN5bWJvbCgnIycpOwogICAgc3ltYm9sKCdAJyk7CiAgICBzeW1ib2woJyovJyk7CiAgICBwb3N0c2NyaXB0KHJlc2VydmUoJ2Nhc2UnKSk7CiAgICByZXNlcnZlKCdjYXRjaCcpOwogICAgcG9zdHNjcmlwdChyZXNlcnZlKCdkZWZhdWx0JykpOwogICAgcmVzZXJ2ZSgnZWxzZScpOwogICAgcmVzZXJ2ZSgnZmluYWxseScpOwoKICAgIHJlc2VydmV2YXIoJ2FyZ3VtZW50cycsIGZ1bmN0aW9uICh4KSB7CiAgICAgICAgaWYgKHN0cmljdF9tb2RlICYmIGZ1bmN0ID09PSBnbG9iYWxfZnVuY3QpIHsKICAgICAgICAgICAgd2Fybignc3RyaWN0JywgeCk7CiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICB3YXJuKCdhZHNhZmVfYScsIHgpOwogICAgICAgIH0KICAgIH0pOwogICAgcmVzZXJ2ZXZhcignZXZhbCcsIGZ1bmN0aW9uICh4KSB7CiAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgeCk7CiAgICAgICAgfQogICAgfSk7CiAgICBjb25zdGFudCgnZmFsc2UnLCAnYm9vbGVhbicpOwogICAgY29uc3RhbnQoJ0luZmluaXR5JywgJ251bWJlcicpOwogICAgY29uc3RhbnQoJ05hTicsICdudW1iZXInKTsKICAgIGNvbnN0YW50KCdudWxsJywgJycpOwogICAgcmVzZXJ2ZXZhcigndGhpcycsIGZ1bmN0aW9uICh4KSB7CiAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgeCk7CiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3RfbW9kZSAmJiBmdW5jdFsnKHRva2VuKSddLmFyaXR5ID09PSAnc3RhdGVtZW50JyAmJgogICAgICAgICAgICAgICAgZnVuY3RbJyhuYW1lKSddLmNoYXJBdCgwKSA+ICdaJykgewogICAgICAgICAgICB3YXJuKCdzdHJpY3QnLCB4KTsKICAgICAgICB9CiAgICB9KTsKICAgIGNvbnN0YW50KCd0cnVlJywgJ2Jvb2xlYW4nKTsKICAgIGNvbnN0YW50KCd1bmRlZmluZWQnLCAnJyk7CgogICAgaW5maXgoJz8nLCAzMCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBzdGVwX2luKCc/Jyk7CiAgICAgICAgdGhhdC5maXJzdCA9IGV4cGVjdGVkX2NvbmRpdGlvbihleHBlY3RlZF9yZWxhdGlvbihsZWZ0KSk7CiAgICAgICAgdGhhdC5zZWNvbmQgPSBleHByZXNzaW9uKDApOwogICAgICAgIHNwYWNlcygpOwogICAgICAgIHN0ZXBfb3V0KCk7CiAgICAgICAgdmFyIGNvbG9uID0gbmV4dF90b2tlbjsKICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgc3RlcF9pbignOicpOwogICAgICAgIHNwYWNlcygpOwogICAgICAgIHRoYXQudGhpcmQgPSBleHByZXNzaW9uKDEwKTsKICAgICAgICB0aGF0LmFyaXR5ID0gJ3Rlcm5hcnknOwogICAgICAgIGlmIChhcmVfc2ltaWxhcih0aGF0LnNlY29uZCwgdGhhdC50aGlyZCkpIHsKICAgICAgICAgICAgd2Fybignd2VpcmRfdGVybmFyeScsIGNvbG9uKTsKICAgICAgICB9IGVsc2UgaWYgKGFyZV9zaW1pbGFyKHRoYXQuZmlyc3QsIHRoYXQuc2Vjb25kKSkgewogICAgICAgICAgICB3YXJuKCd1c2Vfb3InLCB0aGF0KTsKICAgICAgICB9CiAgICAgICAgc3RlcF9vdXQoKTsKICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0pOwoKICAgIGluZml4KCd8fCcsIDQwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgIGZ1bmN0aW9uIHBhcmVuX2NoZWNrKHRoYXQpIHsKICAgICAgICAgICAgaWYgKHRoYXQuaWQgPT09ICcmJicgJiYgIXRoYXQucGFyZW4pIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2FuZCcsIHRoYXQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiB0aGF0OwogICAgICAgIH0KCiAgICAgICAgdGhhdC5maXJzdCA9IHBhcmVuX2NoZWNrKGV4cGVjdGVkX2NvbmRpdGlvbihleHBlY3RlZF9yZWxhdGlvbihsZWZ0KSkpOwogICAgICAgIHRoYXQuc2Vjb25kID0gcGFyZW5fY2hlY2soZXhwZWN0ZWRfcmVsYXRpb24oZXhwcmVzc2lvbig0MCkpKTsKICAgICAgICBpZiAoYXJlX3NpbWlsYXIodGhhdC5maXJzdCwgdGhhdC5zZWNvbmQpKSB7CiAgICAgICAgICAgIHdhcm4oJ3dlaXJkX2NvbmRpdGlvbicsIHRoYXQpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0pOwoKICAgIGluZml4KCcmJicsIDUwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgIHRoYXQuZmlyc3QgPSBleHBlY3RlZF9jb25kaXRpb24oZXhwZWN0ZWRfcmVsYXRpb24obGVmdCkpOwogICAgICAgIHRoYXQuc2Vjb25kID0gZXhwZWN0ZWRfcmVsYXRpb24oZXhwcmVzc2lvbig1MCkpOwogICAgICAgIGlmIChhcmVfc2ltaWxhcih0aGF0LmZpcnN0LCB0aGF0LnNlY29uZCkpIHsKICAgICAgICAgICAgd2Fybignd2VpcmRfY29uZGl0aW9uJywgdGhhdCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGF0OwogICAgfSk7CgogICAgcHJlZml4KCd2b2lkJywgZnVuY3Rpb24gKCkgewogICAgICAgIHRoaXMuZmlyc3QgPSBleHByZXNzaW9uKDApOwogICAgICAgIHRoaXMuYXJpdHkgPSAncHJlZml4JzsKICAgICAgICBpZiAob3B0aW9uLmVzNSkgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCB0aGlzLCAndW5kZWZpbmVkJywgJ3ZvaWQnKTsKICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3QubnVtYmVyICE9PSAwKSB7CiAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIHRoaXMuZmlyc3QsICcwJywgYXJ0aWZhY3QodGhpcy5maXJzdCkpOwogICAgICAgIH0KICAgICAgICB0aGlzLnR5cGUgPSAndW5kZWZpbmVkJzsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIGJpdHdpc2UoJ3wnLCA3MCk7CiAgICBiaXR3aXNlKCdeJywgODApOwogICAgYml0d2lzZSgnJicsIDkwKTsKCiAgICByZWxhdGlvbignPT0nLCAnPT09Jyk7CiAgICByZWxhdGlvbignPT09Jyk7CiAgICByZWxhdGlvbignIT0nLCAnIT09Jyk7CiAgICByZWxhdGlvbignIT09Jyk7CiAgICByZWxhdGlvbignPCcpOwogICAgcmVsYXRpb24oJz4nKTsKICAgIHJlbGF0aW9uKCc8PScpOwogICAgcmVsYXRpb24oJz49Jyk7CgogICAgYml0d2lzZSgnPDwnLCAxMjApOwogICAgYml0d2lzZSgnPj4nLCAxMjApOwogICAgYml0d2lzZSgnPj4+JywgMTIwKTsKCiAgICBpbmZpeCgnaW4nLCAxMjAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgd2FybignaW5maXhfaW4nLCB0aGF0KTsKICAgICAgICB0aGF0LmxlZnQgPSBsZWZ0OwogICAgICAgIHRoYXQucmlnaHQgPSBleHByZXNzaW9uKDEzMCk7CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9LCAnYm9vbGVhbicpOwogICAgaW5maXgoJ2luc3RhbmNlb2YnLCAxMjAsIG51bGwsICdib29sZWFuJyk7CiAgICBpbmZpeCgnKycsIDEzMCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBpZiAobGVmdC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBpZiAobGVmdC5udW1iZXIgPT09IDApIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIGxlZnQsICcwJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgaWYgKGxlZnQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgaWYgKGxlZnQuc3RyaW5nID09PSAnJykgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgbGVmdCwgJ1N0cmluZycsICdcJ1wnJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgdmFyIHJpZ2h0ID0gZXhwcmVzc2lvbigxMzApOwogICAgICAgIGlmIChyaWdodC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBpZiAocmlnaHQubnVtYmVyID09PSAwKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCByaWdodCwgJzAnKTsKICAgICAgICAgICAgfQogICAgICAgIH0gZWxzZSBpZiAocmlnaHQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgaWYgKHJpZ2h0LnN0cmluZyA9PT0gJycpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIHJpZ2h0LCAnU3RyaW5nJywgJ1wnXCcnKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBpZiAobGVmdC5pZCA9PT0gcmlnaHQuaWQpIHsKICAgICAgICAgICAgaWYgKGxlZnQuaWQgPT09ICcoc3RyaW5nKScgfHwgbGVmdC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICAgICAgaWYgKGxlZnQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgICAgICAgICBsZWZ0LnN0cmluZyArPSByaWdodC5zdHJpbmc7CiAgICAgICAgICAgICAgICAgICAgaWYgKGp4LnRlc3QobGVmdC5zdHJpbmcpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VybCcsIGxlZnQpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgbGVmdC5udW1iZXIgKz0gcmlnaHQubnVtYmVyOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgbGVmdC50aHJ1ID0gcmlnaHQudGhydTsKICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0OwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoYXQuc2Vjb25kID0gcmlnaHQ7CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9KTsKICAgIHByZWZpeCgnKycsICdudW0nKTsKICAgIHByZWZpeCgnKysrJywgZnVuY3Rpb24gKCkgewogICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJywgdG9rZW4pOwogICAgICAgIHRoaXMuZmlyc3QgPSBleHByZXNzaW9uKDE1MCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdwcmVmaXgnOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CiAgICBpbmZpeCgnKysrJywgMTMwLCBmdW5jdGlvbiAobGVmdCkgewogICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJywgdG9rZW4pOwogICAgICAgIHRoaXMuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoaXMuc2Vjb25kID0gZXhwcmVzc2lvbigxMzApOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CiAgICBpbmZpeCgnLScsIDEzMCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBpZiAoKGxlZnQuaWQgPT09ICcobnVtYmVyKScgJiYgbGVmdC5udW1iZXIgPT09IDApIHx8IGxlZnQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgbGVmdCk7CiAgICAgICAgfQogICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTMwKTsKICAgICAgICBpZiAoKHJpZ2h0LmlkID09PSAnKG51bWJlciknICYmIHJpZ2h0Lm51bWJlciA9PT0gMCkgfHwgcmlnaHQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgbGVmdCk7CiAgICAgICAgfQogICAgICAgIGlmIChsZWZ0LmlkID09PSByaWdodC5pZCAmJiBsZWZ0LmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgIGxlZnQubnVtYmVyIC09IHJpZ2h0Lm51bWJlcjsKICAgICAgICAgICAgbGVmdC50aHJ1ID0gcmlnaHQudGhydTsKICAgICAgICAgICAgcmV0dXJuIGxlZnQ7CiAgICAgICAgfQogICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoYXQuc2Vjb25kID0gcmlnaHQ7CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9LCAnbnVtYmVyJyk7CiAgICBwcmVmaXgoJy0nKTsKICAgIHByZWZpeCgnLS0tJywgZnVuY3Rpb24gKCkgewogICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJywgdG9rZW4pOwogICAgICAgIHRoaXMuZmlyc3QgPSBleHByZXNzaW9uKDE1MCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdwcmVmaXgnOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CiAgICBpbmZpeCgnLS0tJywgMTMwLCBmdW5jdGlvbiAobGVmdCkgewogICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJywgdG9rZW4pOwogICAgICAgIHRoaXMuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoaXMuc2Vjb25kID0gZXhwcmVzc2lvbigxMzApOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CiAgICBpbmZpeCgnKicsIDE0MCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBpZiAoKGxlZnQuaWQgPT09ICcobnVtYmVyKScgJiYgKGxlZnQubnVtYmVyID09PSAwIHx8IGxlZnQubnVtYmVyID09PSAxKSkgfHwgbGVmdC5pZCA9PT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBsZWZ0KTsKICAgICAgICB9CiAgICAgICAgdmFyIHJpZ2h0ID0gZXhwcmVzc2lvbigxNDApOwogICAgICAgIGlmICgocmlnaHQuaWQgPT09ICcobnVtYmVyKScgJiYgKHJpZ2h0Lm51bWJlciA9PT0gMCB8fCByaWdodC5udW1iZXIgPT09IDEpKSB8fCByaWdodC5pZCA9PT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCByaWdodCk7CiAgICAgICAgfQogICAgICAgIGlmIChsZWZ0LmlkID09PSByaWdodC5pZCAmJiBsZWZ0LmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgIGxlZnQubnVtYmVyICo9IHJpZ2h0Lm51bWJlcjsKICAgICAgICAgICAgbGVmdC50aHJ1ID0gcmlnaHQudGhydTsKICAgICAgICAgICAgcmV0dXJuIGxlZnQ7CiAgICAgICAgfQogICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoYXQuc2Vjb25kID0gcmlnaHQ7CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9LCAnbnVtYmVyJyk7CiAgICBpbmZpeCgnLycsIDE0MCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBpZiAoKGxlZnQuaWQgPT09ICcobnVtYmVyKScgJiYgbGVmdC5udW1iZXIgPT09IDApIHx8IGxlZnQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgbGVmdCk7CiAgICAgICAgfQogICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTQwKTsKICAgICAgICBpZiAoKHJpZ2h0LmlkID09PSAnKG51bWJlciknICYmIChyaWdodC5udW1iZXIgPT09IDAgfHwgcmlnaHQubnVtYmVyID09PSAxKSkgfHwgcmlnaHQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgcmlnaHQpOwogICAgICAgIH0KICAgICAgICBpZiAobGVmdC5pZCA9PT0gcmlnaHQuaWQgJiYgbGVmdC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBsZWZ0Lm51bWJlciAvPSByaWdodC5udW1iZXI7CiAgICAgICAgICAgIGxlZnQudGhydSA9IHJpZ2h0LnRocnU7CiAgICAgICAgICAgIHJldHVybiBsZWZ0OwogICAgICAgIH0KICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IHJpZ2h0OwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJ251bWJlcicpOwogICAgaW5maXgoJyUnLCAxNDAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgaWYgKChsZWZ0LmlkID09PSAnKG51bWJlciknICYmIChsZWZ0Lm51bWJlciA9PT0gMCB8fCBsZWZ0Lm51bWJlciA9PT0gMSkpIHx8IGxlZnQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgbGVmdCk7CiAgICAgICAgfQogICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTQwKTsKICAgICAgICBpZiAoKHJpZ2h0LmlkID09PSAnKG51bWJlciknICYmIHJpZ2h0Lm51bWJlciA9PT0gMCkgfHwgcmlnaHQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgcmlnaHQpOwogICAgICAgIH0KICAgICAgICBpZiAobGVmdC5pZCA9PT0gcmlnaHQuaWQgJiYgbGVmdC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBsZWZ0Lm51bWJlciAlPSByaWdodC5udW1iZXI7CiAgICAgICAgICAgIGxlZnQudGhydSA9IHJpZ2h0LnRocnU7CiAgICAgICAgICAgIHJldHVybiBsZWZ0OwogICAgICAgIH0KICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IHJpZ2h0OwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJ251bWJlcicpOwoKICAgIHN1ZmZpeCgnKysnKTsKICAgIHByZWZpeCgnKysnKTsKCiAgICBzdWZmaXgoJy0tJyk7CiAgICBwcmVmaXgoJy0tJyk7CiAgICBwcmVmaXgoJ2RlbGV0ZScsIGZ1bmN0aW9uICgpIHsKICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICB2YXIgcCA9IGV4cHJlc3Npb24oMCk7CiAgICAgICAgaWYgKCFwIHx8IChwLmlkICE9PSAnLicgJiYgcC5pZCAhPT0gJ1snKSkgewogICAgICAgICAgICB3YXJuKCdkZWxldGVkJyk7CiAgICAgICAgfQogICAgICAgIHRoaXMuZmlyc3QgPSBwOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgoKICAgIHByZWZpeCgnficsIGZ1bmN0aW9uICgpIHsKICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgaWYgKCFvcHRpb24uYml0d2lzZSkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgZXhwcmVzc2lvbigxNTApOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSwgJ251bWJlcicpOwogICAgcHJlZml4KCchJywgZnVuY3Rpb24gKCkgewogICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwZWN0ZWRfY29uZGl0aW9uKGV4cHJlc3Npb24oMTUwKSk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdwcmVmaXgnOwogICAgICAgIGlmIChiYW5nW3RoaXMuZmlyc3QuaWRdID09PSB0cnVlKSB7CiAgICAgICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSwgJ2Jvb2xlYW4nKTsKICAgIHByZWZpeCgndHlwZW9mJywgbnVsbCwgJ3N0cmluZycpOwogICAgcHJlZml4KCduZXcnLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdmFyIGMgPSBleHByZXNzaW9uKDE2MCksIG4sIHAsIHY7CiAgICAgICAgdGhpcy5maXJzdCA9IGM7CiAgICAgICAgaWYgKGMuaWQgIT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgaWYgKGMuaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgc3dpdGNoIChjLnN0cmluZykgewogICAgICAgICAgICAgICAgY2FzZSAnT2JqZWN0JzoKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2Vfb2JqZWN0JywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOgogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcCA9IG5leHRfdG9rZW47CiAgICAgICAgICAgICAgICAgICAgICAgIHAuZmlyc3QgPSB0aGlzOwogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBleHByZXNzaW9uKDApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5zZWNvbmQgPSBbbl07CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobi50eXBlICE9PSAnbnVtYmVyJyB8fCBuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2VfYXJyYXknLCBwKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5zZWNvbmQucHVzaChleHByZXNzaW9uKDApKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VzZV9hcnJheScsIHRva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcpJywgcCk7CiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2VfYXJyYXknLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOgogICAgICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOgogICAgICAgICAgICAgICAgY2FzZSAnTWF0aCc6CiAgICAgICAgICAgICAgICBjYXNlICdKU09OJzoKICAgICAgICAgICAgICAgICAgICB3YXJuKCdub3RfYV9jb25zdHJ1Y3RvcicsIGMpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnRnVuY3Rpb24nOgogICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmV2aWwpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZnVuY3Rpb25fZXZhbCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOgogICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzoKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgaWYgKGMuaWQgIT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgdiA9IGMuc3RyaW5nLmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb24ubmV3Y2FwICYmICh2IDwgJ0EnIHx8IHYgPiAnWicpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdjb25zdHJ1Y3Rvcl9uYW1lX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBpZiAoYy5pZCAhPT0gJy4nICYmIGMuaWQgIT09ICdbJyAmJiBjLmlkICE9PSAnKCcpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfY29uc3RydWN0b3InLCB0b2tlbik7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgewogICAgICAgICAgICB3YXJuKCd3ZWlyZF9uZXcnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoJykgewogICAgICAgICAgICB3YXJuKCdtaXNzaW5nX2EnLCBuZXh0X3Rva2VuLCAnKCknKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBpbmZpeCgnKCcsIDE2MCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICB2YXIgcDsKICAgICAgICBpZiAoaW5kZW50ICYmIGluZGVudC5tb2RlID09PSAnZXhwcmVzc2lvbicpIHsKICAgICAgICAgICAgbm9fc3BhY2UocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgIH0KICAgICAgICBpZiAoIWxlZnQuaW1tZWQgJiYgbGVmdC5pZCA9PT0gJ2Z1bmN0aW9uJykgewogICAgICAgICAgICB3YXJuKCd3cmFwX2ltbWVkaWF0ZScpOwogICAgICAgIH0KICAgICAgICBwID0gW107CiAgICAgICAgaWYgKGxlZnQuaWRlbnRpZmllcikgewogICAgICAgICAgICBpZiAobGVmdC5zdHJpbmcubWF0Y2goL15bQS1aXShbQS1aMC05XyRdKlthLXpdW0EtWmEtejAtOV8kXSopPyQvKSkgewogICAgICAgICAgICAgICAgaWYgKGxlZnQuc3RyaW5nICE9PSAnTnVtYmVyJyAmJiBsZWZ0LnN0cmluZyAhPT0gJ1N0cmluZycgJiYKICAgICAgICAgICAgICAgICAgICAgICAgbGVmdC5zdHJpbmcgIT09ICdCb29sZWFuJyAmJiBsZWZ0LnN0cmluZyAhPT0gJ0RhdGUnKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQuc3RyaW5nID09PSAnTWF0aCcgfHwgbGVmdC5zdHJpbmcgPT09ICdKU09OJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdub3RfYV9mdW5jdGlvbicsIGxlZnQpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdC5zdHJpbmcgPT09ICdPYmplY3QnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VzZV9vYmplY3QnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsZWZ0LnN0cmluZyA9PT0gJ0FycmF5JyB8fCAhb3B0aW9uLm5ld2NhcCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdtaXNzaW5nX2EnLCBsZWZ0LCAnbmV3Jyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIGlmIChsZWZ0LmlkID09PSAnLicpIHsKICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlICYmIGxlZnQuZmlyc3Quc3RyaW5nID09PSAnTWF0aCcgJiYKICAgICAgICAgICAgICAgICAgICBsZWZ0LnNlY29uZCA9PT0gJ3JhbmRvbScpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgbGVmdCk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdC5zZWNvbmQuc3RyaW5nID09PSAnc3BsaXQnICYmCiAgICAgICAgICAgICAgICAgICAgbGVmdC5maXJzdC5pZCA9PT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICAgICAgd2FybigndXNlX2FycmF5JywgbGVmdC5zZWNvbmQpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHN0ZXBfaW4oKTsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyknKSB7CiAgICAgICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgICAgIHAucHVzaChleHByZXNzaW9uKDEwKSk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgc3RlcF9vdXQoJyknLCB0aGF0KTsKICAgICAgICBpZiAodHlwZW9mIGxlZnQgPT09ICdvYmplY3QnKSB7CiAgICAgICAgICAgIGlmIChsZWZ0LnN0cmluZyA9PT0gJ3BhcnNlSW50JyAmJiBwLmxlbmd0aCA9PT0gMSkgewogICAgICAgICAgICAgICAgd2FybigncmFkaXgnLCBsZWZ0KTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoIW9wdGlvbi5ldmlsKSB7CiAgICAgICAgICAgICAgICBpZiAobGVmdC5zdHJpbmcgPT09ICdldmFsJyB8fCBsZWZ0LnN0cmluZyA9PT0gJ0Z1bmN0aW9uJyB8fAogICAgICAgICAgICAgICAgICAgICAgICBsZWZ0LnN0cmluZyA9PT0gJ2V4ZWNTY3JpcHQnKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXZpbCcsIGxlZnQpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwWzBdICYmIHBbMF0uaWQgPT09ICcoc3RyaW5nKScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgKGxlZnQuc3RyaW5nID09PSAnc2V0VGltZW91dCcgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbGVmdC5zdHJpbmcgPT09ICdzZXRJbnRlcnZhbCcpKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignaW1wbGllZF9ldmlsJywgbGVmdCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCFsZWZ0LmlkZW50aWZpZXIgJiYgbGVmdC5pZCAhPT0gJy4nICYmIGxlZnQuaWQgIT09ICdbJyAmJgogICAgICAgICAgICAgICAgICAgIGxlZnQuaWQgIT09ICcoJyAmJiBsZWZ0LmlkICE9PSAnJiYnICYmIGxlZnQuaWQgIT09ICd8fCcgJiYKICAgICAgICAgICAgICAgICAgICBsZWZ0LmlkICE9PSAnPycpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF9pbnZvY2F0aW9uJywgbGVmdCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgdGhhdC5maXJzdCA9IGxlZnQ7CiAgICAgICAgdGhhdC5zZWNvbmQgPSBwOwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJycsIHRydWUpOwoKICAgIHByZWZpeCgnKCcsIGZ1bmN0aW9uICgpIHsKICAgICAgICBzdGVwX2luKCdleHByZXNzaW9uJyk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBlZGdlKCk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgbmV4dF90b2tlbi5pbW1lZCA9IHRydWU7CiAgICAgICAgfQogICAgICAgIHZhciB2YWx1ZSA9IGV4cHJlc3Npb24oMCk7CiAgICAgICAgdmFsdWUucGFyZW4gPSB0cnVlOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgc3RlcF9vdXQoJyknLCB0aGlzKTsKICAgICAgICBpZiAodmFsdWUuaWQgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoJykgewogICAgICAgICAgICAgICAgd2FybignbW92ZV9pbnZvY2F0aW9uJyk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB3YXJuKCdiYWRfd3JhcCcsIHRoaXMpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiB2YWx1ZTsKICAgIH0pOwoKICAgIGluZml4KCcuJywgMTcwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgIG5vX3NwYWNlKHByZXZfdG9rZW4sIHRva2VuKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHZhciBuYW1lID0gaWRlbnRpZmllcigpLCB0eXBlOwogICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgdGFsbHlfcHJvcGVydHkobmFtZSk7CiAgICAgICAgfQogICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoYXQuc2Vjb25kID0gdG9rZW47CiAgICAgICAgaWYgKGxlZnQgJiYgbGVmdC5zdHJpbmcgPT09ICdhcmd1bWVudHMnICYmCiAgICAgICAgICAgICAgICAobmFtZSA9PT0gJ2NhbGxlZScgfHwgbmFtZSA9PT0gJ2NhbGxlcicpKSB7CiAgICAgICAgICAgIHdhcm4oJ2F2b2lkX2EnLCBsZWZ0LCAnYXJndW1lbnRzLicgKyBuYW1lKTsKICAgICAgICB9IGVsc2UgaWYgKCFvcHRpb24uZXZpbCAmJiBsZWZ0ICYmIGxlZnQuc3RyaW5nID09PSAnZG9jdW1lbnQnICYmCiAgICAgICAgICAgICAgICAobmFtZSA9PT0gJ3dyaXRlJyB8fCBuYW1lID09PSAnd3JpdGVsbicpKSB7CiAgICAgICAgICAgIHdhcm4oJ3dyaXRlX2lzX3dyb25nJywgbGVmdCk7CiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uYWRzYWZlKSB7CiAgICAgICAgICAgIGlmICghYWRzYWZlX3RvcCAmJiBsZWZ0LnN0cmluZyA9PT0gJ0FEU0FGRScpIHsKICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSAnaWQnIHx8IG5hbWUgPT09ICdsaWInKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGF0KTsKICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2dvJykgewogICAgICAgICAgICAgICAgICAgIGlmICh4bW9kZSAhPT0gJ3NjcmlwdCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGF0KTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFkc2FmZV93ZW50IHx8IG5leHRfdG9rZW4uaWQgIT09ICcoJyB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlaygwKS5pZCAhPT0gJyhzdHJpbmcpJyB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlaygwKS5zdHJpbmcgIT09IGFkc2FmZV9pZCB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlaygxKS5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9hJywgdGhhdCwgJ2dvJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkc2FmZV93ZW50ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBhZHNhZmVfbWF5ID0gZmFsc2U7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWRzYWZlX3RvcCA9IGZhbHNlOwogICAgICAgIH0KICAgICAgICBpZiAoIW9wdGlvbi5ldmlsICYmIChuYW1lID09PSAnZXZhbCcgfHwgbmFtZSA9PT0gJ2V4ZWNTY3JpcHQnKSkgewogICAgICAgICAgICB3YXJuKCdldmlsJyk7CiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICBpZiAoYmFubmVkW25hbWVdID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0b2tlbiwgbmFtZSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZWRlZmluZWRbbGVmdC5zdHJpbmddICE9PSAnYm9vbGVhbicgfHwgICAgLy8vLyBjaGVjayBmb3Igd3JpdGVhYmxlCiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgPT09ICcoJykgewogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcuJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdGhhdCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcuJyk7CiAgICAgICAgICAgICAgICB0b2tlbi5maXJzdCA9IHRoYXQ7CiAgICAgICAgICAgICAgICB0b2tlbi5zZWNvbmQgPSBuYW1lOwogICAgICAgICAgICAgICAgdGhhdCA9IHRva2VuOwogICAgICAgICAgICAgICAgbmFtZSA9IGlkZW50aWZpZXIoKTsKICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgICAgICAgICB0YWxseV9wcm9wZXJ0eShuYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICB0eXBlID0gcHJvcGVydHlfdHlwZVtuYW1lXTsKICAgICAgICBpZiAodHlwZSAmJiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZSAhPT0gJyonKSB7CiAgICAgICAgICAgIHRoYXQudHlwZSA9IHR5cGU7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJycsIHRydWUpOwoKICAgIGluZml4KCdbJywgMTcwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgIHZhciBlLCBzOwogICAgICAgIG5vX3NwYWNlX29ubHkocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgc3RlcF9pbigpOwogICAgICAgIGVkZ2UoKTsKICAgICAgICBlID0gZXhwcmVzc2lvbigwKTsKICAgICAgICBzd2l0Y2ggKGUudHlwZSkgewogICAgICAgIGNhc2UgJ251bWJlcic6CiAgICAgICAgICAgIGlmIChlLmlkID09PSAnKG51bWJlciknICYmIGxlZnQuaWQgPT09ICdhcmd1bWVudHMnKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1c2VfcGFyYW0nLCBsZWZ0KTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdzdHJpbmcnOgogICAgICAgICAgICBpZiAoZS5pZCA9PT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlICYmIChiYW5uZWRbZS5zdHJpbmddIHx8CiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RyaW5nLmNoYXJBdCgwKSA9PT0gJ18nIHx8IGUuc3RyaW5nLnNsaWNlKC0xKSA9PT0gJ18nKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9zdWJzY3JpcHRfYScsIGUpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uLmV2aWwgJiYKICAgICAgICAgICAgICAgICAgICAgICAgKGUuc3RyaW5nID09PSAnZXZhbCcgfHwgZS5zdHJpbmcgPT09ICdleGVjU2NyaXB0JykpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdldmlsJywgZSk7CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvcHRpb24uc3ViICYmIGl4LnRlc3QoZS5zdHJpbmcpKSB7CiAgICAgICAgICAgICAgICAgICAgcyA9IHN5bnRheFtlLnN0cmluZ107CiAgICAgICAgICAgICAgICAgICAgaWYgKCFzIHx8ICFzLnJlc2VydmVkKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3N1YnNjcmlwdCcsIGUpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRhbGx5X3Byb3BlcnR5KGUuc3RyaW5nKTsKICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uc2FmZSAmJiBlLmlkICE9PSAndHlwZW9mJykgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3N1YnNjcmlwdF9hJywgZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSB1bmRlZmluZWQ6CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3N1YnNjcmlwdF9hJywgZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfc3Vic2NyaXB0X2EnLCBlKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzdGVwX291dCgnXScsIHRoYXQpOwogICAgICAgIG5vX3NwYWNlKHByZXZfdG9rZW4sIHRva2VuKTsKICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IGU7CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9LCAnJywgdHJ1ZSk7CgogICAgcHJlZml4KCdbJywgZnVuY3Rpb24gKCkgewogICAgICAgIHRoaXMuYXJpdHkgPSAncHJlZml4JzsKICAgICAgICB0aGlzLmZpcnN0ID0gW107CiAgICAgICAgc3RlcF9pbignYXJyYXknKTsKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCAhPT0gJyhlbmQpJykgewogICAgICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJywnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ10nKSB7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgICBpbmRlbnQud3JhcCA9IGZhbHNlOwogICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgIHRoaXMuZmlyc3QucHVzaChleHByZXNzaW9uKDEwKSk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ10nICYmICFvcHRpb24uZXM1KSB7CiAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgc3RlcF9vdXQoJ10nLCB0aGlzKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0sIDE3MCk7CgoKICAgIGZ1bmN0aW9uIHByb3BlcnR5X25hbWUoKSB7CiAgICAgICAgdmFyIGlkID0gb3B0aW9uYWxfaWRlbnRpZmllcih0cnVlKTsKICAgICAgICBpZiAoIWlkKSB7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICBpZCA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lZFtpZF0pIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlkLmNoYXJBdCgwKSA9PT0gJ18nIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZC5jaGFyQXQoaWQubGVuZ3RoIC0gMSkgPT09ICdfJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdkYW5nbGluZ19hJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgICAgIGlkID0gbmV4dF90b2tlbi5udW1iZXIudG9TdHJpbmcoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gaWQ7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGZ1bmN0aW9uX3BhcmFtcygpIHsKICAgICAgICB2YXIgaWQsIHBhcmVuID0gbmV4dF90b2tlbiwgcGFyYW1zID0gW107CiAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgIHN0ZXBfaW4oKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKScpIHsKICAgICAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICAgICAgc3RlcF9vdXQoJyknLCBwYXJlbik7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB9CiAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgIGlkID0gaWRlbnRpZmllcigpOwogICAgICAgICAgICBwYXJhbXMucHVzaCh0b2tlbik7CiAgICAgICAgICAgIGFkZF9sYWJlbCh0b2tlbiwgb3B0aW9uLnVucGFyYW0gPyAncGFyYW1ldGVyJyA6ICd1bnBhcmFtJyk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgICAgICAgICAgc3RlcF9vdXQoJyknLCBwYXJlbik7CiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBjb21wbGV4aXR5KGV4cCkgewogICAgICAgIHZhciBzY29yZSA9IDA7CiAgICAgICAgaWYgKGV4cCkgewogICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShleHApKSB7CiAgICAgICAgICAgICAgICBleHAuZm9yRWFjaChmdW5jdGlvbiAodG9rKSB7CiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eSh0b2spOwogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV4cC5hcml0eSkgewogICAgICAgICAgICAgICAgY2FzZSAnc3RhdGVtZW50JzoKICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGV4cC5pZCkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2lmJzoKICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpICsgY29tcGxleGl0eShleHAuYmxvY2spICsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXhpdHkoZXhwWydlbHNlJ10pICsgMTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2hpbGUnOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RvJzoKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cC5maXJzdC5pZCAhPT0gJ3RydWUnICYmIGV4cC5maXJzdC5udW1iZXIgIT09IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpICsgY29tcGxleGl0eShleHAuYmxvY2spOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICdmb3InOgogICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwLnNlY29uZCAhPT0gdW5kZWZpbmVkICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwLnNlY29uZC5pZCAhPT0gJ3RydWUnICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwLnNlY29uZC5udW1iZXIgIT09IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpICsgY29tcGxleGl0eShleHAuc2Vjb25kKSArCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV4aXR5KGV4cC50aGlyZCkgKyBjb21wbGV4aXR5KGV4cC5ibG9jayk7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N3aXRjaCc6CiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbXBsZXhpdHkoZXhwLmZpcnN0KSArCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV4aXR5KGV4cC5zZWNvbmQpICsgZXhwLnNlY29uZC5sZW5ndGg7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHAuc2Vjb25kW2V4cC5zZWNvbmQubGVuZ3RoIC0gMV0uaWQgPT09ICdkZWZhdWx0JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgLT0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICd0cnknOgogICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwLnNlY29uZCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwLnRoaXJkKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbXBsZXhpdHkoZXhwLmZpcnN0KSArIGNvbXBsZXhpdHkoZXhwLnNlY29uZCkgKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxleGl0eShleHAudGhpcmQpICsgY29tcGxleGl0eShleHAuYmxvY2spOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdwcmVmaXgnOgogICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbXBsZXhpdHkoZXhwLmZpcnN0KTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ2Nhc2UnOgogICAgICAgICAgICAgICAgY2FzZSAnaW5maXgnOgogICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbXBsZXhpdHkoZXhwLmZpcnN0KSArIGNvbXBsZXhpdHkoZXhwLnNlY29uZCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cC5pZCA9PT0gJyYmJyB8fCBleHAuaWQgPT09ICd8fCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICd0ZXJuYXJ5JzoKICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb21wbGV4aXR5KGV4cC5maXJzdCkgKyBjb21wbGV4aXR5KGV4cC5zZWNvbmQpICsgY29tcGxleGl0eShleHAudGhpcmQpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiBzY29yZTsKICAgIH0KCgogICAgZnVuY3Rpb24gZG9fZnVuY3Rpb24oZnVuYywgbmFtZSkgewogICAgICAgIHZhciBvbGRfZnVuY3QgICAgICA9IGZ1bmN0LAogICAgICAgICAgICBvbGRfb3B0aW9uICAgICA9IG9wdGlvbiwKICAgICAgICAgICAgb2xkX3Njb3BlICAgICAgPSBzY29wZTsKICAgICAgICBmdW5jdCA9IHsKICAgICAgICAgICAgJyhuYW1lKScgICAgIDogbmFtZSB8fCAnXCcnICsgKGFub25uYW1lIHx8ICcnKS5yZXBsYWNlKG54LCBzYW5pdGl6ZSkgKyAnXCcnLAogICAgICAgICAgICAnKGxpbmUpJyAgICAgOiBuZXh0X3Rva2VuLmxpbmUsCiAgICAgICAgICAgICcoY29udGV4dCknICA6IG9sZF9mdW5jdCwKICAgICAgICAgICAgJyhicmVha2FnZSknIDogMCwKICAgICAgICAgICAgJyhsb29wYWdlKScgIDogMCwKICAgICAgICAgICAgJyhzY29wZSknICAgIDogc2NvcGUsCiAgICAgICAgICAgICcodG9rZW4pJyAgICA6IGZ1bmMKICAgICAgICB9OwogICAgICAgIG9wdGlvbiA9IE9iamVjdC5jcmVhdGUob2xkX29wdGlvbik7CiAgICAgICAgc2NvcGUgPSBPYmplY3QuY3JlYXRlKG9sZF9zY29wZSk7CiAgICAgICAgZnVuY3Rpb25zLnB1c2goZnVuY3QpOwogICAgICAgIGZ1bmMubmFtZSA9IG5hbWU7CiAgICAgICAgaWYgKG5hbWUpIHsKICAgICAgICAgICAgYWRkX2xhYmVsKGZ1bmMsICdmdW5jdGlvbicsIG5hbWUpOwogICAgICAgIH0KICAgICAgICBmdW5jLndyaXRlYWJsZSA9IGZhbHNlOwogICAgICAgIGZ1bmMuZmlyc3QgPSBmdW5jdFsnKHBhcmFtcyknXSA9IGZ1bmN0aW9uX3BhcmFtcygpOwogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIGZ1bmMuYmxvY2sgPSBibG9jayhmYWxzZSk7CiAgICAgICAgaWYgKGZ1bmN0Wycob2xkX3Byb3BlcnR5X3R5cGUpJ10pIHsKICAgICAgICAgICAgcHJvcGVydHlfdHlwZSA9IGZ1bmN0Wycob2xkX3Byb3BlcnR5X3R5cGUpJ107CiAgICAgICAgICAgIGRlbGV0ZSBmdW5jdFsnKG9sZF9wcm9wZXJ0eV90eXBlKSddOwogICAgICAgIH0KICAgICAgICBmdW5jdFsnKGNvbXBsZXhpdHkpJ10gPSBjb21wbGV4aXR5KGZ1bmMuYmxvY2spICsgMTsKICAgICAgICBpZiAob3B0aW9uLmNvbmZ1c2lvbikgewogICAgICAgICAgICBmdW5jdFsnKGNvbmZ1c2lvbiknXSA9IHRydWU7CiAgICAgICAgfQogICAgICAgIGZ1bmN0ICAgICAgPSBvbGRfZnVuY3Q7CiAgICAgICAgb3B0aW9uICAgICA9IG9sZF9vcHRpb247CiAgICAgICAgc2NvcGUgICAgICA9IG9sZF9zY29wZTsKICAgIH0KCgogICAgYXNzaWdub3AoJz0nKTsKICAgIGFzc2lnbm9wKCcrPScsICcrJyk7CiAgICBhc3NpZ25vcCgnLT0nLCAnLScpOwogICAgYXNzaWdub3AoJyo9JywgJyonKTsKICAgIGFzc2lnbm9wKCcvPScsICcvJykubnVkID0gZnVuY3Rpb24gKCkgewogICAgICAgIHN0b3AoJ3NsYXNoX2VxdWFsJyk7CiAgICB9OwogICAgYXNzaWdub3AoJyU9JywgJyUnKTsKICAgIGFzc2lnbm9wKCcmPScsICcmJyk7CiAgICBhc3NpZ25vcCgnfD0nLCAnfCcpOwogICAgYXNzaWdub3AoJ149JywgJ14nKTsKICAgIGFzc2lnbm9wKCc8PD0nLCAnPDwnKTsKICAgIGFzc2lnbm9wKCc+Pj0nLCAnPj4nKTsKICAgIGFzc2lnbm9wKCc+Pj49JywgJz4+PicpOwoKCiAgICBwcmVmaXgoJ3snLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgdmFyIGdldCwgaSwgaiwgbmFtZSwgcCwgc2V0LCBzZWVuID0ge307CiAgICAgICAgdGhpcy5hcml0eSA9ICdwcmVmaXgnOwogICAgICAgIHRoaXMuZmlyc3QgPSBbXTsKICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgIT09ICd9JykgewogICAgICAgICAgICBpbmRlbnQud3JhcCA9IGZhbHNlOwoKLy8gSlNMaW50IHJlY29nbml6ZXMgdGhlIEVTNSBleHRlbnNpb24gZm9yIGdldC9zZXQgaW4gb2JqZWN0IGxpdGVyYWxzLAovLyBidXQgcmVxdWlyZXMgdGhhdCB0aGV5IGJlIHVzZWQgaW4gcGFpcnMuCgogICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ2dldCcgJiYgcGVlaygpLmlkICE9PSAnOicpIHsKICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmVzNSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2VzNScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZ2V0ID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ2dldCcpOwogICAgICAgICAgICAgICAgb25lX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIG5hbWUgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgaSA9IHByb3BlcnR5X25hbWUoKTsKICAgICAgICAgICAgICAgIGlmICghaSkgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ21pc3NpbmdfcHJvcGVydHknKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGdldC5zdHJpbmcgPSAnJzsKICAgICAgICAgICAgICAgIGRvX2Z1bmN0aW9uKGdldCk7CiAgICAgICAgICAgICAgICBpZiAoZnVuY3RbJyhsb29wYWdlKSddKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZnVuY3Rpb25fbG9vcCcsIGdldCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBwID0gZ2V0LmZpcnN0OwogICAgICAgICAgICAgICAgaWYgKHApIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdwYXJhbWV0ZXJfYV9nZXRfYicsIHBbMF0sIHBbMF0uc3RyaW5nLCBpKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgICAgICBzZXQgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgc2V0LnN0cmluZyA9ICcnOwogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCdzZXQnKTsKICAgICAgICAgICAgICAgIG9uZV9zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgICAgICBqID0gcHJvcGVydHlfbmFtZSgpOwogICAgICAgICAgICAgICAgaWYgKGkgIT09IGopIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCB0b2tlbiwgaSwgaiB8fCBuZXh0X3Rva2VuLnN0cmluZyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBkb19mdW5jdGlvbihzZXQpOwogICAgICAgICAgICAgICAgcCA9IHNldC5maXJzdDsKICAgICAgICAgICAgICAgIGlmICghcCB8fCBwLmxlbmd0aCAhPT0gMSkgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3BhcmFtZXRlcl9zZXRfYScsIHNldCwgJ3ZhbHVlJyk7CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBbMF0uc3RyaW5nICE9PSAndmFsdWUnKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgcFswXSwgJ3ZhbHVlJywgcFswXS5zdHJpbmcpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgbmFtZS5maXJzdCA9IFtnZXQsIHNldF07CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBuYW1lID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgICAgIGkgPSBwcm9wZXJ0eV9uYW1lKCk7CiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGkgIT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnbWlzc2luZ19wcm9wZXJ0eScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgICAgICBuYW1lLmZpcnN0ID0gZXhwcmVzc2lvbigxMCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5maXJzdC5wdXNoKG5hbWUpOwogICAgICAgICAgICBpZiAoc2VlbltpXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgd2FybignZHVwbGljYXRlX2EnLCBuZXh0X3Rva2VuLCBpKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBzZWVuW2ldID0gdHJ1ZTsKICAgICAgICAgICAgdGFsbHlfcHJvcGVydHkoaSk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ30nICYmICFvcHRpb24uZXM1KSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgc3RlcF9vdXQoJ30nLCB0aGlzKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIHN0bXQoJ3snLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgd2Fybignc3RhdGVtZW50X2Jsb2NrJyk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuYmxvY2sgPSBzdGF0ZW1lbnRzKCk7CiAgICAgICAgdGhpcy5kaXNydXB0ID0gdGhpcy5ibG9jay5kaXNydXB0OwogICAgICAgIGFkdmFuY2UoJ30nLCB0aGlzKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIHN0bXQoJy8qZ2xvYmFsJywgZGlyZWN0aXZlKTsKICAgIHN0bXQoJy8qZ2xvYmFscycsIGRpcmVjdGl2ZSk7CiAgICBzdG10KCcvKmpzbGludCcsIGRpcmVjdGl2ZSk7CiAgICBzdG10KCcvKm1lbWJlcicsIGRpcmVjdGl2ZSk7CiAgICBzdG10KCcvKm1lbWJlcnMnLCBkaXJlY3RpdmUpOwogICAgc3RtdCgnLypwcm9wZXJ0eScsIGRpcmVjdGl2ZSk7CiAgICBzdG10KCcvKnByb3BlcnRpZXMnLCBkaXJlY3RpdmUpOwoKICAgIHN0bXQoJ3ZhcicsIGZ1bmN0aW9uICgpIHsKCi8vIEphdmFTY3JpcHQgZG9lcyBub3QgaGF2ZSBibG9jayBzY29wZS4gSXQgb25seSBoYXMgZnVuY3Rpb24gc2NvcGUuIFNvLAovLyBkZWNsYXJpbmcgYSB2YXJpYWJsZSBpbiBhIGJsb2NrIGNhbiBoYXZlIHVuZXhwZWN0ZWQgY29uc2VxdWVuY2VzLgoKLy8gdmFyLmZpcnN0IHdpbGwgY29udGFpbiBhbiBhcnJheSwgdGhlIGFycmF5IGNvbnRhaW5pbmcgbmFtZSB0b2tlbnMKLy8gYW5kIGFzc2lnbm1lbnQgdG9rZW5zLgoKICAgICAgICB2YXIgYXNzaWduLCBpZCwgbmFtZTsKCiAgICAgICAgaWYgKGZ1bmN0WycodmFycyknXSAmJiAhb3B0aW9uLnZhcnMpIHsKICAgICAgICAgICAgd2FybignY29tYmluZV92YXInKTsKICAgICAgICB9IGVsc2UgaWYgKGZ1bmN0ICE9PSBnbG9iYWxfZnVuY3QpIHsKICAgICAgICAgICAgZnVuY3RbJyh2YXJzKSddID0gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuZmlyc3QgPSBbXTsKICAgICAgICBzdGVwX2luKCd2YXInKTsKICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIG5hbWUgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICBpZCA9IGlkZW50aWZpZXIoKTsKICAgICAgICAgICAgYWRkX2xhYmVsKG5hbWUsICdiZWNvbWluZycpOwoKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICc9JykgewogICAgICAgICAgICAgICAgYXNzaWduID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgICAgIGFzc2lnbi5maXJzdCA9IG5hbWU7CiAgICAgICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJz0nKTsKICAgICAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICd1bmRlZmluZWQnKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybigndW5uZWNlc3NhcnlfaW5pdGlhbGl6ZScsIHRva2VuLCBpZCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAocGVlaygwKS5pZCA9PT0gJz0nICYmIG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3Zhcl9hX25vdCcpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYXNzaWduLnNlY29uZCA9IGV4cHJlc3Npb24oMCk7CiAgICAgICAgICAgICAgICBhc3NpZ24uYXJpdHkgPSAnaW5maXgnOwogICAgICAgICAgICAgICAgdGhpcy5maXJzdC5wdXNoKGFzc2lnbik7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0LnB1c2gobmFtZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGZ1bmN0W2lkXSA9PT0gJ2JlY29taW5nJykgewogICAgICAgICAgICAgICAgZnVuY3RbaWRdID0gJ3VudXNlZCc7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgaW5kZW50LndyYXAgPSBmYWxzZTsKICAgICAgICAgICAgaWYgKHZhcl9tb2RlICYmIG5leHRfdG9rZW4ubGluZSA9PT0gdG9rZW4ubGluZSAmJgogICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QubGVuZ3RoID09PSAxKSB7CiAgICAgICAgICAgICAgICB2YXJfbW9kZSA9IG51bGw7CiAgICAgICAgICAgICAgICBpbmRlbnQub3BlbiA9IGZhbHNlOwogICAgICAgICAgICAgICAgaW5kZW50LmF0IC09IG9wdGlvbi5pbmRlbnQ7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICB9CiAgICAgICAgdmFyX21vZGUgPSBudWxsOwogICAgICAgIHN0ZXBfb3V0KCk7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBzdG10KCdmdW5jdGlvbicsIGZ1bmN0aW9uICgpIHsKICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICBpZiAoaW5fYmxvY2spIHsKICAgICAgICAgICAgd2FybignZnVuY3Rpb25fYmxvY2snLCB0b2tlbik7CiAgICAgICAgfQogICAgICAgIHZhciBuYW1lID0gbmV4dF90b2tlbiwgaWQgPSBpZGVudGlmaWVyKCk7CiAgICAgICAgYWRkX2xhYmVsKG5hbWUsICd1bmN0aW9uJyk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgZG9fZnVuY3Rpb24odGhpcywgaWQpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKCcgJiYgbmV4dF90b2tlbi5saW5lID09PSB0b2tlbi5saW5lKSB7CiAgICAgICAgICAgIHN0b3AoJ2Z1bmN0aW9uX3N0YXRlbWVudCcpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIHByZWZpeCgnZnVuY3Rpb24nLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdmFyIGlkID0gb3B0aW9uYWxfaWRlbnRpZmllcigpOwogICAgICAgIGlmIChpZCkgewogICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIGlkID0gJyc7CiAgICAgICAgfQogICAgICAgIGRvX2Z1bmN0aW9uKHRoaXMsIGlkKTsKICAgICAgICBpZiAoZnVuY3RbJyhsb29wYWdlKSddKSB7CiAgICAgICAgICAgIHdhcm4oJ2Z1bmN0aW9uX2xvb3AnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5hcml0eSA9ICdmdW5jdGlvbic7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBzdG10KCdpZicsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgcGFyZW4gPSBuZXh0X3Rva2VuOwogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICBzdGVwX2luKCdjb250cm9sJyk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBlZGdlKCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuZmlyc3QgPSBleHBlY3RlZF9jb25kaXRpb24oZXhwZWN0ZWRfcmVsYXRpb24oZXhwcmVzc2lvbigwKSkpOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgc3RlcF9vdXQoJyknLCBwYXJlbik7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdGhpcy5ibG9jayA9IGJsb2NrKHRydWUpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnZWxzZScpIHsKICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgIGFkdmFuY2UoJ2Vsc2UnKTsKICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgIHRoaXNbJ2Vsc2UnXSA9IG5leHRfdG9rZW4uaWQgPT09ICdpZicgfHwgbmV4dF90b2tlbi5pZCA9PT0gJ3N3aXRjaCcKICAgICAgICAgICAgICAgID8gc3RhdGVtZW50KHRydWUpCiAgICAgICAgICAgICAgICA6IGJsb2NrKHRydWUpOwogICAgICAgICAgICBpZiAodGhpc1snZWxzZSddLmRpc3J1cHQgJiYgdGhpcy5ibG9jay5kaXNydXB0KSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpc3J1cHQgPSB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgc3RtdCgndHJ5JywgZnVuY3Rpb24gKCkgewoKLy8gdHJ5LmZpcnN0ICAgIFRoZSBjYXRjaCB2YXJpYWJsZQovLyB0cnkuc2Vjb25kICAgVGhlIGNhdGNoIGNsYXVzZQovLyB0cnkudGhpcmQgICAgVGhlIGZpbmFsbHkgY2xhdXNlCi8vIHRyeS5ibG9jayAgICBUaGUgdHJ5IGJsb2NrCgogICAgICAgIHZhciBleGNlcHRpb25fdmFyaWFibGUsIG9sZF9zY29wZSwgcGFyZW47CiAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuYmxvY2sgPSBibG9jayhmYWxzZSk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICdjYXRjaCcpIHsKICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgIGFkdmFuY2UoJ2NhdGNoJyk7CiAgICAgICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgICAgICBwYXJlbiA9IG5leHRfdG9rZW47CiAgICAgICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICAgICAgc3RlcF9pbignY29udHJvbCcpOwogICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgIG9sZF9zY29wZSA9IHNjb3BlOwogICAgICAgICAgICBzY29wZSA9IE9iamVjdC5jcmVhdGUob2xkX3Njb3BlKTsKICAgICAgICAgICAgZXhjZXB0aW9uX3ZhcmlhYmxlID0gbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBleGNlcHRpb25fdmFyaWFibGU7CiAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9pZGVudGlmaWVyX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGFkZF9sYWJlbChuZXh0X3Rva2VuLCAnZXhjZXB0aW9uJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gYmxvY2soZmFsc2UpOwogICAgICAgICAgICBzY29wZSA9IG9sZF9zY29wZTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICdmaW5hbGx5JykgewogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnZmluYWxseScpOwogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgdGhpcy50aGlyZCA9IGJsb2NrKGZhbHNlKTsKICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnNlY29uZCkgewogICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnY2F0Y2gnLCBhcnRpZmFjdCgpKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBsYWJlbGVkX3N0bXQoJ3doaWxlJywgZnVuY3Rpb24gKCkgewogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIHZhciBwYXJlbiA9IG5leHRfdG9rZW47CiAgICAgICAgZnVuY3RbJyhicmVha2FnZSknXSArPSAxOwogICAgICAgIGZ1bmN0WycobG9vcGFnZSknXSArPSAxOwogICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICBzdGVwX2luKCdjb250cm9sJyk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBlZGdlKCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuZmlyc3QgPSBleHBlY3RlZF9yZWxhdGlvbihleHByZXNzaW9uKDApKTsKICAgICAgICBpZiAodGhpcy5maXJzdC5pZCAhPT0gJ3RydWUnKSB7CiAgICAgICAgICAgIGV4cGVjdGVkX2NvbmRpdGlvbih0aGlzLmZpcnN0LCBidW5kbGUudW5leHBlY3RlZF9hKTsKICAgICAgICB9CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICB0aGlzLmJsb2NrID0gYmxvY2sodHJ1ZSk7CiAgICAgICAgaWYgKHRoaXMuYmxvY2suZGlzcnVwdCkgewogICAgICAgICAgICB3YXJuKCdzdHJhbmdlX2xvb3AnLCBwcmV2X3Rva2VuKTsKICAgICAgICB9CiAgICAgICAgZnVuY3RbJyhicmVha2FnZSknXSAtPSAxOwogICAgICAgIGZ1bmN0WycobG9vcGFnZSknXSAtPSAxOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgcmVzZXJ2ZSgnd2l0aCcpOwoKICAgIGxhYmVsZWRfc3RtdCgnc3dpdGNoJywgZnVuY3Rpb24gKCkgewoKLy8gc3dpdGNoLmZpcnN0ICAgICAgICAgdGhlIHN3aXRjaCBleHByZXNzaW9uCi8vIHN3aXRjaC5zZWNvbmQgICAgICAgIHRoZSBhcnJheSBvZiBjYXNlcy4gQSBjYXNlIGlzICdjYXNlJyBvciAnZGVmYXVsdCcgdG9rZW46Ci8vICAgIGNhc2UuZmlyc3QgICAgICAgIHRoZSBhcnJheSBvZiBjYXNlIGV4cHJlc3Npb25zCi8vICAgIGNhc2Uuc2Vjb25kICAgICAgIHRoZSBhcnJheSBvZiBzdGF0ZW1lbnRzCi8vIElmIGFsbCBvZiB0aGUgYXJyYXlzIG9mIHN0YXRlbWVudHMgYXJlIGRpc3J1cHQsIHRoZW4gdGhlIHN3aXRjaCBpcyBkaXNydXB0LgoKICAgICAgICB2YXIgY2FzZXMgPSBbXSwKICAgICAgICAgICAgb2xkX2luX2Jsb2NrID0gaW5fYmxvY2ssCiAgICAgICAgICAgIHBhcnRpY3VsYXIsCiAgICAgICAgICAgIHRoZV9jYXNlID0gbmV4dF90b2tlbiwKICAgICAgICAgICAgdW5icm9rZW4gPSB0cnVlOwoKICAgICAgICBmdW5jdGlvbiBmaW5kX2R1cGxpY2F0ZV9jYXNlKHZhbHVlKSB7CiAgICAgICAgICAgIGlmIChhcmVfc2ltaWxhcihwYXJ0aWN1bGFyLCB2YWx1ZSkpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2R1cGxpY2F0ZV9hJywgdmFsdWUpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddICs9IDE7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgc3RlcF9pbigpOwogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwZWN0ZWRfY29uZGl0aW9uKGV4cGVjdGVkX3JlbGF0aW9uKGV4cHJlc3Npb24oMCkpKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHN0ZXBfb3V0KCcpJywgdGhlX2Nhc2UpOwogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIGFkdmFuY2UoJ3snKTsKICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgaW5fYmxvY2sgPSB0cnVlOwogICAgICAgIHRoaXMuc2Vjb25kID0gW107CiAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgPT09ICdjYXNlJykgewogICAgICAgICAgICB0aGVfY2FzZSA9IG5leHRfdG9rZW47CiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goZmluZF9kdXBsaWNhdGVfY2FzZSk7CiAgICAgICAgICAgIHRoZV9jYXNlLmZpcnN0ID0gW107CiAgICAgICAgICAgIHRoZV9jYXNlLmFyaXR5ID0gJ2Nhc2UnOwogICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgZWRnZSgnY2FzZScpOwogICAgICAgICAgICBhZHZhbmNlKCdjYXNlJyk7CiAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgICAgICAgICAgcGFydGljdWxhciA9IGV4cHJlc3Npb24oMCk7CiAgICAgICAgICAgICAgICBjYXNlcy5mb3JFYWNoKGZpbmRfZHVwbGljYXRlX2Nhc2UpOwogICAgICAgICAgICAgICAgY2FzZXMucHVzaChwYXJ0aWN1bGFyKTsKICAgICAgICAgICAgICAgIHRoZV9jYXNlLmZpcnN0LnB1c2gocGFydGljdWxhcik7CiAgICAgICAgICAgICAgICBpZiAocGFydGljdWxhci5pZCA9PT0gJ05hTicpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBwYXJ0aWN1bGFyKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJzonKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnY2FzZScpIHsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICAgICAgZWRnZSgnY2FzZScpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnY2FzZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICB0aGVfY2FzZS5zZWNvbmQgPSBzdGF0ZW1lbnRzKCk7CiAgICAgICAgICAgIGlmICh0aGVfY2FzZS5zZWNvbmQgJiYgdGhlX2Nhc2Uuc2Vjb25kLmxlbmd0aCA+IDApIHsKICAgICAgICAgICAgICAgIHBhcnRpY3VsYXIgPSB0aGVfY2FzZS5zZWNvbmRbdGhlX2Nhc2Uuc2Vjb25kLmxlbmd0aCAtIDFdOwogICAgICAgICAgICAgICAgaWYgKHBhcnRpY3VsYXIuZGlzcnVwdCkgewogICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0aWN1bGFyLmlkID09PSAnYnJlYWsnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHVuYnJva2VuID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdtaXNzaW5nX2FfYWZ0ZXJfYicsIG5leHRfdG9rZW4sICdicmVhaycsICdjYXNlJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB3YXJuKCdlbXB0eV9jYXNlJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5zZWNvbmQucHVzaCh0aGVfY2FzZSk7CiAgICAgICAgfQogICAgICAgIGlmICh0aGlzLnNlY29uZC5sZW5ndGggPT09IDApIHsKICAgICAgICAgICAgd2FybignbWlzc2luZ19hJywgbmV4dF90b2tlbiwgJ2Nhc2UnKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICdkZWZhdWx0JykgewogICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgdGhlX2Nhc2UgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICB0aGVfY2FzZS5hcml0eSA9ICdjYXNlJzsKICAgICAgICAgICAgZWRnZSgnY2FzZScpOwogICAgICAgICAgICBhZHZhbmNlKCdkZWZhdWx0Jyk7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgdGhlX2Nhc2Uuc2Vjb25kID0gc3RhdGVtZW50cygpOwogICAgICAgICAgICBpZiAodGhlX2Nhc2Uuc2Vjb25kICYmIHRoZV9jYXNlLnNlY29uZC5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgICAgICBwYXJ0aWN1bGFyID0gdGhlX2Nhc2Uuc2Vjb25kW3RoZV9jYXNlLnNlY29uZC5sZW5ndGggLSAxXTsKICAgICAgICAgICAgICAgIGlmICh1bmJyb2tlbiAmJiBwYXJ0aWN1bGFyLmRpc3J1cHQgJiYgcGFydGljdWxhci5pZCAhPT0gJ2JyZWFrJykgewogICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcnVwdCA9IHRydWU7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5zZWNvbmQucHVzaCh0aGVfY2FzZSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0WycoYnJlYWthZ2UpJ10gLT0gMTsKICAgICAgICBzcGFjZXMoKTsKICAgICAgICBzdGVwX291dCgnfScsIHRoaXMpOwogICAgICAgIGluX2Jsb2NrID0gb2xkX2luX2Jsb2NrOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgc3RtdCgnZGVidWdnZXInLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgaWYgKCFvcHRpb24uZGVidWcpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIGxhYmVsZWRfc3RtdCgnZG8nLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgZnVuY3RbJyhicmVha2FnZSknXSArPSAxOwogICAgICAgIGZ1bmN0WycobG9vcGFnZSknXSArPSAxOwogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICB0aGlzLmJsb2NrID0gYmxvY2sodHJ1ZSk7CiAgICAgICAgaWYgKHRoaXMuYmxvY2suZGlzcnVwdCkgewogICAgICAgICAgICB3YXJuKCdzdHJhbmdlX2xvb3AnLCBwcmV2X3Rva2VuKTsKICAgICAgICB9CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgYWR2YW5jZSgnd2hpbGUnKTsKICAgICAgICB2YXIgcGFyZW4gPSBuZXh0X3Rva2VuOwogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBlZGdlKCk7CiAgICAgICAgdGhpcy5maXJzdCA9IGV4cGVjdGVkX2NvbmRpdGlvbihleHBlY3RlZF9yZWxhdGlvbihleHByZXNzaW9uKDApKSwgYnVuZGxlLnVuZXhwZWN0ZWRfYSk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddIC09IDE7CiAgICAgICAgZnVuY3RbJyhsb29wYWdlKSddIC09IDE7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBsYWJlbGVkX3N0bXQoJ2ZvcicsIGZ1bmN0aW9uICgpIHsKCiAgICAgICAgdmFyIGJsb2ssIGZpbHRlciwgb2sgPSBmYWxzZSwgcGFyZW4gPSBuZXh0X3Rva2VuLCB2YWx1ZTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgZnVuY3RbJyhicmVha2FnZSknXSArPSAxOwogICAgICAgIGZ1bmN0WycobG9vcGFnZSknXSArPSAxOwogICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICBzdGVwX2luKCdjb250cm9sJyk7CiAgICAgICAgc3BhY2VzKHRoaXMsIHBhcmVuKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAndmFyJykgewogICAgICAgICAgICBzdG9wKCdtb3ZlX3ZhcicpOwogICAgICAgIH0KICAgICAgICBlZGdlKCk7CiAgICAgICAgaWYgKHBlZWsoMCkuaWQgPT09ICdpbicpIHsKICAgICAgICAgICAgdGhpcy5mb3JpbiA9IHRydWU7CiAgICAgICAgICAgIHZhbHVlID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgc3dpdGNoIChmdW5jdFt2YWx1ZS5zdHJpbmddKSB7CiAgICAgICAgICAgIGNhc2UgJ3VudXNlZCc6CiAgICAgICAgICAgICAgICBmdW5jdFt2YWx1ZS5zdHJpbmddID0gJ3Zhcic7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnY2xvc3VyZSc6CiAgICAgICAgICAgIGNhc2UgJ3Zhcic6CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF9pbl9hJywgdmFsdWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnaW4nKTsKICAgICAgICAgICAgdGhpcy5maXJzdCA9IHZhbHVlOwogICAgICAgICAgICB0aGlzLnNlY29uZCA9IGV4cHJlc3Npb24oMjApOwogICAgICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICAgICAgYmxvayA9IGJsb2NrKHRydWUpOwogICAgICAgICAgICBpZiAoIW9wdGlvbi5mb3JpbikgewogICAgICAgICAgICAgICAgaWYgKGJsb2subGVuZ3RoID09PSAxICYmIHR5cGVvZiBibG9rWzBdID09PSAnb2JqZWN0JyAmJgogICAgICAgICAgICAgICAgICAgICAgICBibG9rWzBdLnN0cmluZyA9PT0gJ2lmJyAmJiAhYmxva1swXVsnZWxzZSddKSB7CiAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYmxva1swXS5maXJzdDsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZmlsdGVyLmlkID09PSAnJiYnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGZpbHRlci5maXJzdDsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmaWx0ZXIuaWQpIHsKICAgICAgICAgICAgICAgICAgICBjYXNlICc9PT0nOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJyE9PSc6CiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gZmlsdGVyLmZpcnN0LmlkID09PSAnWycKICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZmlsdGVyLmZpcnN0LmZpcnN0LnN0cmluZyA9PT0gdGhpcy5zZWNvbmQuc3RyaW5nICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LnNlY29uZC5zdHJpbmcgPT09IHRoaXMuZmlyc3Quc3RyaW5nCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZpbHRlci5maXJzdC5pZCA9PT0gJ3R5cGVvZicgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3QuZmlyc3QuaWQgPT09ICdbJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5maXJzdC5zdHJpbmcgPT09IHRoaXMuc2Vjb25kLnN0cmluZyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5zZWNvbmQuc3RyaW5nID09PSB0aGlzLmZpcnN0LnN0cmluZzsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKCc6CiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gZmlsdGVyLmZpcnN0LmlkID09PSAnLicgJiYgKCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5zdHJpbmcgPT09IHRoaXMuc2Vjb25kLnN0cmluZyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LnNlY29uZC5zdHJpbmcgPT09ICdoYXNPd25Qcm9wZXJ0eScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWNvbmRbMF0uc3RyaW5nID09PSB0aGlzLmZpcnN0LnN0cmluZwogICAgICAgICAgICAgICAgICAgICAgICApIHx8ICgKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5zdHJpbmcgPT09ICdBRFNBRkUnICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3Quc2Vjb25kLnN0cmluZyA9PT0gJ2hhcycgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWNvbmRbMF0uc3RyaW5nID09PSB0aGlzLnNlY29uZC5zdHJpbmcgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWNvbmRbMV0uc3RyaW5nID09PSB0aGlzLmZpcnN0LnN0cmluZwogICAgICAgICAgICAgICAgICAgICAgICApIHx8ICgKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5pZCA9PT0gJy4nICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3QuZmlyc3QuZmlyc3QuaWQgPT09ICcuJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LmZpcnN0LmZpcnN0LnN0cmluZyA9PT0gJ09iamVjdCcgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5maXJzdC5zZWNvbmQuc3RyaW5nID09PSAncHJvdG90eXBlJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LnNlY29uZC5zdHJpbmcgPT09ICdoYXNPd25Qcm9wZXJ0eScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5zZWNvbmQuc3RyaW5nID09PSAnY2FsbCcgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWNvbmRbMF0uc3RyaW5nID09PSB0aGlzLnNlY29uZC5zdHJpbmcgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWNvbmRbMV0uc3RyaW5nID09PSB0aGlzLmZpcnN0LnN0cmluZwogICAgICAgICAgICAgICAgICAgICAgICApKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKCFvaykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Zvcl9pZicsIHRoaXMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICc7JykgewogICAgICAgICAgICAgICAgZWRnZSgpOwogICAgICAgICAgICAgICAgdGhpcy5maXJzdCA9IFtdOwogICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QucHVzaChleHByZXNzaW9uKDAsICdmb3InKSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICc7JykgewogICAgICAgICAgICAgICAgZWRnZSgpOwogICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQgPSBleHBlY3RlZF9yZWxhdGlvbihleHByZXNzaW9uKDApKTsKICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlY29uZC5pZCAhPT0gJ3RydWUnKSB7CiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRfY29uZGl0aW9uKHRoaXMuc2Vjb25kLCBidW5kbGUudW5leHBlY3RlZF9hKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBzZW1pY29sb24odG9rZW4pOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzsnKSB7CiAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnKScsICc7Jyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcpJykgewogICAgICAgICAgICAgICAgdGhpcy50aGlyZCA9IFtdOwogICAgICAgICAgICAgICAgZWRnZSgpOwogICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgIHRoaXMudGhpcmQucHVzaChleHByZXNzaW9uKDAsICdmb3InKSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgIGJsb2sgPSBibG9jayh0cnVlKTsKICAgICAgICB9CiAgICAgICAgaWYgKGJsb2suZGlzcnVwdCkgewogICAgICAgICAgICB3YXJuKCdzdHJhbmdlX2xvb3AnLCBwcmV2X3Rva2VuKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5ibG9jayA9IGJsb2s7CiAgICAgICAgZnVuY3RbJyhicmVha2FnZSknXSAtPSAxOwogICAgICAgIGZ1bmN0WycobG9vcGFnZSknXSAtPSAxOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgZGlzcnVwdF9zdG10KCdicmVhaycsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgbGFiZWwgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgaWYgKGZ1bmN0WycoYnJlYWthZ2UpJ10gPT09IDApIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgdG9rZW4ubGluZSA9PT0gbmV4dF90b2tlbi5saW5lKSB7CiAgICAgICAgICAgIG9uZV9zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgIGlmIChmdW5jdFtsYWJlbF0gIT09ICdsYWJlbCcpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ25vdF9hX2xhYmVsJywgbmV4dF90b2tlbik7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NvcGVbbGFiZWxdLmZ1bmN0ICE9PSBmdW5jdCkgewogICAgICAgICAgICAgICAgd2Fybignbm90X2Ffc2NvcGUnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB0aGlzLmZpcnN0ID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIGRpc3J1cHRfc3RtdCgnY29udGludWUnLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgaWYgKCFvcHRpb25bJ2NvbnRpbnVlJ10pIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIHZhciBsYWJlbCA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICBpZiAoZnVuY3RbJyhicmVha2FnZSknXSA9PT0gMCkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiB0b2tlbi5saW5lID09PSBuZXh0X3Rva2VuLmxpbmUpIHsKICAgICAgICAgICAgb25lX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgaWYgKGZ1bmN0W2xhYmVsXSAhPT0gJ2xhYmVsJykgewogICAgICAgICAgICAgICAgd2Fybignbm90X2FfbGFiZWwnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgfSBlbHNlIGlmIChzY29wZVtsYWJlbF0uZnVuY3QgIT09IGZ1bmN0KSB7CiAgICAgICAgICAgICAgICB3YXJuKCdub3RfYV9zY29wZScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgZGlzcnVwdF9zdG10KCdyZXR1cm4nLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgaWYgKGZ1bmN0ID09PSBnbG9iYWxfZnVuY3QpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJzsnICYmIG5leHRfdG9rZW4ubGluZSA9PT0gdG9rZW4ubGluZSkgewogICAgICAgICAgICBvbmVfc3BhY2Vfb25seSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy8nIHx8IG5leHRfdG9rZW4uaWQgPT09ICcocmVnZXhwKScpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3dyYXBfcmVnZXhwJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5maXJzdCA9IGV4cHJlc3Npb24oMjApOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIGRpc3J1cHRfc3RtdCgndGhyb3cnLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIG9uZV9zcGFjZV9vbmx5KCk7CiAgICAgICAgdGhpcy5maXJzdCA9IGV4cHJlc3Npb24oMjApOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgoKLy8gIFN1cGVyZmx1b3VzIHJlc2VydmVkIHdvcmRzCgogICAgcmVzZXJ2ZSgnY2xhc3MnKTsKICAgIHJlc2VydmUoJ2NvbnN0Jyk7CiAgICByZXNlcnZlKCdlbnVtJyk7CiAgICByZXNlcnZlKCdleHBvcnQnKTsKICAgIHJlc2VydmUoJ2V4dGVuZHMnKTsKICAgIHJlc2VydmUoJ2ltcG9ydCcpOwogICAgcmVzZXJ2ZSgnc3VwZXInKTsKCi8vIEhhcm1vbnkgcmVzZXJ2ZWQgd29yZHMKCiAgICByZXNlcnZlKCdpbXBsZW1lbnRzJyk7CiAgICByZXNlcnZlKCdpbnRlcmZhY2UnKTsKICAgIHJlc2VydmUoJ2xldCcpOwogICAgcmVzZXJ2ZSgncGFja2FnZScpOwogICAgcmVzZXJ2ZSgncHJpdmF0ZScpOwogICAgcmVzZXJ2ZSgncHJvdGVjdGVkJyk7CiAgICByZXNlcnZlKCdwdWJsaWMnKTsKICAgIHJlc2VydmUoJ3N0YXRpYycpOwogICAgcmVzZXJ2ZSgneWllbGQnKTsKCgovLyBUeXBlIGluZmVyZW5jZQoKLy8gICAgIGZ1bmN0aW9uIGdldF90eXBlKG9uZSkgewovLyAgICAgICAgIHZhciB0eXBlOwovLyAgICAgICAgIGlmICh0eXBlb2Ygb25lID09PSAnc3RyaW5nJykgewovLyAgICAgICAgICAgICByZXR1cm4gb25lOwovLyAgICAgICAgIH0gZWxzZSBpZiAob25lLnR5cGUpIHsKLy8gICAgICAgICAgICAgcmV0dXJuIG9uZS50eXBlOwovLyAgICAgICAgIH0gZWxzZSBpZiAob25lLmlkID09PSAnLicpIHsKLy8gICAgICAgICAgICAgdHlwZSA9IHByb3BlcnR5X3R5cGVbb25lLnNlY29uZC5zdHJpbmddOwovLyAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZSA6ICcnOwovLyAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgIHJldHVybiAoKG9uZS5pZGVudGlmaWVyICYmIHNjb3BlW29uZS5zdHJpbmddKSB8fCBvbmUpLnR5cGU7Ci8vICAgICAgICAgfQovLyAgICAgfQoKCi8vICAgICBmdW5jdGlvbiBtYXRjaF90eXBlKG9uZV90eXBlLCB0d29fdHlwZSwgb25lLCB0d28pIHsKLy8gICAgICAgICBpZiAob25lX3R5cGUgPT09IHR3b190eXBlKSB7Ci8vICAgICAgICAgICAgIHJldHVybiB0cnVlOwovLyAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgIGlmICghZnVuY3QuY29uZnVzaW9uICYmICF0d28ud2FybikgewovLyAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvbmUgIT09ICdzdHJpbmcnKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZS5pZCA9PT0gJy4nKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uZV90eXBlID0gJy4nICsgb25lLnNlY29uZC5zdHJpbmcgKyAnOiAnICsgb25lX3R5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25lX3R5cGUgPSBvbmUuc3RyaW5nICsgJzogJyArIG9uZV90eXBlOwovLyAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIGlmICh0d28uaWQgPT09ICcuJykgewovLyAgICAgICAgICAgICAgICAgICAgIHR3b190eXBlID0gJy4nICsgdHdvLnNlY29uZC5zdHJpbmcgKyAnOiAnICsgb25lX3R5cGU7Ci8vICAgICAgICAgICAgICAgICB9IGVsc2UgewovLyAgICAgICAgICAgICAgICAgICAgIHR3b190eXBlID0gdHdvLnN0cmluZyArICc6ICcgKyBvbmVfdHlwZTsKLy8gICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIHdhcm4oJ3R5cGVfY29uZnVzaW9uX2FfYicsIHR3bywgb25lX3R5cGUsIHR3b190eXBlKTsKLy8gICAgICAgICAgICAgICAgIHR3by53YXJuID0gdHJ1ZTsKLy8gICAgICAgICAgICAgfQovLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7Ci8vICAgICAgICAgfQovLyAgICAgfQoKCi8vICAgICBmdW5jdGlvbiBjb25mb3JtKG9uZSwgdHdvKSB7Ci8vCi8vIC8vIFRoZSBjb25mb3JtIGZ1bmN0aW9uIHRha2VzIGEgdHlwZSBzdHJpbmcgYW5kIGEgdG9rZW4sIG9yIHR3byB0b2tlbnMuCi8vCi8vICAgICAgICAgdmFyIG9uZV90eXBlID0gdHlwZW9mIG9uZSA9PT0gJ3N0cmluZycgPyBvbmUgOiBvbmUudHlwZSwKLy8gICAgICAgICAgICAgdHdvX3R5cGUgPSB0d28udHlwZSwKLy8gICAgICAgICAgICAgdHdvX3RoaW5nOwovLwovLyAvLyBJZiBib3RoIHRva2VucyBhbHJlYWR5IGhhdmUgYSB0eXBlLCBhbmQgaWYgdGhleSBtYXRjaCwgdGhlbiB3ZSBhcmUgZG9uZS4KLy8gLy8gT25jZSBhIHRva2VuIGhhcyBhIHR5cGUsIGl0IGlzIGxvY2tlZC4gTmVpdGhlciB0b2tlbiB3aWxsIGNoYW5nZSwgYnV0IGlmCi8vIC8vIHRoZXkgZG8gbm90IG1hdGNoLCB0aGVyZSB3aWxsIGJlIGEgd2FybmluZy4KLy8KLy8gICAgICAgICBpZiAob25lX3R5cGUpIHsKLy8gICAgICAgICAgICAgaWYgKHR3b190eXBlKSB7Ci8vICAgICAgICAgICAgICAgICBtYXRjaF90eXBlKG9uZV90eXBlLCB0d29fdHlwZSwgb25lLCB0d28pOwovLyAgICAgICAgICAgICB9IGVsc2UgewovLwovLyAvLyB0d28gZG9lcyBub3QgaGF2ZSBhIHR5cGUsIHNvIGxvb2sgZGVlcGVyLiBJZiB0d28gaXMgYSB2YXJpYWJsZSBvciBwcm9wZXJ0eSwKLy8gLy8gdGhlbiB1c2UgaXRzIHR5cGUgaWYgaXQgaGFzIG9uZSwgYW5kIG1ha2UgdGhlIGRlZXAgdHlwZSBvbmUncyB0eXBlIGlmIGl0Ci8vIC8vIGRvZXNuJ3QuIElmIHRoZSB0eXBlIHdhcyAqLCBvciBpZiB0aGVyZSB3YXMgYSBtaXNtYXRjaCwgZG9uJ3QgY2hhbmdlIHRoZQovLyAvLyBkZWVwIHR5cGUuCi8vCi8vICAgICAgICAgICAgICAgICB0d29fdGhpbmcgPSB0d28uaWQgPT09ICcoaWRlbnRpZmllciknCi8vICAgICAgICAgICAgICAgICAgICAgPyBzY29wZVt0d28uc3RyaW5nXQovLyAgICAgICAgICAgICAgICAgICAgIDogdHdvLmlkID09PSAnLicKLy8gICAgICAgICAgICAgICAgICAgICA/IHByb3BlcnR5X3R5cGVbdHdvLnNlY29uZC5zdHJpbmddCi8vICAgICAgICAgICAgICAgICAgICAgOiBudWxsOwovLyAgICAgICAgICAgICAgICAgaWYgKHR3b190aGluZykgewovLyAgICAgICAgICAgICAgICAgICAgIHR3b190eXBlID0gdHdvX3RoaW5nLnR5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgaWYgKHR3b190eXBlKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0d29fdHlwZSAhPT0gJyonKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoX3R5cGUob25lX3R5cGUsIHR3b190eXBlLCBvbmUsIHR3bykpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewovLyAgICAgICAgICAgICAgICAgICAgICAgICB0d29fdGhpbmcudHlwZSA9IG9uZV90eXBlOwovLyAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIH0KLy8KLy8gLy8gSW4gYW55IGNhc2UsIHdlIGdpdmUgdHdvIGEgdHlwZS4KLy8KLy8gICAgICAgICAgICAgICAgIHR3by50eXBlID0gb25lX3R5cGU7Ci8vICAgICAgICAgICAgICAgICB0eXBlX3N0YXRlX2NoYW5nZSA9IHRydWU7Ci8vICAgICAgICAgICAgICAgICByZXR1cm4gb25lX3R5cGU7Ci8vICAgICAgICAgICAgIH0KLy8KLy8gLy8gb25lIGRvZXMgbm90IGhhdmUgYSB0eXBlLCBidXQgdHdvIGRvZXMsIHNvIGRvIHRoZSBvbGQgc3dpdGNoZXJvby4KLy8KLy8gICAgICAgICB9IGVsc2UgewovLyAgICAgICAgICAgICBpZiAodHdvX3R5cGUpIHsKLy8gICAgICAgICAgICAgICAgIHJldHVybiBjb25mb3JtKHR3bywgb25lKTsKLy8KLy8gLy8gTmVpdGhlciB0b2tlbiBoYXMgYSB0eXBlIHlldC4gU28gd2UgaGF2ZSB0byBsb29rIGRlZXBlciB0byBzZWUgaWYgZWl0aGVyCi8vIC8vIGlzIGEgdmFyaWFibGUgb3IgcHJvcGVydHkuCi8vCi8vICAgICAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgICAgICBpZiAob25lLmlkID09PSAnKGlkZW50aWZpZXIpJykgewovLyAgICAgICAgICAgICAgICAgICAgIG9uZV90eXBlID0gc2NvcGVbb25lLnN0cmluZ10udHlwZTsKLy8gICAgICAgICAgICAgICAgICAgICBpZiAob25lX3R5cGUgJiYgb25lX3R5cGUgIT09ICcqJykgewovLyAgICAgICAgICAgICAgICAgICAgICAgICBvbmUudHlwZSA9IG9uZV90eXBlOwovLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZm9ybShvbmUsIHR3byk7Ci8vICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvbmUuaWQgPT09ICcuJykgewovLyAgICAgICAgICAgICAgICAgICAgIG9uZV90eXBlID0gcHJvcGVydHlfdHlwZVtvbmUuc2Vjb25kLnN0cmluZ107Ci8vICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZV90eXBlICYmIG9uZV90eXBlICE9PSAnKicpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25lLnR5cGUgPSBzY29wZVtvbmUuc3RyaW5nXS50eXBlOwovLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZm9ybShvbmUsIHR3byk7Ci8vICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgaWYgKHR3by5pZCA9PT0gJyhpZGVudGlmaWVyKScpIHsKLy8gICAgICAgICAgICAgICAgICAgICB0d29fdHlwZSA9IHNjb3BlW3R3by5zdHJpbmddLnR5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgaWYgKHR3b190eXBlICYmIHR3b190eXBlICE9PSAnKicpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgdHdvLnR5cGUgPSB0d29fdHlwZTsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZvcm0odHdvLCBvbmUpOwovLyAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHdvLmlkID09PSAnLicpIHsKLy8gICAgICAgICAgICAgICAgICAgICB0d29fdHlwZSA9IHByb3BlcnR5X3R5cGVbdHdvLnNlY29uZC5zdHJpbmddOwovLyAgICAgICAgICAgICAgICAgICAgIGlmICh0d29fdHlwZSAmJiB0d29fdHlwZSAhPT0gJyonKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIHR3by50eXBlID0gc2NvcGVbdHdvLnN0cmluZ10udHlwZTsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZvcm0odHdvLCBvbmUpOwovLyAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgfQovLyAgICAgICAgIH0KLy8KLy8gLy8gUmV0dXJuIGEgZmFsc3kgc3RyaW5nIGlmIHdlIHdlcmUgdW5hYmxlIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBlaXRoZXIgdG9rZW4uCi8vCi8vICAgICAgICAgcmV0dXJuICcnOwovLyAgICAgfQoKLy8gICAgIGZ1bmN0aW9uIGNvbmZvcm1fYXJyYXkodHlwZSwgYXJyYXkpIHsKLy8gICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7Ci8vICAgICAgICAgICAgIHJldHVybiBjb25mb3JtKHR5cGUsIGl0ZW0pOwovLyAgICAgICAgIH0sIHR5cGUpOwovLyAgICAgfQoKCi8vICAgICBmdW5jdGlvbiBpbmZlcihub2RlKSB7Ci8vICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHsKLy8gICAgICAgICAgICAgbm9kZS5mb3JFYWNoKGluZmVyKTsKLy8gICAgICAgICB9IGVsc2UgewovLyAgICAgICAgICAgICBzd2l0Y2ggKG5vZGUuYXJpdHkpIHsKLy8gICAgICAgICAgICAgY2FzZSAnc3RhdGVtZW50JzoKLy8gICAgICAgICAgICAgICAgIGluZmVyX3N0YXRlbWVudFtub2RlLmlkXShub2RlKTsKLy8gICAgICAgICAgICAgICAgIGJyZWFrOwovLyAgICAgICAgICAgICBjYXNlICdpbmZpeCc6Ci8vICAgICAgICAgICAgICAgICBpbmZlcihub2RlLmZpcnN0KTsKLy8gICAgICAgICAgICAgICAgIGluZmVyKG5vZGUuc2Vjb25kKTsKLy8gICAgICAgICAgICAgICAgIHN3aXRjaCAobm9kZS5pZCkgewovLyAgICAgICAgICAgICAgICAgY2FzZSAnKCc6Ci8vICAgICAgICAgICAgICAgICAgICAgY29uZm9ybSgnZnVuY3Rpb24nLCBub2RlLmZpcnN0KTsKLy8gICAgICAgICAgICAgICAgICAgICBicmVhazsKLy8gICAgICAgICAgICAgICAgIGRlZmF1bHQ6Ci8vICAgICAgICAgICAgICAgICAgICAgc3RvcCgndW5maW5pc2hlZCcpOwovLyAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgYnJlYWs7Ci8vICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6Ci8vICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6Ci8vICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOgovLyAgICAgICAgICAgICAgICAgYnJlYWs7Ci8vICAgICAgICAgICAgIGRlZmF1bHQ6Ci8vICAgICAgICAgICAgICAgICBzdG9wKCd1bmZpbmlzaGVkJyk7Ci8vICAgICAgICAgICAgIH0KLy8gICAgICAgICB9Ci8vICAgICB9CgoKLy8gICAgIGluZmVyX3N0YXRlbWVudCA9IHsKLy8gICAgICAgICAndmFyJzogZnVuY3Rpb24gKG5vZGUpIHsKLy8gICAgICAgICAgICAgdmFyIGksIGl0ZW0sIGxpc3QgPSBub2RlLmZpcnN0OwovLyAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkgewovLyAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07Ci8vICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gJz0nKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgaW5mZXIoaXRlbS5zZWNvbmQpOwovLyAgICAgICAgICAgICAgICAgICAgIGNvbmZvcm0oaXRlbS5maXJzdCwgaXRlbS5zZWNvbmQpOwovLyAgICAgICAgICAgICAgICAgICAgIGNvbmZvcm0oaXRlbS5maXJzdCwgaXRlbSk7Ci8vICAgICAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgIH0KLy8gICAgICAgICB9LAovLyAgICAgICAgICdmb3InOiBmdW5jdGlvbiAobm9kZSkgewovLyAgICAgICAgICAgICBpbmZlcihub2RlLmZpcnN0KTsKLy8gICAgICAgICAgICAgaW5mZXIobm9kZS5zZWNvbmQpOwovLyAgICAgICAgICAgICBpZiAobm9kZS5mb3JpbikgewovLyAgICAgICAgICAgICAgICAgY29uZm9ybSgnc3RyaW5nJywgbm9kZS5maXJzdCk7Ci8vICAgICAgICAgICAgICAgICBjb25mb3JtKCdvYmplY3QnLCBub2RlLnNlY29uZCk7Ci8vICAgICAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgICAgICBpbmZlcihub2RlLnRoaXJkKTsKLy8gICAgICAgICAgICAgICAgIGNvbmZvcm1fYXJyYXkoJ251bWJlcicsIG5vZGUuZmlyc3QpOwovLyAgICAgICAgICAgICAgICAgY29uZm9ybSgnYm9vbGVhbicsIG5vZGUuc2Vjb25kKTsKLy8gICAgICAgICAgICAgICAgIGNvbmZvcm1fYXJyYXkoJ251bWJlcicsIG5vZGUudGhpcmQpOwovLyAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgIGluZmVyKG5vZGUuYmxvY2spOwovLyAgICAgICAgIH0KLy8gICAgIH07CgoKLy8gICAgIGZ1bmN0aW9uIGluZmVyX3R5cGVzKG5vZGUpIHsKLy8gICAgICAgICBkbyB7Ci8vICAgICAgICAgICAgIGZ1bmN0ID0gZ2xvYmFsX2Z1bmN0OwovLyAgICAgICAgICAgICBzY29wZSA9IGdsb2JhbF9zY29wZTsKLy8gICAgICAgICAgICAgdHlwZV9zdGF0ZV9jaGFuZ2UgPSBmYWxzZTsKLy8gICAgICAgICAgICAgaW5mZXIobm9kZSk7Ci8vICAgICAgICAgfSB3aGlsZSAodHlwZV9zdGF0ZV9jaGFuZ2UpOwovLyAgICAgfQoKCi8vIFBhcnNlIEpTT04KCiAgICBmdW5jdGlvbiBqc29uX3ZhbHVlKCkgewoKICAgICAgICBmdW5jdGlvbiBqc29uX29iamVjdCgpIHsKICAgICAgICAgICAgdmFyIGJyYWNlID0gbmV4dF90b2tlbiwgb2JqZWN0ID0ge307CiAgICAgICAgICAgIGFkdmFuY2UoJ3snKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICd9JykgewogICAgICAgICAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgIT09ICcoZW5kKScpIHsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3N0cmluZ19hJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RbbmV4dF90b2tlbi5zdHJpbmddID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2R1cGxpY2F0ZV9hJyk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ19fcHJvdG9fXycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZGFuZ2xpbmdfYScpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFtuZXh0X3Rva2VuLnN0cmluZ10gPSB0cnVlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICAgICAgICAgIGpzb25fdmFsdWUoKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICd9JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCd9JywgYnJhY2UpOwogICAgICAgIH0KCiAgICAgICAgZnVuY3Rpb24ganNvbl9hcnJheSgpIHsKICAgICAgICAgICAgdmFyIGJyYWNrZXQgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICBhZHZhbmNlKCdbJyk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnXScpIHsKICAgICAgICAgICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkICE9PSAnKGVuZCknKSB7CiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgPT09ICcsJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBqc29uX3ZhbHVlKCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnXScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnXScsIGJyYWNrZXQpOwogICAgICAgIH0KCiAgICAgICAgc3dpdGNoIChuZXh0X3Rva2VuLmlkKSB7CiAgICAgICAgY2FzZSAneyc6CiAgICAgICAgICAgIGpzb25fb2JqZWN0KCk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ1snOgogICAgICAgICAgICBqc29uX2FycmF5KCk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3RydWUnOgogICAgICAgIGNhc2UgJ2ZhbHNlJzoKICAgICAgICBjYXNlICdudWxsJzoKICAgICAgICBjYXNlICcobnVtYmVyKSc6CiAgICAgICAgY2FzZSAnKHN0cmluZyknOgogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJy0nOgogICAgICAgICAgICBhZHZhbmNlKCctJyk7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgYWR2YW5jZSgnKG51bWJlciknKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJyk7CiAgICAgICAgfQogICAgfQoKCi8vIENTUyBwYXJzaW5nLgoKICAgIGZ1bmN0aW9uIGNzc19uYW1lKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19udW1iZXIoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICctJykgewogICAgICAgICAgICBhZHZhbmNlKCctJyk7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgYWR2YW5jZSgnKG51bWJlciknKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBjc3Nfc3RyaW5nKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIGNzc19jb2xvcigpIHsKICAgICAgICB2YXIgaSwgbnVtYmVyLCBwYXJlbiwgdmFsdWU7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICB2YWx1ZSA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICBpZiAodmFsdWUgPT09ICdyZ2InIHx8IHZhbHVlID09PSAncmdiYScpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIHBhcmVuID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAzOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoaSkgewogICAgICAgICAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBuZXh0X3Rva2VuLm51bWJlcjsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyB8fCBudW1iZXIgPCAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3Bvc2l0aXZlX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICclJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnJScpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bWJlciA+IDEwMCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3BlcmNlbnRfYScsIHRva2VuLCBudW1iZXIpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bWJlciA+IDI1NSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3NtYWxsX2EnLCB0b2tlbiwgbnVtYmVyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3JnYmEnKSB7CiAgICAgICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBuZXh0X3Rva2VuLm51bWJlcjsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyB8fCBudW1iZXIgPCAwIHx8IG51bWJlciA+IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfZnJhY3Rpb25fYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICclJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnJScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoJyknLCBwYXJlbik7CiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgfSBlbHNlIGlmIChjc3NfY29sb3JEYXRhW25leHRfdG9rZW4uc3RyaW5nXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoY29sb3IpJykgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19sZW5ndGgoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICctJykgewogICAgICAgICAgICBhZHZhbmNlKCctJyk7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyAmJgogICAgICAgICAgICAgICAgICAgIGNzc19sZW5ndGhEYXRhW25leHRfdG9rZW4uc3RyaW5nXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9IGVsc2UgaWYgKCt0b2tlbi5udW1iZXIgIT09IDApIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2xpbmVhcl9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgogICAgZnVuY3Rpb24gY3NzX2xpbmVfaGVpZ2h0KCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLScpIHsKICAgICAgICAgICAgYWR2YW5jZSgnLScpOwogICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgfQogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScgJiYKICAgICAgICAgICAgICAgICAgICBjc3NfbGVuZ3RoRGF0YVtuZXh0X3Rva2VuLnN0cmluZ10gPT09IHRydWUpIHsKICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQoKCiAgICBmdW5jdGlvbiBjc3Nfd2lkdGgoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uc3RyaW5nKSB7CiAgICAgICAgICAgIGNhc2UgJ3RoaW4nOgogICAgICAgICAgICBjYXNlICdtZWRpdW0nOgogICAgICAgICAgICBjYXNlICd0aGljayc6CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIHJldHVybiBjc3NfbGVuZ3RoKCk7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBjc3NfbWFyZ2luKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uc3RyaW5nID09PSAnYXV0bycpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgcmV0dXJuIGNzc19sZW5ndGgoKTsKICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gY3NzX2F0dHIoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiBuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ2F0dHInKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfbmFtZV9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBhZHZhbmNlKCcpJyk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19jb21tYV9saXN0KCkgewogICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkICE9PSAnOycpIHsKICAgICAgICAgICAgaWYgKCFjc3NfbmFtZSgpICYmICFjc3Nfc3RyaW5nKCkpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX25hbWVfYScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBjc3NfY291bnRlcigpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmIG5leHRfdG9rZW4uc3RyaW5nID09PSAnY291bnRlcicpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcsJykgewogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3RyaW5nX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCcpJyk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmIG5leHRfdG9rZW4uc3RyaW5nID09PSAnY291bnRlcnMnKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfbmFtZV9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9zdHJpbmdfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3N0cmluZ19hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnKScpOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQoKCiAgICBmdW5jdGlvbiBjc3NfcmFkaXVzKCkgewogICAgICAgIHJldHVybiBjc3NfbGVuZ3RoKCkgJiYgKG5leHRfdG9rZW4uaWQgIT09ICcobnVtYmVyKScgfHwgY3NzX2xlbmd0aCgpKTsKICAgIH0KCgogICAgZnVuY3Rpb24gY3NzX3NoYXBlKCkgewogICAgICAgIHZhciBpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09ICdyZWN0JykgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDQ7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgaWYgKCFjc3NfbGVuZ3RoKCkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9udW1iZXJfYScpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoJyknKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgogICAgZnVuY3Rpb24gY3NzX3VybCgpIHsKICAgICAgICB2YXIgYywgdXJsOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09ICd1cmwnKSB7CiAgICAgICAgICAgIG5leHRfdG9rZW4gPSBsZXgucmFuZ2UoJygnLCAnKScpOwogICAgICAgICAgICB1cmwgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgYyA9IHVybC5jaGFyQXQoMCk7CiAgICAgICAgICAgIGlmIChjID09PSAnIicgfHwgYyA9PT0gJ1wnJykgewogICAgICAgICAgICAgICAgaWYgKHVybC5zbGljZSgtMSkgIT09IGMpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfdXJsX2EnKTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTsKICAgICAgICAgICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoYykgPj0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfdXJsX2EnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCF1cmwpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ21pc3NpbmdfdXJsJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHV4LnRlc3QodXJsKSkgewogICAgICAgICAgICAgICAgc3RvcCgnYmFkX3VybF9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdXJscy5wdXNoKHVybCk7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgogICAgY3NzX2FueSA9IFtjc3NfdXJsLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uc3RyaW5nLnRvTG93ZXJDYXNlKCkpIHsKICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6CiAgICAgICAgICAgICAgICAgICAgY3NzX3VybCgpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnZXhwcmVzc2lvbic6CiAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJyk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzsnIHx8IG5leHRfdG9rZW4uaWQgPT09ICchJyAgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCA9PT0gJyhlbmQpJyB8fCBuZXh0X3Rva2VuLmlkID09PSAnfScpIHsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH1dOwoKCiAgICBmdW5jdGlvbiBmb250X2ZhY2UoKSB7CiAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdmb250LWZhbWlseScpOwogICAgICAgIGFkdmFuY2UoJzonKTsKICAgICAgICBpZiAoIWNzc19uYW1lKCkgJiYgIWNzc19zdHJpbmcoKSkgewogICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9uYW1lX2EnKTsKICAgICAgICB9CiAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdzcmMnKTsKICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgd2hpbGUgKHRydWUpIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uc3RyaW5nID09PSAnbG9jYWwnKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ2xvY2FsJyk7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgICAgICBpZiAodXgudGVzdChuZXh0X3Rva2VuLnN0cmluZykpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdiYWRfdXJsX2EnKTsKICAgICAgICAgICAgICAgIH0KCiAgICAgICAgICAgICAgICBpZiAoIWNzc19uYW1lKCkgJiYgIWNzc19zdHJpbmcoKSkgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX25hbWVfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgnKScpOwogICAgICAgICAgICB9IGVsc2UgaWYgKCFjc3NfdXJsKCkpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICd1cmwnLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb21tYSgpOwogICAgICAgIH0KICAgICAgICBzZW1pY29sb24oKTsKICAgIH0KCgogICAgY3NzX2JvcmRlcl9zdHlsZSA9IFsKICAgICAgICAnbm9uZScsICdkYXNoZWQnLCAnZG90dGVkJywgJ2RvdWJsZScsICdncm9vdmUnLAogICAgICAgICdoaWRkZW4nLCAnaW5zZXQnLCAnb3V0c2V0JywgJ3JpZGdlJywgJ3NvbGlkJwogICAgXTsKCiAgICBjc3NfYnJlYWsgPSBbCiAgICAgICAgJ2F1dG8nLCAnYWx3YXlzJywgJ2F2b2lkJywgJ2xlZnQnLCAncmlnaHQnCiAgICBdOwoKICAgIGNzc19tZWRpYSA9IHsKICAgICAgICAnYWxsJzogdHJ1ZSwKICAgICAgICAnYnJhaWxsZSc6IHRydWUsCiAgICAgICAgJ2VtYm9zc2VkJzogdHJ1ZSwKICAgICAgICAnaGFuZGhlbGQnOiB0cnVlLAogICAgICAgICdwcmludCc6IHRydWUsCiAgICAgICAgJ3Byb2plY3Rpb24nOiB0cnVlLAogICAgICAgICdzY3JlZW4nOiB0cnVlLAogICAgICAgICdzcGVlY2gnOiB0cnVlLAogICAgICAgICd0dHknOiB0cnVlLAogICAgICAgICd0dic6IHRydWUKICAgIH07CgogICAgY3NzX292ZXJmbG93ID0gWwogICAgICAgICdhdXRvJywgJ2hpZGRlbicsICdzY3JvbGwnLCAndmlzaWJsZScKICAgIF07CgogICAgY3NzX2F0dHJpYnV0ZV9kYXRhID0gewogICAgICAgIGJhY2tncm91bmQ6IFsKICAgICAgICAgICAgdHJ1ZSwgJ2JhY2tncm91bmQtYXR0YWNobWVudCcsICdiYWNrZ3JvdW5kLWNvbG9yJywKICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnLCAnYmFja2dyb3VuZC1wb3NpdGlvbicsICdiYWNrZ3JvdW5kLXJlcGVhdCcKICAgICAgICBdLAogICAgICAgICdiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnOiBbJ3Njcm9sbCcsICdmaXhlZCddLAogICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogWyd0cmFuc3BhcmVudCcsIGNzc19jb2xvcl0sCiAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiBbJ25vbmUnLCBjc3NfdXJsXSwKICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IFsKICAgICAgICAgICAgMiwgW2Nzc19sZW5ndGgsICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAnY2VudGVyJ10KICAgICAgICBdLAogICAgICAgICdiYWNrZ3JvdW5kLXJlcGVhdCc6IFsKICAgICAgICAgICAgJ3JlcGVhdCcsICdyZXBlYXQteCcsICdyZXBlYXQteScsICduby1yZXBlYXQnCiAgICAgICAgXSwKICAgICAgICAnYm9yZGVyJzogW3RydWUsICdib3JkZXItY29sb3InLCAnYm9yZGVyLXN0eWxlJywgJ2JvcmRlci13aWR0aCddLAogICAgICAgICdib3JkZXItYm90dG9tJzogWwogICAgICAgICAgICB0cnVlLCAnYm9yZGVyLWJvdHRvbS1jb2xvcicsICdib3JkZXItYm90dG9tLXN0eWxlJywKICAgICAgICAgICAgJ2JvcmRlci1ib3R0b20td2lkdGgnCiAgICAgICAgXSwKICAgICAgICAnYm9yZGVyLWJvdHRvbS1jb2xvcic6IGNzc19jb2xvciwKICAgICAgICAnYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cyc6IGNzc19yYWRpdXMsCiAgICAgICAgJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJzogY3NzX3JhZGl1cywKICAgICAgICAnYm9yZGVyLWJvdHRvbS1zdHlsZSc6IGNzc19ib3JkZXJfc3R5bGUsCiAgICAgICAgJ2JvcmRlci1ib3R0b20td2lkdGgnOiBjc3Nfd2lkdGgsCiAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6IFsnY29sbGFwc2UnLCAnc2VwYXJhdGUnXSwKICAgICAgICAnYm9yZGVyLWNvbG9yJzogWyd0cmFuc3BhcmVudCcsIDQsIGNzc19jb2xvcl0sCiAgICAgICAgJ2JvcmRlci1sZWZ0JzogWwogICAgICAgICAgICB0cnVlLCAnYm9yZGVyLWxlZnQtY29sb3InLCAnYm9yZGVyLWxlZnQtc3R5bGUnLCAnYm9yZGVyLWxlZnQtd2lkdGgnCiAgICAgICAgXSwKICAgICAgICAnYm9yZGVyLWxlZnQtY29sb3InOiBjc3NfY29sb3IsCiAgICAgICAgJ2JvcmRlci1sZWZ0LXN0eWxlJzogY3NzX2JvcmRlcl9zdHlsZSwKICAgICAgICAnYm9yZGVyLWxlZnQtd2lkdGgnOiBjc3Nfd2lkdGgsCiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIGZ1bmN0aW9uIGNvdW50KHNlcGFyYXRvcikgewogICAgICAgICAgICAgICAgdmFyIG4gPSAxOwogICAgICAgICAgICAgICAgaWYgKHNlcGFyYXRvcikgewogICAgICAgICAgICAgICAgICAgIGFkdmFuY2Uoc2VwYXJhdG9yKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICghY3NzX2xlbmd0aCgpKSB7CiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoIWNzc19sZW5ndGgoKSkgewogICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIG4gKz0gMTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChuID4gNCkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF9zdHlsZScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHJldHVybiBjb3VudCgpICYmIChuZXh0X3Rva2VuLmlkICE9PSAnLycgfHwgY291bnQoJy8nKSk7CiAgICAgICAgfSwKICAgICAgICAnYm9yZGVyLXJpZ2h0JzogWwogICAgICAgICAgICB0cnVlLCAnYm9yZGVyLXJpZ2h0LWNvbG9yJywgJ2JvcmRlci1yaWdodC1zdHlsZScsCiAgICAgICAgICAgICdib3JkZXItcmlnaHQtd2lkdGgnCiAgICAgICAgXSwKICAgICAgICAnYm9yZGVyLXJpZ2h0LWNvbG9yJzogY3NzX2NvbG9yLAogICAgICAgICdib3JkZXItcmlnaHQtc3R5bGUnOiBjc3NfYm9yZGVyX3N0eWxlLAogICAgICAgICdib3JkZXItcmlnaHQtd2lkdGgnOiBjc3Nfd2lkdGgsCiAgICAgICAgJ2JvcmRlci1zcGFjaW5nJzogWzIsIGNzc19sZW5ndGhdLAogICAgICAgICdib3JkZXItc3R5bGUnOiBbNCwgY3NzX2JvcmRlcl9zdHlsZV0sCiAgICAgICAgJ2JvcmRlci10b3AnOiBbCiAgICAgICAgICAgIHRydWUsICdib3JkZXItdG9wLWNvbG9yJywgJ2JvcmRlci10b3Atc3R5bGUnLCAnYm9yZGVyLXRvcC13aWR0aCcKICAgICAgICBdLAogICAgICAgICdib3JkZXItdG9wLWNvbG9yJzogY3NzX2NvbG9yLAogICAgICAgICdib3JkZXItdG9wLWxlZnQtcmFkaXVzJzogY3NzX3JhZGl1cywKICAgICAgICAnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnOiBjc3NfcmFkaXVzLAogICAgICAgICdib3JkZXItdG9wLXN0eWxlJzogY3NzX2JvcmRlcl9zdHlsZSwKICAgICAgICAnYm9yZGVyLXRvcC13aWR0aCc6IGNzc193aWR0aCwKICAgICAgICAnYm9yZGVyLXdpZHRoJzogWzQsIGNzc193aWR0aF0sCiAgICAgICAgYm90dG9tOiBbY3NzX2xlbmd0aCwgJ2F1dG8nXSwKICAgICAgICAnY2FwdGlvbi1zaWRlJyA6IFsnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wJ10sCiAgICAgICAgY2xlYXI6IFsnYm90aCcsICdsZWZ0JywgJ25vbmUnLCAncmlnaHQnXSwKICAgICAgICBjbGlwOiBbY3NzX3NoYXBlLCAnYXV0byddLAogICAgICAgIGNvbG9yOiBjc3NfY29sb3IsCiAgICAgICAgY29udGVudDogWwogICAgICAgICAgICAnb3Blbi1xdW90ZScsICdjbG9zZS1xdW90ZScsICduby1vcGVuLXF1b3RlJywgJ25vLWNsb3NlLXF1b3RlJywKICAgICAgICAgICAgY3NzX3N0cmluZywgY3NzX3VybCwgY3NzX2NvdW50ZXIsIGNzc19hdHRyCiAgICAgICAgXSwKICAgICAgICAnY291bnRlci1pbmNyZW1lbnQnOiBbCiAgICAgICAgICAgIGNzc19uYW1lLCAnbm9uZScKICAgICAgICBdLAogICAgICAgICdjb3VudGVyLXJlc2V0JzogWwogICAgICAgICAgICBjc3NfbmFtZSwgJ25vbmUnCiAgICAgICAgXSwKICAgICAgICBjdXJzb3I6IFsKICAgICAgICAgICAgY3NzX3VybCwgJ2F1dG8nLCAnY3Jvc3NoYWlyJywgJ2RlZmF1bHQnLCAnZS1yZXNpemUnLCAnaGVscCcsICdtb3ZlJywKICAgICAgICAgICAgJ24tcmVzaXplJywgJ25lLXJlc2l6ZScsICdudy1yZXNpemUnLCAncG9pbnRlcicsICdzLXJlc2l6ZScsCiAgICAgICAgICAgICdzZS1yZXNpemUnLCAnc3ctcmVzaXplJywgJ3ctcmVzaXplJywgJ3RleHQnLCAnd2FpdCcKICAgICAgICBdLAogICAgICAgIGRpcmVjdGlvbjogWydsdHInLCAncnRsJ10sCiAgICAgICAgZGlzcGxheTogWwogICAgICAgICAgICAnYmxvY2snLCAnY29tcGFjdCcsICdpbmxpbmUnLCAnaW5saW5lLWJsb2NrJywgJ2lubGluZS10YWJsZScsCiAgICAgICAgICAgICdsaXN0LWl0ZW0nLCAnbWFya2VyJywgJ25vbmUnLCAncnVuLWluJywgJ3RhYmxlJywgJ3RhYmxlLWNhcHRpb24nLAogICAgICAgICAgICAndGFibGUtY2VsbCcsICd0YWJsZS1jb2x1bW4nLCAndGFibGUtY29sdW1uLWdyb3VwJywKICAgICAgICAgICAgJ3RhYmxlLWZvb3Rlci1ncm91cCcsICd0YWJsZS1oZWFkZXItZ3JvdXAnLCAndGFibGUtcm93JywKICAgICAgICAgICAgJ3RhYmxlLXJvdy1ncm91cCcKICAgICAgICBdLAogICAgICAgICdlbXB0eS1jZWxscyc6IFsnc2hvdycsICdoaWRlJ10sCiAgICAgICAgJ2Zsb2F0JzogWydsZWZ0JywgJ25vbmUnLCAncmlnaHQnXSwKICAgICAgICBmb250OiBbCiAgICAgICAgICAgICdjYXB0aW9uJywgJ2ljb24nLCAnbWVudScsICdtZXNzYWdlLWJveCcsICdzbWFsbC1jYXB0aW9uJywKICAgICAgICAgICAgJ3N0YXR1cy1iYXInLCB0cnVlLCAnZm9udC1zaXplJywgJ2ZvbnQtc3R5bGUnLCAnZm9udC13ZWlnaHQnLAogICAgICAgICAgICAnZm9udC1mYW1pbHknCiAgICAgICAgXSwKICAgICAgICAnZm9udC1mYW1pbHknOiBjc3NfY29tbWFfbGlzdCwKICAgICAgICAnZm9udC1zaXplJzogWwogICAgICAgICAgICAneHgtc21hbGwnLCAneC1zbWFsbCcsICdzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnLCAneC1sYXJnZScsCiAgICAgICAgICAgICd4eC1sYXJnZScsICdsYXJnZXInLCAnc21hbGxlcicsIGNzc19sZW5ndGgKICAgICAgICBdLAogICAgICAgICdmb250LXNpemUtYWRqdXN0JzogWydub25lJywgY3NzX251bWJlcl0sCiAgICAgICAgJ2ZvbnQtc3RyZXRjaCc6IFsKICAgICAgICAgICAgJ25vcm1hbCcsICd3aWRlcicsICduYXJyb3dlcicsICd1bHRyYS1jb25kZW5zZWQnLAogICAgICAgICAgICAnZXh0cmEtY29uZGVuc2VkJywgJ2NvbmRlbnNlZCcsICdzZW1pLWNvbmRlbnNlZCcsCiAgICAgICAgICAgICdzZW1pLWV4cGFuZGVkJywgJ2V4cGFuZGVkJywgJ2V4dHJhLWV4cGFuZGVkJwogICAgICAgIF0sCiAgICAgICAgJ2ZvbnQtc3R5bGUnOiBbCiAgICAgICAgICAgICdub3JtYWwnLCAnaXRhbGljJywgJ29ibGlxdWUnCiAgICAgICAgXSwKICAgICAgICAnZm9udC12YXJpYW50JzogWwogICAgICAgICAgICAnbm9ybWFsJywgJ3NtYWxsLWNhcHMnCiAgICAgICAgXSwKICAgICAgICAnZm9udC13ZWlnaHQnOiBbCiAgICAgICAgICAgICdub3JtYWwnLCAnYm9sZCcsICdib2xkZXInLCAnbGlnaHRlcicsIGNzc19udW1iZXIKICAgICAgICBdLAogICAgICAgIGhlaWdodDogW2Nzc19sZW5ndGgsICdhdXRvJ10sCiAgICAgICAgbGVmdDogW2Nzc19sZW5ndGgsICdhdXRvJ10sCiAgICAgICAgJ2xldHRlci1zcGFjaW5nJzogWydub3JtYWwnLCBjc3NfbGVuZ3RoXSwKICAgICAgICAnbGluZS1oZWlnaHQnOiBbJ25vcm1hbCcsIGNzc19saW5lX2hlaWdodF0sCiAgICAgICAgJ2xpc3Qtc3R5bGUnOiBbCiAgICAgICAgICAgIHRydWUsICdsaXN0LXN0eWxlLWltYWdlJywgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nLCAnbGlzdC1zdHlsZS10eXBlJwogICAgICAgIF0sCiAgICAgICAgJ2xpc3Qtc3R5bGUtaW1hZ2UnOiBbJ25vbmUnLCBjc3NfdXJsXSwKICAgICAgICAnbGlzdC1zdHlsZS1wb3NpdGlvbic6IFsnaW5zaWRlJywgJ291dHNpZGUnXSwKICAgICAgICAnbGlzdC1zdHlsZS10eXBlJzogWwogICAgICAgICAgICAnY2lyY2xlJywgJ2Rpc2MnLCAnc3F1YXJlJywgJ2RlY2ltYWwnLCAnZGVjaW1hbC1sZWFkaW5nLXplcm8nLAogICAgICAgICAgICAnbG93ZXItcm9tYW4nLCAndXBwZXItcm9tYW4nLCAnbG93ZXItZ3JlZWsnLCAnbG93ZXItYWxwaGEnLAogICAgICAgICAgICAnbG93ZXItbGF0aW4nLCAndXBwZXItYWxwaGEnLCAndXBwZXItbGF0aW4nLCAnaGVicmV3JywgJ2thdGFrYW5hJywKICAgICAgICAgICAgJ2hpcmFnYW5hLWlyb2hhJywgJ2thdGFrYW5hLW9yb2hhJywgJ25vbmUnCiAgICAgICAgXSwKICAgICAgICBtYXJnaW46IFs0LCBjc3NfbWFyZ2luXSwKICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IGNzc19tYXJnaW4sCiAgICAgICAgJ21hcmdpbi1sZWZ0JzogY3NzX21hcmdpbiwKICAgICAgICAnbWFyZ2luLXJpZ2h0JzogY3NzX21hcmdpbiwKICAgICAgICAnbWFyZ2luLXRvcCc6IGNzc19tYXJnaW4sCiAgICAgICAgJ21hcmtlci1vZmZzZXQnOiBbY3NzX2xlbmd0aCwgJ2F1dG8nXSwKICAgICAgICAnbWF4LWhlaWdodCc6IFtjc3NfbGVuZ3RoLCAnbm9uZSddLAogICAgICAgICdtYXgtd2lkdGgnOiBbY3NzX2xlbmd0aCwgJ25vbmUnXSwKICAgICAgICAnbWluLWhlaWdodCc6IGNzc19sZW5ndGgsCiAgICAgICAgJ21pbi13aWR0aCc6IGNzc19sZW5ndGgsCiAgICAgICAgb3BhY2l0eTogY3NzX251bWJlciwKICAgICAgICBvdXRsaW5lOiBbdHJ1ZSwgJ291dGxpbmUtY29sb3InLCAnb3V0bGluZS1zdHlsZScsICdvdXRsaW5lLXdpZHRoJ10sCiAgICAgICAgJ291dGxpbmUtY29sb3InOiBbJ2ludmVydCcsIGNzc19jb2xvcl0sCiAgICAgICAgJ291dGxpbmUtc3R5bGUnOiBbCiAgICAgICAgICAgICdkYXNoZWQnLCAnZG90dGVkJywgJ2RvdWJsZScsICdncm9vdmUnLCAnaW5zZXQnLCAnbm9uZScsCiAgICAgICAgICAgICdvdXRzZXQnLCAncmlkZ2UnLCAnc29saWQnCiAgICAgICAgXSwKICAgICAgICAnb3V0bGluZS13aWR0aCc6IGNzc193aWR0aCwKICAgICAgICBvdmVyZmxvdzogY3NzX292ZXJmbG93LAogICAgICAgICdvdmVyZmxvdy14JzogY3NzX292ZXJmbG93LAogICAgICAgICdvdmVyZmxvdy15JzogY3NzX292ZXJmbG93LAogICAgICAgIHBhZGRpbmc6IFs0LCBjc3NfbGVuZ3RoXSwKICAgICAgICAncGFkZGluZy1ib3R0b20nOiBjc3NfbGVuZ3RoLAogICAgICAgICdwYWRkaW5nLWxlZnQnOiBjc3NfbGVuZ3RoLAogICAgICAgICdwYWRkaW5nLXJpZ2h0JzogY3NzX2xlbmd0aCwKICAgICAgICAncGFkZGluZy10b3AnOiBjc3NfbGVuZ3RoLAogICAgICAgICdwYWdlLWJyZWFrLWFmdGVyJzogY3NzX2JyZWFrLAogICAgICAgICdwYWdlLWJyZWFrLWJlZm9yZSc6IGNzc19icmVhaywKICAgICAgICBwb3NpdGlvbjogWydhYnNvbHV0ZScsICdmaXhlZCcsICdyZWxhdGl2ZScsICdzdGF0aWMnXSwKICAgICAgICBxdW90ZXM6IFs4LCBjc3Nfc3RyaW5nXSwKICAgICAgICByaWdodDogW2Nzc19sZW5ndGgsICdhdXRvJ10sCiAgICAgICAgJ3RhYmxlLWxheW91dCc6IFsnYXV0bycsICdmaXhlZCddLAogICAgICAgICd0ZXh0LWFsaWduJzogWydjZW50ZXInLCAnanVzdGlmeScsICdsZWZ0JywgJ3JpZ2h0J10sCiAgICAgICAgJ3RleHQtZGVjb3JhdGlvbic6IFsKICAgICAgICAgICAgJ25vbmUnLCAndW5kZXJsaW5lJywgJ292ZXJsaW5lJywgJ2xpbmUtdGhyb3VnaCcsICdibGluaycKICAgICAgICBdLAogICAgICAgICd0ZXh0LWluZGVudCc6IGNzc19sZW5ndGgsCiAgICAgICAgJ3RleHQtc2hhZG93JzogWydub25lJywgNCwgW2Nzc19jb2xvciwgY3NzX2xlbmd0aF1dLAogICAgICAgICd0ZXh0LXRyYW5zZm9ybSc6IFsnY2FwaXRhbGl6ZScsICd1cHBlcmNhc2UnLCAnbG93ZXJjYXNlJywgJ25vbmUnXSwKICAgICAgICB0b3A6IFtjc3NfbGVuZ3RoLCAnYXV0byddLAogICAgICAgICd1bmljb2RlLWJpZGknOiBbJ25vcm1hbCcsICdlbWJlZCcsICdiaWRpLW92ZXJyaWRlJ10sCiAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogWwogICAgICAgICAgICAnYmFzZWxpbmUnLCAnYm90dG9tJywgJ3N1YicsICdzdXBlcicsICd0b3AnLCAndGV4dC10b3AnLCAnbWlkZGxlJywKICAgICAgICAgICAgJ3RleHQtYm90dG9tJywgY3NzX2xlbmd0aAogICAgICAgIF0sCiAgICAgICAgdmlzaWJpbGl0eTogWyd2aXNpYmxlJywgJ2hpZGRlbicsICdjb2xsYXBzZSddLAogICAgICAgICd3aGl0ZS1zcGFjZSc6IFsKICAgICAgICAgICAgJ25vcm1hbCcsICdub3dyYXAnLCAncHJlJywgJ3ByZS1saW5lJywgJ3ByZS13cmFwJywgJ2luaGVyaXQnCiAgICAgICAgXSwKICAgICAgICB3aWR0aDogW2Nzc19sZW5ndGgsICdhdXRvJ10sCiAgICAgICAgJ3dvcmQtc3BhY2luZyc6IFsnbm9ybWFsJywgY3NzX2xlbmd0aF0sCiAgICAgICAgJ3dvcmQtd3JhcCc6IFsnYnJlYWstd29yZCcsICdub3JtYWwnXSwKICAgICAgICAnei1pbmRleCc6IFsnYXV0bycsIGNzc19udW1iZXJdCiAgICB9OwoKICAgIGZ1bmN0aW9uIHN0eWxlX2F0dHJpYnV0ZSgpIHsKICAgICAgICB2YXIgdjsKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJyonIHx8IG5leHRfdG9rZW4uaWQgPT09ICcjJyB8fAogICAgICAgICAgICAgICAgbmV4dF90b2tlbi5zdHJpbmcgPT09ICdfJykgewogICAgICAgICAgICBpZiAoIW9wdGlvbi5jc3MpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICctJykgewogICAgICAgICAgICBpZiAoIW9wdGlvbi5jc3MpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoJy0nKTsKICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX25vbnN0YW5kYXJkX3N0eWxlX2F0dHJpYnV0ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgcmV0dXJuIGNzc19hbnk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3N0eWxlX2F0dHJpYnV0ZScpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjc3NfYXR0cmlidXRlX2RhdGEsCiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uc3RyaW5nKSkgewogICAgICAgICAgICAgICAgICAgIHYgPSBjc3NfYXR0cmlidXRlX2RhdGFbbmV4dF90b2tlbi5zdHJpbmddOwogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICB2ID0gY3NzX2FueTsKICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5jc3MpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndW5yZWNvZ25pemVkX3N0eWxlX2F0dHJpYnV0ZV9hJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgcmV0dXJuIHY7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBzdHlsZV92YWx1ZSh2KSB7CgogICAgICAgIC8qanNsaW50IGNvbmZ1c2lvbjogdHJ1ZSAqLwoKICAgICAgICB2YXIgaSA9IDAsCiAgICAgICAgICAgIG4sCiAgICAgICAgICAgIG9uY2UsCiAgICAgICAgICAgIG1hdGNoLAogICAgICAgICAgICByb3VuZCwKICAgICAgICAgICAgc3RhcnQgPSAwLAogICAgICAgICAgICB2aTsKICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2KSB7CiAgICAgICAgY2FzZSAnZnVuY3Rpb24nOgogICAgICAgICAgICByZXR1cm4gdigpOwogICAgICAgIGNhc2UgJ3N0cmluZyc6CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09IHYpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICB9CiAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICBpZiAoaSA+PSB2Lmxlbmd0aCkgewogICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHZpID0gdltpXTsKICAgICAgICAgICAgaSArPSAxOwogICAgICAgICAgICBpZiAodHlwZW9mIHZpID09PSAnYm9vbGVhbicpIHsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2aSA9PT0gJ251bWJlcicpIHsKICAgICAgICAgICAgICAgIG4gPSB2aTsKICAgICAgICAgICAgICAgIHZpID0gdltpXTsKICAgICAgICAgICAgICAgIGkgKz0gMTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIG4gPSAxOwogICAgICAgICAgICB9CiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7CiAgICAgICAgICAgIHdoaWxlIChuID4gMCkgewogICAgICAgICAgICAgICAgaWYgKHN0eWxlX3ZhbHVlKHZpKSkgewogICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBuIC09IDE7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChtYXRjaCkgewogICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgc3RhcnQgPSBpOwogICAgICAgIG9uY2UgPSBbXTsKICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIHJvdW5kID0gZmFsc2U7CiAgICAgICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgdi5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgaWYgKCFvbmNlW2ldKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlX3ZhbHVlKGNzc19hdHRyaWJ1dGVfZGF0YVt2W2ldXSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICByb3VuZCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2VbaV0gPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCFyb3VuZCkgewogICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIHN0eWxlX2NoaWxkKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uc3RyaW5nID09PSAnbicgJiYgbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJysnKSB7CiAgICAgICAgICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJysnKTsKICAgICAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKG51bWJlciknKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm47CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJgogICAgICAgICAgICAgICAgICAgIChuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ29kZCcgfHwgbmV4dF90b2tlbi5zdHJpbmcgPT09ICdldmVuJykpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnKTsKICAgIH0KCiAgICBmdW5jdGlvbiBzdWJzdHlsZSgpIHsKICAgICAgICB2YXIgdjsKICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnfScgfHwgbmV4dF90b2tlbi5pZCA9PT0gJyhlbmQpJyB8fAogICAgICAgICAgICAgICAgICAgICh4cXVvdGUgJiYgbmV4dF90b2tlbi5pZCA9PT0geHF1b3RlKSkgewogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHYgPSBzdHlsZV9hdHRyaWJ1dGUoKTsKICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmIG5leHRfdG9rZW4uc3RyaW5nID09PSAnaW5oZXJpdCcpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGlmICghc3R5bGVfdmFsdWUodikpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICchJykgewogICAgICAgICAgICAgICAgYWR2YW5jZSgnIScpOwogICAgICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiBuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ2ltcG9ydGFudCcpIHsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsCiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4sICdpbXBvcnRhbnQnLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ30nIHx8IG5leHRfdG9rZW4uaWQgPT09IHhxdW90ZSkgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJzsnLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIHN0eWxlX3NlbGVjdG9yKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaHRtbF90YWcsIG9wdGlvbi5jYXAKICAgICAgICAgICAgICAgICAgICA/IG5leHRfdG9rZW4uc3RyaW5nLnRvTG93ZXJDYXNlKCkKICAgICAgICAgICAgICAgICAgICA6IG5leHRfdG9rZW4uc3RyaW5nKSkgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfdGFnbmFtZV9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIHN3aXRjaCAobmV4dF90b2tlbi5pZCkgewogICAgICAgICAgICBjYXNlICc+JzoKICAgICAgICAgICAgY2FzZSAnKyc6CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBzdHlsZV9zZWxlY3RvcigpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJzonOgogICAgICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICAgICAgc3dpdGNoIChuZXh0X3Rva2VuLnN0cmluZykgewogICAgICAgICAgICAgICAgY2FzZSAnYWN0aXZlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2FmdGVyJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2JlZm9yZSc6CiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2VkJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGVkJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzoKICAgICAgICAgICAgICAgIGNhc2UgJ2VuYWJsZWQnOgogICAgICAgICAgICAgICAgY2FzZSAnZmlyc3QtY2hpbGQnOgogICAgICAgICAgICAgICAgY2FzZSAnZmlyc3QtbGV0dGVyJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2ZpcnN0LWxpbmUnOgogICAgICAgICAgICAgICAgY2FzZSAnZmlyc3Qtb2YtdHlwZSc6CiAgICAgICAgICAgICAgICBjYXNlICdmb2N1cyc6CiAgICAgICAgICAgICAgICBjYXNlICdob3Zlcic6CiAgICAgICAgICAgICAgICBjYXNlICdsYXN0LWNoaWxkJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2xhc3Qtb2YtdHlwZSc6CiAgICAgICAgICAgICAgICBjYXNlICdsaW5rJzoKICAgICAgICAgICAgICAgIGNhc2UgJ29ubHktb2YtdHlwZSc6CiAgICAgICAgICAgICAgICBjYXNlICdyb290JzoKICAgICAgICAgICAgICAgIGNhc2UgJ3RhcmdldCc6CiAgICAgICAgICAgICAgICBjYXNlICd2aXNpdGVkJzoKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIobmV4dF90b2tlbi5zdHJpbmcpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnbGFuZyc6CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdsYW5nJyk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2xhbmdfYScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcpJyk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdudGgtY2hpbGQnOgogICAgICAgICAgICAgICAgY2FzZSAnbnRoLWxhc3QtY2hpbGQnOgogICAgICAgICAgICAgICAgY2FzZSAnbnRoLWxhc3Qtb2YtdHlwZSc6CiAgICAgICAgICAgICAgICBjYXNlICdudGgtb2YtdHlwZSc6CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKG5leHRfdG9rZW4uc3RyaW5nKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgICAgICAgICAgc3R5bGVfY2hpbGQoKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcpJyk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdub3QnOgogICAgICAgICAgICAgICAgICAgIGFkdmFuY2VfaWRlbnRpZmllcignbm90Jyk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOicgJiYgcGVlaygwKS5zdHJpbmcgPT09ICdub3QnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ25vdCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBzdHlsZV9zZWxlY3RvcigpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJyknKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfcHNldWRvX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICcjJzoKICAgICAgICAgICAgICAgIGFkdmFuY2UoJyMnKTsKICAgICAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfaWRfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJyonOgogICAgICAgICAgICAgICAgYWR2YW5jZSgnKicpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJy4nOgogICAgICAgICAgICAgICAgYWR2YW5jZSgnLicpOwogICAgICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9jbGFzc19hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnWyc6CiAgICAgICAgICAgICAgICBhZHZhbmNlKCdbJyk7CiAgICAgICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2F0dHJpYnV0ZV9hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJz0nIHx8IG5leHRfdG9rZW4uc3RyaW5nID09PSAnfj0nIHx8CiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uc3RyaW5nID09PSAnJD0nIHx8CiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uc3RyaW5nID09PSAnfD0nIHx8CiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgPT09ICcqPScgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCA9PT0gJ149JykgewogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9zdHJpbmdfYScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCddJyk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX3NlbGVjdG9yX2EnKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzdHlsZV9wYXR0ZXJuKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAneycpIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3R5bGVfcGF0dGVybicpOwogICAgICAgIH0KICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIHN0eWxlX3NlbGVjdG9yKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnPC8nIHx8IG5leHRfdG9rZW4uaWQgPT09ICd7JyB8fAogICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgPT09ICd9JyB8fCBuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gJyc7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcsJykgewogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzdHlsZV9saXN0KCkgewogICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkICE9PSAnfScgJiYgbmV4dF90b2tlbi5pZCAhPT0gJzwvJyAmJgogICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCAhPT0gJyhlbmQpJykgewogICAgICAgICAgICBzdHlsZV9wYXR0ZXJuKCk7CiAgICAgICAgICAgIHhtb2RlID0gJ3N0eWxlcHJvcGVydHknOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzsnKSB7CiAgICAgICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ3snKTsKICAgICAgICAgICAgICAgIHN1YnN0eWxlKCk7CiAgICAgICAgICAgICAgICB4bW9kZSA9ICdzdHlsZSc7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCd9Jyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gc3R5bGVzKCkgewogICAgICAgIHZhciBpOwogICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkID09PSAnQCcpIHsKICAgICAgICAgICAgaSA9IHBlZWsoKTsKICAgICAgICAgICAgYWR2YW5jZSgnQCcpOwogICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uc3RyaW5nKSB7CiAgICAgICAgICAgIGNhc2UgJ2ltcG9ydCc6CiAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ2ltcG9ydCcpOwogICAgICAgICAgICAgICAgaWYgKCFjc3NfdXJsKCkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLAogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLCAndXJsJywgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnbWVkaWEnOgogICAgICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdtZWRpYScpOwogICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyIHx8IGNzc19tZWRpYVtuZXh0X3Rva2VuLnN0cmluZ10gIT09IHRydWUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfbWVkaWFfYScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoJ3snKTsKICAgICAgICAgICAgICAgIHN0eWxlX2xpc3QoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ30nKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICdmb250LWZhY2UnOgogICAgICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdmb250LWZhY2UnKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ3snKTsKICAgICAgICAgICAgICAgIGZvbnRfZmFjZSgpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnfScpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hdF9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgc3R5bGVfbGlzdCgpOwogICAgfQoKCi8vIFBhcnNlIEhUTUwKCiAgICBmdW5jdGlvbiBkb19iZWdpbihuKSB7CiAgICAgICAgaWYgKG4gIT09ICdodG1sJyAmJiAhb3B0aW9uLmZyYWdtZW50KSB7CiAgICAgICAgICAgIGlmIChuID09PSAnZGl2JyAmJiBvcHRpb24uYWRzYWZlKSB7CiAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfZnJhZ21lbnQnKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIHRva2VuLCAnaHRtbCcsIG4pOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGlmIChvcHRpb24uYWRzYWZlKSB7CiAgICAgICAgICAgIGlmIChuID09PSAnaHRtbCcpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9odG1sJywgdG9rZW4pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChvcHRpb24uZnJhZ21lbnQpIHsKICAgICAgICAgICAgICAgIGlmIChuICE9PSAnZGl2JykgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9kaXYnLCB0b2tlbik7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfZnJhZ21lbnQnLCB0b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgb3B0aW9uLmJyb3dzZXIgPSB0cnVlOwogICAgfQoKICAgIGZ1bmN0aW9uIGRvX2F0dHJpYnV0ZShhLCB2KSB7CiAgICAgICAgdmFyIHUsIHg7CiAgICAgICAgaWYgKGEgPT09ICdpZCcpIHsKICAgICAgICAgICAgdSA9IHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYudG9VcHBlckNhc2UoKSA6ICcnOwogICAgICAgICAgICBpZiAoaWRzW3VdID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdkdXBsaWNhdGVfYScsIG5leHRfdG9rZW4sIHYpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICghL15bQS1aYS16XVtBLVphLXowLTkuXzpcLV0qJC8udGVzdCh2KSkgewogICAgICAgICAgICAgICAgd2FybignYmFkX2lkX2EnLCBuZXh0X3Rva2VuLCB2KTsKICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uYWRzYWZlKSB7CiAgICAgICAgICAgICAgICBpZiAoYWRzYWZlX2lkKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHYuc2xpY2UoMCwgYWRzYWZlX2lkLmxlbmd0aCkgIT09IGFkc2FmZV9pZCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfcHJlZml4X2EnLCBuZXh0X3Rva2VuLCBhZHNhZmVfaWQpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIS9eW0EtWl0rX1tBLVpdKyQvLnRlc3QodikpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2JhZF9pZCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgYWRzYWZlX2lkID0gdjsKICAgICAgICAgICAgICAgICAgICBpZiAoIS9eW0EtWl0rXyQvLnRlc3QodikpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2JhZF9pZCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICB4ID0gdi5zZWFyY2goZHgpOwogICAgICAgICAgICBpZiAoeCA+PSAwKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2NoYXJfYV9iJywgdG9rZW4sIHYuY2hhckF0KHgpLCBhKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZHNbdV0gPSB0cnVlOwogICAgICAgIH0gZWxzZSBpZiAoYSA9PT0gJ2NsYXNzJyB8fCBhID09PSAndHlwZScgfHwgYSA9PT0gJ25hbWUnKSB7CiAgICAgICAgICAgIHggPSB2LnNlYXJjaChxeCk7CiAgICAgICAgICAgIGlmICh4ID49IDApIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfY2hhcl9hX2InLCB0b2tlbiwgdi5jaGFyQXQoeCksIGEpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlkc1t1XSA9IHRydWU7CiAgICAgICAgfSBlbHNlIGlmIChhID09PSAnaHJlZicgfHwgYSA9PT0gJ2JhY2tncm91bmQnIHx8CiAgICAgICAgICAgICAgICBhID09PSAnY29udGVudCcgfHwgYSA9PT0gJ2RhdGEnIHx8CiAgICAgICAgICAgICAgICBhLmluZGV4T2YoJ3NyYycpID49IDAgfHwgYS5pbmRleE9mKCd1cmwnKSA+PSAwKSB7CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiB1eC50ZXN0KHYpKSB7CiAgICAgICAgICAgICAgICBzdG9wKCdiYWRfdXJsX2EnLCBuZXh0X3Rva2VuLCB2KTsKICAgICAgICAgICAgfQogICAgICAgICAgICB1cmxzLnB1c2godik7CiAgICAgICAgfSBlbHNlIGlmIChhID09PSAnZm9yJykgewogICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSkgewogICAgICAgICAgICAgICAgaWYgKGFkc2FmZV9pZCkgewogICAgICAgICAgICAgICAgICAgIGlmICh2LnNsaWNlKDAsIGFkc2FmZV9pZC5sZW5ndGgpICE9PSBhZHNhZmVfaWQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3ByZWZpeF9hJywgbmV4dF90b2tlbiwgYWRzYWZlX2lkKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCEvXltBLVpdK19bQS1aXSskLy50ZXN0KHYpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9iYWRfaWQnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9iYWRfaWQnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0gZWxzZSBpZiAoYSA9PT0gJ25hbWUnKSB7CiAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlICYmIHYuaW5kZXhPZignXycpID49IDApIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9uYW1lX2EnLCBuZXh0X3Rva2VuLCB2KTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBkb190YWcobmFtZSwgYXR0cmlidXRlKSB7CiAgICAgICAgdmFyIGksIHRhZyA9IGh0bWxfdGFnW25hbWVdLCBzY3JpcHQsIHg7CiAgICAgICAgc3JjID0gZmFsc2U7CiAgICAgICAgaWYgKCF0YWcpIHsKICAgICAgICAgICAgc3RvcCgKICAgICAgICAgICAgICAgIGJ1bmRsZS51bnJlY29nbml6ZWRfdGFnX2EsCiAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLAogICAgICAgICAgICAgICAgbmFtZSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpCiAgICAgICAgICAgICAgICAgICAgPyBuYW1lCiAgICAgICAgICAgICAgICAgICAgOiBuYW1lICsgJyAoY2FwaXRhbGl6YXRpb24gZXJyb3IpJwogICAgICAgICAgICApOwogICAgICAgIH0KICAgICAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkgewogICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2h0bWwnKSB7CiAgICAgICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnLCB0b2tlbiwgbmFtZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgeCA9IHRhZy5wYXJlbnQ7CiAgICAgICAgICAgIGlmICh4KSB7CiAgICAgICAgICAgICAgICBpZiAoeC5pbmRleE9mKCcgJyArIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLm5hbWUgKyAnICcpIDwgMCkgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3RhZ19hX2luX2InLCB0b2tlbiwgbmFtZSwgeCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbi5hZHNhZmUgJiYgIW9wdGlvbi5mcmFnbWVudCkgewogICAgICAgICAgICAgICAgaSA9IHN0YWNrLmxlbmd0aDsKICAgICAgICAgICAgICAgIGRvIHsKICAgICAgICAgICAgICAgICAgICBpZiAoaSA8PSAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ3RhZ19hX2luX2InLCB0b2tlbiwgbmFtZSwgJ2JvZHknKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaSAtPSAxOwogICAgICAgICAgICAgICAgfSB3aGlsZSAoc3RhY2tbaV0ubmFtZSAhPT0gJ2JvZHknKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzd2l0Y2ggKG5hbWUpIHsKICAgICAgICBjYXNlICdkaXYnOgogICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSAmJiBzdGFjay5sZW5ndGggPT09IDEgJiYgIWFkc2FmZV9pZCkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX21pc3NpbmdfaWQnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdzY3JpcHQnOgogICAgICAgICAgICB4bW9kZSA9ICdzY3JpcHQnOwogICAgICAgICAgICBhZHZhbmNlKCc+Jyk7CiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubGFuZykgewogICAgICAgICAgICAgICAgd2FybignbGFuZycsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSAmJiBzdGFjay5sZW5ndGggIT09IDEpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9wbGFjZW1lbnQnLCB0b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5zcmMpIHsKICAgICAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlICYmICghYWRzYWZlX21heSB8fCAhYXBwcm92ZWRbYXR0cmlidXRlLnNyY10pKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3NvdXJjZScsIHRva2VuKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUudHlwZSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ3R5cGUnLCB0b2tlbik7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBzdGVwX2luKG5leHRfdG9rZW4uZnJvbSk7CiAgICAgICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgICAgICB1c2Vfc3RyaWN0KCk7CiAgICAgICAgICAgICAgICBhZHNhZmVfdG9wID0gdHJ1ZTsKICAgICAgICAgICAgICAgIHNjcmlwdCA9IHN0YXRlbWVudHMoKTsKCi8vIEpTTGludCBpcyBhbHNvIHRoZSBzdGF0aWMgYW5hbHl6ZXIgZm9yIEFEc2FmZS4gU2VlIHd3dy5BRHNhZmUub3JnLgoKICAgICAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGFkc2FmZV93ZW50KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9zY3JpcHQnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmIChzY3JpcHQubGVuZ3RoICE9PSAxIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhaW50KHNjcmlwdFswXSwgICAgICAgICAgICAgJ2lkJywgICAgICcoJykgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQoc2NyaXB0WzBdLmZpcnN0LCAgICAgICAnaWQnLCAgICAgJy4nKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludChzY3JpcHRbMF0uZmlyc3QuZmlyc3QsICdzdHJpbmcnLCAnQURTQUZFJykgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQoc2NyaXB0WzBdLnNlY29uZFswXSwgICAnc3RyaW5nJywgYWRzYWZlX2lkKSkgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfaWRfZ28nKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzY3JpcHRbMF0uZmlyc3Quc2Vjb25kLnN0cmluZykgewogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2lkJzoKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkc2FmZV9tYXkgfHwgYWRzYWZlX3dlbnQgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRbMF0uc2Vjb25kLmxlbmd0aCAhPT0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnYWRzYWZlX2lkJywgbmV4dF90b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgYWRzYWZlX21heSA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dvJzoKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkc2FmZV93ZW50KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfZ28nKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NyaXB0WzBdLnNlY29uZC5sZW5ndGggIT09IDIgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhaW50KHNjcmlwdFswXS5zZWNvbmRbMV0sICdpZCcsICdmdW5jdGlvbicpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIXNjcmlwdFswXS5zZWNvbmRbMV0uZmlyc3QgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRbMF0uc2Vjb25kWzFdLmZpcnN0Lmxlbmd0aCAhPT0gMiB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQoc2NyaXB0WzBdLnNlY29uZFsxXS5maXJzdFswXSwgJ3N0cmluZycsICdkb20nKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQoc2NyaXB0WzBdLnNlY29uZFsxXS5maXJzdFsxXSwgJ3N0cmluZycsICdsaWInKSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnYWRzYWZlX2dvJywgbmV4dF90b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgYWRzYWZlX3dlbnQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfaWRfZ28nKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpbmRlbnQgPSBudWxsOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgICAgICBhZHZhbmNlKCc8LycpOwogICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ3NjcmlwdCcpOwogICAgICAgICAgICB4bW9kZSA9ICdvdXRlcic7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3N0eWxlJzoKICAgICAgICAgICAgeG1vZGUgPSAnc3R5bGUnOwogICAgICAgICAgICBhZHZhbmNlKCc+Jyk7CiAgICAgICAgICAgIHN0eWxlcygpOwogICAgICAgICAgICB4bW9kZSA9ICdodG1sJzsKICAgICAgICAgICAgYWR2YW5jZSgnPC8nKTsKICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdzdHlsZScpOwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdpbnB1dCc6CiAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlLnR5cGUpIHsKICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzoKICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOgogICAgICAgICAgICBjYXNlICdyYWRpbyc6CiAgICAgICAgICAgIGNhc2UgJ3Jlc2V0JzoKICAgICAgICAgICAgY2FzZSAnc3VibWl0JzoKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICdmaWxlJzoKICAgICAgICAgICAgY2FzZSAnaGlkZGVuJzoKICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOgogICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6CiAgICAgICAgICAgIGNhc2UgJ3RleHQnOgogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUgJiYgYXR0cmlidXRlLmF1dG9jb21wbGV0ZSAhPT0gJ29mZicpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfYXV0b2NvbXBsZXRlJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF90eXBlJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnYXBwbGV0JzoKICAgICAgICBjYXNlICdib2R5JzoKICAgICAgICBjYXNlICdlbWJlZCc6CiAgICAgICAgY2FzZSAnZnJhbWUnOgogICAgICAgIGNhc2UgJ2ZyYW1lc2V0JzoKICAgICAgICBjYXNlICdoZWFkJzoKICAgICAgICBjYXNlICdpZnJhbWUnOgogICAgICAgIGNhc2UgJ25vZW1iZWQnOgogICAgICAgIGNhc2UgJ25vZnJhbWVzJzoKICAgICAgICBjYXNlICdvYmplY3QnOgogICAgICAgIGNhc2UgJ3BhcmFtJzoKICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV90YWcnLCBuZXh0X3Rva2VuLCBuYW1lKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNsb3NldGFnKG5hbWUpIHsKICAgICAgICByZXR1cm4gJzwvJyArIG5hbWUgKyAnPic7CiAgICB9CgogICAgZnVuY3Rpb24gaHRtbCgpIHsKCiAgICAgICAgLypqc2xpbnQgY29uZnVzaW9uOiB0cnVlICovCgogICAgICAgIHZhciBhdHRyaWJ1dGUsIGF0dHJpYnV0ZXMsIGlzX2VtcHR5LCBuYW1lLCBvbGRfd2hpdGUgPSBvcHRpb24ud2hpdGUsCiAgICAgICAgICAgIHF1b3RlLCB0YWdfbmFtZSwgdGFnLCB3bW9kZTsKICAgICAgICB4bW9kZSA9ICdodG1sJzsKICAgICAgICB4cXVvdGUgPSAnJzsKICAgICAgICBzdGFjayA9IG51bGw7CiAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uc3RyaW5nKSB7CiAgICAgICAgICAgIGNhc2UgJzwnOgogICAgICAgICAgICAgICAgeG1vZGUgPSAnaHRtbCc7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc8Jyk7CiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0ge307CiAgICAgICAgICAgICAgICB0YWdfbmFtZSA9IG5leHRfdG9rZW47CiAgICAgICAgICAgICAgICBuYW1lID0gdGFnX25hbWUuc3RyaW5nOwogICAgICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKG5hbWUpOwogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5jYXApIHsKICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdGFnX25hbWUubmFtZSA9IG5hbWU7CiAgICAgICAgICAgICAgICBpZiAoIXN0YWNrKSB7CiAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBbXTsKICAgICAgICAgICAgICAgICAgICBkb19iZWdpbihuYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRhZyA9IGh0bWxfdGFnW25hbWVdOwogICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YWcgIT09ICdvYmplY3QnKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgndW5yZWNvZ25pemVkX3RhZ19hJywgdGFnX25hbWUsIG5hbWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaXNfZW1wdHkgPSB0YWcuZW1wdHk7CiAgICAgICAgICAgICAgICB0YWdfbmFtZS50eXBlID0gbmFtZTsKICAgICAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy8nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJy8nKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICc+JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJz4nLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgJiYgbmV4dF90b2tlbi5pZC5jaGFyQXQoMCkgPT09ICc+JykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoZW5kKScgfHwgbmV4dF90b2tlbi5pZCA9PT0gJyhlcnJvciknKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnPicsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF9uYW1lX2EnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLndoaXRlID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlID0gbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLndoaXRlID0gb2xkX3doaXRlOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5jYXAgJiYgYXR0cmlidXRlICE9PSBhdHRyaWJ1dGUudG9Mb3dlckNhc2UoKSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdhdHRyaWJ1dGVfY2FzZV9hJywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGUudG9Mb3dlckNhc2UoKTsKICAgICAgICAgICAgICAgICAgICB4cXVvdGUgPSAnJzsKICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGF0dHJpYnV0ZXMsIGF0dHJpYnV0ZSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZHVwbGljYXRlX2EnLCB0b2tlbiwgYXR0cmlidXRlKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5zbGljZSgwLCAyKSA9PT0gJ29uJykgewogICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5vbikgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignaHRtbF9oYW5kbGVycycpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHhtb2RlID0gJ3NjcmlwdHN0cmluZyc7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJz0nKTsKICAgICAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBuZXh0X3Rva2VuLmlkOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVvdGUgIT09ICciJyAmJiBxdW90ZSAhPT0gJ1wnJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJyInLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB4cXVvdGUgPSBxdW90ZTsKICAgICAgICAgICAgICAgICAgICAgICAgd21vZGUgPSBvcHRpb24ud2hpdGU7CiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi53aGl0ZSA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UocXVvdGUpOwogICAgICAgICAgICAgICAgICAgICAgICB1c2Vfc3RyaWN0KCk7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMoKTsKICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLndoaXRlID0gd21vZGU7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSBxdW90ZSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgcXVvdGUsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgICAgICAgICAgICAgICAgICB4cXVvdGUgPSAnJzsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShxdW90ZSk7CiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlID09PSAnc3R5bGUnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHhtb2RlID0gJ3NjcmlwdHN0cmluZyc7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJz0nKTsKICAgICAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBuZXh0X3Rva2VuLmlkOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVvdGUgIT09ICciJyAmJiBxdW90ZSAhPT0gJ1wnJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJyInLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB4bW9kZSA9ICdzdHlsZXByb3BlcnR5JzsKICAgICAgICAgICAgICAgICAgICAgICAgeHF1b3RlID0gcXVvdGU7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UocXVvdGUpOwogICAgICAgICAgICAgICAgICAgICAgICBzdWJzdHlsZSgpOwogICAgICAgICAgICAgICAgICAgICAgICB4bW9kZSA9ICdodG1sJzsKICAgICAgICAgICAgICAgICAgICAgICAgeHF1b3RlID0gJyc7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UocXVvdGUpOwogICAgICAgICAgICAgICAgICAgICAgICB0YWcgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJz0nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCc9Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgIT09ICciJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkICE9PSAnXCcnICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkICE9PSAnKGNvbG9yKScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hdHRyaWJ1dGVfdmFsdWVfYScsIHRva2VuLCBhdHRyaWJ1dGUpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSB0YWc7CiAgICAgICAgICAgICAgICAgICAgZG9fYXR0cmlidXRlKGF0dHJpYnV0ZSwgdGFnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGRvX3RhZyhuYW1lLCBhdHRyaWJ1dGVzKTsKICAgICAgICAgICAgICAgIGlmICghaXNfZW1wdHkpIHsKICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRhZ19uYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHhtb2RlID0gJ291dGVyJzsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJz4nKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICc8Lyc6CiAgICAgICAgICAgICAgICB4bW9kZSA9ICdodG1sJzsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJzwvJyk7CiAgICAgICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF9uYW1lX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIG5hbWUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgICAgIGlmIChvcHRpb24uY2FwKSB7CiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIGlmICghc3RhY2spIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnLCBuZXh0X3Rva2VuLCBjbG9zZXRhZyhuYW1lKSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB0YWdfbmFtZSA9IHN0YWNrLnBvcCgpOwogICAgICAgICAgICAgICAgaWYgKCF0YWdfbmFtZSkgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4sIGNsb3NldGFnKG5hbWUpKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICh0YWdfbmFtZS5uYW1lICE9PSBuYW1lKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbiwgY2xvc2V0YWcodGFnX25hbWUubmFtZSksIGNsb3NldGFnKG5hbWUpKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnPicpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnPicsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgeG1vZGUgPSAnb3V0ZXInOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnPicpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJzwhJzoKICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB4bW9kZSA9ICdodG1sJzsKICAgICAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICc+JyB8fCBuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcuaW5kZXhPZignLS0nKSA+PSAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4sICctLScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcuaW5kZXhPZignPCcpID49IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJywgbmV4dF90b2tlbiwgJzwnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uc3RyaW5nLmluZGV4T2YoJz4nKSA+PSAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4sICc+Jyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgeG1vZGUgPSAnb3V0ZXInOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnPicpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJyhlbmQpJzoKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnbWlzc2luZ19hJywgbmV4dF90b2tlbiwKICAgICAgICAgICAgICAgICAgICAgICAgJzwvJyArIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLnN0cmluZyArICc+Jyk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoc3RhY2sgJiYgc3RhY2subGVuZ3RoID09PSAwICYmIChvcHRpb24uYWRzYWZlIHx8CiAgICAgICAgICAgICAgICAgICAgIW9wdGlvbi5mcmFnbWVudCB8fCBuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknKSkgewogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoZW5kKScpIHsKICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJyk7CiAgICAgICAgfQogICAgfQoKCi8vIFRoZSBhY3R1YWwgSlNMSU5UIGZ1bmN0aW9uIGl0c2VsZi4KCiAgICBpdHNlbGYgPSBmdW5jdGlvbiBKU0xpbnQodGhlX3NvdXJjZSwgdGhlX29wdGlvbikgewoKICAgICAgICB2YXIgaSwgcHJlZGVmLCB0cmVlOwogICAgICAgIEpTTElOVC5lcnJvcnMgPSBbXTsKICAgICAgICBKU0xJTlQudHJlZSA9ICcnOwogICAgICAgIGJlZ2luID0gcHJldl90b2tlbiA9IHRva2VuID0gbmV4dF90b2tlbiA9CiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUoc3ludGF4WycoYmVnaW4pJ10pOwogICAgICAgIHByZWRlZmluZWQgPSB7fTsKICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZChzdGFuZGFyZCk7CiAgICAgICAgcHJvcGVydHlfdHlwZSA9IE9iamVjdC5jcmVhdGUoc3RhbmRhcmRfcHJvcGVydHlfdHlwZSk7CiAgICAgICAgaWYgKHRoZV9vcHRpb24pIHsKICAgICAgICAgICAgb3B0aW9uID0gT2JqZWN0LmNyZWF0ZSh0aGVfb3B0aW9uKTsKICAgICAgICAgICAgcHJlZGVmID0gb3B0aW9uLnByZWRlZjsKICAgICAgICAgICAgaWYgKHByZWRlZikgewogICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJlZGVmKSkgewogICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcmVkZWYubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGVmaW5lZFtwcmVkZWZbaV1dID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmVkZWYgPT09ICdvYmplY3QnKSB7CiAgICAgICAgICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQocHJlZGVmKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBkb19zYWZlKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgb3B0aW9uID0ge307CiAgICAgICAgfQogICAgICAgIG9wdGlvbi5pbmRlbnQgPSArb3B0aW9uLmluZGVudCB8fCA0OwogICAgICAgIG9wdGlvbi5tYXhlcnIgPSArb3B0aW9uLm1heGVyciB8fCA1MDsKICAgICAgICBhZHNhZmVfaWQgPSAnJzsKICAgICAgICBhZHNhZmVfbWF5ID0gYWRzYWZlX3RvcCA9IGFkc2FmZV93ZW50ID0gZmFsc2U7CiAgICAgICAgYXBwcm92ZWQgPSB7fTsKICAgICAgICBpZiAob3B0aW9uLmFwcHJvdmVkKSB7CiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb24uYXBwcm92ZWQubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgIGFwcHJvdmVkW29wdGlvbi5hcHByb3ZlZFtpXV0gPSBvcHRpb24uYXBwcm92ZWRbaV07CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBhcHByb3ZlZC50ZXN0ID0gJ3Rlc3QnOwogICAgICAgIH0KICAgICAgICB0YWIgPSAnJzsKICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9uLmluZGVudDsgaSArPSAxKSB7CiAgICAgICAgICAgIHRhYiArPSAnICc7CiAgICAgICAgfQogICAgICAgIGdsb2JhbF9zY29wZSA9IHNjb3BlID0ge307CiAgICAgICAgZ2xvYmFsX2Z1bmN0ID0gZnVuY3QgPSB7CiAgICAgICAgICAgICcoc2NvcGUpJzogc2NvcGUsCiAgICAgICAgICAgICcoYnJlYWthZ2UpJzogMCwKICAgICAgICAgICAgJyhsb29wYWdlKSc6IDAKICAgICAgICB9OwogICAgICAgIGZ1bmN0aW9ucyA9IFtmdW5jdF07CgogICAgICAgIGNvbW1lbnRzX29mZiA9IGZhbHNlOwogICAgICAgIGlkcyA9IHt9OwogICAgICAgIGluX2Jsb2NrID0gZmFsc2U7CiAgICAgICAgaW5kZW50ID0gbnVsbDsKICAgICAgICBqc29uX21vZGUgPSBmYWxzZTsKICAgICAgICBsb29rYWhlYWQgPSBbXTsKICAgICAgICBtZW1iZXIgPSB7fTsKICAgICAgICBub2RlX2pzID0gZmFsc2U7CiAgICAgICAgcHJlcmVnID0gdHJ1ZTsKICAgICAgICBzcmMgPSBmYWxzZTsKICAgICAgICBzdGFjayA9IG51bGw7CiAgICAgICAgc3RyaWN0X21vZGUgPSBmYWxzZTsKICAgICAgICB1cmxzID0gW107CiAgICAgICAgdmFyX21vZGUgPSBudWxsOwogICAgICAgIHdhcm5pbmdzID0gMDsKICAgICAgICB4bW9kZSA9ICcnOwogICAgICAgIGxleC5pbml0KHRoZV9zb3VyY2UpOwoKICAgICAgICBhc3N1bWUoKTsKCiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dF90b2tlbi5zdHJpbmcuY2hhckF0KDApID09PSAnPCcpIHsKICAgICAgICAgICAgICAgIGh0bWwoKTsKICAgICAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlICYmICFhZHNhZmVfd2VudCkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9nbycsIHRoaXMpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgc3dpdGNoIChuZXh0X3Rva2VuLmlkKSB7CiAgICAgICAgICAgICAgICBjYXNlICd7JzoKICAgICAgICAgICAgICAgIGNhc2UgJ1snOgogICAgICAgICAgICAgICAgICAgIGpzb25fbW9kZSA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAganNvbl92YWx1ZSgpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnQCc6CiAgICAgICAgICAgICAgICBjYXNlICcqJzoKICAgICAgICAgICAgICAgIGNhc2UgJyMnOgogICAgICAgICAgICAgICAgY2FzZSAnLic6CiAgICAgICAgICAgICAgICBjYXNlICc6JzoKICAgICAgICAgICAgICAgICAgICB4bW9kZSA9ICdzdHlsZSc7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5pZCAhPT0gJ0AnIHx8ICFuZXh0X3Rva2VuLmlkZW50aWZpZXIgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uc3RyaW5nICE9PSAnY2hhcnNldCcgfHwgdG9rZW4ubGluZSAhPT0gMSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uZnJvbSAhPT0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdjc3MnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLnN0cmluZyAhPT0gJ1VURi04JykgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdjc3MnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICAgICAgICAgIHN0eWxlcygpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwoKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUgJiYgb3B0aW9uLmZyYWdtZW50KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLCAnPGRpdj4nLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgICAgICAgICB9CgovLyBJZiB0aGUgZmlyc3QgdG9rZW4gaXMgYSBzZW1pY29sb24sIGlnbm9yZSBpdC4gVGhpcyBpcyBzb21ldGltZXMgdXNlZCB3aGVuCi8vIGZpbGVzIGFyZSBpbnRlbmRlZCB0byBiZSBhcHBlbmRlZCB0byBmaWxlcyB0aGF0IG1heSBiZSBzbG9wcHkuIEEgc2xvcHB5Ci8vIGZpbGUgbWF5IGJlIGRlcGVuZGluZyBvbiBzZW1pY29sb24gaW5zZXJ0aW9uIG9uIGl0cyBsYXN0IGxpbmUuCgogICAgICAgICAgICAgICAgICAgIHN0ZXBfaW4oMSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICc7JyAmJiAhbm9kZV9qcykgewogICAgICAgICAgICAgICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYWRzYWZlX3RvcCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgdHJlZSA9IHN0YXRlbWVudHMoKTsKICAgICAgICAgICAgICAgICAgICBiZWdpbi5maXJzdCA9IHRyZWU7CiAgICAgICAgICAgICAgICAgICAgSlNMSU5ULnRyZWUgPSBiZWdpbjsKICAgICAgICAgICAgICAgICAgICAvLyBpbmZlcl90eXBlcyh0cmVlKTsKICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSAmJiAodHJlZS5sZW5ndGggIT09IDEgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQodHJlZVswXSwgJ2lkJywgJygnKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludCh0cmVlWzBdLmZpcnN0LCAnaWQnLCAnLicpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhaW50KHRyZWVbMF0uZmlyc3QuZmlyc3QsICdzdHJpbmcnLCAnQURTQUZFJykgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQodHJlZVswXS5maXJzdC5zZWNvbmQsICdzdHJpbmcnLCAnbGliJykgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVbMF0uc2Vjb25kLmxlbmd0aCAhPT0gMiB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZVswXS5zZWNvbmRbMF0uaWQgIT09ICcoc3RyaW5nKScgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQodHJlZVswXS5zZWNvbmRbMV0sICdpZCcsICdmdW5jdGlvbicpKSkgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfbGliJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmICh0cmVlLmRpc3J1cHQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybignd2VpcmRfcHJvZ3JhbScsIHByZXZfdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpbmRlbnQgPSBudWxsOwogICAgICAgICAgICBhZHZhbmNlKCcoZW5kKScpOwogICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgaWYgKGUpIHsgICAgICAgIC8vIGB+CiAgICAgICAgICAgICAgICBKU0xJTlQuZXJyb3JzLnB1c2goewogICAgICAgICAgICAgICAgICAgIHJlYXNvbiAgICA6IGUubWVzc2FnZSwKICAgICAgICAgICAgICAgICAgICBsaW5lICAgICAgOiBlLmxpbmUgfHwgbmV4dF90b2tlbi5saW5lLAogICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciA6IGUuY2hhcmFjdGVyIHx8IG5leHRfdG9rZW4uZnJvbQogICAgICAgICAgICAgICAgfSwgbnVsbCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIEpTTElOVC5lcnJvcnMubGVuZ3RoID09PSAwOwogICAgfTsKCgovLyBEYXRhIHN1bW1hcnkuCgogICAgaXRzZWxmLmRhdGEgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgdmFyIGRhdGEgPSB7ZnVuY3Rpb25zOiBbXX0sCiAgICAgICAgICAgIGZ1bmN0aW9uX2RhdGEsCiAgICAgICAgICAgIGdsb2JhbHMsCiAgICAgICAgICAgIGksCiAgICAgICAgICAgIGosCiAgICAgICAgICAgIGtpbmQsCiAgICAgICAgICAgIG1lbWJlcnMgPSBbXSwKICAgICAgICAgICAgbmFtZSwKICAgICAgICAgICAgdGhlX2Z1bmN0aW9uLAogICAgICAgICAgICB1bmRlZiA9IFtdLAogICAgICAgICAgICB1bnVzZWQgPSBbXTsKICAgICAgICBpZiAoaXRzZWxmLmVycm9ycy5sZW5ndGgpIHsKICAgICAgICAgICAgZGF0YS5lcnJvcnMgPSBpdHNlbGYuZXJyb3JzOwogICAgICAgIH0KCiAgICAgICAgaWYgKGpzb25fbW9kZSkgewogICAgICAgICAgICBkYXRhLmpzb24gPSB0cnVlOwogICAgICAgIH0KCiAgICAgICAgaWYgKHVybHMubGVuZ3RoID4gMCkgewogICAgICAgICAgICBkYXRhLnVybHMgPSB1cmxzOwogICAgICAgIH0KCiAgICAgICAgZ2xvYmFscyA9IE9iamVjdC5rZXlzKGdsb2JhbF9zY29wZSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkgewogICAgICAgICAgICByZXR1cm4gdmFsdWUuY2hhckF0KDApICE9PSAnKCcgJiYgdHlwZW9mIHN0YW5kYXJkW3ZhbHVlXSAhPT0gJ2Jvb2xlYW4nOwogICAgICAgIH0pOwogICAgICAgIGlmIChnbG9iYWxzLmxlbmd0aCA+IDApIHsKICAgICAgICAgICAgZGF0YS5nbG9iYWxzID0gZ2xvYmFsczsKICAgICAgICB9CgogICAgICAgIGZvciAoaSA9IDE7IGkgPCBmdW5jdGlvbnMubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgdGhlX2Z1bmN0aW9uID0gZnVuY3Rpb25zW2ldOwogICAgICAgICAgICBmdW5jdGlvbl9kYXRhID0ge307CiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBmdW5jdGlvbmljaXR5Lmxlbmd0aDsgaiArPSAxKSB7CiAgICAgICAgICAgICAgICBmdW5jdGlvbl9kYXRhW2Z1bmN0aW9uaWNpdHlbal1dID0gW107CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZm9yIChuYW1lIGluIHRoZV9mdW5jdGlvbikgewogICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGVfZnVuY3Rpb24sIG5hbWUpKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApICE9PSAnKCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IHRoZV9mdW5jdGlvbltuYW1lXTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPT09ICd1bmN0aW9uJyB8fCBraW5kID09PSAndW5wYXJhbScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSAndW51c2VkJzsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmdW5jdGlvbl9kYXRhW2tpbmRdKSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25fZGF0YVtraW5kXS5wdXNoKG5hbWUpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPT09ICd1bnVzZWQnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW51c2VkLnB1c2goewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGVfZnVuY3Rpb25bJyhsaW5lKSddLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZnVuY3Rpb24nOiB0aGVfZnVuY3Rpb25bJyhuYW1lKSddCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtpbmQgPT09ICd1bmRlZicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZi5wdXNoKHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhlX2Z1bmN0aW9uWycobGluZSknXSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Z1bmN0aW9uJzogdGhlX2Z1bmN0aW9uWycobmFtZSknXQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBmdW5jdGlvbmljaXR5Lmxlbmd0aDsgaiArPSAxKSB7CiAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb25fZGF0YVtmdW5jdGlvbmljaXR5W2pdXS5sZW5ndGggPT09IDApIHsKICAgICAgICAgICAgICAgICAgICBkZWxldGUgZnVuY3Rpb25fZGF0YVtmdW5jdGlvbmljaXR5W2pdXTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBmdW5jdGlvbl9kYXRhLm5hbWUgPSB0aGVfZnVuY3Rpb25bJyhuYW1lKSddOwogICAgICAgICAgICBmdW5jdGlvbl9kYXRhLnBhcmFtcyA9IHRoZV9mdW5jdGlvblsnKHBhcmFtcyknXTsKICAgICAgICAgICAgZnVuY3Rpb25fZGF0YS5saW5lID0gdGhlX2Z1bmN0aW9uWycobGluZSknXTsKICAgICAgICAgICAgZnVuY3Rpb25fZGF0YVsnKGNvbXBsZXhpdHkpJ10gPSB0aGVfZnVuY3Rpb25bJyhjb21wbGV4aXR5KSddOwogICAgICAgICAgICBkYXRhLmZ1bmN0aW9ucy5wdXNoKGZ1bmN0aW9uX2RhdGEpOwogICAgICAgIH0KCiAgICAgICAgaWYgKHVudXNlZC5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgIGRhdGEudW51c2VkID0gdW51c2VkOwogICAgICAgIH0KICAgICAgICBpZiAodW5kZWYubGVuZ3RoID4gMCkgewogICAgICAgICAgICBkYXRhWyd1bmRlZmluZWQnXSA9IHVuZGVmOwogICAgICAgIH0KCiAgICAgICAgbWVtYmVycyA9IFtdOwogICAgICAgIGZvciAobmFtZSBpbiBtZW1iZXIpIHsKICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1iZXJbbmFtZV0gPT09ICdudW1iZXInKSB7CiAgICAgICAgICAgICAgICBkYXRhLm1lbWJlciA9IG1lbWJlcjsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICByZXR1cm4gZGF0YTsKICAgIH07CgoKICAgIGl0c2VsZi5yZXBvcnQgPSBmdW5jdGlvbiAoZXJyb3JzX29ubHkpIHsKICAgICAgICB2YXIgZGF0YSA9IGl0c2VsZi5kYXRhKCksIGVyciwgZXZpZGVuY2UsIGksIGl0YWxpY3MsIGosIGtleSwga2V5cywgbGVuZ3RoLAogICAgICAgICAgICBtZW0gPSAnJywgbmFtZSwgbmFtZXMsIG91dHB1dCA9IFtdLCBzbmlwcGV0cywgdGhlX2Z1bmN0aW9uLCB0eXBlLAogICAgICAgICAgICB3YXJuaW5nOwoKICAgICAgICBmdW5jdGlvbiBkZXRhaWwoaCwgdmFsdWUpIHsKICAgICAgICAgICAgdmFyIGNvbW1hX25lZWRlZCwgc2luZ3VsYXJpdHk7CiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxkaXY+PGk+JyArIGggKyAnPC9pPiAnKTsKICAgICAgICAgICAgICAgIHZhbHVlLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHNpbmd1bGFyaXR5KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmd1bGFyaXR5ID0gaXRlbTsKICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goKGNvbW1hX25lZWRlZCA/ICcsICcgOiAnJykgKyBzaW5ndWxhcml0eSk7CiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hX25lZWRlZCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPC9kaXY+Jyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHsKICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8ZGl2PjxpPicgKyBoICsgJzwvaT4gJyArIHZhbHVlICsgJzwvZGl2PicpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBpZiAoZGF0YS5lcnJvcnMgfHwgZGF0YS51bnVzZWQgfHwgZGF0YVsndW5kZWZpbmVkJ10pIHsKICAgICAgICAgICAgZXJyID0gdHJ1ZTsKICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxkaXYgaWQ9ZXJyb3JzPjxpPkVycm9yOjwvaT4nKTsKICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JzKSB7CiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5lcnJvcnMubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuaW5nID0gZGF0YS5lcnJvcnNbaV07CiAgICAgICAgICAgICAgICAgICAgaWYgKHdhcm5pbmcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgZXZpZGVuY2UgPSB3YXJuaW5nLmV2aWRlbmNlIHx8ICcnOwogICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPHA+UHJvYmxlbScgKyAoaXNGaW5pdGUod2FybmluZy5saW5lKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnIGF0IGxpbmUgJyArIFN0cmluZyh3YXJuaW5nLmxpbmUpICsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIGNoYXJhY3RlciAnICsgU3RyaW5nKHdhcm5pbmcuY2hhcmFjdGVyKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJykgKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgJzogJyArIHdhcm5pbmcucmVhc29uLmVudGl0eWlmeSgpICsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3A+PHAgY2xhc3M9ZXZpZGVuY2U+JyArCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXZpZGVuY2UgJiYgKGV2aWRlbmNlLmxlbmd0aCA+IDgwCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBldmlkZW5jZS5zbGljZSgwLCA3NykgKyAnLi4uJwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZXZpZGVuY2UpLmVudGl0eWlmeSgpKSArICc8L3A+Jyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CgogICAgICAgICAgICBpZiAoZGF0YVsndW5kZWZpbmVkJ10pIHsKICAgICAgICAgICAgICAgIHNuaXBwZXRzID0gW107CiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YVsndW5kZWZpbmVkJ10ubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgICAgICBzbmlwcGV0c1tpXSA9ICc8Y29kZT48dT4nICsgZGF0YVsndW5kZWZpbmVkJ11baV0ubmFtZSArICc8L3U+PC9jb2RlPiZuYnNwOzxpPicgKwogICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcoZGF0YVsndW5kZWZpbmVkJ11baV0ubGluZSkgKyAnIDwvaT4gPHNtYWxsPicgKwogICAgICAgICAgICAgICAgICAgICAgICBkYXRhWyd1bmRlZmluZWQnXVtpXVsnZnVuY3Rpb24nXSArICc8L3NtYWxsPic7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPHA+PGk+VW5kZWZpbmVkIHZhcmlhYmxlOjwvaT4gJyArIHNuaXBwZXRzLmpvaW4oJywgJykgKyAnPC9wPicpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChkYXRhLnVudXNlZCkgewogICAgICAgICAgICAgICAgc25pcHBldHMgPSBbXTsKICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhLnVudXNlZC5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgIHNuaXBwZXRzW2ldID0gJzxjb2RlPjx1PicgKyBkYXRhLnVudXNlZFtpXS5uYW1lICsgJzwvdT48L2NvZGU+Jm5ic3A7PGk+JyArCiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmluZyhkYXRhLnVudXNlZFtpXS5saW5lKSArICcgPC9pPiA8c21hbGw+JyArCiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudW51c2VkW2ldWydmdW5jdGlvbiddICsgJzwvc21hbGw+JzsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8cD48aT5VbnVzZWQgdmFyaWFibGU6PC9pPiAnICsgc25pcHBldHMuam9pbignLCAnKSArICc8L3A+Jyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGRhdGEuanNvbikgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxwPkpTT046IGJhZC48L3A+Jyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgb3V0cHV0LnB1c2goJzwvZGl2PicpOwogICAgICAgIH0KCiAgICAgICAgaWYgKCFlcnJvcnNfb25seSkgewoKICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxicj48ZGl2IGlkPWZ1bmN0aW9ucz4nKTsKCiAgICAgICAgICAgIGlmIChkYXRhLnVybHMpIHsKICAgICAgICAgICAgICAgIGRldGFpbCgiVVJMczxicj4iLCBkYXRhLnVybHMsICc8YnI+Jyk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGlmICh4bW9kZSA9PT0gJ3N0eWxlJykgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxwPkNTUy48L3A+Jyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5qc29uICYmICFlcnIpIHsKICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8cD5KU09OOiBnb29kLjwvcD4nKTsKICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmdsb2JhbHMpIHsKICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8ZGl2PjxpPkdsb2JhbDwvaT4gJyArCiAgICAgICAgICAgICAgICAgICAgZGF0YS5nbG9iYWxzLnNvcnQoKS5qb2luKCcsICcpICsgJzwvZGl2PicpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxkaXY+PGk+Tm8gbmV3IGdsb2JhbCB2YXJpYWJsZXMgaW50cm9kdWNlZC48L2k+PC9kaXY+Jyk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhLmZ1bmN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgdGhlX2Z1bmN0aW9uID0gZGF0YS5mdW5jdGlvbnNbaV07CiAgICAgICAgICAgICAgICBuYW1lcyA9IFtdOwogICAgICAgICAgICAgICAgaWYgKHRoZV9mdW5jdGlvbi5wYXJhbXMpIHsKICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdGhlX2Z1bmN0aW9uLnBhcmFtcy5sZW5ndGg7IGogKz0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1tqXSA9IHRoZV9mdW5jdGlvbi5wYXJhbXNbal0uc3RyaW5nOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8YnI+PGRpdiBjbGFzcz1mdW5jdGlvbj48aT4nICsKICAgICAgICAgICAgICAgICAgICBTdHJpbmcodGhlX2Z1bmN0aW9uLmxpbmUpICsgJzwvaT4gJyArCiAgICAgICAgICAgICAgICAgICAgdGhlX2Z1bmN0aW9uLm5hbWUuZW50aXR5aWZ5KCkgKwogICAgICAgICAgICAgICAgICAgICcoJyArIG5hbWVzLmpvaW4oJywgJykgKyAnKTwvZGl2PicpOwogICAgICAgICAgICAgICAgZGV0YWlsKCc8YmlnPjxiPlVuZGVmaW5lZDwvYj48L2JpZz4nLCB0aGVfZnVuY3Rpb25bJ3VuZGVmaW5lZCddKTsKICAgICAgICAgICAgICAgIGRldGFpbCgnPGJpZz48Yj5VbnVzZWQ8L2I+PC9iaWc+JywgdGhlX2Z1bmN0aW9uLnVudXNlZCk7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ0Nsb3N1cmUnLCB0aGVfZnVuY3Rpb24uY2xvc3VyZSk7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ1ZhcmlhYmxlJywgdGhlX2Z1bmN0aW9uWyd2YXInXSk7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ0V4Y2VwdGlvbicsIHRoZV9mdW5jdGlvbi5leGNlcHRpb24pOwogICAgICAgICAgICAgICAgZGV0YWlsKCdPdXRlcicsIHRoZV9mdW5jdGlvbi5vdXRlcik7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ0dsb2JhbCcsIHRoZV9mdW5jdGlvbi5nbG9iYWwpOwogICAgICAgICAgICAgICAgZGV0YWlsKCdMYWJlbCcsIHRoZV9mdW5jdGlvbi5sYWJlbCk7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ0NvbXBsZXhpdHknLCB0aGVfZnVuY3Rpb25bJyhjb21wbGV4aXR5KSddKTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgaWYgKGRhdGEubWVtYmVyKSB7CiAgICAgICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoZGF0YS5tZW1iZXIpOwogICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICAgICAga2V5cyA9IGtleXMuc29ydCgpOwogICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8YnI+PHByZSBpZD1wcm9wZXJ0aWVzPi8qcHJvcGVydGllczxicj4nKTsKICAgICAgICAgICAgICAgICAgICBtZW0gPSAnICAgICc7CiAgICAgICAgICAgICAgICAgICAgaXRhbGljcyA9IDA7CiAgICAgICAgICAgICAgICAgICAgaiA9IDA7CiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5jb25mdXNpb24pIHsKICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YW5kYXJkX3Byb3BlcnR5X3R5cGVba2V5XSAhPT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gaXgudGVzdChrZXkpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ga2V5CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1wnJyArIGtleS5lbnRpdHlpZnkoKS5yZXBsYWNlKG54LCBzYW5pdGl6ZSkgKyAnXCcnOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lbWJlcltrZXldID09PSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnPGk+JyArIG5hbWUgKyAnPC9pPic7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0YWxpY3MgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwga2V5cy5sZW5ndGggLSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gJywgJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lbS5sZW5ndGggKyBuYW1lLmxlbmd0aCAtIChpdGFsaWNzICogNykgPiA4MCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChtZW0gKyAnPGJyPicpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW0gPSAnICAgICc7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0YWxpY3MgPSBqOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW0gKz0gbmFtZTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gMDsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHByb3BlcnR5X3R5cGVba2V5XTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJyc7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhbmRhcmRfcHJvcGVydHlfdHlwZVtrZXldICE9PSB0eXBlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGl4LnRlc3Qoa2V5KQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGtleQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdcJycgKyBrZXkuZW50aXR5aWZ5KCkucmVwbGFjZShueCwgc2FuaXRpemUpICsgJ1wnJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gbmFtZS5sZW5ndGggKyAyOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lbWJlcltrZXldID09PSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnPGk+JyArIG5hbWUgKyAnPC9pPic7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0YWxpY3MgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gJzogJyArIHR5cGU7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwga2V5cy5sZW5ndGggLSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gJywgJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lbS5sZW5ndGggKyBuYW1lLmxlbmd0aCAtIChpdGFsaWNzICogNykgPiA4MCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChtZW0gKyAnPGJyPicpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW0gPSAnICAgICc7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0YWxpY3MgPSBqOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW0gKz0gbmFtZTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gMDsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChtZW0gKyAnPGJyPiovPC9wcmU+Jyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPC9kaXY+Jyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTsKICAgIH07CiAgICBpdHNlbGYuanNsaW50ID0gaXRzZWxmOwoKICAgIC8vIENvbW1vbkpTIG1vZHVsZSBleHBvcnQKICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gInVuZGVmaW5lZCIpIHsKICAgICAgICBleHBvcnRzLkpTTElOVCA9IGl0c2VsZjsKICAgIH0KCiAgICBpdHNlbGYuZWRpdGlvbiA9ICcyMDExLTA5LTI5JzsKCiAgICByZXR1cm4gaXRzZWxmOwoKfSgpKTs=");
});
(function() {
var env = {};
module.declare([{"_package-0":{"id":"887BE3DFB4516B3595DAB5B68B91EF7E"}}], function(require, exports, module) {
require('_package-0').main(env);
});
})();