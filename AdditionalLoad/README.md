
    $ commonjs https://github.com/pinf/test-programs-js/zipball/master ./AdditionalLoad
    Hello World from AdditionalLoad
    Load extra module from our package ...
    ... extra module from our package loaded!
    Greeting from extra module from our package: Hello World


    $ commonjs -v https://github.com/pinf/test-programs-js/zipball/master ./AdditionalLoad
    ----------------------------------------------------------------------------
    |  PINF Loader v0.2.5  ~  https://github.com/pinf/loader-js/
    ----------------------------------------------------------------------------
    Loaded adapter: node
    Boot cache directory: /pinf/pinf_packages
    Using source overlay files:
      /pinf/etc/pinf/sources.json
      undefined
    Provision program package:
      URL: https://github.com/pinf/test-programs-js/zipball/master <- undefined (based on source overlay: undefined)
      No descriptor URI argument. Assuming: '[./]program.json'
      Loading program descriptor from: /pinf/workspaces/github.com/pinf/test-programs-js/program.json
      Using program cache directory: /pinf/pinf_packages
      Using source overlay files:
        /pinf/etc/pinf/sources.json
        undefined
      Assembling program:
        Program URI: /pinf/workspaces/github.com/pinf/test-programs-js/program.json
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
                Path: /pinf/workspaces//github.com/pinf/modules-js
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
                        Path: /pinf/workspaces//github.com/pinf/modules-js
                        ... skip second pass ...
                  nodejs <- {"id":"nodejs.org"}
                    ID: nodejs.org
                    Path: nodejs.org
                    ... skip second pass ...
                Dependencies: None
            Dependencies: None
      Loading program's main packages:
        /pinf/workspaces/github.com/pinf/test-programs-js/
      Booting program. Output for boot package follows in green between ==> ... <==
      ----- /pinf/workspaces/github.com/pinf/test-programs-js -> [package.json].main -> main() -----
    =====><=====
      Load additional package into program:
        Locator(original): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/./AdditionalLoad"}
        Locator(resolved): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/AdditionalLoad/"}
        Mappings:
          common <- {"id":"github.com/pinf/test-packages-js/","path":"Common"}
            ID: github.com/pinf/test-packages-js/
            Path: /pinf/workspaces/github.com/pinf/test-packages-js/
            HashID: 9D7CFD608F80B8F27F4D1C00FBE87895
            Mappings: None
            Dependencies: None
        Dependencies: None
    <=====
      ----- ^ --------------------------------------------------------------------------------------
      Program Booted  ~  Timing (Assembly: 0.588, Load: 0.02, Boot: 0.122, Additional Load: 0)
      ----- | Program stdout & stderr follows (if not already terminated) ====>
    Hello World from AdditionalLoad
    Load extra module from our package ...
    ... extra module from our package loaded!
    Greeting from extra module from our package: Hello World
