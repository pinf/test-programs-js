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

            var callback = arguments[1];

            if (/^\//.test(moduleIdentifier[0]))
            {
	            bravojs.module.load(moduleIdentifier[0], function(id)
	            {
	                callback(newRequire(id));
	            });
            }
            else
            if (/^\./.test(moduleIdentifier[0]))
            {
	            moduleIdentifier = bravojs.contextForId(helpers.getContextSensitiveModuleDir()).resolveId(moduleIdentifier[0], helpers.getContextSensitiveModuleDir());
	            bravojs.module.load(moduleIdentifier, function(id)
	            {
	                callback(newRequire(id));
	            });
            }
            else
            {
	            if (typeof bravojs.mainContext == "undefined")
	                throw new Error("Cannot resolve ID for ASYNC require. bravojs.mainContext used to resolve ID not set!");
	            // Load IDs are resolved against the default context. To resolve against a different
	            // context use module.load([], callback).
	            moduleIdentifier = bravojs.contextForId(bravojs.mainContext).resolveId(moduleIdentifier[0], helpers.getContextSensitiveModuleDir());
	            bravojs.module.load(moduleIdentifier, function(id)
	            {
	                callback(newRequire(id));
	            });
            }
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
//     cap        true, if upper case HTML should be allowed
//     commonjs   true, if the standard commonjs globals should be predefined
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
    expected_type_a: string, exports: string, f: string, fieldset: object,
    figure: object,
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
    module: string,
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
    require: string,
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

// commonjs contains a set of global names that are commonly provided by a
// CommonJS environment.

        commonjs = {
            "require": false,
            "module": false,
            "exports": true
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
        if (option.commonjs) {
            add_to_predefined(commonjs);
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
                        if (!option.commonjs || typeof commonjs[l.string] !== "boolean") {
                            warn('adsafe_a', l);
                        }
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
                if (option.commonjs && commonjs[left.string] === true) {
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
return ((typeof bravojs !== "undefined")?bravojs:loader.bravojs).base64decode("Ly8ganNsaW50LmpzCi8vIDIwMTEtMDktMjkKCi8vIENvcHlyaWdodCAoYykgMjAwMiBEb3VnbGFzIENyb2NrZm9yZCAgKHd3dy5KU0xpbnQuY29tKQoKLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weQovLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbAovLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzCi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwKLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzCi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6CgovLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbgovLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS4KCi8vIFRoZSBTb2Z0d2FyZSBzaGFsbCBiZSB1c2VkIGZvciBHb29kLCBub3QgRXZpbC4KCi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAiQVMgSVMiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SCi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLAovLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUKLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUgovLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLAovLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRQovLyBTT0ZUV0FSRS4KCi8vIFdBUk5JTkc6IEpTTGludCB3aWxsIGh1cnQgeW91ciBmZWVsaW5ncy4KCi8vIEpTTElOVCBpcyBhIGdsb2JhbCBmdW5jdGlvbi4gSXQgdGFrZXMgdHdvIHBhcmFtZXRlcnMuCgovLyAgICAgdmFyIG15UmVzdWx0ID0gSlNMSU5UKHNvdXJjZSwgb3B0aW9uKTsKCi8vIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MuIElmIGl0IGlzIGEKLy8gc3RyaW5nLCBpdCB3aWxsIGJlIHNwbGl0IG9uICdcbicgb3IgJ1xyJy4gSWYgaXQgaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncywgaXQKLy8gaXMgYXNzdW1lZCB0aGF0IGVhY2ggc3RyaW5nIHJlcHJlc2VudHMgb25lIGxpbmUuIFRoZSBzb3VyY2UgY2FuIGJlIGEKLy8gSmF2YVNjcmlwdCB0ZXh0LCBvciBIVE1MIHRleHQsIG9yIGEgSlNPTiB0ZXh0LCBvciBhIENTUyB0ZXh0LgoKLy8gVGhlIHNlY29uZCBwYXJhbWV0ZXIgaXMgYW4gb3B0aW9uYWwgb2JqZWN0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9sIHRoZQovLyBvcGVyYXRpb24gb2YgSlNMSU5ULiBNb3N0IG9mIHRoZSBvcHRpb25zIGFyZSBib29sZWFuczogVGhleSBhcmUgYWxsCi8vIG9wdGlvbmFsIGFuZCBoYXZlIGEgZGVmYXVsdCB2YWx1ZSBvZiBmYWxzZS4gT25lIG9mIHRoZSBvcHRpb25zLCBwcmVkZWYsCi8vIGNhbiBiZSBhbiBhcnJheSBvZiBuYW1lcywgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGRlY2xhcmUgZ2xvYmFsIHZhcmlhYmxlcywKLy8gb3IgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIHVzZWQgYXMgZ2xvYmFsIG5hbWVzLCB3aXRoIGEgYm9vbGVhbiB2YWx1ZQovLyB0aGF0IGRldGVybWluZXMgaWYgdGhleSBhcmUgYXNzaWduYWJsZS4KCi8vIElmIGl0IGNoZWNrcyBvdXQsIEpTTElOVCByZXR1cm5zIHRydWUuIE90aGVyd2lzZSwgaXQgcmV0dXJucyBmYWxzZS4KCi8vIElmIGZhbHNlLCB5b3UgY2FuIGluc3BlY3QgSlNMSU5ULmVycm9ycyB0byBmaW5kIG91dCB0aGUgcHJvYmxlbXMuCi8vIEpTTElOVC5lcnJvcnMgaXMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRoZXNlIHByb3BlcnRpZXM6CgovLyAgewovLyAgICAgIGxpbmUgICAgICA6IFRoZSBsaW5lIChyZWxhdGl2ZSB0byAwKSBhdCB3aGljaCB0aGUgbGludCB3YXMgZm91bmQKLy8gICAgICBjaGFyYWN0ZXIgOiBUaGUgY2hhcmFjdGVyIChyZWxhdGl2ZSB0byAwKSBhdCB3aGljaCB0aGUgbGludCB3YXMgZm91bmQKLy8gICAgICByZWFzb24gICAgOiBUaGUgcHJvYmxlbQovLyAgICAgIGV2aWRlbmNlICA6IFRoZSB0ZXh0IGxpbmUgaW4gd2hpY2ggdGhlIHByb2JsZW0gb2NjdXJyZWQKLy8gICAgICByYXcgICAgICAgOiBUaGUgcmF3IG1lc3NhZ2UgYmVmb3JlIHRoZSBkZXRhaWxzIHdlcmUgaW5zZXJ0ZWQKLy8gICAgICBhICAgICAgICAgOiBUaGUgZmlyc3QgZGV0YWlsCi8vICAgICAgYiAgICAgICAgIDogVGhlIHNlY29uZCBkZXRhaWwKLy8gICAgICBjICAgICAgICAgOiBUaGUgdGhpcmQgZGV0YWlsCi8vICAgICAgZCAgICAgICAgIDogVGhlIGZvdXJ0aCBkZXRhaWwKLy8gIH0KCi8vIElmIGEgc3RvcHBpbmcgZXJyb3Igd2FzIGZvdW5kLCBhIG51bGwgd2lsbCBiZSB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZQovLyBKU0xJTlQuZXJyb3JzIGFycmF5LiBBIHN0b3BwaW5nIGVycm9yIG1lYW5zIHRoYXQgSlNMaW50IHdhcyBub3QgY29uZmlkZW50Ci8vIGVub3VnaCB0byBjb250aW51ZS4gSXQgZG9lcyBub3QgbmVjZXNzYXJpbHkgbWVhbiB0aGF0IHRoZSBlcnJvciB3YXMKLy8gZXNwZWNpYWxseSBoZWlub3VzLgoKLy8gWW91IGNhbiByZXF1ZXN0IGEgRnVuY3Rpb24gUmVwb3J0LCB3aGljaCBzaG93cyBhbGwgb2YgdGhlIGZ1bmN0aW9ucwovLyBhbmQgdGhlIHBhcmFtZXRlcnMgYW5kIHZhcnMgdGhhdCB0aGV5IHVzZS4gVGhpcyBjYW4gYmUgdXNlZCB0byBmaW5kCi8vIGltcGxpZWQgZ2xvYmFsIHZhcmlhYmxlcyBhbmQgb3RoZXIgcHJvYmxlbXMuIFRoZSByZXBvcnQgaXMgaW4gSFRNTCBhbmQKLy8gY2FuIGJlIGluc2VydGVkIGluIGFuIEhUTUwgPGJvZHk+LgoKLy8gICAgIHZhciBteVJlcG9ydCA9IEpTTElOVC5yZXBvcnQoZXJyb3JzX29ubHkpOwoKLy8gSWYgZXJyb3JzX29ubHkgaXMgdHJ1ZSwgdGhlbiB0aGUgcmVwb3J0IHdpbGwgYmUgbGltaXRlZCB0byBvbmx5IGVycm9ycy4KCi8vIFlvdSBjYW4gcmVxdWVzdCBhIGRhdGEgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgSlNMaW50J3MgcmVzdWx0cy4KCi8vICAgICB2YXIgbXlEYXRhID0gSlNMSU5ULmRhdGEoKTsKCi8vIEl0IHJldHVybnMgYSBzdHJ1Y3R1cmUgd2l0aCB0aGlzIGZvcm06CgovLyAgICAgewovLyAgICAgICAgIGVycm9yczogWwovLyAgICAgICAgICAgICB7Ci8vICAgICAgICAgICAgICAgICBsaW5lOiBOVU1CRVIsCi8vICAgICAgICAgICAgICAgICBjaGFyYWN0ZXI6IE5VTUJFUiwKLy8gICAgICAgICAgICAgICAgIHJlYXNvbjogU1RSSU5HLAovLyAgICAgICAgICAgICAgICAgZXZpZGVuY2U6IFNUUklORwovLyAgICAgICAgICAgICB9Ci8vICAgICAgICAgXSwKLy8gICAgICAgICBmdW5jdGlvbnM6IFsKLy8gICAgICAgICAgICAgewovLyAgICAgICAgICAgICAgICAgbmFtZTogU1RSSU5HLAovLyAgICAgICAgICAgICAgICAgbGluZTogTlVNQkVSLAovLyAgICAgICAgICAgICAgICAgbGFzdDogTlVNQkVSLAovLyAgICAgICAgICAgICAgICAgcGFyYW1zOiBbCi8vICAgICAgICAgICAgICAgICAgICAgewovLyAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmc6IFNUUklORwovLyAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgIF0sCi8vICAgICAgICAgICAgICAgICBjbG9zdXJlOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdLAovLyAgICAgICAgICAgICAgICAgdmFyOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdLAovLyAgICAgICAgICAgICAgICAgZXhjZXB0aW9uOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdLAovLyAgICAgICAgICAgICAgICAgb3V0ZXI6IFsKLy8gICAgICAgICAgICAgICAgICAgICBTVFJJTkcKLy8gICAgICAgICAgICAgICAgIF0sCi8vICAgICAgICAgICAgICAgICB1bnVzZWQ6IFsKLy8gICAgICAgICAgICAgICAgICAgICBTVFJJTkcKLy8gICAgICAgICAgICAgICAgIF0sCi8vICAgICAgICAgICAgICAgICB1bmRlZjogWwovLyAgICAgICAgICAgICAgICAgICAgIFNUUklORwovLyAgICAgICAgICAgICAgICAgXSwKLy8gICAgICAgICAgICAgICAgIGdsb2JhbDogWwovLyAgICAgICAgICAgICAgICAgICAgIFNUUklORwovLyAgICAgICAgICAgICAgICAgXSwKLy8gICAgICAgICAgICAgICAgIGxhYmVsOiBbCi8vICAgICAgICAgICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgICAgICAgICBdCi8vICAgICAgICAgICAgIH0KLy8gICAgICAgICBdLAovLyAgICAgICAgIGdsb2JhbHM6IFsKLy8gICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgXSwKLy8gICAgICAgICBtZW1iZXI6IHsKLy8gICAgICAgICAgICAgU1RSSU5HOiBOVU1CRVIKLy8gICAgICAgICB9LAovLyAgICAgICAgIHVybHM6IFsKLy8gICAgICAgICAgICAgU1RSSU5HCi8vICAgICAgICAgXSwKLy8gICAgICAgICBqc29uOiBCT09MRUFOCi8vICAgICB9CgovLyBFbXB0eSBhcnJheXMgd2lsbCBub3QgYmUgaW5jbHVkZWQuCgovLyBZb3UgY2FuIG9idGFpbiB0aGUgcGFyc2UgdHJlZSB0aGF0IEpTTGludCBjb25zdHJ1Y3RlZCB3aGlsZSBwYXJzaW5nLiBUaGUKLy8gbGF0ZXN0IHRyZWUgaXMga2VwdCBpbiBKU0xJTlQudHJlZS4gQSBuaWNlIHN0cmluZ2ljYXRpb24gY2FuIGJlIHByb2R1Y2VkCi8vIHdpdGgKCi8vICAgICBKU09OLnN0cmluZ2lmeShKU0xJTlQudHJlZSwgWwovLyAgICAgICAgICdzdHJpbmcnLCAgJ2FyaXR5JywgJ25hbWUnLCAgJ2ZpcnN0JywKLy8gICAgICAgICAnc2Vjb25kJywgJ3RoaXJkJywgJ2Jsb2NrJywgJ2Vsc2UnCi8vICAgICBdLCA0KSk7CgovLyBKU0xpbnQgcHJvdmlkZXMgdGhyZWUgZGlyZWN0aXZlcy4gVGhleSBsb29rIGxpa2Ugc2xhc2hzdGFyIGNvbW1lbnRzLCBhbmQKLy8gYWxsb3cgZm9yIHNldHRpbmcgb3B0aW9ucywgZGVjbGFyaW5nIGdsb2JhbCB2YXJpYWJsZXMsIGFuZCBlc3RhYmxpc2hpbmcgYQovLyBzZXQgb2YgYWxsb3dlZCBwcm9wZXJ0eSBuYW1lcy4KCi8vIFRoZXNlIGRpcmVjdGl2ZXMgcmVzcGVjdCBmdW5jdGlvbiBzY29wZS4KCi8vIFRoZSBqc2xpbnQgZGlyZWN0aXZlIGlzIGEgc3BlY2lhbCBjb21tZW50IHRoYXQgY2FuIHNldCBvbmUgb3IgbW9yZSBvcHRpb25zLgovLyBUaGUgY3VycmVudCBvcHRpb24gc2V0IGlzCgovLyAgICAgYWRzYWZlICAgICB0cnVlLCBpZiBBRHNhZmUgcnVsZXMgc2hvdWxkIGJlIGVuZm9yY2VkCi8vICAgICBiaXR3aXNlICAgIHRydWUsIGlmIGJpdHdpc2Ugb3BlcmF0b3JzIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBicm93c2VyICAgIHRydWUsIGlmIHRoZSBzdGFuZGFyZCBicm93c2VyIGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIGNhcCAgICAgICAgdHJ1ZSwgaWYgdXBwZXIgY2FzZSBIVE1MIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBjb21tb25qcyAgIHRydWUsIGlmIHRoZSBzdGFuZGFyZCBjb21tb25qcyBnbG9iYWxzIHNob3VsZCBiZSBwcmVkZWZpbmVkCi8vICAgICBjb25mdXNpb24gIHRydWUsIGlmIHR5cGVzIGNhbiBiZSB1c2VkIGluY29uc2lzdGVudGx5Ci8vICAgICAnY29udGludWUnIHRydWUsIGlmIHRoZSBjb250aW51YXRpb24gc3RhdGVtZW50IHNob3VsZCBiZSB0b2xlcmF0ZWQKLy8gICAgIGNzcyAgICAgICAgdHJ1ZSwgaWYgQ1NTIHdvcmthcm91bmRzIHNob3VsZCBiZSB0b2xlcmF0ZWQKLy8gICAgIGRlYnVnICAgICAgdHJ1ZSwgaWYgZGVidWdnZXIgc3RhdGVtZW50cyBzaG91bGQgYmUgYWxsb3dlZAovLyAgICAgZGV2ZWwgICAgICB0cnVlLCBpZiBsb2dnaW5nIHNob3VsZCBiZSBhbGxvd2VkIChjb25zb2xlLCBhbGVydCwgZXRjLikKLy8gICAgIGVxZXEgICAgICAgdHJ1ZSwgaWYgPT0gc2hvdWxkIGJlIGFsbG93ZWQKLy8gICAgIGVzNSAgICAgICAgdHJ1ZSwgaWYgRVM1IHN5bnRheCBzaG91bGQgYmUgYWxsb3dlZAovLyAgICAgZXZpbCAgICAgICB0cnVlLCBpZiBldmFsIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBmb3JpbiAgICAgIHRydWUsIGlmIGZvciBpbiBzdGF0ZW1lbnRzIG5lZWQgbm90IGZpbHRlcgovLyAgICAgZnJhZ21lbnQgICB0cnVlLCBpZiBIVE1MIGZyYWdtZW50cyBzaG91bGQgYmUgYWxsb3dlZAovLyAgICAgaW5kZW50ICAgICB0aGUgaW5kZW50YXRpb24gZmFjdG9yCi8vICAgICBtYXhlcnIgICAgIHRoZSBtYXhpbXVtIG51bWJlciBvZiBlcnJvcnMgdG8gYWxsb3cKLy8gICAgIG1heGxlbiAgICAgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGEgc291cmNlIGxpbmUKLy8gICAgIG5ld2NhcCAgICAgdHJ1ZSwgaWYgY29uc3RydWN0b3IgbmFtZXMgY2FwaXRhbGl6YXRpb24gaXMgaWdub3JlZAovLyAgICAgbm9kZSAgICAgICB0cnVlLCBpZiBOb2RlLmpzIGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIG5vbWVuICAgICAgdHJ1ZSwgaWYgbmFtZXMgbWF5IGhhdmUgZGFuZ2xpbmcgXwovLyAgICAgb24gICAgICAgICB0cnVlLCBpZiBIVE1MIGV2ZW50IGhhbmRsZXJzIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICBwYXNzZmFpbCAgIHRydWUsIGlmIHRoZSBzY2FuIHNob3VsZCBzdG9wIG9uIGZpcnN0IGVycm9yCi8vICAgICBwbHVzcGx1cyAgIHRydWUsIGlmIGluY3JlbWVudC9kZWNyZW1lbnQgc2hvdWxkIGJlIGFsbG93ZWQKLy8gICAgIHByb3BlcnRpZXMgdHJ1ZSwgaWYgYWxsIHByb3BlcnR5IG5hbWVzIG11c3QgYmUgZGVjbGFyZWQgd2l0aCAvKnByb3BlcnRpZXMqLwovLyAgICAgcmVnZXhwICAgICB0cnVlLCBpZiB0aGUgLiBzaG91bGQgYmUgYWxsb3dlZCBpbiByZWdleHAgbGl0ZXJhbHMKLy8gICAgIHJoaW5vICAgICAgdHJ1ZSwgaWYgdGhlIFJoaW5vIGVudmlyb25tZW50IGdsb2JhbHMgc2hvdWxkIGJlIHByZWRlZmluZWQKLy8gICAgIHVuZGVmICAgICAgdHJ1ZSwgaWYgdmFyaWFibGVzIGNhbiBiZSBkZWNsYXJlZCBvdXQgb2Ygb3JkZXIKLy8gICAgIHVucGFyYW0gICAgdHJ1ZSwgaWYgdW51c2VkIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHRvbGVyYXRlZAovLyAgICAgc2FmZSAgICAgICB0cnVlLCBpZiB1c2Ugb2Ygc29tZSBicm93c2VyIGZlYXR1cmVzIHNob3VsZCBiZSByZXN0cmljdGVkCi8vICAgICBzbG9wcHkgICAgIHRydWUsIGlmIHRoZSAndXNlIHN0cmljdCc7IHByYWdtYSBpcyBvcHRpb25hbAovLyAgICAgc3ViICAgICAgICB0cnVlLCBpZiBhbGwgZm9ybXMgb2Ygc3Vic2NyaXB0IG5vdGF0aW9uIGFyZSB0b2xlcmF0ZWQKLy8gICAgIHZhcnMgICAgICAgdHJ1ZSwgaWYgbXVsdGlwbGUgdmFyIHN0YXRlbWVudHMgcGVyIGZ1bmN0aW9uIHNob3VsZCBiZSBhbGxvd2VkCi8vICAgICB3aGl0ZSAgICAgIHRydWUsIGlmIHNsb3BweSB3aGl0ZXNwYWNlIGlzIHRvbGVyYXRlZAovLyAgICAgd2lkZ2V0ICAgICB0cnVlICBpZiB0aGUgWWFob28gV2lkZ2V0cyBnbG9iYWxzIHNob3VsZCBiZSBwcmVkZWZpbmVkCi8vICAgICB3aW5kb3dzICAgIHRydWUsIGlmIE1TIFdpbmRvd3Mtc3BlY2lmaWMgZ2xvYmFscyBzaG91bGQgYmUgcHJlZGVmaW5lZAoKLy8gRm9yIGV4YW1wbGU6CgovKmpzbGludAogICAgZXZpbDogdHJ1ZSwgbm9tZW46IHRydWUsIHJlZ2V4cDogdHJ1ZSwgY29tbW9uanM6IHRydWUKKi8KCi8vIFRoZSBwcm9wZXJ0aWVzIGRpcmVjdGl2ZSBkZWNsYXJlcyBhbiBleGNsdXNpdmUgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcy4KLy8gQW55IHByb3BlcnRpZXMgbmFtZWQgaW4gdGhlIHByb2dyYW0gdGhhdCBhcmUgbm90IGluIHRoZSBsaXN0IHdpbGwKLy8gcHJvZHVjZSBhIHdhcm5pbmcuCgovLyBGb3IgZXhhbXBsZToKCi8qcHJvcGVydGllcwogICAgJ1xiJzogc3RyaW5nLCAnXHQnOiBzdHJpbmcsICdcbic6IHN0cmluZywgJ1xmJzogc3RyaW5nLCAnXHInOiBzdHJpbmcsCiAgICAnIT0nOiBib29sZWFuLCAnIT09JzogYm9vbGVhbiwgJyInOiBzdHJpbmcsICclJzogYm9vbGVhbiwgJ1wnJzogc3RyaW5nLAogICAgJyhiZWdpbiknLCAnKGJyZWFrYWdlKSc6IG51bWJlciwgJyhjb21wbGV4aXR5KScsICcoY29uZnVzaW9uKSc6IGJvb2xlYW4sCiAgICAnKGNvbnRleHQpJzogb2JqZWN0LCAnKGVycm9yKScsICcoaWRlbnRpZmllciknLCAnKGxpbmUpJzogbnVtYmVyLAogICAgJyhsb29wYWdlKSc6IG51bWJlciwgJyhuYW1lKScsICcob2xkX3Byb3BlcnR5X3R5cGUpJywgJyhwYXJhbXMpJywKICAgICcoc2NvcGUpJzogb2JqZWN0LCAnKHRva2VuKScsICcodmFycyknLCAnKHZlcmIpJywgJyonOiBib29sZWFuLAogICAgJysnOiBib29sZWFuLCAnLSc6IGJvb2xlYW4sICcvJzogKiwgJzwnOiBib29sZWFuLCAnPD0nOiBib29sZWFuLAogICAgJz09JzogYm9vbGVhbiwgJz09PSc6IGJvb2xlYW4sICc+JzogYm9vbGVhbiwgJz49JzogYm9vbGVhbiwKICAgIEFEU0FGRTogYm9vbGVhbiwgQXJyYXksIERhdGUsIEU6IHN0cmluZywgRnVuY3Rpb24sIExOMTA6IHN0cmluZywKICAgIExOMjogc3RyaW5nLCBMT0cxMEU6IHN0cmluZywgTE9HMkU6IHN0cmluZywgTUFYX1ZBTFVFOiBzdHJpbmcsCiAgICBNSU5fVkFMVUU6IHN0cmluZywgTkVHQVRJVkVfSU5GSU5JVFk6IHN0cmluZywgT2JqZWN0LCBQSTogc3RyaW5nLAogICAgUE9TSVRJVkVfSU5GSU5JVFk6IHN0cmluZywgU1FSVDFfMjogc3RyaW5nLCBTUVJUMjogc3RyaW5nLCAnXFwnOiBzdHJpbmcsCiAgICBhOiBvYmplY3QsIGFfbGFiZWw6IHN0cmluZywgYV9ub3RfYWxsb3dlZDogc3RyaW5nLCBhX25vdF9kZWZpbmVkOiBzdHJpbmcsCiAgICBhX3Njb3BlOiBzdHJpbmcsIGFiYnI6IG9iamVjdCwgYWNyb255bTogb2JqZWN0LCBhZGRyZXNzOiBvYmplY3QsIGFkc2FmZSwKICAgIGFkc2FmZV9hOiBzdHJpbmcsIGFkc2FmZV9hdXRvY29tcGxldGU6IHN0cmluZywgYWRzYWZlX2JhZF9pZDogc3RyaW5nLAogICAgYWRzYWZlX2Rpdjogc3RyaW5nLCBhZHNhZmVfZnJhZ21lbnQ6IHN0cmluZywgYWRzYWZlX2dvOiBzdHJpbmcsCiAgICBhZHNhZmVfaHRtbDogc3RyaW5nLCBhZHNhZmVfaWQ6IHN0cmluZywgYWRzYWZlX2lkX2dvOiBzdHJpbmcsCiAgICBhZHNhZmVfbGliOiBzdHJpbmcsIGFkc2FmZV9saWJfc2Vjb25kOiBzdHJpbmcsIGFkc2FmZV9taXNzaW5nX2lkOiBzdHJpbmcsCiAgICBhZHNhZmVfbmFtZV9hOiBzdHJpbmcsIGFkc2FmZV9wbGFjZW1lbnQ6IHN0cmluZywgYWRzYWZlX3ByZWZpeF9hOiBzdHJpbmcsCiAgICBhZHNhZmVfc2NyaXB0OiBzdHJpbmcsIGFkc2FmZV9zb3VyY2U6IHN0cmluZywgYWRzYWZlX3N1YnNjcmlwdF9hOiBzdHJpbmcsCiAgICBhZHNhZmVfdGFnOiBzdHJpbmcsIGFsbDogYm9vbGVhbiwgYWxyZWFkeV9kZWZpbmVkOiBzdHJpbmcsIGFuZDogc3RyaW5nLAogICAgYXBwbGV0OiBvYmplY3QsIGFwcGx5OiBzdHJpbmcsIGFwcHJvdmVkOiBhcnJheSwgYXJlYTogb2JqZWN0LAogICAgYXJpdHk6IHN0cmluZywgYXJ0aWNsZTogb2JqZWN0LCBhc2lkZTogb2JqZWN0LCBhc3NpZ246IGJvb2xlYW4sCiAgICBhc3NpZ25fZXhjZXB0aW9uOiBzdHJpbmcsIGFzc2lnbm1lbnRfZnVuY3Rpb25fZXhwcmVzc2lvbjogc3RyaW5nLAogICAgYXQ6IG51bWJlciwgYXR0cmlidXRlX2Nhc2VfYTogc3RyaW5nLCBhdWRpbzogb2JqZWN0LCBhdXRvY29tcGxldGU6IHN0cmluZywKICAgIGF2b2lkX2E6IHN0cmluZywgYjogKiwgYmFja2dyb3VuZDogYXJyYXksICdiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnOiBhcnJheSwKICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYXJyYXksICdiYWNrZ3JvdW5kLWltYWdlJzogYXJyYXksCiAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IGFycmF5LCAnYmFja2dyb3VuZC1yZXBlYXQnOiBhcnJheSwKICAgIGJhZF9hc3NpZ25tZW50OiBzdHJpbmcsIGJhZF9jb2xvcl9hOiBzdHJpbmcsIGJhZF9jb25zdHJ1Y3Rvcjogc3RyaW5nLAogICAgYmFkX2VudGl0eTogc3RyaW5nLCBiYWRfaHRtbDogc3RyaW5nLCBiYWRfaWRfYTogc3RyaW5nLCBiYWRfaW5fYTogc3RyaW5nLAogICAgYmFkX2ludm9jYXRpb246IHN0cmluZywgYmFkX25hbWVfYTogc3RyaW5nLCBiYWRfbmV3OiBzdHJpbmcsCiAgICBiYWRfbnVtYmVyOiBzdHJpbmcsIGJhZF9vcGVyYW5kOiBzdHJpbmcsIGJhZF9zdHlsZTogc3RyaW5nLAogICAgYmFkX3R5cGU6IHN0cmluZywgYmFkX3VybF9hOiBzdHJpbmcsIGJhZF93cmFwOiBzdHJpbmcsIGJhc2U6IG9iamVjdCwKICAgIGJkbzogb2JqZWN0LCBiaWc6IG9iamVjdCwgYmluZDogc3RyaW5nLCBiaXR3aXNlOiBib29sZWFuLCBibG9jazogYXJyYXksCiAgICBibG9ja3F1b3RlOiBvYmplY3QsIGJvZHk6IG9iamVjdCwgYm9yZGVyOiBhcnJheSwgJ2JvcmRlci1ib3R0b20nOiBhcnJheSwKICAgICdib3JkZXItYm90dG9tLWNvbG9yJywgJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnLAogICAgJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJywgJ2JvcmRlci1ib3R0b20tc3R5bGUnOiBhcnJheSwKICAgICdib3JkZXItYm90dG9tLXdpZHRoJywgJ2JvcmRlci1jb2xsYXBzZSc6IGFycmF5LCAnYm9yZGVyLWNvbG9yJzogYXJyYXksCiAgICAnYm9yZGVyLWxlZnQnOiBhcnJheSwgJ2JvcmRlci1sZWZ0LWNvbG9yJywgJ2JvcmRlci1sZWZ0LXN0eWxlJzogYXJyYXksCiAgICAnYm9yZGVyLWxlZnQtd2lkdGgnLCAnYm9yZGVyLXJhZGl1cycsICdib3JkZXItcmlnaHQnOiBhcnJheSwKICAgICdib3JkZXItcmlnaHQtY29sb3InLCAnYm9yZGVyLXJpZ2h0LXN0eWxlJzogYXJyYXksICdib3JkZXItcmlnaHQtd2lkdGgnLAogICAgJ2JvcmRlci1zcGFjaW5nJzogYXJyYXksICdib3JkZXItc3R5bGUnOiBhcnJheSwgJ2JvcmRlci10b3AnOiBhcnJheSwKICAgICdib3JkZXItdG9wLWNvbG9yJywgJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnLCAnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnLAogICAgJ2JvcmRlci10b3Atc3R5bGUnOiBhcnJheSwgJ2JvcmRlci10b3Atd2lkdGgnLCAnYm9yZGVyLXdpZHRoJzogYXJyYXksCiAgICBib3R0b206IGFycmF5LCBicjogb2JqZWN0LCBicmFpbGxlOiBib29sZWFuLCBicm93c2VyOiBib29sZWFuLAogICAgYnV0dG9uOiBvYmplY3QsIGMsIGNhbGw6IHN0cmluZywgY2FudmFzOiBvYmplY3QsIGNhcCwgY2FwdGlvbjogb2JqZWN0LAogICAgJ2NhcHRpb24tc2lkZSc6IGFycmF5LCBjZWlsOiBzdHJpbmcsIGNlbnRlcjogb2JqZWN0LCBjaGFyQXQ6ICosCiAgICBjaGFyQ29kZUF0OiAqLCBjaGFyYWN0ZXIsIGNpdGU6IG9iamVjdCwgY2xlYXI6IGFycmF5LCBjbGlwOiBhcnJheSwgY2xvc3VyZSwKICAgIGNtOiBib29sZWFuLCBjb2RlOiBvYmplY3QsIGNvbDogb2JqZWN0LCBjb2xncm91cDogb2JqZWN0LCBjb2xvciwKICAgIGNvbWJpbmVfdmFyOiBzdHJpbmcsIGNvbW1hbmQ6IG9iamVjdCwgY29tbW9uanM6IGJvb2xlYW4sIGNvbmNhdDogc3RyaW5nLAogICAgY29uZGl0aW9uYWxfYXNzaWdubWVudDogc3RyaW5nLCBjb25mdXNpbmdfYTogc3RyaW5nLAogICAgY29uZnVzaW5nX3JlZ2V4cDogc3RyaW5nLCBjb25mdXNpb246IGJvb2xlYW4sIGNvbnN0cnVjdG9yOiBzdHJpbmcsCiAgICBjb25zdHJ1Y3Rvcl9uYW1lX2E6IHN0cmluZywgY29udGVudDogYXJyYXksIGNvbnRpbnVlLCBjb250cm9sX2E6IHN0cmluZywKICAgICdjb3VudGVyLWluY3JlbWVudCc6IGFycmF5LCAnY291bnRlci1yZXNldCc6IGFycmF5LCBjcmVhdGU6ICosIGNzczogc3RyaW5nLAogICAgY3Vyc29yOiBhcnJheSwgZCwgZGFuZ2Vyb3VzX2NvbW1lbnQ6IHN0cmluZywgZGFuZ2xpbmdfYTogc3RyaW5nLAogICAgZGF0YTogZnVuY3Rpb24gb2JqZWN0LCBkYXRhbGlzdDogb2JqZWN0LCBkZDogb2JqZWN0LCBkZWJ1ZywKICAgIGRlZmluZVByb3BlcnRpZXM6IHN0cmluZywgZGVmaW5lUHJvcGVydHk6IHN0cmluZywgZGVsOiBvYmplY3QsCiAgICBkZWxldGVkOiBzdHJpbmcsIGRldGFpbHM6IG9iamVjdCwgZGV2ZWw6IGJvb2xlYW4sIGRmbjogb2JqZWN0LAogICAgZGlhbG9nOiBvYmplY3QsIGRpcjogb2JqZWN0LCBkaXJlY3Rpb246IGFycmF5LCBkaXNwbGF5OiBhcnJheSwKICAgIGRpc3J1cHQ6IGJvb2xlYW4sIGRpdjogb2JqZWN0LCBkbDogb2JqZWN0LCBkdDogb2JqZWN0LCBkdXBsaWNhdGVfYTogc3RyaW5nLAogICAgZWRnZTogc3RyaW5nLCBlZGl0aW9uOiBzdHJpbmcsIGVsc2UsIGVtOiAqLCBlbWJlZDogb2JqZWN0LAogICAgZW1ib3NzZWQ6IGJvb2xlYW4sIGVtcHR5OiBib29sZWFuLCAnZW1wdHktY2VsbHMnOiBhcnJheSwKICAgIGVtcHR5X2Jsb2NrOiBzdHJpbmcsIGVtcHR5X2Nhc2U6IHN0cmluZywgZW1wdHlfY2xhc3M6IHN0cmluZywKICAgIGVudGl0eWlmeTogZnVuY3Rpb24sIGVxZXEsIGVycm9yczogYXJyYXksIGVzNTogc3RyaW5nLCBldmFsLCBldmVyeTogc3RyaW5nLAogICAgZXZpZGVuY2UsIGV2aWw6IHN0cmluZywgZXg6IGJvb2xlYW4sIGV4Y2VwdGlvbiwgZXhlYzogKiwKICAgIGV4cGVjdGVkX2E6IHN0cmluZywgZXhwZWN0ZWRfYV9hdF9iX2M6IHN0cmluZywgZXhwZWN0ZWRfYV9iOiBzdHJpbmcsCiAgICBleHBlY3RlZF9hX2JfZnJvbV9jX2Q6IHN0cmluZywgZXhwZWN0ZWRfYXRfYTogc3RyaW5nLAogICAgZXhwZWN0ZWRfYXR0cmlidXRlX2E6IHN0cmluZywgZXhwZWN0ZWRfYXR0cmlidXRlX3ZhbHVlX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX2NsYXNzX2E6IHN0cmluZywgZXhwZWN0ZWRfZnJhY3Rpb25fYTogc3RyaW5nLAogICAgZXhwZWN0ZWRfaWRfYTogc3RyaW5nLCBleHBlY3RlZF9pZGVudGlmaWVyX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX2lkZW50aWZpZXJfYV9yZXNlcnZlZDogc3RyaW5nLCBleHBlY3RlZF9sYW5nX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX2xpbmVhcl9hOiBzdHJpbmcsIGV4cGVjdGVkX21lZGlhX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX25hbWVfYTogc3RyaW5nLCBleHBlY3RlZF9ub25zdGFuZGFyZF9zdHlsZV9hdHRyaWJ1dGU6IHN0cmluZywKICAgIGV4cGVjdGVkX251bWJlcl9hOiBzdHJpbmcsIGV4cGVjdGVkX29wZXJhdG9yX2E6IHN0cmluZywKICAgIGV4cGVjdGVkX3BlcmNlbnRfYTogc3RyaW5nLCBleHBlY3RlZF9wb3NpdGl2ZV9hOiBzdHJpbmcsCiAgICBleHBlY3RlZF9wc2V1ZG9fYTogc3RyaW5nLCBleHBlY3RlZF9zZWxlY3Rvcl9hOiBzdHJpbmcsCiAgICBleHBlY3RlZF9zbWFsbF9hOiBzdHJpbmcsIGV4cGVjdGVkX3NwYWNlX2FfYjogc3RyaW5nLAogICAgZXhwZWN0ZWRfc3RyaW5nX2E6IHN0cmluZywgZXhwZWN0ZWRfc3R5bGVfYXR0cmlidXRlOiBzdHJpbmcsCiAgICBleHBlY3RlZF9zdHlsZV9wYXR0ZXJuOiBzdHJpbmcsIGV4cGVjdGVkX3RhZ25hbWVfYTogc3RyaW5nLAogICAgZXhwZWN0ZWRfdHlwZV9hOiBzdHJpbmcsIGV4cG9ydHM6IHN0cmluZywgZjogc3RyaW5nLCBmaWVsZHNldDogb2JqZWN0LAogICAgZmlndXJlOiBvYmplY3QsCiAgICBmaWx0ZXI6ICosIGZpcnN0OiAqLCBmbG9hdDogYXJyYXksIGZsb29yOiAqLCBmb250OiAqLCAnZm9udC1mYW1pbHknLAogICAgJ2ZvbnQtc2l6ZSc6IGFycmF5LCAnZm9udC1zaXplLWFkanVzdCc6IGFycmF5LCAnZm9udC1zdHJldGNoJzogYXJyYXksCiAgICAnZm9udC1zdHlsZSc6IGFycmF5LCAnZm9udC12YXJpYW50JzogYXJyYXksICdmb250LXdlaWdodCc6IGFycmF5LAogICAgZm9vdGVyOiBvYmplY3QsIGZvciwgZm9yRWFjaDogKiwgZm9yX2lmOiBzdHJpbmcsIGZvcmluLCBmb3JtOiBvYmplY3QsCiAgICBmcmFnbWVudCwgZnJhbWU6IG9iamVjdCwgZnJhbWVzZXQ6IG9iamVjdCwgZnJlZXplOiBzdHJpbmcsIGZyb206IG51bWJlciwKICAgIGZyb21DaGFyQ29kZTogZnVuY3Rpb24sIGZ1ZDogZnVuY3Rpb24sIGZ1bmN0OiBvYmplY3QsIGZ1bmN0aW9uLAogICAgZnVuY3Rpb25fYmxvY2s6IHN0cmluZywgZnVuY3Rpb25fZXZhbDogc3RyaW5nLCBmdW5jdGlvbl9sb29wOiBzdHJpbmcsCiAgICBmdW5jdGlvbl9zdGF0ZW1lbnQ6IHN0cmluZywgZnVuY3Rpb25fc3RyaWN0OiBzdHJpbmcsIGZ1bmN0aW9uczogYXJyYXksCiAgICBnZXREYXRlOiBzdHJpbmcsIGdldERheTogc3RyaW5nLCBnZXRGdWxsWWVhcjogc3RyaW5nLCBnZXRIb3Vyczogc3RyaW5nLAogICAgZ2V0TWlsbGlzZWNvbmRzOiBzdHJpbmcsIGdldE1pbnV0ZXM6IHN0cmluZywgZ2V0TW9udGg6IHN0cmluZywKICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogc3RyaW5nLCBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBzdHJpbmcsCiAgICBnZXRQcm90b3R5cGVPZjogc3RyaW5nLCBnZXRTZWNvbmRzOiBzdHJpbmcsIGdldFRpbWU6IHN0cmluZywKICAgIGdldFRpbWV6b25lT2Zmc2V0OiBzdHJpbmcsIGdldFVUQ0RhdGU6IHN0cmluZywgZ2V0VVRDRGF5OiBzdHJpbmcsCiAgICBnZXRVVENGdWxsWWVhcjogc3RyaW5nLCBnZXRVVENIb3Vyczogc3RyaW5nLCBnZXRVVENNaWxsaXNlY29uZHM6IHN0cmluZywKICAgIGdldFVUQ01pbnV0ZXM6IHN0cmluZywgZ2V0VVRDTW9udGg6IHN0cmluZywgZ2V0VVRDU2Vjb25kczogc3RyaW5nLAogICAgZ2V0WWVhcjogc3RyaW5nLCBnbG9iYWwsIGdsb2JhbHMsIGgxOiBvYmplY3QsIGgyOiBvYmplY3QsIGgzOiBvYmplY3QsCiAgICBoNDogb2JqZWN0LCBoNTogb2JqZWN0LCBoNjogb2JqZWN0LCBoYW5kaGVsZDogYm9vbGVhbiwgaGFzT3duUHJvcGVydHk6ICosCiAgICBoZWFkOiBvYmplY3QsIGhlYWRlcjogb2JqZWN0LCBoZWlnaHQ6IGFycmF5LCBoZ3JvdXA6IG9iamVjdCwgaHI6IG9iamVjdCwKICAgICdodGE6YXBwbGljYXRpb24nOiBvYmplY3QsIGh0bWw6ICosIGh0bWxfY29uZnVzaW9uX2E6IHN0cmluZywKICAgIGh0bWxfaGFuZGxlcnM6IHN0cmluZywgaTogb2JqZWN0LCBpZDogc3RyaW5nLCBpZGVudGlmaWVyOiBib29sZWFuLAogICAgaWRlbnRpZmllcl9mdW5jdGlvbjogc3RyaW5nLCBpZnJhbWU6IG9iamVjdCwgaW1nOiBvYmplY3QsIGltbWVkOiBib29sZWFuLAogICAgaW1wbGllZF9ldmlsOiBzdHJpbmcsIGluLCBpbmRlbnQ6IG51bWJlciwgaW5kZXhPZjogKiwgaW5maXhfaW46IHN0cmluZywKICAgIGluaXQ6IGZ1bmN0aW9uLCBpbnB1dDogb2JqZWN0LCBpbnM6IG9iamVjdCwgaW5zZWN1cmVfYTogc3RyaW5nLAogICAgaXNBbHBoYTogZnVuY3Rpb24sIGlzQXJyYXk6IGZ1bmN0aW9uIGJvb2xlYW4sIGlzRGlnaXQ6IGZ1bmN0aW9uLAogICAgaXNFeHRlbnNpYmxlOiBzdHJpbmcsIGlzRnJvemVuOiBzdHJpbmcsIGlzTmFOOiBzdHJpbmcsCiAgICBpc1Byb3RvdHlwZU9mOiBzdHJpbmcsIGlzU2VhbGVkOiBzdHJpbmcsIGpvaW46ICosIGpzbGludDogZnVuY3Rpb24gYm9vbGVhbiwKICAgIEpTTElOVDogZnVuY3Rpb24gYm9vbGVhbiwKICAgIGpzb246IGJvb2xlYW4sIGtiZDogb2JqZWN0LCBrZXlnZW46IG9iamVjdCwga2V5czogKiwgbGFiZWw6IG9iamVjdCwKICAgIGxhYmVsX2FfYjogc3RyaW5nLCBsYWJlbGVkOiBib29sZWFuLCBsYW5nOiBzdHJpbmcsIGxhc3RJbmRleDogc3RyaW5nLAogICAgbGFzdEluZGV4T2Y6ICosIGxicDogbnVtYmVyLCBsZWFkaW5nX2RlY2ltYWxfYTogc3RyaW5nLCBsZWQ6IGZ1bmN0aW9uLAogICAgbGVmdDogYXJyYXksIGxlZ2VuZDogb2JqZWN0LCBsZW5ndGg6ICosICdsZXR0ZXItc3BhY2luZyc6IGFycmF5LAogICAgbGk6IG9iamVjdCwgbGliOiBib29sZWFuLCBsaW5lOiBudW1iZXIsICdsaW5lLWhlaWdodCc6IGFycmF5LCBsaW5rOiBvYmplY3QsCiAgICAnbGlzdC1zdHlsZSc6IGFycmF5LCAnbGlzdC1zdHlsZS1pbWFnZSc6IGFycmF5LAogICAgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nOiBhcnJheSwgJ2xpc3Qtc3R5bGUtdHlwZSc6IGFycmF5LCBtYXA6ICosCiAgICBtYXJnaW46IGFycmF5LCAnbWFyZ2luLWJvdHRvbScsICdtYXJnaW4tbGVmdCcsICdtYXJnaW4tcmlnaHQnLAogICAgJ21hcmdpbi10b3AnLCBtYXJrOiBvYmplY3QsICdtYXJrZXItb2Zmc2V0JzogYXJyYXksIG1hdGNoOiBmdW5jdGlvbiwKICAgICdtYXgtaGVpZ2h0JzogYXJyYXksICdtYXgtd2lkdGgnOiBhcnJheSwgbWF4ZXJyOiBudW1iZXIsCiAgICBtYXhsZW46IG51bWJlciwgbWVtYmVyOiBvYmplY3QsIG1lbnU6IG9iamVjdCwgbWVzc2FnZSwgbWV0YTogb2JqZWN0LAogICAgbWV0ZXI6IG9iamVjdCwgJ21pbi1oZWlnaHQnOiBmdW5jdGlvbiwgJ21pbi13aWR0aCc6IGZ1bmN0aW9uLAogICAgbWlzc2luZ19hOiBzdHJpbmcsIG1pc3NpbmdfYV9hZnRlcl9iOiBzdHJpbmcsIG1pc3Npbmdfb3B0aW9uOiBzdHJpbmcsCiAgICBtaXNzaW5nX3Byb3BlcnR5OiBzdHJpbmcsIG1pc3Npbmdfc3BhY2VfYV9iOiBzdHJpbmcsIG1pc3NpbmdfdXJsOiBzdHJpbmcsCiAgICBtaXNzaW5nX3VzZV9zdHJpY3Q6IHN0cmluZywgbWl4ZWQ6IHN0cmluZywgbW06IGJvb2xlYW4sIG1vZGU6IHN0cmluZywKICAgIG1vZHVsZTogc3RyaW5nLAogICAgbW92ZV9pbnZvY2F0aW9uOiBzdHJpbmcsIG1vdmVfdmFyOiBzdHJpbmcsIG46IHN0cmluZywgbmFtZTogc3RyaW5nLAogICAgbmFtZV9mdW5jdGlvbjogc3RyaW5nLCBuYXY6IG9iamVjdCwgbmVzdGVkX2NvbW1lbnQ6IHN0cmluZywKICAgIG5ld2NhcDogYm9vbGVhbiwgbm9kZTogYm9vbGVhbiwgbm9mcmFtZXM6IG9iamVjdCwgbm9tZW4sIG5vc2NyaXB0OiBvYmplY3QsCiAgICBub3Q6IHN0cmluZywgbm90X2FfY29uc3RydWN0b3I6IHN0cmluZywgbm90X2FfZGVmaW5lZDogc3RyaW5nLAogICAgbm90X2FfZnVuY3Rpb246IHN0cmluZywgbm90X2FfbGFiZWw6IHN0cmluZywgbm90X2Ffc2NvcGU6IHN0cmluZywKICAgIG5vdF9ncmVhdGVyOiBzdHJpbmcsIG5vdzogc3RyaW5nLCBudWQ6IGZ1bmN0aW9uLCBudW1iZXI6IG51bWJlciwKICAgIG9iamVjdDogb2JqZWN0LCBvbDogb2JqZWN0LCBvbiwgb3BhY2l0eSwgb3BlbjogYm9vbGVhbiwgb3B0Z3JvdXA6IG9iamVjdCwKICAgIG9wdGlvbjogb2JqZWN0LCBvdXRlcjogcmVnZXhwLCBvdXRsaW5lOiBhcnJheSwgJ291dGxpbmUtY29sb3InOiBhcnJheSwKICAgICdvdXRsaW5lLXN0eWxlJzogYXJyYXksICdvdXRsaW5lLXdpZHRoJywgb3V0cHV0OiBvYmplY3QsIG92ZXJmbG93OiBhcnJheSwKICAgICdvdmVyZmxvdy14JzogYXJyYXksICdvdmVyZmxvdy15JzogYXJyYXksIHA6IG9iamVjdCwgcGFkZGluZzogYXJyYXksCiAgICAncGFkZGluZy1ib3R0b20nOiBmdW5jdGlvbiwgJ3BhZGRpbmctbGVmdCc6IGZ1bmN0aW9uLAogICAgJ3BhZGRpbmctcmlnaHQnOiBmdW5jdGlvbiwgJ3BhZGRpbmctdG9wJzogZnVuY3Rpb24sCiAgICAncGFnZS1icmVhay1hZnRlcic6IGFycmF5LCAncGFnZS1icmVhay1iZWZvcmUnOiBhcnJheSwgcGFyYW06IG9iamVjdCwKICAgIHBhcmFtZXRlcl9hX2dldF9iOiBzdHJpbmcsIHBhcmFtZXRlcl9zZXRfYTogc3RyaW5nLCBwYXJhbXM6IGFycmF5LAogICAgcGFyZW46IGJvb2xlYW4sIHBhcmVudDogc3RyaW5nLCBwYXJzZTogc3RyaW5nLCBwYXNzZmFpbCwgcGM6IGJvb2xlYW4sCiAgICBwbHVzcGx1cywgcG9wOiAqLCBwb3NpdGlvbjogYXJyYXksIHBvc3RzY3JpcHQ6IGJvb2xlYW4sIHByZTogb2JqZWN0LAogICAgcHJlZGVmLCBwcmV2ZW50RXh0ZW5zaW9uczogc3RyaW5nLCBwcmludDogYm9vbGVhbiwgcHJvZ3Jlc3M6IG9iamVjdCwKICAgIHByb2plY3Rpb246IGJvb2xlYW4sIHByb3BlcnRpZXM6IGJvb2xlYW4sIHByb3BlcnR5SXNFbnVtZXJhYmxlOiBzdHJpbmcsCiAgICBwcm90b3R5cGU6IHN0cmluZywgcHQ6IGJvb2xlYW4sIHB1c2g6ICosIHB4OiBib29sZWFuLCBxOiBvYmplY3QsIHF1b3RlLAogICAgcXVvdGVzOiBhcnJheSwgcjogc3RyaW5nLCByYWRpeDogc3RyaW5nLCByYW5nZTogZnVuY3Rpb24sIHJhdywKICAgIHJlYWRfb25seTogc3RyaW5nLCByZWFzb24sIHJlZGVmaW5pdGlvbl9hOiBzdHJpbmcsIHJlZHVjZTogc3RyaW5nLAogICAgcmVkdWNlUmlnaHQ6IHN0cmluZywgcmVnZXhwLCByZXBsYWNlOiBmdW5jdGlvbiwgcmVwb3J0OiBmdW5jdGlvbiwKICAgIHJlcXVpcmU6IHN0cmluZywKICAgIHJlc2VydmVkOiBib29sZWFuLCByZXNlcnZlZF9hOiBzdHJpbmcsIHJldmVyc2U6IHN0cmluZywgcmhpbm86IGJvb2xlYW4sCiAgICByaWdodDogYXJyYXksIHJwOiBvYmplY3QsIHJ0OiBvYmplY3QsIHJ1Ynk6IG9iamVjdCwgc2FmZTogYm9vbGVhbiwKICAgIHNhbXA6IG9iamVjdCwgc2Nhbm5lZF9hX2I6IHN0cmluZywgc2NyZWVuOiBib29sZWFuLCBzY3JpcHQ6IG9iamVjdCwKICAgIHNlYWw6IHN0cmluZywgc2VhcmNoOiBmdW5jdGlvbiwgc2Vjb25kOiAqLCBzZWN0aW9uOiBvYmplY3QsIHNlbGVjdDogb2JqZWN0LAogICAgc2V0RGF0ZTogc3RyaW5nLCBzZXREYXk6IHN0cmluZywgc2V0RnVsbFllYXI6IHN0cmluZywgc2V0SG91cnM6IHN0cmluZywKICAgIHNldE1pbGxpc2Vjb25kczogc3RyaW5nLCBzZXRNaW51dGVzOiBzdHJpbmcsIHNldE1vbnRoOiBzdHJpbmcsCiAgICBzZXRTZWNvbmRzOiBzdHJpbmcsIHNldFRpbWU6IHN0cmluZywgc2V0VGltZXpvbmVPZmZzZXQ6IHN0cmluZywKICAgIHNldFVUQ0RhdGU6IHN0cmluZywgc2V0VVRDRGF5OiBzdHJpbmcsIHNldFVUQ0Z1bGxZZWFyOiBzdHJpbmcsCiAgICBzZXRVVENIb3Vyczogc3RyaW5nLCBzZXRVVENNaWxsaXNlY29uZHM6IHN0cmluZywgc2V0VVRDTWludXRlczogc3RyaW5nLAogICAgc2V0VVRDTW9udGg6IHN0cmluZywgc2V0VVRDU2Vjb25kczogc3RyaW5nLCBzZXRZZWFyOiBzdHJpbmcsIHNoaWZ0OiAqLAogICAgc2xhc2hfZXF1YWw6IHN0cmluZywgc2xpY2U6IHN0cmluZywgc2xvcHB5LCBzbWFsbDogb2JqZWN0LCBzb21lOiBzdHJpbmcsCiAgICBzb3J0OiAqLCBzb3VyY2U6IG9iamVjdCwgc3Bhbjogb2JqZWN0LCBzcGVlY2g6IGJvb2xlYW4sIHNwbGljZTogc3RyaW5nLAogICAgc3BsaXQ6IGZ1bmN0aW9uLCBzcmMsIHN0YXRlbWVudF9ibG9jazogc3RyaW5nLCBzdG9wcGluZzogc3RyaW5nLAogICAgc3RyYW5nZV9sb29wOiBzdHJpbmcsIHN0cmljdDogc3RyaW5nLCBzdHJpbmc6IHN0cmluZywgc3RyaW5naWZ5OiBzdHJpbmcsCiAgICBzdHJvbmc6IG9iamVjdCwgc3R5bGU6ICosIHN0eWxlcHJvcGVydHk6IHJlZ2V4cCwgc3ViOiBvYmplY3QsCiAgICBzdWJzY3JpcHQ6IHN0cmluZywgc3Vic3RyOiAqLCBzdWJzdHJpbmc6IHN0cmluZywgc3VwOiBvYmplY3QsCiAgICBzdXBwbGFudDogZnVuY3Rpb24sIHQ6IHN0cmluZywgdGFibGU6IG9iamVjdCwgJ3RhYmxlLWxheW91dCc6IGFycmF5LAogICAgdGFnX2FfaW5fYjogc3RyaW5nLCB0Ym9keTogb2JqZWN0LCB0ZDogb2JqZWN0LCB0ZXN0OiAqLAogICAgJ3RleHQtYWxpZ24nOiBhcnJheSwgJ3RleHQtZGVjb3JhdGlvbic6IGFycmF5LCAndGV4dC1pbmRlbnQnOiBmdW5jdGlvbiwKICAgICd0ZXh0LXNoYWRvdyc6IGFycmF5LCAndGV4dC10cmFuc2Zvcm0nOiBhcnJheSwgdGV4dGFyZWE6IG9iamVjdCwKICAgIHRmb290OiBvYmplY3QsIHRoOiBvYmplY3QsIHRoZWFkOiBvYmplY3QsIHRoaXJkOiBhcnJheSwgdGhydTogbnVtYmVyLAogICAgdGltZTogb2JqZWN0LCB0aXRsZTogb2JqZWN0LCB0b0RhdGVTdHJpbmc6IHN0cmluZywgdG9FeHBvbmVudGlhbDogc3RyaW5nLAogICAgdG9GaXhlZDogc3RyaW5nLCB0b0lTT1N0cmluZzogc3RyaW5nLCB0b0pTT046IHN0cmluZywKICAgIHRvTG9jYWxlRGF0ZVN0cmluZzogc3RyaW5nLCB0b0xvY2FsZUxvd2VyQ2FzZTogc3RyaW5nLAogICAgdG9Mb2NhbGVTdHJpbmc6IHN0cmluZywgdG9Mb2NhbGVUaW1lU3RyaW5nOiBzdHJpbmcsCiAgICB0b0xvY2FsZVVwcGVyQ2FzZTogc3RyaW5nLCB0b0xvd2VyQ2FzZTogKiwgdG9QcmVjaXNpb246IHN0cmluZywKICAgIHRvU3RyaW5nOiBmdW5jdGlvbiwgdG9UaW1lU3RyaW5nOiBzdHJpbmcsIHRvVVRDU3RyaW5nOiBzdHJpbmcsCiAgICB0b1VwcGVyQ2FzZTogKiwgdG9rZW46IGZ1bmN0aW9uLCB0b29fbG9uZzogc3RyaW5nLCB0b29fbWFueTogc3RyaW5nLAogICAgdG9wOiBhcnJheSwgdHI6IG9iamVjdCwgdHJhaWxpbmdfZGVjaW1hbF9hOiBzdHJpbmcsIHRyZWU6IHN0cmluZywKICAgIHRyaW06IHN0cmluZywgdHQ6IG9iamVjdCwgdHR5OiBib29sZWFuLCB0djogYm9vbGVhbiwgdHlwZTogc3RyaW5nLAogICAgdHlwZV9jb25mdXNpb25fYV9iOiBzdHJpbmcsIHU6IG9iamVjdCwgdWw6IG9iamVjdCwgdW5jbG9zZWQ6IHN0cmluZywKICAgIHVuY2xvc2VkX2NvbW1lbnQ6IHN0cmluZywgdW5jbG9zZWRfcmVnZXhwOiBzdHJpbmcsIHVuZGVmOiBib29sZWFuLAogICAgdW5kZWZpbmVkLCB1bmVzY2FwZWRfYTogc3RyaW5nLCB1bmV4cGVjdGVkX2E6IHN0cmluZywKICAgIHVuZXhwZWN0ZWRfY2hhcl9hX2I6IHN0cmluZywgdW5leHBlY3RlZF9jb21tZW50OiBzdHJpbmcsCiAgICB1bmV4cGVjdGVkX3Byb3BlcnR5X2E6IHN0cmluZywgdW5leHBlY3RlZF9zcGFjZV9hX2I6IHN0cmluZywKICAgICd1bmljb2RlLWJpZGknOiBhcnJheSwgdW5uZWNlc3NhcnlfaW5pdGlhbGl6ZTogc3RyaW5nLAogICAgdW5uZWNlc3NhcnlfdXNlOiBzdHJpbmcsIHVucGFyYW0sIHVucmVhY2hhYmxlX2FfYjogc3RyaW5nLAogICAgdW5yZWNvZ25pemVkX3N0eWxlX2F0dHJpYnV0ZV9hOiBzdHJpbmcsIHVucmVjb2duaXplZF90YWdfYTogc3RyaW5nLAogICAgdW5zYWZlOiBzdHJpbmcsIHVuc2hpZnQ6IHN0cmluZywgdW51c2VkOiBhcnJheSwgdXJsOiBzdHJpbmcsIHVybHM6IGFycmF5LAogICAgdXNlX2FycmF5OiBzdHJpbmcsIHVzZV9icmFjZXM6IHN0cmluZywgdXNlX2NoYXJBdDogc3RyaW5nLAogICAgdXNlX29iamVjdDogc3RyaW5nLCB1c2Vfb3I6IHN0cmluZywgdXNlX3BhcmFtOiBzdHJpbmcsCiAgICB1c2VkX2JlZm9yZV9hOiBzdHJpbmcsIHZhbHVlT2Y6IHN0cmluZywgdmFyOiBvYmplY3QsIHZhcl9hX25vdDogc3RyaW5nLAogICAgdmFycywgJ3ZlcnRpY2FsLWFsaWduJzogYXJyYXksIHZpZGVvOiBvYmplY3QsIHZpc2liaWxpdHk6IGFycmF5LAogICAgd2FybjogYm9vbGVhbiwgd2FzOiBvYmplY3QsIHdlaXJkX2Fzc2lnbm1lbnQ6IHN0cmluZywKICAgIHdlaXJkX2NvbmRpdGlvbjogc3RyaW5nLCB3ZWlyZF9uZXc6IHN0cmluZywgd2VpcmRfcHJvZ3JhbTogc3RyaW5nLAogICAgd2VpcmRfcmVsYXRpb246IHN0cmluZywgd2VpcmRfdGVybmFyeTogc3RyaW5nLCB3aGl0ZTogYm9vbGVhbiwKICAgICd3aGl0ZS1zcGFjZSc6IGFycmF5LCB3aWRnZXQ6IGJvb2xlYW4sIHdpZHRoOiBhcnJheSwgd2luZG93czogYm9vbGVhbiwKICAgICd3b3JkLXNwYWNpbmcnOiBhcnJheSwgJ3dvcmQtd3JhcCc6IGFycmF5LCB3cmFwOiBib29sZWFuLAogICAgd3JhcF9pbW1lZGlhdGU6IHN0cmluZywgd3JhcF9yZWdleHA6IHN0cmluZywgd3JpdGVfaXNfd3Jvbmc6IHN0cmluZywKICAgIHdyaXRlYWJsZTogYm9vbGVhbiwgJ3otaW5kZXgnOiBhcnJheQoqLwoKLy8gVGhlIGdsb2JhbCBkaXJlY3RpdmUgaXMgdXNlZCB0byBkZWNsYXJlIGdsb2JhbCB2YXJpYWJsZXMgdGhhdCBjYW4KLy8gYmUgYWNjZXNzZWQgYnkgdGhlIHByb2dyYW0uIElmIGEgZGVjbGFyYXRpb24gaXMgdHJ1ZSwgdGhlbiB0aGUgdmFyaWFibGUKLy8gaXMgd3JpdGVhYmxlLiBPdGhlcndpc2UsIGl0IGlzIHJlYWQtb25seS4KCi8vIFdlIGJ1aWxkIHRoZSBhcHBsaWNhdGlvbiBpbnNpZGUgYSBmdW5jdGlvbiBzbyB0aGF0IHdlIHByb2R1Y2Ugb25seSBhIHNpbmdsZQovLyBnbG9iYWwgdmFyaWFibGUuIFRoYXQgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIGltbWVkaWF0ZWx5LCBhbmQgaXRzIHJldHVybgovLyB2YWx1ZSBpcyB0aGUgSlNMSU5UIGZ1bmN0aW9uIGl0c2VsZi4gVGhhdCBmdW5jdGlvbiBpcyBhbHNvIGFuIG9iamVjdCB0aGF0Ci8vIGNhbiBjb250YWluIGRhdGEgYW5kIG90aGVyIGZ1bmN0aW9ucy4KCnZhciBKU0xJTlQgPSAoZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIGZ1bmN0aW9uIGFycmF5X3RvX29iamVjdChhcnJheSwgdmFsdWUpIHsKICAgICAgICB2YXIgaSwgb2JqZWN0ID0ge307CiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgIG9iamVjdFthcnJheVtpXV0gPSB2YWx1ZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIG9iamVjdDsKICAgIH0KCgogICAgdmFyIGFkc2FmZV9pZCwgICAgICAvLyBUaGUgd2lkZ2V0J3MgQURzYWZlIGlkLgogICAgICAgIGFkc2FmZV9tYXksICAgICAvLyBUaGUgd2lkZ2V0IG1heSBsb2FkIGFwcHJvdmVkIHNjcmlwdHMuCiAgICAgICAgYWRzYWZlX3RvcCwgICAgIC8vIEF0IHRoZSB0b3Agb2YgdGhlIHdpZGdldCBzY3JpcHQuCiAgICAgICAgYWRzYWZlX3dlbnQsICAgIC8vIEFEU0FGRS5nbyBoYXMgYmVlbiBjYWxsZWQuCiAgICAgICAgYW5vbm5hbWUsICAgICAgIC8vIFRoZSBndWVzc2VkIG5hbWUgZm9yIGFub255bW91cyBmdW5jdGlvbnMuCiAgICAgICAgYXBwcm92ZWQsICAgICAgIC8vIEFEc2FmZSBhcHByb3ZlZCB1cmxzLgoKLy8gVGhlc2UgYXJlIG9wZXJhdG9ycyB0aGF0IHNob3VsZCBub3QgYmUgdXNlZCB3aXRoIHRoZSAhIG9wZXJhdG9yLgoKICAgICAgICBiYW5nID0gewogICAgICAgICAgICAnPCcgIDogdHJ1ZSwKICAgICAgICAgICAgJzw9JyA6IHRydWUsCiAgICAgICAgICAgICc9PScgOiB0cnVlLAogICAgICAgICAgICAnPT09JzogdHJ1ZSwKICAgICAgICAgICAgJyE9PSc6IHRydWUsCiAgICAgICAgICAgICchPScgOiB0cnVlLAogICAgICAgICAgICAnPicgIDogdHJ1ZSwKICAgICAgICAgICAgJz49JyA6IHRydWUsCiAgICAgICAgICAgICcrJyAgOiB0cnVlLAogICAgICAgICAgICAnLScgIDogdHJ1ZSwKICAgICAgICAgICAgJyonICA6IHRydWUsCiAgICAgICAgICAgICcvJyAgOiB0cnVlLAogICAgICAgICAgICAnJScgIDogdHJ1ZQogICAgICAgIH0sCgovLyBUaGVzZSBhcmUgcHJvcGVydHkgbmFtZXMgdGhhdCBzaG91bGQgbm90IGJlIHBlcm1pdHRlZCBpbiB0aGUgc2FmZSBzdWJzZXQuCgogICAgICAgIGJhbm5lZCA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICdhcmd1bWVudHMnLCAnY2FsbGVlJywgJ2NhbGxlcicsICdjb25zdHJ1Y3RvcicsICdldmFsJywgJ3Byb3RvdHlwZScsCiAgICAgICAgICAgICdzdGFjaycsICd1bndhdGNoJywgJ3ZhbHVlT2YnLCAnd2F0Y2gnCiAgICAgICAgXSwgdHJ1ZSksCiAgICAgICAgYmVnaW4sICAgICAgICAgIC8vIFRoZSByb290IHRva2VuCgovLyBicm93c2VyIGNvbnRhaW5zIGEgc2V0IG9mIGdsb2JhbCBuYW1lcyB0aGF0IGFyZSBjb21tb25seSBwcm92aWRlZCBieSBhCi8vIHdlYiBicm93c2VyIGVudmlyb25tZW50LgoKICAgICAgICBicm93c2VyID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgJ2NsZWFySW50ZXJ2YWwnLCAnY2xlYXJUaW1lb3V0JywgJ2RvY3VtZW50JywgJ2V2ZW50JywgJ2ZyYW1lcycsCiAgICAgICAgICAgICdoaXN0b3J5JywgJ0ltYWdlJywgJ2xvY2FsU3RvcmFnZScsICdsb2NhdGlvbicsICduYW1lJywgJ25hdmlnYXRvcicsCiAgICAgICAgICAgICdPcHRpb24nLCAncGFyZW50JywgJ3NjcmVlbicsICdzZXNzaW9uU3RvcmFnZScsICdzZXRJbnRlcnZhbCcsCiAgICAgICAgICAgICdzZXRUaW1lb3V0JywgJ1N0b3JhZ2UnLCAnd2luZG93JywgJ1hNTEh0dHBSZXF1ZXN0JwogICAgICAgIF0sIGZhbHNlKSwKCi8vIGJ1bmRsZSBjb250YWlucyB0aGUgdGV4dCBtZXNzYWdlcy4KCiAgICAgICAgYnVuZGxlID0gewogICAgICAgICAgICBhX2xhYmVsOiAiJ3thfScgaXMgYSBzdGF0ZW1lbnQgbGFiZWwuIiwKICAgICAgICAgICAgYV9ub3RfYWxsb3dlZDogIid7YX0nIGlzIG5vdCBhbGxvd2VkLiIsCiAgICAgICAgICAgIGFfbm90X2RlZmluZWQ6ICIne2F9JyBpcyBub3QgZGVmaW5lZC4iLAogICAgICAgICAgICBhX3Njb3BlOiAiJ3thfScgdXNlZCBvdXQgb2Ygc2NvcGUuIiwKICAgICAgICAgICAgYWRzYWZlX2E6ICJBRHNhZmUgdmlvbGF0aW9uOiAne2F9Jy4iLAogICAgICAgICAgICBhZHNhZmVfYXV0b2NvbXBsZXRlOiAiQURzYWZlIGF1dG9jb21wbGV0ZSB2aW9sYXRpb24uIiwKICAgICAgICAgICAgYWRzYWZlX2JhZF9pZDogIkFEU0FGRSB2aW9sYXRpb246IGJhZCBpZC4iLAogICAgICAgICAgICBhZHNhZmVfZGl2OiAiQURzYWZlIHZpb2xhdGlvbjogV3JhcCB0aGUgd2lkZ2V0IGluIGEgZGl2LiIsCiAgICAgICAgICAgIGFkc2FmZV9mcmFnbWVudDogIkFEU0FGRTogVXNlIHRoZSBmcmFnbWVudCBvcHRpb24uIiwKICAgICAgICAgICAgYWRzYWZlX2dvOiAiQURzYWZlIHZpb2xhdGlvbjogTWlzZm9ybWVkIEFEU0FGRS5nby4iLAogICAgICAgICAgICBhZHNhZmVfaHRtbDogIkN1cnJlbnRseSwgQURzYWZlIGRvZXMgbm90IG9wZXJhdGUgb24gd2hvbGUgSFRNTCAiICsKICAgICAgICAgICAgICAgICJkb2N1bWVudHMuIEl0IG9wZXJhdGVzIG9uIDxkaXY+IGZyYWdtZW50cyBhbmQgLmpzIGZpbGVzLiIsCiAgICAgICAgICAgIGFkc2FmZV9pZDogIkFEc2FmZSB2aW9sYXRpb246IGlkIGRvZXMgbm90IG1hdGNoLiIsCiAgICAgICAgICAgIGFkc2FmZV9pZF9nbzogIkFEc2FmZSB2aW9sYXRpb246IE1pc3NpbmcgQURTQUZFLmlkIG9yIEFEU0FGRS5nby4iLAogICAgICAgICAgICBhZHNhZmVfbGliOiAiQURzYWZlIGxpYiB2aW9sYXRpb24uIiwKICAgICAgICAgICAgYWRzYWZlX2xpYl9zZWNvbmQ6ICJBRHNhZmU6IFRoZSBzZWNvbmQgYXJndW1lbnQgdG8gbGliIG11c3QgYmUgYSBmdW5jdGlvbi4iLAogICAgICAgICAgICBhZHNhZmVfbWlzc2luZ19pZDogIkFEU0FGRSB2aW9sYXRpb246IG1pc3NpbmcgSURfLiIsCiAgICAgICAgICAgIGFkc2FmZV9uYW1lX2E6ICJBRHNhZmUgbmFtZSB2aW9sYXRpb246ICd7YX0nLiIsCiAgICAgICAgICAgIGFkc2FmZV9wbGFjZW1lbnQ6ICJBRHNhZmUgc2NyaXB0IHBsYWNlbWVudCB2aW9sYXRpb24uIiwKICAgICAgICAgICAgYWRzYWZlX3ByZWZpeF9hOiAiQURzYWZlIHZpb2xhdGlvbjogQW4gaWQgbXVzdCBoYXZlIGEgJ3thfScgcHJlZml4IiwKICAgICAgICAgICAgYWRzYWZlX3NjcmlwdDogIkFEc2FmZSBzY3JpcHQgdmlvbGF0aW9uLiIsCiAgICAgICAgICAgIGFkc2FmZV9zb3VyY2U6ICJBRHNhZmUgdW5hcHByb3ZlZCBzY3JpcHQgc291cmNlLiIsCiAgICAgICAgICAgIGFkc2FmZV9zdWJzY3JpcHRfYTogIkFEc2FmZSBzdWJzY3JpcHQgJ3thfScuIiwKICAgICAgICAgICAgYWRzYWZlX3RhZzogIkFEc2FmZSB2aW9sYXRpb246IERpc2FsbG93ZWQgdGFnICd7YX0nLiIsCiAgICAgICAgICAgIGFscmVhZHlfZGVmaW5lZDogIid7YX0nIGlzIGFscmVhZHkgZGVmaW5lZC4iLAogICAgICAgICAgICBhbmQ6ICJUaGUgJyYmJyBzdWJleHByZXNzaW9uIHNob3VsZCBiZSB3cmFwcGVkIGluIHBhcmVucy4iLAogICAgICAgICAgICBhc3NpZ25fZXhjZXB0aW9uOiAiRG8gbm90IGFzc2lnbiB0byB0aGUgZXhjZXB0aW9uIHBhcmFtZXRlci4iLAogICAgICAgICAgICBhc3NpZ25tZW50X2Z1bmN0aW9uX2V4cHJlc3Npb246ICJFeHBlY3RlZCBhbiBhc3NpZ25tZW50IG9yICIgKwogICAgICAgICAgICAgICAgImZ1bmN0aW9uIGNhbGwgYW5kIGluc3RlYWQgc2F3IGFuIGV4cHJlc3Npb24uIiwKICAgICAgICAgICAgYXR0cmlidXRlX2Nhc2VfYTogIkF0dHJpYnV0ZSAne2F9JyBub3QgYWxsIGxvd2VyIGNhc2UuIiwKICAgICAgICAgICAgYXZvaWRfYTogIkF2b2lkICd7YX0nLiIsCiAgICAgICAgICAgIGJhZF9hc3NpZ25tZW50OiAiQmFkIGFzc2lnbm1lbnQuIiwKICAgICAgICAgICAgYmFkX2NvbG9yX2E6ICJCYWQgaGV4IGNvbG9yICd7YX0nLiIsCiAgICAgICAgICAgIGJhZF9jb25zdHJ1Y3RvcjogIkJhZCBjb25zdHJ1Y3Rvci4iLAogICAgICAgICAgICBiYWRfZW50aXR5OiAiQmFkIGVudGl0eS4iLAogICAgICAgICAgICBiYWRfaHRtbDogIkJhZCBIVE1MIHN0cmluZyIsCiAgICAgICAgICAgIGJhZF9pZF9hOiAiQmFkIGlkOiAne2F9Jy4iLAogICAgICAgICAgICBiYWRfaW5fYTogIkJhZCBmb3IgaW4gdmFyaWFibGUgJ3thfScuIiwKICAgICAgICAgICAgYmFkX2ludm9jYXRpb246ICJCYWQgaW52b2NhdGlvbi4iLAogICAgICAgICAgICBiYWRfbmFtZV9hOiAiQmFkIG5hbWU6ICd7YX0nLiIsCiAgICAgICAgICAgIGJhZF9uZXc6ICJEbyBub3QgdXNlICduZXcnIGZvciBzaWRlIGVmZmVjdHMuIiwKICAgICAgICAgICAgYmFkX251bWJlcjogIkJhZCBudW1iZXIgJ3thfScuIiwKICAgICAgICAgICAgYmFkX29wZXJhbmQ6ICJCYWQgb3BlcmFuZC4iLAogICAgICAgICAgICBiYWRfc3R5bGU6ICJCYWQgc3R5bGUuIiwKICAgICAgICAgICAgYmFkX3R5cGU6ICJCYWQgdHlwZS4iLAogICAgICAgICAgICBiYWRfdXJsX2E6ICJCYWQgdXJsICd7YX0nLiIsCiAgICAgICAgICAgIGJhZF93cmFwOiAiRG8gbm90IHdyYXAgZnVuY3Rpb24gbGl0ZXJhbHMgaW4gcGFyZW5zIHVubGVzcyB0aGV5ICIgKwogICAgICAgICAgICAgICAgImFyZSB0byBiZSBpbW1lZGlhdGVseSBpbnZva2VkLiIsCiAgICAgICAgICAgIGNvbWJpbmVfdmFyOiAiQ29tYmluZSB0aGlzIHdpdGggdGhlIHByZXZpb3VzICd2YXInIHN0YXRlbWVudC4iLAogICAgICAgICAgICBjb25kaXRpb25hbF9hc3NpZ25tZW50OiAiRXhwZWN0ZWQgYSBjb25kaXRpb25hbCBleHByZXNzaW9uIGFuZCAiICsKICAgICAgICAgICAgICAgICJpbnN0ZWFkIHNhdyBhbiBhc3NpZ25tZW50LiIsCiAgICAgICAgICAgIGNvbmZ1c2luZ19hOiAiQ29uZnVzaW5nIHVzZSBvZiAne2F9Jy4iLAogICAgICAgICAgICBjb25mdXNpbmdfcmVnZXhwOiAiQ29uZnVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvbi4iLAogICAgICAgICAgICBjb25zdHJ1Y3Rvcl9uYW1lX2E6ICJBIGNvbnN0cnVjdG9yIG5hbWUgJ3thfScgc2hvdWxkIHN0YXJ0IHdpdGggIiArCiAgICAgICAgICAgICAgICAiYW4gdXBwZXJjYXNlIGxldHRlci4iLAogICAgICAgICAgICBjb250cm9sX2E6ICJVbmV4cGVjdGVkIGNvbnRyb2wgY2hhcmFjdGVyICd7YX0nLiIsCiAgICAgICAgICAgIGNzczogIkEgY3NzIGZpbGUgc2hvdWxkIGJlZ2luIHdpdGggQGNoYXJzZXQgJ1VURi04JzsiLAogICAgICAgICAgICBkYW5nbGluZ19hOiAiVW5leHBlY3RlZCBkYW5nbGluZyAnXycgaW4gJ3thfScuIiwKICAgICAgICAgICAgZGFuZ2Vyb3VzX2NvbW1lbnQ6ICJEYW5nZXJvdXMgY29tbWVudC4iLAogICAgICAgICAgICBkZWxldGVkOiAiT25seSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWxldGVkLiIsCiAgICAgICAgICAgIGR1cGxpY2F0ZV9hOiAiRHVwbGljYXRlICd7YX0nLiIsCiAgICAgICAgICAgIGVtcHR5X2Jsb2NrOiAiRW1wdHkgYmxvY2suIiwKICAgICAgICAgICAgZW1wdHlfY2FzZTogIkVtcHR5IGNhc2UuIiwKICAgICAgICAgICAgZW1wdHlfY2xhc3M6ICJFbXB0eSBjbGFzcy4iLAogICAgICAgICAgICBlczU6ICJUaGlzIGlzIGFuIEVTNSBmZWF0dXJlLiIsCiAgICAgICAgICAgIGV2aWw6ICJldmFsIGlzIGV2aWwuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfYTogIkV4cGVjdGVkICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2FfYjogIkV4cGVjdGVkICd7YX0nIGFuZCBpbnN0ZWFkIHNhdyAne2J9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9hX2JfZnJvbV9jX2Q6ICJFeHBlY3RlZCAne2F9JyB0byBtYXRjaCAne2J9JyBmcm9tIGxpbmUgIiArCiAgICAgICAgICAgICAgICAie2N9IGFuZCBpbnN0ZWFkIHNhdyAne2R9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9hdF9hOiAiRXhwZWN0ZWQgYW4gYXQtcnVsZSwgYW5kIGluc3RlYWQgc2F3IEB7YX0uIiwKICAgICAgICAgICAgZXhwZWN0ZWRfYV9hdF9iX2M6ICJFeHBlY3RlZCAne2F9JyBhdCBjb2x1bW4ge2J9LCBub3QgY29sdW1uIHtjfS4iLAogICAgICAgICAgICBleHBlY3RlZF9hdHRyaWJ1dGVfYTogIkV4cGVjdGVkIGFuIGF0dHJpYnV0ZSwgYW5kIGluc3RlYWQgc2F3IFt7YX1dLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2F0dHJpYnV0ZV92YWx1ZV9hOiAiRXhwZWN0ZWQgYW4gYXR0cmlidXRlIHZhbHVlIGFuZCAiICsKICAgICAgICAgICAgICAgICJpbnN0ZWFkIHNhdyAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9jbGFzc19hOiAiRXhwZWN0ZWQgYSBjbGFzcywgYW5kIGluc3RlYWQgc2F3IC57YX0uIiwKICAgICAgICAgICAgZXhwZWN0ZWRfZnJhY3Rpb25fYTogIkV4cGVjdGVkIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMSBhbmQgIiArCiAgICAgICAgICAgICAgICAiaW5zdGVhZCBzYXcgJ3thfSciLAogICAgICAgICAgICBleHBlY3RlZF9pZF9hOiAiRXhwZWN0ZWQgYW4gaWQsIGFuZCBpbnN0ZWFkIHNhdyAje2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2lkZW50aWZpZXJfYTogIkV4cGVjdGVkIGFuIGlkZW50aWZpZXIgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2lkZW50aWZpZXJfYV9yZXNlcnZlZDogIkV4cGVjdGVkIGFuIGlkZW50aWZpZXIgYW5kICIgKwogICAgICAgICAgICAgICAgImluc3RlYWQgc2F3ICd7YX0nIChhIHJlc2VydmVkIHdvcmQpLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX2xpbmVhcl9hOiAiRXhwZWN0ZWQgYSBsaW5lYXIgdW5pdCBhbmQgaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfbGFuZ19hOiAiRXhwZWN0ZWQgYSBsYW5nIGNvZGUsIGFuZCBpbnN0ZWFkIHNhdyA6e2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX21lZGlhX2E6ICJFeHBlY3RlZCBhIENTUyBtZWRpYSB0eXBlLCBhbmQgaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfbmFtZV9hOiAiRXhwZWN0ZWQgYSBuYW1lIGFuZCBpbnN0ZWFkIHNhdyAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9ub25zdGFuZGFyZF9zdHlsZV9hdHRyaWJ1dGU6ICJFeHBlY3RlZCBhIG5vbi1zdGFuZGFyZCAiICsKICAgICAgICAgICAgICAgICJzdHlsZSBhdHRyaWJ1dGUgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX251bWJlcl9hOiAiRXhwZWN0ZWQgYSBudW1iZXIgYW5kIGluc3RlYWQgc2F3ICd7YX0nLiIsCiAgICAgICAgICAgIGV4cGVjdGVkX29wZXJhdG9yX2E6ICJFeHBlY3RlZCBhbiBvcGVyYXRvciBhbmQgaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfcGVyY2VudF9hOiAiRXhwZWN0ZWQgYSBwZXJjZW50YWdlIGFuZCBpbnN0ZWFkIHNhdyAne2F9JyIsCiAgICAgICAgICAgIGV4cGVjdGVkX3Bvc2l0aXZlX2E6ICJFeHBlY3RlZCBhIHBvc2l0aXZlIG51bWJlciBhbmQgaW5zdGVhZCBzYXcgJ3thfSciLAogICAgICAgICAgICBleHBlY3RlZF9wc2V1ZG9fYTogIkV4cGVjdGVkIGEgcHNldWRvLCBhbmQgaW5zdGVhZCBzYXcgOnthfS4iLAogICAgICAgICAgICBleHBlY3RlZF9zZWxlY3Rvcl9hOiAiRXhwZWN0ZWQgYSBDU1Mgc2VsZWN0b3IsIGFuZCBpbnN0ZWFkIHNhdyB7YX0uIiwKICAgICAgICAgICAgZXhwZWN0ZWRfc21hbGxfYTogIkV4cGVjdGVkIGEgc21hbGwgcG9zaXRpdmUgaW50ZWdlciBhbmQgaW5zdGVhZCBzYXcgJ3thfSciLAogICAgICAgICAgICBleHBlY3RlZF9zcGFjZV9hX2I6ICJFeHBlY3RlZCBleGFjdGx5IG9uZSBzcGFjZSBiZXR3ZWVuICd7YX0nIGFuZCAne2J9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9zdHJpbmdfYTogIkV4cGVjdGVkIGEgc3RyaW5nIGFuZCBpbnN0ZWFkIHNhdyB7YX0uIiwKICAgICAgICAgICAgZXhwZWN0ZWRfc3R5bGVfYXR0cmlidXRlOiAiRXhjZXB0ZWQgYSBzdHlsZSBhdHRyaWJ1dGUsIGFuZCBpbnN0ZWFkIHNhdyAne2F9Jy4iLAogICAgICAgICAgICBleHBlY3RlZF9zdHlsZV9wYXR0ZXJuOiAiRXhwZWN0ZWQgYSBzdHlsZSBwYXR0ZXJuLCBhbmQgaW5zdGVhZCBzYXcgJ3thfScuIiwKICAgICAgICAgICAgZXhwZWN0ZWRfdGFnbmFtZV9hOiAiRXhwZWN0ZWQgYSB0YWdOYW1lLCBhbmQgaW5zdGVhZCBzYXcge2F9LiIsCiAgICAgICAgICAgIGV4cGVjdGVkX3R5cGVfYTogIkV4cGVjdGVkIGEgdHlwZSwgYW5kIGluc3RlYWQgc2F3IHthfS4iLAogICAgICAgICAgICBmb3JfaWY6ICJUaGUgYm9keSBvZiBhIGZvciBpbiBzaG91bGQgYmUgd3JhcHBlZCBpbiBhbiBpZiAiICsKICAgICAgICAgICAgICAgICJzdGF0ZW1lbnQgdG8gZmlsdGVyIHVud2FudGVkIHByb3BlcnRpZXMgZnJvbSB0aGUgcHJvdG90eXBlLiIsCiAgICAgICAgICAgIGZ1bmN0aW9uX2Jsb2NrOiAiRnVuY3Rpb24gc3RhdGVtZW50cyBzaG91bGQgbm90IGJlIHBsYWNlZCBpbiBibG9ja3MuICIgKwogICAgICAgICAgICAgICAgIlVzZSBhIGZ1bmN0aW9uIGV4cHJlc3Npb24gb3IgbW92ZSB0aGUgc3RhdGVtZW50IHRvIHRoZSB0b3Agb2YgIiArCiAgICAgICAgICAgICAgICAidGhlIG91dGVyIGZ1bmN0aW9uLiIsCiAgICAgICAgICAgIGZ1bmN0aW9uX2V2YWw6ICJUaGUgRnVuY3Rpb24gY29uc3RydWN0b3IgaXMgZXZhbC4iLAogICAgICAgICAgICBmdW5jdGlvbl9sb29wOiAiRG9uJ3QgbWFrZSBmdW5jdGlvbnMgd2l0aGluIGEgbG9vcC4iLAogICAgICAgICAgICBmdW5jdGlvbl9zdGF0ZW1lbnQ6ICJGdW5jdGlvbiBzdGF0ZW1lbnRzIGFyZSBub3QgaW52b2NhYmxlLiAiICsKICAgICAgICAgICAgICAgICJXcmFwIHRoZSB3aG9sZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGluIHBhcmVucy4iLAogICAgICAgICAgICBmdW5jdGlvbl9zdHJpY3Q6ICJVc2UgdGhlIGZ1bmN0aW9uIGZvcm0gb2YgJ3VzZSBzdHJpY3QnLiIsCiAgICAgICAgICAgIGh0bWxfY29uZnVzaW9uX2E6ICJIVE1MIGNvbmZ1c2lvbiBpbiByZWd1bGFyIGV4cHJlc3Npb24gJzx7YX0nLiIsCiAgICAgICAgICAgIGh0bWxfaGFuZGxlcnM6ICJBdm9pZCBIVE1MIGV2ZW50IGhhbmRsZXJzLiIsCiAgICAgICAgICAgIGlkZW50aWZpZXJfZnVuY3Rpb246ICJFeHBlY3RlZCBhbiBpZGVudGlmaWVyIGluIGFuIGFzc2lnbm1lbnQgIiArCiAgICAgICAgICAgICAgICAiYW5kIGluc3RlYWQgc2F3IGEgZnVuY3Rpb24gaW52b2NhdGlvbi4iLAogICAgICAgICAgICBpbXBsaWVkX2V2aWw6ICJJbXBsaWVkIGV2YWwgaXMgZXZpbC4gUGFzcyBhIGZ1bmN0aW9uIGluc3RlYWQgb2YgYSBzdHJpbmcuIiwKICAgICAgICAgICAgaW5maXhfaW46ICJVbmV4cGVjdGVkICdpbicuIENvbXBhcmUgd2l0aCB1bmRlZmluZWQsIG9yIHVzZSB0aGUgIiArCiAgICAgICAgICAgICAgICAiaGFzT3duUHJvcGVydHkgbWV0aG9kIGluc3RlYWQuIiwKICAgICAgICAgICAgaW5zZWN1cmVfYTogIkluc2VjdXJlICd7YX0nLiIsCiAgICAgICAgICAgIGlzTmFOOiAiVXNlIHRoZSBpc05hTiBmdW5jdGlvbiB0byBjb21wYXJlIHdpdGggTmFOLiIsCiAgICAgICAgICAgIGxhYmVsX2FfYjogIkxhYmVsICd7YX0nIG9uICd7Yn0nIHN0YXRlbWVudC4iLAogICAgICAgICAgICBsYW5nOiAibGFuZyBpcyBkZXByZWNhdGVkLiIsCiAgICAgICAgICAgIGxlYWRpbmdfZGVjaW1hbF9hOiAiQSBsZWFkaW5nIGRlY2ltYWwgcG9pbnQgY2FuIGJlIGNvbmZ1c2VkIHdpdGggYSBkb3Q6ICcue2F9Jy4iLAogICAgICAgICAgICBtaXNzaW5nX2E6ICJNaXNzaW5nICd7YX0nLiIsCiAgICAgICAgICAgIG1pc3NpbmdfYV9hZnRlcl9iOiAiTWlzc2luZyAne2F9JyBhZnRlciAne2J9Jy4iLAogICAgICAgICAgICBtaXNzaW5nX29wdGlvbjogIk1pc3Npbmcgb3B0aW9uIHZhbHVlLiIsCiAgICAgICAgICAgIG1pc3NpbmdfcHJvcGVydHk6ICJNaXNzaW5nIHByb3BlcnR5IG5hbWUuIiwKICAgICAgICAgICAgbWlzc2luZ19zcGFjZV9hX2I6ICJNaXNzaW5nIHNwYWNlIGJldHdlZW4gJ3thfScgYW5kICd7Yn0nLiIsCiAgICAgICAgICAgIG1pc3NpbmdfdXJsOiAiTWlzc2luZyB1cmwuIiwKICAgICAgICAgICAgbWlzc2luZ191c2Vfc3RyaWN0OiAiTWlzc2luZyAndXNlIHN0cmljdCcgc3RhdGVtZW50LiIsCiAgICAgICAgICAgIG1peGVkOiAiTWl4ZWQgc3BhY2VzIGFuZCB0YWJzLiIsCiAgICAgICAgICAgIG1vdmVfaW52b2NhdGlvbjogIk1vdmUgdGhlIGludm9jYXRpb24gaW50byB0aGUgcGFyZW5zIHRoYXQgIiArCiAgICAgICAgICAgICAgICAiY29udGFpbiB0aGUgZnVuY3Rpb24uIiwKICAgICAgICAgICAgbW92ZV92YXI6ICJNb3ZlICd2YXInIGRlY2xhcmF0aW9ucyB0byB0aGUgdG9wIG9mIHRoZSBmdW5jdGlvbi4iLAogICAgICAgICAgICBuYW1lX2Z1bmN0aW9uOiAiTWlzc2luZyBuYW1lIGluIGZ1bmN0aW9uIHN0YXRlbWVudC4iLAogICAgICAgICAgICBuZXN0ZWRfY29tbWVudDogIk5lc3RlZCBjb21tZW50LiIsCiAgICAgICAgICAgIG5vdDogIk5lc3RlZCBub3QuIiwKICAgICAgICAgICAgbm90X2FfY29uc3RydWN0b3I6ICJEbyBub3QgdXNlIHthfSBhcyBhIGNvbnN0cnVjdG9yLiIsCiAgICAgICAgICAgIG5vdF9hX2RlZmluZWQ6ICIne2F9JyBoYXMgbm90IGJlZW4gZnVsbHkgZGVmaW5lZCB5ZXQuIiwKICAgICAgICAgICAgbm90X2FfZnVuY3Rpb246ICIne2F9JyBpcyBub3QgYSBmdW5jdGlvbi4iLAogICAgICAgICAgICBub3RfYV9sYWJlbDogIid7YX0nIGlzIG5vdCBhIGxhYmVsLiIsCiAgICAgICAgICAgIG5vdF9hX3Njb3BlOiAiJ3thfScgaXMgb3V0IG9mIHNjb3BlLiIsCiAgICAgICAgICAgIG5vdF9ncmVhdGVyOiAiJ3thfScgc2hvdWxkIG5vdCBiZSBncmVhdGVyIHRoYW4gJ3tifScuIiwKICAgICAgICAgICAgcGFyYW1ldGVyX2FfZ2V0X2I6ICJVbmV4cGVjdGVkIHBhcmFtZXRlciAne2F9JyBpbiBnZXQge2J9IGZ1bmN0aW9uLiIsCiAgICAgICAgICAgIHBhcmFtZXRlcl9zZXRfYTogIkV4cGVjdGVkIHBhcmFtZXRlciAodmFsdWUpIGluIHNldCB7YX0gZnVuY3Rpb24uIiwKICAgICAgICAgICAgcmFkaXg6ICJNaXNzaW5nIHJhZGl4IHBhcmFtZXRlci4iLAogICAgICAgICAgICByZWFkX29ubHk6ICJSZWFkIG9ubHkuIiwKICAgICAgICAgICAgcmVkZWZpbml0aW9uX2E6ICJSZWRlZmluaXRpb24gb2YgJ3thfScuIiwKICAgICAgICAgICAgcmVzZXJ2ZWRfYTogIlJlc2VydmVkIG5hbWUgJ3thfScuIiwKICAgICAgICAgICAgc2Nhbm5lZF9hX2I6ICJ7YX0gKHtifSUgc2Nhbm5lZCkuIiwKICAgICAgICAgICAgc2xhc2hfZXF1YWw6ICJBIHJlZ3VsYXIgZXhwcmVzc2lvbiBsaXRlcmFsIGNhbiBiZSBjb25mdXNlZCB3aXRoICcvPScuIiwKICAgICAgICAgICAgc3RhdGVtZW50X2Jsb2NrOiAiRXhwZWN0ZWQgdG8gc2VlIGEgc3RhdGVtZW50IGFuZCBpbnN0ZWFkIHNhdyBhIGJsb2NrLiIsCiAgICAgICAgICAgIHN0b3BwaW5nOiAiU3RvcHBpbmcuICIsCiAgICAgICAgICAgIHN0cmFuZ2VfbG9vcDogIlN0cmFuZ2UgbG9vcC4iLAogICAgICAgICAgICBzdHJpY3Q6ICJTdHJpY3QgdmlvbGF0aW9uLiIsCiAgICAgICAgICAgIHN1YnNjcmlwdDogIlsne2F9J10gaXMgYmV0dGVyIHdyaXR0ZW4gaW4gZG90IG5vdGF0aW9uLiIsCiAgICAgICAgICAgIHRhZ19hX2luX2I6ICJBICc8e2F9PicgbXVzdCBiZSB3aXRoaW4gJzx7Yn0+Jy4iLAogICAgICAgICAgICB0b29fbG9uZzogIkxpbmUgdG9vIGxvbmcuIiwKICAgICAgICAgICAgdG9vX21hbnk6ICJUb28gbWFueSBlcnJvcnMuIiwKICAgICAgICAgICAgdHJhaWxpbmdfZGVjaW1hbF9hOiAiQSB0cmFpbGluZyBkZWNpbWFsIHBvaW50IGNhbiBiZSBjb25mdXNlZCAiICsKICAgICAgICAgICAgICAgICJ3aXRoIGEgZG90OiAnLnthfScuIiwKICAgICAgICAgICAgdHlwZTogInR5cGUgaXMgdW5uZWNlc3NhcnkuIiwKICAgICAgICAgICAgdHlwZV9jb25mdXNpb25fYV9iOiAiVHlwZSBjb25mdXNpb246IHthfSBhbmQge2J9LiIsCiAgICAgICAgICAgIHVuY2xvc2VkOiAiVW5jbG9zZWQgc3RyaW5nLiIsCiAgICAgICAgICAgIHVuY2xvc2VkX2NvbW1lbnQ6ICJVbmNsb3NlZCBjb21tZW50LiIsCiAgICAgICAgICAgIHVuY2xvc2VkX3JlZ2V4cDogIlVuY2xvc2VkIHJlZ3VsYXIgZXhwcmVzc2lvbi4iLAogICAgICAgICAgICB1bmVzY2FwZWRfYTogIlVuZXNjYXBlZCAne2F9Jy4iLAogICAgICAgICAgICB1bmV4cGVjdGVkX2E6ICJVbmV4cGVjdGVkICd7YX0nLiIsCiAgICAgICAgICAgIHVuZXhwZWN0ZWRfY2hhcl9hX2I6ICJVbmV4cGVjdGVkIGNoYXJhY3RlciAne2F9JyBpbiB7Yn0uIiwKICAgICAgICAgICAgdW5leHBlY3RlZF9jb21tZW50OiAiVW5leHBlY3RlZCBjb21tZW50LiIsCiAgICAgICAgICAgIHVuZXhwZWN0ZWRfcHJvcGVydHlfYTogIlVuZXhwZWN0ZWQgLypwcm9wZXJ0eSovICd7YX0nLiIsCiAgICAgICAgICAgIHVuZXhwZWN0ZWRfc3BhY2VfYV9iOiAiVW5leHBlY3RlZCBzcGFjZSBiZXR3ZWVuICd7YX0nIGFuZCAne2J9Jy4iLAogICAgICAgICAgICB1bm5lY2Vzc2FyeV9pbml0aWFsaXplOiAiSXQgaXMgbm90IG5lY2Vzc2FyeSB0byBpbml0aWFsaXplICd7YX0nICIgKwogICAgICAgICAgICAgICAgInRvICd1bmRlZmluZWQnLiIsCiAgICAgICAgICAgIHVubmVjZXNzYXJ5X3VzZTogIlVubmVjZXNzYXJ5ICd1c2Ugc3RyaWN0Jy4iLAogICAgICAgICAgICB1bnJlYWNoYWJsZV9hX2I6ICJVbnJlYWNoYWJsZSAne2F9JyBhZnRlciAne2J9Jy4iLAogICAgICAgICAgICB1bnJlY29nbml6ZWRfc3R5bGVfYXR0cmlidXRlX2E6ICJVbnJlY29nbml6ZWQgc3R5bGUgYXR0cmlidXRlICd7YX0nLiIsCiAgICAgICAgICAgIHVucmVjb2duaXplZF90YWdfYTogIlVucmVjb2duaXplZCB0YWcgJzx7YX0+Jy4iLAogICAgICAgICAgICB1bnNhZmU6ICJVbnNhZmUgY2hhcmFjdGVyLiIsCiAgICAgICAgICAgIHVybDogIkphdmFTY3JpcHQgVVJMLiIsCiAgICAgICAgICAgIHVzZV9hcnJheTogIlVzZSB0aGUgYXJyYXkgbGl0ZXJhbCBub3RhdGlvbiBbXS4iLAogICAgICAgICAgICB1c2VfYnJhY2VzOiAiU3BhY2VzIGFyZSBoYXJkIHRvIGNvdW50LiBVc2Uge3thfX0uIiwKICAgICAgICAgICAgdXNlX2NoYXJBdDogIlVzZSB0aGUgY2hhckF0IG1ldGhvZC4iLAogICAgICAgICAgICB1c2Vfb2JqZWN0OiAiVXNlIHRoZSBvYmplY3QgbGl0ZXJhbCBub3RhdGlvbiB7fS4iLAogICAgICAgICAgICB1c2Vfb3I6ICJVc2UgdGhlIHx8IG9wZXJhdG9yLiIsCiAgICAgICAgICAgIHVzZV9wYXJhbTogIlVzZSBhIG5hbWVkIHBhcmFtZXRlci4iLAogICAgICAgICAgICB1c2VkX2JlZm9yZV9hOiAiJ3thfScgd2FzIHVzZWQgYmVmb3JlIGl0IHdhcyBkZWZpbmVkLiIsCiAgICAgICAgICAgIHZhcl9hX25vdDogIlZhcmlhYmxlIHthfSB3YXMgbm90IGRlY2xhcmVkIGNvcnJlY3RseS4iLAogICAgICAgICAgICB3ZWlyZF9hc3NpZ25tZW50OiAiV2VpcmQgYXNzaWdubWVudC4iLAogICAgICAgICAgICB3ZWlyZF9jb25kaXRpb246ICJXZWlyZCBjb25kaXRpb24uIiwKICAgICAgICAgICAgd2VpcmRfbmV3OiAiV2VpcmQgY29uc3RydWN0aW9uLiBEZWxldGUgJ25ldycuIiwKICAgICAgICAgICAgd2VpcmRfcHJvZ3JhbTogIldlaXJkIHByb2dyYW0uIiwKICAgICAgICAgICAgd2VpcmRfcmVsYXRpb246ICJXZWlyZCByZWxhdGlvbi4iLAogICAgICAgICAgICB3ZWlyZF90ZXJuYXJ5OiAiV2VpcmQgdGVybmFyeS4iLAogICAgICAgICAgICB3cmFwX2ltbWVkaWF0ZTogIldyYXAgYW4gaW1tZWRpYXRlIGZ1bmN0aW9uIGludm9jYXRpb24gaW4gcGFyZW50aGVzZXMgIiArCiAgICAgICAgICAgICAgICAidG8gYXNzaXN0IHRoZSByZWFkZXIgaW4gdW5kZXJzdGFuZGluZyB0aGF0IHRoZSBleHByZXNzaW9uICIgKwogICAgICAgICAgICAgICAgImlzIHRoZSByZXN1bHQgb2YgYSBmdW5jdGlvbiwgYW5kIG5vdCB0aGUgZnVuY3Rpb24gaXRzZWxmLiIsCiAgICAgICAgICAgIHdyYXBfcmVnZXhwOiAiV3JhcCB0aGUgL3JlZ2V4cC8gbGl0ZXJhbCBpbiBwYXJlbnMgdG8gIiArCiAgICAgICAgICAgICAgICAiZGlzYW1iaWd1YXRlIHRoZSBzbGFzaCBvcGVyYXRvci4iLAogICAgICAgICAgICB3cml0ZV9pc193cm9uZzogImRvY3VtZW50LndyaXRlIGNhbiBiZSBhIGZvcm0gb2YgZXZhbC4iCiAgICAgICAgfSwKCi8vIGNvbW1vbmpzIGNvbnRhaW5zIGEgc2V0IG9mIGdsb2JhbCBuYW1lcyB0aGF0IGFyZSBjb21tb25seSBwcm92aWRlZCBieSBhCi8vIENvbW1vbkpTIGVudmlyb25tZW50LgoKICAgICAgICBjb21tb25qcyA9IHsKICAgICAgICAgICAgInJlcXVpcmUiOiBmYWxzZSwKICAgICAgICAgICAgIm1vZHVsZSI6IGZhbHNlLAogICAgICAgICAgICAiZXhwb3J0cyI6IHRydWUKICAgICAgICB9LAoKICAgICAgICBjb21tZW50c19vZmYsCiAgICAgICAgY3NzX2F0dHJpYnV0ZV9kYXRhLAogICAgICAgIGNzc19hbnksCgogICAgICAgIGNzc19jb2xvckRhdGEgPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAiYWxpY2VibHVlIiwgImFudGlxdWV3aGl0ZSIsICJhcXVhIiwgImFxdWFtYXJpbmUiLCAiYXp1cmUiLCAiYmVpZ2UiLAogICAgICAgICAgICAiYmlzcXVlIiwgImJsYWNrIiwgImJsYW5jaGVkYWxtb25kIiwgImJsdWUiLCAiYmx1ZXZpb2xldCIsICJicm93biIsCiAgICAgICAgICAgICJidXJseXdvb2QiLCAiY2FkZXRibHVlIiwgImNoYXJ0cmV1c2UiLCAiY2hvY29sYXRlIiwgImNvcmFsIiwKICAgICAgICAgICAgImNvcm5mbG93ZXJibHVlIiwgImNvcm5zaWxrIiwgImNyaW1zb24iLCAiY3lhbiIsICJkYXJrYmx1ZSIsCiAgICAgICAgICAgICJkYXJrY3lhbiIsICJkYXJrZ29sZGVucm9kIiwgImRhcmtncmF5IiwgImRhcmtncmVlbiIsICJkYXJra2hha2kiLAogICAgICAgICAgICAiZGFya21hZ2VudGEiLCAiZGFya29saXZlZ3JlZW4iLCAiZGFya29yYW5nZSIsICJkYXJrb3JjaGlkIiwKICAgICAgICAgICAgImRhcmtyZWQiLCAiZGFya3NhbG1vbiIsICJkYXJrc2VhZ3JlZW4iLCAiZGFya3NsYXRlYmx1ZSIsCiAgICAgICAgICAgICJkYXJrc2xhdGVncmF5IiwgImRhcmt0dXJxdW9pc2UiLCAiZGFya3Zpb2xldCIsICJkZWVwcGluayIsCiAgICAgICAgICAgICJkZWVwc2t5Ymx1ZSIsICJkaW1ncmF5IiwgImRvZGdlcmJsdWUiLCAiZmlyZWJyaWNrIiwgImZsb3JhbHdoaXRlIiwKICAgICAgICAgICAgImZvcmVzdGdyZWVuIiwgImZ1Y2hzaWEiLCAiZ2FpbnNib3JvIiwgImdob3N0d2hpdGUiLCAiZ29sZCIsCiAgICAgICAgICAgICJnb2xkZW5yb2QiLCAiZ3JheSIsICJncmVlbiIsICJncmVlbnllbGxvdyIsICJob25leWRldyIsICJob3RwaW5rIiwKICAgICAgICAgICAgImluZGlhbnJlZCIsICJpbmRpZ28iLCAiaXZvcnkiLCAia2hha2kiLCAibGF2ZW5kZXIiLAogICAgICAgICAgICAibGF2ZW5kZXJibHVzaCIsICJsYXduZ3JlZW4iLCAibGVtb25jaGlmZm9uIiwgImxpZ2h0Ymx1ZSIsCiAgICAgICAgICAgICJsaWdodGNvcmFsIiwgImxpZ2h0Y3lhbiIsICJsaWdodGdvbGRlbnJvZHllbGxvdyIsICJsaWdodGdyZWVuIiwKICAgICAgICAgICAgImxpZ2h0cGluayIsICJsaWdodHNhbG1vbiIsICJsaWdodHNlYWdyZWVuIiwgImxpZ2h0c2t5Ymx1ZSIsCiAgICAgICAgICAgICJsaWdodHNsYXRlZ3JheSIsICJsaWdodHN0ZWVsYmx1ZSIsICJsaWdodHllbGxvdyIsICJsaW1lIiwKICAgICAgICAgICAgImxpbWVncmVlbiIsICJsaW5lbiIsICJtYWdlbnRhIiwgIm1hcm9vbiIsICJtZWRpdW1hcXVhbWFyaW5lIiwKICAgICAgICAgICAgIm1lZGl1bWJsdWUiLCAibWVkaXVtb3JjaGlkIiwgIm1lZGl1bXB1cnBsZSIsICJtZWRpdW1zZWFncmVlbiIsCiAgICAgICAgICAgICJtZWRpdW1zbGF0ZWJsdWUiLCAibWVkaXVtc3ByaW5nZ3JlZW4iLCAibWVkaXVtdHVycXVvaXNlIiwKICAgICAgICAgICAgIm1lZGl1bXZpb2xldHJlZCIsICJtaWRuaWdodGJsdWUiLCAibWludGNyZWFtIiwgIm1pc3R5cm9zZSIsCiAgICAgICAgICAgICJtb2NjYXNpbiIsICJuYXZham93aGl0ZSIsICJuYXZ5IiwgIm9sZGxhY2UiLCAib2xpdmUiLCAib2xpdmVkcmFiIiwKICAgICAgICAgICAgIm9yYW5nZSIsICJvcmFuZ2VyZWQiLCAib3JjaGlkIiwgInBhbGVnb2xkZW5yb2QiLCAicGFsZWdyZWVuIiwKICAgICAgICAgICAgInBhbGV0dXJxdW9pc2UiLCAicGFsZXZpb2xldHJlZCIsICJwYXBheWF3aGlwIiwgInBlYWNocHVmZiIsCiAgICAgICAgICAgICJwZXJ1IiwgInBpbmsiLCAicGx1bSIsICJwb3dkZXJibHVlIiwgInB1cnBsZSIsICJyZWQiLCAicm9zeWJyb3duIiwKICAgICAgICAgICAgInJveWFsYmx1ZSIsICJzYWRkbGVicm93biIsICJzYWxtb24iLCAic2FuZHlicm93biIsICJzZWFncmVlbiIsCiAgICAgICAgICAgICJzZWFzaGVsbCIsICJzaWVubmEiLCAic2lsdmVyIiwgInNreWJsdWUiLCAic2xhdGVibHVlIiwgInNsYXRlZ3JheSIsCiAgICAgICAgICAgICJzbm93IiwgInNwcmluZ2dyZWVuIiwgInN0ZWVsYmx1ZSIsICJ0YW4iLCAidGVhbCIsICJ0aGlzdGxlIiwKICAgICAgICAgICAgInRvbWF0byIsICJ0dXJxdW9pc2UiLCAidmlvbGV0IiwgIndoZWF0IiwgIndoaXRlIiwgIndoaXRlc21va2UiLAogICAgICAgICAgICAieWVsbG93IiwgInllbGxvd2dyZWVuIiwKCiAgICAgICAgICAgICJhY3RpdmVib3JkZXIiLCAiYWN0aXZlY2FwdGlvbiIsICJhcHB3b3Jrc3BhY2UiLCAiYmFja2dyb3VuZCIsCiAgICAgICAgICAgICJidXR0b25mYWNlIiwgImJ1dHRvbmhpZ2hsaWdodCIsICJidXR0b25zaGFkb3ciLCAiYnV0dG9udGV4dCIsCiAgICAgICAgICAgICJjYXB0aW9udGV4dCIsICJncmF5dGV4dCIsICJoaWdobGlnaHQiLCAiaGlnaGxpZ2h0dGV4dCIsCiAgICAgICAgICAgICJpbmFjdGl2ZWJvcmRlciIsICJpbmFjdGl2ZWNhcHRpb24iLCAiaW5hY3RpdmVjYXB0aW9udGV4dCIsCiAgICAgICAgICAgICJpbmZvYmFja2dyb3VuZCIsICJpbmZvdGV4dCIsICJtZW51IiwgIm1lbnV0ZXh0IiwgInNjcm9sbGJhciIsCiAgICAgICAgICAgICJ0aHJlZWRkYXJrc2hhZG93IiwgInRocmVlZGZhY2UiLCAidGhyZWVkaGlnaGxpZ2h0IiwKICAgICAgICAgICAgInRocmVlZGxpZ2h0c2hhZG93IiwgInRocmVlZHNoYWRvdyIsICJ3aW5kb3ciLCAid2luZG93ZnJhbWUiLAogICAgICAgICAgICAid2luZG93dGV4dCIKICAgICAgICBdLCB0cnVlKSwKCiAgICAgICAgY3NzX2JvcmRlcl9zdHlsZSwKICAgICAgICBjc3NfYnJlYWssCgogICAgICAgIGNzc19sZW5ndGhEYXRhID0gewogICAgICAgICAgICAnJSc6IHRydWUsCiAgICAgICAgICAgICdjbSc6IHRydWUsCiAgICAgICAgICAgICdlbSc6IHRydWUsCiAgICAgICAgICAgICdleCc6IHRydWUsCiAgICAgICAgICAgICdpbic6IHRydWUsCiAgICAgICAgICAgICdtbSc6IHRydWUsCiAgICAgICAgICAgICdwYyc6IHRydWUsCiAgICAgICAgICAgICdwdCc6IHRydWUsCiAgICAgICAgICAgICdweCc6IHRydWUKICAgICAgICB9LAoKICAgICAgICBjc3NfbWVkaWEsCiAgICAgICAgY3NzX292ZXJmbG93LAoKICAgICAgICBkZXNjYXBlcyA9IHsKICAgICAgICAgICAgJ2InOiAnXGInLAogICAgICAgICAgICAndCc6ICdcdCcsCiAgICAgICAgICAgICduJzogJ1xuJywKICAgICAgICAgICAgJ2YnOiAnXGYnLAogICAgICAgICAgICAncic6ICdccicsCiAgICAgICAgICAgICciJzogJyInLAogICAgICAgICAgICAnLyc6ICcvJywKICAgICAgICAgICAgJ1xcJzogJ1xcJwogICAgICAgIH0sCgogICAgICAgIGRldmVsID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgJ2FsZXJ0JywgJ2NvbmZpcm0nLCAnY29uc29sZScsICdEZWJ1ZycsICdvcGVyYScsICdwcm9tcHQnLCAnV1NIJwogICAgICAgIF0sIGZhbHNlKSwKICAgICAgICBkaXJlY3RpdmUsCiAgICAgICAgZXNjYXBlcyA9IHsKICAgICAgICAgICAgJ1xiJzogJ1xcYicsCiAgICAgICAgICAgICdcdCc6ICdcXHQnLAogICAgICAgICAgICAnXG4nOiAnXFxuJywKICAgICAgICAgICAgJ1xmJzogJ1xcZicsCiAgICAgICAgICAgICdccic6ICdcXHInLAogICAgICAgICAgICAnXCcnOiAnXFxcJycsCiAgICAgICAgICAgICciJyA6ICdcXCInLAogICAgICAgICAgICAnLycgOiAnXFwvJywKICAgICAgICAgICAgJ1xcJzogJ1xcXFwnCiAgICAgICAgfSwKCiAgICAgICAgZnVuY3QsICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGZ1bmN0aW9uLCBpbmNsdWRpbmcgdGhlIGxhYmVscyB1c2VkIGluCiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmdW5jdGlvbiwgYXMgd2VsbCBhcyAoYnJlYWthZ2UpLCAoY29tcGxleGl0eSksCiAgICAgICAgICAgICAgICAgICAgICAgIC8vIChjb250ZXh0KSwgKGxvb3BhZ2UpLCAobmFtZSksIChwYXJhbXMpLCAodG9rZW4pLAogICAgICAgICAgICAgICAgICAgICAgICAvLyAodmFycyksICh2ZXJiKQoKICAgICAgICBmdW5jdGlvbmljaXR5ID0gWwogICAgICAgICAgICAnY2xvc3VyZScsICdleGNlcHRpb24nLCAnZ2xvYmFsJywgJ2xhYmVsJywgJ291dGVyJywgJ3VuZGVmJywKICAgICAgICAgICAgJ3VudXNlZCcsICd2YXInCiAgICAgICAgXSwKCiAgICAgICAgZnVuY3Rpb25zLCAgICAgIC8vIEFsbCBvZiB0aGUgZnVuY3Rpb25zCiAgICAgICAgZ2xvYmFsX2Z1bmN0LCAgIC8vIFRoZSBnbG9iYWwgYm9keQogICAgICAgIGdsb2JhbF9zY29wZSwgICAvLyBUaGUgZ2xvYmFsIHNjb3BlCiAgICAgICAgaHRtbF90YWcgPSB7CiAgICAgICAgICAgIGE6ICAgICAgICB7fSwKICAgICAgICAgICAgYWJicjogICAgIHt9LAogICAgICAgICAgICBhY3JvbnltOiAge30sCiAgICAgICAgICAgIGFkZHJlc3M6ICB7fSwKICAgICAgICAgICAgYXBwbGV0OiAgIHt9LAogICAgICAgICAgICBhcmVhOiAgICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgbWFwICd9LAogICAgICAgICAgICBhcnRpY2xlOiAge30sCiAgICAgICAgICAgIGFzaWRlOiAgICB7fSwKICAgICAgICAgICAgYXVkaW86ICAgIHt9LAogICAgICAgICAgICBiOiAgICAgICAge30sCiAgICAgICAgICAgIGJhc2U6ICAgICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBoZWFkICd9LAogICAgICAgICAgICBiZG86ICAgICAge30sCiAgICAgICAgICAgIGJpZzogICAgICB7fSwKICAgICAgICAgICAgYmxvY2txdW90ZToge30sCiAgICAgICAgICAgIGJvZHk6ICAgICB7cGFyZW50OiAnIGh0bWwgbm9mcmFtZXMgJ30sCiAgICAgICAgICAgIGJyOiAgICAgICB7ZW1wdHk6IHRydWV9LAogICAgICAgICAgICBidXR0b246ICAge30sCiAgICAgICAgICAgIGNhbnZhczogICB7cGFyZW50OiAnIGJvZHkgcCBkaXYgdGggdGQgJ30sCiAgICAgICAgICAgIGNhcHRpb246ICB7cGFyZW50OiAnIHRhYmxlICd9LAogICAgICAgICAgICBjZW50ZXI6ICAge30sCiAgICAgICAgICAgIGNpdGU6ICAgICB7fSwKICAgICAgICAgICAgY29kZTogICAgIHt9LAogICAgICAgICAgICBjb2w6ICAgICAge2VtcHR5OiB0cnVlLCBwYXJlbnQ6ICcgdGFibGUgY29sZ3JvdXAgJ30sCiAgICAgICAgICAgIGNvbGdyb3VwOiB7cGFyZW50OiAnIHRhYmxlICd9LAogICAgICAgICAgICBjb21tYW5kOiAge3BhcmVudDogJyBtZW51ICd9LAogICAgICAgICAgICBkYXRhbGlzdDoge30sCiAgICAgICAgICAgIGRkOiAgICAgICB7cGFyZW50OiAnIGRsICd9LAogICAgICAgICAgICBkZWw6ICAgICAge30sCiAgICAgICAgICAgIGRldGFpbHM6ICB7fSwKICAgICAgICAgICAgZGlhbG9nOiAgIHt9LAogICAgICAgICAgICBkZm46ICAgICAge30sCiAgICAgICAgICAgIGRpcjogICAgICB7fSwKICAgICAgICAgICAgZGl2OiAgICAgIHt9LAogICAgICAgICAgICBkbDogICAgICAge30sCiAgICAgICAgICAgIGR0OiAgICAgICB7cGFyZW50OiAnIGRsICd9LAogICAgICAgICAgICBlbTogICAgICAge30sCiAgICAgICAgICAgIGVtYmVkOiAgICB7fSwKICAgICAgICAgICAgZmllbGRzZXQ6IHt9LAogICAgICAgICAgICBmaWd1cmU6ICAge30sCiAgICAgICAgICAgIGZvbnQ6ICAgICB7fSwKICAgICAgICAgICAgZm9vdGVyOiAgIHt9LAogICAgICAgICAgICBmb3JtOiAgICAge30sCiAgICAgICAgICAgIGZyYW1lOiAgICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBmcmFtZXNldCAnfSwKICAgICAgICAgICAgZnJhbWVzZXQ6IHtwYXJlbnQ6ICcgaHRtbCBmcmFtZXNldCAnfSwKICAgICAgICAgICAgaDE6ICAgICAgIHt9LAogICAgICAgICAgICBoMjogICAgICAge30sCiAgICAgICAgICAgIGgzOiAgICAgICB7fSwKICAgICAgICAgICAgaDQ6ICAgICAgIHt9LAogICAgICAgICAgICBoNTogICAgICAge30sCiAgICAgICAgICAgIGg2OiAgICAgICB7fSwKICAgICAgICAgICAgaGVhZDogICAgIHtwYXJlbnQ6ICcgaHRtbCAnfSwKICAgICAgICAgICAgaGVhZGVyOiAgIHt9LAogICAgICAgICAgICBoZ3JvdXA6ICAge30sCiAgICAgICAgICAgIGhyOiAgICAgICB7ZW1wdHk6IHRydWV9LAogICAgICAgICAgICAnaHRhOmFwcGxpY2F0aW9uJzoKICAgICAgICAgICAgICAgICAgICAgIHtlbXB0eTogdHJ1ZSwgcGFyZW50OiAnIGhlYWQgJ30sCiAgICAgICAgICAgIGh0bWw6ICAgICB7cGFyZW50OiAnKid9LAogICAgICAgICAgICBpOiAgICAgICAge30sCiAgICAgICAgICAgIGlmcmFtZTogICB7fSwKICAgICAgICAgICAgaW1nOiAgICAgIHtlbXB0eTogdHJ1ZX0sCiAgICAgICAgICAgIGlucHV0OiAgICB7ZW1wdHk6IHRydWV9LAogICAgICAgICAgICBpbnM6ICAgICAge30sCiAgICAgICAgICAgIGtiZDogICAgICB7fSwKICAgICAgICAgICAga2V5Z2VuOiAgIHt9LAogICAgICAgICAgICBsYWJlbDogICAge30sCiAgICAgICAgICAgIGxlZ2VuZDogICB7cGFyZW50OiAnIGRldGFpbHMgZmllbGRzZXQgZmlndXJlICd9LAogICAgICAgICAgICBsaTogICAgICAge3BhcmVudDogJyBkaXIgbWVudSBvbCB1bCAnfSwKICAgICAgICAgICAgbGluazogICAgIHtlbXB0eTogdHJ1ZSwgcGFyZW50OiAnIGhlYWQgJ30sCiAgICAgICAgICAgIG1hcDogICAgICB7fSwKICAgICAgICAgICAgbWFyazogICAgIHt9LAogICAgICAgICAgICBtZW51OiAgICAge30sCiAgICAgICAgICAgIG1ldGE6ICAgICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBoZWFkIG5vZnJhbWVzIG5vc2NyaXB0ICd9LAogICAgICAgICAgICBtZXRlcjogICAge30sCiAgICAgICAgICAgIG5hdjogICAgICB7fSwKICAgICAgICAgICAgbm9mcmFtZXM6IHtwYXJlbnQ6ICcgaHRtbCBib2R5ICd9LAogICAgICAgICAgICBub3NjcmlwdDoge3BhcmVudDogJyBib2R5IGhlYWQgbm9mcmFtZXMgJ30sCiAgICAgICAgICAgIG9iamVjdDogICB7fSwKICAgICAgICAgICAgb2w6ICAgICAgIHt9LAogICAgICAgICAgICBvcHRncm91cDoge3BhcmVudDogJyBzZWxlY3QgJ30sCiAgICAgICAgICAgIG9wdGlvbjogICB7cGFyZW50OiAnIG9wdGdyb3VwIHNlbGVjdCAnfSwKICAgICAgICAgICAgb3V0cHV0OiAgIHt9LAogICAgICAgICAgICBwOiAgICAgICAge30sCiAgICAgICAgICAgIHBhcmFtOiAgICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBhcHBsZXQgb2JqZWN0ICd9LAogICAgICAgICAgICBwcmU6ICAgICAge30sCiAgICAgICAgICAgIHByb2dyZXNzOiB7fSwKICAgICAgICAgICAgcTogICAgICAgIHt9LAogICAgICAgICAgICBycDogICAgICAge30sCiAgICAgICAgICAgIHJ0OiAgICAgICB7fSwKICAgICAgICAgICAgcnVieTogICAgIHt9LAogICAgICAgICAgICBzYW1wOiAgICAge30sCiAgICAgICAgICAgIHNjcmlwdDogICB7ZW1wdHk6IHRydWUsIHBhcmVudDogJyBib2R5IGRpdiBmcmFtZSBoZWFkIGlmcmFtZSBwIHByZSBzcGFuICd9LAogICAgICAgICAgICBzZWN0aW9uOiAge30sCiAgICAgICAgICAgIHNlbGVjdDogICB7fSwKICAgICAgICAgICAgc21hbGw6ICAgIHt9LAogICAgICAgICAgICBzcGFuOiAgICAge30sCiAgICAgICAgICAgIHNvdXJjZTogICB7fSwKICAgICAgICAgICAgc3Ryb25nOiAgIHt9LAogICAgICAgICAgICBzdHlsZTogICAge3BhcmVudDogJyBoZWFkICcsIGVtcHR5OiB0cnVlfSwKICAgICAgICAgICAgc3ViOiAgICAgIHt9LAogICAgICAgICAgICBzdXA6ICAgICAge30sCiAgICAgICAgICAgIHRhYmxlOiAgICB7fSwKICAgICAgICAgICAgdGJvZHk6ICAgIHtwYXJlbnQ6ICcgdGFibGUgJ30sCiAgICAgICAgICAgIHRkOiAgICAgICB7cGFyZW50OiAnIHRyICd9LAogICAgICAgICAgICB0ZXh0YXJlYToge30sCiAgICAgICAgICAgIHRmb290OiAgICB7cGFyZW50OiAnIHRhYmxlICd9LAogICAgICAgICAgICB0aDogICAgICAge3BhcmVudDogJyB0ciAnfSwKICAgICAgICAgICAgdGhlYWQ6ICAgIHtwYXJlbnQ6ICcgdGFibGUgJ30sCiAgICAgICAgICAgIHRpbWU6ICAgICB7fSwKICAgICAgICAgICAgdGl0bGU6ICAgIHtwYXJlbnQ6ICcgaGVhZCAnfSwKICAgICAgICAgICAgdHI6ICAgICAgIHtwYXJlbnQ6ICcgdGFibGUgdGJvZHkgdGhlYWQgdGZvb3QgJ30sCiAgICAgICAgICAgIHR0OiAgICAgICB7fSwKICAgICAgICAgICAgdTogICAgICAgIHt9LAogICAgICAgICAgICB1bDogICAgICAge30sCiAgICAgICAgICAgICd2YXInOiAgICB7fSwKICAgICAgICAgICAgdmlkZW86ICAgIHt9CiAgICAgICAgfSwKCiAgICAgICAgaWRzLCAgICAgICAgICAgIC8vIEhUTUwgaWRzCiAgICAgICAgaW5fYmxvY2ssCiAgICAgICAgaW5kZW50LAovLyAgICAgICAgIGluZmVyX3N0YXRlbWVudCwvLyBJbmZlcmVuY2UgcnVsZXMgZm9yIHN0YXRlbWVudHMKICAgICAgICBpc190eXBlID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgJyonLCAnYXJyYXknLCAnYm9vbGVhbicsICdmdW5jdGlvbicsICdudW1iZXInLCAnb2JqZWN0JywKICAgICAgICAgICAgJ3JlZ2V4cCcsICdzdHJpbmcnCiAgICAgICAgXSwgdHJ1ZSksCiAgICAgICAgaXRzZWxmLCAgICAgICAgIC8vIEpTTGludCBpdHNlbGYKICAgICAgICBqc2xpbnRfbGltaXQgPSB7CiAgICAgICAgICAgIGluZGVudDogMTAsCiAgICAgICAgICAgIG1heGVycjogMTAwMCwKICAgICAgICAgICAgbWF4bGVuOiAyNTYKICAgICAgICB9LAogICAgICAgIGpzb25fbW9kZSwKICAgICAgICBsZXgsICAgICAgICAgICAgLy8gdGhlIHRva2VuaXplcgogICAgICAgIGxpbmVzLAogICAgICAgIGxvb2thaGVhZCwKICAgICAgICBtZW1iZXIsCiAgICAgICAgbm9kZSA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICdCdWZmZXInLCAnY2xlYXJJbnRlcnZhbCcsICdjbGVhclRpbWVvdXQnLCAnY29uc29sZScsICdleHBvcnRzJywKICAgICAgICAgICAgJ2dsb2JhbCcsICdtb2R1bGUnLCAncHJvY2VzcycsICdxdWVyeXN0cmluZycsICdyZXF1aXJlJywKICAgICAgICAgICAgJ3NldEludGVydmFsJywgJ3NldFRpbWVvdXQnLCAnX19kaXJuYW1lJywgJ19fZmlsZW5hbWUnCiAgICAgICAgXSwgZmFsc2UpLAogICAgICAgIG5vZGVfanMsCiAgICAgICAgbnVtYmVyeSA9IGFycmF5X3RvX29iamVjdChbJ2luZGV4T2YnLCAnbGFzdEluZGV4T2YnLCAnc2VhcmNoJ10sIHRydWUpLAogICAgICAgIG5leHRfdG9rZW4sCiAgICAgICAgb3B0aW9uLAogICAgICAgIHByZWRlZmluZWQsICAgICAvLyBHbG9iYWwgdmFyaWFibGVzIGRlZmluZWQgYnkgb3B0aW9uCiAgICAgICAgcHJlcmVnLAogICAgICAgIHByZXZfdG9rZW4sCiAgICAgICAgcHJvcGVydHlfdHlwZSwKICAgICAgICByZWdleHBfZmxhZyA9IGFycmF5X3RvX29iamVjdChbJ2cnLCAnaScsICdtJ10sIHRydWUpLAogICAgICAgIHJldHVybl90aGlzID0gZnVuY3Rpb24gcmV0dXJuX3RoaXMoKSB7CiAgICAgICAgICAgIHJldHVybiB0aGlzOwogICAgICAgIH0sCiAgICAgICAgcmhpbm8gPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAnZGVmaW5lQ2xhc3MnLCAnZGVzZXJpYWxpemUnLCAnZ2MnLCAnaGVscCcsICdsb2FkJywgJ2xvYWRDbGFzcycsCiAgICAgICAgICAgICdwcmludCcsICdxdWl0JywgJ3JlYWRGaWxlJywgJ3JlYWRVcmwnLCAncnVuQ29tbWFuZCcsICdzZWFsJywKICAgICAgICAgICAgJ3NlcmlhbGl6ZScsICdzcGF3bicsICdzeW5jJywgJ3RvaW50MzInLCAndmVyc2lvbicKICAgICAgICBdLCBmYWxzZSksCgogICAgICAgIHNjb3BlLCAgICAgIC8vIEFuIG9iamVjdCBjb250YWluaW5nIGFuIG9iamVjdCBmb3IgZWFjaCB2YXJpYWJsZSBpbiBzY29wZQogICAgICAgIHNlbWljb2xvbl9jb2RhID0gYXJyYXlfdG9fb2JqZWN0KFsnOycsICciJywgJ1wnJywgJyknXSwgdHJ1ZSksCiAgICAgICAgc3JjLAogICAgICAgIHN0YWNrLAoKLy8gc3RhbmRhcmQgY29udGFpbnMgdGhlIGdsb2JhbCBuYW1lcyB0aGF0IGFyZSBwcm92aWRlZCBieSB0aGUKLy8gRUNNQVNjcmlwdCBzdGFuZGFyZC4KCiAgICAgICAgc3RhbmRhcmQgPSBhcnJheV90b19vYmplY3QoWwogICAgICAgICAgICAnQXJyYXknLCAnQm9vbGVhbicsICdEYXRlJywgJ2RlY29kZVVSSScsICdkZWNvZGVVUklDb21wb25lbnQnLAogICAgICAgICAgICAnZW5jb2RlVVJJJywgJ2VuY29kZVVSSUNvbXBvbmVudCcsICdFcnJvcicsICdldmFsJywgJ0V2YWxFcnJvcicsCiAgICAgICAgICAgICdGdW5jdGlvbicsICdpc0Zpbml0ZScsICdpc05hTicsICdKU09OJywgJ01hdGgnLCAnTnVtYmVyJywgJ09iamVjdCcsCiAgICAgICAgICAgICdwYXJzZUludCcsICdwYXJzZUZsb2F0JywgJ1JhbmdlRXJyb3InLCAnUmVmZXJlbmNlRXJyb3InLCAnUmVnRXhwJywKICAgICAgICAgICAgJ1N0cmluZycsICdTeW50YXhFcnJvcicsICdUeXBlRXJyb3InLCAnVVJJRXJyb3InCiAgICAgICAgXSwgZmFsc2UpLAoKICAgICAgICBzdGFuZGFyZF9wcm9wZXJ0eV90eXBlID0gewogICAgICAgICAgICBFICAgICAgICAgICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIExOMiAgICAgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgTE4xMCAgICAgICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBMT0cyRSAgICAgICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIExPRzEwRSAgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgTUFYX1ZBTFVFICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBNSU5fVkFMVUUgICAgICAgICAgIDogJ251bWJlcicsCiAgICAgICAgICAgIE5FR0FUSVZFX0lORklOSVRZICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgUEkgICAgICAgICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBQT1NJVElWRV9JTkZJTklUWSAgIDogJ251bWJlcicsCiAgICAgICAgICAgIFNRUlQxXzIgICAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgU1FSVDIgICAgICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBhcHBseSAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgYmluZCAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBmdW5jdGlvbicsCiAgICAgICAgICAgIGNhbGwgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBjZWlsICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGNoYXJBdCAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgY29uY2F0ICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIGNvbnN0cnVjdG9yICAgICAgICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgY3JlYXRlICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBvYmplY3QnLAogICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSAgICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXMgICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgZXZlcnkgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgZXhlYyAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBhcnJheScsCiAgICAgICAgICAgIGZpbHRlciAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gYXJyYXknLAogICAgICAgICAgICBmbG9vciAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGZvckVhY2ggICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBmcmVlemUgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG9iamVjdCcsCiAgICAgICAgICAgIGdldERhdGUgICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0RGF5ICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRGdWxsWWVhciAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldEhvdXJzICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0TWlsbGlzZWNvbmRzICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRNaW51dGVzICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldE1vbnRoICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgZ2V0T3duUHJvcGVydHlOYW1lcyA6ICdmdW5jdGlvbiBhcnJheScsCiAgICAgICAgICAgIGdldFByb3RvdHlwZU9mICAgICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgZ2V0U2Vjb25kcyAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRUaW1lICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFRpbWV6b25lT2Zmc2V0ICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VVRDRGF0ZSAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRVVENEYXkgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFVUQ0Z1bGxZZWFyICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VVRDSG91cnMgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRVVENNaWxsaXNlY29uZHMgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFVUQ01pbnV0ZXMgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgZ2V0VVRDTW9udGggICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBnZXRVVENTZWNvbmRzICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGdldFllYXIgICAgICAgICAgICAgOiAnZnVuY3Rpb24gbnVtYmVyJywKICAgICAgICAgICAgaGFzT3duUHJvcGVydHkgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgaW5kZXhPZiAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBpc0V4dGVuc2libGUgICAgICAgIDogJ2Z1bmN0aW9uIGJvb2xlYW4nLAogICAgICAgICAgICBpc0Zyb3plbiAgICAgICAgICAgIDogJ2Z1bmN0aW9uIGJvb2xlYW4nLAogICAgICAgICAgICBpc1Byb3RvdHlwZU9mICAgICAgIDogJ2Z1bmN0aW9uIGJvb2xlYW4nLAogICAgICAgICAgICBpc1NlYWxlZCAgICAgICAgICAgIDogJ2Z1bmN0aW9uIGJvb2xlYW4nLAogICAgICAgICAgICBqb2luICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIGtleXMgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gYXJyYXknLAogICAgICAgICAgICBsYXN0SW5kZXhPZiAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIGxhc3RJbmRleCAgICAgICAgICAgOiAnbnVtYmVyJywKICAgICAgICAgICAgbGVuZ3RoICAgICAgICAgICAgICA6ICdudW1iZXInLAogICAgICAgICAgICBtYXAgICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIGFycmF5JywKICAgICAgICAgICAgbm93ICAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICBwYXJzZSAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgcG9wICAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHByZXZlbnRFeHRlbnNpb25zICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgcHJvcGVydHlJc0VudW1lcmFibGU6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgcHJvdG90eXBlICAgICAgICAgICA6ICdvYmplY3QnLAogICAgICAgICAgICBwdXNoICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIG51bWJlcicsCiAgICAgICAgICAgIHJlZHVjZSAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICByZWR1Y2VSaWdodCAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgcmV2ZXJzZSAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNlYWwgICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gb2JqZWN0JywKICAgICAgICAgICAgc2V0RGF0ZSAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldERheSAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRGdWxsWWVhciAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0SG91cnMgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldE1pbGxpc2Vjb25kcyAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRNaW51dGVzICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0TW9udGggICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFNlY29uZHMgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRUaW1lICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VGltZXpvbmVPZmZzZXQgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFVUQ0RhdGUgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRVVENEYXkgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VVRDRnVsbFllYXIgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFVUQ0hvdXJzICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRVVENNaWxsaXNlY29uZHMgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0VVRDTWludXRlcyAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNldFVUQ01vbnRoICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzZXRVVENTZWNvbmRzICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc2V0WWVhciAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNoaWZ0ICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzbGljZSAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgc29tZSAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbiBib29sZWFuJywKICAgICAgICAgICAgc29ydCAgICAgICAgICAgICAgICA6ICdmdW5jdGlvbicsCiAgICAgICAgICAgIHNwbGljZSAgICAgICAgICAgICAgOiAnZnVuY3Rpb24nLAogICAgICAgICAgICBzdHJpbmdpZnkgICAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHN1YnN0ciAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgc3Vic3RyaW5nICAgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0ZXN0ICAgICAgICAgICAgICAgIDogJ2Z1bmN0aW9uIGJvb2xlYW4nLAogICAgICAgICAgICB0b0RhdGVTdHJpbmcgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvRXhwb25lbnRpYWwgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9GaXhlZCAgICAgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b0pTT04gICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJywKICAgICAgICAgICAgdG9JU09TdHJpbmcgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b0xvY2FsZURhdGVTdHJpbmcgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvTG9jYWxlTG93ZXJDYXNlICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9Mb2NhbGVVcHBlckNhc2UgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b0xvY2FsZVN0cmluZyAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvTG9jYWxlVGltZVN0cmluZyAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9Mb3dlckNhc2UgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b1ByZWNpc2lvbiAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRvVGltZVN0cmluZyAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdG9VcHBlckNhc2UgICAgICAgICA6ICdmdW5jdGlvbiBzdHJpbmcnLAogICAgICAgICAgICB0b1VUQ1N0cmluZyAgICAgICAgIDogJ2Z1bmN0aW9uIHN0cmluZycsCiAgICAgICAgICAgIHRyaW0gICAgICAgICAgICAgICAgOiAnZnVuY3Rpb24gc3RyaW5nJywKICAgICAgICAgICAgdW5zaGlmdCAgICAgICAgICAgICA6ICdmdW5jdGlvbiBudW1iZXInLAogICAgICAgICAgICB2YWx1ZU9mICAgICAgICAgICAgIDogJ2Z1bmN0aW9uJwogICAgICAgIH0sCgogICAgICAgIHN0cmljdF9tb2RlLAogICAgICAgIHN5bnRheCA9IHt9LAogICAgICAgIHRhYiwKICAgICAgICB0b2tlbiwKLy8gICAgICAgICB0eXBlX3N0YXRlX2NoYW5nZSwKICAgICAgICB1cmxzLAogICAgICAgIHZhcl9tb2RlLAogICAgICAgIHdhcm5pbmdzLAoKLy8gd2lkZ2V0IGNvbnRhaW5zIHRoZSBnbG9iYWwgbmFtZXMgd2hpY2ggYXJlIHByb3ZpZGVkIHRvIGEgWWFob28KLy8gKGZuYSBLb25mYWJ1bGF0b3IpIHdpZGdldC4KCiAgICAgICAgd2lkZ2V0ID0gYXJyYXlfdG9fb2JqZWN0KFsKICAgICAgICAgICAgJ2FsZXJ0JywgJ2FuaW1hdG9yJywgJ2FwcGxlU2NyaXB0JywgJ2JlZXAnLCAnYnl0ZXNUb1VJU3RyaW5nJywKICAgICAgICAgICAgJ0NhbnZhcycsICdjaG9vc2VDb2xvcicsICdjaG9vc2VGaWxlJywgJ2Nob29zZUZvbGRlcicsCiAgICAgICAgICAgICdjbG9zZVdpZGdldCcsICdDT00nLCAnY29udmVydFBhdGhUb0hGUycsICdjb252ZXJ0UGF0aFRvUGxhdGZvcm0nLAogICAgICAgICAgICAnQ3VzdG9tQW5pbWF0aW9uJywgJ2VzY2FwZScsICdGYWRlQW5pbWF0aW9uJywgJ2ZpbGVzeXN0ZW0nLCAnRmxhc2gnLAogICAgICAgICAgICAnZm9jdXNXaWRnZXQnLCAnZm9ybScsICdGb3JtRmllbGQnLCAnRnJhbWUnLCAnSG90S2V5JywgJ0ltYWdlJywKICAgICAgICAgICAgJ2luY2x1ZGUnLCAnaXNBcHBsaWNhdGlvblJ1bm5pbmcnLCAnaVR1bmVzJywgJ2tvbmZhYnVsYXRvclZlcnNpb24nLAogICAgICAgICAgICAnbG9nJywgJ21kNScsICdNZW51SXRlbScsICdNb3ZlQW5pbWF0aW9uJywgJ29wZW5VUkwnLCAncGxheScsCiAgICAgICAgICAgICdQb2ludCcsICdwb3B1cE1lbnUnLCAncHJlZmVyZW5jZUdyb3VwcycsICdwcmVmZXJlbmNlcycsICdwcmludCcsCiAgICAgICAgICAgICdwcm9tcHQnLCAncmFuZG9tJywgJ1JlY3RhbmdsZScsICdyZWxvYWRXaWRnZXQnLCAnUmVzaXplQW5pbWF0aW9uJywKICAgICAgICAgICAgJ3Jlc29sdmVQYXRoJywgJ3Jlc3VtZVVwZGF0ZXMnLCAnUm90YXRlQW5pbWF0aW9uJywgJ3J1bkNvbW1hbmQnLAogICAgICAgICAgICAncnVuQ29tbWFuZEluQmcnLCAnc2F2ZUFzJywgJ3NhdmVQcmVmZXJlbmNlcycsICdzY3JlZW4nLAogICAgICAgICAgICAnU2Nyb2xsQmFyJywgJ3Nob3dXaWRnZXRQcmVmZXJlbmNlcycsICdzbGVlcCcsICdzcGVhaycsICdTdHlsZScsCiAgICAgICAgICAgICdzdXBwcmVzc1VwZGF0ZXMnLCAnc3lzdGVtJywgJ3RlbGxXaWRnZXQnLCAnVGV4dCcsICdUZXh0QXJlYScsCiAgICAgICAgICAgICdUaW1lcicsICd1bmVzY2FwZScsICd1cGRhdGVOb3cnLCAnVVJMJywgJ1dlYicsICd3aWRnZXQnLCAnV2luZG93JywKICAgICAgICAgICAgJ1hNTERPTScsICdYTUxIdHRwUmVxdWVzdCcsICd5YWhvb0NoZWNrTG9naW4nLCAneWFob29Mb2dpbicsCiAgICAgICAgICAgICd5YWhvb0xvZ291dCcKICAgICAgICBdLCB0cnVlKSwKCiAgICAgICAgd2luZG93cyA9IGFycmF5X3RvX29iamVjdChbCiAgICAgICAgICAgICdBY3RpdmVYT2JqZWN0JywgJ0NTY3JpcHQnLCAnRGVidWcnLCAnRW51bWVyYXRvcicsICdTeXN0ZW0nLAogICAgICAgICAgICAnVkJBcnJheScsICdXU2NyaXB0JywgJ1dTSCcKICAgICAgICBdLCBmYWxzZSksCgovLyAgeG1vZGUgaXMgdXNlZCB0byBhZGFwdCB0byB0aGUgZXhjZXB0aW9ucyBpbiBodG1sIHBhcnNpbmcuCi8vICBJdCBjYW4gaGF2ZSB0aGVzZSBzdGF0ZXM6Ci8vICAgICAgJycgICAgICAuanMgc2NyaXB0IGZpbGUKLy8gICAgICAnaHRtbCcKLy8gICAgICAnb3V0ZXInCi8vICAgICAgJ3NjcmlwdCcKLy8gICAgICAnc3R5bGUnCi8vICAgICAgJ3NjcmlwdHN0cmluZycKLy8gICAgICAnc3R5bGVwcm9wZXJ0eScKCiAgICAgICAgeG1vZGUsCiAgICAgICAgeHF1b3RlLAoKLy8gUmVndWxhciBleHByZXNzaW9ucy4gU29tZSBvZiB0aGVzZSBhcmUgc3R1cGlkbHkgbG9uZy4KCi8vIHVuc2FmZSBjb21tZW50IG9yIHN0cmluZwogICAgICAgIGF4ID0gL0BjY3w8XC8/fHNjcmlwdHxcXVxzKlxdfDxccyohfCZsdC9pLAovLyBjYXJyaWFnZSByZXR1cm4sIG9yIGNhcnJpYWdlIHJldHVybiBsaW5lZmVlZAogICAgICAgIGNyeCA9IC9cci9nLAogICAgICAgIGNybGZ4ID0gL1xyXG4vZywKLy8gdW5zYWZlIGNoYXJhY3RlcnMgdGhhdCBhcmUgc2lsZW50bHkgZGVsZXRlZCBieSBvbmUgb3IgbW9yZSBicm93c2VycwogICAgICAgIGN4ID0gL1tcdTAwMDAtXHUwMDFmXHUwMDdmLVx1MDA5Zlx1MDBhZFx1MDYwMC1cdTA2MDRcdTA3MGZcdTE3YjRcdTE3YjVcdTIwMGMtXHUyMDBmXHUyMDI4LVx1MjAyZlx1MjA2MC1cdTIwNmZcdWZlZmZcdWZmZjAtXHVmZmZmXS8sCi8vIHF1ZXJ5IGNoYXJhY3RlcnMgZm9yIGlkcwogICAgICAgIGR4ID0gL1tcW1xdXC9cXCInKjw+LiY6KCl7fSs9I10vLAovLyBodG1sIHRva2VuCiAgICAgICAgaHggPSAvXlxzKihbJyI9PlwvJiNdfDwoPzpcL3xcISg/Oi0tKT8pP3xbYS16QS1aXVthLXpBLVowLTlfXC06XSp8WzAtOV0rfC0tKS8sCi8vIGlkZW50aWZpZXIKICAgICAgICBpeCA9IC9eKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKikkLywKLy8gamF2YXNjcmlwdCB1cmwKICAgICAgICBqeCA9IC9eKD86amF2YXNjcmlwdHxqc2NyaXB0fGVjbWFzY3JpcHR8dmJzY3JpcHR8bW9jaGF8bGl2ZXNjcmlwdClccyo6L2ksCi8vIHN0YXIgc2xhc2gKICAgICAgICBseCA9IC9cKlwvfFwvXCovLAovLyBjaGFyYWN0ZXJzIGluIHN0cmluZ3MgdGhhdCBuZWVkIGVzY2FwZW1lbnQKICAgICAgICBueCA9IC9bXHUwMDAwLVx1MDAxZidcXFx1MDA3Zi1cdTAwOWZcdTAwYWRcdTA2MDAtXHUwNjA0XHUwNzBmXHUxN2I0XHUxN2I1XHUyMDBjLVx1MjAwZlx1MjAyOC1cdTIwMmZcdTIwNjAtXHUyMDZmXHVmZWZmXHVmZmYwLVx1ZmZmZl0vZywKLy8gb3V0ZXIgaHRtbCB0b2tlbgogICAgICAgIG94ID0gL1s+Jl18PFtcLyFdP3wtLS8sCi8vIGF0dHJpYnV0ZXMgY2hhcmFjdGVycwogICAgICAgIHF4ID0gL1teYS16QS1aMC05K1wtX1wvIF0vLAovLyBzdHlsZQogICAgICAgIHN4ID0gL15ccyooW3t9OiMlLj0sPitcW1xdQCgpIic7XXxcKj0/fFwkPXxcfD18XF49fH49fFthLXpBLVpfXVthLXpBLVowLTlfXC1dKnxbMC05XSt8PFwvfFwvXCopLywKICAgICAgICBzc3ggPSAvXlxzKihbQCMhIid9OzpcLSUuPSwrXFtcXSgpKl9dfFthLXpBLVpdW2EtekEtWjAtOS5fXC1dKnxcL1wqP3xcZCsoPzpcLlxkKyk/fDxcLykvLAovLyB0b2tlbgogICAgICAgIHR4ID0gL15ccyooWygpe31cWy4sOjsnIn5cP1xdI0BdfD09Pz0/fFwvKFwqKGpzbGludHxwcm9wZXJ0aWVzfHByb3BlcnR5fG1lbWJlcnM/fGdsb2JhbHM/KT98PXxcLyk/fFwqW1wvPV0/fFwrKD86PXxcKyspP3wtKD86PXwtKyk/fCU9P3wmWyY9XT98XHxbfD1dP3w+Pj8+Pz0/fDwoW1wvPSFdfFwhKFxbfC0tKT98PD0/KT98XF49P3xcIT0/PT98W2EtekEtWl8kXVthLXpBLVowLTlfJF0qfFswLTldKyhbeFhdWzAtOWEtZkEtRl0rfFwuWzAtOV0qKT8oW2VFXVsrXC1dP1swLTldKyk/KS8sCi8vIHVybCBiYWRuZXNzCiAgICAgICAgdXggPSAvJnxcK3xcdTAwQUR8XC5cLnxcL1wqfCVbXjtdfGJhc2U2NHx1cmx8ZXhwcmVzc2lvbnxkYXRhfG1haWx0b3xzY3JpcHQvaSwKCiAgICAgICAgcnggPSB7CiAgICAgICAgICAgIG91dGVyOiBoeCwKICAgICAgICAgICAgaHRtbDogaHgsCiAgICAgICAgICAgIHN0eWxlOiBzeCwKICAgICAgICAgICAgc3R5bGVwcm9wZXJ0eTogc3N4CiAgICAgICAgfTsKCgogICAgZnVuY3Rpb24gRigpIHt9ICAgICAvLyBVc2VkIGJ5IE9iamVjdC5jcmVhdGUKCi8vIFByb3ZpZGUgY3JpdGljYWwgRVM1IGZ1bmN0aW9ucyB0byBFUzMuCgogICAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGUuZmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmKSB7CiAgICAgICAgICAgIHZhciBpLCBsZW5ndGggPSB0aGlzLmxlbmd0aCwgcmVzdWx0ID0gW10sIHZhbHVlOwogICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzW2ldOwogICAgICAgICAgICAgICAgICAgIGlmIChmKHZhbHVlKSkgewogICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDsKICAgICAgICB9OwogICAgfQoKICAgIGlmICh0eXBlb2YgQXJyYXkucHJvdG90eXBlLmZvckVhY2ggIT09ICdmdW5jdGlvbicpIHsKICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmKSB7CiAgICAgICAgICAgIHZhciBpLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsKICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgICAgIGYodGhpc1tpXSk7CiAgICAgICAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH07CiAgICB9CgogICAgaWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgQXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uIChvKSB7CiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KG8pID09PSAnW29iamVjdCBBcnJheV0nOwogICAgICAgIH07CiAgICB9CgogICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoT2JqZWN0LCAnY3JlYXRlJykpIHsKICAgICAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKG8pIHsKICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvOwogICAgICAgICAgICByZXR1cm4gbmV3IEYoKTsKICAgICAgICB9OwogICAgfQoKICAgIGlmICh0eXBlb2YgT2JqZWN0LmtleXMgIT09ICdmdW5jdGlvbicpIHsKICAgICAgICBPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIChvKSB7CiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdLCBrZXk7CiAgICAgICAgICAgIGZvciAoa2V5IGluIG8pIHsKICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywga2V5KSkgewogICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goa2V5KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gYXJyYXk7CiAgICAgICAgfTsKICAgIH0KCiAgICBpZiAodHlwZW9mIFN0cmluZy5wcm90b3R5cGUuZW50aXR5aWZ5ICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5lbnRpdHlpZnkgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHJldHVybiB0aGlzCiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKQogICAgICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKQogICAgICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTsKICAgICAgICB9OwogICAgfQoKICAgIGlmICh0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS5pc0FscGhhICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5pc0FscGhhID0gZnVuY3Rpb24gKCkgewogICAgICAgICAgICByZXR1cm4gKHRoaXMgPj0gJ2EnICYmIHRoaXMgPD0gJ3pcdWZmZmYnKSB8fAogICAgICAgICAgICAgICAgKHRoaXMgPj0gJ0EnICYmIHRoaXMgPD0gJ1pcdWZmZmYnKTsKICAgICAgICB9OwogICAgfQoKICAgIGlmICh0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS5pc0RpZ2l0ICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5pc0RpZ2l0ID0gZnVuY3Rpb24gKCkgewogICAgICAgICAgICByZXR1cm4gKHRoaXMgPj0gJzAnICYmIHRoaXMgPD0gJzknKTsKICAgICAgICB9OwogICAgfQoKICAgIGlmICh0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS5zdXBwbGFudCAhPT0gJ2Z1bmN0aW9uJykgewogICAgICAgIFN0cmluZy5wcm90b3R5cGUuc3VwcGxhbnQgPSBmdW5jdGlvbiAobykgewogICAgICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9ceyhbXnt9XSopXH0vZywgZnVuY3Rpb24gKGEsIGIpIHsKICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IG9bYl07CiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHJlcGxhY2VtZW50ID09PSAnc3RyaW5nJyB8fAogICAgICAgICAgICAgICAgICAgIHR5cGVvZiByZXBsYWNlbWVudCA9PT0gJ251bWJlcicgPyByZXBsYWNlbWVudCA6IGE7CiAgICAgICAgICAgIH0pOwogICAgICAgIH07CiAgICB9CgoKICAgIGZ1bmN0aW9uIHNhbml0aXplKGEpIHsKCi8vICBFc2NhcGlmeSBhIHRyb3VibGVzb21lIGNoYXJhY3Rlci4KCiAgICAgICAgcmV0dXJuIGVzY2FwZXNbYV0gfHwKICAgICAgICAgICAgJ1xcdScgKyAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGFkZF90b19wcmVkZWZpbmVkKGdyb3VwKSB7CiAgICAgICAgT2JqZWN0LmtleXMoZ3JvdXApLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsKICAgICAgICAgICAgcHJlZGVmaW5lZFtuYW1lXSA9IGdyb3VwW25hbWVdOwogICAgICAgIH0pOwogICAgfQoKCiAgICBmdW5jdGlvbiBhc3N1bWUoKSB7CiAgICAgICAgaWYgKCFvcHRpb24uc2FmZSkgewogICAgICAgICAgICBpZiAob3B0aW9uLnJoaW5vKSB7CiAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZChyaGlubyk7CiAgICAgICAgICAgICAgICBvcHRpb24ucmhpbm8gPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAob3B0aW9uLmRldmVsKSB7CiAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZChkZXZlbCk7CiAgICAgICAgICAgICAgICBvcHRpb24uZGV2ZWwgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAob3B0aW9uLmJyb3dzZXIpIHsKICAgICAgICAgICAgICAgIGFkZF90b19wcmVkZWZpbmVkKGJyb3dzZXIpOwogICAgICAgICAgICAgICAgb3B0aW9uLmJyb3dzZXIgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAob3B0aW9uLndpbmRvd3MpIHsKICAgICAgICAgICAgICAgIGFkZF90b19wcmVkZWZpbmVkKHdpbmRvd3MpOwogICAgICAgICAgICAgICAgb3B0aW9uLndpbmRvd3MgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAob3B0aW9uLm5vZGUpIHsKICAgICAgICAgICAgICAgIGFkZF90b19wcmVkZWZpbmVkKG5vZGUpOwogICAgICAgICAgICAgICAgb3B0aW9uLm5vZGUgPSBmYWxzZTsKICAgICAgICAgICAgICAgIG5vZGVfanMgPSB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChvcHRpb24ud2lkZ2V0KSB7CiAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZCh3aWRnZXQpOwogICAgICAgICAgICAgICAgb3B0aW9uLndpZGdldCA9IGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGlmIChvcHRpb24uY29tbW9uanMpIHsKICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQoY29tbW9uanMpOwogICAgICAgIH0KICAgICAgICBpZiAob3B0aW9uLnR5cGUpIHsKICAgICAgICAgICAgb3B0aW9uLmNvbmZ1c2lvbiA9IHRydWU7CiAgICAgICAgfQogICAgfQoKCi8vIFByb2R1Y2UgYW4gZXJyb3Igd2FybmluZy4KCiAgICBmdW5jdGlvbiBhcnRpZmFjdCh0b2spIHsKICAgICAgICBpZiAoIXRvaykgewogICAgICAgICAgICB0b2sgPSBuZXh0X3Rva2VuOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdG9rLm51bWJlciB8fCB0b2suc3RyaW5nOwogICAgfQoKICAgIGZ1bmN0aW9uIHF1aXQobWVzc2FnZSwgbGluZSwgY2hhcmFjdGVyKSB7CiAgICAgICAgdGhyb3cgewogICAgICAgICAgICBuYW1lOiAnSlNMaW50RXJyb3InLAogICAgICAgICAgICBsaW5lOiBsaW5lLAogICAgICAgICAgICBjaGFyYWN0ZXI6IGNoYXJhY3RlciwKICAgICAgICAgICAgbWVzc2FnZTogYnVuZGxlLnNjYW5uZWRfYV9iLnN1cHBsYW50KHsKICAgICAgICAgICAgICAgIGE6IG1lc3NhZ2UsCiAgICAgICAgICAgICAgICBiOiBNYXRoLmZsb29yKChsaW5lIC8gbGluZXMubGVuZ3RoKSAqIDEwMCkKICAgICAgICAgICAgfSkKICAgICAgICB9OwogICAgfQoKICAgIGZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgb2ZmZW5kZXIsIGEsIGIsIGMsIGQpIHsKICAgICAgICB2YXIgY2hhcmFjdGVyLCBsaW5lLCB3YXJuaW5nOwogICAgICAgIG9mZmVuZGVyID0gb2ZmZW5kZXIgfHwgbmV4dF90b2tlbjsgIC8vIGB+CiAgICAgICAgbGluZSA9IG9mZmVuZGVyLmxpbmUgfHwgMDsKICAgICAgICBjaGFyYWN0ZXIgPSBvZmZlbmRlci5mcm9tIHx8IDA7CiAgICAgICAgd2FybmluZyA9IHsKICAgICAgICAgICAgaWQ6ICcoZXJyb3IpJywKICAgICAgICAgICAgcmF3OiBidW5kbGVbbWVzc2FnZV0gfHwgbWVzc2FnZSwKICAgICAgICAgICAgZXZpZGVuY2U6IGxpbmVzW2xpbmUgLSAxXSB8fCAnJywKICAgICAgICAgICAgbGluZTogbGluZSwKICAgICAgICAgICAgY2hhcmFjdGVyOiBjaGFyYWN0ZXIsCiAgICAgICAgICAgIGE6IGEgfHwgKG9mZmVuZGVyLmlkID09PSAnKG51bWJlciknCiAgICAgICAgICAgICAgICA/IFN0cmluZyhvZmZlbmRlci5udW1iZXIpCiAgICAgICAgICAgICAgICA6IG9mZmVuZGVyLnN0cmluZyksCiAgICAgICAgICAgIGI6IGIsCiAgICAgICAgICAgIGM6IGMsCiAgICAgICAgICAgIGQ6IGQKICAgICAgICB9OwogICAgICAgIHdhcm5pbmcucmVhc29uID0gd2FybmluZy5yYXcuc3VwcGxhbnQod2FybmluZyk7CiAgICAgICAgSlNMSU5ULmVycm9ycy5wdXNoKHdhcm5pbmcpOwogICAgICAgIGlmIChvcHRpb24ucGFzc2ZhaWwpIHsKICAgICAgICAgICAgcXVpdChidW5kbGUuc3RvcHBpbmcsIGxpbmUsIGNoYXJhY3Rlcik7CiAgICAgICAgfQogICAgICAgIHdhcm5pbmdzICs9IDE7CiAgICAgICAgaWYgKHdhcm5pbmdzID49IG9wdGlvbi5tYXhlcnIpIHsKICAgICAgICAgICAgcXVpdChidW5kbGUudG9vX21hbnksIGxpbmUsIGNoYXJhY3Rlcik7CiAgICAgICAgfQogICAgICAgIHJldHVybiB3YXJuaW5nOwogICAgfQoKICAgIGZ1bmN0aW9uIHdhcm5fYXQobWVzc2FnZSwgbGluZSwgY2hhcmFjdGVyLCBhLCBiLCBjLCBkKSB7CiAgICAgICAgcmV0dXJuIHdhcm4obWVzc2FnZSwgewogICAgICAgICAgICBsaW5lOiBsaW5lLAogICAgICAgICAgICBmcm9tOiBjaGFyYWN0ZXIKICAgICAgICB9LCBhLCBiLCBjLCBkKTsKICAgIH0KCiAgICBmdW5jdGlvbiBzdG9wKG1lc3NhZ2UsIG9mZmVuZGVyLCBhLCBiLCBjLCBkKSB7CiAgICAgICAgdmFyIHdhcm5pbmcgPSB3YXJuKG1lc3NhZ2UsIG9mZmVuZGVyLCBhLCBiLCBjLCBkKTsKICAgICAgICBxdWl0KGJ1bmRsZS5zdG9wcGluZywgd2FybmluZy5saW5lLCB3YXJuaW5nLmNoYXJhY3Rlcik7CiAgICB9CgogICAgZnVuY3Rpb24gc3RvcF9hdChtZXNzYWdlLCBsaW5lLCBjaGFyYWN0ZXIsIGEsIGIsIGMsIGQpIHsKICAgICAgICByZXR1cm4gc3RvcChtZXNzYWdlLCB7CiAgICAgICAgICAgIGxpbmU6IGxpbmUsCiAgICAgICAgICAgIGZyb206IGNoYXJhY3RlcgogICAgICAgIH0sIGEsIGIsIGMsIGQpOwogICAgfQoKICAgIGZ1bmN0aW9uIGV4cGVjdGVkX2F0KGF0KSB7CiAgICAgICAgaWYgKCFvcHRpb24ud2hpdGUgJiYgbmV4dF90b2tlbi5mcm9tICE9PSBhdCkgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2F0X2JfYycsIG5leHRfdG9rZW4sICcnLCBhdCwKICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uZnJvbSk7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIGFpbnQoaXQsIG5hbWUsIGV4cGVjdGVkKSB7CiAgICAgICAgaWYgKGl0W25hbWVdICE9PSBleHBlY3RlZCkgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCBpdCwgZXhwZWN0ZWQsIGl0W25hbWVdKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIH0KICAgIH0KCgovLyBsZXhpY2FsIGFuYWx5c2lzIGFuZCB0b2tlbiBjb25zdHJ1Y3Rpb24KCiAgICBsZXggPSAoZnVuY3Rpb24gbGV4KCkgewogICAgICAgIHZhciBjaGFyYWN0ZXIsIGMsIGZyb20sIGxlbmd0aCwgbGluZSwgcG9zLCBzb3VyY2Vfcm93OwoKLy8gUHJpdmF0ZSBsZXggbWV0aG9kcwoKICAgICAgICBmdW5jdGlvbiBuZXh0X2xpbmUoKSB7CiAgICAgICAgICAgIHZhciBhdDsKICAgICAgICAgICAgaWYgKGxpbmUgPj0gbGluZXMubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY2hhcmFjdGVyID0gMTsKICAgICAgICAgICAgc291cmNlX3JvdyA9IGxpbmVzW2xpbmVdOwogICAgICAgICAgICBsaW5lICs9IDE7CiAgICAgICAgICAgIGF0ID0gc291cmNlX3Jvdy5zZWFyY2goLyBcdC8pOwogICAgICAgICAgICBpZiAoYXQgPj0gMCkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgnbWl4ZWQnLCBsaW5lLCBhdCArIDEpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnJlcGxhY2UoL1x0L2csIHRhYik7CiAgICAgICAgICAgIGF0ID0gc291cmNlX3Jvdy5zZWFyY2goY3gpOwogICAgICAgICAgICBpZiAoYXQgPj0gMCkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgndW5zYWZlJywgbGluZSwgYXQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChvcHRpb24ubWF4bGVuICYmIG9wdGlvbi5tYXhsZW4gPCBzb3VyY2Vfcm93Lmxlbmd0aCkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgndG9vX2xvbmcnLCBsaW5lLCBzb3VyY2Vfcm93Lmxlbmd0aCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQoKLy8gUHJvZHVjZSBhIHRva2VuIG9iamVjdC4gIFRoZSB0b2tlbiBpbmhlcml0cyBmcm9tIGEgc3ludGF4IHN5bWJvbC4KCiAgICAgICAgZnVuY3Rpb24gaXQodHlwZSwgdmFsdWUsIHF1b3RlKSB7CiAgICAgICAgICAgIHZhciBpZCwgdGhlX3Rva2VuOwogICAgICAgICAgICBpZiAodHlwZSA9PT0gJyhzdHJpbmcpJyB8fCB0eXBlID09PSAnKHJhbmdlKScpIHsKICAgICAgICAgICAgICAgIGlmIChqeC50ZXN0KHZhbHVlKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VybCcsIGxpbmUsIGZyb20pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoZV90b2tlbiA9IE9iamVjdC5jcmVhdGUoc3ludGF4WygKICAgICAgICAgICAgICAgIHR5cGUgPT09ICcocHVuY3R1YXRvciknIHx8ICh0eXBlID09PSAnKGlkZW50aWZpZXIpJyAmJgogICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3ludGF4LCB2YWx1ZSkpCiAgICAgICAgICAgICAgICAgICAgPyB2YWx1ZQogICAgICAgICAgICAgICAgICAgIDogdHlwZQogICAgICAgICAgICApXSB8fCBzeW50YXhbJyhlcnJvciknXSk7CiAgICAgICAgICAgIGlmICh0eXBlID09PSAnKGlkZW50aWZpZXIpJykgewogICAgICAgICAgICAgICAgdGhlX3Rva2VuLmlkZW50aWZpZXIgPSB0cnVlOwogICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnX19pdGVyYXRvcl9fJyB8fCB2YWx1ZSA9PT0gJ19fcHJvdG9fXycpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCdyZXNlcnZlZF9hJywgbGluZSwgZnJvbSwgdmFsdWUpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uLm5vbWVuICYmCiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZS5jaGFyQXQoMCkgPT09ICdfJyB8fAogICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGFyQXQodmFsdWUubGVuZ3RoIC0gMSkgPT09ICdfJykpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdkYW5nbGluZ19hJywgbGluZSwgZnJvbSwgdmFsdWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgICAgICB0aGVfdG9rZW4ubnVtYmVyID0gK3ZhbHVlOwogICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgICAgIHRoZV90b2tlbi5zdHJpbmcgPSBTdHJpbmcodmFsdWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChxdW90ZSkgewogICAgICAgICAgICAgICAgdGhlX3Rva2VuLnF1b3RlID0gcXVvdGU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhlX3Rva2VuLmxpbmUgPSBsaW5lOwogICAgICAgICAgICB0aGVfdG9rZW4uZnJvbSA9IGZyb207CiAgICAgICAgICAgIHRoZV90b2tlbi50aHJ1ID0gY2hhcmFjdGVyOwogICAgICAgICAgICBpZCA9IHRoZV90b2tlbi5pZDsKICAgICAgICAgICAgcHJlcmVnID0gaWQgJiYgKAogICAgICAgICAgICAgICAgKCcoLD06WyEmfD97fTsnLmluZGV4T2YoaWQuY2hhckF0KGlkLmxlbmd0aCAtIDEpKSA+PSAwKSB8fAogICAgICAgICAgICAgICAgaWQgPT09ICdyZXR1cm4nIHx8IGlkID09PSAnY2FzZScKICAgICAgICAgICAgKTsKICAgICAgICAgICAgcmV0dXJuIHRoZV90b2tlbjsKICAgICAgICB9CgogICAgICAgIGZ1bmN0aW9uIG1hdGNoKHgpIHsKICAgICAgICAgICAgdmFyIGV4ZWMgPSB4LmV4ZWMoc291cmNlX3JvdyksIGZpcnN0OwogICAgICAgICAgICBpZiAoZXhlYykgewogICAgICAgICAgICAgICAgbGVuZ3RoID0gZXhlY1swXS5sZW5ndGg7CiAgICAgICAgICAgICAgICBmaXJzdCA9IGV4ZWNbMV07CiAgICAgICAgICAgICAgICBjID0gZmlyc3QuY2hhckF0KDApOwogICAgICAgICAgICAgICAgc291cmNlX3JvdyA9IHNvdXJjZV9yb3cuc2xpY2UobGVuZ3RoKTsKICAgICAgICAgICAgICAgIGZyb20gPSBjaGFyYWN0ZXIgKyBsZW5ndGggLSBmaXJzdC5sZW5ndGg7CiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gbGVuZ3RoOwogICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0OwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBzdHJpbmcoeCkgewogICAgICAgICAgICB2YXIgYywgcG9zID0gMCwgciA9ICcnOwoKICAgICAgICAgICAgZnVuY3Rpb24gaGV4KG4pIHsKICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoc291cmNlX3Jvdy5zdWJzdHIocG9zICsgMSwgbiksIDE2KTsKICAgICAgICAgICAgICAgIHBvcyArPSBuOwogICAgICAgICAgICAgICAgaWYgKGkgPj0gMzIgJiYgaSA8PSAxMjYgJiYKICAgICAgICAgICAgICAgICAgICAgICAgaSAhPT0gMzQgJiYgaSAhPT0gOTIgJiYgaSAhPT0gMzkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICdcXCcpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IG47CiAgICAgICAgICAgICAgICBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgaWYgKGpzb25fbW9kZSAmJiB4ICE9PSAnIicpIHsKICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2V4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICciJyk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGlmICh4cXVvdGUgPT09IHggfHwgKHhtb2RlID09PSAnc2NyaXB0c3RyaW5nJyAmJiAheHF1b3RlKSkgewogICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcocHVuY3R1YXRvciknLCB4KTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA+PSBzb3VyY2Vfcm93Lmxlbmd0aCkgewogICAgICAgICAgICAgICAgICAgIHBvcyA9IDA7CiAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlICE9PSAnaHRtbCcgfHwgIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ3VuY2xvc2VkJywgbGluZSwgZnJvbSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuY2hhckF0KHBvcyk7CiAgICAgICAgICAgICAgICBpZiAoYyA9PT0geCkgewogICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxOwogICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKHBvcyArIDEpOwogICAgICAgICAgICAgICAgICAgIHJldHVybiBpdCgnKHN0cmluZyknLCByLCB4KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChjIDwgJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICdcbicgfHwgYyA9PT0gJ1xyJykgewogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgnY29udHJvbF9hJywKICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgY2hhcmFjdGVyICsgcG9zLCBzb3VyY2Vfcm93LnNsaWNlKDAsIHBvcykpOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSB4cXVvdGUpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdiYWRfaHRtbCcsIGxpbmUsIGNoYXJhY3RlciArIHBvcyk7CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc8JykgewogICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiB4bW9kZSA9PT0gJ2h0bWwnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2Fkc2FmZV9hJywgbGluZSwgY2hhcmFjdGVyICsgcG9zLCBjKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZV9yb3cuY2hhckF0KHBvcyArIDEpID09PSAnLycgJiYgKHhtb2RlIHx8IG9wdGlvbi5zYWZlKSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdleHBlY3RlZF9hX2InLCBsaW5lLCBjaGFyYWN0ZXIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPFxcLycsICc8LycpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlX3Jvdy5jaGFyQXQocG9zICsgMSkgPT09ICchJyAmJiAoeG1vZGUgfHwgb3B0aW9uLnNhZmUpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXhwZWN0ZWRfYScsIGxpbmUsIGNoYXJhY3RlciwgJzwhJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnXFwnKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnaHRtbCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdhZHNhZmVfYScsIGxpbmUsIGNoYXJhY3RlciArIHBvcywgYyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhtb2RlID09PSAnc3R5bGVwcm9wZXJ0eScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcG9zICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQocG9zKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgIT09IHgpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXhwZWN0ZWRfYScsIGxpbmUsIGNoYXJhY3RlciwgJ1xcJyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdChwb3MpOwogICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmVzNSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2VzNScsIGxpbmUsIGNoYXJhY3Rlcik7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X2xpbmUoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IC0xOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgeHF1b3RlOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgnYmFkX2h0bWwnLCBsaW5lLCBjaGFyYWN0ZXIgKyBwb3MpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1wnJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uX21vZGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICdcXFwnJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndSc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXgoNCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoanNvbl9tb2RlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnXFx2Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gJ1x2JzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uX21vZGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsICdcXHgnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleCgyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGRlc2NhcGVzW2NdOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXhwZWN0ZWRfYScsIGxpbmUsIGNoYXJhY3RlciwgJ1xcJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICByICs9IGM7CiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgIHBvcyArPSAxOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBudW1iZXIoc25pcHBldCkgewogICAgICAgICAgICB2YXIgZGlnaXQ7CiAgICAgICAgICAgIGlmICh4bW9kZSAhPT0gJ3N0eWxlJyAmJiB4bW9kZSAhPT0gJ3N0eWxlcHJvcGVydHknICYmCiAgICAgICAgICAgICAgICAgICAgc291cmNlX3Jvdy5jaGFyQXQoMCkuaXNBbHBoYSgpKSB7CiAgICAgICAgICAgICAgICB3YXJuX2F0KCdleHBlY3RlZF9zcGFjZV9hX2InLAogICAgICAgICAgICAgICAgICAgIGxpbmUsIGNoYXJhY3RlciwgYywgc291cmNlX3Jvdy5jaGFyQXQoMCkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChjID09PSAnMCcpIHsKICAgICAgICAgICAgICAgIGRpZ2l0ID0gc25pcHBldC5jaGFyQXQoMSk7CiAgICAgICAgICAgICAgICBpZiAoZGlnaXQuaXNEaWdpdCgpKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLmlkICE9PSAnLicgJiYgeG1vZGUgIT09ICdzdHlsZXByb3BlcnR5JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2EnLCBsaW5lLCBjaGFyYWN0ZXIsIHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoanNvbl9tb2RlICYmIChkaWdpdCA9PT0gJ3gnIHx8IGRpZ2l0ID09PSAnWCcpKSB7CiAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnMHgnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoc25pcHBldC5zbGljZShzbmlwcGV0Lmxlbmd0aCAtIDEpID09PSAnLicpIHsKICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3RyYWlsaW5nX2RlY2ltYWxfYScsIGxpbmUsIGNoYXJhY3Rlciwgc25pcHBldCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHhtb2RlICE9PSAnc3R5bGUnKSB7CiAgICAgICAgICAgICAgICBkaWdpdCA9ICtzbmlwcGV0OwogICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShkaWdpdCkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdiYWRfbnVtYmVyJywgbGluZSwgY2hhcmFjdGVyLCBzbmlwcGV0KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHNuaXBwZXQgPSBkaWdpdDsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gaXQoJyhudW1iZXIpJywgc25pcHBldCk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBjb21tZW50KHNuaXBwZXQpIHsKICAgICAgICAgICAgaWYgKGNvbW1lbnRzX29mZiB8fCBzcmMgfHwgKHhtb2RlICYmIHhtb2RlICE9PSAnc2NyaXB0JyAmJgogICAgICAgICAgICAgICAgICAgIHhtb2RlICE9PSAnc3R5bGUnICYmIHhtb2RlICE9PSAnc3R5bGVwcm9wZXJ0eScpKSB7CiAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmV4cGVjdGVkX2NvbW1lbnQnLCBsaW5lLCBjaGFyYWN0ZXIpOwogICAgICAgICAgICB9IGVsc2UgaWYgKHhtb2RlID09PSAnc2NyaXB0JyAmJiAvPFwvL2kudGVzdChzb3VyY2Vfcm93KSkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnPFwvJyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnNhZmUgJiYgYXgudGVzdChzbmlwcGV0KSkgewogICAgICAgICAgICAgICAgd2Fybl9hdCgnZGFuZ2Vyb3VzX2NvbW1lbnQnLCBsaW5lLCBjaGFyYWN0ZXIpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiByZWdleHAoKSB7CiAgICAgICAgICAgIHZhciBiLAogICAgICAgICAgICAgICAgYml0LAogICAgICAgICAgICAgICAgY2FwdHVyZXMgPSAwLAogICAgICAgICAgICAgICAgZGVwdGggPSAwLAogICAgICAgICAgICAgICAgZmxhZywKICAgICAgICAgICAgICAgIGhpZ2gsCiAgICAgICAgICAgICAgICBsZW5ndGggPSAwLAogICAgICAgICAgICAgICAgbG93LAogICAgICAgICAgICAgICAgcXVvdGU7CiAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgIGIgPSB0cnVlOwogICAgICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCk7CiAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgIHN3aXRjaCAoYykgewogICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCd1bmNsb3NlZF9yZWdleHAnLCBsaW5lLCBmcm9tKTsKICAgICAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgICAgICBjYXNlICcvJzoKICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPiAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ3VuZXNjYXBlZF9hJywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGZyb20gKyBsZW5ndGgsICcvJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LnNsaWNlKDAsIGxlbmd0aCAtIDEpOwogICAgICAgICAgICAgICAgICAgIGZsYWcgPSBPYmplY3QuY3JlYXRlKHJlZ2V4cF9mbGFnKTsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZmxhZ1tzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgICAgICAgICBmbGFnW3NvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCldID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKS5pc0FscGhhKCkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgndW5leHBlY3RlZF9hJywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGZyb20sIHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gbGVuZ3RoOwogICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGxlbmd0aCk7CiAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBzb3VyY2Vfcm93LmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICBpZiAocXVvdGUgPT09ICcvJyB8fCBxdW90ZSA9PT0gJyonKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ2NvbmZ1c2luZ19yZWdleHAnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHJldHVybiBpdCgnKHJlZ2V4cCknLCBjKTsKICAgICAgICAgICAgICAgIGNhc2UgJ1xcJzoKICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICBpZiAoYyA8ICcgJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdjb250cm9sX2EnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgU3RyaW5nKGMpKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc8JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLnVuZXhwZWN0ZWRfYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcJwogICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJygnOgogICAgICAgICAgICAgICAgICAgIGRlcHRoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgYiA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpID09PSAnPycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSkgewogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICc6JzoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnPSc6CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyEnOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmV4cGVjdGVkX2FfYiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGgsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzonLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlcyArPSAxOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ3wnOgogICAgICAgICAgICAgICAgICAgIGIgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJyknOgogICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PT0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBmcm9tICsgbGVuZ3RoLCAnKScpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoIC09IDE7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnICc6CiAgICAgICAgICAgICAgICAgICAgcG9zID0gMTsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSA9PT0gJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA+IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndXNlX2JyYWNlcycsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBmcm9tICsgbGVuZ3RoLCBwb3MpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ1snOgogICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpOwogICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnXicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLnJlZ2V4cCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgnaW5zZWN1cmVfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgYyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSA9PT0gJ10nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgJ14nKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBiaXQgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJ10nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoJ2VtcHR5X2NsYXNzJywgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGggLSAxKTsKICAgICAgICAgICAgICAgICAgICAgICAgYml0ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICB9CmtsYXNzOiAgICAgICAgICAgICAgZG8gewogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYykgewogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdbJzoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnXic6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCwgYyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy0nOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpdCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGZyb20gKyBsZW5ndGgsICctJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYml0ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICddJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYml0KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5lc2NhcGVkX2EnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBmcm9tICsgbGVuZ3RoIC0gMSwgJy0nKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGtsYXNzOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdcXCc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjIDwgJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmNvbnRyb2xfYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArIGxlbmd0aCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGMpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJzwnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLnVuZXhwZWN0ZWRfYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArIGxlbmd0aCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xcJwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgZnJvbSArIGxlbmd0aCAtIDEsICcvJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXQgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJzwnOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnc2NyaXB0JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdChsZW5ndGgpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnIScgfHwgYyA9PT0gJy8nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUuaHRtbF9jb25mdXNpb25fYSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChjKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJy4nOgogICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLnJlZ2V4cCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdpbnNlY3VyZV9hJywgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGgsIGMpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ10nOgogICAgICAgICAgICAgICAgY2FzZSAnPyc6CiAgICAgICAgICAgICAgICBjYXNlICd7JzoKICAgICAgICAgICAgICAgIGNhc2UgJ30nOgogICAgICAgICAgICAgICAgY2FzZSAnKyc6CiAgICAgICAgICAgICAgICBjYXNlICcqJzoKICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCd1bmVzY2FwZWRfYScsIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gKyBsZW5ndGgsIGMpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnPCc6CiAgICAgICAgICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnc2NyaXB0JykgewogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09ICchJyB8fCBjID09PSAnLycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmh0bWxfY29uZnVzaW9uX2EsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMKICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoYikgewogICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgJz8nOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJysnOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJyonOgogICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkgPT09ICc/JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6CiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPCAnMCcgfHwgYyA+ICc5JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUuZXhwZWN0ZWRfbnVtYmVyX2EsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMKICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIGxvdyA9ICtjOwogICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjIDwgJzAnIHx8IGMgPiAnOScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ID0gK2MgKyAobG93ICogMTApOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2ggPSBsb3c7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjID09PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaCA9IEluZmluaXR5OwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoID0gK2M7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMgPCAnMCcgfHwgYyA+ICc5JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2ggPSArYyArIChoaWdoICogMTApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQobGVuZ3RoKSAhPT0gJ30nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bmRsZS5leHBlY3RlZF9hX2IsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9JywKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjCiAgICAgICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cuY2hhckF0KGxlbmd0aCkgPT09ICc/JykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvdyA+IGhpZ2gpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5fYXQoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLm5vdF9ncmVhdGVyLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSArIGxlbmd0aCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3csCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaAogICAgICAgICAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYyA9IHNvdXJjZV9yb3cuc2xpY2UoMCwgbGVuZ3RoIC0gMSk7CiAgICAgICAgICAgIGNoYXJhY3RlciArPSBsZW5ndGg7CiAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGxlbmd0aCk7CiAgICAgICAgICAgIHJldHVybiBpdCgnKHJlZ2V4cCknLCBjKTsKICAgICAgICB9CgovLyBQdWJsaWMgbGV4IG1ldGhvZHMKCiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHNvdXJjZSkgewogICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICAgICAgbGluZXMgPSBzb3VyY2UKICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoY3JsZngsICdcbicpCiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKGNyeCwgJ1xuJykKICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdcbicpOwogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICBsaW5lcyA9IHNvdXJjZTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGxpbmUgPSAwOwogICAgICAgICAgICAgICAgbmV4dF9saW5lKCk7CiAgICAgICAgICAgICAgICBmcm9tID0gMTsKICAgICAgICAgICAgfSwKCiAgICAgICAgICAgIHJhbmdlOiBmdW5jdGlvbiAoYmVnaW4sIGVuZCkgewogICAgICAgICAgICAgICAgdmFyIGMsIHZhbHVlID0gJyc7CiAgICAgICAgICAgICAgICBmcm9tID0gY2hhcmFjdGVyOwogICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cuY2hhckF0KDApICE9PSBiZWdpbikgewogICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ2V4cGVjdGVkX2FfYicsIGxpbmUsIGNoYXJhY3RlciwgYmVnaW4sCiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cuY2hhckF0KDApKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93ID0gc291cmNlX3Jvdy5zbGljZSgxKTsKICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICBjID0gc291cmNlX3Jvdy5jaGFyQXQoMCk7CiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgnbWlzc2luZ19hJywgbGluZSwgY2hhcmFjdGVyLCBjKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSBlbmQ6CiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKDEpOwogICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcocmFuZ2UpJywgdmFsdWUpOwogICAgICAgICAgICAgICAgICAgIGNhc2UgeHF1b3RlOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xcJzoKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCBjKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGM7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCgovLyB0b2tlbiAtLSB0aGlzIGlzIGNhbGxlZCBieSBhZHZhbmNlIHRvIGdldCB0aGUgbmV4dCB0b2tlbi4KCiAgICAgICAgICAgIHRva2VuOiBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgICAgICB2YXIgYywgaSwgc25pcHBldDsKCiAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFzb3VyY2Vfcm93KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV4dF9saW5lKCkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdCgnKGVuZCknKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB3aGlsZSAoeG1vZGUgPT09ICdvdXRlcicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHNvdXJjZV9yb3cuc2VhcmNoKG94KTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGkpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcoZW5kKScsICcnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBzbmlwcGV0ID0gbWF0Y2gocnhbeG1vZGVdIHx8IHR4KTsKICAgICAgICAgICAgICAgICAgICBpZiAoIXNuaXBwZXQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZV9yb3cpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2Vfcm93LmNoYXJBdCgwKSA9PT0gJyAnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fybl9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnICcpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSAnJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgndW5leHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93LmNoYXJBdCgwKSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewoKLy8gICAgICBpZGVudGlmaWVyCgogICAgICAgICAgICAgICAgICAgICAgICBjID0gc25pcHBldC5jaGFyQXQoMCk7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjLmlzQWxwaGEoKSB8fCBjID09PSAnXycgfHwgYyA9PT0gJyQnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQoJyhpZGVudGlmaWVyKScsIHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgICAgICB9CgovLyAgICAgIG51bWJlcgoKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMuaXNEaWdpdCgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyKHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc25pcHBldCkgewoKLy8gICAgICBzdHJpbmcKCiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyInOgogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICInIjoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcoc25pcHBldCk7CgovLyAgICAgIC8vIGNvbW1lbnQKCiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJy8vJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQoc291cmNlX3Jvdyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93ID0gJyc7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKCi8vICAgICAgLyogY29tbWVudAoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyonOgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBzb3VyY2Vfcm93LnNlYXJjaChseCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudChzb3VyY2Vfcm93KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ3VuY2xvc2VkX2NvbW1lbnQnLCBsaW5lLCBjaGFyYWN0ZXIpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQoc291cmNlX3Jvdy5zbGljZSgwLCBpKSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gaSArIDI7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQoaSkgPT09ICcvJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ25lc3RlZF9jb21tZW50JywgbGluZSwgY2hhcmFjdGVyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGkgKyAyKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwovLyAgICAgIC8KICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4uaWQgPT09ICcvPScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUuc2xhc2hfZXF1YWwsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXJlZwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcmVnZXhwKCkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGl0KCcocHVuY3R1YXRvciknLCBzbmlwcGV0KTsKCi8vICAgICAgcHVuY3R1YXRvcgoKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnPCEtLSc6CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBsaW5lOwovLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gY2hhcmFjdGVyOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBzb3VyY2Vfcm93LmluZGV4T2YoJy0tJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHNvdXJjZV9yb3cuaW5kZXhPZignPCEnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ25lc3RlZF9jb21tZW50JywKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUsIGNoYXJhY3RlciArIGkpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfbGluZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ3VuY2xvc2VkX2NvbW1lbnQnLCBsZW5ndGgsIGMpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IHNvdXJjZV9yb3cuaW5kZXhPZignPCEnKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPj0gMCAmJiBsZW5ndGggPCBpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcF9hdCgnbmVzdGVkX2NvbW1lbnQnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBjaGFyYWN0ZXIgKyBsZW5ndGgpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IGk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlX3Jvdy5jaGFyQXQoaSArIDIpICE9PSAnPicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wX2F0KCdleHBlY3RlZF9hJywgbGluZSwgY2hhcmFjdGVyLCAnLS0+Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKGkgKyAzKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcjJzoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4bW9kZSA9PT0gJ2h0bWwnIHx8IHhtb2RlID09PSAnc3R5bGVwcm9wZXJ0eScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjIDwgJzAnIHx8IGMgPiAnOScpICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGMgPCAnYScgfHwgYyA+ICdmJykgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYyA8ICdBJyB8fCBjID4gJ0YnKSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKDEpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmlwcGV0ICs9IGM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbmlwcGV0Lmxlbmd0aCAhPT0gNCAmJiBzbmlwcGV0Lmxlbmd0aCAhPT0gNykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuX2F0KCdiYWRfY29sb3JfYScsIGxpbmUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICsgbGVuZ3RoLCBzbmlwcGV0KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0KCcoY29sb3IpJywgc25pcHBldCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQoJyhwdW5jdHVhdG9yKScsIHNuaXBwZXQpOwoKICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4bW9kZSA9PT0gJ291dGVyJyAmJiBjID09PSAnJicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Vfcm93ID0gc291cmNlX3Jvdy5zbGljZSgxKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzb3VyY2Vfcm93LmNoYXJBdCgwKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZV9yb3cgPSBzb3VyY2Vfcm93LnNsaWNlKDEpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJzsnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGMgPj0gJ2EnICYmIGMgPD0gJ3onKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPT09ICcjJykpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BfYXQoJ2JhZF9lbnRpdHknLCBsaW5lLCBmcm9tICsgbGVuZ3RoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcik7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQoJyhwdW5jdHVhdG9yKScsIHNuaXBwZXQpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfTsKICAgIH0oKSk7CgoKICAgIGZ1bmN0aW9uIGFkZF9sYWJlbCh0b2tlbiwga2luZCwgbmFtZSkgewoKLy8gRGVmaW5lIHRoZSBzeW1ib2wgaW4gdGhlIGN1cnJlbnQgZnVuY3Rpb24gaW4gdGhlIGN1cnJlbnQgc2NvcGUuCgogICAgICAgIG5hbWUgPSBuYW1lIHx8IHRva2VuLnN0cmluZzsKCi8vIEdsb2JhbCB2YXJpYWJsZXMgY2Fubm90IGJlIGNyZWF0ZWQgaW4gdGhlIHNhZmUgc3Vic2V0LiBJZiBhIGdsb2JhbCB2YXJpYWJsZQovLyBhbHJlYWR5IGV4aXN0cywgZG8gbm90aGluZy4gSWYgaXQgaXMgcHJlZGVmaW5lZCwgZGVmaW5lIGl0LgoKICAgICAgICBpZiAoZnVuY3QgPT09IGdsb2JhbF9mdW5jdCkgewogICAgICAgICAgICBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdG9rZW4sIG5hbWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsX2Z1bmN0W25hbWVdICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgdG9rZW4ud3JpdGVhYmxlID0gdHlwZW9mIHByZWRlZmluZWRbbmFtZV0gPT09ICdib29sZWFuJwogICAgICAgICAgICAgICAgICAgID8gcHJlZGVmaW5lZFtuYW1lXQogICAgICAgICAgICAgICAgICAgIDogdHJ1ZTsKICAgICAgICAgICAgICAgIHRva2VuLmZ1bmN0ID0gZnVuY3Q7CiAgICAgICAgICAgICAgICBnbG9iYWxfc2NvcGVbbmFtZV0gPSB0b2tlbjsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoa2luZCA9PT0gJ2JlY29taW5nJykgewogICAgICAgICAgICAgICAga2luZCA9ICd2YXInOwogICAgICAgICAgICB9CgovLyBPcmRpbmFyeSB2YXJpYWJsZXMuCgogICAgICAgIH0gZWxzZSB7CgovLyBXYXJuIGlmIHRoZSB2YXJpYWJsZSBhbHJlYWR5IGV4aXN0cy4KCiAgICAgICAgICAgIGlmICh0eXBlb2YgZnVuY3RbbmFtZV0gPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICBpZiAoZnVuY3RbbmFtZV0gPT09ICd1bmRlZicpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi51bmRlZikgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2VkX2JlZm9yZV9hJywgdG9rZW4sIG5hbWUpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBraW5kID0gJ3Zhcic7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2FscmVhZHlfZGVmaW5lZCcsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKCi8vIEFkZCB0aGUgc3ltYm9sIHRvIHRoZSBjdXJyZW50IGZ1bmN0aW9uLgoKICAgICAgICAgICAgICAgIHRva2VuLmZ1bmN0ID0gZnVuY3Q7CiAgICAgICAgICAgICAgICB0b2tlbi53cml0ZWFibGUgPSB0cnVlOwogICAgICAgICAgICAgICAgc2NvcGVbbmFtZV0gPSB0b2tlbjsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBmdW5jdFtuYW1lXSA9IGtpbmQ7CiAgICB9CgoKICAgIGZ1bmN0aW9uIHBlZWsoZGlzdGFuY2UpIHsKCi8vIFBlZWsgYWhlYWQgdG8gYSBmdXR1cmUgdG9rZW4uIFRoZSBkaXN0YW5jZSBpcyBob3cgZmFyIGFoZWFkIHRvIGxvb2suIFRoZQovLyBkZWZhdWx0IGlzIHRoZSBuZXh0IHRva2VuLgoKICAgICAgICB2YXIgZm91bmQsIHNsb3QgPSAwOwoKICAgICAgICBkaXN0YW5jZSA9IGRpc3RhbmNlIHx8IDA7CiAgICAgICAgd2hpbGUgKHNsb3QgPD0gZGlzdGFuY2UpIHsKICAgICAgICAgICAgZm91bmQgPSBsb29rYWhlYWRbc2xvdF07CiAgICAgICAgICAgIGlmICghZm91bmQpIHsKICAgICAgICAgICAgICAgIGZvdW5kID0gbG9va2FoZWFkW3Nsb3RdID0gbGV4LnRva2VuKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc2xvdCArPSAxOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZm91bmQ7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGFkdmFuY2UoaWQsIG1hdGNoKSB7CgovLyBQcm9kdWNlIHRoZSBuZXh0IHRva2VuLCBhbHNvIGxvb2tpbmcgZm9yIHByb2dyYW1taW5nIGVycm9ycy4KCiAgICAgICAgaWYgKGluZGVudCkgewoKLy8gSWYgaW5kZW50YXRpb24gY2hlY2tpbmcgd2FzIHJlcXVlc3RlZCwgdGhlbiBpbnNwZWN0IGFsbCBvZiB0aGUgbGluZSBicmVha2luZ3MuCi8vIFRoZSB2YXIgc3RhdGVtZW50IGlzIHRyaWNreSBiZWNhdXNlIHRoZSBuYW1lcyBtaWdodCBiZSBhbGlnbmVkIG9yIG5vdC4gV2UKLy8gbG9vayBhdCB0aGUgZmlyc3QgbGluZSBicmVhayBhZnRlciB0aGUgdmFyIHRvIGRldGVybWluZSB0aGUgcHJvZ3JhbW1lcidzCi8vIGludGVudGlvbi4KCiAgICAgICAgICAgIGlmICh2YXJfbW9kZSAmJiBuZXh0X3Rva2VuLmxpbmUgIT09IHRva2VuLmxpbmUpIHsKICAgICAgICAgICAgICAgIGlmICgodmFyX21vZGUgIT09IGluZGVudCB8fCAhbmV4dF90b2tlbi5lZGdlKSAmJgogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmZyb20gPT09IGluZGVudC5hdCAtCiAgICAgICAgICAgICAgICAgICAgICAgIChuZXh0X3Rva2VuLmVkZ2UgPyBvcHRpb24uaW5kZW50IDogMCkpIHsKICAgICAgICAgICAgICAgICAgICB2YXIgZGVudCA9IGluZGVudDsKICAgICAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGRlbnQuYXQgLT0gb3B0aW9uLmluZGVudDsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbnQgPT09IHZhcl9tb2RlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBkZW50ID0gZGVudC53YXM7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGRlbnQub3BlbiA9IGZhbHNlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdmFyX21vZGUgPSBudWxsOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnPycgJiYgaW5kZW50Lm1vZGUgPT09ICc6JyAmJgogICAgICAgICAgICAgICAgICAgIHRva2VuLmxpbmUgIT09IG5leHRfdG9rZW4ubGluZSkgewogICAgICAgICAgICAgICAgaW5kZW50LmF0IC09IG9wdGlvbi5pbmRlbnQ7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGluZGVudC5vcGVuKSB7CgovLyBJZiB0aGUgdG9rZW4gaXMgYW4gZWRnZS4KCiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5lZGdlKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uZWRnZSA9PT0gJ2xhYmVsJykgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdCgxKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uZWRnZSA9PT0gJ2Nhc2UnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2F0KGluZGVudC5hdCAtIG9wdGlvbi5pbmRlbnQpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZW50Lm1vZGUgIT09ICdhcnJheScgfHwgbmV4dF90b2tlbi5saW5lICE9PSB0b2tlbi5saW5lKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2F0KGluZGVudC5hdCk7CiAgICAgICAgICAgICAgICAgICAgfQoKLy8gSWYgdGhlIHRva2VuIGlzIG5vdCBhbiBlZGdlLCBidXQgaXMgdGhlIGZpcnN0IHRva2VuIG9uIHRoZSBsaW5lLgoKICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dF90b2tlbi5saW5lICE9PSB0b2tlbi5saW5lKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uZnJvbSA8IGluZGVudC5hdCArIChpbmRlbnQubW9kZSA9PT0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleHByZXNzaW9uJyA/IDAgOiBvcHRpb24uaW5kZW50KSkgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdChpbmRlbnQuYXQgKyBvcHRpb24uaW5kZW50KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaW5kZW50LndyYXAgPSB0cnVlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4ubGluZSAhPT0gdG9rZW4ubGluZSkgewogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uZWRnZSkgewogICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2F0KGluZGVudC5hdCk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGluZGVudC53cmFwID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZW50Lm1vZGUgPT09ICdzdGF0ZW1lbnQnIHx8IGluZGVudC5tb2RlID09PSAndmFyJykgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdChpbmRlbnQuYXQgKyBvcHRpb24uaW5kZW50KTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uZnJvbSA8IGluZGVudC5hdCArIChpbmRlbnQubW9kZSA9PT0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleHByZXNzaW9uJyA/IDAgOiBvcHRpb24uaW5kZW50KSkgewogICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9hdChpbmRlbnQuYXQgKyBvcHRpb24uaW5kZW50KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIHN3aXRjaCAodG9rZW4uaWQpIHsKICAgICAgICBjYXNlICcobnVtYmVyKSc6CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLicpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3RyYWlsaW5nX2RlY2ltYWxfYScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJy0nOgogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy0nIHx8IG5leHRfdG9rZW4uaWQgPT09ICctLScpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2NvbmZ1c2luZ19hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnKyc6CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKycgfHwgbmV4dF90b2tlbi5pZCA9PT0gJysrJykgewogICAgICAgICAgICAgICAgd2FybignY29uZnVzaW5nX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgaWYgKHRva2VuLmlkID09PSAnKHN0cmluZyknIHx8IHRva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgYW5vbm5hbWUgPSB0b2tlbi5zdHJpbmc7CiAgICAgICAgfQoKICAgICAgICBpZiAoaWQgJiYgbmV4dF90b2tlbi5pZCAhPT0gaWQpIHsKICAgICAgICAgICAgaWYgKG1hdGNoKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2JfZnJvbV9jX2QnLCBuZXh0X3Rva2VuLCBpZCwKICAgICAgICAgICAgICAgICAgICBtYXRjaC5pZCwgbWF0Y2gubGluZSwgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllciB8fCBuZXh0X3Rva2VuLnN0cmluZyAhPT0gaWQpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sIGlkLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBwcmV2X3Rva2VuID0gdG9rZW47CiAgICAgICAgdG9rZW4gPSBuZXh0X3Rva2VuOwogICAgICAgIG5leHRfdG9rZW4gPSBsb29rYWhlYWQuc2hpZnQoKSB8fCBsZXgudG9rZW4oKTsKICAgIH0KCgogICAgZnVuY3Rpb24gYWR2YW5jZV9pZGVudGlmaWVyKHN0cmluZykgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09IHN0cmluZykgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgc3RyaW5nLCBhcnRpZmFjdCgpKTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGRvX3NhZmUoKSB7CiAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgb3B0aW9uLnNhZmUgPSB0cnVlOwogICAgICAgIH0KICAgICAgICBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgb3B0aW9uLmJyb3dzZXIgICAgID0KICAgICAgICAgICAgICAgIG9wdGlvblsnY29udGludWUnXSA9CiAgICAgICAgICAgICAgICBvcHRpb24uY3NzICAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZGVidWcgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZGV2ZWwgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZXZpbCAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24uZm9yaW4gICA9CiAgICAgICAgICAgICAgICBvcHRpb24ubmV3Y2FwICA9CiAgICAgICAgICAgICAgICBvcHRpb24ubm9tZW4gICA9CiAgICAgICAgICAgICAgICBvcHRpb24ub24gICAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24ucmhpbm8gICA9CiAgICAgICAgICAgICAgICBvcHRpb24uc2xvcHB5ICA9CiAgICAgICAgICAgICAgICBvcHRpb24uc3ViICAgICA9CiAgICAgICAgICAgICAgICBvcHRpb24udW5kZWYgICA9CiAgICAgICAgICAgICAgICBvcHRpb24ud2lkZ2V0ICA9CiAgICAgICAgICAgICAgICBvcHRpb24ud2luZG93cyA9IGZhbHNlOwoKCiAgICAgICAgICAgIGRlbGV0ZSBwcmVkZWZpbmVkLkFycmF5OwogICAgICAgICAgICBkZWxldGUgcHJlZGVmaW5lZC5EYXRlOwogICAgICAgICAgICBkZWxldGUgcHJlZGVmaW5lZC5GdW5jdGlvbjsKICAgICAgICAgICAgZGVsZXRlIHByZWRlZmluZWQuT2JqZWN0OwogICAgICAgICAgICBkZWxldGUgcHJlZGVmaW5lZFsnZXZhbCddOwoKICAgICAgICAgICAgYWRkX3RvX3ByZWRlZmluZWQoewogICAgICAgICAgICAgICAgQURTQUZFOiBmYWxzZSwKICAgICAgICAgICAgICAgIGxpYjogZmFsc2UKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBkb19nbG9iYWxzKCkgewogICAgICAgIHZhciBuYW1lLCB3cml0ZWFibGU7CiAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyAmJiAhbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIHdyaXRlYWJsZSA9IGZhbHNlOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzonKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uaWQpIHsKICAgICAgICAgICAgICAgIGNhc2UgJ3RydWUnOgogICAgICAgICAgICAgICAgICAgIHdyaXRlYWJsZSA9IHByZWRlZmluZWRbbmFtZV0gIT09IGZhbHNlOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJ3RydWUnKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzoKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCdmYWxzZScpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBwcmVkZWZpbmVkW25hbWVdID0gd3JpdGVhYmxlOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgIH0KICAgIH0KCgogICAgZnVuY3Rpb24gZG9fanNsaW50KCkgewogICAgICAgIHZhciBuYW1lLCB2YWx1ZTsKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJyhzdHJpbmcpJyB8fCBuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnOicpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICc6JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICBpZiAodHlwZW9mIGpzbGludF9saW1pdFtuYW1lXSA9PT0gJ251bWJlcicpIHsKICAgICAgICAgICAgICAgIHZhbHVlID0gbmV4dF90b2tlbi5udW1iZXI7CiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiBqc2xpbnRfbGltaXRbbmFtZV0gfHwgdmFsdWUgPD0gMCB8fAogICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9zbWFsbF9hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBvcHRpb25bbmFtZV0gPSB2YWx1ZTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAndHJ1ZScpIHsKICAgICAgICAgICAgICAgICAgICBvcHRpb25bbmFtZV0gPSB0cnVlOwogICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0X3Rva2VuLmlkID09PSAnZmFsc2UnKSB7CiAgICAgICAgICAgICAgICAgICAgb3B0aW9uW25hbWVdID0gZmFsc2U7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7CiAgICAgICAgICAgICAgICBjYXNlICdhZHNhZmUnOgogICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zYWZlID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBkb19zYWZlKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdzYWZlJzoKICAgICAgICAgICAgICAgICAgICBkb19zYWZlKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgYXNzdW1lKCk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGRvX3Byb3BlcnRpZXMoKSB7CiAgICAgICAgdmFyIG5hbWUsIHR5cGU7CiAgICAgICAgb3B0aW9uLnByb3BlcnRpZXMgPSB0cnVlOwogICAgICAgIGlmICghZnVuY3RbJyhvbGRfcHJvcGVydHlfdHlwZSknXSkgewogICAgICAgICAgICBmdW5jdFsnKG9sZF9wcm9wZXJ0eV90eXBlKSddID0gcHJvcGVydHlfdHlwZTsKICAgICAgICAgICAgcHJvcGVydHlfdHlwZSA9IE9iamVjdC5jcmVhdGUocHJvcGVydHlfdHlwZSk7CiAgICAgICAgfQogICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScgJiYgIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIG5hbWUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgdHlwZSA9ICcnOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOicpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJzonKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnZnVuY3Rpb24nKTsKICAgICAgICAgICAgICAgICAgICBpZiAoaXNfdHlwZVtuZXh0X3Rva2VuLnN0cmluZ10gPT09IHRydWUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdmdW5jdGlvbiAnICsgbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ2Z1bmN0aW9uJzsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHR5cGUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgICAgICAgICBpZiAoaXNfdHlwZVt0eXBlXSAhPT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF90eXBlX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICcnOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcHJvcGVydHlfdHlwZVtuYW1lXSA9IHR5cGU7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgfQogICAgfQoKCiAgICBkaXJlY3RpdmUgPSBmdW5jdGlvbiBkaXJlY3RpdmUoKSB7CiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmlkLAogICAgICAgICAgICBvbGRfY29tbWVudHNfb2ZmID0gY29tbWVudHNfb2ZmLAogICAgICAgICAgICBvbGRfaW5kZW50ID0gaW5kZW50OwogICAgICAgIGNvbW1lbnRzX29mZiA9IHRydWU7CiAgICAgICAgaW5kZW50ID0gbnVsbDsKICAgICAgICBpZiAobmV4dF90b2tlbi5saW5lID09PSB0b2tlbi5saW5lICYmIG5leHRfdG9rZW4uZnJvbSA9PT0gdG9rZW4udGhydSkgewogICAgICAgICAgICB3YXJuKCdtaXNzaW5nX3NwYWNlX2FfYicsIG5leHRfdG9rZW4sIGFydGlmYWN0KHRva2VuKSwgYXJ0aWZhY3QoKSk7CiAgICAgICAgfQogICAgICAgIGlmIChsb29rYWhlYWQubGVuZ3RoID4gMCkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7CiAgICAgICAgY2FzZSAnLypwcm9wZXJ0aWVzJzoKICAgICAgICBjYXNlICcvKnByb3BlcnR5JzoKICAgICAgICBjYXNlICcvKm1lbWJlcnMnOgogICAgICAgIGNhc2UgJy8qbWVtYmVyJzoKICAgICAgICAgICAgZG9fcHJvcGVydGllcygpOwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICcvKmpzbGludCc6CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGlzKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBkb19qc2xpbnQoKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnLypnbG9iYWxzJzoKICAgICAgICBjYXNlICcvKmdsb2JhbCc6CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGlzKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBkb19nbG9iYWxzKCk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIHRoaXMpOwogICAgICAgIH0KICAgICAgICBjb21tZW50c19vZmYgPSBvbGRfY29tbWVudHNfb2ZmOwogICAgICAgIGFkdmFuY2UoJyovJyk7CiAgICAgICAgaW5kZW50ID0gb2xkX2luZGVudDsKICAgIH07CgoKLy8gSW5kZW50YXRpb24gaW50ZW50aW9uCgogICAgZnVuY3Rpb24gZWRnZShtb2RlKSB7CiAgICAgICAgbmV4dF90b2tlbi5lZGdlID0gaW5kZW50ID8gaW5kZW50Lm9wZW4gJiYgKG1vZGUgfHwgJ2VkZ2UnKSA6ICcnOwogICAgfQoKCiAgICBmdW5jdGlvbiBzdGVwX2luKG1vZGUpIHsKICAgICAgICB2YXIgb3BlbjsKICAgICAgICBpZiAodHlwZW9mIG1vZGUgPT09ICdudW1iZXInKSB7CiAgICAgICAgICAgIGluZGVudCA9IHsKICAgICAgICAgICAgICAgIGF0OiArbW9kZSwKICAgICAgICAgICAgICAgIG9wZW46IHRydWUsCiAgICAgICAgICAgICAgICB3YXM6IGluZGVudAogICAgICAgICAgICB9OwogICAgICAgIH0gZWxzZSBpZiAoIWluZGVudCkgewogICAgICAgICAgICBpbmRlbnQgPSB7CiAgICAgICAgICAgICAgICBhdDogMSwKICAgICAgICAgICAgICAgIG1vZGU6ICdzdGF0ZW1lbnQnLAogICAgICAgICAgICAgICAgb3BlbjogdHJ1ZQogICAgICAgICAgICB9OwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIG9wZW4gPSBtb2RlID09PSAndmFyJyB8fAogICAgICAgICAgICAgICAgKG5leHRfdG9rZW4ubGluZSAhPT0gdG9rZW4ubGluZSAmJiBtb2RlICE9PSAnc3RhdGVtZW50Jyk7CiAgICAgICAgICAgIGluZGVudCA9IHsKICAgICAgICAgICAgICAgIGF0OiAob3BlbiB8fCBtb2RlID09PSAnY29udHJvbCcKICAgICAgICAgICAgICAgICAgICA/IGluZGVudC5hdCArIG9wdGlvbi5pbmRlbnQKICAgICAgICAgICAgICAgICAgICA6IGluZGVudC5hdCkgKyAoaW5kZW50LndyYXAgPyBvcHRpb24uaW5kZW50IDogMCksCiAgICAgICAgICAgICAgICBtb2RlOiBtb2RlLAogICAgICAgICAgICAgICAgb3Blbjogb3BlbiwKICAgICAgICAgICAgICAgIHdhczogaW5kZW50CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIGlmIChtb2RlID09PSAndmFyJyAmJiBvcGVuKSB7CiAgICAgICAgICAgICAgICB2YXJfbW9kZSA9IGluZGVudDsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzdGVwX291dChpZCwgc3ltYm9sKSB7CiAgICAgICAgaWYgKGlkKSB7CiAgICAgICAgICAgIGlmIChpbmRlbnQgJiYgaW5kZW50Lm9wZW4pIHsKICAgICAgICAgICAgICAgIGluZGVudC5hdCAtPSBvcHRpb24uaW5kZW50OwogICAgICAgICAgICAgICAgZWRnZSgpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoaWQsIHN5bWJvbCk7CiAgICAgICAgfQogICAgICAgIGlmIChpbmRlbnQpIHsKICAgICAgICAgICAgaW5kZW50ID0gaW5kZW50LndhczsKICAgICAgICB9CiAgICB9CgovLyBGdW5jdGlvbnMgZm9yIGNvbmZvcm1hbmNlIG9mIHdoaXRlc3BhY2UuCgogICAgZnVuY3Rpb24gb25lX3NwYWNlKGxlZnQsIHJpZ2h0KSB7CiAgICAgICAgbGVmdCA9IGxlZnQgfHwgdG9rZW47CiAgICAgICAgcmlnaHQgPSByaWdodCB8fCBuZXh0X3Rva2VuOwogICAgICAgIGlmIChyaWdodC5pZCAhPT0gJyhlbmQpJyAmJiAhb3B0aW9uLndoaXRlICYmCiAgICAgICAgICAgICAgICAodG9rZW4ubGluZSAhPT0gcmlnaHQubGluZSB8fAogICAgICAgICAgICAgICAgdG9rZW4udGhydSArIDEgIT09IHJpZ2h0LmZyb20pKSB7CiAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3NwYWNlX2FfYicsIHJpZ2h0LCBhcnRpZmFjdCh0b2tlbiksIGFydGlmYWN0KHJpZ2h0KSk7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIG9uZV9zcGFjZV9vbmx5KGxlZnQsIHJpZ2h0KSB7CiAgICAgICAgbGVmdCA9IGxlZnQgfHwgdG9rZW47CiAgICAgICAgcmlnaHQgPSByaWdodCB8fCBuZXh0X3Rva2VuOwogICAgICAgIGlmIChyaWdodC5pZCAhPT0gJyhlbmQpJyAmJiAobGVmdC5saW5lICE9PSByaWdodC5saW5lIHx8CiAgICAgICAgICAgICAgICAoIW9wdGlvbi53aGl0ZSAmJiBsZWZ0LnRocnUgKyAxICE9PSByaWdodC5mcm9tKSkpIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3BhY2VfYV9iJywgcmlnaHQsIGFydGlmYWN0KGxlZnQpLCBhcnRpZmFjdChyaWdodCkpOwogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBub19zcGFjZShsZWZ0LCByaWdodCkgewogICAgICAgIGxlZnQgPSBsZWZ0IHx8IHRva2VuOwogICAgICAgIHJpZ2h0ID0gcmlnaHQgfHwgbmV4dF90b2tlbjsKICAgICAgICBpZiAoKCFvcHRpb24ud2hpdGUgfHwgeG1vZGUgPT09ICdzdHlsZXByb3BlcnR5JyB8fCB4bW9kZSA9PT0gJ3N0eWxlJykgJiYKICAgICAgICAgICAgICAgIGxlZnQudGhydSAhPT0gcmlnaHQuZnJvbSAmJiBsZWZ0LmxpbmUgPT09IHJpZ2h0LmxpbmUpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9zcGFjZV9hX2InLCByaWdodCwgYXJ0aWZhY3QobGVmdCksIGFydGlmYWN0KHJpZ2h0KSk7CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIG5vX3NwYWNlX29ubHkobGVmdCwgcmlnaHQpIHsKICAgICAgICBsZWZ0ID0gbGVmdCB8fCB0b2tlbjsKICAgICAgICByaWdodCA9IHJpZ2h0IHx8IG5leHRfdG9rZW47CiAgICAgICAgaWYgKHJpZ2h0LmlkICE9PSAnKGVuZCknICYmIChsZWZ0LmxpbmUgIT09IHJpZ2h0LmxpbmUgfHwKICAgICAgICAgICAgICAgICghb3B0aW9uLndoaXRlICYmIGxlZnQudGhydSAhPT0gcmlnaHQuZnJvbSkpKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfc3BhY2VfYV9iJywgcmlnaHQsIGFydGlmYWN0KGxlZnQpLCBhcnRpZmFjdChyaWdodCkpOwogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzcGFjZXMobGVmdCwgcmlnaHQpIHsKICAgICAgICBpZiAoIW9wdGlvbi53aGl0ZSkgewogICAgICAgICAgICBsZWZ0ID0gbGVmdCB8fCB0b2tlbjsKICAgICAgICAgICAgcmlnaHQgPSByaWdodCB8fCBuZXh0X3Rva2VuOwogICAgICAgICAgICBpZiAobGVmdC50aHJ1ID09PSByaWdodC5mcm9tICYmIGxlZnQubGluZSA9PT0gcmlnaHQubGluZSkgewogICAgICAgICAgICAgICAgd2FybignbWlzc2luZ19zcGFjZV9hX2InLCByaWdodCwgYXJ0aWZhY3QobGVmdCksIGFydGlmYWN0KHJpZ2h0KSk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gY29tbWEoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICB3YXJuX2F0KCdleHBlY3RlZF9hX2InLCB0b2tlbi5saW5lLCB0b2tlbi50aHJ1LCAnLCcsIGFydGlmYWN0KCkpOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIGlmICghb3B0aW9uLndoaXRlKSB7CiAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIHNlbWljb2xvbigpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJzsnKSB7CiAgICAgICAgICAgIHdhcm5fYXQoJ2V4cGVjdGVkX2FfYicsIHRva2VuLmxpbmUsIHRva2VuLnRocnUsICc7JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKCFvcHRpb24ud2hpdGUpIHsKICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCc7Jyk7CiAgICAgICAgICAgIGlmIChzZW1pY29sb25fY29kYVtuZXh0X3Rva2VuLmlkXSAhPT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gdXNlX3N0cmljdCgpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcgPT09ICd1c2Ugc3RyaWN0JykgewogICAgICAgICAgICBpZiAoc3RyaWN0X21vZGUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VubmVjZXNzYXJ5X3VzZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgc3RyaWN0X21vZGUgPSB0cnVlOwogICAgICAgICAgICBvcHRpb24ubmV3Y2FwID0gZmFsc2U7CiAgICAgICAgICAgIG9wdGlvbi51bmRlZiA9IGZhbHNlOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgfQogICAgfQoKCiAgICBmdW5jdGlvbiBhcmVfc2ltaWxhcihhLCBiKSB7CiAgICAgICAgaWYgKGEgPT09IGIpIHsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7CiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGIpICYmIGEubGVuZ3RoID09PSBiLmxlbmd0aCkgewogICAgICAgICAgICAgICAgdmFyIGk7CiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgIGlmICghYXJlX3NpbWlsYXIoYVtpXSwgYltpXSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICB9CiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYikpIHsKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIH0KICAgICAgICBpZiAoYS5pZCA9PT0gJyhudW1iZXIpJyAmJiBiLmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgIHJldHVybiBhLm51bWJlciA9PT0gYi5udW1iZXI7CiAgICAgICAgfQogICAgICAgIGlmIChhLmFyaXR5ID09PSBiLmFyaXR5ICYmIGEuc3RyaW5nID09PSBiLnN0cmluZykgewogICAgICAgICAgICBzd2l0Y2ggKGEuYXJpdHkpIHsKICAgICAgICAgICAgY2FzZSAncHJlZml4JzoKICAgICAgICAgICAgY2FzZSAnc3VmZml4JzoKICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6CiAgICAgICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYi5pZCAmJiBhcmVfc2ltaWxhcihhLmZpcnN0LCBiLmZpcnN0KTsKICAgICAgICAgICAgY2FzZSAnaW5maXgnOgogICAgICAgICAgICAgICAgcmV0dXJuIGFyZV9zaW1pbGFyKGEuZmlyc3QsIGIuZmlyc3QpICYmCiAgICAgICAgICAgICAgICAgICAgYXJlX3NpbWlsYXIoYS5zZWNvbmQsIGIuc2Vjb25kKTsKICAgICAgICAgICAgY2FzZSAndGVybmFyeSc6CiAgICAgICAgICAgICAgICByZXR1cm4gYXJlX3NpbWlsYXIoYS5maXJzdCwgYi5maXJzdCkgJiYKICAgICAgICAgICAgICAgICAgICBhcmVfc2ltaWxhcihhLnNlY29uZCwgYi5zZWNvbmQpICYmCiAgICAgICAgICAgICAgICAgICAgYXJlX3NpbWlsYXIoYS50aGlyZCwgYi50aGlyZCk7CiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICAgICAgY2FzZSAncmVnZXhwJzoKICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKGEuaWQgPT09ICcuJyAmJiBiLmlkID09PSAnWycgJiYgYi5hcml0eSA9PT0gJ2luZml4JykgewogICAgICAgICAgICAgICAgcmV0dXJuIGEuc2Vjb25kLnN0cmluZyA9PT0gYi5zZWNvbmQuc3RyaW5nICYmIGIuc2Vjb25kLmlkID09PSAnKHN0cmluZyknOwogICAgICAgICAgICB9IGVsc2UgaWYgKGEuaWQgPT09ICdbJyAmJiBhLmFyaXR5ID09PSAnaW5maXgnICYmIGIuaWQgPT09ICcuJykgewogICAgICAgICAgICAgICAgcmV0dXJuIGEuc2Vjb25kLnN0cmluZyA9PT0gYi5zZWNvbmQuc3RyaW5nICYmIGEuc2Vjb25kLmlkID09PSAnKHN0cmluZyknOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgovLyBUaGlzIGlzIHRoZSBoZWFydCBvZiBKU0xJTlQsIHRoZSBQcmF0dCBwYXJzZXIuIEluIGFkZGl0aW9uIHRvIHBhcnNpbmcsIGl0Ci8vIGlzIGxvb2tpbmcgZm9yIGFkIGhvYyBsaW50IHBhdHRlcm5zLiBXZSBhZGQgLmZ1ZCB0byBQcmF0dCdzIG1vZGVsLCB3aGljaCBpcwovLyBsaWtlIC5udWQgZXhjZXB0IHRoYXQgaXQgaXMgb25seSB1c2VkIG9uIHRoZSBmaXJzdCB0b2tlbiBvZiBhIHN0YXRlbWVudC4KLy8gSGF2aW5nIC5mdWQgbWFrZXMgaXQgbXVjaCBlYXNpZXIgdG8gZGVmaW5lIHN0YXRlbWVudC1vcmllbnRlZCBsYW5ndWFnZXMgbGlrZQovLyBKYXZhU2NyaXB0LiBJIHJldGFpbmVkIFByYXR0J3Mgbm9tZW5jbGF0dXJlLgoKLy8gLm51ZCAgICAgTnVsbCBkZW5vdGF0aW9uCi8vIC5mdWQgICAgIEZpcnN0IG51bGwgZGVub3RhdGlvbgovLyAubGVkICAgICBMZWZ0IGRlbm90YXRpb24KLy8gIGxicCAgICAgTGVmdCBiaW5kaW5nIHBvd2VyCi8vICByYnAgICAgIFJpZ2h0IGJpbmRpbmcgcG93ZXIKCi8vIFRoZXkgYXJlIGVsZW1lbnRzIG9mIHRoZSBwYXJzaW5nIG1ldGhvZCBjYWxsZWQgVG9wIERvd24gT3BlcmF0b3IgUHJlY2VkZW5jZS4KCiAgICBmdW5jdGlvbiBleHByZXNzaW9uKHJicCwgaW5pdGlhbCkgewoKLy8gcmJwIGlzIHRoZSByaWdodCBiaW5kaW5nIHBvd2VyLgovLyBpbml0aWFsIGluZGljYXRlcyB0aGF0IHRoaXMgaXMgdGhlIGZpcnN0IGV4cHJlc3Npb24gb2YgYSBzdGF0ZW1lbnQuCgogICAgICAgIHZhciBsZWZ0OwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknKSB7CiAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIHRva2VuLCBuZXh0X3Rva2VuLmlkKTsKICAgICAgICB9CiAgICAgICAgYWR2YW5jZSgpOwogICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiBzY29wZVt0b2tlbi5zdHJpbmddICYmCiAgICAgICAgICAgICAgICBzY29wZVt0b2tlbi5zdHJpbmddID09PSBnbG9iYWxfc2NvcGVbdG9rZW4uc3RyaW5nXSAmJgogICAgICAgICAgICAgICAgKG5leHRfdG9rZW4uaWQgIT09ICcoJyAmJiBuZXh0X3Rva2VuLmlkICE9PSAnLicpKSB7CiAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdG9rZW4pOwogICAgICAgIH0KICAgICAgICBpZiAoaW5pdGlhbCkgewogICAgICAgICAgICBhbm9ubmFtZSA9ICdhbm9ueW1vdXMnOwogICAgICAgICAgICBmdW5jdFsnKHZlcmIpJ10gPSB0b2tlbi5zdHJpbmc7CiAgICAgICAgfQogICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlICYmIHRva2VuLmZ1ZCkgewogICAgICAgICAgICBsZWZ0ID0gdG9rZW4uZnVkKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWYgKHRva2VuLm51ZCkgewogICAgICAgICAgICAgICAgbGVmdCA9IHRva2VuLm51ZCgpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScgJiYgdG9rZW4uaWQgPT09ICcuJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2xlYWRpbmdfZGVjaW1hbF9hJywgdG9rZW4sIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2lkZW50aWZpZXJfYScsIHRva2VuLCB0b2tlbi5pZCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgd2hpbGUgKHJicCA8IG5leHRfdG9rZW4ubGJwKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVkKSB7CiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHRva2VuLmxlZChsZWZ0KTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfb3BlcmF0b3JfYScsIHRva2VuLCB0b2tlbi5pZCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIGxlZnQ7CiAgICB9CgoKLy8gRnVuY3Rpb25hbCBjb25zdHJ1Y3RvcnMgZm9yIG1ha2luZyB0aGUgc3ltYm9scyB0aGF0IHdpbGwgYmUgaW5oZXJpdGVkIGJ5Ci8vIHRva2Vucy4KCiAgICBmdW5jdGlvbiBzeW1ib2wocywgcCkgewogICAgICAgIHZhciB4ID0gc3ludGF4W3NdOwogICAgICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsKICAgICAgICAgICAgc3ludGF4W3NdID0geCA9IHsKICAgICAgICAgICAgICAgIGlkOiBzLAogICAgICAgICAgICAgICAgbGJwOiBwIHx8IDAsCiAgICAgICAgICAgICAgICBzdHJpbmc6IHMKICAgICAgICAgICAgfTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgogICAgZnVuY3Rpb24gcG9zdHNjcmlwdCh4KSB7CiAgICAgICAgeC5wb3N0c2NyaXB0ID0gdHJ1ZTsKICAgICAgICByZXR1cm4geDsKICAgIH0KCiAgICBmdW5jdGlvbiB1bHRpbWF0ZShzKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocywgMCk7CiAgICAgICAgeC5mcm9tID0gMTsKICAgICAgICB4LnRocnUgPSAxOwogICAgICAgIHgubGluZSA9IDA7CiAgICAgICAgeC5lZGdlID0gJ2VkZ2UnOwogICAgICAgIHMuc3RyaW5nID0gczsKICAgICAgICByZXR1cm4gcG9zdHNjcmlwdCh4KTsKICAgIH0KCgogICAgZnVuY3Rpb24gc3RtdChzLCBmKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocyk7CiAgICAgICAgeC5pZGVudGlmaWVyID0geC5yZXNlcnZlZCA9IHRydWU7CiAgICAgICAgeC5mdWQgPSBmOwogICAgICAgIHJldHVybiB4OwogICAgfQoKICAgIGZ1bmN0aW9uIGxhYmVsZWRfc3RtdChzLCBmKSB7CiAgICAgICAgdmFyIHggPSBzdG10KHMsIGYpOwogICAgICAgIHgubGFiZWxlZCA9IHRydWU7CiAgICB9CgogICAgZnVuY3Rpb24gZGlzcnVwdF9zdG10KHMsIGYpIHsKICAgICAgICB2YXIgeCA9IHN0bXQocywgZik7CiAgICAgICAgeC5kaXNydXB0ID0gdHJ1ZTsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVzZXJ2ZV9uYW1lKHgpIHsKICAgICAgICB2YXIgYyA9IHguaWQuY2hhckF0KDApOwogICAgICAgIGlmICgoYyA+PSAnYScgJiYgYyA8PSAneicpIHx8IChjID49ICdBJyAmJiBjIDw9ICdaJykpIHsKICAgICAgICAgICAgeC5pZGVudGlmaWVyID0geC5yZXNlcnZlZCA9IHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiB4OwogICAgfQoKCiAgICBmdW5jdGlvbiBwcmVmaXgocywgZiwgdHlwZSkgewogICAgICAgIHZhciB4ID0gc3ltYm9sKHMsIDE1MCk7CiAgICAgICAgcmVzZXJ2ZV9uYW1lKHgpOwogICAgICAgIHgubnVkID0gdHlwZW9mIGYgPT09ICdmdW5jdGlvbicKICAgICAgICAgICAgPyBmCiAgICAgICAgICAgIDogZnVuY3Rpb24gKCkgewogICAgICAgICAgICAgICAgaWYgKHMgPT09ICd0eXBlb2YnKSB7CiAgICAgICAgICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBleHByZXNzaW9uKDE1MCk7CiAgICAgICAgICAgICAgICB0aGlzLmFyaXR5ID0gJ3ByZWZpeCc7CiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gJysrJyB8fCB0aGlzLmlkID09PSAnLS0nKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb24ucGx1c3BsdXMpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoIXRoaXMuZmlyc3QuaWRlbnRpZmllciB8fCB0aGlzLmZpcnN0LnJlc2VydmVkKSAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdC5pZCAhPT0gJy4nICYmIHRoaXMuZmlyc3QuaWQgIT09ICdbJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfb3BlcmFuZCcsIHRoaXMpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7CiAgICAgICAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICAgICAgfTsKICAgICAgICByZXR1cm4geDsKICAgIH0KCgogICAgZnVuY3Rpb24gdHlwZShzLCB0LCBudWQpIHsKICAgICAgICB2YXIgeCA9IHN5bWJvbChzKTsKICAgICAgICB4LmFyaXR5ID0geC50eXBlID0gdDsKICAgICAgICBpZiAobnVkKSB7CiAgICAgICAgICAgIHgubnVkID0gbnVkOwogICAgICAgIH0KICAgICAgICByZXR1cm4geDsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVzZXJ2ZShzLCBmKSB7CiAgICAgICAgdmFyIHggPSBzeW1ib2wocyk7CiAgICAgICAgeC5pZGVudGlmaWVyID0geC5yZXNlcnZlZCA9IHRydWU7CiAgICAgICAgaWYgKHR5cGVvZiBmID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgIHgubnVkID0gZjsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHg7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNvbnN0YW50KG5hbWUsIHR5cGUpIHsKICAgICAgICB2YXIgeCA9IHJlc2VydmUobmFtZSk7CiAgICAgICAgeC50eXBlID0gdHlwZTsKICAgICAgICB4LnN0cmluZyA9IG5hbWU7CiAgICAgICAgeC5udWQgPSByZXR1cm5fdGhpczsKICAgICAgICByZXR1cm4geDsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVzZXJ2ZXZhcihzLCB2KSB7CiAgICAgICAgcmV0dXJuIHJlc2VydmUocywgZnVuY3Rpb24gKCkgewogICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgICAgIHYodGhpcyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRoaXM7CiAgICAgICAgfSk7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGluZml4KHMsIHAsIGYsIHR5cGUsIHcpIHsKICAgICAgICB2YXIgeCA9IHN5bWJvbChzLCBwKTsKICAgICAgICByZXNlcnZlX25hbWUoeCk7CiAgICAgICAgeC5sZWQgPSBmdW5jdGlvbiAobGVmdCkgewogICAgICAgICAgICB0aGlzLmFyaXR5ID0gJ2luZml4JzsKICAgICAgICAgICAgaWYgKCF3KSB7CiAgICAgICAgICAgICAgICBzcGFjZXMocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCFvcHRpb24uYml0d2lzZSAmJiB0aGlzLmJpdHdpc2UpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHRoaXMpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICh0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJykgewogICAgICAgICAgICAgICAgcmV0dXJuIGYobGVmdCwgdGhpcyk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gbGVmdDsKICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gZXhwcmVzc2lvbihwKTsKICAgICAgICAgICAgICAgIHJldHVybiB0aGlzOwogICAgICAgICAgICB9CiAgICAgICAgfTsKICAgICAgICBpZiAodHlwZSkgewogICAgICAgICAgICB4LnR5cGUgPSB0eXBlOwogICAgICAgIH0KICAgICAgICByZXR1cm4geDsKICAgIH0KCiAgICBmdW5jdGlvbiBleHBlY3RlZF9yZWxhdGlvbihub2RlLCBtZXNzYWdlKSB7CiAgICAgICAgaWYgKG5vZGUuYXNzaWduKSB7CiAgICAgICAgICAgIHdhcm4obWVzc2FnZSB8fCBidW5kbGUuY29uZGl0aW9uYWxfYXNzaWdubWVudCwgbm9kZSk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBub2RlOwogICAgfQoKICAgIGZ1bmN0aW9uIGV4cGVjdGVkX2NvbmRpdGlvbihub2RlLCBtZXNzYWdlKSB7CiAgICAgICAgc3dpdGNoIChub2RlLmlkKSB7CiAgICAgICAgY2FzZSAnWyc6CiAgICAgICAgY2FzZSAnLSc6CiAgICAgICAgICAgIGlmIChub2RlLmFyaXR5ICE9PSAnaW5maXgnKSB7CiAgICAgICAgICAgICAgICB3YXJuKG1lc3NhZ2UgfHwgYnVuZGxlLndlaXJkX2NvbmRpdGlvbiwgbm9kZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnZmFsc2UnOgogICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICBjYXNlICdJbmZpbml0eSc6CiAgICAgICAgY2FzZSAnTmFOJzoKICAgICAgICBjYXNlICdudWxsJzoKICAgICAgICBjYXNlICd0cnVlJzoKICAgICAgICBjYXNlICd1bmRlZmluZWQnOgogICAgICAgIGNhc2UgJ3ZvaWQnOgogICAgICAgIGNhc2UgJyhudW1iZXIpJzoKICAgICAgICBjYXNlICcocmVnZXhwKSc6CiAgICAgICAgY2FzZSAnKHN0cmluZyknOgogICAgICAgIGNhc2UgJ3snOgogICAgICAgICAgICB3YXJuKG1lc3NhZ2UgfHwgYnVuZGxlLndlaXJkX2NvbmRpdGlvbiwgbm9kZSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJygnOgogICAgICAgICAgICBpZiAobm9kZS5maXJzdC5pZCA9PT0gJy4nICYmIG51bWJlcnlbbm9kZS5maXJzdC5zZWNvbmQuc3RyaW5nXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgd2FybihtZXNzYWdlIHx8IGJ1bmRsZS53ZWlyZF9jb25kaXRpb24sIG5vZGUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbm9kZTsKICAgIH0KCiAgICBmdW5jdGlvbiBjaGVja19yZWxhdGlvbihub2RlKSB7CiAgICAgICAgc3dpdGNoIChub2RlLmFyaXR5KSB7CiAgICAgICAgY2FzZSAncHJlZml4JzoKICAgICAgICAgICAgc3dpdGNoIChub2RlLmlkKSB7CiAgICAgICAgICAgIGNhc2UgJ3snOgogICAgICAgICAgICBjYXNlICdbJzoKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5vZGUpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJyEnOgogICAgICAgICAgICAgICAgd2FybignY29uZnVzaW5nX2EnLCBub2RlKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICBjYXNlICdyZWdleHAnOgogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBub2RlKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgaWYgKG5vZGUuaWQgID09PSAnTmFOJykgewogICAgICAgICAgICAgICAgd2FybignaXNuYW4nLCBub2RlKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gbm9kZTsKICAgIH0KCgogICAgZnVuY3Rpb24gcmVsYXRpb24ocywgZXFlcSkgewogICAgICAgIHJldHVybiBpbmZpeChzLCAxMDAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgICAgIGNoZWNrX3JlbGF0aW9uKGxlZnQpOwogICAgICAgICAgICBpZiAoZXFlcSAmJiAhb3B0aW9uLmVxZXEpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIHRoYXQsIGVxZXEsIHRoYXQuaWQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTAwKTsKICAgICAgICAgICAgaWYgKGFyZV9zaW1pbGFyKGxlZnQsIHJpZ2h0KSB8fAogICAgICAgICAgICAgICAgICAgICgobGVmdC5pZCA9PT0gJyhzdHJpbmcpJyB8fCBsZWZ0LmlkID09PSAnKG51bWJlciknKSAmJgogICAgICAgICAgICAgICAgICAgIChyaWdodC5pZCA9PT0gJyhzdHJpbmcpJyB8fCByaWdodC5pZCA9PT0gJyhudW1iZXIpJykpKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd3ZWlyZF9yZWxhdGlvbicsIHRoYXQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgICAgICB0aGF0LnNlY29uZCA9IGNoZWNrX3JlbGF0aW9uKHJpZ2h0KTsKICAgICAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICAgICAgfSwgJ2Jvb2xlYW4nKTsKICAgIH0KCgogICAgZnVuY3Rpb24gYXNzaWdub3Aocywgb3ApIHsKICAgICAgICB2YXIgeCA9IGluZml4KHMsIDIwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgICAgICB2YXIgbDsKICAgICAgICAgICAgdGhhdC5maXJzdCA9IGxlZnQ7CiAgICAgICAgICAgIGlmIChsZWZ0LmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIGlmIChzY29wZVtsZWZ0LnN0cmluZ10pIHsKICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGVbbGVmdC5zdHJpbmddLndyaXRlYWJsZSA9PT0gZmFsc2UpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigncmVhZF9vbmx5JywgbGVmdCk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdyZWFkX29ubHknKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICAgICAgbCA9IGxlZnQ7CiAgICAgICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVkZWZpbmVkW2wuc3RyaW5nXSA9PT0gJ2Jvb2xlYW4nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmNvbW1vbmpzIHx8IHR5cGVvZiBjb21tb25qc1tsLnN0cmluZ10gIT09ICJib29sZWFuIikgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCBsKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBsID0gbC5maXJzdDsKICAgICAgICAgICAgICAgIH0gd2hpbGUgKGwpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChsZWZ0ID09PSBzeW50YXhbJ2Z1bmN0aW9uJ10pIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2lkZW50aWZpZXJfZnVuY3Rpb24nLCB0b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGxlZnQuaWQgPT09ICcuJyB8fCBsZWZ0LmlkID09PSAnWycpIHsKICAgICAgICAgICAgICAgIGlmICghbGVmdC5maXJzdCB8fCBsZWZ0LmZpcnN0LnN0cmluZyA9PT0gJ2FyZ3VtZW50cycpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdiYWRfYXNzaWdubWVudCcsIHRoYXQpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQuaWRlbnRpZmllciAmJiAhbGVmdC5yZXNlcnZlZCkgewogICAgICAgICAgICAgICAgaWYgKGZ1bmN0W2xlZnQuc3RyaW5nXSA9PT0gJ2V4Y2VwdGlvbicpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdhc3NpZ25fZXhjZXB0aW9uJywgbGVmdCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhhdC5zZWNvbmQgPSBleHByZXNzaW9uKDE5KTsKICAgICAgICAgICAgaWYgKHRoYXQuaWQgPT09ICc9JyAmJiBhcmVfc2ltaWxhcih0aGF0LmZpcnN0LCB0aGF0LnNlY29uZCkpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3dlaXJkX2Fzc2lnbm1lbnQnLCB0aGF0KTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdGhhdDsKICAgICAgICB9KTsKICAgICAgICB4LmFzc2lnbiA9IHRydWU7CiAgICAgICAgaWYgKG9wKSB7CiAgICAgICAgICAgIGlmIChzeW50YXhbb3BdLnR5cGUpIHsKICAgICAgICAgICAgICAgIHgudHlwZSA9IHN5bnRheFtvcF0udHlwZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoc3ludGF4W29wXS5iaXR3aXNlKSB7CiAgICAgICAgICAgICAgICB4LmJpdHdpc2UgPSB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiB4OwogICAgfQoKCiAgICBmdW5jdGlvbiBiaXR3aXNlKHMsIHApIHsKICAgICAgICB2YXIgeCA9IGluZml4KHMsIHAsICdudW1iZXInKTsKICAgICAgICB4LmJpdHdpc2UgPSB0cnVlOwogICAgICAgIHJldHVybiB4OwogICAgfQoKCiAgICBmdW5jdGlvbiBzdWZmaXgocykgewogICAgICAgIHZhciB4ID0gc3ltYm9sKHMsIDE1MCk7CiAgICAgICAgeC5sZWQgPSBmdW5jdGlvbiAobGVmdCkgewogICAgICAgICAgICBub19zcGFjZV9vbmx5KHByZXZfdG9rZW4sIHRva2VuKTsKICAgICAgICAgICAgaWYgKCFvcHRpb24ucGx1c3BsdXMpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHRoaXMpOwogICAgICAgICAgICB9IGVsc2UgaWYgKCghbGVmdC5pZGVudGlmaWVyIHx8IGxlZnQucmVzZXJ2ZWQpICYmCiAgICAgICAgICAgICAgICAgICAgbGVmdC5pZCAhPT0gJy4nICYmIGxlZnQuaWQgIT09ICdbJykgewogICAgICAgICAgICAgICAgd2FybignYmFkX29wZXJhbmQnLCB0aGlzKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB0aGlzLmZpcnN0ID0gbGVmdDsKICAgICAgICAgICAgdGhpcy5hcml0eSA9ICdzdWZmaXgnOwogICAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICB9OwogICAgICAgIHJldHVybiB4OwogICAgfQoKCiAgICBmdW5jdGlvbiBvcHRpb25hbF9pZGVudGlmaWVyKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAob3B0aW9uLnNhZmUgJiYgYmFubmVkW3Rva2VuLnN0cmluZ10pIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdG9rZW4pOwogICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnJlc2VydmVkICYmICFvcHRpb24uZXM1KSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9pZGVudGlmaWVyX2FfcmVzZXJ2ZWQnLCB0b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRva2VuLnN0cmluZzsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGlkZW50aWZpZXIoKSB7CiAgICAgICAgdmFyIGkgPSBvcHRpb25hbF9pZGVudGlmaWVyKCk7CiAgICAgICAgaWYgKCFpKSB7CiAgICAgICAgICAgIHN0b3AodG9rZW4uaWQgPT09ICdmdW5jdGlvbicgJiYgbmV4dF90b2tlbi5pZCA9PT0gJygnCiAgICAgICAgICAgICAgICA/ICduYW1lX2Z1bmN0aW9uJwogICAgICAgICAgICAgICAgOiAnZXhwZWN0ZWRfaWRlbnRpZmllcl9hJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBpOwogICAgfQoKCiAgICBmdW5jdGlvbiBzdGF0ZW1lbnQoKSB7CgogICAgICAgIHZhciBsYWJlbCwgb2xkX3Njb3BlID0gc2NvcGUsIHRoZV9zdGF0ZW1lbnQ7CgovLyBXZSBkb24ndCBsaWtlIHRoZSBlbXB0eSBzdGF0ZW1lbnQuCgogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOycpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJyk7CiAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgfQoKLy8gSXMgdGhpcyBhIGxhYmVsZWQgc3RhdGVtZW50PwoKICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmICFuZXh0X3Rva2VuLnJlc2VydmVkICYmIHBlZWsoKS5pZCA9PT0gJzonKSB7CiAgICAgICAgICAgIGVkZ2UoJ2xhYmVsJyk7CiAgICAgICAgICAgIGxhYmVsID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgIHNjb3BlID0gT2JqZWN0LmNyZWF0ZShvbGRfc2NvcGUpOwogICAgICAgICAgICBhZGRfbGFiZWwobGFiZWwsICdsYWJlbCcpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5sYWJlbGVkICE9PSB0cnVlKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdsYWJlbF9hX2InLCBuZXh0X3Rva2VuLCBsYWJlbC5zdHJpbmcsIGFydGlmYWN0KCkpOwogICAgICAgICAgICB9IGVsc2UgaWYgKGp4LnRlc3QobGFiZWwuc3RyaW5nICsgJzonKSkgewogICAgICAgICAgICAgICAgd2FybigndXJsJywgbGFiZWwpOwogICAgICAgICAgICB9IGVsc2UgaWYgKGZ1bmN0ID09PSBnbG9iYWxfZnVuY3QpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBuZXh0X3Rva2VuLmxhYmVsID0gbGFiZWw7CiAgICAgICAgfQoKLy8gUGFyc2UgdGhlIHN0YXRlbWVudC4KCiAgICAgICAgZWRnZSgpOwogICAgICAgIHN0ZXBfaW4oJ3N0YXRlbWVudCcpOwogICAgICAgIHRoZV9zdGF0ZW1lbnQgPSBleHByZXNzaW9uKDAsIHRydWUpOwogICAgICAgIGlmICh0aGVfc3RhdGVtZW50KSB7CgovLyBMb29rIGZvciB0aGUgZmluYWwgc2VtaWNvbG9uLgoKICAgICAgICAgICAgaWYgKHRoZV9zdGF0ZW1lbnQuYXJpdHkgPT09ICdzdGF0ZW1lbnQnKSB7CiAgICAgICAgICAgICAgICBpZiAodGhlX3N0YXRlbWVudC5pZCA9PT0gJ3N3aXRjaCcgfHwKICAgICAgICAgICAgICAgICAgICAgICAgKHRoZV9zdGF0ZW1lbnQuYmxvY2sgJiYgdGhlX3N0YXRlbWVudC5pZCAhPT0gJ2RvJykpIHsKICAgICAgICAgICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CgovLyBJZiB0aGlzIGlzIGFuIGV4cHJlc3Npb24gc3RhdGVtZW50LCBkZXRlcm1pbmUgaWYgaXQgaXMgYWNjZXB0YWJsZS4KLy8gV2UgZG8gbm90IGxpa2UKLy8gICAgICBuZXcgQmxhaCgpOwovLyBzdGF0bWVudHMuIElmIGl0IGlzIHRvIGJlIHVzZWQgYXQgYWxsLCBuZXcgc2hvdWxkIG9ubHkgYmUgdXNlZCB0byBtYWtlCi8vIG9iamVjdHMsIG5vdCBzaWRlIGVmZmVjdHMuIFRoZSBleHByZXNzaW9uIHN0YXRlbWVudHMgd2UgZG8gbGlrZSBkbwovLyBhc3NpZ25tZW50IG9yIGludm9jYXRpb24gb3IgZGVsZXRlLgoKICAgICAgICAgICAgICAgIGlmICh0aGVfc3RhdGVtZW50LmlkID09PSAnKCcpIHsKICAgICAgICAgICAgICAgICAgICBpZiAodGhlX3N0YXRlbWVudC5maXJzdC5pZCA9PT0gJ25ldycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYmFkX25ldycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoZV9zdGF0ZW1lbnQuYXNzaWduICYmCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZV9zdGF0ZW1lbnQuaWQgIT09ICdkZWxldGUnICYmCiAgICAgICAgICAgICAgICAgICAgICAgIHRoZV9zdGF0ZW1lbnQuaWQgIT09ICcrKycgJiYKICAgICAgICAgICAgICAgICAgICAgICAgdGhlX3N0YXRlbWVudC5pZCAhPT0gJy0tJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fzc2lnbm1lbnRfZnVuY3Rpb25fZXhwcmVzc2lvbicsIHRva2VuKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHN0ZXBfb3V0KCk7CiAgICAgICAgc2NvcGUgPSBvbGRfc2NvcGU7CiAgICAgICAgcmV0dXJuIHRoZV9zdGF0ZW1lbnQ7CiAgICB9CgoKICAgIGZ1bmN0aW9uIHN0YXRlbWVudHMoKSB7CiAgICAgICAgdmFyIGFycmF5ID0gW10sIGRpc3J1cHRvciwgdGhlX3N0YXRlbWVudDsKCi8vIEEgZGlzcnVwdCBzdGF0ZW1lbnQgbWF5IG5vdCBiZSBmb2xsb3dlZCBieSBhbnkgb3RoZXIgc3RhdGVtZW50LgovLyBJZiB0aGUgbGFzdCBzdGF0ZW1lbnQgaXMgZGlzcnVwdCwgdGhlbiB0aGUgc2VxdWVuY2UgaXMgZGlzcnVwdC4KCiAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4ucG9zdHNjcmlwdCAhPT0gdHJ1ZSkgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzsnKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uc3RyaW5nID09PSAndXNlIHN0cmljdCcpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoKCFub2RlX2pzICYmIHhtb2RlICE9PSAnc2NyaXB0JykgfHwgZnVuY3QgIT09IGdsb2JhbF9mdW5jdCB8fCBhcnJheS5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Z1bmN0aW9uX3N0cmljdCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB1c2Vfc3RyaWN0KCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoZGlzcnVwdG9yKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybigndW5yZWFjaGFibGVfYV9iJywgbmV4dF90b2tlbiwgbmV4dF90b2tlbi5zdHJpbmcsCiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3J1cHRvci5zdHJpbmcpOwogICAgICAgICAgICAgICAgICAgIGRpc3J1cHRvciA9IG51bGw7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB0aGVfc3RhdGVtZW50ID0gc3RhdGVtZW50KCk7CiAgICAgICAgICAgICAgICBpZiAodGhlX3N0YXRlbWVudCkgewogICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2godGhlX3N0YXRlbWVudCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZV9zdGF0ZW1lbnQuZGlzcnVwdCkgewogICAgICAgICAgICAgICAgICAgICAgICBkaXNydXB0b3IgPSB0aGVfc3RhdGVtZW50OwogICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5kaXNydXB0ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIGFycmF5OwogICAgfQoKCiAgICBmdW5jdGlvbiBibG9jayhvcmRpbmFyeSkgewoKLy8gYXJyYXkgYmxvY2sgaXMgYXJyYXkgc2VxdWVuY2Ugb2Ygc3RhdGVtZW50cyB3cmFwcGVkIGluIGJyYWNlcy4KLy8gb3JkaW5hcnkgaXMgZmFsc2UgZm9yIGZ1bmN0aW9uIGJvZGllcyBhbmQgdHJ5IGJsb2Nrcy4KLy8gb3JkaW5hcnkgaXMgdHJ1ZSBmb3IgaWYgc3RhdGVtZW50cywgd2hpbGUsIGV0Yy4KCiAgICAgICAgdmFyIGFycmF5LAogICAgICAgICAgICBjdXJseSA9IG5leHRfdG9rZW4sCiAgICAgICAgICAgIG9sZF9pbl9ibG9jayA9IGluX2Jsb2NrLAogICAgICAgICAgICBvbGRfc2NvcGUgPSBzY29wZSwKICAgICAgICAgICAgb2xkX3N0cmljdF9tb2RlID0gc3RyaWN0X21vZGU7CgogICAgICAgIGluX2Jsb2NrID0gb3JkaW5hcnk7CiAgICAgICAgc2NvcGUgPSBPYmplY3QuY3JlYXRlKHNjb3BlKTsKICAgICAgICBzcGFjZXMoKTsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ3snKSB7CiAgICAgICAgICAgIGFkdmFuY2UoJ3snKTsKICAgICAgICAgICAgc3RlcF9pbigpOwogICAgICAgICAgICBpZiAoIW9yZGluYXJ5ICYmICF1c2Vfc3RyaWN0KCkgJiYgIW9sZF9zdHJpY3RfbW9kZSAmJgogICAgICAgICAgICAgICAgICAgICFvcHRpb24uc2xvcHB5ICYmIGZ1bmN0WycoY29udGV4dCknXSA9PT0gZ2xvYmFsX2Z1bmN0KSB7CiAgICAgICAgICAgICAgICB3YXJuKCdtaXNzaW5nX3VzZV9zdHJpY3QnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhcnJheSA9IHN0YXRlbWVudHMoKTsKICAgICAgICAgICAgc3RyaWN0X21vZGUgPSBvbGRfc3RyaWN0X21vZGU7CiAgICAgICAgICAgIHN0ZXBfb3V0KCd9JywgY3VybHkpOwogICAgICAgIH0gZWxzZSBpZiAoIW9yZGluYXJ5KSB7CiAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICd7JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJ3snLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgYXJyYXkgPSBbc3RhdGVtZW50KCldOwogICAgICAgICAgICBhcnJheS5kaXNydXB0ID0gYXJyYXlbMF0uZGlzcnVwdDsKICAgICAgICB9CiAgICAgICAgZnVuY3RbJyh2ZXJiKSddID0gbnVsbDsKICAgICAgICBzY29wZSA9IG9sZF9zY29wZTsKICAgICAgICBpbl9ibG9jayA9IG9sZF9pbl9ibG9jazsKICAgICAgICBpZiAob3JkaW5hcnkgJiYgYXJyYXkubGVuZ3RoID09PSAwKSB7CiAgICAgICAgICAgIHdhcm4oJ2VtcHR5X2Jsb2NrJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBhcnJheTsKICAgIH0KCgogICAgZnVuY3Rpb24gdGFsbHlfcHJvcGVydHkobmFtZSkgewogICAgICAgIGlmIChvcHRpb24ucHJvcGVydGllcyAmJiB0eXBlb2YgcHJvcGVydHlfdHlwZVtuYW1lXSAhPT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9wcm9wZXJ0eV9hJywgdG9rZW4sIG5hbWUpOwogICAgICAgIH0KICAgICAgICBpZiAodHlwZW9mIG1lbWJlcltuYW1lXSA9PT0gJ251bWJlcicpIHsKICAgICAgICAgICAgbWVtYmVyW25hbWVdICs9IDE7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgbWVtYmVyW25hbWVdID0gMTsKICAgICAgICB9CiAgICB9CgoKLy8gRUNNQVNjcmlwdCBwYXJzZXIKCiAgICBzeW50YXhbJyhpZGVudGlmaWVyKSddID0gewogICAgICAgIGlkOiAnKGlkZW50aWZpZXIpJywKICAgICAgICBsYnA6IDAsCiAgICAgICAgaWRlbnRpZmllcjogdHJ1ZSwKICAgICAgICBudWQ6IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnN0cmluZywKICAgICAgICAgICAgICAgIHZhcmlhYmxlID0gc2NvcGVbbmFtZV0sCiAgICAgICAgICAgICAgICBzaXRlLAogICAgICAgICAgICAgICAgd3JpdGVhYmxlOwoKLy8gSWYgdGhlIHZhcmlhYmxlIGlzIG5vdCBpbiBzY29wZSwgdGhlbiB3ZSBtYXkgaGF2ZSBhbiB1bmRlY2xhcmVkIHZhcmlhYmxlLgovLyBDaGVjayB0aGUgcHJlZGVmaW5lZCBsaXN0LiBJZiBpdCB3YXMgcHJlZGVmaW5lZCwgY3JlYXRlIHRoZSBnbG9iYWwKLy8gdmFyaWFibGUuCgogICAgICAgICAgICBpZiAodHlwZW9mIHZhcmlhYmxlICE9PSAnb2JqZWN0JykgewogICAgICAgICAgICAgICAgd3JpdGVhYmxlID0gcHJlZGVmaW5lZFtuYW1lXTsKICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd3JpdGVhYmxlID09PSAnYm9vbGVhbicpIHsKICAgICAgICAgICAgICAgICAgICBnbG9iYWxfc2NvcGVbbmFtZV0gPSB2YXJpYWJsZSA9IHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiAgICBuYW1lLAogICAgICAgICAgICAgICAgICAgICAgICB3cml0ZWFibGU6IHdyaXRlYWJsZSwKICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Q6ICAgICBnbG9iYWxfZnVuY3QKICAgICAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgICAgIGdsb2JhbF9mdW5jdFtuYW1lXSA9ICd2YXInOwoKLy8gQnV0IGlmIHRoZSB2YXJpYWJsZSBpcyBub3QgaW4gc2NvcGUsIGFuZCBpcyBub3QgcHJlZGVmaW5lZCwgYW5kIGlmIHdlIGFyZSBub3QKLy8gaW4gdGhlIGdsb2JhbCBzY29wZSwgdGhlbiB3ZSBoYXZlIGFuIHVuZGVmaW5lZCB2YXJpYWJsZSBlcnJvci4KCiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLnVuZGVmKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VzZWRfYmVmb3JlX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHNjb3BlW25hbWVdID0gdmFyaWFibGUgPSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZzogbmFtZSwKICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVhYmxlOiB0cnVlLAogICAgICAgICAgICAgICAgICAgICAgICBmdW5jdDogZnVuY3QKICAgICAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgICAgIGZ1bmN0W25hbWVdID0gJ3VuZGVmJzsKICAgICAgICAgICAgICAgIH0KCiAgICAgICAgICAgIH0KICAgICAgICAgICAgc2l0ZSA9IHZhcmlhYmxlLmZ1bmN0OwoKLy8gVGhlIG5hbWUgaXMgaW4gc2NvcGUgYW5kIGRlZmluZWQgaW4gdGhlIGN1cnJlbnQgZnVuY3Rpb24uCgogICAgICAgICAgICBpZiAoZnVuY3QgPT09IHNpdGUpIHsKCi8vICAgICAgQ2hhbmdlICd1bnVzZWQnIHRvICd2YXInLCBhbmQgcmVqZWN0IGxhYmVscy4KCiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZ1bmN0W25hbWVdKSB7CiAgICAgICAgICAgICAgICBjYXNlICdiZWNvbWluZyc6CiAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIGZ1bmN0W25hbWVdID0gJ3Zhcic7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICd1bnVzZWQnOgogICAgICAgICAgICAgICAgICAgIGZ1bmN0W25hbWVdID0gJ3Zhcic7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICd1bnBhcmFtJzoKICAgICAgICAgICAgICAgICAgICBmdW5jdFtuYW1lXSA9ICdwYXJhbWV0ZXInOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAndW5jdGlvbic6CiAgICAgICAgICAgICAgICAgICAgZnVuY3RbbmFtZV0gPSAnZnVuY3Rpb24nOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnbGFiZWwnOgogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2FfbGFiZWwnLCB0b2tlbiwgbmFtZSk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CgovLyBJZiB0aGUgbmFtZSBpcyBhbHJlYWR5IGRlZmluZWQgaW4gdGhlIGN1cnJlbnQKLy8gZnVuY3Rpb24sIGJ1dCBub3QgYXMgb3V0ZXIsIHRoZW4gdGhlcmUgaXMgYSBzY29wZSBlcnJvci4KCiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZ1bmN0W25hbWVdKSB7CiAgICAgICAgICAgICAgICBjYXNlICdjbG9zdXJlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoKICAgICAgICAgICAgICAgIGNhc2UgJ3Zhcic6CiAgICAgICAgICAgICAgICBjYXNlICd1bnVzZWQnOgogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Ffc2NvcGUnLCB0b2tlbiwgbmFtZSk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdsYWJlbCc6CiAgICAgICAgICAgICAgICAgICAgd2FybignYV9sYWJlbCcsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ291dGVyJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2dsb2JhbCc6CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBkZWZhdWx0OgoKLy8gSWYgdGhlIG5hbWUgaXMgZGVmaW5lZCBpbiBhbiBvdXRlciBmdW5jdGlvbiwgbWFrZSBhbiBvdXRlciBlbnRyeSwgYW5kIGlmCi8vIGl0IHdhcyB1bnVzZWQsIG1ha2UgaXQgdmFyLgoKICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNpdGVbbmFtZV0pIHsKICAgICAgICAgICAgICAgICAgICBjYXNlICdiZWNvbWluZyc6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2xvc3VyZSc6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOgogICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhcmFtZXRlcic6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5jdGlvbic6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAndW51c2VkJzoKICAgICAgICAgICAgICAgICAgICBjYXNlICd2YXInOgogICAgICAgICAgICAgICAgICAgICAgICBzaXRlW25hbWVdID0gJ2Nsb3N1cmUnOwogICAgICAgICAgICAgICAgICAgICAgICBmdW5jdFtuYW1lXSA9IHNpdGUgPT09IGdsb2JhbF9mdW5jdAogICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnZ2xvYmFsJwogICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnb3V0ZXInOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICd1bnBhcmFtJzoKICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZVtuYW1lXSA9ICdwYXJhbWV0ZXInOwogICAgICAgICAgICAgICAgICAgICAgICBmdW5jdFtuYW1lXSA9ICdvdXRlcic7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VuZGVmJzoKICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3RbbmFtZV0gPSAndW5kZWYnOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICdsYWJlbCc6CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2FfbGFiZWwnLCB0b2tlbiwgbmFtZSk7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICB9LAogICAgICAgIGxlZDogZnVuY3Rpb24gKCkgewogICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9vcGVyYXRvcl9hJyk7CiAgICAgICAgfQogICAgfTsKCi8vIEJ1aWxkIHRoZSBzeW50YXggdGFibGUgYnkgZGVjbGFyaW5nIHRoZSBzeW50YWN0aWMgZWxlbWVudHMuCgogICAgdHlwZSgnKGFycmF5KScsICdhcnJheScpOwogICAgdHlwZSgnKGNvbG9yKScsICdjb2xvcicpOwogICAgdHlwZSgnKGZ1bmN0aW9uKScsICdmdW5jdGlvbicpOwogICAgdHlwZSgnKG51bWJlciknLCAnbnVtYmVyJywgcmV0dXJuX3RoaXMpOwogICAgdHlwZSgnKG9iamVjdCknLCAnb2JqZWN0Jyk7CiAgICB0eXBlKCcoc3RyaW5nKScsICdzdHJpbmcnLCByZXR1cm5fdGhpcyk7CiAgICB0eXBlKCcoYm9vbGVhbiknLCAnYm9vbGVhbicsIHJldHVybl90aGlzKTsKICAgIHR5cGUoJyhyYW5nZSknLCAncmFuZ2UnKTsKICAgIHR5cGUoJyhyZWdleHApJywgJ3JlZ2V4cCcsIHJldHVybl90aGlzKTsKCiAgICB1bHRpbWF0ZSgnKGJlZ2luKScpOwogICAgdWx0aW1hdGUoJyhlbmQpJyk7CiAgICB1bHRpbWF0ZSgnKGVycm9yKScpOwogICAgcG9zdHNjcmlwdChzeW1ib2woJzwvJykpOwogICAgc3ltYm9sKCc8IScpOwogICAgc3ltYm9sKCc8IS0tJyk7CiAgICBzeW1ib2woJy0tPicpOwogICAgcG9zdHNjcmlwdChzeW1ib2woJ30nKSk7CiAgICBzeW1ib2woJyknKTsKICAgIHN5bWJvbCgnXScpOwogICAgcG9zdHNjcmlwdChzeW1ib2woJyInKSk7CiAgICBwb3N0c2NyaXB0KHN5bWJvbCgnXCcnKSk7CiAgICBzeW1ib2woJzsnKTsKICAgIHN5bWJvbCgnOicpOwogICAgc3ltYm9sKCcsJyk7CiAgICBzeW1ib2woJyMnKTsKICAgIHN5bWJvbCgnQCcpOwogICAgc3ltYm9sKCcqLycpOwogICAgcG9zdHNjcmlwdChyZXNlcnZlKCdjYXNlJykpOwogICAgcmVzZXJ2ZSgnY2F0Y2gnKTsKICAgIHBvc3RzY3JpcHQocmVzZXJ2ZSgnZGVmYXVsdCcpKTsKICAgIHJlc2VydmUoJ2Vsc2UnKTsKICAgIHJlc2VydmUoJ2ZpbmFsbHknKTsKCiAgICByZXNlcnZldmFyKCdhcmd1bWVudHMnLCBmdW5jdGlvbiAoeCkgewogICAgICAgIGlmIChzdHJpY3RfbW9kZSAmJiBmdW5jdCA9PT0gZ2xvYmFsX2Z1bmN0KSB7CiAgICAgICAgICAgIHdhcm4oJ3N0cmljdCcsIHgpOwogICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB4KTsKICAgICAgICB9CiAgICB9KTsKICAgIHJlc2VydmV2YXIoJ2V2YWwnLCBmdW5jdGlvbiAoeCkgewogICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICB3YXJuKCdhZHNhZmVfYScsIHgpOwogICAgICAgIH0KICAgIH0pOwogICAgY29uc3RhbnQoJ2ZhbHNlJywgJ2Jvb2xlYW4nKTsKICAgIGNvbnN0YW50KCdJbmZpbml0eScsICdudW1iZXInKTsKICAgIGNvbnN0YW50KCdOYU4nLCAnbnVtYmVyJyk7CiAgICBjb25zdGFudCgnbnVsbCcsICcnKTsKICAgIHJlc2VydmV2YXIoJ3RoaXMnLCBmdW5jdGlvbiAoeCkgewogICAgICAgIGlmIChvcHRpb24uc2FmZSkgewogICAgICAgICAgICB3YXJuKCdhZHNhZmVfYScsIHgpOwogICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0X21vZGUgJiYgZnVuY3RbJyh0b2tlbiknXS5hcml0eSA9PT0gJ3N0YXRlbWVudCcgJiYKICAgICAgICAgICAgICAgIGZ1bmN0WycobmFtZSknXS5jaGFyQXQoMCkgPiAnWicpIHsKICAgICAgICAgICAgd2Fybignc3RyaWN0JywgeCk7CiAgICAgICAgfQogICAgfSk7CiAgICBjb25zdGFudCgndHJ1ZScsICdib29sZWFuJyk7CiAgICBjb25zdGFudCgndW5kZWZpbmVkJywgJycpOwoKICAgIGluZml4KCc/JywgMzAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgc3RlcF9pbignPycpOwogICAgICAgIHRoYXQuZmlyc3QgPSBleHBlY3RlZF9jb25kaXRpb24oZXhwZWN0ZWRfcmVsYXRpb24obGVmdCkpOwogICAgICAgIHRoYXQuc2Vjb25kID0gZXhwcmVzc2lvbigwKTsKICAgICAgICBzcGFjZXMoKTsKICAgICAgICBzdGVwX291dCgpOwogICAgICAgIHZhciBjb2xvbiA9IG5leHRfdG9rZW47CiAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgIHN0ZXBfaW4oJzonKTsKICAgICAgICBzcGFjZXMoKTsKICAgICAgICB0aGF0LnRoaXJkID0gZXhwcmVzc2lvbigxMCk7CiAgICAgICAgdGhhdC5hcml0eSA9ICd0ZXJuYXJ5JzsKICAgICAgICBpZiAoYXJlX3NpbWlsYXIodGhhdC5zZWNvbmQsIHRoYXQudGhpcmQpKSB7CiAgICAgICAgICAgIHdhcm4oJ3dlaXJkX3Rlcm5hcnknLCBjb2xvbik7CiAgICAgICAgfSBlbHNlIGlmIChhcmVfc2ltaWxhcih0aGF0LmZpcnN0LCB0aGF0LnNlY29uZCkpIHsKICAgICAgICAgICAgd2FybigndXNlX29yJywgdGhhdCk7CiAgICAgICAgfQogICAgICAgIHN0ZXBfb3V0KCk7CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9KTsKCiAgICBpbmZpeCgnfHwnLCA0MCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBmdW5jdGlvbiBwYXJlbl9jaGVjayh0aGF0KSB7CiAgICAgICAgICAgIGlmICh0aGF0LmlkID09PSAnJiYnICYmICF0aGF0LnBhcmVuKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdhbmQnLCB0aGF0KTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdGhhdDsKICAgICAgICB9CgogICAgICAgIHRoYXQuZmlyc3QgPSBwYXJlbl9jaGVjayhleHBlY3RlZF9jb25kaXRpb24oZXhwZWN0ZWRfcmVsYXRpb24obGVmdCkpKTsKICAgICAgICB0aGF0LnNlY29uZCA9IHBhcmVuX2NoZWNrKGV4cGVjdGVkX3JlbGF0aW9uKGV4cHJlc3Npb24oNDApKSk7CiAgICAgICAgaWYgKGFyZV9zaW1pbGFyKHRoYXQuZmlyc3QsIHRoYXQuc2Vjb25kKSkgewogICAgICAgICAgICB3YXJuKCd3ZWlyZF9jb25kaXRpb24nLCB0aGF0KTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9KTsKCiAgICBpbmZpeCgnJiYnLCA1MCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICB0aGF0LmZpcnN0ID0gZXhwZWN0ZWRfY29uZGl0aW9uKGV4cGVjdGVkX3JlbGF0aW9uKGxlZnQpKTsKICAgICAgICB0aGF0LnNlY29uZCA9IGV4cGVjdGVkX3JlbGF0aW9uKGV4cHJlc3Npb24oNTApKTsKICAgICAgICBpZiAoYXJlX3NpbWlsYXIodGhhdC5maXJzdCwgdGhhdC5zZWNvbmQpKSB7CiAgICAgICAgICAgIHdhcm4oJ3dlaXJkX2NvbmRpdGlvbicsIHRoYXQpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0pOwoKICAgIHByZWZpeCgndm9pZCcsIGZ1bmN0aW9uICgpIHsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwcmVzc2lvbigwKTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3ByZWZpeCc7CiAgICAgICAgaWYgKG9wdGlvbi5lczUpIHsKICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywgdGhpcywgJ3VuZGVmaW5lZCcsICd2b2lkJyk7CiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpcnN0Lm51bWJlciAhPT0gMCkgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCB0aGlzLmZpcnN0LCAnMCcsIGFydGlmYWN0KHRoaXMuZmlyc3QpKTsKICAgICAgICB9CiAgICAgICAgdGhpcy50eXBlID0gJ3VuZGVmaW5lZCc7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBiaXR3aXNlKCd8JywgNzApOwogICAgYml0d2lzZSgnXicsIDgwKTsKICAgIGJpdHdpc2UoJyYnLCA5MCk7CgogICAgcmVsYXRpb24oJz09JywgJz09PScpOwogICAgcmVsYXRpb24oJz09PScpOwogICAgcmVsYXRpb24oJyE9JywgJyE9PScpOwogICAgcmVsYXRpb24oJyE9PScpOwogICAgcmVsYXRpb24oJzwnKTsKICAgIHJlbGF0aW9uKCc+Jyk7CiAgICByZWxhdGlvbignPD0nKTsKICAgIHJlbGF0aW9uKCc+PScpOwoKICAgIGJpdHdpc2UoJzw8JywgMTIwKTsKICAgIGJpdHdpc2UoJz4+JywgMTIwKTsKICAgIGJpdHdpc2UoJz4+PicsIDEyMCk7CgogICAgaW5maXgoJ2luJywgMTIwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgIHdhcm4oJ2luZml4X2luJywgdGhhdCk7CiAgICAgICAgdGhhdC5sZWZ0ID0gbGVmdDsKICAgICAgICB0aGF0LnJpZ2h0ID0gZXhwcmVzc2lvbigxMzApOwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJ2Jvb2xlYW4nKTsKICAgIGluZml4KCdpbnN0YW5jZW9mJywgMTIwLCBudWxsLCAnYm9vbGVhbicpOwogICAgaW5maXgoJysnLCAxMzAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgaWYgKGxlZnQuaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgaWYgKGxlZnQubnVtYmVyID09PSAwKSB7CiAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCBsZWZ0LCAnMCcpOwogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIGlmIChsZWZ0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIGlmIChsZWZ0LnN0cmluZyA9PT0gJycpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIGxlZnQsICdTdHJpbmcnLCAnXCdcJycpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTMwKTsKICAgICAgICBpZiAocmlnaHQuaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgaWYgKHJpZ2h0Lm51bWJlciA9PT0gMCkgewogICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgcmlnaHQsICcwJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIGlmIChyaWdodC5zdHJpbmcgPT09ICcnKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCByaWdodCwgJ1N0cmluZycsICdcJ1wnJyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgaWYgKGxlZnQuaWQgPT09IHJpZ2h0LmlkKSB7CiAgICAgICAgICAgIGlmIChsZWZ0LmlkID09PSAnKHN0cmluZyknIHx8IGxlZnQuaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgICAgIGlmIChsZWZ0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICAgICAgbGVmdC5zdHJpbmcgKz0gcmlnaHQuc3RyaW5nOwogICAgICAgICAgICAgICAgICAgIGlmIChqeC50ZXN0KGxlZnQuc3RyaW5nKSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1cmwnLCBsZWZ0KTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGxlZnQubnVtYmVyICs9IHJpZ2h0Lm51bWJlcjsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGxlZnQudGhydSA9IHJpZ2h0LnRocnU7CiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdDsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IHJpZ2h0OwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSk7CiAgICBwcmVmaXgoJysnLCAnbnVtJyk7CiAgICBwcmVmaXgoJysrKycsIGZ1bmN0aW9uICgpIHsKICAgICAgICB3YXJuKCdjb25mdXNpbmdfYScsIHRva2VuKTsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwcmVzc2lvbigxNTApOwogICAgICAgIHRoaXMuYXJpdHkgPSAncHJlZml4JzsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwogICAgaW5maXgoJysrKycsIDEzMCwgZnVuY3Rpb24gKGxlZnQpIHsKICAgICAgICB3YXJuKCdjb25mdXNpbmdfYScsIHRva2VuKTsKICAgICAgICB0aGlzLmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGlzLnNlY29uZCA9IGV4cHJlc3Npb24oMTMwKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwogICAgaW5maXgoJy0nLCAxMzAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgaWYgKChsZWZ0LmlkID09PSAnKG51bWJlciknICYmIGxlZnQubnVtYmVyID09PSAwKSB8fCBsZWZ0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIGxlZnQpOwogICAgICAgIH0KICAgICAgICB2YXIgcmlnaHQgPSBleHByZXNzaW9uKDEzMCk7CiAgICAgICAgaWYgKChyaWdodC5pZCA9PT0gJyhudW1iZXIpJyAmJiByaWdodC5udW1iZXIgPT09IDApIHx8IHJpZ2h0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIGxlZnQpOwogICAgICAgIH0KICAgICAgICBpZiAobGVmdC5pZCA9PT0gcmlnaHQuaWQgJiYgbGVmdC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBsZWZ0Lm51bWJlciAtPSByaWdodC5udW1iZXI7CiAgICAgICAgICAgIGxlZnQudGhydSA9IHJpZ2h0LnRocnU7CiAgICAgICAgICAgIHJldHVybiBsZWZ0OwogICAgICAgIH0KICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IHJpZ2h0OwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJ251bWJlcicpOwogICAgcHJlZml4KCctJyk7CiAgICBwcmVmaXgoJy0tLScsIGZ1bmN0aW9uICgpIHsKICAgICAgICB3YXJuKCdjb25mdXNpbmdfYScsIHRva2VuKTsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwcmVzc2lvbigxNTApOwogICAgICAgIHRoaXMuYXJpdHkgPSAncHJlZml4JzsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwogICAgaW5maXgoJy0tLScsIDEzMCwgZnVuY3Rpb24gKGxlZnQpIHsKICAgICAgICB3YXJuKCdjb25mdXNpbmdfYScsIHRva2VuKTsKICAgICAgICB0aGlzLmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGlzLnNlY29uZCA9IGV4cHJlc3Npb24oMTMwKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwogICAgaW5maXgoJyonLCAxNDAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgaWYgKChsZWZ0LmlkID09PSAnKG51bWJlciknICYmIChsZWZ0Lm51bWJlciA9PT0gMCB8fCBsZWZ0Lm51bWJlciA9PT0gMSkpIHx8IGxlZnQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgbGVmdCk7CiAgICAgICAgfQogICAgICAgIHZhciByaWdodCA9IGV4cHJlc3Npb24oMTQwKTsKICAgICAgICBpZiAoKHJpZ2h0LmlkID09PSAnKG51bWJlciknICYmIChyaWdodC5udW1iZXIgPT09IDAgfHwgcmlnaHQubnVtYmVyID09PSAxKSkgfHwgcmlnaHQuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgcmlnaHQpOwogICAgICAgIH0KICAgICAgICBpZiAobGVmdC5pZCA9PT0gcmlnaHQuaWQgJiYgbGVmdC5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBsZWZ0Lm51bWJlciAqPSByaWdodC5udW1iZXI7CiAgICAgICAgICAgIGxlZnQudGhydSA9IHJpZ2h0LnRocnU7CiAgICAgICAgICAgIHJldHVybiBsZWZ0OwogICAgICAgIH0KICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IHJpZ2h0OwogICAgICAgIHJldHVybiB0aGF0OwogICAgfSwgJ251bWJlcicpOwogICAgaW5maXgoJy8nLCAxNDAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgaWYgKChsZWZ0LmlkID09PSAnKG51bWJlciknICYmIGxlZnQubnVtYmVyID09PSAwKSB8fCBsZWZ0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIGxlZnQpOwogICAgICAgIH0KICAgICAgICB2YXIgcmlnaHQgPSBleHByZXNzaW9uKDE0MCk7CiAgICAgICAgaWYgKChyaWdodC5pZCA9PT0gJyhudW1iZXIpJyAmJiAocmlnaHQubnVtYmVyID09PSAwIHx8IHJpZ2h0Lm51bWJlciA9PT0gMSkpIHx8IHJpZ2h0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHJpZ2h0KTsKICAgICAgICB9CiAgICAgICAgaWYgKGxlZnQuaWQgPT09IHJpZ2h0LmlkICYmIGxlZnQuaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgbGVmdC5udW1iZXIgLz0gcmlnaHQubnVtYmVyOwogICAgICAgICAgICBsZWZ0LnRocnUgPSByaWdodC50aHJ1OwogICAgICAgICAgICByZXR1cm4gbGVmdDsKICAgICAgICB9CiAgICAgICAgdGhhdC5maXJzdCA9IGxlZnQ7CiAgICAgICAgdGhhdC5zZWNvbmQgPSByaWdodDsKICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0sICdudW1iZXInKTsKICAgIGluZml4KCclJywgMTQwLCBmdW5jdGlvbiAobGVmdCwgdGhhdCkgewogICAgICAgIGlmICgobGVmdC5pZCA9PT0gJyhudW1iZXIpJyAmJiAobGVmdC5udW1iZXIgPT09IDAgfHwgbGVmdC5udW1iZXIgPT09IDEpKSB8fCBsZWZ0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIGxlZnQpOwogICAgICAgIH0KICAgICAgICB2YXIgcmlnaHQgPSBleHByZXNzaW9uKDE0MCk7CiAgICAgICAgaWYgKChyaWdodC5pZCA9PT0gJyhudW1iZXIpJyAmJiByaWdodC5udW1iZXIgPT09IDApIHx8IHJpZ2h0LmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHJpZ2h0KTsKICAgICAgICB9CiAgICAgICAgaWYgKGxlZnQuaWQgPT09IHJpZ2h0LmlkICYmIGxlZnQuaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgbGVmdC5udW1iZXIgJT0gcmlnaHQubnVtYmVyOwogICAgICAgICAgICBsZWZ0LnRocnUgPSByaWdodC50aHJ1OwogICAgICAgICAgICByZXR1cm4gbGVmdDsKICAgICAgICB9CiAgICAgICAgdGhhdC5maXJzdCA9IGxlZnQ7CiAgICAgICAgdGhhdC5zZWNvbmQgPSByaWdodDsKICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0sICdudW1iZXInKTsKCiAgICBzdWZmaXgoJysrJyk7CiAgICBwcmVmaXgoJysrJyk7CgogICAgc3VmZml4KCctLScpOwogICAgcHJlZml4KCctLScpOwogICAgcHJlZml4KCdkZWxldGUnLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdmFyIHAgPSBleHByZXNzaW9uKDApOwogICAgICAgIGlmICghcCB8fCAocC5pZCAhPT0gJy4nICYmIHAuaWQgIT09ICdbJykpIHsKICAgICAgICAgICAgd2FybignZGVsZXRlZCcpOwogICAgICAgIH0KICAgICAgICB0aGlzLmZpcnN0ID0gcDsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKCiAgICBwcmVmaXgoJ34nLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgIGlmICghb3B0aW9uLmJpdHdpc2UpIHsKICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIGV4cHJlc3Npb24oMTUwKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0sICdudW1iZXInKTsKICAgIHByZWZpeCgnIScsIGZ1bmN0aW9uICgpIHsKICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgdGhpcy5maXJzdCA9IGV4cGVjdGVkX2NvbmRpdGlvbihleHByZXNzaW9uKDE1MCkpOwogICAgICAgIHRoaXMuYXJpdHkgPSAncHJlZml4JzsKICAgICAgICBpZiAoYmFuZ1t0aGlzLmZpcnN0LmlkXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICB3YXJuKCdjb25mdXNpbmdfYScsIHRoaXMpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhpczsKICAgIH0sICdib29sZWFuJyk7CiAgICBwcmVmaXgoJ3R5cGVvZicsIG51bGwsICdzdHJpbmcnKTsKICAgIHByZWZpeCgnbmV3JywgZnVuY3Rpb24gKCkgewogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIHZhciBjID0gZXhwcmVzc2lvbigxNjApLCBuLCBwLCB2OwogICAgICAgIHRoaXMuZmlyc3QgPSBjOwogICAgICAgIGlmIChjLmlkICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgIGlmIChjLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIHN3aXRjaCAoYy5zdHJpbmcpIHsKICAgICAgICAgICAgICAgIGNhc2UgJ09iamVjdCc6CiAgICAgICAgICAgICAgICAgICAgd2FybigndXNlX29iamVjdCcsIHRva2VuKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzoKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJygnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgICAgICAgICBwLmZpcnN0ID0gdGhpczsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyknKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gZXhwcmVzc2lvbigwKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuc2Vjb25kID0gW25dOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4udHlwZSAhPT0gJ251bWJlcicgfHwgbmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndXNlX2FycmF5JywgcCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuc2Vjb25kLnB1c2goZXhwcmVzc2lvbigwKSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2VfYXJyYXknLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKScsIHApOwogICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgd2FybigndXNlX2FycmF5JywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzoKICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6CiAgICAgICAgICAgICAgICBjYXNlICdCb29sZWFuJzoKICAgICAgICAgICAgICAgIGNhc2UgJ01hdGgnOgogICAgICAgICAgICAgICAgY2FzZSAnSlNPTic6CiAgICAgICAgICAgICAgICAgICAgd2Fybignbm90X2FfY29uc3RydWN0b3InLCBjKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0Z1bmN0aW9uJzoKICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5ldmlsKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Z1bmN0aW9uX2V2YWwnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdEYXRlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgIGlmIChjLmlkICE9PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBjLnN0cmluZy5jaGFyQXQoMCk7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLm5ld2NhcCAmJiAodiA8ICdBJyB8fCB2ID4gJ1onKSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignY29uc3RydWN0b3JfbmFtZV9hJywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgaWYgKGMuaWQgIT09ICcuJyAmJiBjLmlkICE9PSAnWycgJiYgYy5pZCAhPT0gJygnKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYmFkX2NvbnN0cnVjdG9yJywgdG9rZW4pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgd2Fybignd2VpcmRfbmV3JywgdGhpcyk7CiAgICAgICAgfQogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKCcpIHsKICAgICAgICAgICAgd2FybignbWlzc2luZ19hJywgbmV4dF90b2tlbiwgJygpJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgaW5maXgoJygnLCAxNjAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgdmFyIHA7CiAgICAgICAgaWYgKGluZGVudCAmJiBpbmRlbnQubW9kZSA9PT0gJ2V4cHJlc3Npb24nKSB7CiAgICAgICAgICAgIG5vX3NwYWNlKHByZXZfdG9rZW4sIHRva2VuKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBub19zcGFjZV9vbmx5KHByZXZfdG9rZW4sIHRva2VuKTsKICAgICAgICB9CiAgICAgICAgaWYgKCFsZWZ0LmltbWVkICYmIGxlZnQuaWQgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICAgICAgd2Fybignd3JhcF9pbW1lZGlhdGUnKTsKICAgICAgICB9CiAgICAgICAgcCA9IFtdOwogICAgICAgIGlmIChsZWZ0LmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgaWYgKGxlZnQuc3RyaW5nLm1hdGNoKC9eW0EtWl0oW0EtWjAtOV8kXSpbYS16XVtBLVphLXowLTlfJF0qKT8kLykpIHsKICAgICAgICAgICAgICAgIGlmIChsZWZ0LnN0cmluZyAhPT0gJ051bWJlcicgJiYgbGVmdC5zdHJpbmcgIT09ICdTdHJpbmcnICYmCiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQuc3RyaW5nICE9PSAnQm9vbGVhbicgJiYgbGVmdC5zdHJpbmcgIT09ICdEYXRlJykgewogICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0LnN0cmluZyA9PT0gJ01hdGgnIHx8IGxlZnQuc3RyaW5nID09PSAnSlNPTicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybignbm90X2FfZnVuY3Rpb24nLCBsZWZ0KTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQuc3RyaW5nID09PSAnT2JqZWN0JykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1c2Vfb2JqZWN0JywgdG9rZW4pOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdC5zdHJpbmcgPT09ICdBcnJheScgfHwgIW9wdGlvbi5uZXdjYXApIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignbWlzc2luZ19hJywgbGVmdCwgJ25ldycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0gZWxzZSBpZiAobGVmdC5pZCA9PT0gJy4nKSB7CiAgICAgICAgICAgIGlmIChvcHRpb24uc2FmZSAmJiBsZWZ0LmZpcnN0LnN0cmluZyA9PT0gJ01hdGgnICYmCiAgICAgICAgICAgICAgICAgICAgbGVmdC5zZWNvbmQgPT09ICdyYW5kb20nKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfYScsIGxlZnQpOwogICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQuc2Vjb25kLnN0cmluZyA9PT0gJ3NwbGl0JyAmJgogICAgICAgICAgICAgICAgICAgIGxlZnQuZmlyc3QuaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VzZV9hcnJheScsIGxlZnQuc2Vjb25kKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcpJykgewogICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgICAgICBwLnB1c2goZXhwcmVzc2lvbigxMCkpOwogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHN0ZXBfb3V0KCcpJywgdGhhdCk7CiAgICAgICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAnb2JqZWN0JykgewogICAgICAgICAgICBpZiAobGVmdC5zdHJpbmcgPT09ICdwYXJzZUludCcgJiYgcC5sZW5ndGggPT09IDEpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3JhZGl4JywgbGVmdCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCFvcHRpb24uZXZpbCkgewogICAgICAgICAgICAgICAgaWYgKGxlZnQuc3RyaW5nID09PSAnZXZhbCcgfHwgbGVmdC5zdHJpbmcgPT09ICdGdW5jdGlvbicgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbGVmdC5zdHJpbmcgPT09ICdleGVjU2NyaXB0JykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V2aWwnLCBsZWZ0KTsKICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocFswXSAmJiBwWzBdLmlkID09PSAnKHN0cmluZyknICYmCiAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0LnN0cmluZyA9PT0gJ3NldFRpbWVvdXQnIHx8CiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQuc3RyaW5nID09PSAnc2V0SW50ZXJ2YWwnKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2ltcGxpZWRfZXZpbCcsIGxlZnQpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICghbGVmdC5pZGVudGlmaWVyICYmIGxlZnQuaWQgIT09ICcuJyAmJiBsZWZ0LmlkICE9PSAnWycgJiYKICAgICAgICAgICAgICAgICAgICBsZWZ0LmlkICE9PSAnKCcgJiYgbGVmdC5pZCAhPT0gJyYmJyAmJiBsZWZ0LmlkICE9PSAnfHwnICYmCiAgICAgICAgICAgICAgICAgICAgbGVmdC5pZCAhPT0gJz8nKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdiYWRfaW52b2NhdGlvbicsIGxlZnQpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoYXQuc2Vjb25kID0gcDsKICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0sICcnLCB0cnVlKTsKCiAgICBwcmVmaXgoJygnLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgc3RlcF9pbignZXhwcmVzc2lvbicpOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgZWRnZSgpOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgIG5leHRfdG9rZW4uaW1tZWQgPSB0cnVlOwogICAgICAgIH0KICAgICAgICB2YXIgdmFsdWUgPSBleHByZXNzaW9uKDApOwogICAgICAgIHZhbHVlLnBhcmVuID0gdHJ1ZTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHN0ZXBfb3V0KCcpJywgdGhpcyk7CiAgICAgICAgaWYgKHZhbHVlLmlkID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKCcpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ21vdmVfaW52b2NhdGlvbicpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgd2FybignYmFkX3dyYXAnLCB0aGlzKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gdmFsdWU7CiAgICB9KTsKCiAgICBpbmZpeCgnLicsIDE3MCwgZnVuY3Rpb24gKGxlZnQsIHRoYXQpIHsKICAgICAgICBub19zcGFjZShwcmV2X3Rva2VuLCB0b2tlbik7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICB2YXIgbmFtZSA9IGlkZW50aWZpZXIoKSwgdHlwZTsKICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgIHRhbGx5X3Byb3BlcnR5KG5hbWUpOwogICAgICAgIH0KICAgICAgICB0aGF0LmZpcnN0ID0gbGVmdDsKICAgICAgICB0aGF0LnNlY29uZCA9IHRva2VuOwogICAgICAgIGlmIChsZWZ0ICYmIGxlZnQuc3RyaW5nID09PSAnYXJndW1lbnRzJyAmJgogICAgICAgICAgICAgICAgKG5hbWUgPT09ICdjYWxsZWUnIHx8IG5hbWUgPT09ICdjYWxsZXInKSkgewogICAgICAgICAgICB3YXJuKCdhdm9pZF9hJywgbGVmdCwgJ2FyZ3VtZW50cy4nICsgbmFtZSk7CiAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uLmV2aWwgJiYgbGVmdCAmJiBsZWZ0LnN0cmluZyA9PT0gJ2RvY3VtZW50JyAmJgogICAgICAgICAgICAgICAgKG5hbWUgPT09ICd3cml0ZScgfHwgbmFtZSA9PT0gJ3dyaXRlbG4nKSkgewogICAgICAgICAgICB3YXJuKCd3cml0ZV9pc193cm9uZycsIGxlZnQpOwogICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLmFkc2FmZSkgewogICAgICAgICAgICBpZiAoIWFkc2FmZV90b3AgJiYgbGVmdC5zdHJpbmcgPT09ICdBRFNBRkUnKSB7CiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2lkJyB8fCBuYW1lID09PSAnbGliJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdGhhdCk7CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdnbycpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoeG1vZGUgIT09ICdzY3JpcHQnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdGhhdCk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhZHNhZmVfd2VudCB8fCBuZXh0X3Rva2VuLmlkICE9PSAnKCcgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZWsoMCkuaWQgIT09ICcoc3RyaW5nKScgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZWsoMCkuc3RyaW5nICE9PSBhZHNhZmVfaWQgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZWsoMSkuaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfYScsIHRoYXQsICdnbycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHNhZmVfd2VudCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgYWRzYWZlX21heSA9IGZhbHNlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkc2FmZV90b3AgPSBmYWxzZTsKICAgICAgICB9CiAgICAgICAgaWYgKCFvcHRpb24uZXZpbCAmJiAobmFtZSA9PT0gJ2V2YWwnIHx8IG5hbWUgPT09ICdleGVjU2NyaXB0JykpIHsKICAgICAgICAgICAgd2FybignZXZpbCcpOwogICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgaWYgKGJhbm5lZFtuYW1lXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hJywgdG9rZW4sIG5hbWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmVkZWZpbmVkW2xlZnQuc3RyaW5nXSAhPT0gJ2Jvb2xlYW4nIHx8ICAgIC8vLy8gY2hlY2sgZm9yIHdyaXRlYWJsZQogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkID09PSAnKCcpIHsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChvcHRpb24uY29tbW9uanMgJiYgY29tbW9uanNbbGVmdC5zdHJpbmddID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJy4nKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnLCB0aGF0KTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoJy4nKTsKICAgICAgICAgICAgICAgIHRva2VuLmZpcnN0ID0gdGhhdDsKICAgICAgICAgICAgICAgIHRva2VuLnNlY29uZCA9IG5hbWU7CiAgICAgICAgICAgICAgICB0aGF0ID0gdG9rZW47CiAgICAgICAgICAgICAgICBuYW1lID0gaWRlbnRpZmllcigpOwogICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgICAgIHRhbGx5X3Byb3BlcnR5KG5hbWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHR5cGUgPSBwcm9wZXJ0eV90eXBlW25hbWVdOwogICAgICAgIGlmICh0eXBlICYmIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyAmJiB0eXBlICE9PSAnKicpIHsKICAgICAgICAgICAgdGhhdC50eXBlID0gdHlwZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoYXQ7CiAgICB9LCAnJywgdHJ1ZSk7CgogICAgaW5maXgoJ1snLCAxNzAsIGZ1bmN0aW9uIChsZWZ0LCB0aGF0KSB7CiAgICAgICAgdmFyIGUsIHM7CiAgICAgICAgbm9fc3BhY2Vfb25seShwcmV2X3Rva2VuLCB0b2tlbik7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgZWRnZSgpOwogICAgICAgIGUgPSBleHByZXNzaW9uKDApOwogICAgICAgIHN3aXRjaCAoZS50eXBlKSB7CiAgICAgICAgY2FzZSAnbnVtYmVyJzoKICAgICAgICAgICAgaWYgKGUuaWQgPT09ICcobnVtYmVyKScgJiYgbGVmdC5pZCA9PT0gJ2FyZ3VtZW50cycpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VzZV9wYXJhbScsIGxlZnQpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3N0cmluZyc6CiAgICAgICAgICAgIGlmIChlLmlkID09PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNhZmUgJiYgKGJhbm5lZFtlLnN0cmluZ10gfHwKICAgICAgICAgICAgICAgICAgICAgICAgZS5zdHJpbmcuY2hhckF0KDApID09PSAnXycgfHwgZS5zdHJpbmcuc2xpY2UoLTEpID09PSAnXycpKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3N1YnNjcmlwdF9hJywgZSk7CiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvcHRpb24uZXZpbCAmJgogICAgICAgICAgICAgICAgICAgICAgICAoZS5zdHJpbmcgPT09ICdldmFsJyB8fCBlLnN0cmluZyA9PT0gJ2V4ZWNTY3JpcHQnKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V2aWwnLCBlKTsKICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbi5zdWIgJiYgaXgudGVzdChlLnN0cmluZykpIHsKICAgICAgICAgICAgICAgICAgICBzID0gc3ludGF4W2Uuc3RyaW5nXTsKICAgICAgICAgICAgICAgICAgICBpZiAoIXMgfHwgIXMucmVzZXJ2ZWQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybignc3Vic2NyaXB0JywgZSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdGFsbHlfcHJvcGVydHkoZS5zdHJpbmcpOwogICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbi5zYWZlICYmIGUuaWQgIT09ICd0eXBlb2YnKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfc3Vic2NyaXB0X2EnLCBlKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlIHVuZGVmaW5lZDoKICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfc3Vic2NyaXB0X2EnLCBlKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9zdWJzY3JpcHRfYScsIGUpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHN0ZXBfb3V0KCddJywgdGhhdCk7CiAgICAgICAgbm9fc3BhY2UocHJldl90b2tlbiwgdG9rZW4pOwogICAgICAgIHRoYXQuZmlyc3QgPSBsZWZ0OwogICAgICAgIHRoYXQuc2Vjb25kID0gZTsKICAgICAgICByZXR1cm4gdGhhdDsKICAgIH0sICcnLCB0cnVlKTsKCiAgICBwcmVmaXgoJ1snLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgdGhpcy5hcml0eSA9ICdwcmVmaXgnOwogICAgICAgIHRoaXMuZmlyc3QgPSBbXTsKICAgICAgICBzdGVwX2luKCdhcnJheScpOwogICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkICE9PSAnKGVuZCknKSB7CiAgICAgICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnLCcpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnXScpIHsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGluZGVudC53cmFwID0gZmFsc2U7CiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgdGhpcy5maXJzdC5wdXNoKGV4cHJlc3Npb24oMTApKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcsJykgewogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnXScgJiYgIW9wdGlvbi5lczUpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzdGVwX291dCgnXScsIHRoaXMpOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSwgMTcwKTsKCgogICAgZnVuY3Rpb24gcHJvcGVydHlfbmFtZSgpIHsKICAgICAgICB2YXIgaWQgPSBvcHRpb25hbF9pZGVudGlmaWVyKHRydWUpOwogICAgICAgIGlmICghaWQpIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgICAgIGlkID0gbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnNhZmUpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoYmFubmVkW2lkXSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfYScpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQuY2hhckF0KDApID09PSAnXycgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkLmNoYXJBdChpZC5sZW5ndGggLSAxKSA9PT0gJ18nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2RhbmdsaW5nX2EnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICAgICAgaWQgPSBuZXh0X3Rva2VuLm51bWJlci50b1N0cmluZygpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiBpZDsKICAgIH0KCgogICAgZnVuY3Rpb24gZnVuY3Rpb25fcGFyYW1zKCkgewogICAgICAgIHZhciBpZCwgcGFyZW4gPSBuZXh0X3Rva2VuLCBwYXJhbXMgPSBbXTsKICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgc3RlcF9pbigpOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcpJykgewogICAgICAgICAgICBub19zcGFjZSgpOwogICAgICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgIH0KICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgaWQgPSBpZGVudGlmaWVyKCk7CiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHRva2VuKTsKICAgICAgICAgICAgYWRkX2xhYmVsKHRva2VuLCBvcHRpb24udW5wYXJhbSA/ICdwYXJhbWV0ZXInIDogJ3VucGFyYW0nKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcsJykgewogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXM7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNvbXBsZXhpdHkoZXhwKSB7CiAgICAgICAgdmFyIHNjb3JlID0gMDsKICAgICAgICBpZiAoZXhwKSB7CiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGV4cCkpIHsKICAgICAgICAgICAgICAgIGV4cC5mb3JFYWNoKGZ1bmN0aW9uICh0b2spIHsKICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb21wbGV4aXR5KHRvayk7CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHN3aXRjaCAoZXhwLmFyaXR5KSB7CiAgICAgICAgICAgICAgICBjYXNlICdzdGF0ZW1lbnQnOgogICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXhwLmlkKSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaWYnOgogICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb21wbGV4aXR5KGV4cC5maXJzdCkgKyBjb21wbGV4aXR5KGV4cC5ibG9jaykgKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxleGl0eShleHBbJ2Vsc2UnXSkgKyAxOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICd3aGlsZSc6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZG8nOgogICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwLmZpcnN0LmlkICE9PSAndHJ1ZScgJiYgZXhwLmZpcnN0Lm51bWJlciAhPT0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb21wbGV4aXR5KGV4cC5maXJzdCkgKyBjb21wbGV4aXR5KGV4cC5ibG9jayk7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcic6CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHAuc2Vjb25kICE9PSB1bmRlZmluZWQgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHAuc2Vjb25kLmlkICE9PSAndHJ1ZScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHAuc2Vjb25kLm51bWJlciAhPT0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb21wbGV4aXR5KGV4cC5maXJzdCkgKyBjb21wbGV4aXR5KGV4cC5zZWNvbmQpICsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXhpdHkoZXhwLnRoaXJkKSArIGNvbXBsZXhpdHkoZXhwLmJsb2NrKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3dpdGNoJzoKICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpICsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXhpdHkoZXhwLnNlY29uZCkgKyBleHAuc2Vjb25kLmxlbmd0aDsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cC5zZWNvbmRbZXhwLnNlY29uZC5sZW5ndGggLSAxXS5pZCA9PT0gJ2RlZmF1bHQnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSAtPSAxOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RyeSc6CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHAuc2Vjb25kKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHAudGhpcmQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDE7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpICsgY29tcGxleGl0eShleHAuc2Vjb25kKSArCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV4aXR5KGV4cC50aGlyZCkgKyBjb21wbGV4aXR5KGV4cC5ibG9jayk7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ3ByZWZpeCc6CiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnY2FzZSc6CiAgICAgICAgICAgICAgICBjYXNlICdpbmZpeCc6CiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gY29tcGxleGl0eShleHAuZmlyc3QpICsgY29tcGxleGl0eShleHAuc2Vjb25kKTsKICAgICAgICAgICAgICAgICAgICBpZiAoZXhwLmlkID09PSAnJiYnIHx8IGV4cC5pZCA9PT0gJ3x8JykgewogICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAxOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ3Rlcm5hcnknOgogICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbXBsZXhpdHkoZXhwLmZpcnN0KSArIGNvbXBsZXhpdHkoZXhwLnNlY29uZCkgKyBjb21wbGV4aXR5KGV4cC50aGlyZCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIHNjb3JlOwogICAgfQoKCiAgICBmdW5jdGlvbiBkb19mdW5jdGlvbihmdW5jLCBuYW1lKSB7CiAgICAgICAgdmFyIG9sZF9mdW5jdCAgICAgID0gZnVuY3QsCiAgICAgICAgICAgIG9sZF9vcHRpb24gICAgID0gb3B0aW9uLAogICAgICAgICAgICBvbGRfc2NvcGUgICAgICA9IHNjb3BlOwogICAgICAgIGZ1bmN0ID0gewogICAgICAgICAgICAnKG5hbWUpJyAgICAgOiBuYW1lIHx8ICdcJycgKyAoYW5vbm5hbWUgfHwgJycpLnJlcGxhY2UobngsIHNhbml0aXplKSArICdcJycsCiAgICAgICAgICAgICcobGluZSknICAgICA6IG5leHRfdG9rZW4ubGluZSwKICAgICAgICAgICAgJyhjb250ZXh0KScgIDogb2xkX2Z1bmN0LAogICAgICAgICAgICAnKGJyZWFrYWdlKScgOiAwLAogICAgICAgICAgICAnKGxvb3BhZ2UpJyAgOiAwLAogICAgICAgICAgICAnKHNjb3BlKScgICAgOiBzY29wZSwKICAgICAgICAgICAgJyh0b2tlbiknICAgIDogZnVuYwogICAgICAgIH07CiAgICAgICAgb3B0aW9uID0gT2JqZWN0LmNyZWF0ZShvbGRfb3B0aW9uKTsKICAgICAgICBzY29wZSA9IE9iamVjdC5jcmVhdGUob2xkX3Njb3BlKTsKICAgICAgICBmdW5jdGlvbnMucHVzaChmdW5jdCk7CiAgICAgICAgZnVuYy5uYW1lID0gbmFtZTsKICAgICAgICBpZiAobmFtZSkgewogICAgICAgICAgICBhZGRfbGFiZWwoZnVuYywgJ2Z1bmN0aW9uJywgbmFtZSk7CiAgICAgICAgfQogICAgICAgIGZ1bmMud3JpdGVhYmxlID0gZmFsc2U7CiAgICAgICAgZnVuYy5maXJzdCA9IGZ1bmN0WycocGFyYW1zKSddID0gZnVuY3Rpb25fcGFyYW1zKCk7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgZnVuYy5ibG9jayA9IGJsb2NrKGZhbHNlKTsKICAgICAgICBpZiAoZnVuY3RbJyhvbGRfcHJvcGVydHlfdHlwZSknXSkgewogICAgICAgICAgICBwcm9wZXJ0eV90eXBlID0gZnVuY3RbJyhvbGRfcHJvcGVydHlfdHlwZSknXTsKICAgICAgICAgICAgZGVsZXRlIGZ1bmN0Wycob2xkX3Byb3BlcnR5X3R5cGUpJ107CiAgICAgICAgfQogICAgICAgIGZ1bmN0WycoY29tcGxleGl0eSknXSA9IGNvbXBsZXhpdHkoZnVuYy5ibG9jaykgKyAxOwogICAgICAgIGlmIChvcHRpb24uY29uZnVzaW9uKSB7CiAgICAgICAgICAgIGZ1bmN0WycoY29uZnVzaW9uKSddID0gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgZnVuY3QgICAgICA9IG9sZF9mdW5jdDsKICAgICAgICBvcHRpb24gICAgID0gb2xkX29wdGlvbjsKICAgICAgICBzY29wZSAgICAgID0gb2xkX3Njb3BlOwogICAgfQoKCiAgICBhc3NpZ25vcCgnPScpOwogICAgYXNzaWdub3AoJys9JywgJysnKTsKICAgIGFzc2lnbm9wKCctPScsICctJyk7CiAgICBhc3NpZ25vcCgnKj0nLCAnKicpOwogICAgYXNzaWdub3AoJy89JywgJy8nKS5udWQgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgc3RvcCgnc2xhc2hfZXF1YWwnKTsKICAgIH07CiAgICBhc3NpZ25vcCgnJT0nLCAnJScpOwogICAgYXNzaWdub3AoJyY9JywgJyYnKTsKICAgIGFzc2lnbm9wKCd8PScsICd8Jyk7CiAgICBhc3NpZ25vcCgnXj0nLCAnXicpOwogICAgYXNzaWdub3AoJzw8PScsICc8PCcpOwogICAgYXNzaWdub3AoJz4+PScsICc+PicpOwogICAgYXNzaWdub3AoJz4+Pj0nLCAnPj4+Jyk7CgoKICAgIHByZWZpeCgneycsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZ2V0LCBpLCBqLCBuYW1lLCBwLCBzZXQsIHNlZW4gPSB7fTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3ByZWZpeCc7CiAgICAgICAgdGhpcy5maXJzdCA9IFtdOwogICAgICAgIHN0ZXBfaW4oKTsKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCAhPT0gJ30nKSB7CiAgICAgICAgICAgIGluZGVudC53cmFwID0gZmFsc2U7CgovLyBKU0xpbnQgcmVjb2duaXplcyB0aGUgRVM1IGV4dGVuc2lvbiBmb3IgZ2V0L3NldCBpbiBvYmplY3QgbGl0ZXJhbHMsCi8vIGJ1dCByZXF1aXJlcyB0aGF0IHRoZXkgYmUgdXNlZCBpbiBwYWlycy4KCiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uc3RyaW5nID09PSAnZ2V0JyAmJiBwZWVrKCkuaWQgIT09ICc6JykgewogICAgICAgICAgICAgICAgaWYgKCFvcHRpb24uZXM1KSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXM1Jyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBnZXQgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnZ2V0Jyk7CiAgICAgICAgICAgICAgICBvbmVfc3BhY2Vfb25seSgpOwogICAgICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW47CiAgICAgICAgICAgICAgICBpID0gcHJvcGVydHlfbmFtZSgpOwogICAgICAgICAgICAgICAgaWYgKCFpKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnbWlzc2luZ19wcm9wZXJ0eScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZ2V0LnN0cmluZyA9ICcnOwogICAgICAgICAgICAgICAgZG9fZnVuY3Rpb24oZ2V0KTsKICAgICAgICAgICAgICAgIGlmIChmdW5jdFsnKGxvb3BhZ2UpJ10pIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdmdW5jdGlvbl9sb29wJywgZ2V0KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHAgPSBnZXQuZmlyc3Q7CiAgICAgICAgICAgICAgICBpZiAocCkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ3BhcmFtZXRlcl9hX2dldF9iJywgcFswXSwgcFswXS5zdHJpbmcsIGkpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIHNldCA9IG5leHRfdG9rZW47CiAgICAgICAgICAgICAgICBzZXQuc3RyaW5nID0gJyc7CiAgICAgICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ3NldCcpOwogICAgICAgICAgICAgICAgb25lX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIGogPSBwcm9wZXJ0eV9uYW1lKCk7CiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaikgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIHRva2VuLCBpLCBqIHx8IG5leHRfdG9rZW4uc3RyaW5nKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGRvX2Z1bmN0aW9uKHNldCk7CiAgICAgICAgICAgICAgICBwID0gc2V0LmZpcnN0OwogICAgICAgICAgICAgICAgaWYgKCFwIHx8IHAubGVuZ3RoICE9PSAxKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgncGFyYW1ldGVyX3NldF9hJywgc2V0LCAndmFsdWUnKTsKICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocFswXS5zdHJpbmcgIT09ICd2YWx1ZScpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBwWzBdLCAndmFsdWUnLCBwWzBdLnN0cmluZyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBuYW1lLmZpcnN0ID0gW2dldCwgc2V0XTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIG5hbWUgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgaSA9IHByb3BlcnR5X25hbWUoKTsKICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaSAhPT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdtaXNzaW5nX3Byb3BlcnR5Jyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgICAgIG5hbWUuZmlyc3QgPSBleHByZXNzaW9uKDEwKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB0aGlzLmZpcnN0LnB1c2gobmFtZSk7CiAgICAgICAgICAgIGlmIChzZWVuW2ldID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdkdXBsaWNhdGVfYScsIG5leHRfdG9rZW4sIGkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNlZW5baV0gPSB0cnVlOwogICAgICAgICAgICB0YWxseV9wcm9wZXJ0eShpKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnfScgJiYgIW9wdGlvbi5lczUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzdGVwX291dCgnfScsIHRoaXMpOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgc3RtdCgneycsIGZ1bmN0aW9uICgpIHsKICAgICAgICB3YXJuKCdzdGF0ZW1lbnRfYmxvY2snKTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgdGhpcy5ibG9jayA9IHN0YXRlbWVudHMoKTsKICAgICAgICB0aGlzLmRpc3J1cHQgPSB0aGlzLmJsb2NrLmRpc3J1cHQ7CiAgICAgICAgYWR2YW5jZSgnfScsIHRoaXMpOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgc3RtdCgnLypnbG9iYWwnLCBkaXJlY3RpdmUpOwogICAgc3RtdCgnLypnbG9iYWxzJywgZGlyZWN0aXZlKTsKICAgIHN0bXQoJy8qanNsaW50JywgZGlyZWN0aXZlKTsKICAgIHN0bXQoJy8qbWVtYmVyJywgZGlyZWN0aXZlKTsKICAgIHN0bXQoJy8qbWVtYmVycycsIGRpcmVjdGl2ZSk7CiAgICBzdG10KCcvKnByb3BlcnR5JywgZGlyZWN0aXZlKTsKICAgIHN0bXQoJy8qcHJvcGVydGllcycsIGRpcmVjdGl2ZSk7CgogICAgc3RtdCgndmFyJywgZnVuY3Rpb24gKCkgewoKLy8gSmF2YVNjcmlwdCBkb2VzIG5vdCBoYXZlIGJsb2NrIHNjb3BlLiBJdCBvbmx5IGhhcyBmdW5jdGlvbiBzY29wZS4gU28sCi8vIGRlY2xhcmluZyBhIHZhcmlhYmxlIGluIGEgYmxvY2sgY2FuIGhhdmUgdW5leHBlY3RlZCBjb25zZXF1ZW5jZXMuCgovLyB2YXIuZmlyc3Qgd2lsbCBjb250YWluIGFuIGFycmF5LCB0aGUgYXJyYXkgY29udGFpbmluZyBuYW1lIHRva2VucwovLyBhbmQgYXNzaWdubWVudCB0b2tlbnMuCgogICAgICAgIHZhciBhc3NpZ24sIGlkLCBuYW1lOwoKICAgICAgICBpZiAoZnVuY3RbJyh2YXJzKSddICYmICFvcHRpb24udmFycykgewogICAgICAgICAgICB3YXJuKCdjb21iaW5lX3ZhcicpOwogICAgICAgIH0gZWxzZSBpZiAoZnVuY3QgIT09IGdsb2JhbF9mdW5jdCkgewogICAgICAgICAgICBmdW5jdFsnKHZhcnMpJ10gPSB0cnVlOwogICAgICAgIH0KICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgdGhpcy5maXJzdCA9IFtdOwogICAgICAgIHN0ZXBfaW4oJ3ZhcicpOwogICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW47CiAgICAgICAgICAgIGlkID0gaWRlbnRpZmllcigpOwogICAgICAgICAgICBhZGRfbGFiZWwobmFtZSwgJ2JlY29taW5nJyk7CgogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJz0nKSB7CiAgICAgICAgICAgICAgICBhc3NpZ24gPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgYXNzaWduLmZpcnN0ID0gbmFtZTsKICAgICAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnPScpOwogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ3VuZGVmaW5lZCcpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bm5lY2Vzc2FyeV9pbml0aWFsaXplJywgdG9rZW4sIGlkKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChwZWVrKDApLmlkID09PSAnPScgJiYgbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgndmFyX2Ffbm90Jyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhc3NpZ24uc2Vjb25kID0gZXhwcmVzc2lvbigwKTsKICAgICAgICAgICAgICAgIGFzc2lnbi5hcml0eSA9ICdpbmZpeCc7CiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0LnB1c2goYXNzaWduKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QucHVzaChuYW1lKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZnVuY3RbaWRdID09PSAnYmVjb21pbmcnKSB7CiAgICAgICAgICAgICAgICBmdW5jdFtpZF0gPSAndW51c2VkJzsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICBpbmRlbnQud3JhcCA9IGZhbHNlOwogICAgICAgICAgICBpZiAodmFyX21vZGUgJiYgbmV4dF90b2tlbi5saW5lID09PSB0b2tlbi5saW5lICYmCiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdC5sZW5ndGggPT09IDEpIHsKICAgICAgICAgICAgICAgIHZhcl9tb2RlID0gbnVsbDsKICAgICAgICAgICAgICAgIGluZGVudC5vcGVuID0gZmFsc2U7CiAgICAgICAgICAgICAgICBpbmRlbnQuYXQgLT0gb3B0aW9uLmluZGVudDsKICAgICAgICAgICAgfQogICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgZWRnZSgpOwogICAgICAgIH0KICAgICAgICB2YXJfbW9kZSA9IG51bGw7CiAgICAgICAgc3RlcF9vdXQoKTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIHN0bXQoJ2Z1bmN0aW9uJywgZnVuY3Rpb24gKCkgewogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIGlmIChpbl9ibG9jaykgewogICAgICAgICAgICB3YXJuKCdmdW5jdGlvbl9ibG9jaycsIHRva2VuKTsKICAgICAgICB9CiAgICAgICAgdmFyIG5hbWUgPSBuZXh0X3Rva2VuLCBpZCA9IGlkZW50aWZpZXIoKTsKICAgICAgICBhZGRfbGFiZWwobmFtZSwgJ3VuY3Rpb24nKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICBkb19mdW5jdGlvbih0aGlzLCBpZCk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoJyAmJiBuZXh0X3Rva2VuLmxpbmUgPT09IHRva2VuLmxpbmUpIHsKICAgICAgICAgICAgc3RvcCgnZnVuY3Rpb25fc3RhdGVtZW50Jyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgcHJlZml4KCdmdW5jdGlvbicsIGZ1bmN0aW9uICgpIHsKICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICB2YXIgaWQgPSBvcHRpb25hbF9pZGVudGlmaWVyKCk7CiAgICAgICAgaWYgKGlkKSB7CiAgICAgICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgaWQgPSAnJzsKICAgICAgICB9CiAgICAgICAgZG9fZnVuY3Rpb24odGhpcywgaWQpOwogICAgICAgIGlmIChmdW5jdFsnKGxvb3BhZ2UpJ10pIHsKICAgICAgICAgICAgd2FybignZnVuY3Rpb25fbG9vcCcpOwogICAgICAgIH0KICAgICAgICB0aGlzLmFyaXR5ID0gJ2Z1bmN0aW9uJzsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIHN0bXQoJ2lmJywgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBwYXJlbiA9IG5leHRfdG9rZW47CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgIHN0ZXBfaW4oJ2NvbnRyb2wnKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIGVkZ2UoKTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgdGhpcy5maXJzdCA9IGV4cGVjdGVkX2NvbmRpdGlvbihleHBlY3RlZF9yZWxhdGlvbihleHByZXNzaW9uKDApKSk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBzdGVwX291dCgnKScsIHBhcmVuKTsKICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICB0aGlzLmJsb2NrID0gYmxvY2sodHJ1ZSk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICdlbHNlJykgewogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnZWxzZScpOwogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgdGhpc1snZWxzZSddID0gbmV4dF90b2tlbi5pZCA9PT0gJ2lmJyB8fCBuZXh0X3Rva2VuLmlkID09PSAnc3dpdGNoJwogICAgICAgICAgICAgICAgPyBzdGF0ZW1lbnQodHJ1ZSkKICAgICAgICAgICAgICAgIDogYmxvY2sodHJ1ZSk7CiAgICAgICAgICAgIGlmICh0aGlzWydlbHNlJ10uZGlzcnVwdCAmJiB0aGlzLmJsb2NrLmRpc3J1cHQpIHsKICAgICAgICAgICAgICAgIHRoaXMuZGlzcnVwdCA9IHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBzdG10KCd0cnknLCBmdW5jdGlvbiAoKSB7CgovLyB0cnkuZmlyc3QgICAgVGhlIGNhdGNoIHZhcmlhYmxlCi8vIHRyeS5zZWNvbmQgICBUaGUgY2F0Y2ggY2xhdXNlCi8vIHRyeS50aGlyZCAgICBUaGUgZmluYWxseSBjbGF1c2UKLy8gdHJ5LmJsb2NrICAgIFRoZSB0cnkgYmxvY2sKCiAgICAgICAgdmFyIGV4Y2VwdGlvbl92YXJpYWJsZSwgb2xkX3Njb3BlLCBwYXJlbjsKICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSkgewogICAgICAgICAgICB3YXJuKCdhZHNhZmVfYScsIHRoaXMpOwogICAgICAgIH0KICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgdGhpcy5ibG9jayA9IGJsb2NrKGZhbHNlKTsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ2NhdGNoJykgewogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnY2F0Y2gnKTsKICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgIHBhcmVuID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICBzdGVwX2luKCdjb250cm9sJyk7CiAgICAgICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgb2xkX3Njb3BlID0gc2NvcGU7CiAgICAgICAgICAgIHNjb3BlID0gT2JqZWN0LmNyZWF0ZShvbGRfc2NvcGUpOwogICAgICAgICAgICBleGNlcHRpb25fdmFyaWFibGUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgdGhpcy5maXJzdCA9IGV4Y2VwdGlvbl92YXJpYWJsZTsKICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2lkZW50aWZpZXJfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgYWRkX2xhYmVsKG5leHRfdG9rZW4sICdleGNlcHRpb24nKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgICAgIHN0ZXBfb3V0KCcpJywgcGFyZW4pOwogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgdGhpcy5zZWNvbmQgPSBibG9jayhmYWxzZSk7CiAgICAgICAgICAgIHNjb3BlID0gb2xkX3Njb3BlOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ2ZpbmFsbHknKSB7CiAgICAgICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgICAgICBhZHZhbmNlKCdmaW5hbGx5Jyk7CiAgICAgICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgICAgICB0aGlzLnRoaXJkID0gYmxvY2soZmFsc2UpOwogICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc2Vjb25kKSB7CiAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICdjYXRjaCcsIGFydGlmYWN0KCkpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIGxhYmVsZWRfc3RtdCgnd2hpbGUnLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdmFyIHBhcmVuID0gbmV4dF90b2tlbjsKICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddICs9IDE7CiAgICAgICAgZnVuY3RbJyhsb29wYWdlKSddICs9IDE7CiAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgIHN0ZXBfaW4oJ2NvbnRyb2wnKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIGVkZ2UoKTsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgdGhpcy5maXJzdCA9IGV4cGVjdGVkX3JlbGF0aW9uKGV4cHJlc3Npb24oMCkpOwogICAgICAgIGlmICh0aGlzLmZpcnN0LmlkICE9PSAndHJ1ZScpIHsKICAgICAgICAgICAgZXhwZWN0ZWRfY29uZGl0aW9uKHRoaXMuZmlyc3QsIGJ1bmRsZS51bmV4cGVjdGVkX2EpOwogICAgICAgIH0KICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHN0ZXBfb3V0KCcpJywgcGFyZW4pOwogICAgICAgIG9uZV9zcGFjZSgpOwogICAgICAgIHRoaXMuYmxvY2sgPSBibG9jayh0cnVlKTsKICAgICAgICBpZiAodGhpcy5ibG9jay5kaXNydXB0KSB7CiAgICAgICAgICAgIHdhcm4oJ3N0cmFuZ2VfbG9vcCcsIHByZXZfdG9rZW4pOwogICAgICAgIH0KICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddIC09IDE7CiAgICAgICAgZnVuY3RbJyhsb29wYWdlKSddIC09IDE7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICByZXNlcnZlKCd3aXRoJyk7CgogICAgbGFiZWxlZF9zdG10KCdzd2l0Y2gnLCBmdW5jdGlvbiAoKSB7CgovLyBzd2l0Y2guZmlyc3QgICAgICAgICB0aGUgc3dpdGNoIGV4cHJlc3Npb24KLy8gc3dpdGNoLnNlY29uZCAgICAgICAgdGhlIGFycmF5IG9mIGNhc2VzLiBBIGNhc2UgaXMgJ2Nhc2UnIG9yICdkZWZhdWx0JyB0b2tlbjoKLy8gICAgY2FzZS5maXJzdCAgICAgICAgdGhlIGFycmF5IG9mIGNhc2UgZXhwcmVzc2lvbnMKLy8gICAgY2FzZS5zZWNvbmQgICAgICAgdGhlIGFycmF5IG9mIHN0YXRlbWVudHMKLy8gSWYgYWxsIG9mIHRoZSBhcnJheXMgb2Ygc3RhdGVtZW50cyBhcmUgZGlzcnVwdCwgdGhlbiB0aGUgc3dpdGNoIGlzIGRpc3J1cHQuCgogICAgICAgIHZhciBjYXNlcyA9IFtdLAogICAgICAgICAgICBvbGRfaW5fYmxvY2sgPSBpbl9ibG9jaywKICAgICAgICAgICAgcGFydGljdWxhciwKICAgICAgICAgICAgdGhlX2Nhc2UgPSBuZXh0X3Rva2VuLAogICAgICAgICAgICB1bmJyb2tlbiA9IHRydWU7CgogICAgICAgIGZ1bmN0aW9uIGZpbmRfZHVwbGljYXRlX2Nhc2UodmFsdWUpIHsKICAgICAgICAgICAgaWYgKGFyZV9zaW1pbGFyKHBhcnRpY3VsYXIsIHZhbHVlKSkgewogICAgICAgICAgICAgICAgd2FybignZHVwbGljYXRlX2EnLCB2YWx1ZSk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGZ1bmN0WycoYnJlYWthZ2UpJ10gKz0gMTsKICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgbm9fc3BhY2UoKTsKICAgICAgICBzdGVwX2luKCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuZmlyc3QgPSBleHBlY3RlZF9jb25kaXRpb24oZXhwZWN0ZWRfcmVsYXRpb24oZXhwcmVzc2lvbigwKSkpOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgc3RlcF9vdXQoJyknLCB0aGVfY2FzZSk7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgYWR2YW5jZSgneycpOwogICAgICAgIHN0ZXBfaW4oKTsKICAgICAgICBpbl9ibG9jayA9IHRydWU7CiAgICAgICAgdGhpcy5zZWNvbmQgPSBbXTsKICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJ2Nhc2UnKSB7CiAgICAgICAgICAgIHRoZV9jYXNlID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgY2FzZXMuZm9yRWFjaChmaW5kX2R1cGxpY2F0ZV9jYXNlKTsKICAgICAgICAgICAgdGhlX2Nhc2UuZmlyc3QgPSBbXTsKICAgICAgICAgICAgdGhlX2Nhc2UuYXJpdHkgPSAnY2FzZSc7CiAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICBlZGdlKCdjYXNlJyk7CiAgICAgICAgICAgIGFkdmFuY2UoJ2Nhc2UnKTsKICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgICAgICAgICBwYXJ0aWN1bGFyID0gZXhwcmVzc2lvbigwKTsKICAgICAgICAgICAgICAgIGNhc2VzLmZvckVhY2goZmluZF9kdXBsaWNhdGVfY2FzZSk7CiAgICAgICAgICAgICAgICBjYXNlcy5wdXNoKHBhcnRpY3VsYXIpOwogICAgICAgICAgICAgICAgdGhlX2Nhc2UuZmlyc3QucHVzaChwYXJ0aWN1bGFyKTsKICAgICAgICAgICAgICAgIGlmIChwYXJ0aWN1bGFyLmlkID09PSAnTmFOJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHBhcnRpY3VsYXIpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICdjYXNlJykgewogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgICAgICBlZGdlKCdjYXNlJyk7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCdjYXNlJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc3BhY2VzKCk7CiAgICAgICAgICAgIHRoZV9jYXNlLnNlY29uZCA9IHN0YXRlbWVudHMoKTsKICAgICAgICAgICAgaWYgKHRoZV9jYXNlLnNlY29uZCAmJiB0aGVfY2FzZS5zZWNvbmQubGVuZ3RoID4gMCkgewogICAgICAgICAgICAgICAgcGFydGljdWxhciA9IHRoZV9jYXNlLnNlY29uZFt0aGVfY2FzZS5zZWNvbmQubGVuZ3RoIC0gMV07CiAgICAgICAgICAgICAgICBpZiAocGFydGljdWxhci5kaXNydXB0KSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRpY3VsYXIuaWQgPT09ICdicmVhaycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgdW5icm9rZW4gPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ21pc3NpbmdfYV9hZnRlcl9iJywgbmV4dF90b2tlbiwgJ2JyZWFrJywgJ2Nhc2UnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2VtcHR5X2Nhc2UnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB0aGlzLnNlY29uZC5wdXNoKHRoZV9jYXNlKTsKICAgICAgICB9CiAgICAgICAgaWYgKHRoaXMuc2Vjb25kLmxlbmd0aCA9PT0gMCkgewogICAgICAgICAgICB3YXJuKCdtaXNzaW5nX2EnLCBuZXh0X3Rva2VuLCAnY2FzZScpOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ2RlZmF1bHQnKSB7CiAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICB0aGVfY2FzZSA9IG5leHRfdG9rZW47CiAgICAgICAgICAgIHRoZV9jYXNlLmFyaXR5ID0gJ2Nhc2UnOwogICAgICAgICAgICBlZGdlKCdjYXNlJyk7CiAgICAgICAgICAgIGFkdmFuY2UoJ2RlZmF1bHQnKTsKICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgIHNwYWNlcygpOwogICAgICAgICAgICB0aGVfY2FzZS5zZWNvbmQgPSBzdGF0ZW1lbnRzKCk7CiAgICAgICAgICAgIGlmICh0aGVfY2FzZS5zZWNvbmQgJiYgdGhlX2Nhc2Uuc2Vjb25kLmxlbmd0aCA+IDApIHsKICAgICAgICAgICAgICAgIHBhcnRpY3VsYXIgPSB0aGVfY2FzZS5zZWNvbmRbdGhlX2Nhc2Uuc2Vjb25kLmxlbmd0aCAtIDFdOwogICAgICAgICAgICAgICAgaWYgKHVuYnJva2VuICYmIHBhcnRpY3VsYXIuZGlzcnVwdCAmJiBwYXJ0aWN1bGFyLmlkICE9PSAnYnJlYWsnKSB7CiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNydXB0ID0gdHJ1ZTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICB0aGlzLnNlY29uZC5wdXNoKHRoZV9jYXNlKTsKICAgICAgICB9CiAgICAgICAgZnVuY3RbJyhicmVha2FnZSknXSAtPSAxOwogICAgICAgIHNwYWNlcygpOwogICAgICAgIHN0ZXBfb3V0KCd9JywgdGhpcyk7CiAgICAgICAgaW5fYmxvY2sgPSBvbGRfaW5fYmxvY2s7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBzdG10KCdkZWJ1Z2dlcicsIGZ1bmN0aW9uICgpIHsKICAgICAgICBpZiAoIW9wdGlvbi5kZWJ1ZykgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgbGFiZWxlZF9zdG10KCdkbycsIGZ1bmN0aW9uICgpIHsKICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddICs9IDE7CiAgICAgICAgZnVuY3RbJyhsb29wYWdlKSddICs9IDE7CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIHRoaXMuYmxvY2sgPSBibG9jayh0cnVlKTsKICAgICAgICBpZiAodGhpcy5ibG9jay5kaXNydXB0KSB7CiAgICAgICAgICAgIHdhcm4oJ3N0cmFuZ2VfbG9vcCcsIHByZXZfdG9rZW4pOwogICAgICAgIH0KICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICBhZHZhbmNlKCd3aGlsZScpOwogICAgICAgIHZhciBwYXJlbiA9IG5leHRfdG9rZW47CiAgICAgICAgb25lX3NwYWNlKCk7CiAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgIHN0ZXBfaW4oKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIGVkZ2UoKTsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwZWN0ZWRfY29uZGl0aW9uKGV4cGVjdGVkX3JlbGF0aW9uKGV4cHJlc3Npb24oMCkpLCBidW5kbGUudW5leHBlY3RlZF9hKTsKICAgICAgICBub19zcGFjZSgpOwogICAgICAgIHN0ZXBfb3V0KCcpJywgcGFyZW4pOwogICAgICAgIGZ1bmN0WycoYnJlYWthZ2UpJ10gLT0gMTsKICAgICAgICBmdW5jdFsnKGxvb3BhZ2UpJ10gLT0gMTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0pOwoKICAgIGxhYmVsZWRfc3RtdCgnZm9yJywgZnVuY3Rpb24gKCkgewoKICAgICAgICB2YXIgYmxvaywgZmlsdGVyLCBvayA9IGZhbHNlLCBwYXJlbiA9IG5leHRfdG9rZW4sIHZhbHVlOwogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddICs9IDE7CiAgICAgICAgZnVuY3RbJyhsb29wYWdlKSddICs9IDE7CiAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgIHN0ZXBfaW4oJ2NvbnRyb2wnKTsKICAgICAgICBzcGFjZXModGhpcywgcGFyZW4pOwogICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICd2YXInKSB7CiAgICAgICAgICAgIHN0b3AoJ21vdmVfdmFyJyk7CiAgICAgICAgfQogICAgICAgIGVkZ2UoKTsKICAgICAgICBpZiAocGVlaygwKS5pZCA9PT0gJ2luJykgewogICAgICAgICAgICB0aGlzLmZvcmluID0gdHJ1ZTsKICAgICAgICAgICAgdmFsdWUgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICBzd2l0Y2ggKGZ1bmN0W3ZhbHVlLnN0cmluZ10pIHsKICAgICAgICAgICAgY2FzZSAndW51c2VkJzoKICAgICAgICAgICAgICAgIGZ1bmN0W3ZhbHVlLnN0cmluZ10gPSAndmFyJzsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICdjbG9zdXJlJzoKICAgICAgICAgICAgY2FzZSAndmFyJzoKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgd2FybignYmFkX2luX2EnLCB2YWx1ZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBhZHZhbmNlKCdpbicpOwogICAgICAgICAgICB0aGlzLmZpcnN0ID0gdmFsdWU7CiAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gZXhwcmVzc2lvbigyMCk7CiAgICAgICAgICAgIHN0ZXBfb3V0KCcpJywgcGFyZW4pOwogICAgICAgICAgICBibG9rID0gYmxvY2sodHJ1ZSk7CiAgICAgICAgICAgIGlmICghb3B0aW9uLmZvcmluKSB7CiAgICAgICAgICAgICAgICBpZiAoYmxvay5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGJsb2tbMF0gPT09ICdvYmplY3QnICYmCiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2tbMF0uc3RyaW5nID09PSAnaWYnICYmICFibG9rWzBdWydlbHNlJ10pIHsKICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBibG9rWzBdLmZpcnN0OwogICAgICAgICAgICAgICAgICAgIHdoaWxlIChmaWx0ZXIuaWQgPT09ICcmJicpIHsKICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gZmlsdGVyLmZpcnN0OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpbHRlci5pZCkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgJz09PSc6CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnIT09JzoKICAgICAgICAgICAgICAgICAgICAgICAgb2sgPSBmaWx0ZXIuZmlyc3QuaWQgPT09ICdbJwogICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBmaWx0ZXIuZmlyc3QuZmlyc3Quc3RyaW5nID09PSB0aGlzLnNlY29uZC5zdHJpbmcgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3Quc2Vjb25kLnN0cmluZyA9PT0gdGhpcy5maXJzdC5zdHJpbmcKICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmlsdGVyLmZpcnN0LmlkID09PSAndHlwZW9mJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5pZCA9PT0gJ1snICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LmZpcnN0LnN0cmluZyA9PT0gdGhpcy5zZWNvbmQuc3RyaW5nICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LnNlY29uZC5zdHJpbmcgPT09IHRoaXMuZmlyc3Quc3RyaW5nOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICcoJzoKICAgICAgICAgICAgICAgICAgICAgICAgb2sgPSBmaWx0ZXIuZmlyc3QuaWQgPT09ICcuJyAmJiAoKAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LnN0cmluZyA9PT0gdGhpcy5zZWNvbmQuc3RyaW5nICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3Quc2Vjb25kLnN0cmluZyA9PT0gJ2hhc093blByb3BlcnR5JyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlY29uZFswXS5zdHJpbmcgPT09IHRoaXMuZmlyc3Quc3RyaW5nCiAgICAgICAgICAgICAgICAgICAgICAgICkgfHwgKAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LnN0cmluZyA9PT0gJ0FEU0FGRScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5zZWNvbmQuc3RyaW5nID09PSAnaGFzJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlY29uZFswXS5zdHJpbmcgPT09IHRoaXMuc2Vjb25kLnN0cmluZyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlY29uZFsxXS5zdHJpbmcgPT09IHRoaXMuZmlyc3Quc3RyaW5nCiAgICAgICAgICAgICAgICAgICAgICAgICkgfHwgKAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LmlkID09PSAnLicgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5maXJzdC5maXJzdC5maXJzdC5pZCA9PT0gJy4nICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3QuZmlyc3QuZmlyc3QuZmlyc3Quc3RyaW5nID09PSAnT2JqZWN0JyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LmZpcnN0LmZpcnN0LnNlY29uZC5zdHJpbmcgPT09ICdwcm90b3R5cGUnICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZmlyc3QuZmlyc3Quc2Vjb25kLnN0cmluZyA9PT0gJ2hhc093blByb3BlcnR5JyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmZpcnN0LnNlY29uZC5zdHJpbmcgPT09ICdjYWxsJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlY29uZFswXS5zdHJpbmcgPT09IHRoaXMuc2Vjb25kLnN0cmluZyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlY29uZFsxXS5zdHJpbmcgPT09IHRoaXMuZmlyc3Quc3RyaW5nCiAgICAgICAgICAgICAgICAgICAgICAgICkpOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoIW9rKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZm9yX2lmJywgdGhpcyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJzsnKSB7CiAgICAgICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gW107CiAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdC5wdXNoKGV4cHJlc3Npb24oMCwgJ2ZvcicpKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJzsnKSB7CiAgICAgICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZCA9IGV4cGVjdGVkX3JlbGF0aW9uKGV4cHJlc3Npb24oMCkpOwogICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Vjb25kLmlkICE9PSAndHJ1ZScpIHsKICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9jb25kaXRpb24odGhpcy5zZWNvbmQsIGJ1bmRsZS51bmV4cGVjdGVkX2EpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHNlbWljb2xvbih0b2tlbik7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOycpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICcpJywgJzsnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyknKSB7CiAgICAgICAgICAgICAgICB0aGlzLnRoaXJkID0gW107CiAgICAgICAgICAgICAgICBlZGdlKCk7CiAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGlyZC5wdXNoKGV4cHJlc3Npb24oMCwgJ2ZvcicpKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIG5vX3NwYWNlKCk7CiAgICAgICAgICAgIHN0ZXBfb3V0KCcpJywgcGFyZW4pOwogICAgICAgICAgICBvbmVfc3BhY2UoKTsKICAgICAgICAgICAgYmxvayA9IGJsb2NrKHRydWUpOwogICAgICAgIH0KICAgICAgICBpZiAoYmxvay5kaXNydXB0KSB7CiAgICAgICAgICAgIHdhcm4oJ3N0cmFuZ2VfbG9vcCcsIHByZXZfdG9rZW4pOwogICAgICAgIH0KICAgICAgICB0aGlzLmJsb2NrID0gYmxvazsKICAgICAgICBmdW5jdFsnKGJyZWFrYWdlKSddIC09IDE7CiAgICAgICAgZnVuY3RbJyhsb29wYWdlKSddIC09IDE7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBkaXNydXB0X3N0bXQoJ2JyZWFrJywgZnVuY3Rpb24gKCkgewogICAgICAgIHZhciBsYWJlbCA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgIHRoaXMuYXJpdHkgPSAnc3RhdGVtZW50JzsKICAgICAgICBpZiAoZnVuY3RbJyhicmVha2FnZSknXSA9PT0gMCkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiB0b2tlbi5saW5lID09PSBuZXh0X3Rva2VuLmxpbmUpIHsKICAgICAgICAgICAgb25lX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgaWYgKGZ1bmN0W2xhYmVsXSAhPT0gJ2xhYmVsJykgewogICAgICAgICAgICAgICAgd2Fybignbm90X2FfbGFiZWwnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgfSBlbHNlIGlmIChzY29wZVtsYWJlbF0uZnVuY3QgIT09IGZ1bmN0KSB7CiAgICAgICAgICAgICAgICB3YXJuKCdub3RfYV9zY29wZScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBuZXh0X3Rva2VuOwogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgZGlzcnVwdF9zdG10KCdjb250aW51ZScsIGZ1bmN0aW9uICgpIHsKICAgICAgICBpZiAoIW9wdGlvblsnY29udGludWUnXSkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgdmFyIGxhYmVsID0gbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIGlmIChmdW5jdFsnKGJyZWFrYWdlKSddID09PSAwKSB7CiAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHRoaXMpOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmIHRva2VuLmxpbmUgPT09IG5leHRfdG9rZW4ubGluZSkgewogICAgICAgICAgICBvbmVfc3BhY2Vfb25seSgpOwogICAgICAgICAgICBpZiAoZnVuY3RbbGFiZWxdICE9PSAnbGFiZWwnKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdub3RfYV9sYWJlbCcsIG5leHRfdG9rZW4pOwogICAgICAgICAgICB9IGVsc2UgaWYgKHNjb3BlW2xhYmVsXS5mdW5jdCAhPT0gZnVuY3QpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ25vdF9hX3Njb3BlJywgbmV4dF90b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5maXJzdCA9IG5leHRfdG9rZW47CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCiAgICBkaXNydXB0X3N0bXQoJ3JldHVybicsIGZ1bmN0aW9uICgpIHsKICAgICAgICBpZiAoZnVuY3QgPT09IGdsb2JhbF9mdW5jdCkgewogICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0aGlzKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5hcml0eSA9ICdzdGF0ZW1lbnQnOwogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnOycgJiYgbmV4dF90b2tlbi5saW5lID09PSB0b2tlbi5saW5lKSB7CiAgICAgICAgICAgIG9uZV9zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLycgfHwgbmV4dF90b2tlbi5pZCA9PT0gJyhyZWdleHApJykgewogICAgICAgICAgICAgICAgd2Fybignd3JhcF9yZWdleHAnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB0aGlzLmZpcnN0ID0gZXhwcmVzc2lvbigyMCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfSk7CgogICAgZGlzcnVwdF9zdG10KCd0aHJvdycsIGZ1bmN0aW9uICgpIHsKICAgICAgICB0aGlzLmFyaXR5ID0gJ3N0YXRlbWVudCc7CiAgICAgICAgb25lX3NwYWNlX29ubHkoKTsKICAgICAgICB0aGlzLmZpcnN0ID0gZXhwcmVzc2lvbigyMCk7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9KTsKCgovLyAgU3VwZXJmbHVvdXMgcmVzZXJ2ZWQgd29yZHMKCiAgICByZXNlcnZlKCdjbGFzcycpOwogICAgcmVzZXJ2ZSgnY29uc3QnKTsKICAgIHJlc2VydmUoJ2VudW0nKTsKICAgIHJlc2VydmUoJ2V4cG9ydCcpOwogICAgcmVzZXJ2ZSgnZXh0ZW5kcycpOwogICAgcmVzZXJ2ZSgnaW1wb3J0Jyk7CiAgICByZXNlcnZlKCdzdXBlcicpOwoKLy8gSGFybW9ueSByZXNlcnZlZCB3b3JkcwoKICAgIHJlc2VydmUoJ2ltcGxlbWVudHMnKTsKICAgIHJlc2VydmUoJ2ludGVyZmFjZScpOwogICAgcmVzZXJ2ZSgnbGV0Jyk7CiAgICByZXNlcnZlKCdwYWNrYWdlJyk7CiAgICByZXNlcnZlKCdwcml2YXRlJyk7CiAgICByZXNlcnZlKCdwcm90ZWN0ZWQnKTsKICAgIHJlc2VydmUoJ3B1YmxpYycpOwogICAgcmVzZXJ2ZSgnc3RhdGljJyk7CiAgICByZXNlcnZlKCd5aWVsZCcpOwoKCi8vIFR5cGUgaW5mZXJlbmNlCgovLyAgICAgZnVuY3Rpb24gZ2V0X3R5cGUob25lKSB7Ci8vICAgICAgICAgdmFyIHR5cGU7Ci8vICAgICAgICAgaWYgKHR5cGVvZiBvbmUgPT09ICdzdHJpbmcnKSB7Ci8vICAgICAgICAgICAgIHJldHVybiBvbmU7Ci8vICAgICAgICAgfSBlbHNlIGlmIChvbmUudHlwZSkgewovLyAgICAgICAgICAgICByZXR1cm4gb25lLnR5cGU7Ci8vICAgICAgICAgfSBlbHNlIGlmIChvbmUuaWQgPT09ICcuJykgewovLyAgICAgICAgICAgICB0eXBlID0gcHJvcGVydHlfdHlwZVtvbmUuc2Vjb25kLnN0cmluZ107Ci8vICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlIDogJyc7Ci8vICAgICAgICAgfSBlbHNlIHsKLy8gICAgICAgICAgICAgcmV0dXJuICgob25lLmlkZW50aWZpZXIgJiYgc2NvcGVbb25lLnN0cmluZ10pIHx8IG9uZSkudHlwZTsKLy8gICAgICAgICB9Ci8vICAgICB9CgoKLy8gICAgIGZ1bmN0aW9uIG1hdGNoX3R5cGUob25lX3R5cGUsIHR3b190eXBlLCBvbmUsIHR3bykgewovLyAgICAgICAgIGlmIChvbmVfdHlwZSA9PT0gdHdvX3R5cGUpIHsKLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7Ci8vICAgICAgICAgfSBlbHNlIHsKLy8gICAgICAgICAgICAgaWYgKCFmdW5jdC5jb25mdXNpb24gJiYgIXR3by53YXJuKSB7Ci8vICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uZSAhPT0gJ3N0cmluZycpIHsKLy8gICAgICAgICAgICAgICAgICAgICBpZiAob25lLmlkID09PSAnLicpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25lX3R5cGUgPSAnLicgKyBvbmUuc2Vjb25kLnN0cmluZyArICc6ICcgKyBvbmVfdHlwZTsKLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewovLyAgICAgICAgICAgICAgICAgICAgICAgICBvbmVfdHlwZSA9IG9uZS5zdHJpbmcgKyAnOiAnICsgb25lX3R5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgaWYgKHR3by5pZCA9PT0gJy4nKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgdHdvX3R5cGUgPSAnLicgKyB0d28uc2Vjb25kLnN0cmluZyArICc6ICcgKyBvbmVfdHlwZTsKLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgICAgICAgICAgdHdvX3R5cGUgPSB0d28uc3RyaW5nICsgJzogJyArIG9uZV90eXBlOwovLyAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgd2FybigndHlwZV9jb25mdXNpb25fYV9iJywgdHdvLCBvbmVfdHlwZSwgdHdvX3R5cGUpOwovLyAgICAgICAgICAgICAgICAgdHdvLndhcm4gPSB0cnVlOwovLyAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTsKLy8gICAgICAgICB9Ci8vICAgICB9CgoKLy8gICAgIGZ1bmN0aW9uIGNvbmZvcm0ob25lLCB0d28pIHsKLy8KLy8gLy8gVGhlIGNvbmZvcm0gZnVuY3Rpb24gdGFrZXMgYSB0eXBlIHN0cmluZyBhbmQgYSB0b2tlbiwgb3IgdHdvIHRva2Vucy4KLy8KLy8gICAgICAgICB2YXIgb25lX3R5cGUgPSB0eXBlb2Ygb25lID09PSAnc3RyaW5nJyA/IG9uZSA6IG9uZS50eXBlLAovLyAgICAgICAgICAgICB0d29fdHlwZSA9IHR3by50eXBlLAovLyAgICAgICAgICAgICB0d29fdGhpbmc7Ci8vCi8vIC8vIElmIGJvdGggdG9rZW5zIGFscmVhZHkgaGF2ZSBhIHR5cGUsIGFuZCBpZiB0aGV5IG1hdGNoLCB0aGVuIHdlIGFyZSBkb25lLgovLyAvLyBPbmNlIGEgdG9rZW4gaGFzIGEgdHlwZSwgaXQgaXMgbG9ja2VkLiBOZWl0aGVyIHRva2VuIHdpbGwgY2hhbmdlLCBidXQgaWYKLy8gLy8gdGhleSBkbyBub3QgbWF0Y2gsIHRoZXJlIHdpbGwgYmUgYSB3YXJuaW5nLgovLwovLyAgICAgICAgIGlmIChvbmVfdHlwZSkgewovLyAgICAgICAgICAgICBpZiAodHdvX3R5cGUpIHsKLy8gICAgICAgICAgICAgICAgIG1hdGNoX3R5cGUob25lX3R5cGUsIHR3b190eXBlLCBvbmUsIHR3byk7Ci8vICAgICAgICAgICAgIH0gZWxzZSB7Ci8vCi8vIC8vIHR3byBkb2VzIG5vdCBoYXZlIGEgdHlwZSwgc28gbG9vayBkZWVwZXIuIElmIHR3byBpcyBhIHZhcmlhYmxlIG9yIHByb3BlcnR5LAovLyAvLyB0aGVuIHVzZSBpdHMgdHlwZSBpZiBpdCBoYXMgb25lLCBhbmQgbWFrZSB0aGUgZGVlcCB0eXBlIG9uZSdzIHR5cGUgaWYgaXQKLy8gLy8gZG9lc24ndC4gSWYgdGhlIHR5cGUgd2FzICosIG9yIGlmIHRoZXJlIHdhcyBhIG1pc21hdGNoLCBkb24ndCBjaGFuZ2UgdGhlCi8vIC8vIGRlZXAgdHlwZS4KLy8KLy8gICAgICAgICAgICAgICAgIHR3b190aGluZyA9IHR3by5pZCA9PT0gJyhpZGVudGlmaWVyKScKLy8gICAgICAgICAgICAgICAgICAgICA/IHNjb3BlW3R3by5zdHJpbmddCi8vICAgICAgICAgICAgICAgICAgICAgOiB0d28uaWQgPT09ICcuJwovLyAgICAgICAgICAgICAgICAgICAgID8gcHJvcGVydHlfdHlwZVt0d28uc2Vjb25kLnN0cmluZ10KLy8gICAgICAgICAgICAgICAgICAgICA6IG51bGw7Ci8vICAgICAgICAgICAgICAgICBpZiAodHdvX3RoaW5nKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgdHdvX3R5cGUgPSB0d29fdGhpbmcudHlwZTsKLy8gICAgICAgICAgICAgICAgICAgICBpZiAodHdvX3R5cGUpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR3b190eXBlICE9PSAnKicpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hfdHlwZShvbmVfdHlwZSwgdHdvX3R5cGUsIG9uZSwgdHdvKSkgewovLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJzsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIHR3b190aGluZy50eXBlID0gb25lX3R5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgfQovLwovLyAvLyBJbiBhbnkgY2FzZSwgd2UgZ2l2ZSB0d28gYSB0eXBlLgovLwovLyAgICAgICAgICAgICAgICAgdHdvLnR5cGUgPSBvbmVfdHlwZTsKLy8gICAgICAgICAgICAgICAgIHR5cGVfc3RhdGVfY2hhbmdlID0gdHJ1ZTsKLy8gICAgICAgICAgICAgICAgIHJldHVybiBvbmVfdHlwZTsKLy8gICAgICAgICAgICAgfQovLwovLyAvLyBvbmUgZG9lcyBub3QgaGF2ZSBhIHR5cGUsIGJ1dCB0d28gZG9lcywgc28gZG8gdGhlIG9sZCBzd2l0Y2hlcm9vLgovLwovLyAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgIGlmICh0d29fdHlwZSkgewovLyAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZvcm0odHdvLCBvbmUpOwovLwovLyAvLyBOZWl0aGVyIHRva2VuIGhhcyBhIHR5cGUgeWV0LiBTbyB3ZSBoYXZlIHRvIGxvb2sgZGVlcGVyIHRvIHNlZSBpZiBlaXRoZXIKLy8gLy8gaXMgYSB2YXJpYWJsZSBvciBwcm9wZXJ0eS4KLy8KLy8gICAgICAgICAgICAgfSBlbHNlIHsKLy8gICAgICAgICAgICAgICAgIGlmIChvbmUuaWQgPT09ICcoaWRlbnRpZmllciknKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgb25lX3R5cGUgPSBzY29wZVtvbmUuc3RyaW5nXS50eXBlOwovLyAgICAgICAgICAgICAgICAgICAgIGlmIChvbmVfdHlwZSAmJiBvbmVfdHlwZSAhPT0gJyonKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uZS50eXBlID0gb25lX3R5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25mb3JtKG9uZSwgdHdvKTsKLy8gICAgICAgICAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9uZS5pZCA9PT0gJy4nKSB7Ci8vICAgICAgICAgICAgICAgICAgICAgb25lX3R5cGUgPSBwcm9wZXJ0eV90eXBlW29uZS5zZWNvbmQuc3RyaW5nXTsKLy8gICAgICAgICAgICAgICAgICAgICBpZiAob25lX3R5cGUgJiYgb25lX3R5cGUgIT09ICcqJykgewovLyAgICAgICAgICAgICAgICAgICAgICAgICBvbmUudHlwZSA9IHNjb3BlW29uZS5zdHJpbmddLnR5cGU7Ci8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25mb3JtKG9uZSwgdHdvKTsKLy8gICAgICAgICAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgICAgICBpZiAodHdvLmlkID09PSAnKGlkZW50aWZpZXIpJykgewovLyAgICAgICAgICAgICAgICAgICAgIHR3b190eXBlID0gc2NvcGVbdHdvLnN0cmluZ10udHlwZTsKLy8gICAgICAgICAgICAgICAgICAgICBpZiAodHdvX3R5cGUgJiYgdHdvX3R5cGUgIT09ICcqJykgewovLyAgICAgICAgICAgICAgICAgICAgICAgICB0d28udHlwZSA9IHR3b190eXBlOwovLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZm9ybSh0d28sIG9uZSk7Ci8vICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0d28uaWQgPT09ICcuJykgewovLyAgICAgICAgICAgICAgICAgICAgIHR3b190eXBlID0gcHJvcGVydHlfdHlwZVt0d28uc2Vjb25kLnN0cmluZ107Ci8vICAgICAgICAgICAgICAgICAgICAgaWYgKHR3b190eXBlICYmIHR3b190eXBlICE9PSAnKicpIHsKLy8gICAgICAgICAgICAgICAgICAgICAgICAgdHdvLnR5cGUgPSBzY29wZVt0d28uc3RyaW5nXS50eXBlOwovLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZm9ybSh0d28sIG9uZSk7Ci8vICAgICAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICAgICAgfQovLyAgICAgICAgICAgICB9Ci8vICAgICAgICAgfQovLwovLyAvLyBSZXR1cm4gYSBmYWxzeSBzdHJpbmcgaWYgd2Ugd2VyZSB1bmFibGUgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGVpdGhlciB0b2tlbi4KLy8KLy8gICAgICAgICByZXR1cm4gJyc7Ci8vICAgICB9CgovLyAgICAgZnVuY3Rpb24gY29uZm9ybV9hcnJheSh0eXBlLCBhcnJheSkgewovLyAgICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsKLy8gICAgICAgICAgICAgcmV0dXJuIGNvbmZvcm0odHlwZSwgaXRlbSk7Ci8vICAgICAgICAgfSwgdHlwZSk7Ci8vICAgICB9CgoKLy8gICAgIGZ1bmN0aW9uIGluZmVyKG5vZGUpIHsKLy8gICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkgewovLyAgICAgICAgICAgICBub2RlLmZvckVhY2goaW5mZXIpOwovLyAgICAgICAgIH0gZWxzZSB7Ci8vICAgICAgICAgICAgIHN3aXRjaCAobm9kZS5hcml0eSkgewovLyAgICAgICAgICAgICBjYXNlICdzdGF0ZW1lbnQnOgovLyAgICAgICAgICAgICAgICAgaW5mZXJfc3RhdGVtZW50W25vZGUuaWRdKG5vZGUpOwovLyAgICAgICAgICAgICAgICAgYnJlYWs7Ci8vICAgICAgICAgICAgIGNhc2UgJ2luZml4JzoKLy8gICAgICAgICAgICAgICAgIGluZmVyKG5vZGUuZmlyc3QpOwovLyAgICAgICAgICAgICAgICAgaW5mZXIobm9kZS5zZWNvbmQpOwovLyAgICAgICAgICAgICAgICAgc3dpdGNoIChub2RlLmlkKSB7Ci8vICAgICAgICAgICAgICAgICBjYXNlICcoJzoKLy8gICAgICAgICAgICAgICAgICAgICBjb25mb3JtKCdmdW5jdGlvbicsIG5vZGUuZmlyc3QpOwovLyAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwovLyAgICAgICAgICAgICAgICAgZGVmYXVsdDoKLy8gICAgICAgICAgICAgICAgICAgICBzdG9wKCd1bmZpbmlzaGVkJyk7Ci8vICAgICAgICAgICAgICAgICB9Ci8vICAgICAgICAgICAgICAgICBicmVhazsKLy8gICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzoKLy8gICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzoKLy8gICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6Ci8vICAgICAgICAgICAgICAgICBicmVhazsKLy8gICAgICAgICAgICAgZGVmYXVsdDoKLy8gICAgICAgICAgICAgICAgIHN0b3AoJ3VuZmluaXNoZWQnKTsKLy8gICAgICAgICAgICAgfQovLyAgICAgICAgIH0KLy8gICAgIH0KCgovLyAgICAgaW5mZXJfc3RhdGVtZW50ID0gewovLyAgICAgICAgICd2YXInOiBmdW5jdGlvbiAobm9kZSkgewovLyAgICAgICAgICAgICB2YXIgaSwgaXRlbSwgbGlzdCA9IG5vZGUuZmlyc3Q7Ci8vICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7Ci8vICAgICAgICAgICAgICAgICBpdGVtID0gbGlzdFtpXTsKLy8gICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSAnPScpIHsKLy8gICAgICAgICAgICAgICAgICAgICBpbmZlcihpdGVtLnNlY29uZCk7Ci8vICAgICAgICAgICAgICAgICAgICAgY29uZm9ybShpdGVtLmZpcnN0LCBpdGVtLnNlY29uZCk7Ci8vICAgICAgICAgICAgICAgICAgICAgY29uZm9ybShpdGVtLmZpcnN0LCBpdGVtKTsKLy8gICAgICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgfQovLyAgICAgICAgIH0sCi8vICAgICAgICAgJ2Zvcic6IGZ1bmN0aW9uIChub2RlKSB7Ci8vICAgICAgICAgICAgIGluZmVyKG5vZGUuZmlyc3QpOwovLyAgICAgICAgICAgICBpbmZlcihub2RlLnNlY29uZCk7Ci8vICAgICAgICAgICAgIGlmIChub2RlLmZvcmluKSB7Ci8vICAgICAgICAgICAgICAgICBjb25mb3JtKCdzdHJpbmcnLCBub2RlLmZpcnN0KTsKLy8gICAgICAgICAgICAgICAgIGNvbmZvcm0oJ29iamVjdCcsIG5vZGUuc2Vjb25kKTsKLy8gICAgICAgICAgICAgfSBlbHNlIHsKLy8gICAgICAgICAgICAgICAgIGluZmVyKG5vZGUudGhpcmQpOwovLyAgICAgICAgICAgICAgICAgY29uZm9ybV9hcnJheSgnbnVtYmVyJywgbm9kZS5maXJzdCk7Ci8vICAgICAgICAgICAgICAgICBjb25mb3JtKCdib29sZWFuJywgbm9kZS5zZWNvbmQpOwovLyAgICAgICAgICAgICAgICAgY29uZm9ybV9hcnJheSgnbnVtYmVyJywgbm9kZS50aGlyZCk7Ci8vICAgICAgICAgICAgIH0KLy8gICAgICAgICAgICAgaW5mZXIobm9kZS5ibG9jayk7Ci8vICAgICAgICAgfQovLyAgICAgfTsKCgovLyAgICAgZnVuY3Rpb24gaW5mZXJfdHlwZXMobm9kZSkgewovLyAgICAgICAgIGRvIHsKLy8gICAgICAgICAgICAgZnVuY3QgPSBnbG9iYWxfZnVuY3Q7Ci8vICAgICAgICAgICAgIHNjb3BlID0gZ2xvYmFsX3Njb3BlOwovLyAgICAgICAgICAgICB0eXBlX3N0YXRlX2NoYW5nZSA9IGZhbHNlOwovLyAgICAgICAgICAgICBpbmZlcihub2RlKTsKLy8gICAgICAgICB9IHdoaWxlICh0eXBlX3N0YXRlX2NoYW5nZSk7Ci8vICAgICB9CgoKLy8gUGFyc2UgSlNPTgoKICAgIGZ1bmN0aW9uIGpzb25fdmFsdWUoKSB7CgogICAgICAgIGZ1bmN0aW9uIGpzb25fb2JqZWN0KCkgewogICAgICAgICAgICB2YXIgYnJhY2UgPSBuZXh0X3Rva2VuLCBvYmplY3QgPSB7fTsKICAgICAgICAgICAgYWR2YW5jZSgneycpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJ30nKSB7CiAgICAgICAgICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCAhPT0gJyhlbmQpJykgewogICAgICAgICAgICAgICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJywgbmV4dF90b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJywnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3RyaW5nX2EnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdFtuZXh0X3Rva2VuLnN0cmluZ10gPT09IHRydWUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZHVwbGljYXRlX2EnKTsKICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRfdG9rZW4uc3RyaW5nID09PSAnX19wcm90b19fJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdkYW5nbGluZ19hJyk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W25leHRfdG9rZW4uc3RyaW5nXSA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgICAgICAgICAganNvbl92YWx1ZSgpOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJywnKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJ30nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIHRva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoJ30nLCBicmFjZSk7CiAgICAgICAgfQoKICAgICAgICBmdW5jdGlvbiBqc29uX2FycmF5KCkgewogICAgICAgICAgICB2YXIgYnJhY2tldCA9IG5leHRfdG9rZW47CiAgICAgICAgICAgIGFkdmFuY2UoJ1snKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICddJykgewogICAgICAgICAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgIT09ICcoZW5kKScpIHsKICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGpzb25fdmFsdWUoKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcsJyk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICddJykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCddJywgYnJhY2tldCk7CiAgICAgICAgfQoKICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uaWQpIHsKICAgICAgICBjYXNlICd7JzoKICAgICAgICAgICAganNvbl9vYmplY3QoKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnWyc6CiAgICAgICAgICAgIGpzb25fYXJyYXkoKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAndHJ1ZSc6CiAgICAgICAgY2FzZSAnZmFsc2UnOgogICAgICAgIGNhc2UgJ251bGwnOgogICAgICAgIGNhc2UgJyhudW1iZXIpJzoKICAgICAgICBjYXNlICcoc3RyaW5nKSc6CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnLSc6CiAgICAgICAgICAgIGFkdmFuY2UoJy0nKTsKICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICBhZHZhbmNlKCcobnVtYmVyKScpOwogICAgICAgICAgICBicmVhazsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICB9CiAgICB9CgoKLy8gQ1NTIHBhcnNpbmcuCgogICAgZnVuY3Rpb24gY3NzX25hbWUoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgIH0KCgogICAgZnVuY3Rpb24gY3NzX251bWJlcigpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy0nKSB7CiAgICAgICAgICAgIGFkdmFuY2UoJy0nKTsKICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBhZHZhbmNlKCcobnVtYmVyKScpOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19zdHJpbmcoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gY3NzX2NvbG9yKCkgewogICAgICAgIHZhciBpLCBudW1iZXIsIHBhcmVuLCB2YWx1ZTsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgIHZhbHVlID0gbmV4dF90b2tlbi5zdHJpbmc7CiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3JnYicgfHwgdmFsdWUgPT09ICdyZ2JhJykgewogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgcGFyZW4gPSBuZXh0X3Rva2VuOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDM7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgIGlmIChpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIG51bWJlciA9IG5leHRfdG9rZW4ubnVtYmVyOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknIHx8IG51bWJlciA8IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfcG9zaXRpdmVfYScsIG5leHRfdG9rZW4pOwogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyUnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCclJyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtYmVyID4gMTAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfcGVyY2VudF9hJywgdG9rZW4sIG51bWJlcik7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtYmVyID4gMjU1KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc21hbGxfYScsIHRva2VuLCBudW1iZXIpOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAncmdiYScpIHsKICAgICAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgICAgIG51bWJlciA9IG5leHRfdG9rZW4ubnVtYmVyOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknIHx8IG51bWJlciA8IDAgfHwgbnVtYmVyID4gMSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9mcmFjdGlvbl9hJywgbmV4dF90b2tlbik7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyUnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScpOwogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCclJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgnKScsIHBhcmVuKTsKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9IGVsc2UgaWYgKGNzc19jb2xvckRhdGFbbmV4dF90b2tlbi5zdHJpbmddID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgIH0gZWxzZSBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyhjb2xvciknKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgogICAgZnVuY3Rpb24gY3NzX2xlbmd0aCgpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy0nKSB7CiAgICAgICAgICAgIGFkdmFuY2UoJy0nKTsKICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknICYmCiAgICAgICAgICAgICAgICAgICAgY3NzX2xlbmd0aERhdGFbbmV4dF90b2tlbi5zdHJpbmddID09PSB0cnVlKSB7CiAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoK3Rva2VuLm51bWJlciAhPT0gMCkgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfbGluZWFyX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQoKCiAgICBmdW5jdGlvbiBjc3NfbGluZV9oZWlnaHQoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICctJykgewogICAgICAgICAgICBhZHZhbmNlKCctJyk7CiAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICB9CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyAmJgogICAgICAgICAgICAgICAgICAgIGNzc19sZW5ndGhEYXRhW25leHRfdG9rZW4uc3RyaW5nXSA9PT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgbm9fc3BhY2Vfb25seSgpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc193aWR0aCgpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgIHN3aXRjaCAobmV4dF90b2tlbi5zdHJpbmcpIHsKICAgICAgICAgICAgY2FzZSAndGhpbic6CiAgICAgICAgICAgIGNhc2UgJ21lZGl1bSc6CiAgICAgICAgICAgIGNhc2UgJ3RoaWNrJzoKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgcmV0dXJuIGNzc19sZW5ndGgoKTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19tYXJnaW4oKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcgPT09ICdhdXRvJykgewogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgewogICAgICAgICAgICByZXR1cm4gY3NzX2xlbmd0aCgpOwogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBjc3NfYXR0cigpIHsKICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmIG5leHRfdG9rZW4uc3RyaW5nID09PSAnYXR0cicpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9uYW1lX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGFkdmFuY2UoJyknKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KCgogICAgZnVuY3Rpb24gY3NzX2NvbW1hX2xpc3QoKSB7CiAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgIT09ICc7JykgewogICAgICAgICAgICBpZiAoIWNzc19uYW1lKCkgJiYgIWNzc19zdHJpbmcoKSkgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfbmFtZV9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcsJykgewogICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19jb3VudGVyKCkgewogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09ICdjb3VudGVyJykgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9zdHJpbmdfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFkdmFuY2UoJyknKTsKICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfQogICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09ICdjb3VudGVycycpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9uYW1lX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLCcpIHsKICAgICAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3N0cmluZ19hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcsJykgewogICAgICAgICAgICAgICAgY29tbWEoKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3RyaW5nX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCcpJyk7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CgoKICAgIGZ1bmN0aW9uIGNzc19yYWRpdXMoKSB7CiAgICAgICAgcmV0dXJuIGNzc19sZW5ndGgoKSAmJiAobmV4dF90b2tlbi5pZCAhPT0gJyhudW1iZXIpJyB8fCBjc3NfbGVuZ3RoKCkpOwogICAgfQoKCiAgICBmdW5jdGlvbiBjc3Nfc2hhcGUoKSB7CiAgICAgICAgdmFyIGk7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiBuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ3JlY3QnKSB7CiAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgYWR2YW5jZSgnKCcpOwogICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICBpZiAoIWNzc19sZW5ndGgoKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX251bWJlcl9hJyk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnKScpOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQoKCiAgICBmdW5jdGlvbiBjc3NfdXJsKCkgewogICAgICAgIHZhciBjLCB1cmw7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiBuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ3VybCcpIHsKICAgICAgICAgICAgbmV4dF90b2tlbiA9IGxleC5yYW5nZSgnKCcsICcpJyk7CiAgICAgICAgICAgIHVybCA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICBjID0gdXJsLmNoYXJBdCgwKTsKICAgICAgICAgICAgaWYgKGMgPT09ICciJyB8fCBjID09PSAnXCcnKSB7CiAgICAgICAgICAgICAgICBpZiAodXJsLnNsaWNlKC0xKSAhPT0gYykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF91cmxfYScpOwogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpOwogICAgICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihjKSA+PSAwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2JhZF91cmxfYScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoIXVybCkgewogICAgICAgICAgICAgICAgd2FybignbWlzc2luZ191cmwnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAodXgudGVzdCh1cmwpKSB7CiAgICAgICAgICAgICAgICBzdG9wKCdiYWRfdXJsX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB1cmxzLnB1c2godXJsKTsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQoKCiAgICBjc3NfYW55ID0gW2Nzc191cmwsIGZ1bmN0aW9uICgpIHsKICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIHN3aXRjaCAobmV4dF90b2tlbi5zdHJpbmcudG9Mb3dlckNhc2UoKSkgewogICAgICAgICAgICAgICAgY2FzZSAndXJsJzoKICAgICAgICAgICAgICAgICAgICBjc3NfdXJsKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdleHByZXNzaW9uJzoKICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOycgfHwgbmV4dF90b2tlbi5pZCA9PT0gJyEnICB8fAogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknIHx8IG5leHRfdG9rZW4uaWQgPT09ICd9JykgewogICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfV07CgoKICAgIGZ1bmN0aW9uIGZvbnRfZmFjZSgpIHsKICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ2ZvbnQtZmFtaWx5Jyk7CiAgICAgICAgYWR2YW5jZSgnOicpOwogICAgICAgIGlmICghY3NzX25hbWUoKSAmJiAhY3NzX3N0cmluZygpKSB7CiAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX25hbWVfYScpOwogICAgICAgIH0KICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ3NyYycpOwogICAgICAgIGFkdmFuY2UoJzonKTsKICAgICAgICB3aGlsZSAodHJ1ZSkgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcgPT09ICdsb2NhbCcpIHsKICAgICAgICAgICAgICAgIGFkdmFuY2VfaWRlbnRpZmllcignbG9jYWwnKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICAgICAgICAgIGlmICh1eC50ZXN0KG5leHRfdG9rZW4uc3RyaW5nKSkgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2JhZF91cmxfYScpOwogICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICAgIGlmICghY3NzX25hbWUoKSAmJiAhY3NzX3N0cmluZygpKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfbmFtZV9hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcpJyk7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNzc191cmwoKSkgewogICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgbmV4dF90b2tlbiwgJ3VybCcsIGFydGlmYWN0KCkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnLCcpIHsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGNvbW1hKCk7CiAgICAgICAgfQogICAgICAgIHNlbWljb2xvbigpOwogICAgfQoKCiAgICBjc3NfYm9yZGVyX3N0eWxlID0gWwogICAgICAgICdub25lJywgJ2Rhc2hlZCcsICdkb3R0ZWQnLCAnZG91YmxlJywgJ2dyb292ZScsCiAgICAgICAgJ2hpZGRlbicsICdpbnNldCcsICdvdXRzZXQnLCAncmlkZ2UnLCAnc29saWQnCiAgICBdOwoKICAgIGNzc19icmVhayA9IFsKICAgICAgICAnYXV0bycsICdhbHdheXMnLCAnYXZvaWQnLCAnbGVmdCcsICdyaWdodCcKICAgIF07CgogICAgY3NzX21lZGlhID0gewogICAgICAgICdhbGwnOiB0cnVlLAogICAgICAgICdicmFpbGxlJzogdHJ1ZSwKICAgICAgICAnZW1ib3NzZWQnOiB0cnVlLAogICAgICAgICdoYW5kaGVsZCc6IHRydWUsCiAgICAgICAgJ3ByaW50JzogdHJ1ZSwKICAgICAgICAncHJvamVjdGlvbic6IHRydWUsCiAgICAgICAgJ3NjcmVlbic6IHRydWUsCiAgICAgICAgJ3NwZWVjaCc6IHRydWUsCiAgICAgICAgJ3R0eSc6IHRydWUsCiAgICAgICAgJ3R2JzogdHJ1ZQogICAgfTsKCiAgICBjc3Nfb3ZlcmZsb3cgPSBbCiAgICAgICAgJ2F1dG8nLCAnaGlkZGVuJywgJ3Njcm9sbCcsICd2aXNpYmxlJwogICAgXTsKCiAgICBjc3NfYXR0cmlidXRlX2RhdGEgPSB7CiAgICAgICAgYmFja2dyb3VuZDogWwogICAgICAgICAgICB0cnVlLCAnYmFja2dyb3VuZC1hdHRhY2htZW50JywgJ2JhY2tncm91bmQtY29sb3InLAogICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZScsICdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2JhY2tncm91bmQtcmVwZWF0JwogICAgICAgIF0sCiAgICAgICAgJ2JhY2tncm91bmQtYXR0YWNobWVudCc6IFsnc2Nyb2xsJywgJ2ZpeGVkJ10sCiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBbJ3RyYW5zcGFyZW50JywgY3NzX2NvbG9yXSwKICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6IFsnbm9uZScsIGNzc191cmxdLAogICAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogWwogICAgICAgICAgICAyLCBbY3NzX2xlbmd0aCwgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICdjZW50ZXInXQogICAgICAgIF0sCiAgICAgICAgJ2JhY2tncm91bmQtcmVwZWF0JzogWwogICAgICAgICAgICAncmVwZWF0JywgJ3JlcGVhdC14JywgJ3JlcGVhdC15JywgJ25vLXJlcGVhdCcKICAgICAgICBdLAogICAgICAgICdib3JkZXInOiBbdHJ1ZSwgJ2JvcmRlci1jb2xvcicsICdib3JkZXItc3R5bGUnLCAnYm9yZGVyLXdpZHRoJ10sCiAgICAgICAgJ2JvcmRlci1ib3R0b20nOiBbCiAgICAgICAgICAgIHRydWUsICdib3JkZXItYm90dG9tLWNvbG9yJywgJ2JvcmRlci1ib3R0b20tc3R5bGUnLAogICAgICAgICAgICAnYm9yZGVyLWJvdHRvbS13aWR0aCcKICAgICAgICBdLAogICAgICAgICdib3JkZXItYm90dG9tLWNvbG9yJzogY3NzX2NvbG9yLAogICAgICAgICdib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzJzogY3NzX3JhZGl1cywKICAgICAgICAnYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMnOiBjc3NfcmFkaXVzLAogICAgICAgICdib3JkZXItYm90dG9tLXN0eWxlJzogY3NzX2JvcmRlcl9zdHlsZSwKICAgICAgICAnYm9yZGVyLWJvdHRvbS13aWR0aCc6IGNzc193aWR0aCwKICAgICAgICAnYm9yZGVyLWNvbGxhcHNlJzogWydjb2xsYXBzZScsICdzZXBhcmF0ZSddLAogICAgICAgICdib3JkZXItY29sb3InOiBbJ3RyYW5zcGFyZW50JywgNCwgY3NzX2NvbG9yXSwKICAgICAgICAnYm9yZGVyLWxlZnQnOiBbCiAgICAgICAgICAgIHRydWUsICdib3JkZXItbGVmdC1jb2xvcicsICdib3JkZXItbGVmdC1zdHlsZScsICdib3JkZXItbGVmdC13aWR0aCcKICAgICAgICBdLAogICAgICAgICdib3JkZXItbGVmdC1jb2xvcic6IGNzc19jb2xvciwKICAgICAgICAnYm9yZGVyLWxlZnQtc3R5bGUnOiBjc3NfYm9yZGVyX3N0eWxlLAogICAgICAgICdib3JkZXItbGVmdC13aWR0aCc6IGNzc193aWR0aCwKICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgZnVuY3Rpb24gY291bnQoc2VwYXJhdG9yKSB7CiAgICAgICAgICAgICAgICB2YXIgbiA9IDE7CiAgICAgICAgICAgICAgICBpZiAoc2VwYXJhdG9yKSB7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShzZXBhcmF0b3IpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKCFjc3NfbGVuZ3RoKCkpIHsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB3aGlsZSAobmV4dF90b2tlbi5pZCA9PT0gJyhudW1iZXIpJykgewogICAgICAgICAgICAgICAgICAgIGlmICghY3NzX2xlbmd0aCgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgbiArPSAxOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKG4gPiA0KSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYmFkX3N0eWxlJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgcmV0dXJuIGNvdW50KCkgJiYgKG5leHRfdG9rZW4uaWQgIT09ICcvJyB8fCBjb3VudCgnLycpKTsKICAgICAgICB9LAogICAgICAgICdib3JkZXItcmlnaHQnOiBbCiAgICAgICAgICAgIHRydWUsICdib3JkZXItcmlnaHQtY29sb3InLCAnYm9yZGVyLXJpZ2h0LXN0eWxlJywKICAgICAgICAgICAgJ2JvcmRlci1yaWdodC13aWR0aCcKICAgICAgICBdLAogICAgICAgICdib3JkZXItcmlnaHQtY29sb3InOiBjc3NfY29sb3IsCiAgICAgICAgJ2JvcmRlci1yaWdodC1zdHlsZSc6IGNzc19ib3JkZXJfc3R5bGUsCiAgICAgICAgJ2JvcmRlci1yaWdodC13aWR0aCc6IGNzc193aWR0aCwKICAgICAgICAnYm9yZGVyLXNwYWNpbmcnOiBbMiwgY3NzX2xlbmd0aF0sCiAgICAgICAgJ2JvcmRlci1zdHlsZSc6IFs0LCBjc3NfYm9yZGVyX3N0eWxlXSwKICAgICAgICAnYm9yZGVyLXRvcCc6IFsKICAgICAgICAgICAgdHJ1ZSwgJ2JvcmRlci10b3AtY29sb3InLCAnYm9yZGVyLXRvcC1zdHlsZScsICdib3JkZXItdG9wLXdpZHRoJwogICAgICAgIF0sCiAgICAgICAgJ2JvcmRlci10b3AtY29sb3InOiBjc3NfY29sb3IsCiAgICAgICAgJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnOiBjc3NfcmFkaXVzLAogICAgICAgICdib3JkZXItdG9wLXJpZ2h0LXJhZGl1cyc6IGNzc19yYWRpdXMsCiAgICAgICAgJ2JvcmRlci10b3Atc3R5bGUnOiBjc3NfYm9yZGVyX3N0eWxlLAogICAgICAgICdib3JkZXItdG9wLXdpZHRoJzogY3NzX3dpZHRoLAogICAgICAgICdib3JkZXItd2lkdGgnOiBbNCwgY3NzX3dpZHRoXSwKICAgICAgICBib3R0b206IFtjc3NfbGVuZ3RoLCAnYXV0byddLAogICAgICAgICdjYXB0aW9uLXNpZGUnIDogWydib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICd0b3AnXSwKICAgICAgICBjbGVhcjogWydib3RoJywgJ2xlZnQnLCAnbm9uZScsICdyaWdodCddLAogICAgICAgIGNsaXA6IFtjc3Nfc2hhcGUsICdhdXRvJ10sCiAgICAgICAgY29sb3I6IGNzc19jb2xvciwKICAgICAgICBjb250ZW50OiBbCiAgICAgICAgICAgICdvcGVuLXF1b3RlJywgJ2Nsb3NlLXF1b3RlJywgJ25vLW9wZW4tcXVvdGUnLCAnbm8tY2xvc2UtcXVvdGUnLAogICAgICAgICAgICBjc3Nfc3RyaW5nLCBjc3NfdXJsLCBjc3NfY291bnRlciwgY3NzX2F0dHIKICAgICAgICBdLAogICAgICAgICdjb3VudGVyLWluY3JlbWVudCc6IFsKICAgICAgICAgICAgY3NzX25hbWUsICdub25lJwogICAgICAgIF0sCiAgICAgICAgJ2NvdW50ZXItcmVzZXQnOiBbCiAgICAgICAgICAgIGNzc19uYW1lLCAnbm9uZScKICAgICAgICBdLAogICAgICAgIGN1cnNvcjogWwogICAgICAgICAgICBjc3NfdXJsLCAnYXV0bycsICdjcm9zc2hhaXInLCAnZGVmYXVsdCcsICdlLXJlc2l6ZScsICdoZWxwJywgJ21vdmUnLAogICAgICAgICAgICAnbi1yZXNpemUnLCAnbmUtcmVzaXplJywgJ253LXJlc2l6ZScsICdwb2ludGVyJywgJ3MtcmVzaXplJywKICAgICAgICAgICAgJ3NlLXJlc2l6ZScsICdzdy1yZXNpemUnLCAndy1yZXNpemUnLCAndGV4dCcsICd3YWl0JwogICAgICAgIF0sCiAgICAgICAgZGlyZWN0aW9uOiBbJ2x0cicsICdydGwnXSwKICAgICAgICBkaXNwbGF5OiBbCiAgICAgICAgICAgICdibG9jaycsICdjb21wYWN0JywgJ2lubGluZScsICdpbmxpbmUtYmxvY2snLCAnaW5saW5lLXRhYmxlJywKICAgICAgICAgICAgJ2xpc3QtaXRlbScsICdtYXJrZXInLCAnbm9uZScsICdydW4taW4nLCAndGFibGUnLCAndGFibGUtY2FwdGlvbicsCiAgICAgICAgICAgICd0YWJsZS1jZWxsJywgJ3RhYmxlLWNvbHVtbicsICd0YWJsZS1jb2x1bW4tZ3JvdXAnLAogICAgICAgICAgICAndGFibGUtZm9vdGVyLWdyb3VwJywgJ3RhYmxlLWhlYWRlci1ncm91cCcsICd0YWJsZS1yb3cnLAogICAgICAgICAgICAndGFibGUtcm93LWdyb3VwJwogICAgICAgIF0sCiAgICAgICAgJ2VtcHR5LWNlbGxzJzogWydzaG93JywgJ2hpZGUnXSwKICAgICAgICAnZmxvYXQnOiBbJ2xlZnQnLCAnbm9uZScsICdyaWdodCddLAogICAgICAgIGZvbnQ6IFsKICAgICAgICAgICAgJ2NhcHRpb24nLCAnaWNvbicsICdtZW51JywgJ21lc3NhZ2UtYm94JywgJ3NtYWxsLWNhcHRpb24nLAogICAgICAgICAgICAnc3RhdHVzLWJhcicsIHRydWUsICdmb250LXNpemUnLCAnZm9udC1zdHlsZScsICdmb250LXdlaWdodCcsCiAgICAgICAgICAgICdmb250LWZhbWlseScKICAgICAgICBdLAogICAgICAgICdmb250LWZhbWlseSc6IGNzc19jb21tYV9saXN0LAogICAgICAgICdmb250LXNpemUnOiBbCiAgICAgICAgICAgICd4eC1zbWFsbCcsICd4LXNtYWxsJywgJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZScsICd4LWxhcmdlJywKICAgICAgICAgICAgJ3h4LWxhcmdlJywgJ2xhcmdlcicsICdzbWFsbGVyJywgY3NzX2xlbmd0aAogICAgICAgIF0sCiAgICAgICAgJ2ZvbnQtc2l6ZS1hZGp1c3QnOiBbJ25vbmUnLCBjc3NfbnVtYmVyXSwKICAgICAgICAnZm9udC1zdHJldGNoJzogWwogICAgICAgICAgICAnbm9ybWFsJywgJ3dpZGVyJywgJ25hcnJvd2VyJywgJ3VsdHJhLWNvbmRlbnNlZCcsCiAgICAgICAgICAgICdleHRyYS1jb25kZW5zZWQnLCAnY29uZGVuc2VkJywgJ3NlbWktY29uZGVuc2VkJywKICAgICAgICAgICAgJ3NlbWktZXhwYW5kZWQnLCAnZXhwYW5kZWQnLCAnZXh0cmEtZXhwYW5kZWQnCiAgICAgICAgXSwKICAgICAgICAnZm9udC1zdHlsZSc6IFsKICAgICAgICAgICAgJ25vcm1hbCcsICdpdGFsaWMnLCAnb2JsaXF1ZScKICAgICAgICBdLAogICAgICAgICdmb250LXZhcmlhbnQnOiBbCiAgICAgICAgICAgICdub3JtYWwnLCAnc21hbGwtY2FwcycKICAgICAgICBdLAogICAgICAgICdmb250LXdlaWdodCc6IFsKICAgICAgICAgICAgJ25vcm1hbCcsICdib2xkJywgJ2JvbGRlcicsICdsaWdodGVyJywgY3NzX251bWJlcgogICAgICAgIF0sCiAgICAgICAgaGVpZ2h0OiBbY3NzX2xlbmd0aCwgJ2F1dG8nXSwKICAgICAgICBsZWZ0OiBbY3NzX2xlbmd0aCwgJ2F1dG8nXSwKICAgICAgICAnbGV0dGVyLXNwYWNpbmcnOiBbJ25vcm1hbCcsIGNzc19sZW5ndGhdLAogICAgICAgICdsaW5lLWhlaWdodCc6IFsnbm9ybWFsJywgY3NzX2xpbmVfaGVpZ2h0XSwKICAgICAgICAnbGlzdC1zdHlsZSc6IFsKICAgICAgICAgICAgdHJ1ZSwgJ2xpc3Qtc3R5bGUtaW1hZ2UnLCAnbGlzdC1zdHlsZS1wb3NpdGlvbicsICdsaXN0LXN0eWxlLXR5cGUnCiAgICAgICAgXSwKICAgICAgICAnbGlzdC1zdHlsZS1pbWFnZSc6IFsnbm9uZScsIGNzc191cmxdLAogICAgICAgICdsaXN0LXN0eWxlLXBvc2l0aW9uJzogWydpbnNpZGUnLCAnb3V0c2lkZSddLAogICAgICAgICdsaXN0LXN0eWxlLXR5cGUnOiBbCiAgICAgICAgICAgICdjaXJjbGUnLCAnZGlzYycsICdzcXVhcmUnLCAnZGVjaW1hbCcsICdkZWNpbWFsLWxlYWRpbmctemVybycsCiAgICAgICAgICAgICdsb3dlci1yb21hbicsICd1cHBlci1yb21hbicsICdsb3dlci1ncmVlaycsICdsb3dlci1hbHBoYScsCiAgICAgICAgICAgICdsb3dlci1sYXRpbicsICd1cHBlci1hbHBoYScsICd1cHBlci1sYXRpbicsICdoZWJyZXcnLCAna2F0YWthbmEnLAogICAgICAgICAgICAnaGlyYWdhbmEtaXJvaGEnLCAna2F0YWthbmEtb3JvaGEnLCAnbm9uZScKICAgICAgICBdLAogICAgICAgIG1hcmdpbjogWzQsIGNzc19tYXJnaW5dLAogICAgICAgICdtYXJnaW4tYm90dG9tJzogY3NzX21hcmdpbiwKICAgICAgICAnbWFyZ2luLWxlZnQnOiBjc3NfbWFyZ2luLAogICAgICAgICdtYXJnaW4tcmlnaHQnOiBjc3NfbWFyZ2luLAogICAgICAgICdtYXJnaW4tdG9wJzogY3NzX21hcmdpbiwKICAgICAgICAnbWFya2VyLW9mZnNldCc6IFtjc3NfbGVuZ3RoLCAnYXV0byddLAogICAgICAgICdtYXgtaGVpZ2h0JzogW2Nzc19sZW5ndGgsICdub25lJ10sCiAgICAgICAgJ21heC13aWR0aCc6IFtjc3NfbGVuZ3RoLCAnbm9uZSddLAogICAgICAgICdtaW4taGVpZ2h0JzogY3NzX2xlbmd0aCwKICAgICAgICAnbWluLXdpZHRoJzogY3NzX2xlbmd0aCwKICAgICAgICBvcGFjaXR5OiBjc3NfbnVtYmVyLAogICAgICAgIG91dGxpbmU6IFt0cnVlLCAnb3V0bGluZS1jb2xvcicsICdvdXRsaW5lLXN0eWxlJywgJ291dGxpbmUtd2lkdGgnXSwKICAgICAgICAnb3V0bGluZS1jb2xvcic6IFsnaW52ZXJ0JywgY3NzX2NvbG9yXSwKICAgICAgICAnb3V0bGluZS1zdHlsZSc6IFsKICAgICAgICAgICAgJ2Rhc2hlZCcsICdkb3R0ZWQnLCAnZG91YmxlJywgJ2dyb292ZScsICdpbnNldCcsICdub25lJywKICAgICAgICAgICAgJ291dHNldCcsICdyaWRnZScsICdzb2xpZCcKICAgICAgICBdLAogICAgICAgICdvdXRsaW5lLXdpZHRoJzogY3NzX3dpZHRoLAogICAgICAgIG92ZXJmbG93OiBjc3Nfb3ZlcmZsb3csCiAgICAgICAgJ292ZXJmbG93LXgnOiBjc3Nfb3ZlcmZsb3csCiAgICAgICAgJ292ZXJmbG93LXknOiBjc3Nfb3ZlcmZsb3csCiAgICAgICAgcGFkZGluZzogWzQsIGNzc19sZW5ndGhdLAogICAgICAgICdwYWRkaW5nLWJvdHRvbSc6IGNzc19sZW5ndGgsCiAgICAgICAgJ3BhZGRpbmctbGVmdCc6IGNzc19sZW5ndGgsCiAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBjc3NfbGVuZ3RoLAogICAgICAgICdwYWRkaW5nLXRvcCc6IGNzc19sZW5ndGgsCiAgICAgICAgJ3BhZ2UtYnJlYWstYWZ0ZXInOiBjc3NfYnJlYWssCiAgICAgICAgJ3BhZ2UtYnJlYWstYmVmb3JlJzogY3NzX2JyZWFrLAogICAgICAgIHBvc2l0aW9uOiBbJ2Fic29sdXRlJywgJ2ZpeGVkJywgJ3JlbGF0aXZlJywgJ3N0YXRpYyddLAogICAgICAgIHF1b3RlczogWzgsIGNzc19zdHJpbmddLAogICAgICAgIHJpZ2h0OiBbY3NzX2xlbmd0aCwgJ2F1dG8nXSwKICAgICAgICAndGFibGUtbGF5b3V0JzogWydhdXRvJywgJ2ZpeGVkJ10sCiAgICAgICAgJ3RleHQtYWxpZ24nOiBbJ2NlbnRlcicsICdqdXN0aWZ5JywgJ2xlZnQnLCAncmlnaHQnXSwKICAgICAgICAndGV4dC1kZWNvcmF0aW9uJzogWwogICAgICAgICAgICAnbm9uZScsICd1bmRlcmxpbmUnLCAnb3ZlcmxpbmUnLCAnbGluZS10aHJvdWdoJywgJ2JsaW5rJwogICAgICAgIF0sCiAgICAgICAgJ3RleHQtaW5kZW50JzogY3NzX2xlbmd0aCwKICAgICAgICAndGV4dC1zaGFkb3cnOiBbJ25vbmUnLCA0LCBbY3NzX2NvbG9yLCBjc3NfbGVuZ3RoXV0sCiAgICAgICAgJ3RleHQtdHJhbnNmb3JtJzogWydjYXBpdGFsaXplJywgJ3VwcGVyY2FzZScsICdsb3dlcmNhc2UnLCAnbm9uZSddLAogICAgICAgIHRvcDogW2Nzc19sZW5ndGgsICdhdXRvJ10sCiAgICAgICAgJ3VuaWNvZGUtYmlkaSc6IFsnbm9ybWFsJywgJ2VtYmVkJywgJ2JpZGktb3ZlcnJpZGUnXSwKICAgICAgICAndmVydGljYWwtYWxpZ24nOiBbCiAgICAgICAgICAgICdiYXNlbGluZScsICdib3R0b20nLCAnc3ViJywgJ3N1cGVyJywgJ3RvcCcsICd0ZXh0LXRvcCcsICdtaWRkbGUnLAogICAgICAgICAgICAndGV4dC1ib3R0b20nLCBjc3NfbGVuZ3RoCiAgICAgICAgXSwKICAgICAgICB2aXNpYmlsaXR5OiBbJ3Zpc2libGUnLCAnaGlkZGVuJywgJ2NvbGxhcHNlJ10sCiAgICAgICAgJ3doaXRlLXNwYWNlJzogWwogICAgICAgICAgICAnbm9ybWFsJywgJ25vd3JhcCcsICdwcmUnLCAncHJlLWxpbmUnLCAncHJlLXdyYXAnLCAnaW5oZXJpdCcKICAgICAgICBdLAogICAgICAgIHdpZHRoOiBbY3NzX2xlbmd0aCwgJ2F1dG8nXSwKICAgICAgICAnd29yZC1zcGFjaW5nJzogWydub3JtYWwnLCBjc3NfbGVuZ3RoXSwKICAgICAgICAnd29yZC13cmFwJzogWydicmVhay13b3JkJywgJ25vcm1hbCddLAogICAgICAgICd6LWluZGV4JzogWydhdXRvJywgY3NzX251bWJlcl0KICAgIH07CgogICAgZnVuY3Rpb24gc3R5bGVfYXR0cmlidXRlKCkgewogICAgICAgIHZhciB2OwogICAgICAgIHdoaWxlIChuZXh0X3Rva2VuLmlkID09PSAnKicgfHwgbmV4dF90b2tlbi5pZCA9PT0gJyMnIHx8CiAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ18nKSB7CiAgICAgICAgICAgIGlmICghb3B0aW9uLmNzcykgewogICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJy0nKSB7CiAgICAgICAgICAgIGlmICghb3B0aW9uLmNzcykgewogICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9hJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgnLScpOwogICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfbm9uc3RhbmRhcmRfc3R5bGVfYXR0cmlidXRlJyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICByZXR1cm4gY3NzX2FueTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfc3R5bGVfYXR0cmlidXRlJyk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNzc19hdHRyaWJ1dGVfZGF0YSwKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5zdHJpbmcpKSB7CiAgICAgICAgICAgICAgICAgICAgdiA9IGNzc19hdHRyaWJ1dGVfZGF0YVtuZXh0X3Rva2VuLnN0cmluZ107CiAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIHYgPSBjc3NfYW55OwogICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmNzcykgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd1bnJlY29nbml6ZWRfc3R5bGVfYXR0cmlidXRlX2EnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICByZXR1cm4gdjsKICAgICAgICB9CiAgICB9CgoKICAgIGZ1bmN0aW9uIHN0eWxlX3ZhbHVlKHYpIHsKCiAgICAgICAgLypqc2xpbnQgY29uZnVzaW9uOiB0cnVlICovCgogICAgICAgIHZhciBpID0gMCwKICAgICAgICAgICAgbiwKICAgICAgICAgICAgb25jZSwKICAgICAgICAgICAgbWF0Y2gsCiAgICAgICAgICAgIHJvdW5kLAogICAgICAgICAgICBzdGFydCA9IDAsCiAgICAgICAgICAgIHZpOwogICAgICAgIHN3aXRjaCAodHlwZW9mIHYpIHsKICAgICAgICBjYXNlICdmdW5jdGlvbic6CiAgICAgICAgICAgIHJldHVybiB2KCk7CiAgICAgICAgY2FzZSAnc3RyaW5nJzoKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllciAmJiBuZXh0X3Rva2VuLnN0cmluZyA9PT0gdikgewogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIH0KICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIGlmIChpID49IHYubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdmkgPSB2W2ldOwogICAgICAgICAgICBpICs9IDE7CiAgICAgICAgICAgIGlmICh0eXBlb2YgdmkgPT09ICdib29sZWFuJykgewogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZpID09PSAnbnVtYmVyJykgewogICAgICAgICAgICAgICAgbiA9IHZpOwogICAgICAgICAgICAgICAgdmkgPSB2W2ldOwogICAgICAgICAgICAgICAgaSArPSAxOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgbiA9IDE7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTsKICAgICAgICAgICAgd2hpbGUgKG4gPiAwKSB7CiAgICAgICAgICAgICAgICBpZiAoc3R5bGVfdmFsdWUodmkpKSB7CiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlOwogICAgICAgICAgICAgICAgICAgIG4gLT0gMTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG1hdGNoKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzdGFydCA9IGk7CiAgICAgICAgb25jZSA9IFtdOwogICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgcm91bmQgPSBmYWxzZTsKICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCB2Lmxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICBpZiAoIW9uY2VbaV0pIHsKICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGVfdmFsdWUoY3NzX2F0dHJpYnV0ZV9kYXRhW3ZbaV1dKSkgewogICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICAgICAgb25jZVtpXSA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoIXJvdW5kKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gc3R5bGVfY2hpbGQoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcobnVtYmVyKScpIHsKICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcgPT09ICduJyAmJiBuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKycpIHsKICAgICAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKycpOwogICAgICAgICAgICAgICAgICAgIG5vX3NwYWNlX29ubHkoKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcobnVtYmVyKScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmCiAgICAgICAgICAgICAgICAgICAgKG5leHRfdG9rZW4uc3RyaW5nID09PSAnb2RkJyB8fCBuZXh0X3Rva2VuLnN0cmluZyA9PT0gJ2V2ZW4nKSkgewogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScpOwogICAgfQoKICAgIGZ1bmN0aW9uIHN1YnN0eWxlKCkgewogICAgICAgIHZhciB2OwogICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICd9JyB8fCBuZXh0X3Rva2VuLmlkID09PSAnKGVuZCknIHx8CiAgICAgICAgICAgICAgICAgICAgKHhxdW90ZSAmJiBuZXh0X3Rva2VuLmlkID09PSB4cXVvdGUpKSB7CiAgICAgICAgICAgICAgICByZXR1cm47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdiA9IHN0eWxlX2F0dHJpYnV0ZSgpOwogICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYgbmV4dF90b2tlbi5zdHJpbmcgPT09ICdpbmhlcml0JykgewogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgaWYgKCFzdHlsZV92YWx1ZSh2KSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfYScpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyEnKSB7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCchJyk7CiAgICAgICAgICAgICAgICBub19zcGFjZV9vbmx5KCk7CiAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZGVudGlmaWVyICYmIG5leHRfdG9rZW4uc3RyaW5nID09PSAnaW1wb3J0YW50JykgewogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYV9iJywKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbiwgJ2ltcG9ydGFudCcsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnfScgfHwgbmV4dF90b2tlbi5pZCA9PT0geHF1b3RlKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnOycsIGFydGlmYWN0KCkpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gc3R5bGVfc2VsZWN0b3IoKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChodG1sX3RhZywgb3B0aW9uLmNhcAogICAgICAgICAgICAgICAgICAgID8gbmV4dF90b2tlbi5zdHJpbmcudG9Mb3dlckNhc2UoKQogICAgICAgICAgICAgICAgICAgIDogbmV4dF90b2tlbi5zdHJpbmcpKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF90YWduYW1lX2EnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgc3dpdGNoIChuZXh0X3Rva2VuLmlkKSB7CiAgICAgICAgICAgIGNhc2UgJz4nOgogICAgICAgICAgICBjYXNlICcrJzoKICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIHN0eWxlX3NlbGVjdG9yKCk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnOic6CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc6Jyk7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uc3RyaW5nKSB7CiAgICAgICAgICAgICAgICBjYXNlICdhY3RpdmUnOgogICAgICAgICAgICAgICAgY2FzZSAnYWZ0ZXInOgogICAgICAgICAgICAgICAgY2FzZSAnYmVmb3JlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrZWQnOgogICAgICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWQnOgogICAgICAgICAgICAgICAgY2FzZSAnZW1wdHknOgogICAgICAgICAgICAgICAgY2FzZSAnZW5hYmxlZCc6CiAgICAgICAgICAgICAgICBjYXNlICdmaXJzdC1jaGlsZCc6CiAgICAgICAgICAgICAgICBjYXNlICdmaXJzdC1sZXR0ZXInOgogICAgICAgICAgICAgICAgY2FzZSAnZmlyc3QtbGluZSc6CiAgICAgICAgICAgICAgICBjYXNlICdmaXJzdC1vZi10eXBlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2ZvY3VzJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2hvdmVyJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2xhc3QtY2hpbGQnOgogICAgICAgICAgICAgICAgY2FzZSAnbGFzdC1vZi10eXBlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ2xpbmsnOgogICAgICAgICAgICAgICAgY2FzZSAnb25seS1vZi10eXBlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ3Jvb3QnOgogICAgICAgICAgICAgICAgY2FzZSAndGFyZ2V0JzoKICAgICAgICAgICAgICAgIGNhc2UgJ3Zpc2l0ZWQnOgogICAgICAgICAgICAgICAgICAgIGFkdmFuY2VfaWRlbnRpZmllcihuZXh0X3Rva2VuLnN0cmluZyk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdsYW5nJzoKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ2xhbmcnKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfbGFuZ19hJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJyknKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ250aC1jaGlsZCc6CiAgICAgICAgICAgICAgICBjYXNlICdudGgtbGFzdC1jaGlsZCc6CiAgICAgICAgICAgICAgICBjYXNlICdudGgtbGFzdC1vZi10eXBlJzoKICAgICAgICAgICAgICAgIGNhc2UgJ250aC1vZi10eXBlJzoKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIobmV4dF90b2tlbi5zdHJpbmcpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJygnKTsKICAgICAgICAgICAgICAgICAgICBzdHlsZV9jaGlsZCgpOwogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJyknKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ25vdCc6CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZV9pZGVudGlmaWVyKCdub3QnKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCcoJyk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICc6JyAmJiBwZWVrKDApLnN0cmluZyA9PT0gJ25vdCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2Fybignbm90Jyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHN0eWxlX3NlbGVjdG9yKCk7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnKScpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9wc2V1ZG9fYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJyMnOgogICAgICAgICAgICAgICAgYWR2YW5jZSgnIycpOwogICAgICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9pZF9hJyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnKic6CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcqJyk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnLic6CiAgICAgICAgICAgICAgICBhZHZhbmNlKCcuJyk7CiAgICAgICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2NsYXNzX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICdbJzoKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ1snKTsKICAgICAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignZXhwZWN0ZWRfYXR0cmlidXRlX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnPScgfHwgbmV4dF90b2tlbi5zdHJpbmcgPT09ICd+PScgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5zdHJpbmcgPT09ICckPScgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5zdHJpbmcgPT09ICd8PScgfHwKICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCA9PT0gJyo9JyB8fAogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkID09PSAnXj0nKSB7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX3N0cmluZ19hJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGFkdmFuY2UoJ10nKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfc2VsZWN0b3JfYScpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIHN0eWxlX3BhdHRlcm4oKSB7CiAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICd7JykgewogICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9zdHlsZV9wYXR0ZXJuJyk7CiAgICAgICAgfQogICAgICAgIGZvciAoOzspIHsKICAgICAgICAgICAgc3R5bGVfc2VsZWN0b3IoKTsKICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICc8LycgfHwgbmV4dF90b2tlbi5pZCA9PT0gJ3snIHx8CiAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCA9PT0gJ30nIHx8IG5leHRfdG9rZW4uaWQgPT09ICcoZW5kKScpIHsKICAgICAgICAgICAgICAgIHJldHVybiAnJzsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJywnKSB7CiAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIHN0eWxlX2xpc3QoKSB7CiAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgIT09ICd9JyAmJiBuZXh0X3Rva2VuLmlkICE9PSAnPC8nICYmCiAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkICE9PSAnKGVuZCknKSB7CiAgICAgICAgICAgIHN0eWxlX3BhdHRlcm4oKTsKICAgICAgICAgICAgeG1vZGUgPSAnc3R5bGVwcm9wZXJ0eSc7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnOycpIHsKICAgICAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgYWR2YW5jZSgneycpOwogICAgICAgICAgICAgICAgc3Vic3R5bGUoKTsKICAgICAgICAgICAgICAgIHhtb2RlID0gJ3N0eWxlJzsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJ30nKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBmdW5jdGlvbiBzdHlsZXMoKSB7CiAgICAgICAgdmFyIGk7CiAgICAgICAgd2hpbGUgKG5leHRfdG9rZW4uaWQgPT09ICdAJykgewogICAgICAgICAgICBpID0gcGVlaygpOwogICAgICAgICAgICBhZHZhbmNlKCdAJyk7CiAgICAgICAgICAgIHN3aXRjaCAobmV4dF90b2tlbi5zdHJpbmcpIHsKICAgICAgICAgICAgY2FzZSAnaW1wb3J0JzoKICAgICAgICAgICAgICAgIGFkdmFuY2VfaWRlbnRpZmllcignaW1wb3J0Jyk7CiAgICAgICAgICAgICAgICBpZiAoIWNzc191cmwoKSkgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsCiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4sICd1cmwnLCBhcnRpZmFjdCgpKTsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBzZW1pY29sb24oKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICdtZWRpYSc6CiAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ21lZGlhJyk7CiAgICAgICAgICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIgfHwgY3NzX21lZGlhW25leHRfdG9rZW4uc3RyaW5nXSAhPT0gdHJ1ZSkgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9tZWRpYV9hJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJywnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBjb21tYSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgneycpOwogICAgICAgICAgICAgICAgc3R5bGVfbGlzdCgpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnfScpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtZmFjZSc6CiAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ2ZvbnQtZmFjZScpOwogICAgICAgICAgICAgICAgYWR2YW5jZSgneycpOwogICAgICAgICAgICAgICAgZm9udF9mYWNlKCk7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCd9Jyk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2F0X2EnKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBzdHlsZV9saXN0KCk7CiAgICB9CgoKLy8gUGFyc2UgSFRNTAoKICAgIGZ1bmN0aW9uIGRvX2JlZ2luKG4pIHsKICAgICAgICBpZiAobiAhPT0gJ2h0bWwnICYmICFvcHRpb24uZnJhZ21lbnQpIHsKICAgICAgICAgICAgaWYgKG4gPT09ICdkaXYnICYmIG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9mcmFnbWVudCcpOwogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywgdG9rZW4sICdodG1sJywgbik7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgaWYgKG4gPT09ICdodG1sJykgewogICAgICAgICAgICAgICAgc3RvcCgnYWRzYWZlX2h0bWwnLCB0b2tlbik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG9wdGlvbi5mcmFnbWVudCkgewogICAgICAgICAgICAgICAgaWYgKG4gIT09ICdkaXYnKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgnYWRzYWZlX2RpdicsIHRva2VuKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9mcmFnbWVudCcsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBvcHRpb24uYnJvd3NlciA9IHRydWU7CiAgICB9CgogICAgZnVuY3Rpb24gZG9fYXR0cmlidXRlKGEsIHYpIHsKICAgICAgICB2YXIgdSwgeDsKICAgICAgICBpZiAoYSA9PT0gJ2lkJykgewogICAgICAgICAgICB1ID0gdHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdi50b1VwcGVyQ2FzZSgpIDogJyc7CiAgICAgICAgICAgIGlmIChpZHNbdV0gPT09IHRydWUpIHsKICAgICAgICAgICAgICAgIHdhcm4oJ2R1cGxpY2F0ZV9hJywgbmV4dF90b2tlbiwgdik7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKCEvXltBLVphLXpdW0EtWmEtejAtOS5fOlwtXSokLy50ZXN0KHYpKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdiYWRfaWRfYScsIG5leHRfdG9rZW4sIHYpOwogICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgICAgIGlmIChhZHNhZmVfaWQpIHsKICAgICAgICAgICAgICAgICAgICBpZiAodi5zbGljZSgwLCBhZHNhZmVfaWQubGVuZ3RoKSAhPT0gYWRzYWZlX2lkKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9wcmVmaXhfYScsIG5leHRfdG9rZW4sIGFkc2FmZV9pZCk7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghL15bQS1aXStfW0EtWl0rJC8udGVzdCh2KSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfYmFkX2lkJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICBhZHNhZmVfaWQgPSB2OwogICAgICAgICAgICAgICAgICAgIGlmICghL15bQS1aXStfJC8udGVzdCh2KSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfYmFkX2lkJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHggPSB2LnNlYXJjaChkeCk7CiAgICAgICAgICAgIGlmICh4ID49IDApIHsKICAgICAgICAgICAgICAgIHdhcm4oJ3VuZXhwZWN0ZWRfY2hhcl9hX2InLCB0b2tlbiwgdi5jaGFyQXQoeCksIGEpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlkc1t1XSA9IHRydWU7CiAgICAgICAgfSBlbHNlIGlmIChhID09PSAnY2xhc3MnIHx8IGEgPT09ICd0eXBlJyB8fCBhID09PSAnbmFtZScpIHsKICAgICAgICAgICAgeCA9IHYuc2VhcmNoKHF4KTsKICAgICAgICAgICAgaWYgKHggPj0gMCkgewogICAgICAgICAgICAgICAgd2FybigndW5leHBlY3RlZF9jaGFyX2FfYicsIHRva2VuLCB2LmNoYXJBdCh4KSwgYSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWRzW3VdID0gdHJ1ZTsKICAgICAgICB9IGVsc2UgaWYgKGEgPT09ICdocmVmJyB8fCBhID09PSAnYmFja2dyb3VuZCcgfHwKICAgICAgICAgICAgICAgIGEgPT09ICdjb250ZW50JyB8fCBhID09PSAnZGF0YScgfHwKICAgICAgICAgICAgICAgIGEuaW5kZXhPZignc3JjJykgPj0gMCB8fCBhLmluZGV4T2YoJ3VybCcpID49IDApIHsKICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlICYmIHV4LnRlc3QodikpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ2JhZF91cmxfYScsIG5leHRfdG9rZW4sIHYpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHVybHMucHVzaCh2KTsKICAgICAgICB9IGVsc2UgaWYgKGEgPT09ICdmb3InKSB7CiAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlKSB7CiAgICAgICAgICAgICAgICBpZiAoYWRzYWZlX2lkKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKHYuc2xpY2UoMCwgYWRzYWZlX2lkLmxlbmd0aCkgIT09IGFkc2FmZV9pZCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfcHJlZml4X2EnLCBuZXh0X3Rva2VuLCBhZHNhZmVfaWQpOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIS9eW0EtWl0rX1tBLVpdKyQvLnRlc3QodikpIHsKICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2JhZF9pZCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2JhZF9pZCcpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSBlbHNlIGlmIChhID09PSAnbmFtZScpIHsKICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUgJiYgdi5pbmRleE9mKCdfJykgPj0gMCkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX25hbWVfYScsIG5leHRfdG9rZW4sIHYpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIGRvX3RhZyhuYW1lLCBhdHRyaWJ1dGUpIHsKICAgICAgICB2YXIgaSwgdGFnID0gaHRtbF90YWdbbmFtZV0sIHNjcmlwdCwgeDsKICAgICAgICBzcmMgPSBmYWxzZTsKICAgICAgICBpZiAoIXRhZykgewogICAgICAgICAgICBzdG9wKAogICAgICAgICAgICAgICAgYnVuZGxlLnVucmVjb2duaXplZF90YWdfYSwKICAgICAgICAgICAgICAgIG5leHRfdG9rZW4sCiAgICAgICAgICAgICAgICBuYW1lID09PSBuYW1lLnRvTG93ZXJDYXNlKCkKICAgICAgICAgICAgICAgICAgICA/IG5hbWUKICAgICAgICAgICAgICAgICAgICA6IG5hbWUgKyAnIChjYXBpdGFsaXphdGlvbiBlcnJvciknCiAgICAgICAgICAgICk7CiAgICAgICAgfQogICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgIGlmIChuYW1lID09PSAnaHRtbCcpIHsKICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIHRva2VuLCBuYW1lKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB4ID0gdGFnLnBhcmVudDsKICAgICAgICAgICAgaWYgKHgpIHsKICAgICAgICAgICAgICAgIGlmICh4LmluZGV4T2YoJyAnICsgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0ubmFtZSArICcgJykgPCAwKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgndGFnX2FfaW5fYicsIHRva2VuLCBuYW1lLCB4KTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIGlmICghb3B0aW9uLmFkc2FmZSAmJiAhb3B0aW9uLmZyYWdtZW50KSB7CiAgICAgICAgICAgICAgICBpID0gc3RhY2subGVuZ3RoOwogICAgICAgICAgICAgICAgZG8gewogICAgICAgICAgICAgICAgICAgIGlmIChpIDw9IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgndGFnX2FfaW5fYicsIHRva2VuLCBuYW1lLCAnYm9keScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpIC09IDE7CiAgICAgICAgICAgICAgICB9IHdoaWxlIChzdGFja1tpXS5uYW1lICE9PSAnYm9keScpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHN3aXRjaCAobmFtZSkgewogICAgICAgIGNhc2UgJ2Rpdic6CiAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlICYmIHN0YWNrLmxlbmd0aCA9PT0gMSAmJiAhYWRzYWZlX2lkKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfbWlzc2luZ19pZCcpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3NjcmlwdCc6CiAgICAgICAgICAgIHhtb2RlID0gJ3NjcmlwdCc7CiAgICAgICAgICAgIGFkdmFuY2UoJz4nKTsKICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5sYW5nKSB7CiAgICAgICAgICAgICAgICB3YXJuKCdsYW5nJywgdG9rZW4pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlICYmIHN0YWNrLmxlbmd0aCAhPT0gMSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3BsYWNlbWVudCcsIHRva2VuKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoYXR0cmlidXRlLnNyYykgewogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUgJiYgKCFhZHNhZmVfbWF5IHx8ICFhcHByb3ZlZFthdHRyaWJ1dGUuc3JjXSkpIHsKICAgICAgICAgICAgICAgICAgICB3YXJuKCdhZHNhZmVfc291cmNlJywgdG9rZW4pOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS50eXBlKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybigndHlwZScsIHRva2VuKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIHN0ZXBfaW4obmV4dF90b2tlbi5mcm9tKTsKICAgICAgICAgICAgICAgIGVkZ2UoKTsKICAgICAgICAgICAgICAgIHVzZV9zdHJpY3QoKTsKICAgICAgICAgICAgICAgIGFkc2FmZV90b3AgPSB0cnVlOwogICAgICAgICAgICAgICAgc2NyaXB0ID0gc3RhdGVtZW50cygpOwoKLy8gSlNMaW50IGlzIGFsc28gdGhlIHN0YXRpYyBhbmFseXplciBmb3IgQURzYWZlLiBTZWUgd3d3LkFEc2FmZS5vcmcuCgogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoYWRzYWZlX3dlbnQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnYWRzYWZlX3NjcmlwdCcsIHRva2VuKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmlwdC5sZW5ndGggIT09IDEgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQoc2NyaXB0WzBdLCAgICAgICAgICAgICAnaWQnLCAgICAgJygnKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludChzY3JpcHRbMF0uZmlyc3QsICAgICAgICdpZCcsICAgICAnLicpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhaW50KHNjcmlwdFswXS5maXJzdC5maXJzdCwgJ3N0cmluZycsICdBRFNBRkUnKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludChzY3JpcHRbMF0uc2Vjb25kWzBdLCAgICdzdHJpbmcnLCBhZHNhZmVfaWQpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9pZF9nbycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNjcmlwdFswXS5maXJzdC5zZWNvbmQuc3RyaW5nKSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaWQnOgogICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRzYWZlX21heSB8fCBhZHNhZmVfd2VudCB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdFswXS5zZWNvbmQubGVuZ3RoICE9PSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfaWQnLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBhZHNhZmVfbWF5ID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ28nOgogICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRzYWZlX3dlbnQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9nbycpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JpcHRbMF0uc2Vjb25kLmxlbmd0aCAhPT0gMiB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQoc2NyaXB0WzBdLnNlY29uZFsxXSwgJ2lkJywgJ2Z1bmN0aW9uJykgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhc2NyaXB0WzBdLnNlY29uZFsxXS5maXJzdCB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdFswXS5zZWNvbmRbMV0uZmlyc3QubGVuZ3RoICE9PSAyIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludChzY3JpcHRbMF0uc2Vjb25kWzFdLmZpcnN0WzBdLCAnc3RyaW5nJywgJ2RvbScpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludChzY3JpcHRbMF0uc2Vjb25kWzFdLmZpcnN0WzFdLCAnc3RyaW5nJywgJ2xpYicpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdhZHNhZmVfZ28nLCBuZXh0X3Rva2VuKTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBhZHNhZmVfd2VudCA9IHRydWU7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9pZF9nbycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGluZGVudCA9IG51bGw7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgeG1vZGUgPSAnaHRtbCc7CiAgICAgICAgICAgIGFkdmFuY2UoJzwvJyk7CiAgICAgICAgICAgIGFkdmFuY2VfaWRlbnRpZmllcignc2NyaXB0Jyk7CiAgICAgICAgICAgIHhtb2RlID0gJ291dGVyJzsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnc3R5bGUnOgogICAgICAgICAgICB4bW9kZSA9ICdzdHlsZSc7CiAgICAgICAgICAgIGFkdmFuY2UoJz4nKTsKICAgICAgICAgICAgc3R5bGVzKCk7CiAgICAgICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgICAgICBhZHZhbmNlKCc8LycpOwogICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIoJ3N0eWxlJyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2lucHV0JzoKICAgICAgICAgICAgc3dpdGNoIChhdHRyaWJ1dGUudHlwZSkgewogICAgICAgICAgICBjYXNlICdidXR0b24nOgogICAgICAgICAgICBjYXNlICdjaGVja2JveCc6CiAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzoKICAgICAgICAgICAgY2FzZSAncmVzZXQnOgogICAgICAgICAgICBjYXNlICdzdWJtaXQnOgogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOgogICAgICAgICAgICBjYXNlICdoaWRkZW4nOgogICAgICAgICAgICBjYXNlICdpbWFnZSc6CiAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzoKICAgICAgICAgICAgY2FzZSAndGV4dCc6CiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSAmJiBhdHRyaWJ1dGUuYXV0b2NvbXBsZXRlICE9PSAnb2ZmJykgewogICAgICAgICAgICAgICAgICAgIHdhcm4oJ2Fkc2FmZV9hdXRvY29tcGxldGUnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgd2FybignYmFkX3R5cGUnKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdhcHBsZXQnOgogICAgICAgIGNhc2UgJ2JvZHknOgogICAgICAgIGNhc2UgJ2VtYmVkJzoKICAgICAgICBjYXNlICdmcmFtZSc6CiAgICAgICAgY2FzZSAnZnJhbWVzZXQnOgogICAgICAgIGNhc2UgJ2hlYWQnOgogICAgICAgIGNhc2UgJ2lmcmFtZSc6CiAgICAgICAgY2FzZSAnbm9lbWJlZCc6CiAgICAgICAgY2FzZSAnbm9mcmFtZXMnOgogICAgICAgIGNhc2UgJ29iamVjdCc6CiAgICAgICAgY2FzZSAncGFyYW0nOgogICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSkgewogICAgICAgICAgICAgICAgd2FybignYWRzYWZlX3RhZycsIG5leHRfdG9rZW4sIG5hbWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgIH0KCgogICAgZnVuY3Rpb24gY2xvc2V0YWcobmFtZSkgewogICAgICAgIHJldHVybiAnPC8nICsgbmFtZSArICc+JzsKICAgIH0KCiAgICBmdW5jdGlvbiBodG1sKCkgewoKICAgICAgICAvKmpzbGludCBjb25mdXNpb246IHRydWUgKi8KCiAgICAgICAgdmFyIGF0dHJpYnV0ZSwgYXR0cmlidXRlcywgaXNfZW1wdHksIG5hbWUsIG9sZF93aGl0ZSA9IG9wdGlvbi53aGl0ZSwKICAgICAgICAgICAgcXVvdGUsIHRhZ19uYW1lLCB0YWcsIHdtb2RlOwogICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgIHhxdW90ZSA9ICcnOwogICAgICAgIHN0YWNrID0gbnVsbDsKICAgICAgICBmb3IgKDs7KSB7CiAgICAgICAgICAgIHN3aXRjaCAobmV4dF90b2tlbi5zdHJpbmcpIHsKICAgICAgICAgICAgY2FzZSAnPCc6CiAgICAgICAgICAgICAgICB4bW9kZSA9ICdodG1sJzsKICAgICAgICAgICAgICAgIGFkdmFuY2UoJzwnKTsKICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB7fTsKICAgICAgICAgICAgICAgIHRhZ19uYW1lID0gbmV4dF90b2tlbjsKICAgICAgICAgICAgICAgIG5hbWUgPSB0YWdfbmFtZS5zdHJpbmc7CiAgICAgICAgICAgICAgICBhZHZhbmNlX2lkZW50aWZpZXIobmFtZSk7CiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmNhcCkgewogICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB0YWdfbmFtZS5uYW1lID0gbmFtZTsKICAgICAgICAgICAgICAgIGlmICghc3RhY2spIHsKICAgICAgICAgICAgICAgICAgICBzdGFjayA9IFtdOwogICAgICAgICAgICAgICAgICAgIGRvX2JlZ2luKG5hbWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdGFnID0gaHRtbF90YWdbbmFtZV07CiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhZyAhPT0gJ29iamVjdCcpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCd1bnJlY29nbml6ZWRfdGFnX2EnLCB0YWdfbmFtZSwgbmFtZSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpc19lbXB0eSA9IHRhZy5lbXB0eTsKICAgICAgICAgICAgICAgIHRhZ19uYW1lLnR5cGUgPSBuYW1lOwogICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnLycpIHsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnLycpOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJz4nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnPicsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAmJiBuZXh0X3Rva2VuLmlkLmNoYXJBdCgwKSA9PT0gJz4nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRfdG9rZW4uaWRlbnRpZmllcikgewogICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJyhlbmQpJyB8fCBuZXh0X3Rva2VuLmlkID09PSAnKGVycm9yKScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICc+JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgd2FybignYmFkX25hbWVfYScpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBvcHRpb24ud2hpdGUgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgICBzcGFjZXMoKTsKICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSBuZXh0X3Rva2VuLnN0cmluZzsKICAgICAgICAgICAgICAgICAgICBvcHRpb24ud2hpdGUgPSBvbGRfd2hpdGU7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLmNhcCAmJiBhdHRyaWJ1dGUgIT09IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2F0dHJpYnV0ZV9jYXNlX2EnLCB0b2tlbik7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpOwogICAgICAgICAgICAgICAgICAgIHhxdW90ZSA9ICcnOwogICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXR0cmlidXRlcywgYXR0cmlidXRlKSkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdkdXBsaWNhdGVfYScsIHRva2VuLCBhdHRyaWJ1dGUpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnNsaWNlKDAsIDIpID09PSAnb24nKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uLm9uKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdodG1sX2hhbmRsZXJzJyk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgeG1vZGUgPSAnc2NyaXB0c3RyaW5nJzsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnPScpOwogICAgICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IG5leHRfdG9rZW4uaWQ7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdW90ZSAhPT0gJyInICYmIHF1b3RlICE9PSAnXCcnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnIicsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHhxdW90ZSA9IHF1b3RlOwogICAgICAgICAgICAgICAgICAgICAgICB3bW9kZSA9IG9wdGlvbi53aGl0ZTsKICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLndoaXRlID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShxdW90ZSk7CiAgICAgICAgICAgICAgICAgICAgICAgIHVzZV9zdHJpY3QoKTsKICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cygpOwogICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24ud2hpdGUgPSB3bW9kZTsKICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09IHF1b3RlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCBxdW90ZSwgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgeG1vZGUgPSAnaHRtbCc7CiAgICAgICAgICAgICAgICAgICAgICAgIHhxdW90ZSA9ICcnOwogICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKHF1b3RlKTsKICAgICAgICAgICAgICAgICAgICAgICAgdGFnID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT09ICdzdHlsZScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgeG1vZGUgPSAnc2NyaXB0c3RyaW5nJzsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgnPScpOwogICAgICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IG5leHRfdG9rZW4uaWQ7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdW90ZSAhPT0gJyInICYmIHF1b3RlICE9PSAnXCcnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLCBuZXh0X3Rva2VuLCAnIicsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIHhtb2RlID0gJ3N0eWxlcHJvcGVydHknOwogICAgICAgICAgICAgICAgICAgICAgICB4cXVvdGUgPSBxdW90ZTsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShxdW90ZSk7CiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnN0eWxlKCk7CiAgICAgICAgICAgICAgICAgICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgICAgICAgICAgICAgICAgICB4cXVvdGUgPSAnJzsKICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShxdW90ZSk7CiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA9IGZhbHNlOwogICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnPScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoJz0nKTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0X3Rva2VuLmlkZW50aWZpZXIgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCAhPT0gJyInICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgIT09ICdcJycgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5pZCAhPT0gJyhzdHJpbmcpJyAmJgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLmlkICE9PSAnKHN0cmluZyknICYmCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uaWQgIT09ICcoY29sb3IpJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ2V4cGVjdGVkX2F0dHJpYnV0ZV92YWx1ZV9hJywgdG9rZW4sIGF0dHJpYnV0ZSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgPSB0cnVlOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHRhZzsKICAgICAgICAgICAgICAgICAgICBkb19hdHRyaWJ1dGUoYXR0cmlidXRlLCB0YWcpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZG9fdGFnKG5hbWUsIGF0dHJpYnV0ZXMpOwogICAgICAgICAgICAgICAgaWYgKCFpc19lbXB0eSkgewogICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godGFnX25hbWUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgeG1vZGUgPSAnb3V0ZXInOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnPicpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgJzwvJzoKICAgICAgICAgICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgICAgICAgICAgYWR2YW5jZSgnPC8nKTsKICAgICAgICAgICAgICAgIGlmICghbmV4dF90b2tlbi5pZGVudGlmaWVyKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYmFkX25hbWVfYScpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgbmFtZSA9IG5leHRfdG9rZW4uc3RyaW5nOwogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5jYXApIHsKICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgaWYgKCFzdGFjaykgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ3VuZXhwZWN0ZWRfYScsIG5leHRfdG9rZW4sIGNsb3NldGFnKG5hbWUpKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHRhZ19uYW1lID0gc3RhY2sucG9wKCk7CiAgICAgICAgICAgICAgICBpZiAoIXRhZ19uYW1lKSB7CiAgICAgICAgICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJywgbmV4dF90b2tlbiwgY2xvc2V0YWcobmFtZSkpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKHRhZ19uYW1lLm5hbWUgIT09IG5hbWUpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdleHBlY3RlZF9hX2InLAogICAgICAgICAgICAgICAgICAgICAgICBuZXh0X3Rva2VuLCBjbG9zZXRhZyh0YWdfbmFtZS5uYW1lKSwgY2xvc2V0YWcobmFtZSkpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICc+JykgewogICAgICAgICAgICAgICAgICAgIHN0b3AoJ2V4cGVjdGVkX2FfYicsIG5leHRfdG9rZW4sICc+JywgYXJ0aWZhY3QoKSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB4bW9kZSA9ICdvdXRlcic7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc+Jyk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnPCEnOgogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zYWZlKSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2EnKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHhtb2RlID0gJ2h0bWwnOwogICAgICAgICAgICAgICAgZm9yICg7OykgewogICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJz4nIHx8IG5leHRfdG9rZW4uaWQgPT09ICcoZW5kKScpIHsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLnN0cmluZy5pbmRleE9mKCctLScpID49IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJywgbmV4dF90b2tlbiwgJy0tJyk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLnN0cmluZy5pbmRleE9mKCc8JykgPj0gMCkgewogICAgICAgICAgICAgICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnLCBuZXh0X3Rva2VuLCAnPCcpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5zdHJpbmcuaW5kZXhPZignPicpID49IDApIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgndW5leHBlY3RlZF9hJywgbmV4dF90b2tlbiwgJz4nKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB4bW9kZSA9ICdvdXRlcic7CiAgICAgICAgICAgICAgICBhZHZhbmNlKCc+Jyk7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAnKGVuZCknOgogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgPT09ICcoZW5kKScpIHsKICAgICAgICAgICAgICAgICAgICBzdG9wKCdtaXNzaW5nX2EnLCBuZXh0X3Rva2VuLAogICAgICAgICAgICAgICAgICAgICAgICAnPC8nICsgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uc3RyaW5nICsgJz4nKTsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZSgpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChzdGFjayAmJiBzdGFjay5sZW5ndGggPT09IDAgJiYgKG9wdGlvbi5hZHNhZmUgfHwKICAgICAgICAgICAgICAgICAgICAhb3B0aW9uLmZyYWdtZW50IHx8IG5leHRfdG9rZW4uaWQgPT09ICcoZW5kKScpKSB7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBpZiAobmV4dF90b2tlbi5pZCAhPT0gJyhlbmQpJykgewogICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICB9CiAgICB9CgoKLy8gVGhlIGFjdHVhbCBKU0xJTlQgZnVuY3Rpb24gaXRzZWxmLgoKICAgIGl0c2VsZiA9IGZ1bmN0aW9uIEpTTGludCh0aGVfc291cmNlLCB0aGVfb3B0aW9uKSB7CgogICAgICAgIHZhciBpLCBwcmVkZWYsIHRyZWU7CiAgICAgICAgSlNMSU5ULmVycm9ycyA9IFtdOwogICAgICAgIEpTTElOVC50cmVlID0gJyc7CiAgICAgICAgYmVnaW4gPSBwcmV2X3Rva2VuID0gdG9rZW4gPSBuZXh0X3Rva2VuID0KICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShzeW50YXhbJyhiZWdpbiknXSk7CiAgICAgICAgcHJlZGVmaW5lZCA9IHt9OwogICAgICAgIGFkZF90b19wcmVkZWZpbmVkKHN0YW5kYXJkKTsKICAgICAgICBwcm9wZXJ0eV90eXBlID0gT2JqZWN0LmNyZWF0ZShzdGFuZGFyZF9wcm9wZXJ0eV90eXBlKTsKICAgICAgICBpZiAodGhlX29wdGlvbikgewogICAgICAgICAgICBvcHRpb24gPSBPYmplY3QuY3JlYXRlKHRoZV9vcHRpb24pOwogICAgICAgICAgICBwcmVkZWYgPSBvcHRpb24ucHJlZGVmOwogICAgICAgICAgICBpZiAocHJlZGVmKSB7CiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmVkZWYpKSB7CiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHByZWRlZi5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICBwcmVkZWZpbmVkW3ByZWRlZltpXV0gPSB0cnVlOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZWRlZiA9PT0gJ29iamVjdCcpIHsKICAgICAgICAgICAgICAgICAgICBhZGRfdG9fcHJlZGVmaW5lZChwcmVkZWYpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGRvX3NhZmUoKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBvcHRpb24gPSB7fTsKICAgICAgICB9CiAgICAgICAgb3B0aW9uLmluZGVudCA9ICtvcHRpb24uaW5kZW50IHx8IDQ7CiAgICAgICAgb3B0aW9uLm1heGVyciA9ICtvcHRpb24ubWF4ZXJyIHx8IDUwOwogICAgICAgIGFkc2FmZV9pZCA9ICcnOwogICAgICAgIGFkc2FmZV9tYXkgPSBhZHNhZmVfdG9wID0gYWRzYWZlX3dlbnQgPSBmYWxzZTsKICAgICAgICBhcHByb3ZlZCA9IHt9OwogICAgICAgIGlmIChvcHRpb24uYXBwcm92ZWQpIHsKICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbi5hcHByb3ZlZC5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgYXBwcm92ZWRbb3B0aW9uLmFwcHJvdmVkW2ldXSA9IG9wdGlvbi5hcHByb3ZlZFtpXTsKICAgICAgICAgICAgfQogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIGFwcHJvdmVkLnRlc3QgPSAndGVzdCc7CiAgICAgICAgfQogICAgICAgIHRhYiA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb24uaW5kZW50OyBpICs9IDEpIHsKICAgICAgICAgICAgdGFiICs9ICcgJzsKICAgICAgICB9CiAgICAgICAgZ2xvYmFsX3Njb3BlID0gc2NvcGUgPSB7fTsKICAgICAgICBnbG9iYWxfZnVuY3QgPSBmdW5jdCA9IHsKICAgICAgICAgICAgJyhzY29wZSknOiBzY29wZSwKICAgICAgICAgICAgJyhicmVha2FnZSknOiAwLAogICAgICAgICAgICAnKGxvb3BhZ2UpJzogMAogICAgICAgIH07CiAgICAgICAgZnVuY3Rpb25zID0gW2Z1bmN0XTsKCiAgICAgICAgY29tbWVudHNfb2ZmID0gZmFsc2U7CiAgICAgICAgaWRzID0ge307CiAgICAgICAgaW5fYmxvY2sgPSBmYWxzZTsKICAgICAgICBpbmRlbnQgPSBudWxsOwogICAgICAgIGpzb25fbW9kZSA9IGZhbHNlOwogICAgICAgIGxvb2thaGVhZCA9IFtdOwogICAgICAgIG1lbWJlciA9IHt9OwogICAgICAgIG5vZGVfanMgPSBmYWxzZTsKICAgICAgICBwcmVyZWcgPSB0cnVlOwogICAgICAgIHNyYyA9IGZhbHNlOwogICAgICAgIHN0YWNrID0gbnVsbDsKICAgICAgICBzdHJpY3RfbW9kZSA9IGZhbHNlOwogICAgICAgIHVybHMgPSBbXTsKICAgICAgICB2YXJfbW9kZSA9IG51bGw7CiAgICAgICAgd2FybmluZ3MgPSAwOwogICAgICAgIHhtb2RlID0gJyc7CiAgICAgICAgbGV4LmluaXQodGhlX3NvdXJjZSk7CgogICAgICAgIGFzc3VtZSgpOwoKICAgICAgICB0cnkgewogICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgIGlmIChuZXh0X3Rva2VuLmlkID09PSAnKG51bWJlciknKSB7CiAgICAgICAgICAgICAgICBzdG9wKCd1bmV4cGVjdGVkX2EnKTsKICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0X3Rva2VuLnN0cmluZy5jaGFyQXQoMCkgPT09ICc8JykgewogICAgICAgICAgICAgICAgaHRtbCgpOwogICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5hZHNhZmUgJiYgIWFkc2FmZV93ZW50KSB7CiAgICAgICAgICAgICAgICAgICAgd2FybignYWRzYWZlX2dvJywgdGhpcyk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5leHRfdG9rZW4uaWQpIHsKICAgICAgICAgICAgICAgIGNhc2UgJ3snOgogICAgICAgICAgICAgICAgY2FzZSAnWyc6CiAgICAgICAgICAgICAgICAgICAganNvbl9tb2RlID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICBqc29uX3ZhbHVlKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdAJzoKICAgICAgICAgICAgICAgIGNhc2UgJyonOgogICAgICAgICAgICAgICAgY2FzZSAnIyc6CiAgICAgICAgICAgICAgICBjYXNlICcuJzoKICAgICAgICAgICAgICAgIGNhc2UgJzonOgogICAgICAgICAgICAgICAgICAgIHhtb2RlID0gJ3N0eWxlJzsKICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLmlkICE9PSAnQCcgfHwgIW5leHRfdG9rZW4uaWRlbnRpZmllciB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF90b2tlbi5zdHJpbmcgIT09ICdjaGFyc2V0JyB8fCB0b2tlbi5saW5lICE9PSAxIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5mcm9tICE9PSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2NzcycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfdG9rZW4uaWQgIT09ICcoc3RyaW5nKScgJiYKICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4uc3RyaW5nICE9PSAnVVRGLTgnKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2NzcycpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKCk7CiAgICAgICAgICAgICAgICAgICAgc2VtaWNvbG9uKCk7CiAgICAgICAgICAgICAgICAgICAgc3R5bGVzKCk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CgogICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmFkc2FmZSAmJiBvcHRpb24uZnJhZ21lbnQpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCgnZXhwZWN0ZWRfYV9iJywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRfdG9rZW4sICc8ZGl2PicsIGFydGlmYWN0KCkpOwogICAgICAgICAgICAgICAgICAgIH0KCi8vIElmIHRoZSBmaXJzdCB0b2tlbiBpcyBhIHNlbWljb2xvbiwgaWdub3JlIGl0LiBUaGlzIGlzIHNvbWV0aW1lcyB1c2VkIHdoZW4KLy8gZmlsZXMgYXJlIGludGVuZGVkIHRvIGJlIGFwcGVuZGVkIHRvIGZpbGVzIHRoYXQgbWF5IGJlIHNsb3BweS4gQSBzbG9wcHkKLy8gZmlsZSBtYXkgYmUgZGVwZW5kaW5nIG9uIHNlbWljb2xvbiBpbnNlcnRpb24gb24gaXRzIGxhc3QgbGluZS4KCiAgICAgICAgICAgICAgICAgICAgc3RlcF9pbigxKTsKICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF90b2tlbi5pZCA9PT0gJzsnICYmICFub2RlX2pzKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHNlbWljb2xvbigpOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBhZHNhZmVfdG9wID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICB0cmVlID0gc3RhdGVtZW50cygpOwogICAgICAgICAgICAgICAgICAgIGJlZ2luLmZpcnN0ID0gdHJlZTsKICAgICAgICAgICAgICAgICAgICBKU0xJTlQudHJlZSA9IGJlZ2luOwogICAgICAgICAgICAgICAgICAgIC8vIGluZmVyX3R5cGVzKHRyZWUpOwogICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uYWRzYWZlICYmICh0cmVlLmxlbmd0aCAhPT0gMSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludCh0cmVlWzBdLCAnaWQnLCAnKCcpIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhaW50KHRyZWVbMF0uZmlyc3QsICdpZCcsICcuJykgfHwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFpbnQodHJlZVswXS5maXJzdC5maXJzdCwgJ3N0cmluZycsICdBRFNBRkUnKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludCh0cmVlWzBdLmZpcnN0LnNlY29uZCwgJ3N0cmluZycsICdsaWInKSB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZVswXS5zZWNvbmQubGVuZ3RoICE9PSAyIHx8CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlWzBdLnNlY29uZFswXS5pZCAhPT0gJyhzdHJpbmcpJyB8fAogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWludCh0cmVlWzBdLnNlY29uZFsxXSwgJ2lkJywgJ2Z1bmN0aW9uJykpKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3AoJ2Fkc2FmZV9saWInKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWUuZGlzcnVwdCkgewogICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCd3ZWlyZF9wcm9ncmFtJywgcHJldl90b2tlbik7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGluZGVudCA9IG51bGw7CiAgICAgICAgICAgIGFkdmFuY2UoJyhlbmQpJyk7CiAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICBpZiAoZSkgeyAgICAgICAgLy8gYH4KICAgICAgICAgICAgICAgIEpTTElOVC5lcnJvcnMucHVzaCh7CiAgICAgICAgICAgICAgICAgICAgcmVhc29uICAgIDogZS5tZXNzYWdlLAogICAgICAgICAgICAgICAgICAgIGxpbmUgICAgICA6IGUubGluZSB8fCBuZXh0X3Rva2VuLmxpbmUsCiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyIDogZS5jaGFyYWN0ZXIgfHwgbmV4dF90b2tlbi5mcm9tCiAgICAgICAgICAgICAgICB9LCBudWxsKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gSlNMSU5ULmVycm9ycy5sZW5ndGggPT09IDA7CiAgICB9OwoKCi8vIERhdGEgc3VtbWFyeS4KCiAgICBpdHNlbGYuZGF0YSA9IGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgZGF0YSA9IHtmdW5jdGlvbnM6IFtdfSwKICAgICAgICAgICAgZnVuY3Rpb25fZGF0YSwKICAgICAgICAgICAgZ2xvYmFscywKICAgICAgICAgICAgaSwKICAgICAgICAgICAgaiwKICAgICAgICAgICAga2luZCwKICAgICAgICAgICAgbWVtYmVycyA9IFtdLAogICAgICAgICAgICBuYW1lLAogICAgICAgICAgICB0aGVfZnVuY3Rpb24sCiAgICAgICAgICAgIHVuZGVmID0gW10sCiAgICAgICAgICAgIHVudXNlZCA9IFtdOwogICAgICAgIGlmIChpdHNlbGYuZXJyb3JzLmxlbmd0aCkgewogICAgICAgICAgICBkYXRhLmVycm9ycyA9IGl0c2VsZi5lcnJvcnM7CiAgICAgICAgfQoKICAgICAgICBpZiAoanNvbl9tb2RlKSB7CiAgICAgICAgICAgIGRhdGEuanNvbiA9IHRydWU7CiAgICAgICAgfQoKICAgICAgICBpZiAodXJscy5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgIGRhdGEudXJscyA9IHVybHM7CiAgICAgICAgfQoKICAgICAgICBnbG9iYWxzID0gT2JqZWN0LmtleXMoZ2xvYmFsX3Njb3BlKS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7CiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkgIT09ICcoJyAmJiB0eXBlb2Ygc3RhbmRhcmRbdmFsdWVdICE9PSAnYm9vbGVhbic7CiAgICAgICAgfSk7CiAgICAgICAgaWYgKGdsb2JhbHMubGVuZ3RoID4gMCkgewogICAgICAgICAgICBkYXRhLmdsb2JhbHMgPSBnbG9iYWxzOwogICAgICAgIH0KCiAgICAgICAgZm9yIChpID0gMTsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICB0aGVfZnVuY3Rpb24gPSBmdW5jdGlvbnNbaV07CiAgICAgICAgICAgIGZ1bmN0aW9uX2RhdGEgPSB7fTsKICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGZ1bmN0aW9uaWNpdHkubGVuZ3RoOyBqICs9IDEpIHsKICAgICAgICAgICAgICAgIGZ1bmN0aW9uX2RhdGFbZnVuY3Rpb25pY2l0eVtqXV0gPSBbXTsKICAgICAgICAgICAgfQogICAgICAgICAgICBmb3IgKG5hbWUgaW4gdGhlX2Z1bmN0aW9uKSB7CiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoZV9mdW5jdGlvbiwgbmFtZSkpIHsKICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgIT09ICcoJykgewogICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gdGhlX2Z1bmN0aW9uW25hbWVdOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA9PT0gJ3VuY3Rpb24nIHx8IGtpbmQgPT09ICd1bnBhcmFtJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9ICd1bnVzZWQnOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0aW9uX2RhdGFba2luZF0pKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbl9kYXRhW2tpbmRdLnB1c2gobmFtZSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA9PT0gJ3VudXNlZCcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnVzZWQucHVzaCh7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoZV9mdW5jdGlvblsnKGxpbmUpJ10sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmdW5jdGlvbic6IHRoZV9mdW5jdGlvblsnKG5hbWUpJ10KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gJ3VuZGVmJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmLnB1c2goewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGVfZnVuY3Rpb25bJyhsaW5lKSddLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZnVuY3Rpb24nOiB0aGVfZnVuY3Rpb25bJyhuYW1lKSddCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGZ1bmN0aW9uaWNpdHkubGVuZ3RoOyBqICs9IDEpIHsKICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbl9kYXRhW2Z1bmN0aW9uaWNpdHlbal1dLmxlbmd0aCA9PT0gMCkgewogICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmdW5jdGlvbl9kYXRhW2Z1bmN0aW9uaWNpdHlbal1dOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGZ1bmN0aW9uX2RhdGEubmFtZSA9IHRoZV9mdW5jdGlvblsnKG5hbWUpJ107CiAgICAgICAgICAgIGZ1bmN0aW9uX2RhdGEucGFyYW1zID0gdGhlX2Z1bmN0aW9uWycocGFyYW1zKSddOwogICAgICAgICAgICBmdW5jdGlvbl9kYXRhLmxpbmUgPSB0aGVfZnVuY3Rpb25bJyhsaW5lKSddOwogICAgICAgICAgICBmdW5jdGlvbl9kYXRhWycoY29tcGxleGl0eSknXSA9IHRoZV9mdW5jdGlvblsnKGNvbXBsZXhpdHkpJ107CiAgICAgICAgICAgIGRhdGEuZnVuY3Rpb25zLnB1c2goZnVuY3Rpb25fZGF0YSk7CiAgICAgICAgfQoKICAgICAgICBpZiAodW51c2VkLmxlbmd0aCA+IDApIHsKICAgICAgICAgICAgZGF0YS51bnVzZWQgPSB1bnVzZWQ7CiAgICAgICAgfQogICAgICAgIGlmICh1bmRlZi5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgIGRhdGFbJ3VuZGVmaW5lZCddID0gdW5kZWY7CiAgICAgICAgfQoKICAgICAgICBtZW1iZXJzID0gW107CiAgICAgICAgZm9yIChuYW1lIGluIG1lbWJlcikgewogICAgICAgICAgICBpZiAodHlwZW9mIG1lbWJlcltuYW1lXSA9PT0gJ251bWJlcicpIHsKICAgICAgICAgICAgICAgIGRhdGEubWVtYmVyID0gbWVtYmVyOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIHJldHVybiBkYXRhOwogICAgfTsKCgogICAgaXRzZWxmLnJlcG9ydCA9IGZ1bmN0aW9uIChlcnJvcnNfb25seSkgewogICAgICAgIHZhciBkYXRhID0gaXRzZWxmLmRhdGEoKSwgZXJyLCBldmlkZW5jZSwgaSwgaXRhbGljcywgaiwga2V5LCBrZXlzLCBsZW5ndGgsCiAgICAgICAgICAgIG1lbSA9ICcnLCBuYW1lLCBuYW1lcywgb3V0cHV0ID0gW10sIHNuaXBwZXRzLCB0aGVfZnVuY3Rpb24sIHR5cGUsCiAgICAgICAgICAgIHdhcm5pbmc7CgogICAgICAgIGZ1bmN0aW9uIGRldGFpbChoLCB2YWx1ZSkgewogICAgICAgICAgICB2YXIgY29tbWFfbmVlZGVkLCBzaW5ndWxhcml0eTsKICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPGRpdj48aT4nICsgaCArICc8L2k+ICcpOwogICAgICAgICAgICAgICAgdmFsdWUuc29ydCgpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsKICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gc2luZ3VsYXJpdHkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgc2luZ3VsYXJpdHkgPSBpdGVtOwogICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgoY29tbWFfbmVlZGVkID8gJywgJyA6ICcnKSArIHNpbmd1bGFyaXR5KTsKICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFfbmVlZGVkID0gdHJ1ZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8L2Rpdj4nKTsKICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSkgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxkaXY+PGk+JyArIGggKyAnPC9pPiAnICsgdmFsdWUgKyAnPC9kaXY+Jyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIGlmIChkYXRhLmVycm9ycyB8fCBkYXRhLnVudXNlZCB8fCBkYXRhWyd1bmRlZmluZWQnXSkgewogICAgICAgICAgICBlcnIgPSB0cnVlOwogICAgICAgICAgICBvdXRwdXQucHVzaCgnPGRpdiBpZD1lcnJvcnM+PGk+RXJyb3I6PC9pPicpOwogICAgICAgICAgICBpZiAoZGF0YS5lcnJvcnMpIHsKICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhLmVycm9ycy5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgIHdhcm5pbmcgPSBkYXRhLmVycm9yc1tpXTsKICAgICAgICAgICAgICAgICAgICBpZiAod2FybmluZykgewogICAgICAgICAgICAgICAgICAgICAgICBldmlkZW5jZSA9IHdhcm5pbmcuZXZpZGVuY2UgfHwgJyc7CiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8cD5Qcm9ibGVtJyArIChpc0Zpbml0ZSh3YXJuaW5nLmxpbmUpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICcgYXQgbGluZSAnICsgU3RyaW5nKHdhcm5pbmcubGluZSkgKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgY2hhcmFjdGVyICcgKyBTdHJpbmcod2FybmluZy5jaGFyYWN0ZXIpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnKSArCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnOiAnICsgd2FybmluZy5yZWFzb24uZW50aXR5aWZ5KCkgKwogICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvcD48cCBjbGFzcz1ldmlkZW5jZT4nICsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIChldmlkZW5jZSAmJiAoZXZpZGVuY2UubGVuZ3RoID4gODAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGV2aWRlbmNlLnNsaWNlKDAsIDc3KSArICcuLi4nCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBldmlkZW5jZSkuZW50aXR5aWZ5KCkpICsgJzwvcD4nKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGlmIChkYXRhWyd1bmRlZmluZWQnXSkgewogICAgICAgICAgICAgICAgc25pcHBldHMgPSBbXTsKICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhWyd1bmRlZmluZWQnXS5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgIHNuaXBwZXRzW2ldID0gJzxjb2RlPjx1PicgKyBkYXRhWyd1bmRlZmluZWQnXVtpXS5uYW1lICsgJzwvdT48L2NvZGU+Jm5ic3A7PGk+JyArCiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmluZyhkYXRhWyd1bmRlZmluZWQnXVtpXS5saW5lKSArICcgPC9pPiA8c21hbGw+JyArCiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ3VuZGVmaW5lZCddW2ldWydmdW5jdGlvbiddICsgJzwvc21hbGw+JzsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8cD48aT5VbmRlZmluZWQgdmFyaWFibGU6PC9pPiAnICsgc25pcHBldHMuam9pbignLCAnKSArICc8L3A+Jyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGRhdGEudW51c2VkKSB7CiAgICAgICAgICAgICAgICBzbmlwcGV0cyA9IFtdOwogICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEudW51c2VkLmxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICAgICAgc25pcHBldHNbaV0gPSAnPGNvZGU+PHU+JyArIGRhdGEudW51c2VkW2ldLm5hbWUgKyAnPC91PjwvY29kZT4mbmJzcDs8aT4nICsKICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGRhdGEudW51c2VkW2ldLmxpbmUpICsgJyA8L2k+IDxzbWFsbD4nICsKICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS51bnVzZWRbaV1bJ2Z1bmN0aW9uJ10gKyAnPC9zbWFsbD4nOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxwPjxpPlVudXNlZCB2YXJpYWJsZTo8L2k+ICcgKyBzbmlwcGV0cy5qb2luKCcsICcpICsgJzwvcD4nKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZGF0YS5qc29uKSB7CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPHA+SlNPTjogYmFkLjwvcD4nKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBvdXRwdXQucHVzaCgnPC9kaXY+Jyk7CiAgICAgICAgfQoKICAgICAgICBpZiAoIWVycm9yc19vbmx5KSB7CgogICAgICAgICAgICBvdXRwdXQucHVzaCgnPGJyPjxkaXYgaWQ9ZnVuY3Rpb25zPicpOwoKICAgICAgICAgICAgaWYgKGRhdGEudXJscykgewogICAgICAgICAgICAgICAgZGV0YWlsKCJVUkxzPGJyPiIsIGRhdGEudXJscywgJzxicj4nKTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgaWYgKHhtb2RlID09PSAnc3R5bGUnKSB7CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPHA+Q1NTLjwvcD4nKTsKICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmpzb24gJiYgIWVycikgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxwPkpTT046IGdvb2QuPC9wPicpOwogICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZ2xvYmFscykgewogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxkaXY+PGk+R2xvYmFsPC9pPiAnICsKICAgICAgICAgICAgICAgICAgICBkYXRhLmdsb2JhbHMuc29ydCgpLmpvaW4oJywgJykgKyAnPC9kaXY+Jyk7CiAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnPGRpdj48aT5ObyBuZXcgZ2xvYmFsIHZhcmlhYmxlcyBpbnRyb2R1Y2VkLjwvaT48L2Rpdj4nKTsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEuZnVuY3Rpb25zLmxlbmd0aDsgaSArPSAxKSB7CiAgICAgICAgICAgICAgICB0aGVfZnVuY3Rpb24gPSBkYXRhLmZ1bmN0aW9uc1tpXTsKICAgICAgICAgICAgICAgIG5hbWVzID0gW107CiAgICAgICAgICAgICAgICBpZiAodGhlX2Z1bmN0aW9uLnBhcmFtcykgewogICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCB0aGVfZnVuY3Rpb24ucGFyYW1zLmxlbmd0aDsgaiArPSAxKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzW2pdID0gdGhlX2Z1bmN0aW9uLnBhcmFtc1tqXS5zdHJpbmc7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxicj48ZGl2IGNsYXNzPWZ1bmN0aW9uPjxpPicgKwogICAgICAgICAgICAgICAgICAgIFN0cmluZyh0aGVfZnVuY3Rpb24ubGluZSkgKyAnPC9pPiAnICsKICAgICAgICAgICAgICAgICAgICB0aGVfZnVuY3Rpb24ubmFtZS5lbnRpdHlpZnkoKSArCiAgICAgICAgICAgICAgICAgICAgJygnICsgbmFtZXMuam9pbignLCAnKSArICcpPC9kaXY+Jyk7CiAgICAgICAgICAgICAgICBkZXRhaWwoJzxiaWc+PGI+VW5kZWZpbmVkPC9iPjwvYmlnPicsIHRoZV9mdW5jdGlvblsndW5kZWZpbmVkJ10pOwogICAgICAgICAgICAgICAgZGV0YWlsKCc8YmlnPjxiPlVudXNlZDwvYj48L2JpZz4nLCB0aGVfZnVuY3Rpb24udW51c2VkKTsKICAgICAgICAgICAgICAgIGRldGFpbCgnQ2xvc3VyZScsIHRoZV9mdW5jdGlvbi5jbG9zdXJlKTsKICAgICAgICAgICAgICAgIGRldGFpbCgnVmFyaWFibGUnLCB0aGVfZnVuY3Rpb25bJ3ZhciddKTsKICAgICAgICAgICAgICAgIGRldGFpbCgnRXhjZXB0aW9uJywgdGhlX2Z1bmN0aW9uLmV4Y2VwdGlvbik7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ091dGVyJywgdGhlX2Z1bmN0aW9uLm91dGVyKTsKICAgICAgICAgICAgICAgIGRldGFpbCgnR2xvYmFsJywgdGhlX2Z1bmN0aW9uLmdsb2JhbCk7CiAgICAgICAgICAgICAgICBkZXRhaWwoJ0xhYmVsJywgdGhlX2Z1bmN0aW9uLmxhYmVsKTsKICAgICAgICAgICAgICAgIGRldGFpbCgnQ29tcGxleGl0eScsIHRoZV9mdW5jdGlvblsnKGNvbXBsZXhpdHkpJ10pOwogICAgICAgICAgICB9CgogICAgICAgICAgICBpZiAoZGF0YS5tZW1iZXIpIHsKICAgICAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhLm1lbWJlcik7CiAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGgpIHsKICAgICAgICAgICAgICAgICAgICBrZXlzID0ga2V5cy5zb3J0KCk7CiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goJzxicj48cHJlIGlkPXByb3BlcnRpZXM+Lypwcm9wZXJ0aWVzPGJyPicpOwogICAgICAgICAgICAgICAgICAgIG1lbSA9ICcgICAgJzsKICAgICAgICAgICAgICAgICAgICBpdGFsaWNzID0gMDsKICAgICAgICAgICAgICAgICAgICBqID0gMDsKICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmNvbmZ1c2lvbikgewogICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5c1tpXTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhbmRhcmRfcHJvcGVydHlfdHlwZVtrZXldICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBpeC50ZXN0KGtleSkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBrZXkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnXCcnICsga2V5LmVudGl0eWlmeSgpLnJlcGxhY2UobngsIHNhbml0aXplKSArICdcJyc7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubWVtYmVyW2tleV0gPT09IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICc8aT4nICsgbmFtZSArICc8L2k+JzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRhbGljcyArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBrZXlzLmxlbmd0aCAtIDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArPSAnLCAnOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVtLmxlbmd0aCArIG5hbWUubGVuZ3RoIC0gKGl0YWxpY3MgKiA3KSA+IDgwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKG1lbSArICc8YnI+Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbSA9ICcgICAgJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRhbGljcyA9IGo7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbSArPSBuYW1lOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gcHJvcGVydHlfdHlwZVtrZXldOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFuZGFyZF9wcm9wZXJ0eV90eXBlW2tleV0gIT09IHR5cGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gaXgudGVzdChrZXkpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ga2V5CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1wnJyArIGtleS5lbnRpdHlpZnkoKS5yZXBsYWNlKG54LCBzYW5pdGl6ZSkgKyAnXCcnOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCArPSBuYW1lLmxlbmd0aCArIDI7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubWVtYmVyW2tleV0gPT09IDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICc8aT4nICsgbmFtZSArICc8L2k+JzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRhbGljcyArPSAxOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqID0gMTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArPSAnOiAnICsgdHlwZTsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBrZXlzLmxlbmd0aCAtIDEpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArPSAnLCAnOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVtLmxlbmd0aCArIG5hbWUubGVuZ3RoIC0gKGl0YWxpY3MgKiA3KSA+IDgwKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKG1lbSArICc8YnI+Jyk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbSA9ICcgICAgJzsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRhbGljcyA9IGo7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbSArPSBuYW1lOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKG1lbSArICc8YnI+Ki88L3ByZT4nKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKCc8L2Rpdj4nKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpOwogICAgfTsKICAgIGl0c2VsZi5qc2xpbnQgPSBpdHNlbGY7CgogICAgLy8gQ29tbW9uSlMgbW9kdWxlIGV4cG9ydAogICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAidW5kZWZpbmVkIikgewogICAgICAgIGV4cG9ydHMuSlNMSU5UID0gaXRzZWxmOwogICAgfQoKICAgIGl0c2VsZi5lZGl0aW9uID0gJzIwMTEtMDktMjknOwoKICAgIHJldHVybiBpdHNlbGY7Cgp9KCkpOw==");
});
(function() {
var env = {};
module.declare([{"_package-0":{"id":"887BE3DFB4516B3595DAB5B68B91EF7E"}}], function(require, exports, module) {
require('_package-0').main(env);
});
})();