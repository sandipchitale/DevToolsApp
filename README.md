DevToolsApp
===========

A Chrome packaged app to try out different versions of Chrome DevTools.

How to run
==========

* Download and install Chrome (36.x)
* Run it e.g.

```bat
> ...\AppData\Local\Google\Chrome SxS\Application\chrome.exe --remote-debugging-port=9222 --no-first-run --user-data-dir=C:\temp\devtoolsprofile
```

Load page to be debugged in it

* Install DevToolsApp from [Chrome Web Store](https://chrome.google.com/webstore/detail/dev-tools-app/eichfopopofffkbhjgbabdegakcdmpkm?hl=en-US).
* Launch it.
* Click on the run button in the toolbar.
* Select the page to debug (from the shown grid) by clicking on it
* Voila, it should load the selected devtools

You should be able to choose any version of devtools using urls from:

```
http://src.chromium.org/blink/branches/chromium/
```

For example, to use the 1971 branch of devtools use URL:

```
http://src.chromium.org/blink/branches/chromium/1971/Source/devtools/front_end/inspector.html
```

Known limitations
=================

* None