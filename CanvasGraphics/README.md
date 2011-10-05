Canvas Graphics Demo
====================

This demo shows how to run a back-end program and serve a front-end program usable in a browser.

Plain JavaScript library and NPM dependencies are used.


Usage
=====

Run in development mode
-----------------------

Code changes are reflected with every browser reload.

    commonjs --platform node --script serve https://github.com/pinf/test-programs-js/zipball/master --reloading --port 8081 CanvasGraphics
    open http://localhost:8081/


Run in production mode
----------------------

All code is cached.

    commonjs --platform node --script serve https://github.com/pinf/test-programs-js/zipball/master --port 8081 CanvasGraphics
    open http://localhost:8081/
    
The front-end program is loaded from URLs matching `http://localhost:8081/programs/ui.*` which contain static
content (as long as the program does not change) and may be cached using a proxy.


Run in exported form
--------------------

The front-end program may be exported to static files instead of loading it via the *PINF Program Server*.

    commonjs --platform node --script export https://github.com/pinf/test-programs-js/zipball/master CanvasGraphics/programs/BrowserFrontend CanvasGraphics/programs/BrowserFrontend/exported

The back-end program is setup to also serve this exported program.

    commonjs --platform node --script serve https://github.com/pinf/test-programs-js/zipball/master --port 8081 CanvasGraphics
    open http://localhost:8081/exported/

When using this in production, `http://localhost:8081/` should be run through a proxy setup to serve the
`http://localhost:8081/exported/main.*` URIs from `./programs/BrowserFrontend/exported`.


Logs
====

