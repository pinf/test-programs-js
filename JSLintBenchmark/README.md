
    $ commonjs https://github.com/pinf/test-programs-js/zipball/master JSLintBenchmark
    Running JSLint Benchmark by running JSLint against itself ...
    ... took: 1.692 seconds

    $ commonjs -v https://github.com/pinf/test-programs-js/zipball/master JSLintBenchmark
    ----------------------------------------------------------------------------
    |  PINF Loader v0.2.9  ~  https://github.com/pinf/loader-js/
    ----------------------------------------------------------------------------
    Loaded adapter: node
    No descriptor URI argument. Assuming: '[./]program.json'
    Loading program descriptor from: /pinf/workspaces/github.com/pinf/test-programs-js/program.json
    Using program cache directory: /pinf/pinf_packages
    Using source overlay files:
      /pinf/etc/pinf/sources.json
      /pinf/workspaces/**
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
              Path: /pinf/workspaces/github.com/pinf/modules-js
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
                      Path: /pinf/workspaces/github.com/pinf/modules-js
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
      Locator(original): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/./JSLintBenchmark"}
      Locator(resolved): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/JSLintBenchmark/"}
      Mappings:
        jslint <- {"id":"github.com/cadorn/JSLint/"}
          ID: github.com/cadorn/JSLint/
          Path: /pinf/workspaces/github.com/cadorn/JSLint
          HashID: 3A028CD0C5137FCCEC43D052C2635D16
          Mappings: None
          Dependencies: None
      Dependencies: None
    <=====
    ----- ^ --------------------------------------------------------------------------------------
    Program Booted  ~  Timing (Assembly: 0.158, Load: 0.004, Boot: 0.005, Additional Load: 0)
    ----- | Program stdout & stderr follows (if not already terminated) ====>
    Running JSLint Benchmark by running JSLint against itself ...
    ... took: 1.702 seconds
