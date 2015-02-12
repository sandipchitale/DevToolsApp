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

Select the URL

| Devtools URL | Description | Enable Experiments |
|--------------|-------------|--------------------|
| Builtin | Use target Chrome's devtools | As needed |
| http://localhost:8090/front_end/inspector.html | Use locally served devtools if you are developing lccally | As needed |
| http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html | Latest devtools from blink repository | As needed |
| http://chrome-developer-tools.googlecode.com/git/devtools-frontend/Source/devtools/front_end/inspector.html | Use this to try out Highlight changed properties functionality | Yes |
| http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html | Use this to try out Show function or constructor documentation functionality | Yes |
| http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html | Use this to try out Go to member all files (Ctrl+Alt+Shift+P) functionality | No |
| http://src.chromium.org/blink/trunk/Source/devtools/front_end/inspector.html | Use this to try out JavaScript Object Diagram functionality | No |
| http://src.chromium.org/blink/branches/chromium/BRANCHNUM/Source/devtools/front_end/inspector.html | Latest devtools from blink repository branches | As needed |


Known limitations
=================

* None
