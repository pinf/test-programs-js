Test Programs for the PINF JavaScript Platform
==============================================

*Status: DEV - Not Functional Yet*

NOTE: This projects initially targets a UNIX toolchain. Windows support is planned.

This project contains example JavaScript programs conforming to and building
on the [CommonJS](http://commonjs.org/) standards. The programs are made up of
of Packages loaded via the [PINF JavaScript Loader](https://github.com/pinf/loader-js)
from the [PINF JavaScript Test Packages](https://github.com/pinf/test-package-js) 
project and other places around the Internet.

The programs require any one or more of the following JavaScript platforms:

  * [NodeJS](http://nodejs.org/) - Scalable, asynchronous JavaScript network programs
    * TODO: Where else can this be linked to a better install overview?
  * [GPSEE](http://code.google.com/p/gpsee/wiki/Building) - General Purpose Spidermonkey Embedding Ecosystem
    * TODO: Where else can this be linked to a better install overview?
  * [RingoJS](http://ringojs.org/downloads) - JavaScript runtime based on the Mozilla Rhino (Java)

You also need the [PINF JavaScript Loader](https://github.com/pinf/loader-js). Use
any one of the following install solutions:

    npm install pinf-loader-js
    
    cd ~/
    wget -O pinf-loader-js.tar.gz https://github.com/pinf/loader-js/tarball/master
    tar -zxf pinf-loader-js.tar.gz -C pinf-loader-js
    alias commonjs='~/pinf-loader-js/pinf-loader.sh'
    
    cd ~/
    git clone git://github.com/pinf/loader-js.git pinf-loader-js
    alias commonjs='~/pinf-loader-js/pinf-loader.sh'

Finally you need this project:

    npm install pinf-test-program-js
    
    cd ~/
    wget -O pinf-test-program-js.tar.gz https://github.com/pinf/test-program-js/tarball/master
    tar -zxf pinf-test-program-js.tar.gz -C pinf-test-program-js
    
    cd ~/
    git clone git://github.com/pinf/test-program-js.git pinf-test-program-js


Test/Example Programs
=====================

    cd ~/pinf-test-program-js

Portable
--------

You can select any of the platforms listed above (`node`, `gpsee`, `ringo`) 
via `commonjs --platform <PlatformAlias> ./<ProgramName>`.

    commonjs ./HelloWorld


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
