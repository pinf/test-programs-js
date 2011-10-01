
    $ commonjs https://github.com/pinf/test-programs-js/zipball/master HelloWorld
    Hello World


    $ commonjs -v https://github.com/pinf/test-programs-js/zipball/master HelloWorld
    ----------------------------------------------------------------------------
    |  PINF Loader v0.0.2  ~  https://github.com/pinf/loader-js/
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
          Mappings: None
          Dependencies: None
    Loading program's main packages:
      /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg/
    Booting program. Output for boot package follows in green between ==> ... <==
    ----- /pinf/pinf_packages/downloads/packages/github.com/pinf/test-programs-js/zipball/master~pkg -> [package.json].main -> main() -----
    =====><=====
    Load additional package into program:
      Locator(original): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/./HelloWorld"}
      Locator(resolved): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/HelloWorld/"}
      Mappings:
        common <- {"id":"github.com/pinf/test-packages-js/","path":"Common"}
          ID: github.com/pinf/test-packages-js/
          Path: /pinf/workspaces/github.com/pinf/test-packages-js/
          HashID: 9D7CFD608F80B8F27F4D1C00FBE87895
          Mappings: None
          Dependencies: None
      Dependencies: None
    <=====
    ----- ^ -------------------------------------------------------------------------------------------------------------------------------
    Program Booted  ~  Timing (Assembly: 0.553, Load: 0.064, Boot: 0.116, Additional Load: 0)
    ----- | Program stdout & stderr follows (if not already terminated) ====>
    Hello World
