DevToolsApp
===========

A chrome packaged app wrapper to try out different versions of DevTools

How to run
==========

* Download Chrome Canary
* Run it e.g.

```bat
> ...\AppData\Local\Google\Chrome SxS\Application\chrome.exe --remote-debugging-port=9222 --no-first-run --user-data-dir=C:\temp\devtoolsprofile
```

Load page to be debugged in it
* (The following steps are required until I make DevToolsApp available on Chrome Play Store for easy installation.
* For now git clone the DevToolsApp from github.e.g.

```bat
> git clone https://github.com/sandipchitale/DevToolsApp.git
```

* Install it into your desktop Chrome using developer mode.
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
