Test Programs for the PINF JavaScript Platform
==============================================

**Status: ALPHA - Currently only works with the `node` platform to download dependencies. Once a program
has been run once with `node` it can be run with the other CLI platforms.**

**NOTE: This projects initially targets a UNIX toolchain. Windows support is planned.**

This project contains example JavaScript programs conforming to and building
on the [CommonJS](http://commonjs.org/) standards. The programs are made up
of packages loaded via the [PINF JavaScript Loader](https://github.com/pinf/loader-js)
from the [PINF JavaScript Test Packages](https://github.com/pinf/test-packages-js) 
project and other places around the Internet.

The programs require any one or more of the following JavaScript platforms:

  * [NodeJS](http://nodejs.org/) - Scalable, asynchronous JavaScript network programs (**Currently required at minimum and used by default**)
  * [GPSEE](http://code.google.com/p/gpsee/wiki/Building) - General Purpose Spidermonkey Embedding Ecosystem
  * [v8cgi](http://code.google.com/p/v8cgi) - CGI wrapper around V8 JavaScript engine
  * [Narwhal](https://github.com/cappuccino/narwhal) - Cross-platform, multi-interpreter, general purpose JavaScript platform
  * [RingoJS](http://ringojs.org/downloads) - JavaScript runtime based on Mozilla Rhino (Java)
  * Modern Browser

You also need the [PINF JavaScript Loader](https://github.com/pinf/loader-js). Use
any one of the following install solutions:

    # TODO: Release NPM package with every release of github.com/pinf/loader-js
    # npm install pinf-loader-js
    
    cd ~/
    wget -O pinf-loader-js.tar.gz https://github.com/pinf/loader-js/tarball/master
    tar -zxf pinf-loader-js.tar.gz
    mv pinf-loader-js-* pinf-loader-js
    alias commonjs='~/pinf-loader-js/pinf-loader.sh'
    
    cd ~/
    git clone git://github.com/pinf/loader-js.git pinf-loader-js
    alias commonjs='~/pinf-loader-js/pinf-loader.sh'


Test/Example Programs
=====================

CONTRIBUTE: If any of the programs below do not work on the indicated platforms please 
[let us know](http://groups.google.com/group/pinf-dev/)!

Portable CLI
------------

Programs that run from the command line.

You can select any of `node`, `gpsee`, `v8cgi`, `narwhal` or `ringo` via `commonjs --platform <PlatformAlias> ...`.

A bare-bones [Hello World](https://github.com/pinf/test-programs-js/tree/master/HelloWorld) with a dependency:

    commonjs https://github.com/pinf/test-programs-js/zipball/master HelloWorld

[Additional code loading](https://github.com/pinf/test-programs-js/tree/master/AdditionalLoad) with a dependency:

    commonjs https://github.com/pinf/test-programs-js/zipball/master AdditionalLoad

[JSLint Benchmark](https://github.com/pinf/test-programs-js/tree/master/JSLintBenchmark):

    commonjs https://github.com/pinf/test-programs-js/zipball/master JSLintBenchmark

Simple command-line [URL Fetcher](https://github.com/pinf/test-programs-js/tree/master/URLFetcher) (**Currently only works on `node` due to missing APIs on other platforms.**):

    commonjs https://github.com/pinf/test-programs-js/zipball/master URLFetcher


Browser
-------

Programs that run in the browser in exported form (**Currently requires `node` to export or serve due to incomplete API adapters for other platforms.**).

A bare-bones [Hello World](https://github.com/pinf/test-programs-js/tree/master/HelloWorld) with a dependency:

    commonjs --script export https://github.com/pinf/test-programs-js/zipball/master HelloWorld HelloWorld/exported
    open http://.../HelloWorld/exported/index.sample.html
    # Look for messages in browser console.

[Additional code loading](https://github.com/pinf/test-programs-js/tree/master/AdditionalLoad) with a dependency:

    commonjs --script export https://github.com/pinf/test-programs-js/zipball/master AdditionalLoad AdditionalLoad/exported
    open http://.../AdditionalLoad/exported/index.sample.html
    # Look for messages in browser console.

[JSLint Benchmark](https://github.com/pinf/test-programs-js/tree/master/JSLintBenchmark):

    commonjs --script export https://github.com/pinf/test-programs-js/zipball/master JSLintBenchmark JSLintBenchmark/exported
    open http://.../JSLintBenchmark/exported/index.sample.html
    # Look for messages in browser console.

[Canvas Graphics](https://github.com/pinf/test-programs-js/tree/master/CanvasGraphics) with plain JavaScript library dependency:

    commonjs --script serve https://github.com/pinf/test-programs-js/zipball/master --reloading --port 8081 CanvasGraphics
    open http://localhost:8081/


Automated Testing
=================

The programs in this project make a great test suite for platforms. The following will run
various programs against available and applicable platforms:

    # All tests
    commonjs --script test https://github.com/pinf/test-programs-js/zipball/master
    
    # Specific test
    commonjs --script test https://github.com/pinf/test-programs-js/zipball/master portable-HelloWorld.js


Development
===========

To make changes to a dependency and use your local copy when running the program, place the dependency's
package into `/pinf/workspaces/<UID>`. For example:

    cd /pinf/workspaces/github.com/pinf/
    git clone git://github.com/pinf/test-packages-js.git test-packages-js

The loader will automatically detect the package via its *UID* and use the local source.

If you have cloned this `test-programs-js` project and want to run it from source:

    cd /pinf/workspaces/github.com/pinf/
    git clone git://github.com/pinf/test-programs-js.git test-programs-js

Replace `https://github.com/pinf/test-programs-js/zipball/master` with `/pinf/workspaces/github.com/pinf/test-programs-js`
in the commands above.


Support & Feedback
==================

Developer mailing list: [http://groups.google.com/group/pinf-dev/](http://groups.google.com/group/pinf-dev/)


TODO
====

Priority: High
--------------

  * Get portable programs working on all platforms without downloading dependencies with `node` first.
    * Resolve platform level bugs.
    * Complete adapters: [https://github.com/pinf/loader-js/tree/master/lib/pinf-loader-js/adapter](https://github.com/pinf/loader-js/tree/master/lib/pinf-loader-js/adapter)
  * Remove NPM dependency from CanvasGraphics example so we can make it portable.
  * `node` specific demos (with and without leveraging NPM)
  * `gpsee` specific demos
  * `v8cgi` specific demos
  * `narwhal` specific demos
  * `ringo` specific demos
  * JSGI demos
  * CommonJS API demos
    * http://olegp.github.com/common-node/

Priority: Medium
----------------

  * Get exported HelloWorld program working on all platforms.

Priority: Low
-------------

  * Performance tuning of PINF JavaScript Loader on `ringo`.
  * Example program leveraging [SASS](http://sass-lang.com/).


Contribute
==========

Collaboration Platform: [https://github.com/pinf/test-programs-js/](https://github.com/pinf/test-programs-js/)

Collaboration Process:

  1. Discuss your change on the mailing list
  2. Write a patch on your own
  3. Send pull request on github & ping mailing list
  4. Discuss pull request on github to refine

You must explicitly license your patch by adding the following to the top of any file you modify
in order for your patch to be accepted:

    //  - <GithubUsername>, First Last <Email>, Copyright YYYY, MIT License


Author
======

This project is a part of the [PINF](http://www.christophdorn.com/Research/#PINF) project maintained by
[Christoph Dorn](http://www.christophdorn.com/).


Documentation License
=====================

[Creative Commons Attribution-NonCommercial-ShareAlike 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)

Copyright (c) 2011+ [Christoph Dorn](http://www.christophdorn.com/)


Code License
============

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2011+ [Christoph Dorn](http://www.christophdorn.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
