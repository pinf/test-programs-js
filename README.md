Test Programs for the PINF JavaScript Platform
==============================================

*Status: DEV - Currently only works with the `node` platform to download dependencies. Once a program
has been run once with `node` it can be run with `gpsee` and `ringo`.*

NOTE: This projects initially targets a UNIX toolchain. Windows support is planned.

This project contains example JavaScript programs conforming to and building
on the [CommonJS](http://commonjs.org/) standards. The programs are made up
of Packages loaded via the [PINF JavaScript Loader](https://github.com/pinf/loader-js)
from the [PINF JavaScript Test Packages](https://github.com/pinf/test-packages-js) 
project and other places around the Internet.

The programs require any one or more of the following JavaScript platforms:

  * [NodeJS](http://nodejs.org/) - Scalable, asynchronous JavaScript network programs
    * TODO: Where else can this be linked to a better install overview?
  * [GPSEE](http://code.google.com/p/gpsee/wiki/Building) - General Purpose Spidermonkey Embedding Ecosystem
    * TODO: Where else can this be linked to a better install overview?
  * [RingoJS](http://ringojs.org/downloads) - JavaScript runtime based on Mozilla Rhino (Java)
    * TODO: Where else can this be linked to a better install overview?

You also need the [PINF JavaScript Loader](https://github.com/pinf/loader-js). Use
any one of the following install solutions:

    # TODO: Release NPM package with every release of github.com/pinf/loader-js
    npm install pinf-loader-js
    
    cd ~/
    wget -O pinf-loader-js.tar.gz https://github.com/pinf/loader-js/tarball/master
    tar -zxf pinf-loader-js.tar.gz -C pinf-loader-js
    alias commonjs='~/pinf-loader-js/pinf-loader.sh'
    
    cd ~/
    git clone git://github.com/pinf/loader-js.git pinf-loader-js
    alias commonjs='~/pinf-loader-js/pinf-loader.sh'


Test/Example Programs
=====================

CONTRIBUTE: If any of the programs below do not work on the indicated platforms please 
[let us know](http://groups.google.com/group/pinf-dev/)!

Portable
--------

You can select any of the platforms listed above (`node`, `gpsee`, `ringo`) 
via `commonjs --platform <PlatformAlias> ...`.

A bare-bones [Hello World](https://github.com/pinf/test-programs-js/tree/master/HelloWorld):

    commonjs https://github.com/pinf/test-programs-js/zipball/master ./HelloWorld

Simple [Command-line script](https://github.com/pinf/test-programs-js/tree/master/SimpleCLI):

    commonjs https://github.com/pinf/test-programs-js/zipball/master ./SimpleCLI


Support & Feedback
==================

Developer mailing list: [http://groups.google.com/group/pinf-dev/](http://groups.google.com/group/pinf-dev/)


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