First run
---------

    $ commonjs --platform node -v --script serve https://github.com/pinf/test-programs-js/zipball/master --reloading --port 8081 CanvasGraphics
    ----------------------------------------------------------------------------
    |  PINF Loader v0.2.6  ~  https://github.com/pinf/loader-js/
    ----------------------------------------------------------------------------
    Ignore global PINF: YES
    Loaded adapter: node
    Boot cache directory: /pinf/tmp/pinf-loader-js/.pinf_packages
    Not using any source overlay files.
    Provision program package:
      URL: https://github.com/pinf/test-programs-js/zipball/master
      Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg
    Loading program descriptor from: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/program.json
    Using program cache directory: /pinf/tmp/pinf-loader-js/.pinf_packages
    Not using any source overlay files.
    Assembling program:
      Program URI: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/program.json
      Boot packages:
        ID: github.com/pinf/test-programs-js/
          ID: github.com/pinf/test-programs-js/
          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg
          Mappings:
            pinf <- {"id":"pinf.org/loader"}
              ID: pinf.org/loader
              Path: pinf.org/loader
              ... skip second pass ...
            modules <- {"id":"github.com/pinf/modules-js/"}
              ID: github.com/pinf/modules-js/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
              HashID: 52402775D376B5C5239F9D5D9C5D4E0A
              Mappings:
                pinf <- {"id":"pinf.org/loader","available":true}
                  ID: pinf.org/loader
                  Path: pinf.org/loader
                  ... skip second pass ...
                q <- {"id":"github.com/kriskowal/q/"}
                  ID: github.com/kriskowal/q/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/kriskowal/q/zipball/v0.3.0~pkg/
                  HashID: D6C8365630D42325D4197919BAAA7416
                  Mappings: None
                  Dependencies:
                    [0] <- {"id":"github.com/pinf/modules-js/"}
                      ID: github.com/pinf/modules-js/
                      Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                      ... skip second pass ...
                nodejs <- {"id":"nodejs.org"}
                  ID: nodejs.org
                  Path: nodejs.org
                  ... skip second pass ...
              Dependencies: None
          Dependencies: None
    Loading program's main packages:
      /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/
    Not using any source overlay files.
    Load additional package into program:
      Locator(original): {"id":"github.com/pinf/server-js/"}
      Downloading: https://github.com/pinf/server-js/zipball/v0.1.15
      Program Booted  ~  Timing (Assembly: 0.437, Load: 0.016, Boot: 0.1, Additional Load: 0)
      ----- | Program stdout & stderr follows (if not already terminated) ====>
      Locator(resolved): {"id":"github.com/pinf/server-js/","archive":"https://github.com/pinf/server-js/zipball/v0.1.15","location":"/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/server-js/zipball/v0.1.15~pkg/"}
      Mappings:
        nodejs <- {"id":"nodejs.org"}
          ID: nodejs.org
          Path: nodejs.org
          ... skip second pass ...
        pinf <- {"id":"pinf.org/loader"}
          ID: pinf.org/loader
          Path: pinf.org/loader
          ... skip second pass ...
        connect <- {"id":"github.com/senchalabs/connect/"}
          Installing package via NPM [cd /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg ; npm --verbose install -f connect@1.6.2]:
        console <- {"id":"github.com/pinf/console-js/"}
          Downloading: https://github.com/pinf/console-js/zipball/v0.1.0
        modules <- {"id":"github.com/pinf/modules-js/"}
          ID: github.com/pinf/modules-js/
          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
          HashID: 52402775D376B5C5239F9D5D9C5D4E0A
          ... skip second pass ...
        formidable <- {"id":"github.com/felixge/node-formidable/"}
          Installing package via NPM [cd /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg ; npm --verbose install -f formidable@1.0.2]:
      Dependencies: None
          ID: github.com/pinf/console-js/
          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/console-js/zipball/v0.1.0~pkg/
          HashID: D09CB0292B137E36456A5CDA62B9F0C1
          Mappings:
            pinf <- {"id":"pinf.org/loader"}
              ID: pinf.org/loader
              Path: pinf.org/loader
              ... skip second pass ...
            nodejs <- {"id":"nodejs.org"}
              ID: nodejs.org
              Path: nodejs.org
              ... skip second pass ...
            insight <- {"id":"github.com/pinf/insight-js/"}
              Downloading: https://github.com/pinf/insight-js/zipball/v0.1.0
            wildfire <- {"id":"github.com/pinf/wildfire-js/"}
              Downloading: https://github.com/pinf/wildfire-js/zipball/v0.1.0
            modules <- {"id":"github.com/pinf/modules-js/"}
              ID: github.com/pinf/modules-js/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
              HashID: 52402775D376B5C5239F9D5D9C5D4E0A
              ... skip second pass ...
          Dependencies: None
              ID: github.com/pinf/wildfire-js/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/wildfire-js/zipball/v0.1.0~pkg/
              HashID: 3FAB0FF862FC3B180E59DE090C1A7CA6
              Mappings:
                modules <- {"id":"github.com/pinf/modules-js/"}
                  ID: github.com/pinf/modules-js/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                  HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                  ... skip second pass ...
              Dependencies: None
              ID: github.com/pinf/insight-js/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/insight-js/zipball/v0.1.0~pkg/
              HashID: AC98540D99D5FB39D85DCB4C4B6A3C8C
              Mappings:
                wildfire <- {"id":"github.com/pinf/wildfire-js/"}
                  ID: github.com/pinf/wildfire-js/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/wildfire-js/zipball/v0.1.0~pkg/
                  HashID: 3FAB0FF862FC3B180E59DE090C1A7CA6
                  ... skip second pass ...
                modules <- {"id":"github.com/pinf/modules-js/"}
                  ID: github.com/pinf/modules-js/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                  HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                  ... skip second pass ...
              Dependencies: None
              formidable@1.0.2 ./node_modules/formidable 
    
              npm info it worked if it ends with ok
    npm verb cli [ 'node',
    npm verb cli   '/usr/local/bin/npm',
    npm verb cli   '--verbose',
    npm verb cli   'install',
    npm verb cli   '-f',
    npm verb cli   'formidable@1.0.2' ]
    npm info using npm@1.0.24
    npm info using node@v0.4.10
    npm verb /usr/local/bin/node node symlink
    npm verb config file /Users/cadorn/.npmrc
    npm verb config file /usr/local/etc/npmrc
    npm verb into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg [ 'formidable@1.0.2' ]
    npm verb cache add formidable@1.0.2
    npm verb cache add [ 'formidable@1.0.2', null ]
    npm verb parsed url { pathname: 'formidable',
    npm verb parsed url   href: 'formidable' }
    npm info addNamed [ 'formidable', '1.0.2' ]
    npm verb addNamed [ '1.0.2', '1.0.2' ]
    npm verb GET formidable/1.0.2
    npm verb raw, before any munging formidable/1.0.2
    npm verb url resolving [ 'https://registry.npmjs.org/',
    npm verb url resolving   './formidable/1.0.2' ]
    npm verb url resolved https://registry.npmjs.org/formidable/1.0.2
    npm verb url parsed { protocol: 'https:',
    npm verb url parsed   slashes: true,
    npm verb url parsed   host: 'registry.npmjs.org',
    npm verb url parsed   hostname: 'registry.npmjs.org',
    npm verb url parsed   href: 'https://registry.npmjs.org/formidable/1.0.2',
    npm verb url parsed   pathname: '/formidable/1.0.2' }
    npm verb etag "7ZJA47UJJQQ95WEVARP1CD2Y3"
    npm verb response https://registry.npmjs.org/formidable/1.0.2
    npm verb etag formidable/1.0.2 from cache
    npm verb bin dist [ '0.4-ares1.7.4-ev4.4-openssl0.9.8r-v83.1.8.26-darwin-11.1.0',
    npm verb bin dist   { shasum: '6e7887db43be310c57970143671dfc91d46f939d',
    npm verb bin dist     tarball: 'http://registry.npmjs.org/formidable/-/formidable-1.0.2.tgz' } ]
    npm verb addRemoteTarball [ 'https://registry.npmjs.org/formidable/-/formidable-1.0.2.tgz',
    npm verb addRemoteTarball   '6e7887db43be310c57970143671dfc91d46f939d' ]
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778 755
    npm info fetch https://registry.npmjs.org/formidable/-/formidable-1.0.2.tgz
    npm verb fetch to /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/tmp.tgz
    npm info shasum 6e7887db43be310c57970143671dfc91d46f939d
    npm info shasum /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/tmp.tgz
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/___package.npm'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/package
    npm verb success gzip "--decompress" "--stdout" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/tmp.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/___package.npm"
    npm verb gunzed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/___package.npm/package
    npm verb rm'ed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/package
    npm verb renamed [ '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/___package.npm/package',
    npm verb renamed   '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/package' ]
    npm verb caching /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/package/package.json
    npm verb loadDefaults formidable@1.0.2
    npm verb tarball contents [ 'package' ]
    npm verb from cache /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/package/package.json
    npm verb pack /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480698/1317157480698-0.8190080332569778/contents/package /Users/cadorn/.npm/formidable/1.0.2/package.tgz
    npm verb mkdir'ed /Users/cadorn/.npm/formidable/1.0.2
    npm verb tar about to write tar and gzip it.
    npm verb success tar -cvf - <file list elided>
    npm verb success gzip "--stdout"
    npm verb mkdir (expected) error ENOENT, No such file or directory '/Users/cadorn/.npm/formidable/1.0.2/___package.npm'
    npm verb mkdir done: /Users/cadorn/.npm/formidable/1.0.2/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /Users/cadorn/.npm/formidable/1.0.2/package
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/formidable/1.0.2/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/Users/cadorn/.npm/formidable/1.0.2/___package.npm"
    npm verb gunzed /Users/cadorn/.npm/formidable/1.0.2/___package.npm/package
    npm verb rm'ed /Users/cadorn/.npm/formidable/1.0.2/package
    npm verb renamed [ '/Users/cadorn/.npm/formidable/1.0.2/___package.npm/package',
    npm verb renamed   '/Users/cadorn/.npm/formidable/1.0.2/package' ]
    npm verb caching /Users/cadorn/.npm/formidable/1.0.2/package/package.json
    npm verb loadDefaults formidable@1.0.2
    npm info shasum 70f6af68a0fc0607479da0182e197ad2a9af4037
    npm info shasum /Users/cadorn/.npm/formidable/1.0.2/package.tgz
    npm verb from cache /Users/cadorn/.npm/formidable/1.0.2/package/package.json
    npm verb chmod /Users/cadorn/.npm/formidable/1.0.2/package.tgz 644
    npm info into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg formidable@1.0.2
    npm info installOne formidable@1.0.2
    npm info unbuild /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
    npm verb from cache /Users/cadorn/.npm/formidable/1.0.2/package/package.json
    npm verb mkdir (expected) error ENOENT, No such file or directory '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___formidable.npm'
    npm verb mkdir done: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___formidable.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/formidable/1.0.2/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___formidable.npm"
    npm verb gunzed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___formidable.npm/package
    npm verb rm'ed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
    npm verb renamed [ '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___formidable.npm/package',
    npm verb renamed   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable' ]
    npm verb caching /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable/package.json
    npm verb loadDefaults formidable@1.0.2
    npm info preinstall formidable@1.0.2
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable/package.json
    npm verb into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable []
    npm verb about to build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
    npm info build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable/package.json
    npm verb linkStuff [ false,
    npm verb linkStuff   false,
    npm verb linkStuff   false,
    npm verb linkStuff   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules' ]
    npm info linkStuff formidable@1.0.2
    npm verb linkBins formidable@1.0.2
    npm verb linkMans formidable@1.0.2
    npm verb rebuildBundles formidable@1.0.2
    npm info install formidable@1.0.2
    npm info postinstall formidable@1.0.2
    npm verb installOne cb formidable@1.0.2
    npm verb exit [ 0, true ]
    npm info ok
    
          ID: github.com/felixge/node-formidable/
          Path: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
          HashID: 54CA0823A54CBA34007C7E1BE1038D87
          Mappings: None
          Dependencies: None
          connect@1.6.2 ./node_modules/connect 
    ├── mime@1.2.4
    └── qs@0.3.1
    
          npm info it worked if it ends with ok
    npm verb cli [ 'node',
    npm verb cli   '/usr/local/bin/npm',
    npm verb cli   '--verbose',
    npm verb cli   'install',
    npm verb cli   '-f',
    npm verb cli   'connect@1.6.2' ]
    npm info using npm@1.0.24
    npm info using node@v0.4.10
    npm verb /usr/local/bin/node node symlink
    npm verb config file /Users/cadorn/.npmrc
    npm verb config file /usr/local/etc/npmrc
    npm verb into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg [ 'connect@1.6.2' ]
    npm verb cache add connect@1.6.2
    npm verb cache add [ 'connect@1.6.2', null ]
    npm verb parsed url { pathname: 'connect',
    npm verb parsed url   href: 'connect' }
    npm info addNamed [ 'connect', '1.6.2' ]
    npm verb addNamed [ '1.6.2', '1.6.2' ]
    npm verb GET connect/1.6.2
    npm verb raw, before any munging connect/1.6.2
    npm verb url resolving [ 'https://registry.npmjs.org/',
    npm verb url resolving   './connect/1.6.2' ]
    npm verb url resolved https://registry.npmjs.org/connect/1.6.2
    npm verb url parsed { protocol: 'https:',
    npm verb url parsed   slashes: true,
    npm verb url parsed   host: 'registry.npmjs.org',
    npm verb url parsed   hostname: 'registry.npmjs.org',
    npm verb url parsed   href: 'https://registry.npmjs.org/connect/1.6.2',
    npm verb url parsed   pathname: '/connect/1.6.2' }
    npm verb etag "60VFJND39DPXROIJZBJIUZHJ"
    npm verb response https://registry.npmjs.org/connect/1.6.2
    npm verb etag connect/1.6.2 from cache
    npm verb bin dist [ '0.4-ares1.7.4-ev4.4-openssl0.9.8r-v83.1.8.26-darwin-11.1.0',
    npm verb bin dist   { shasum: 'f24bad0ee3df364fb9e462336c2d2d3d12a9b86b',
    npm verb bin dist     tarball: 'http://registry.npmjs.org/connect/-/connect-1.6.2.tgz' } ]
    npm verb addRemoteTarball [ 'https://registry.npmjs.org/connect/-/connect-1.6.2.tgz',
    npm verb addRemoteTarball   'f24bad0ee3df364fb9e462336c2d2d3d12a9b86b' ]
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897 755
    npm info fetch https://registry.npmjs.org/connect/-/connect-1.6.2.tgz
    npm verb fetch to /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/tmp.tgz
    npm info shasum f24bad0ee3df364fb9e462336c2d2d3d12a9b86b
    npm info shasum /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/tmp.tgz
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/___package.npm'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/package
    npm verb success gzip "--decompress" "--stdout" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/tmp.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/___package.npm"
    npm verb gunzed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/___package.npm/package
    npm verb rm'ed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/package
    npm verb renamed [ '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/___package.npm/package',
    npm verb renamed   '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/package' ]
    npm verb caching /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/package/package.json
    npm verb loadDefaults connect@1.6.2
    npm verb tarball contents [ 'package' ]
    npm verb from cache /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/package/package.json
    npm verb pack /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157480629-0.6317854684311897/contents/package /Users/cadorn/.npm/connect/1.6.2/package.tgz
    npm verb mkdir'ed /Users/cadorn/.npm/connect/1.6.2
    npm verb tar about to write tar and gzip it.
    npm verb success tar -cvf - <file list elided>
    npm verb success gzip "--stdout"
    npm verb mkdir (expected) error ENOENT, No such file or directory '/Users/cadorn/.npm/connect/1.6.2/___package.npm'
    npm verb mkdir done: /Users/cadorn/.npm/connect/1.6.2/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /Users/cadorn/.npm/connect/1.6.2/package
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/connect/1.6.2/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/Users/cadorn/.npm/connect/1.6.2/___package.npm"
    npm verb gunzed /Users/cadorn/.npm/connect/1.6.2/___package.npm/package
    npm verb rm'ed /Users/cadorn/.npm/connect/1.6.2/package
    npm verb renamed [ '/Users/cadorn/.npm/connect/1.6.2/___package.npm/package',
    npm verb renamed   '/Users/cadorn/.npm/connect/1.6.2/package' ]
    npm verb caching /Users/cadorn/.npm/connect/1.6.2/package/package.json
    npm verb loadDefaults connect@1.6.2
    npm info shasum a5ee048fccda46d366c5e6bb43600d595dbba47e
    npm info shasum /Users/cadorn/.npm/connect/1.6.2/package.tgz
    npm verb from cache /Users/cadorn/.npm/connect/1.6.2/package/package.json
    npm verb chmod /Users/cadorn/.npm/connect/1.6.2/package.tgz 644
    npm info into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg connect@1.6.2
    npm info installOne connect@1.6.2
    npm info unbuild /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
    npm verb from cache /Users/cadorn/.npm/connect/1.6.2/package/package.json
    npm verb mkdir (expected) error ENOENT, No such file or directory '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___connect.npm'
    npm verb mkdir done: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___connect.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/connect/1.6.2/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___connect.npm"
    npm verb gunzed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___connect.npm/package
    npm verb rm'ed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
    npm verb renamed [ '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/___connect.npm/package',
    npm verb renamed   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect' ]
    npm verb caching /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/package.json
    npm verb loadDefaults connect@1.6.2
    npm info preinstall connect@1.6.2
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/package.json
    npm verb into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect [ 'qs@>= 0.3.0', 'mime@>= 0.0.1' ]
    npm verb cache add qs@>= 0.3.0
    npm verb cache add [ 'qs@>= 0.3.0', null ]
    npm verb parsed url { pathname: 'qs', href: 'qs' }
    npm info addNamed [ 'qs', '>= 0.3.0' ]
    npm verb addNamed [ null, '>=0.3.0' ]
    npm verb cache add mime@>= 0.0.1
    npm verb cache add [ 'mime@>= 0.0.1', null ]
    npm verb parsed url { pathname: 'mime', href: 'mime' }
    npm info addNamed [ 'mime', '>= 0.0.1' ]
    npm verb addNamed [ null, '>=0.0.1' ]
    npm verb GET mime
    npm verb raw, before any munging mime
    npm verb url resolving [ 'https://registry.npmjs.org/',
    npm verb url resolving   './mime' ]
    npm verb url resolved https://registry.npmjs.org/mime
    npm verb url parsed { protocol: 'https:',
    npm verb url parsed   slashes: true,
    npm verb url parsed   host: 'registry.npmjs.org',
    npm verb url parsed   hostname: 'registry.npmjs.org',
    npm verb url parsed   href: 'https://registry.npmjs.org/mime',
    npm verb url parsed   pathname: '/mime' }
    npm verb etag "4WPR270JVVWZ2VX4X8B4I904M"
    npm verb GET qs
    npm verb raw, before any munging qs
    npm verb url resolving [ 'https://registry.npmjs.org/',
    npm verb url resolving   './qs' ]
    npm verb url resolved https://registry.npmjs.org/qs
    npm verb url parsed { protocol: 'https:',
    npm verb url parsed   slashes: true,
    npm verb url parsed   host: 'registry.npmjs.org',
    npm verb url parsed   hostname: 'registry.npmjs.org',
    npm verb url parsed   href: 'https://registry.npmjs.org/qs',
    npm verb url parsed   pathname: '/qs' }
    npm verb etag "EJNADWZQJN5759F2WIHGDMFIL"
    npm verb response https://registry.npmjs.org/mime
    npm verb etag mime from cache
    npm verb response https://registry.npmjs.org/qs
    npm verb etag qs from cache
    npm verb GET mime/1.2.4
    npm verb raw, before any munging mime/1.2.4
    npm verb url resolving [ 'https://registry.npmjs.org/',
    npm verb url resolving   './mime/1.2.4' ]
    npm verb url resolved https://registry.npmjs.org/mime/1.2.4
    npm verb url parsed { protocol: 'https:',
    npm verb url parsed   slashes: true,
    npm verb url parsed   host: 'registry.npmjs.org',
    npm verb url parsed   hostname: 'registry.npmjs.org',
    npm verb url parsed   href: 'https://registry.npmjs.org/mime/1.2.4',
    npm verb url parsed   pathname: '/mime/1.2.4' }
    npm verb etag "4WPR270JVVWZ2VX4X8B4I904M"
    npm verb GET qs/0.3.1
    npm verb raw, before any munging qs/0.3.1
    npm verb url resolving [ 'https://registry.npmjs.org/',
    npm verb url resolving   './qs/0.3.1' ]
    npm verb url resolved https://registry.npmjs.org/qs/0.3.1
    npm verb url parsed { protocol: 'https:',
    npm verb url parsed   slashes: true,
    npm verb url parsed   host: 'registry.npmjs.org',
    npm verb url parsed   hostname: 'registry.npmjs.org',
    npm verb url parsed   href: 'https://registry.npmjs.org/qs/0.3.1',
    npm verb url parsed   pathname: '/qs/0.3.1' }
    npm verb etag "EJNADWZQJN5759F2WIHGDMFIL"
    npm verb response https://registry.npmjs.org/mime/1.2.4
    npm verb etag mime/1.2.4 from cache
    npm verb bin dist [ '0.4-ares1.7.4-ev4.4-openssl0.9.8r-v83.1.8.26-darwin-11.1.0',
    npm verb bin dist   { shasum: '05e5a583136de461e92d4d649b61c1ae5b3870a5',
    npm verb bin dist     tarball: 'http://registry.npmjs.org/mime/-/mime-1.2.4.tgz' } ]
    npm verb addRemoteTarball [ 'https://registry.npmjs.org/mime/-/mime-1.2.4.tgz',
    npm verb addRemoteTarball   '05e5a583136de461e92d4d649b61c1ae5b3870a5' ]
    npm verb response https://registry.npmjs.org/qs/0.3.1
    npm verb etag qs/0.3.1 from cache
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002 755
    npm info fetch https://registry.npmjs.org/mime/-/mime-1.2.4.tgz
    npm verb fetch to /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/tmp.tgz
    npm verb bin dist [ '0.4-ares1.7.4-ev4.4-openssl0.9.8r-v83.1.8.26-darwin-11.1.0',
    npm verb bin dist   { shasum: 'f40308e1b42669fb61b588aa6f88b5612cc86097',
    npm verb bin dist     tarball: 'http://registry.npmjs.org/qs/-/qs-0.3.1.tgz' } ]
    npm verb addRemoteTarball [ 'https://registry.npmjs.org/qs/-/qs-0.3.1.tgz',
    npm verb addRemoteTarball   'f40308e1b42669fb61b588aa6f88b5612cc86097' ]
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539 755
    npm info fetch https://registry.npmjs.org/qs/-/qs-0.3.1.tgz
    npm verb fetch to /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/tmp.tgz
    npm info shasum 05e5a583136de461e92d4d649b61c1ae5b3870a5
    npm info shasum /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/tmp.tgz
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/___package.npm'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/package
    npm verb success gzip "--decompress" "--stdout" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/tmp.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/___package.npm"
    npm verb gunzed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/___package.npm/package
    npm verb rm'ed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/package
    npm verb renamed [ '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/___package.npm/package',
    npm verb renamed   '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/package' ]
    npm verb caching /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/package/package.json
    npm verb loadDefaults mime@1.2.4
    npm verb tarball contents [ 'package' ]
    npm verb from cache /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/package/package.json
    npm verb pack /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487114-0.8039119488094002/contents/package /Users/cadorn/.npm/mime/1.2.4/package.tgz
    npm verb mkdir'ed /Users/cadorn/.npm/mime/1.2.4
    npm verb tar about to write tar and gzip it.
    npm verb success tar -cvf - <file list elided>
    npm info shasum f40308e1b42669fb61b588aa6f88b5612cc86097
    npm info shasum /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/tmp.tgz
    npm verb success gzip "--stdout"
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/___package.npm'
    npm verb mkdir done: /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package
    npm verb mkdir (expected) error ENOENT, No such file or directory '/Users/cadorn/.npm/mime/1.2.4/___package.npm'
    npm verb mkdir done: /Users/cadorn/.npm/mime/1.2.4/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /Users/cadorn/.npm/mime/1.2.4/package
    npm verb success gzip "--decompress" "--stdout" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/tmp.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/___package.npm"
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/mime/1.2.4/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/Users/cadorn/.npm/mime/1.2.4/___package.npm"
    npm verb gunzed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/___package.npm/package
    npm verb rm'ed /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package
    npm verb renamed [ '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/___package.npm/package',
    npm verb renamed   '/var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package' ]
    npm verb gunzed /Users/cadorn/.npm/mime/1.2.4/___package.npm/package
    npm verb caching /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package/package.json
    npm verb loadDefaults qs@0.3.1
    npm verb rm'ed /Users/cadorn/.npm/mime/1.2.4/package
    npm verb renamed [ '/Users/cadorn/.npm/mime/1.2.4/___package.npm/package',
    npm verb renamed   '/Users/cadorn/.npm/mime/1.2.4/package' ]
    npm verb tarball contents [ 'package' ]
    npm verb from cache /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package/package.json
    npm verb pack /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package /Users/cadorn/.npm/qs/0.3.1/package.tgz
    npm verb caching /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package/support/should/package.json
    npm verb loadDefaults should@0.0.4
    npm verb caching /var/folders/s8/cpzclj0d2d12qn4llpkq8kv00000gn/T/npm-1317157480629/1317157487131-0.03126620757393539/contents/package/support/expresso/package.json
    npm verb loadDefaults expresso@0.7.2
    npm verb caching /Users/cadorn/.npm/mime/1.2.4/package/package.json
    npm verb loadDefaults mime@1.2.4
    npm info shasum 660d3ebe44ab95716853496095c0bce835fe1d82
    npm info shasum /Users/cadorn/.npm/mime/1.2.4/package.tgz
    npm verb from cache /Users/cadorn/.npm/mime/1.2.4/package/package.json
    npm verb chmod /Users/cadorn/.npm/mime/1.2.4/package.tgz 644
    npm verb mkdir'ed /Users/cadorn/.npm/qs/0.3.1
    npm verb tar about to write tar and gzip it.
    npm verb success tar -cvf - <file list elided>
    npm verb success gzip "--stdout"
    npm verb mkdir (expected) error ENOENT, No such file or directory '/Users/cadorn/.npm/qs/0.3.1/___package.npm'
    npm verb mkdir done: /Users/cadorn/.npm/qs/0.3.1/___package.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /Users/cadorn/.npm/qs/0.3.1/package
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/qs/0.3.1/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/Users/cadorn/.npm/qs/0.3.1/___package.npm"
    npm verb gunzed /Users/cadorn/.npm/qs/0.3.1/___package.npm/package
    npm verb rm'ed /Users/cadorn/.npm/qs/0.3.1/package
    npm verb renamed [ '/Users/cadorn/.npm/qs/0.3.1/___package.npm/package',
    npm verb renamed   '/Users/cadorn/.npm/qs/0.3.1/package' ]
    npm verb caching /Users/cadorn/.npm/qs/0.3.1/package/package.json
    npm verb loadDefaults qs@0.3.1
    npm info shasum 920449d984a5d415c5df2b1dc6b1f6a3191c696d
    npm info shasum /Users/cadorn/.npm/qs/0.3.1/package.tgz
    npm verb from cache /Users/cadorn/.npm/qs/0.3.1/package/package.json
    npm verb chmod /Users/cadorn/.npm/qs/0.3.1/package.tgz 644
    npm info into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect mime@1.2.4
    npm info into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect qs@0.3.1
    npm info installOne mime@1.2.4
    npm info installOne qs@0.3.1
    npm info unbuild /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime
    npm info unbuild /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs
    npm verb from cache /Users/cadorn/.npm/mime/1.2.4/package/package.json
    npm verb from cache /Users/cadorn/.npm/qs/0.3.1/package/package.json
    npm verb mkdir (expected) error ENOENT, No such file or directory '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules'
    npm verb mkdir (expected) error ENOENT, No such file or directory '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___qs.npm'
    npm verb mkdir done: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___qs.npm 755
    npm verb mkdir (expected) error ENOENT, No such file or directory '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___mime.npm'
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs
    npm verb mkdir done: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___mime.npm 755
    npm verb unpack_ uid, gid [ undefined, undefined ]
    npm verb unpackTarget /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/mime/1.2.4/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___mime.npm"
    npm verb success gzip "--decompress" "--stdout" "/Users/cadorn/.npm/qs/0.3.1/package.tgz"
    npm verb success tar "-mvxpf" "-" "-o" "-C" "/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___qs.npm"
    npm verb gunzed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___mime.npm/package
    npm verb rm'ed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime
    npm verb renamed [ '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___mime.npm/package',
    npm verb renamed   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime' ]
    npm verb caching /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime/package.json
    npm verb loadDefaults mime@1.2.4
    npm verb gunzed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___qs.npm/package
    npm verb rm'ed /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs
    npm info preinstall mime@1.2.4
    npm verb renamed [ '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/___qs.npm/package',
    npm verb renamed   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs' ]
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime/package.json
    npm verb into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime []
    npm verb about to build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime
    npm info build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/mime/package.json
    npm verb linkStuff [ false,
    npm verb linkStuff   false,
    npm verb linkStuff   false,
    npm verb linkStuff   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules' ]
    npm info linkStuff mime@1.2.4
    npm verb linkBins mime@1.2.4
    npm verb linkMans mime@1.2.4
    npm verb rebuildBundles mime@1.2.4
    npm info install mime@1.2.4
    npm info postinstall mime@1.2.4
    npm verb caching /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs/package.json
    npm verb loadDefaults qs@0.3.1
    npm verb installOne cb mime@1.2.4
    npm info preinstall qs@0.3.1
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs/package.json
    npm verb into /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs []
    npm verb about to build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs
    npm info build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules/qs/package.json
    npm verb linkStuff [ false,
    npm verb linkStuff   false,
    npm verb linkStuff   false,
    npm verb linkStuff   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/node_modules' ]
    npm info linkStuff qs@0.3.1
    npm verb linkBins qs@0.3.1
    npm verb linkMans qs@0.3.1
    npm verb rebuildBundles qs@0.3.1
    npm info install qs@0.3.1
    npm info postinstall qs@0.3.1
    npm verb installOne cb qs@0.3.1
    npm verb about to build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
    npm info build /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
    npm verb from cache /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect/package.json
    npm verb linkStuff [ false,
    npm verb linkStuff   false,
    npm verb linkStuff   false,
    npm verb linkStuff   '/pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules' ]
    npm info linkStuff connect@1.6.2
    npm verb linkBins connect@1.6.2
    npm verb linkMans connect@1.6.2
    npm verb rebuildBundles connect@1.6.2
    npm verb rebuildBundles [ 'mime', 'qs' ]
    npm info install connect@1.6.2
    npm info postinstall connect@1.6.2
    npm verb installOne cb connect@1.6.2
    npm verb exit [ 0, true ]
    npm info ok
    
          ID: github.com/senchalabs/connect/
          Path: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
          HashID: 86BBA75D329B298EDCC97A4C76676722
          Mappings: None
          Dependencies: None
    ----- | Program script stdout & stderr follows ====>
    
    Load additional package into program:
      Locator(original): {"location":"/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/server-js/zipball/v0.1.15~pkg"}
      Locator(resolved): {"location":"/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/server-js/zipball/v0.1.15~pkg/"}
      ... skip second pass ...
    Not using any source overlay files.
    Assembling program:
      Program URI: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics/program.json
      Boot packages:
        ID: github.com/pinf/test-programs-js/CanvasGraphics/
          ID: github.com/pinf/test-programs-js/CanvasGraphics/
          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics
          Mappings:
            pinf <- {"id":"pinf.org/loader"}
              ID: pinf.org/loader
              Path: pinf.org/loader
              ... skip second pass ...
            modules <- {"id":"github.com/pinf/modules-js/"}
              ID: github.com/pinf/modules-js/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
              HashID: 52402775D376B5C5239F9D5D9C5D4E0A
              Mappings:
                pinf <- {"id":"pinf.org/loader","available":true}
                  ID: pinf.org/loader
                  Path: pinf.org/loader
                  ... skip second pass ...
                q <- {"id":"github.com/kriskowal/q/"}
                  ID: github.com/kriskowal/q/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/kriskowal/q/zipball/v0.3.0~pkg/
                  HashID: D6C8365630D42325D4197919BAAA7416
                  Mappings: None
                  Dependencies:
                    [0] <- {"id":"github.com/pinf/modules-js/"}
                      ID: github.com/pinf/modules-js/
                      Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                      ... skip second pass ...
                nodejs <- {"id":"nodejs.org"}
                  ID: nodejs.org
                  Path: nodejs.org
                  ... skip second pass ...
              Dependencies: None
            server <- {"id":"github.com/pinf/server-js/"}
              ID: github.com/pinf/server-js/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/server-js/zipball/v0.1.15~pkg/
              HashID: C814A4692523C1CCF1C0527E59787265
              Mappings:
                nodejs <- {"id":"nodejs.org"}
                  ID: nodejs.org
                  Path: nodejs.org
                  ... skip second pass ...
                pinf <- {"id":"pinf.org/loader"}
                  ID: pinf.org/loader
                  Path: pinf.org/loader
                  ... skip second pass ...
                connect <- {"id":"github.com/senchalabs/connect/"}
                  ID: github.com/senchalabs/connect/
                  Path: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/connect
                  HashID: 86BBA75D329B298EDCC97A4C76676722
                  Mappings: None
                  Dependencies: None
                console <- {"id":"github.com/pinf/console-js/"}
                  ID: github.com/pinf/console-js/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/console-js/zipball/v0.1.0~pkg/
                  HashID: D09CB0292B137E36456A5CDA62B9F0C1
                  Mappings:
                    pinf <- {"id":"pinf.org/loader"}
                      ID: pinf.org/loader
                      Path: pinf.org/loader
                      ... skip second pass ...
                    nodejs <- {"id":"nodejs.org"}
                      ID: nodejs.org
                      Path: nodejs.org
                      ... skip second pass ...
                    insight <- {"id":"github.com/pinf/insight-js/"}
                      ID: github.com/pinf/insight-js/
                      Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/insight-js/zipball/v0.1.0~pkg/
                      HashID: AC98540D99D5FB39D85DCB4C4B6A3C8C
                      Mappings:
                        wildfire <- {"id":"github.com/pinf/wildfire-js/"}
                          ID: github.com/pinf/wildfire-js/
                          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/wildfire-js/zipball/v0.1.0~pkg/
                          HashID: 3FAB0FF862FC3B180E59DE090C1A7CA6
                          Mappings:
                            modules <- {"id":"github.com/pinf/modules-js/"}
                              ID: github.com/pinf/modules-js/
                              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                              HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                              ... skip second pass ...
                          Dependencies: None
                        modules <- {"id":"github.com/pinf/modules-js/"}
                          ID: github.com/pinf/modules-js/
                          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                          HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                          ... skip second pass ...
                      Dependencies: None
                    wildfire <- {"id":"github.com/pinf/wildfire-js/"}
                      ID: github.com/pinf/wildfire-js/
                      Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/wildfire-js/zipball/v0.1.0~pkg/
                      HashID: 3FAB0FF862FC3B180E59DE090C1A7CA6
                      ... skip second pass ...
                    modules <- {"id":"github.com/pinf/modules-js/"}
                      ID: github.com/pinf/modules-js/
                      Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                      HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                      ... skip second pass ...
                  Dependencies: None
                modules <- {"id":"github.com/pinf/modules-js/"}
                  ID: github.com/pinf/modules-js/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                  HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                  ... skip second pass ...
                formidable <- {"id":"github.com/felixge/node-formidable/"}
                  ID: github.com/felixge/node-formidable/
                  Path: /pinf/cache/github.com/pinf/loader-js/-npm-sandboxes/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/node_modules/formidable
                  HashID: 54CA0823A54CBA34007C7E1BE1038D87
                  Mappings: None
                  Dependencies: None
              Dependencies: None
            connect-dispatch <- {"id":"github.com/caolan/dispatch/"}
              Downloading: https://github.com/caolan/dispatch/zipball/master
            backend <- {"id":"github.com/pinf/test-programs-js/CanvasGraphics/packages/Backend/"}
              ID: github.com/pinf/test-programs-js/CanvasGraphics/packages/Backend/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics/packages/Backend
              HashID: C85DB548822A27BD70AF075A43215B1A
              Mappings:
                modules <- {"id":"github.com/pinf/modules-js/"}
                  ID: github.com/pinf/modules-js/
                  Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/modules-js/zipball/v0.1.10~pkg/
                  HashID: 52402775D376B5C5239F9D5D9C5D4E0A
                  ... skip second pass ...
              Dependencies: None
          Dependencies: None
              ID: github.com/caolan/dispatch/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/caolan/dispatch/zipball/master~pkg/
              HashID: B5152D5A0BD5C44533DEFF999BD78363
              Mappings: None
              Dependencies: None
    [program-server] Responding to: /programs/ui.js
    Not using any source overlay files.
    Assembling program:
      Program URI: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics/programs/BrowserFrontend/program.json
      Boot packages:
        ID: github.com/pinf/test-programs-js/CanvasGraphics/packages/Frontend/
          ID: github.com/pinf/test-programs-js/CanvasGraphics/packages/Frontend/
          Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics/packages/Frontend
          Mappings:
            jquery <- {"id":"code.jquery.com/"}
              Downloading: http://code.jquery.com/jquery-1.6.4.min.js
            raphaeljs <- {"id":"raphaeljs.com/"}
              Downloading: https://github.com/DmitryBaranovskiy/raphael/zipball/dbe241f4c5310dd9bf3b451c538d78c6c4a0e288
          Dependencies: None
              ID: code.jquery.com/
              Path: http://code.jquery.com/jquery-1.6.4.min.js
              HashID: B24655E49F7CEE619F5E3191A6D34374
              Mappings: None
              Dependencies: None
              ID: raphaeljs.com/
              Path: /pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/DmitryBaranovskiy/raphael/zipball/dbe241f4c5310dd9bf3b451c538d78c6c4a0e288~pkg/
              HashID: 381C2708D605C5139C83E51055AFDB51
              Mappings: None
              Dependencies: None
    [program-server] Sent: /programs/ui.js
    Not using any source overlay files.
    Load additional package into program:
      Locator(original): {"location":"/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics/packages/Backend","module":"lib/app"}
      Locator(resolved): {"location":"/pinf/tmp/pinf-loader-js/.pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/CanvasGraphics/packages/Backend/","module":"lib/app"}
      ... skip second pass ...
