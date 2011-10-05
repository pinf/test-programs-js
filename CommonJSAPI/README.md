CommonJS API for Packages
=========================

This program illustrates how to use the [PINF CommonJS API](https://github.com/pinf/commonjs-apis) package
to access platform features in a consistent manner (via CommonJS API) from a CommonJS package.


Logs
====

    $ commonjs -v --platform v8cgi https://github.com/pinf/test-programs-js/zipball/master CommonJSAPI
    --- http://pinf.org/ ------------------------- http://commonjs.org/ ---
    |   PINF JavaScript Loader ~ https://github.com/pinf/loader-js/       |
    ------------------------------- (c) Christoph Dorn --- License: MIT ---
    Loaded adapter: v8cgi
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
            pinf <- {"id":"pinf.org/loader/"}
              ID: pinf.org/loader/
              Path: pinf.org/loader/
              ... skip second pass ...
            modules <- {"id":"github.com/pinf/modules-js/"}
              ID: github.com/pinf/modules-js/
              Path: /pinf/workspaces/github.com/pinf/modules-js
              HashID: 52402775D376B5C5239F9D5D9C5D4E0A
              Mappings:
                pinf <- {"id":"pinf.org/loader/","available":true}
                  ID: pinf.org/loader/
                  Path: pinf.org/loader/
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
                v8cgi <- {"id":"code.google.com/p/v8cgi/"}
                  ID: code.google.com/p/v8cgi/
                  Path: code.google.com/p/v8cgi/
                  ... skip second pass ...
              Dependencies: None
          Dependencies: None
    Loading program's main packages:
      /pinf/workspaces/github.com/pinf/test-programs-js/
    Booting program. Output for boot package follows in green between ==> ... <==
    ----- /pinf/workspaces/github.com/pinf/test-programs-js -> [package.json].main -> main() -----
    =====>|---
    | You are running the 'CommonJSAPI' demo program via the Demo Program Runner included in the `test-programs-js` project.
    |---
    <=====
    Load additional package into program:
      Locator(original): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/CommonJSAPI"}
      Locator(resolved): {"location":"/pinf/workspaces/github.com/pinf/test-programs-js/CommonJSAPI/"}
      Mappings:
        commonjs <- {"id":"github.com/pinf/commonjs-apis/"}
          ID: github.com/pinf/commonjs-apis/
          Path: /pinf/workspaces/github.com/pinf/commonjs-apis
          HashID: 6528F384FEDF641297E601A91F056441
          Mappings:
            pinf <- {"id":"pinf.org/loader/","available":true}
              ID: pinf.org/loader/
              Path: pinf.org/loader/
              ... skip second pass ...
            v8cgi <- {"id":"code.google.com/p/v8cgi/"}
              ID: code.google.com/p/v8cgi/
              Path: code.google.com/p/v8cgi/
              ... skip second pass ...
          Dependencies: None
      Dependencies: None
    =====>|---
    | Running program (equivalent command): commonjs --platform v8cgi /pinf/workspaces/github.com/pinf/test-programs-js/CommonJSAPI
    |--- Program stdout & stderr follows --->
    Some data from the CommonJS System module:
      args.length: 6
      args: /pinf/workspaces/github.com/pinf/loader-js/pinf-loader.js,-v,--platform,v8cgi,./,CommonJSAPI
      Object.keys(env).length: 47
      Object.keys(env): rvm_gemsets_path,rvm_scripts_path,TERM_PROGRAM,rvm_bin_path,TERM,SHELL,rvm_man_path,TMPDIR,Apple_PubSub_Socket_Render,rvm_user_path,TERM_PROGRAM_VERSION,rvm_wrappers_path,rvm_patches_path,TERM_SESSION_ID,rvm_docs_path,rvm_verbose_flag,USER,COMMAND_MODE,rvm_gems_cache_path,rvm_path,SSH_AUTH_SOCK,rvm_debug_flag,__CF_USER_TEXT_ENCODING,rvm_prefix,PATH,rvm_examples_path,rvm_rubies_path,rvm_loaded_flag,PWD,LANG,rvm_usr_path,rvm_src_path,rvm_version,SHLVL,HOME,rvm_gems_path,LOGNAME,rvm_tmp_path,rvm_lib_path,rvm_repos_path,rvm_log_path,rvm_reload_flag,rvm_help_path,DISPLAY,rvm_environments_path,rvm_archives_path,rvm_user_install_flag
      env.PWD: /pinf/workspaces/github.com/pinf/test-programs-js
    <=====
    ----- ^ --------------------------------------------------------------------------------------
    Program Booted  ~  Timing (Assembly: 0.089, Load: 0.032, Boot: 0.01, Additional Load: 0.006)
    ----- | Program stdout & stderr follows (if not already terminated) ====>
