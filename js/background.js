chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('inspectorwrapper.html', {
        'width' : 1100,
        'height' : 800,
        'frame' : 'none'
    });
});