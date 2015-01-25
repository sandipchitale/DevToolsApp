function launch() {
	chrome.app.window.create('inspectorwrapper.html', {
		'width' : 1280,
		'height' : 800,
		'frame' : 'none'
	});
}
chrome.app.runtime.onLaunched.addListener(function() {
	launch();
});