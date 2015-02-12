DevToolsApp
===========

A Chrome app to try out different versions of Chrome DevTools from blink repository as well as someone else's enhancements/fixes hosted somewhere or even your own served froma local server.

How to run
==========

* Download and install Chrome
* Run it e.g.

```bat
> chrome --remote-debugging-port=9222 --no-first-run
```

Load page to be debugged in it

* Install DevToolsApp from [Chrome Web Store](https://chrome.google.com/webstore/detail/dev-tools-app/eichfopopofffkbhjgbabdegakcdmpkm?hl=en-US).
* Launch it
* Select the desired devtools from preconfigured list or type URL of the devtools you want to use
* Click on the run button in the toolbar
* Select the page to debug from the list of Inspectable pages by clicking on it
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
