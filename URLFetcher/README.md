
    $ commonjs https://github.com/pinf/test-programs-js/zipball/master URLFetcher
    Error: No URL specified!
    
    Usage: script [OPTIONS] URL
    Request a given URL and display result
     -v --verbose: Enable debug output and progress messages
     --show-headers: Show the response headers
     --trim-body-to TRIM-BODY-TO: Length of body to show (characters)
     -h --help: Display usage information


    $ commonjs https://github.com/pinf/test-programs-js/zipball/master URLFetcher http://www.google.com/
    Status: 302
    Body (218 characters):
    <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
    <TITLE>302 Moved</TITLE></HEAD><BODY>
    <H1>302 Moved</H1>
    The document has moved
    <A HREF="http://www.google.ca/">here</A>.
    </BODY></HTML>
    
    
    DONE


    $ commonjs -v https://github.com/pinf/test-programs-js/zipball/master URLFetcher -v http://www.google.com/
    ----------------------------------------------------------------------------
    |  PINF Loader v0.2.5  ~  https://github.com/pinf/loader-js/
    ----------------------------------------------------------------------------
    Loaded adapter: node
    Boot cache directory: /pinf/pinf_packages
    Using source overlay files:
      /pinf/etc/pinf/sources.json
    Provision program package:
      URL: https://github.com/pinf/test-programs-js/zipball/master
      Path: /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg
    Loading program descriptor from: /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/program.json
    Using program cache directory: /pinf/pinf_packages
    Using source overlay files:
      /pinf/etc/pinf/sources.json
    Assembling program:
      Program URI: /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/program.json
      Boot packages:
        ID: github.com/pinf/test-programs-js/
          ID: github.com/pinf/test-programs-js/
          Path: /pinf/workspaces/github.com/pinf/test-programs-js/
          Mappings:
            pinf <- {"id":"pinf.org/loader"}
              ID: pinf.org/loader
              Path: pinf.org/loader
              ... skip second pass ...
            modules <- {"id":"github.com/pinf/modules-js/"}
              ID: github.com/pinf/modules-js/
              Path: /pinf/workspaces/github.com/pinf/modules-js/
              HashID: 52402775D376B5C5239F9D5D9C5D4E0A
              Mappings:
                pinf <- {"id":"pinf.org/loader","available":true}
                  ID: pinf.org/loader
                  Path: pinf.org/loader
                  ... skip second pass ...
                q <- {"id":"github.com/kriskowal/q/"}
                  ID: github.com/kriskowal/q/
                  Path: /pinf/pinf_packages/downloads/packages/github.com/kriskowal/q/zipball/v0.3.0~pkg/
                  HashID: D6C8365630D42325D4197919BAAA7416
                  Mappings: None
                  Dependencies:
                    [0] <- {"id":"github.com/pinf/modules-js/"}
                      ID: github.com/pinf/modules-js/
                      Path: /pinf/workspaces/github.com/pinf/modules-js/
                      ... skip second pass ...
                nodejs <- {"id":"nodejs.org"}
                  ID: nodejs.org
                  Path: nodejs.org
                  ... skip second pass ...
              Dependencies: None
          Dependencies: None
    Loading program's main packages:
      /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/
    Booting program. Output for boot package follows in green between ==> ... <==
    ----- /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg -> [package.json].main -> main() -----
    =====><=====
    Load additional package into program:
      Locator(original): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/./URLFetcher"}
      Locator(resolved): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/URLFetcher/"}
      Mappings:
        modules <- {"id":"github.com/pinf/modules-js/"}
          ID: github.com/pinf/modules-js/
          Path: /pinf/workspaces/github.com/pinf/modules-js/
          HashID: 52402775D376B5C5239F9D5D9C5D4E0A
          ... skip second pass ...
      Dependencies: None
    <=====
    ----- ^ -------------------------------------------------------------------------------------------------------------------------------
    Program Booted  ~  Timing (Assembly: 0.289, Load: 0.011, Boot: 0.015, Additional Load: 0)
    ----- | Program stdout & stderr follows (if not already terminated) ====>
    URL: http://www.google.com/
    Parsed Arguments: { args: [ 'http://www.google.com/' ],
      command: 'script',
      verbose: true,
      'show-headers': false,
      'trim-body-to': 500,
      help: false }
    URL Parts: { url: 'http://www.google.com/',
      scheme: 'http',
      authorityRoot: '//',
      authority: 'www.google.com',
      userInfo: '',
      user: '',
      password: '',
      domain: 'www.google.com',
      port: '',
      path: '/',
      root: '/',
      directory: '',
      file: '',
      query: '',
      anchor: '',
      directories: [],
      domains: [ 'www', 'google', 'com' ] }
    Sending request ... got response!
    Status: 302
    Headers: { location: 'http://www.google.ca/',
      'cache-control': 'private',
      'content-type': 'text/html; charset=UTF-8',
      'set-cookie': [ 'PREF=ID=56fc2cf3f955399c:FF=0:TM=1316976257:LM=1316976257:S=dRVrwygIQwZwVHiY; expires=Tue, 24-Sep-2013 18:44:17 GMT; path=/; domain=.google.com' ],
      date: 'Sun, 25 Sep 2011 18:44:17 GMT',
      server: 'gws',
      'content-length': '218',
      'x-xss-protection': '1; mode=block',
      connection: 'close' }
    Body (218 characters):
    <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
    <TITLE>302 Moved</TITLE></HEAD><BODY>
    <H1>302 Moved</H1>
    The document has moved
    <A HREF="http://www.google.ca/">here</A>.
    </BODY></HTML>
    
    
    DONE
