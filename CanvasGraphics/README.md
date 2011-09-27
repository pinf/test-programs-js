Canvas Graphics Demo
====================

This demo show how to run a back-end program and serve a front-end program usable in a browser.


Usage
=====

Run in development mode
-----------------------

Code changes are reflected with every browser reload.

    commonjs --script serve https://github.com/pinf/test-programs-js/zipball/master --reloading --port 8081 CanvasGraphics
    open http://localhost:8081/


Run in production mode
----------------------

All code is cached.

    commonjs --script serve https://github.com/pinf/test-programs-js/zipball/master --port 8081 CanvasGraphics
    open http://localhost:8081/
    
The front-end program is loaded from URLs matching `http://localhost:8081/programs/ui.*` which contain static
content (as long as the program does not change) and may be cached using a proxy.


Run in exported form
--------------------

The front-end program may be exported to static files instead of loading it via the *PINF Program Server*.

    commonjs --script export https://github.com/pinf/test-programs-js/zipball/master CanvasGraphics/programs/BrowserFrontend CanvasGraphics/programs/BrowserFrontend/exported

The back-end program is setup to also serve this exported program (thanks to a symlink in `./www`).

    commonjs --script serve https://github.com/pinf/test-programs-js/zipball/master --port 8081 CanvasGraphics
    open http://localhost:8081/exported/

When using this in production, `http://localhost:8081/` should be run through a proxy setup to serve the
`http://localhost:8081/exported/main.*` URIs from `./programs/BrowserFrontend/exported`.
